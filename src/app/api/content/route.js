import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import { normaliseImageUrl } from '@/lib/images';
import { CONTENT_SCHEMA, getPageDefaults } from '@/lib/content-schema';

export const dynamic = 'force-dynamic';

// GET /api/content?page=home  → { page, content: { key: value } }
// GET /api/content            → { content: { page: { key: value } } } for all pages
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const rows = page
      ? await query('SELECT page, content_key, content_value FROM site_content WHERE page = ?', [page])
      : await query('SELECT page, content_key, content_value FROM site_content');

    if (page) {
      const content = { ...getPageDefaults(page) };
      for (const row of rows) {
        if (row.content_value !== null && row.content_value !== '') content[row.content_key] = row.content_value;
      }
      return Response.json({ page, content });
    }

    const grouped = {};
    for (const key of Object.keys(CONTENT_SCHEMA)) grouped[key] = getPageDefaults(key);
    for (const row of rows) {
      grouped[row.page] = grouped[row.page] || {};
      if (row.content_value !== null && row.content_value !== '') grouped[row.page][row.content_key] = row.content_value;
    }
    return Response.json({ content: grouped });
  } catch (error) {
    console.error('Content GET error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/content  (admin) — upsert a batch of fields for a page
// body: { page, fields: [{ key, type, value }] }
export async function PUT(request) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  try {
    const body = await request.json();
    const { page, fields } = body;

    const schema = CONTENT_SCHEMA[page];
    if (!schema) return Response.json({ error: 'Unknown page.' }, { status: 400 });
    if (!Array.isArray(fields)) return Response.json({ error: 'fields must be an array.' }, { status: 400 });

    const allowed = new Map(schema.fields.map((f) => [f.key, f]));

    for (const field of fields) {
      const definition = allowed.get(field.key);
      if (!definition) continue; // ignore unknown keys

      let value = field.value ?? '';
      if ((definition.type === 'image' || definition.type === 'media') && value) {
        value = normaliseImageUrl(value) || '';
      }

      await query(
        `INSERT INTO site_content (page, content_key, content_type, content_value, label)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE content_value = VALUES(content_value), content_type = VALUES(content_type), label = VALUES(label)`,
        [page, definition.key, definition.type, value, definition.label || null]
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Content PUT error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
