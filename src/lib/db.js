import mysql from 'mysql2/promise';

let pool = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: 30000,
      namedPlaceholders: false,
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('DB Query Error:', error.message);
    console.error('SQL:', sql);
    throw error;
  }
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}
