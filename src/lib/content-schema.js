/**
 * Declares the editable content fields for each page. The CMS admin renders a
 * form from this, and public pages read the saved values (falling back to the
 * `default` here when a field hasn't been edited yet).
 *
 * type: 'text' | 'image'
 */
export const CONTENT_SCHEMA = {
  home: {
    label: 'Home',
    fields: [
      { key: 'hero_title', type: 'text', label: 'Hero title', default: 'Wellness, inside & outside.' },
      { key: 'hero_subtitle', type: 'text', label: 'Hero subtitle', default: 'Trusted B2B nutraceutical and cosmetic manufacturing.' },
      { key: 'divisions_heading', type: 'text', label: 'Divisions heading', default: 'Two ways we care for you.' },
    ],
  },
  'our-company': {
    label: 'Our Company',
    fields: [
      { key: 'hero_title', type: 'text', label: 'Hero title', default: 'Built to be trusted with wellness.' },
      { key: 'hero_subtitle', type: 'text', label: 'Hero subtitle', default: 'Leading B2B nutraceutical and cosmetic manufacturer with decades of expertise in formulation science and manufacturing excellence.' },
      { key: 'story_heading', type: 'text', label: 'Our story heading', default: 'Bridging Ancient Wisdom with Modern Innovation' },
    ],
  },
  capabilities: {
    label: 'Capabilities',
    fields: [
      { key: 'hero_title_lead', type: 'text', label: 'Hero title (line 1)', default: 'Proven in research.' },
      { key: 'hero_title_accent', type: 'text', label: 'Hero title (accent)', default: 'Built to scale.' },
    ],
  },
  contact: {
    label: 'Contact',
    fields: [
      { key: 'hero_title_lead', type: 'text', label: 'Hero title (line 1)', default: 'Bring the brief.' },
      { key: 'hero_title_accent', type: 'text', label: 'Hero title (accent)', default: "We'll bring the batch." },
      { key: 'hero_subtitle', type: 'text', label: 'Hero subtitle', default: 'Backed by decades of leadership experience across pharmaceuticals and nutraceuticals — now behind your next formula.' },
    ],
  },
  nutraceuticals: {
    label: 'Nutraceuticals',
    fields: [
      { key: 'hero_title_lead', type: 'text', label: 'Hero title (line 1)', default: 'Formulated' },
      { key: 'hero_title_accent', type: 'text', label: 'Hero title (accent)', default: 'to deliver.' },
    ],
  },
  cosmetics: {
    label: 'Cosmetics',
    fields: [
      { key: 'hero_title_lead', type: 'text', label: 'Hero title (line 1)', default: 'Formulated' },
      { key: 'hero_title_accent', type: 'text', label: 'Hero title (accent)', default: 'to transform.' },
    ],
  },
};

export function getPageSchema(page) {
  return CONTENT_SCHEMA[page] || null;
}

/** Build a defaults map { key: value } for a page. */
export function getPageDefaults(page) {
  const schema = CONTENT_SCHEMA[page];
  if (!schema) return {};
  return schema.fields.reduce((acc, field) => {
    acc[field.key] = field.default ?? '';
    return acc;
  }, {});
}
