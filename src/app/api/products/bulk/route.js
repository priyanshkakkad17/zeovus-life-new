import { getPool } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    let products;

    if (typeof body.data === 'string') {
      products = JSON.parse(body.data);
    } else if (Array.isArray(body.data)) {
      products = body.data;
    } else if (Array.isArray(body)) {
      products = body;
    } else {
      return Response.json({ success: false, error: 'Invalid data format. Expected JSON array.' }, { status: 400 });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return Response.json({ success: false, error: 'No products to import.' }, { status: 400 });
    }

    const pool = getPool();
    const connection = await pool.getConnection();
    let imported = 0;
    let errors = [];

    for (const product of products) {
      try {
        const slug = (product.name || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        await connection.query(`
          INSERT INTO products (category_id, subcategory_id, name, slug, brand_line, key_actives,
            primary_benefit, secondary_benefits, manufacturing_formats, dds_delivery_tech, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          product.category_id,
          product.subcategory_id || null,
          product.name,
          slug,
          product.brand_line || null,
          product.key_actives || null,
          product.primary_benefit || null,
          product.secondary_benefits || null,
          product.manufacturing_formats || null,
          product.dds_delivery_tech || null,
          product.status || 'Draft'
        ]);
        imported++;
      } catch (err) {
        errors.push({ name: product.name, error: err.message });
      }
    }

    connection.release();

    return Response.json({
      success: true,
      imported,
      total: products.length,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Bulk import error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
