const nutraceuticalSlugs = [
  'healthy-ageing', 'multivitamins', 'gut-health', 'womens-health', 'mens-health',
  'brain-stress-sleep', 'immunity', 'joint-bone', 'heart-health', 'energy-sports',
  'weight-management', 'beauty', 'children', 'specialty',
];
const cosmeticSlugs = ['skincare', 'haircare', 'sun-care', 'body-care'];
const routes = [
  '/', '/our-company', '/capabilities', '/nutraceuticals', '/cosmetics', '/contact',
  '/faq', '/privacy-policy', '/cookie-policy',
  ...nutraceuticalSlugs.map((slug) => `/nutraceuticals?category=${slug}`),
  ...cosmeticSlugs.map((slug) => `/cosmetics?category=${slug}`),
];

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1] || '';
}

function parseJsonLd(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
  const types = [];
  let valid = blocks.length > 0;
  for (const block of blocks) {
    try {
      const data = JSON.parse(block);
      types.push(data['@type']);
    } catch {
      valid = false;
    }
  }
  return { valid, types };
}

const results = [];
for (const path of routes) {
  const response = await fetch(`http://localhost:3000${path}`);
  const html = await response.text();
  const jsonLd = parseJsonLd(html);
  results.push({
    path,
    status: response.status,
    title: firstMatch(html, /<title>([^<]*)<\/title>/i),
    description: firstMatch(html, /<meta name="description" content="([^"]*)"/i),
    canonical: firstMatch(html, /<link rel="canonical" href="([^"]*)"/i),
    ogImage: firstMatch(html, /<meta property="og:image" content="([^"]*)"/i),
    twitterCard: firstMatch(html, /<meta name="twitter:card" content="([^"]*)"/i),
    organization: html.includes('"@type":"Organization"'),
    faqPage: html.includes('"@type":"FAQPage"'),
    howTo: html.includes('"@type":"HowTo"'),
    jsonLdValid: jsonLd.valid,
    jsonLdTypes: jsonLd.types,
  });
}

const categoryResults = results.filter((result) => result.path.includes('category='));
const failures = results.filter((result) => (
  result.status !== 200 || !result.title || !result.description || !result.canonical ||
  !result.ogImage || !result.twitterCard || !result.organization || !result.jsonLdValid
));

console.log(JSON.stringify({
  routeCount: results.length,
  uniqueCategoryTitles: new Set(categoryResults.map((result) => result.title)).size,
  uniqueCategoryDescriptions: new Set(categoryResults.map((result) => result.description)).size,
  failures,
  faq: results.find((result) => result.path === '/faq'),
  capabilities: results.find((result) => result.path === '/capabilities'),
  categoryMetadata: categoryResults.map(({ path, title, description, canonical }) => ({ path, title, descriptionLength: description.length, canonical })),
}, null, 2));
