/**
 * Zeovus Life — Full Catalog Seed (Nutraceuticals + Cosmetics)
 *
 * Reads scripts/catalog-seed.json (produced by scripts/build-catalog-data.py from
 * the two source workbooks) and seeds the products table.
 *
 * Behaviour:
 *   1. Snapshots existing product image_url values keyed by (division, slug) so
 *      hand-assigned product images survive the reseed.
 *   2. Removes ALL current products (hard delete) — the user asked to remove all
 *      current products and reseed from the workbooks.
 *   3. Maps each source category slug to its existing categories row (categories
 *      keep their icons/colours; they are not recreated).
 *   4. Upserts cosmetics subcategories and inserts products with the
 *      division-appropriate fields.
 *
 * Usage:  node scripts/seed-catalog.mjs
 */
import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function loadEnv() {
  const env = {};
  const raw = readFileSync(resolve(ROOT, '.env.local'), 'utf-8');
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    env[t.slice(0, i).trim()] = v;
  }
  return env;
}

const env = loadEnv();
const DB_CONFIG = {
  host: process.env.DB_HOST || env.DB_HOST,
  port: parseInt(process.env.DB_PORT || env.DB_PORT || '3306'),
  user: process.env.DB_USER || env.DB_USER,
  password: process.env.DB_PASSWORD || env.DB_PASSWORD,
  database: process.env.DB_NAME || env.DB_NAME,
  connectTimeout: 30000,
};

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 250);
}

async function main() {
  console.log('Zeovus Life — Full Catalog Seed');
  console.log('================================\n');

  const data = JSON.parse(readFileSync(resolve(__dirname, 'catalog-seed.json'), 'utf-8'));
  const categories = data.categories;

  const conn = await mysql.createConnection(DB_CONFIG);
  console.log('Connected to database\n');

  try {
    // 1. Snapshot existing images keyed by "division::slug".
    const [existing] = await conn.query(`
      SELECT p.slug, c.division, p.image_url
      FROM products p JOIN categories c ON p.category_id = c.id
      WHERE p.image_url IS NOT NULL AND p.image_url <> ''
    `);
    const imageMap = new Map();
    for (const row of existing) imageMap.set(`${row.division}::${row.slug}`, row.image_url);
    console.log(`Snapshotted ${imageMap.size} product images\n`);

    // 2. Load category slug -> {id, division}.
    const [catRows] = await conn.query('SELECT id, slug, division FROM categories');
    const catBySlug = new Map(catRows.map((c) => [c.slug, c]));

    // Validate every source slug maps to an existing category.
    for (const cat of categories) {
      if (!catBySlug.has(cat.slug)) {
        throw new Error(`No existing category for slug "${cat.slug}" (${cat.division}). Aborting.`);
      }
    }

    // 3. Remove ALL current products (hard delete, then reseed).
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    await conn.query('DELETE FROM products');
    await conn.query('ALTER TABLE products AUTO_INCREMENT = 1');
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Removed all existing products\n');

    let totalProducts = 0;

    for (const cat of categories) {
      const dbCat = catBySlug.get(cat.slug);
      const categoryId = dbCat.id;
      const division = cat.division;

      // Upsert subcategories (cosmetics only) -> name->id map.
      const subMap = {};
      for (const sub of cat.subcategories) {
        const [existSub] = await conn.query(
          'SELECT id FROM subcategories WHERE category_id = ? AND slug = ?',
          [categoryId, sub.slug]
        );
        if (existSub.length > 0) {
          subMap[sub.name] = existSub[0].id;
          await conn.query('UPDATE subcategories SET name = ?, sort_order = ?, is_active = 1 WHERE id = ?',
            [sub.name, sub.sort_order, existSub[0].id]);
        } else {
          const [res] = await conn.query(
            'INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES (?, ?, ?, ?)',
            [categoryId, sub.name, sub.slug, sub.sort_order]
          );
          subMap[sub.name] = res.insertId;
        }
      }

      // Build product rows for this category.
      const placeholders = [];
      const values = [];
      let order = 0;
      const seenSlugs = new Set();
      for (const p of cat.products) {
        order++;
        let slug = slugify(p.name);
        // Guard against duplicate slugs within a category.
        let unique = slug;
        let n = 2;
        while (seenSlugs.has(unique)) unique = `${slug}-${n++}`;
        seenSlugs.add(unique);
        slug = unique;

        const subcatId = p.subcat ? (subMap[p.subcat] || null) : null;
        const imageUrl = imageMap.get(`${division}::${slug}`) || null;

        placeholders.push('(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        values.push(
          categoryId,
          subcatId,
          p.name,
          slug,
          imageUrl,
          'Verified',
          order,
          // shared / division fields
          p.key_actives || null,
          p.primary_benefit || null,
          p.secondary_benefits || null,
          p.manufacturing_formats || null,
          p.dds_delivery_tech || null,
          p.description || null,
          p.skin_hair_type || null,
          p.concerns_addressed || null,
          p.suitable_for || null,
          p.what_makes_potent || null,
          p.recommended_dosage || null,
          p.mechanism_of_action || null
        );
      }

      if (placeholders.length > 0) {
        await conn.query(
          `INSERT INTO products
             (category_id, subcategory_id, name, slug, image_url, status, sort_order,
              key_actives, primary_benefit, secondary_benefits, manufacturing_formats, dds_delivery_tech,
              description, skin_hair_type, concerns_addressed, suitable_for, what_makes_potent,
              recommended_dosage, mechanism_of_action)
           VALUES ${placeholders.join(', ')}`,
          values
        );
      }
      totalProducts += placeholders.length;
      console.log(`  [${String(placeholders.length).padStart(3)}] ${division.padEnd(14)} ${cat.slug}`);
    }

    console.log(`\nDone. Seeded ${totalProducts} products across ${categories.length} categories.\n`);

    const [summary] = await conn.query(`
      SELECT c.division, COUNT(p.id) AS n
      FROM categories c LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
      GROUP BY c.division
    `);
    console.log('Products by division:');
    for (const r of summary) console.log(`   ${r.n} — ${r.division}`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
}

main();
