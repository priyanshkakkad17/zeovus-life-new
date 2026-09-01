import { requireAdmin } from '@/lib/requireAdmin';
import { contentSchema } from '@/lib/content/schema';
import {
  getAllContent,
  getContentGroup,
  getCustomisedKeys,
  saveContentSection,
} from '@/lib/content/store';

/**
 * GET /api/content            -> all content
 * GET /api/content?group=home -> one group
 * GET /api/content?meta=1     -> schema + content + which sections are customised
 *
 * Reads are public (the site itself consumes them); writes require an admin.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const group = searchParams.get('group');
  const wantMeta = searchParams.get('meta') === '1';

  try {
    if (wantMeta) {
      const [content, customised] = await Promise.all([getAllContent(), getCustomisedKeys()]);
      return Response.json({ schema: contentSchema, content, customised });
    }
    if (group) {
      return Response.json({ group, content: await getContentGroup(group) });
    }
    return Response.json({ content: await getAllContent() });
  } catch (error) {
    console.error('GET /api/content failed:', error);
    return Response.json({ error: 'Could not load content.' }, { status: 500 });
  }
}

/**
 * PUT /api/content
 * Body: { group, section, value } or { updates: [{ group, section, value }, ...] }
 */
export async function PUT(request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const updates = Array.isArray(body?.updates)
    ? body.updates
    : [{ group: body?.group, section: body?.section, value: body?.value }];

  if (updates.length === 0) {
    return Response.json({ error: 'Nothing to update.' }, { status: 400 });
  }

  const saved = {};
  try {
    for (const update of updates) {
      const { group, section, value } = update || {};
      if (!group || !section) {
        return Response.json({ error: 'Each update needs a group and a section.' }, { status: 400 });
      }
      saved[`${group}.${section}`] = await saveContentSection(group, section, value, auth.user.email);
    }
  } catch (error) {
    const isUnknown = /Unknown content section/.test(error.message);
    console.error('PUT /api/content failed:', error);
    return Response.json({ error: error.message }, { status: isUnknown ? 400 : 500 });
  }

  return Response.json({ success: true, saved });
}
