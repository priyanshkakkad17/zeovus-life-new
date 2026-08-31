// Complete, DB-backed product image update.
// Ensures products.image_url exists, matches each product to its bottle image
// by name, and writes the image path into the database.
//
// Run from a host that can reach the DB (server, or local after whitelisting
// your IP in Hostinger Remote MySQL):
//   node scripts/apply-product-images.mjs           # apply (overwrite)
//   node scripts/apply-product-images.mjs --fill    # only fill empty image_url
//   node scripts/apply-product-images.mjs --dry     # preview, no writes

import mysql from 'mysql2/promise';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { tokenize, matchProductsToImages } from '../src/lib/matchProductImages.js';

const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry');
const FILL_ONLY = args.has('--fill');

const env = {};
for (const line of readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const IMAGE_DIR = 'uploads/zeovus_life_bottle_products_v3';
const dir = resolve(process.cwd(), 'public', IMAGE_DIR);
const images = readdirSync(dir)
  .filter((f) => /\.png$/i.test(f))
  .filter((f) => !/^(base_bottle|contact_v3)/i.test(f))
  .map((file) => ({ file, url: `/${IMAGE_DIR}/${file}`, tokens: tokenize(file) }));

const conn = await mysql.createConnection({
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT || '3306'),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  connectTimeout: 20000,
});

// 1. Ensure column exists.
const [cols] = await conn.query("SHOW COLUMNS FROM products LIKE 'image_url'");
if (cols.length === 0) {
  if (DRY) {
    console.log('[dry] products.image_url column is MISSING and would be created.');
  } else {
    await conn.query('ALTER TABLE products ADD COLUMN image_url VARCHAR(2048) DEFAULT NULL AFTER name');
    console.log('Created products.image_url column.');
  }
}

// 2. Match.
const [products] = await conn.query('SELECT id, name FROM products WHERE is_active = 1 ORDER BY id');
const { matches, unmatchedProducts, unmatchedImages } = matchProductsToImages(products, images);

console.log(`Products: ${products.length} | Images: ${images.length}`);
console.log(`Matched: ${matches.length} | Unmatched products: ${unmatchedProducts.length} | Unused images: ${unmatchedImages.length}`);

// 3. Write.
let updated = 0;
if (!DRY && cols.length >= 0) {
  for (const m of matches) {
    if (FILL_ONLY) {
      const [r] = await conn.query(
        "UPDATE products SET image_url = ? WHERE id = ? AND (image_url IS NULL OR image_url = '')",
        [m.url, m.id]
      );
      if (r.affectedRows > 0) updated += 1;
    } else {
      await conn.query('UPDATE products SET image_url = ? WHERE id = ?', [m.url, m.id]);
      updated += 1;
    }
  }
  console.log(`Updated ${updated} product rows.`);
} else {
  console.log('[dry] no rows written. Sample matches:');
  for (const m of matches.slice(0, 10)) console.log(`  ${m.name} -> ${m.file} (${m.kind} ${m.score})`);
}

await conn.end();
console.log('Done.');
