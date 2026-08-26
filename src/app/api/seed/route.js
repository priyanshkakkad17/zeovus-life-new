import { getPool } from '@/lib/db';
import { categoriesData } from '@/lib/seed-data';

export async function POST(request) {
  try {
    const pool = getPool();
    const connection = await pool.getConnection();

    // Seed categories
    for (const cat of categoriesData) {
      const [result] = await connection.query(`
        INSERT IGNORE INTO categories (slug, name, description, icon, color_from, color_to, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [cat.slug, cat.name, cat.description, cat.icon, cat.color_from, cat.color_to, cat.sort_order]);

      // Get the category ID
      const [rows] = await connection.query('SELECT id FROM categories WHERE slug = ?', [cat.slug]);
      const categoryId = rows[0]?.id;

      if (categoryId && cat.subcategories) {
        for (const sub of cat.subcategories) {
          await connection.query(`
            INSERT IGNORE INTO subcategories (category_id, name, slug, sort_order)
            VALUES (?, ?, ?, ?)
          `, [categoryId, sub.name, sub.slug, sub.sort_order]);
        }
      }
    }

    connection.release();
    return Response.json({ success: true, message: 'Categories seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
