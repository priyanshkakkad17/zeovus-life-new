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
const [rows] = await conn.query(`SELECT c.name, c.division, COUNT(p.id) AS n FROM categories c LEFT JOIN products p ON p.category_id=c.id AND p.is_active=1 WHERE c.division='cosmetics' GROUP BY c.id ORDER BY c.sort_order`);
console.log(rows);
await conn.end();
