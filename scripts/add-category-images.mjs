import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function loadEnvFile(path) {
  return readFileSync(path, 'utf8').split('\n').reduce((env, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return env;

    const separator = trimmed.indexOf('=');
    if (separator === -1) return env;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
    return env;
  }, {});
}

const env = loadEnvFile(resolve(process.cwd(), '.env.local'));
const imagesBySlug = {
  'healthy-ageing': 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868213/nura-1.png',
  multivitamins: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868214/nura-2.png',
  'gut-health': 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868213/nura-3.png',
  'womens-health': 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868216/nura-4.png',
  'mens-health': 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868212/nura-5.png',
  'brain-stress-sleep': 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868231/nura-6.png',
  immunity: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868212/nura-7.png',
  'joint-bone': 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868229/nura-8.png',
};

const connection = await mysql.createConnection({
  host: env.DB_HOST,
  port: Number(env.DB_PORT || 3306),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  connectTimeout: 30000,
});

try {
  const [columns] = await connection.query("SHOW COLUMNS FROM categories LIKE 'image'");
  if (columns.length === 0) {
    await connection.query('ALTER TABLE categories ADD COLUMN image VARCHAR(2048) NULL AFTER icon');
    console.log('Added categories.image column.');
  } else {
    console.log('categories.image column already exists.');
  }

  for (const [slug, image] of Object.entries(imagesBySlug)) {
    const [result] = await connection.query('UPDATE categories SET image = ? WHERE slug = ?', [image, slug]);
    if (result.affectedRows !== 1) {
      throw new Error(`Expected exactly one category for "${slug}", updated ${result.affectedRows}.`);
    }
  }

  const [rows] = await connection.query(
    'SELECT slug, image FROM categories WHERE slug IN (?) ORDER BY sort_order ASC',
    [Object.keys(imagesBySlug)]
  );

  if (rows.length !== Object.keys(imagesBySlug).length || rows.some((row) => !row.image)) {
    throw new Error('Verification failed: one or more category images were not persisted.');
  }

  console.log('Persisted and verified category images:');
  rows.forEach(({ slug, image }) => console.log(`- ${slug}: ${image}`));
} finally {
  await connection.end();
}
