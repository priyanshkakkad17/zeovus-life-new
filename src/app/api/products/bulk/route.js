import { getPool } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import * as XLSX from 'xlsx';

/**
 * Bulk import products from an uploaded Excel (.xlsx/.xls), CSV or Word (.docx) file.
 *
 * Behaviour:
 *  - Parses rows into product objects.
 *  - Resolves category/subcategory by name (case-insensitive) or numeric id.
 *  - Checks the DB and only inserts UNIQUE entries (deduped by slug within a category).
 *  - Skips rows that already exist and reports them back.
 *
 * Accepts either:
 *  - multipart/form-data with a `file` field (preferred), or
 *  - application/json with a `data` array (backwards compatible).
 */

// Map many possible header spellings to our canonical product fields.
const FIELD_ALIASES = {
  name: ['name', 'product name', 'product', 'title'],
  category: ['category', 'category name', 'category_name'],
  category_id: ['category_id', 'category id'],
  subcategory: ['subcategory', 'sub category', 'subcategory name', 'subcategory_name'],
  subcategory_id: ['subcategory_id', 'subcategory id'],
  image_url: ['image_url', 'image', 'image url', 'photo'],
  brand_line: ['brand_line', 'brand line', 'brand'],
  key_actives: ['key_actives', 'key actives', 'actives'],
  primary_benefit: ['primary_benefit', 'primary benefit', 'benefit'],
  secondary_benefits: ['secondary_benefits', 'secondary benefits'],
  manufacturing_formats: ['manufacturing_formats', 'manufacturing formats', 'formats', 'available sizes', 'sizes'],
  dds_delivery_tech: ['dds_delivery_tech', 'feasible delivery technology', 'delivery technology', 'delivery tech', 'dds'],
  description: ['description', 'desc'],
  skin_hair_type: ['skin_hair_type', 'skin hair type', 'skin/hair type', 'skin type', 'hair type'],
  concerns_addressed: ['concerns_addressed', 'concerns addressed', 'concerns'],
  suitable_for: ['suitable_for', 'suitable for'],
  what_makes_potent: ['what_makes_potent', 'what makes potent', 'what makes it potent'],
  recommended_dosage: ['recommended_dosage', 'recommended dosage', 'dosage'],
  mechanism_of_action: ['mechanism_of_action', 'mechanism of action', 'moa'],
  status: ['status'],
};

function buildHeaderMap(headers) {
  const map = {};
  headers.forEach((raw, index) => {
    const norm = String(raw || '').trim().toLowerCase();
    if (!norm) return;
    for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
      if (aliases.includes(norm)) {
        map[index] = field;
        return;
      }
    }
  });
  return map;
}

function rowsToProducts(rows) {
  if (!rows || rows.length < 2) return [];
  const headerMap = buildHeaderMap(rows[0]);
  const products = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.every(cell => cell === null || cell === undefined || String(cell).trim() === '')) {
      continue; // skip empty rows
    }
    const product = {};
    Object.entries(headerMap).forEach(([index, field]) => {
      const value = row[index];
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        product[field] = String(value).trim();
      }
    });
    if (product.name) products.push(product);
  }
  return products;
}

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function POST(request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  try {
    let products = [];
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');
      if (!file || typeof file.arrayBuffer !== 'function') {
        return Response.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
      }

      const fileName = (file.name || '').toLowerCase();
      const buffer = Buffer.from(await file.arrayBuffer());

      if (fileName.endsWith('.docx')) {
        return Response.json({
          success: false,
          error: 'Word (.docx) is not supported. Please export your table to Excel (.xlsx) or CSV and re-upload.',
        }, { status: 400 });
      }

      // Excel / CSV parsing via SheetJS.
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      if (!sheetName) {
        return Response.json({ success: false, error: 'The file has no sheets.' }, { status: 400 });
      }
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false, defval: '' });
      products = rowsToProducts(rows);
    } else {
      const body = await request.json();
      if (typeof body.data === 'string') products = JSON.parse(body.data);
      else if (Array.isArray(body.data)) products = body.data;
      else if (Array.isArray(body)) products = body;
      else return Response.json({ success: false, error: 'Invalid data format.' }, { status: 400 });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return Response.json({ success: false, error: 'No product rows found in the file.' }, { status: 400 });
    }

    const pool = getPool();

    // Preload categories & subcategories for name -> id resolution.
    const [categories] = await pool.query('SELECT id, name, slug FROM categories WHERE is_active = 1');
    const [subcategories] = await pool.query('SELECT id, category_id, name, slug FROM subcategories WHERE is_active = 1');

    const catByName = new Map();
    const catById = new Map();
    for (const c of categories) {
      catByName.set(String(c.name).trim().toLowerCase(), c);
      catByName.set(String(c.slug).trim().toLowerCase(), c);
      catById.set(Number(c.id), c);
    }
    const subByKey = new Map(); // `${categoryId}::${name|slug}` -> sub
    const subById = new Map();
    for (const s of subcategories) {
      subByKey.set(`${s.category_id}::${String(s.name).trim().toLowerCase()}`, s);
      subByKey.set(`${s.category_id}::${String(s.slug).trim().toLowerCase()}`, s);
      subById.set(Number(s.id), s);
    }

    // Preload existing product slugs per category to detect duplicates.
    const [existing] = await pool.query('SELECT category_id, slug FROM products');
    const existingSet = new Set(existing.map(p => `${p.category_id}::${p.slug}`));

    const connection = await pool.getConnection();
    let imported = 0;
    const skipped = []; // duplicates
    const errors = [];
    const seenInFile = new Set();

    try {
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const rowNo = i + 2; // account for header row + 1-based
        try {
          if (!product.name) {
            errors.push({ row: rowNo, name: product.name || '(blank)', error: 'Missing product name.' });
            continue;
          }

          // Resolve category.
          let category = null;
          if (product.category_id && catById.has(Number(product.category_id))) {
            category = catById.get(Number(product.category_id));
          } else if (product.category) {
            category = catByName.get(String(product.category).trim().toLowerCase());
          }
          if (!category) {
            errors.push({ row: rowNo, name: product.name, error: `Category not found: "${product.category || product.category_id || ''}"` });
            continue;
          }

          // Resolve subcategory (optional).
          let subcategoryId = null;
          if (product.subcategory_id && subById.has(Number(product.subcategory_id))) {
            subcategoryId = subById.get(Number(product.subcategory_id)).id;
          } else if (product.subcategory) {
            const sub = subByKey.get(`${category.id}::${String(product.subcategory).trim().toLowerCase()}`);
            if (sub) subcategoryId = sub.id;
          }

          const slug = slugify(product.name);
          const dedupeKey = `${category.id}::${slug}`;

          // Duplicate check: DB and within-file.
          if (existingSet.has(dedupeKey) || seenInFile.has(dedupeKey)) {
            skipped.push({ row: rowNo, name: product.name, reason: 'Already exists' });
            continue;
          }
          seenInFile.add(dedupeKey);

          const status = ['Verified', 'Corrected', 'Draft'].includes(product.status) ? product.status : 'Draft';

          await connection.query(`
            INSERT INTO products (category_id, subcategory_id, name, image_url, slug, brand_line, key_actives,
              primary_benefit, secondary_benefits, manufacturing_formats, dds_delivery_tech, status,
              description, skin_hair_type, concerns_addressed, suitable_for, what_makes_potent,
              recommended_dosage, mechanism_of_action)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            category.id,
            subcategoryId,
            product.name,
            product.image_url || null,
            slug,
            product.brand_line || null,
            product.key_actives || null,
            product.primary_benefit || null,
            product.secondary_benefits || null,
            product.manufacturing_formats || null,
            product.dds_delivery_tech || null,
            status,
            product.description || null,
            product.skin_hair_type || null,
            product.concerns_addressed || null,
            product.suitable_for || null,
            product.what_makes_potent || null,
            product.recommended_dosage || null,
            product.mechanism_of_action || null,
          ]);
          existingSet.add(dedupeKey);
          imported++;
        } catch (err) {
          errors.push({ row: rowNo, name: product.name, error: err.message });
        }
      }
    } finally {
      connection.release();
    }

    return Response.json({
      success: true,
      total: products.length,
      imported,
      skipped: skipped.length,
      skippedRows: skipped,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Bulk import error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
