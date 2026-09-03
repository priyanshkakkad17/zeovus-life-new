import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const env = {};
for (const line of readFileSync(resolve(ROOT, '.env.local'), 'utf-8').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const eq = t.indexOf('='); if (eq === -1) continue;
  let v = t.slice(eq + 1).trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  env[t.slice(0, eq).trim()] = v;
}
const conn = await mysql.createConnection({ host: env.DB_HOST, port: 3306, user: env.DB_USER, password: env.DB_PASSWORD, database: env.DB_NAME, connectTimeout: 30000 });

const [prodData] = await conn.query("SELECT COUNT(*) AS n FROM products WHERE image_url LIKE 'data:%'");
const [catData] = await conn.query("SELECT COUNT(*) AS n FROM categories WHERE image LIKE 'data:%'");
console.log('Products with data: image_url:', prodData[0].n);
console.log('Categories with data: image:', catData[0].n);

const [sample] = await conn.query("SELECT id, name, category_id, LEFT(image_url, 40) AS head, LENGTH(image_url) AS len FROM products WHERE image_url LIKE 'data:%' LIMIT 10");
console.log('Sample products:', sample);

const [catSample] = await conn.query("SELECT id, name, LEFT(image, 40) AS head, LENGTH(image) AS len FROM categories WHERE image LIKE 'data:%' LIMIT 10");
console.log('Sample categories:', catSample);

await conn.end();
