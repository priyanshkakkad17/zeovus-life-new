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
