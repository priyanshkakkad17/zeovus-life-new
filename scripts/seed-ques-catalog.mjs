/**
 * Zeovus Life — QUES Skincare (Cosmetics) Catalog Seed
 *
 * Reads scripts/ques-catalog.json (generated from the QUES Excel workbook by
 * scripts/build-ques-data.py) and seeds the cosmetics division:
 *   - categories (division = 'cosmetics')
 *   - subcategories
 *   - products (with the cosmetics fields: description, skin_hair_type,
 *     concerns_addressed, suitable_for, what_makes_potent, sizes)
 *
 * Idempotent: categories/subcategories are upserted by slug, and existing
 * products for each seeded cosmetics category are removed before re-inserting.
 *
 * Usage:  node scripts/seed-ques-catalog.mjs
 */

import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── Load DB config from .env.local ──────────────────────────────────────────
function loadEnv() {
  const env = {};
  try {
    const raw = readFileSync(resolve(ROOT, '.env.local'), 'utf-8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
  } catch (err) {
    console.warn('Could not read .env.local:', err.message);
  }
  return env;
}

const env = loadEnv();
const DB_CONFIG = {
  host: process.env.DB_HOST || env.DB_HOST,
  port: parseInt(process.env.DB_PORT || env.DB_PORT || '3306'),
  user: process.env.DB_USER || env.DB_USER,
  password: process.env.DB_PASSWORD || env.DB_PASSWORD,
  database: process.env.DB_NAME || env.DB_NAME,
  connectTimeout: 30000,
  multipleStatements: false,
};

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 250);
}

async function columnExists(conn, table, column) {
  const [rows] = await conn.query(`SHOW COLUMNS FROM ${table} LIKE ?`, [column]);
  return rows.length > 0;
}

async function ensureSchema(conn) {
  // Ensure cosmetics-related columns exist (mirrors /api/setup migration).
  const categoryImage = await columnExists(conn, 'categories', 'image');
  if (!categoryImage) {
    await conn.query('ALTER TABLE categories ADD COLUMN image VARCHAR(2048) DEFAULT NULL AFTER description');
  }
  const division = await columnExists(conn, 'categories', 'division');
  if (!division) {
    await conn.query("ALTER TABLE categories ADD COLUMN division VARCHAR(20) NOT NULL DEFAULT 'nutraceuticals' AFTER description");
  }
  const imageUrl = await columnExists(conn, 'products', 'image_url');
  if (!imageUrl) {
    await conn.query('ALTER TABLE products ADD COLUMN image_url VARCHAR(2048) DEFAULT NULL AFTER name');
  }
  const cosmeticColumns = [
    ['description', 'TEXT'],
    ['skin_hair_type', 'VARCHAR(255) DEFAULT NULL'],
    ['concerns_addressed', 'VARCHAR(512) DEFAULT NULL'],
    ['suitable_for', 'VARCHAR(255) DEFAULT NULL'],
    ['what_makes_potent', 'TEXT'],
  ];
  for (const [col, def] of cosmeticColumns) {
    if (!(await columnExists(conn, 'products', col))) {
      await conn.query(`ALTER TABLE products ADD COLUMN ${col} ${def}`);
    }
  }
}

async function main() {
  console.log('🧴 Zeovus Life — QUES Cosmetics Catalog Seed');
  console.log('============================================\n');

  const dataPath = resolve(__dirname, 'ques-catalog.json');
  const categories = JSON.parse(readFileSync(dataPath, 'utf-8'));

  const conn = await mysql.createConnection(DB_CONFIG);
  console.log('✅ Connected to database\n');

  try {
    await ensureSchema(conn);
    console.log('✅ Schema ready (cosmetics columns present)\n');

    let totalProducts = 0;

    for (const cat of categories) {
      // Upsert category by slug.
      const [existingCat] = await conn.query('SELECT id FROM categories WHERE slug = ?', [cat.slug]);
      let categoryId;
      if (existingCat.length > 0) {
        categoryId = existingCat[0].id;
        await conn.query(
          `UPDATE categories SET name = ?, description = ?, division = 'cosmetics', icon = ?, color_from = ?, color_to = ?, sort_order = ?, is_active = 1 WHERE id = ?`,
          [cat.name, cat.description, cat.icon, cat.color_from, cat.color_to, cat.sort_order, categoryId]
        );
      } else {
        const [res] = await conn.query(
          `INSERT INTO categories (slug, name, description, division, icon, color_from, color_to, sort_order) VALUES (?, ?, ?, 'cosmetics', ?, ?, ?, ?)`,
          [cat.slug, cat.name, cat.description, cat.icon, cat.color_from, cat.color_to, cat.sort_order]
        );
        categoryId = res.insertId;
      }

      // Remove existing products for this category so re-runs stay clean.
      await conn.query('DELETE FROM products WHERE category_id = ?', [categoryId]);

      // Upsert subcategories, keep name -> id map.
      const subMap = {};
      for (const sub of cat.subcategories) {
        const [existingSub] = await conn.query(
          'SELECT id FROM subcategories WHERE category_id = ? AND slug = ?',
          [categoryId, sub.slug]
        );
        if (existingSub.length > 0) {
          subMap[sub.name] = existingSub[0].id;
          await conn.query('UPDATE subcategories SET name = ?, sort_order = ?, is_active = 1 WHERE id = ?', [sub.name, sub.sort_order, existingSub[0].id]);
        } else {
          const [res] = await conn.query(
            'INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES (?, ?, ?, ?)',
            [categoryId, sub.name, sub.slug, sub.sort_order]
          );
          subMap[sub.name] = res.insertId;
        }
      }

      // Insert products in a single multi-row statement (fast over network).
      const values = [];
      const placeholders = [];
      let order = 0;
      for (const p of cat.products) {
        order++;
        const subcatId = p.subcat ? (subMap[p.subcat] || null) : null;
        placeholders.push("(?, ?, ?, ?, 'Verified', ?, ?, ?, ?, ?, ?, ?)");
        values.push(
          categoryId, subcatId, p.name, slugify(p.name), order,
          p.description || null, p.skin_hair_type || null, p.concerns_addressed || null,
          p.suitable_for || null, p.what_makes_potent || null, p.manufacturing_formats || null
        );
      }
      if (placeholders.length > 0) {
        await conn.query(
          `INSERT INTO products
            (category_id, subcategory_id, name, slug, status, sort_order,
             description, skin_hair_type, concerns_addressed, suitable_for, what_makes_potent, manufacturing_formats)
           VALUES ${placeholders.join(', ')}`,
          values
        );
      }
      const inserted = placeholders.length;
      totalProducts += inserted;
      console.log(`  [${String(inserted).padStart(3)}] ${cat.name} (${cat.subcategories.length} subcategories)`);
    }

    console.log(`\n🎉 Done. Seeded ${totalProducts} cosmetics products across ${categories.length} categories.\n`);

    // Verification
    const [rows] = await conn.query(`
      SELECT c.name, COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
      WHERE c.division = 'cosmetics'
      GROUP BY c.id ORDER BY c.sort_order
    `);
    console.log('📊 Cosmetics categories in DB:');
    for (const r of rows) console.log(`   ${r.product_count} — ${r.name}`);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
}

main();
