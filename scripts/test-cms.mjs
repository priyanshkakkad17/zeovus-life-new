/**
 * End-to-end test for the CMS.
 *
 * Verifies the full round trip: schema defaults render -> admin logs in ->
 * saves an override -> the public page HTML reflects it -> reset restores the
 * original content. Cleans up after itself so it is safe to re-run.
 *
 * Usage:
 *   node scripts/test-cms.mjs                     (defaults to http://localhost:3000)
 *   node scripts/test-cms.mjs --url=http://localhost:3001
 *
 * Requires the dev/prod server to already be running, and ADMIN_EMAIL /
 * ADMIN_PASSWORD in .env.local.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ── Minimal .env.local loader (avoids adding a dependency) ────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(path.join(root, '.env.local'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // No .env.local — fall back to whatever is already in the environment.
  }
}
loadEnv();

const urlArg = process.argv.find((a) => a.startsWith('--url='));
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@zeovuslife.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ZeovusAdmin@2024';

/** Probe the usual Next dev ports so the script works without a --url flag. */
async function detectBase() {
  if (urlArg) return urlArg.slice(6).replace(/\/$/, '');
  if (process.env.TEST_URL) return process.env.TEST_URL.replace(/\/$/, '');

  for (const port of [3000, 3001, 3002]) {
    const candidate = `http://localhost:${port}`;
    try {
      const res = await fetch(`${candidate}/api/content?group=site`, {
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        console.log(`Auto-detected server on port ${port}.`);
        return candidate;
      }
    } catch {
      /* try the next port */
    }
  }
  return 'http://localhost:3000';
}

let BASE = 'http://localhost:3000';

// ── Tiny test harness ─────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;
const failures = [];

function check(name, condition, detail = '') {
  if (condition) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failed++;
    failures.push(name + (detail ? ` — ${detail}` : ''));
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

function section(title) {
  console.log(`\n${title}`);
  console.log('-'.repeat(title.length));
}

/**
 * Extract just the rendered hero <h1>. Next.js also serialises raw prop values
 * into the RSC payload further down the document, so asserting against the
 * whole HTML string would match text that is not actually visible.
 */
function visibleHeading(html) {
  return html.match(/<h1[\s\S]*?<\/h1>/)?.[0] || '';
}

// ── Cookie-aware fetch ────────────────────────────────────────────────────────
let cookie = '';

async function api(pathname, options = {}) {
  const res = await fetch(`${BASE}${pathname}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
      ...options.headers,
    },
    redirect: 'manual',
  });

  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    const match = setCookie.match(/zl_admin_session=([^;]*)/);
    if (match) cookie = `zl_admin_session=${match[1]}`;
  }

  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* not JSON — HTML page */
  }
  return { status: res.status, ok: res.ok, json, text };
}

// Track what we changed so we can always restore it.
const touched = [];

async function resetSection(group, sectionId) {
  await api('/api/content/reset', {
    method: 'POST',
    body: JSON.stringify({ group, section: sectionId }),
  });
}

async function main() {
  BASE = await detectBase();
  console.log(`\nCMS end-to-end test against ${BASE}`);
  console.log('='.repeat(60));

  // ── 1. Server reachable ─────────────────────────────────────────────────────
  section('1. Server & public pages');
  try {
    var home = await api('/');
    check('GET / responds 200', home.status === 200, `got ${home.status}`);
    check(
      'home renders default hero text from the schema',
      home.text.includes('Inside &amp; Outside') || home.text.includes('Inside & Outside')
    );
    check('header tagline renders', home.text.includes('Committed to better tomorrow'));
    // Scope this to the rendered <p>. The raw "{year}" template legitimately
    // appears elsewhere in the serialised RSC payload before substitution.
    const copyrightEl = home.text.match(/<p[^>]*>([^<]*rights reserved[^<]*)<\/p>/);
    check('footer copyright renders', Boolean(copyrightEl), 'copyright element not found');
    check(
      'the {year} placeholder is substituted with the current year',
      copyrightEl ? copyrightEl[1].includes(String(new Date().getFullYear())) && !copyrightEl[1].includes('{year}') : false,
      copyrightEl?.[1]
    );
  } catch (error) {
    check('server is reachable', false, error.message);
    console.log(`\nCould not reach ${BASE}.`);
    console.log('Start the server with "npm run dev", then pass its port, e.g.:');
    console.log('  npm run test:cms -- --url=http://localhost:3001');
    return summary();
  }

  for (const [label, pathname] of [
    ['our-company', '/our-company'],
    ['capabilities', '/capabilities'],
    ['contact', '/contact'],
    ['nutraceuticals', '/nutraceuticals'],
    ['cosmetics', '/cosmetics'],
  ]) {
    const res = await api(pathname);
    check(`GET ${pathname} responds 200`, res.status === 200, `got ${res.status}`);
    if (label === 'contact') {
      check('contact form labels come from the CMS', res.text.includes('Submit Enquiry'));
    }
    if (label === 'capabilities') {
      check('capabilities hero comes from the CMS', res.text.includes('Built to scale.'));
    }
  }

  // ── 2. Public content API ───────────────────────────────────────────────────
  section('2. Content API (public reads)');
  const all = await api('/api/content?meta=1');
  check('GET /api/content?meta=1 responds 200', all.status === 200, `got ${all.status}`);
  check('returns the schema', Array.isArray(all.json?.schema) && all.json.schema.length > 0);
  check('returns content for every schema group', all.json?.schema?.every((g) => all.json.content?.[g.id]));

  const groupIds = (all.json?.schema || []).map((g) => g.id);
  check(
    'all expected groups present',
    ['site', 'home', 'ourCompany', 'capabilities', 'nutraceuticals', 'cosmetics', 'contact'].every((id) =>
      groupIds.includes(id)
    ),
    `got: ${groupIds.join(', ')}`
  );

  // Every field in every section must resolve to a non-undefined value.
  let missing = [];
  for (const group of all.json?.schema || []) {
    for (const sec of group.sections) {
      for (const field of sec.fields) {
        const value = all.json.content?.[group.id]?.[sec.id]?.[field.id];
        if (value === undefined) missing.push(`${group.id}.${sec.id}.${field.id}`);
      }
    }
  }
  check('every schema field resolves to a value', missing.length === 0, missing.slice(0, 5).join(', '));

  const totalFields = (all.json?.schema || []).reduce(
    (sum, g) => sum + g.sections.reduce((s, sec) => s + sec.fields.length, 0),
    0
  );
  console.log(`  INFO  ${groupIds.length} groups, ${totalFields} editable fields`);

  // ── 3. Writes must be rejected without a session ────────────────────────────
  section('3. Authorisation');
  const savedCookie = cookie;
  cookie = '';
  const unauth = await api('/api/content', {
    method: 'PUT',
    body: JSON.stringify({ group: 'home', section: 'hero', value: { titleLine1: 'hacked' } }),
  });
  check('PUT /api/content without a session is rejected', unauth.status === 401, `got ${unauth.status}`);

  const unauthReset = await api('/api/content/reset', {
    method: 'POST',
    body: JSON.stringify({ group: 'home', section: 'hero' }),
  });
  check('POST /api/content/reset without a session is rejected', unauthReset.status === 401, `got ${unauthReset.status}`);

  const unauthEnquiries = await api('/api/enquiries');
  check('GET /api/enquiries without a session is rejected', unauthEnquiries.status === 401, `got ${unauthEnquiries.status}`);
  cookie = savedCookie;

  // ── 4. Log in ───────────────────────────────────────────────────────────────
  section('4. Admin login');
  const login = await api('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  check('admin login succeeds', login.status === 200, `got ${login.status}: ${login.json?.error || ''}`);
  check('session cookie was issued', cookie.length > 0);

  if (!cookie) {
    console.log('\nCannot continue without a session. Has /api/setup been run to create the admin user?');
    return summary();
  }

  const me = await api('/api/auth/me');
  check('GET /api/auth/me returns the signed-in admin', me.json?.user?.email === ADMIN_EMAIL);

  // ── 5. Save an override and confirm it reaches the public page ──────────────
  section('5. Save an override (round trip)');
  const marker = `CMS-TEST-${Date.now()}`;

  const original = all.json.content.home.hero;
  const save = await api('/api/content', {
    method: 'PUT',
    body: JSON.stringify({
      group: 'home',
      section: 'hero',
      value: { ...original, titleLine1: marker },
    }),
  });
  touched.push(['home', 'hero']);
  check('PUT /api/content saves the section', save.status === 200, `got ${save.status}: ${save.json?.error || ''}`);
  check('response echoes the saved value', save.json?.saved?.['home.hero']?.titleLine1 === marker);

  const reread = await api('/api/content?group=home');
  check('re-reading the API returns the new value', reread.json?.content?.hero?.titleLine1 === marker);
  check(
    'untouched fields in the same section are preserved',
    reread.json?.content?.hero?.titleLine2 === original.titleLine2
  );

  const homeAfter = await api('/');
  check('the rendered home page H1 shows the new value', visibleHeading(homeAfter.text).includes(marker));

  // ── 6. Nested list editing ──────────────────────────────────────────────────
  section('6. Repeatable lists');
  const navOriginal = all.json.content.site.nav;
  const navMarker = `NavTest-${Date.now()}`;
  const navSave = await api('/api/content', {
    method: 'PUT',
    body: JSON.stringify({
      group: 'site',
      section: 'nav',
      value: { items: [...navOriginal.items, { name: navMarker, href: '/contact', hasDropdown: false }] },
    }),
  });
  touched.push(['site', 'nav']);
  check('a list item can be appended', navSave.status === 200, `got ${navSave.status}`);
  check(
    'the list grew by one',
    navSave.json?.saved?.['site.nav']?.items?.length === navOriginal.items.length + 1
  );

  const navPage = await api('/');
  const navHtml = navPage.text.match(/<nav[\s\S]*?<\/nav>/)?.[0] || '';
  check('the new nav item renders inside <nav>', navHtml.includes(navMarker));

  // ── 7. Validation & coercion ────────────────────────────────────────────────
  section('7. Validation');
  const badGroup = await api('/api/content', {
    method: 'PUT',
    body: JSON.stringify({ group: 'nope', section: 'hero', value: {} }),
  });
  check('an unknown group is rejected with 400', badGroup.status === 400, `got ${badGroup.status}`);

  const badSection = await api('/api/content', {
    method: 'PUT',
    body: JSON.stringify({ group: 'home', section: 'nope', value: {} }),
  });
  check('an unknown section is rejected with 400', badSection.status === 400, `got ${badSection.status}`);

  const noBody = await api('/api/content', { method: 'PUT', body: JSON.stringify({}) });
  check('a missing group/section is rejected with 400', noBody.status === 400, `got ${noBody.status}`);

  // Wrong types must be coerced back to safe values rather than stored raw.
  const coerce = await api('/api/content', {
    method: 'PUT',
    body: JSON.stringify({
      group: 'home',
      section: 'divisions',
      value: { enabled: 'true', heading: 123, cards: 'not-an-array' },
    }),
  });
  touched.push(['home', 'divisions']);
  const coerced = coerce.json?.saved?.['home.divisions'];
  check('a string "true" is coerced to a boolean', coerced?.enabled === true);
  check('a number is coerced to a string', coerced?.heading === '123');
  check('an invalid list falls back to the default array', Array.isArray(coerced?.cards) && coerced.cards.length === 2);

  // ── 8. Reset ────────────────────────────────────────────────────────────────
  section('8. Reset to default');
  const reset = await api('/api/content/reset', {
    method: 'POST',
    body: JSON.stringify({ group: 'home', section: 'hero' }),
  });
  check('reset responds 200', reset.status === 200, `got ${reset.status}`);
  check('reset returns the original default', reset.json?.value?.titleLine1 === 'Wellness,');

  const afterReset = await api('/');
  check('the marker is gone from the rendered H1', !visibleHeading(afterReset.text).includes(marker));
  check('the default hero text is back', visibleHeading(afterReset.text).includes('Wellness,'));

  // ── 9. Contact form -> enquiries ────────────────────────────────────────────
  section('9. Contact form');
  const enquiryMarker = `Test enquiry ${Date.now()}`;
  const savedCookie2 = cookie;
  cookie = ''; // submit as an anonymous visitor
  const submit = await api('/api/enquiries', {
    method: 'POST',
    body: JSON.stringify({
      firstName: 'CMS',
      lastName: 'Test',
      company: 'Test Co',
      email: 'cms-test@example.com',
      phone: '+10000000000',
      interest: 'private-label',
      message: enquiryMarker,
    }),
  });
  check('a visitor can submit the contact form', submit.status === 200, `got ${submit.status}: ${submit.json?.error || ''}`);

  const badEmail = await api('/api/enquiries', {
    method: 'POST',
    body: JSON.stringify({ firstName: 'A', lastName: 'B', email: 'not-an-email', message: 'hi' }),
  });
  check('an invalid email is rejected', badEmail.status === 400, `got ${badEmail.status}`);

  const incomplete = await api('/api/enquiries', {
    method: 'POST',
    body: JSON.stringify({ firstName: 'A', email: 'a@b.com' }),
  });
  check('missing required fields are rejected', incomplete.status === 400, `got ${incomplete.status}`);

  cookie = savedCookie2;
  const inbox = await api('/api/enquiries');
  check('an admin can list enquiries', inbox.status === 200, `got ${inbox.status}`);
  check(
    'the submitted enquiry appears in the inbox',
    (inbox.json?.enquiries || []).some((e) => e.message === enquiryMarker)
  );

  // ── 10. Restore everything we changed ───────────────────────────────────────
  section('10. Cleanup');
  for (const [group, sectionId] of touched) {
    await resetSection(group, sectionId);
  }
  const final = await api('/api/content?meta=1');
  const stillCustom = (final.json?.customised || []).map((c) => c.key);
  check(
    'all sections touched by this test were restored',
    touched.every(([g, s]) => !stillCustom.includes(`${g}.${s}`)),
    `still customised: ${stillCustom.join(', ') || 'none'}`
  );

  const finalHome = await api('/');
  const finalNav = finalHome.text.match(/<nav[\s\S]*?<\/nav>/)?.[0] || '';
  check(
    'the home page is back to its original content',
    visibleHeading(finalHome.text).includes('Wellness,') && !finalNav.includes(navMarker)
  );

  summary();
}

function summary() {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.log('\nFailures:');
    for (const f of failures) console.log(`  - ${f}`);
  }
  console.log('');
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('\nTest run crashed:', error);
  process.exit(1);
});
