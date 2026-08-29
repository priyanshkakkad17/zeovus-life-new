import { query, queryOne } from '@/lib/db';

// GET single product
export async function GET(request, { params }) {
  try {
    const product = await queryOne(`
      SELECT p.*, c.name as category_name, c.slug as category_slug,
             c.icon as category_icon, c.color_from, c.color_to,
             s.name as subcategory_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.id = ? AND p.is_active = 1
    `, [params.id]);

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT update product
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const {
      category_id, subcategory_id, name, image_url, brand_line,
      key_actives, primary_benefit, secondary_benefits,
      manufacturing_formats, dds_delivery_tech, status, is_active
    } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await query(`
      UPDATE products SET
        category_id = ?, subcategory_id = ?, name = ?, image_url = ?, slug = ?, brand_line = ?,
        key_actives = ?, primary_benefit = ?, secondary_benefits = ?,
        manufacturing_formats = ?, dds_delivery_tech = ?, status = ?, is_active = ?
      WHERE id = ?
    `, [
      category_id, subcategory_id || null, name, image_url || null, slug, brand_line || null,
      key_actives || null, primary_benefit || null, secondary_benefits || null,
      manufacturing_formats || null, dds_delivery_tech || null,
      status || 'Draft', is_active !== undefined ? is_active : true, params.id
    ]);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(request, { params }) {
  try {
    await query('UPDATE products SET is_active = 0 WHERE id = ?', [params.id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
