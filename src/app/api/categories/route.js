import { query } from '@/lib/db';

// GET all categories with product counts and subcategories
export async function GET() {
  try {
    const categories = await query(`
      SELECT c.*, 
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY c.sort_order ASC
    `);

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

// POST create category
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, icon, color_from, color_to, sort_order } = body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const result = await query(`
      INSERT INTO categories (slug, name, description, icon, color_from, color_to, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [slug, name, description || null, icon || null, color_from || null, color_to || null, sort_order || 0]);

    return Response.json({ success: true, id: result.insertId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT — manage subcategories (add/delete)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { action } = body;

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
