import { requireAdmin } from '@/lib/requireAdmin';
import { resetContentSection } from '@/lib/content/store';

/**
 * POST /api/content/reset
 * Body: { group, section }
 * Deletes the stored override so the section falls back to its schema default.
 */
export async function POST(request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { group, section } = body || {};
  if (!group || !section) {
    return Response.json({ error: 'A group and section are required.' }, { status: 400 });
  }

  try {
    const defaults = await resetContentSection(group, section);
    return Response.json({ success: true, value: defaults });
  } catch (error) {
    const isUnknown = /Unknown content section/.test(error.message);
    console.error('POST /api/content/reset failed:', error);
    return Response.json({ error: error.message }, { status: isUnknown ? 400 : 500 });
  }
}
