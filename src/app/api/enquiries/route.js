import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';

const TABLE = 'enquiries';

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS ${TABLE} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(120) NOT NULL,
      last_name VARCHAR(120) NOT NULL,
      company VARCHAR(255) DEFAULT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(60) DEFAULT NULL,
      interest VARCHAR(120) DEFAULT NULL,
      message TEXT,
      status ENUM('new', 'read', 'archived') DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

function str(value, max) {
  return String(value ?? '').trim().slice(0, max);
}

/** POST /api/enquiries — public contact form submission. */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const firstName = str(body.firstName, 120);
  const lastName = str(body.lastName, 120);
  const email = str(body.email, 255);
  const message = str(body.message, 5000);

  if (!firstName || !lastName || !email || !message) {
    return Response.json({ error: 'Please fill in all required fields.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    await ensureTable();
    await query(
      `INSERT INTO ${TABLE} (first_name, last_name, company, email, phone, interest, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        str(body.company, 255) || null,
        email,
        str(body.phone, 60) || null,
        str(body.interest, 120) || null,
        message,
      ]
    );
    return Response.json({ success: true });
  } catch (error) {
    console.error('POST /api/enquiries failed:', error);
    return Response.json({ error: 'Could not save your enquiry. Please try again.' }, { status: 500 });
  }
}

/** GET /api/enquiries — admin only, lists submissions newest first. */
export async function GET(request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '50', 10) || 50, 1), 200);

  try {
    await ensureTable();
    const rows = await query(
      `SELECT id, first_name, last_name, company, email, phone, interest, message, status, created_at
       FROM ${TABLE} ORDER BY created_at DESC LIMIT ?`,
      [limit]
    );
    return Response.json({ enquiries: rows });
  } catch (error) {
    console.error('GET /api/enquiries failed:', error);
    return Response.json({ error: 'Could not load enquiries.' }, { status: 500 });
  }
}
