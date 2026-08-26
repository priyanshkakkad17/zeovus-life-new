import { query } from '@/lib/db';

// GET products with category/subcategory/search filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug, 
             s.name as subcategory_name, s.id as subcat_id
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.is_active = 1
    `;
    const params = [];

    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }

    if (subcategory) {
      sql += ' AND s.id = ?';
      params.push(subcategory);
    }

    if (search) {
      sql += ' AND (p.name LIKE ? OR p.brand_line LIKE ? OR p.key_actives LIKE ? OR p.primary_benefit LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    sql += ' ORDER BY p.sort_order ASC, p.name ASC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const products = await query(sql, params);

    // Get total count
    let countSql = `SELECT COUNT(*) as total FROM products p 
      JOIN categories c ON p.category_id = c.id 
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.is_active = 1`;
    const countParams = [];
    if (category) { countSql += ' AND c.slug = ?'; countParams.push(category); }
    if (subcategory) { countSql += ' AND s.id = ?'; countParams.push(subcategory); }
    if (search) {
      countSql += ' AND (p.name LIKE ? OR p.brand_line LIKE ? OR p.key_actives LIKE ? OR p.primary_benefit LIKE ?)';
      const s = `%${search}%`;
      countParams.push(s, s, s, s);
    }

    const [countResult] = await query(countSql, countParams);

    return Response.json({
      products,
      pagination: {
        page,
        limit,
        total: countResult?.total || 0,
        totalPages: Math.ceil((countResult?.total || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Products GET error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST create new product
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      category_id, subcategory_id, name, brand_line,
      key_actives, primary_benefit, secondary_benefits,
      manufacturing_formats, dds_delivery_tech, status
    } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const result = await query(`
      INSERT INTO products (category_id, subcategory_id, name, slug, brand_line, key_actives, 
        primary_benefit, secondary_benefits, manufacturing_formats, dds_delivery_tech, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      category_id, subcategory_id || null, name, slug, brand_line || null,
      key_actives || null, primary_benefit || null, secondary_benefits || null,
      manufacturing_formats || null, dds_delivery_tech || null, status || 'Draft'
    ]);

    return Response.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Products POST error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
