import { query } from '@/lib/db';

// GET all categories with product counts and subcategories
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const division = searchParams.get('division');

    const categoryParams = [];
    let categorySql = `
      SELECT c.*, 
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
      WHERE c.is_active = 1
    `;
    if (division) {
      categorySql += ' AND c.division = ?';
      categoryParams.push(division);
    }
    categorySql += ' GROUP BY c.id ORDER BY c.sort_order ASC';

    const categories = await query(categorySql, categoryParams);

    // Fetch subcategories for each category
    const subcategories = await query(`
      SELECT s.*, 
        (SELECT COUNT(*) FROM products p WHERE p.subcategory_id = s.id AND p.is_active = 1) as product_count
      FROM subcategories s
      WHERE s.is_active = 1
      ORDER BY s.sort_order ASC
    `);

    // Attach subcategories to their parent category
    const result = categories.map(cat => ({
      ...cat,
      subcategories: subcategories.filter(s => s.category_id === cat.id)
    }));

    return Response.json(result);
  } catch (error) {
    console.error('Categories GET error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function normaliseImageUrl(value) {
  if (!value || !value.trim()) return null;

  try {
    const url = new URL(value.trim());
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('Image URL must use HTTP or HTTPS.');
    }
    return url.toString();
  } catch (error) {
    throw new Error(error.message === 'Image URL must use HTTP or HTTPS.' ? error.message : 'Enter a valid image URL.');
  }
}

// POST create category
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, division, icon, image, color_from, color_to, sort_order } = body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const imageUrl = normaliseImageUrl(image);
    const categoryDivision = division === 'cosmetics' ? 'cosmetics' : 'nutraceuticals';

    const result = await query(`
      INSERT INTO categories (slug, name, description, division, icon, image, color_from, color_to, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [slug, name, description || null, categoryDivision, icon || null, imageUrl, color_from || null, color_to || null, sort_order || 0]);

    return Response.json({ success: true, id: result.insertId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT — update category image or manage subcategories
export async function PUT(request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'update_category_image') {
      const { category_id, image } = body;
      if (!category_id) return Response.json({ error: 'Category ID is required.' }, { status: 400 });

      const imageUrl = normaliseImageUrl(image);
      const result = await query('UPDATE categories SET image = ? WHERE id = ?', [imageUrl, category_id]);
      if (result.affectedRows !== 1) return Response.json({ error: 'Category not found.' }, { status: 404 });

      return Response.json({ success: true, image: imageUrl });
    }

    if (action === 'add_subcategory') {
      const { category_id, name, description, sort_order } = body;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const result = await query(`
        INSERT INTO subcategories (category_id, name, slug, description, sort_order)
        VALUES (?, ?, ?, ?, ?)
      `, [category_id, name, slug, description || null, sort_order || 0]);

      return Response.json({ success: true, id: result.insertId });
    }

    if (action === 'delete_subcategory') {
      const { subcategory_id } = body;

      // Unlink products from this subcategory first
      await query(`UPDATE products SET subcategory_id = NULL WHERE subcategory_id = ?`, [subcategory_id]);
      // Delete subcategory
      await query(`DELETE FROM subcategories WHERE id = ?`, [subcategory_id]);

      return Response.json({ success: true });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
