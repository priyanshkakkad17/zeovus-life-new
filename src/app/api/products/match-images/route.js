import path from 'path';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import { listProductImages, matchProductsToImages } from '@/lib/matchProductImages';

export const dynamic = 'force-dynamic';

async function buildReport() {
  const publicRoot = path.join(process.cwd(), 'public');
  const images = await listProductImages(publicRoot);
  const products = await query('SELECT id, name FROM products WHERE is_active = 1 ORDER BY id');
  const result = matchProductsToImages(products, images);
  return { totalProducts: products.length, totalImages: images.length, ...result };
}

// GET — dry-run preview of matches (no DB writes).
export async function GET() {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  try {
    const report = await buildReport();
    return Response.json({
      preview: true,
      totalProducts: report.totalProducts,
      totalImages: report.totalImages,
      matchedCount: report.matches.length,
      unmatchedProductCount: report.unmatchedProducts.length,
      unmatchedImageCount: report.unmatchedImages.length,
      matches: report.matches,
      unmatchedProducts: report.unmatchedProducts,
      unmatchedImages: report.unmatchedImages,
    });
  } catch (error) {
    console.error('Match-images preview error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST — apply matches, updating products.image_url.
// body (optional): { overwrite: boolean } — when false, only fill empty image_url.
export async function POST(request) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  try {
    const body = await request.json().catch(() => ({}));
    const overwrite = body.overwrite !== false; // default true

    const report = await buildReport();
    let updated = 0;
    let skipped = 0;

    for (const match of report.matches) {
      if (overwrite) {
        await query('UPDATE products SET image_url = ? WHERE id = ?', [match.url, match.id]);
        updated += 1;
      } else {
        const res = await query(
          "UPDATE products SET image_url = ? WHERE id = ? AND (image_url IS NULL OR image_url = '')",
          [match.url, match.id]
        );
        if (res.affectedRows > 0) updated += 1; else skipped += 1;
      }
    }

    return Response.json({
      success: true,
      updated,
      skipped,
      matchedCount: report.matches.length,
      unmatchedProductCount: report.unmatchedProducts.length,
      unmatchedImageCount: report.unmatchedImages.length,
      unmatchedProducts: report.unmatchedProducts,
      unmatchedImages: report.unmatchedImages,
    });
  } catch (error) {
    console.error('Match-images apply error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
