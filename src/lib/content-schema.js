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
      { key: 'hero_video', type: 'media', label: 'Hero background video/image URL', default: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1787638726/herosection.mp4' },
      { key: 'hero_title_line1', type: 'text', label: 'Hero title (line 1)', default: 'Wellness,' },
      { key: 'hero_title_line2', type: 'text', label: 'Hero title (line 2)', default: 'Inside & Outside.' },
      { key: 'hero_subtitle', type: 'text', label: 'Hero subtitle', default: 'Trusted B2B nutraceutical and cosmetic manufacturer. Formulated to deliver, built to scale.' },
      { key: 'hero_cta_primary', type: 'text', label: 'Primary button label', default: 'EXPLORE NUTRACEUTICALS' },
      { key: 'hero_cta_secondary', type: 'text', label: 'Secondary button label', default: 'EXPLORE COSMETICS' },
      { key: 'hero_cta_tertiary', type: 'text', label: 'Tertiary button label', default: 'ENQUIRE NOW' },
      { key: 'divisions_heading', type: 'text', label: 'Divisions heading', default: 'Two ways we care for you.' },
    ],
  },
  'our-company': {
    label: 'Our Company',
    fields: [
      { key: 'hero_video', type: 'media', label: 'Hero background video/image URL', default: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1787608494/ourCompanyHero.mp4' },
      { key: 'hero_title', type: 'text', label: 'Hero title', default: 'Built to be trusted with wellness.' },
      { key: 'hero_subtitle', type: 'text', label: 'Hero subtitle', default: 'Leading B2B nutraceutical and cosmetic manufacturer with decades of expertise in formulation science and manufacturing excellence.' },
      { key: 'story_heading', type: 'text', label: 'Our story heading', default: 'Bridging Ancient Wisdom with Modern Innovation' },
      { key: 'standards_heading', type: 'text', label: 'Global standards heading', default: 'Zeovus Quality Assurance (ZQA) is the standard. Everything else is proof of it.' },
    ],
  },
  capabilities: {
    label: 'Capabilities',
    fields: [
      { key: 'hero_title_lead', type: 'text', label: 'Hero title (line 1)', default: 'Proven in research.' },
      { key: 'hero_title_accent', type: 'text', label: 'Hero title (accent)', default: 'Built to scale.' },
      { key: 'innovation_heading', type: 'text', label: 'Innovation heading', default: 'Where formulation science meets real-world performance.' },
      { key: 'innovation_intro', type: 'text', label: 'Innovation intro', default: "Zeovus Life's in-house formulation team is adept at turning ideas into expertly formulated nutraceutical and cosmetic products. We specialise in custom formulation across gummies, softgels and tablets, alongside serums, lotions and other topical formats, each developed with the same clinical rigour, whatever the format." },
      { key: 'innovation_quote', type: 'text', label: 'Innovation pull-quote', default: 'Every format is developed with the same clinical rigour.' },
      { key: 'manufacturing_heading', type: 'text', label: 'Manufacturing heading', default: 'Manufacturing built for every format, at scale.' },
      { key: 'manufacturing_intro', type: 'text', label: 'Manufacturing intro', default: 'Zeovus Life manufactures nutraceuticals and cosmetics across every major format on the market today, inside GMP, ISO- and HACCP-certified, allergen-controlled facilities — with capacity that scales from first sample to full commercial volume without ever changing partners.' },
      { key: 'process_heading', type: 'text', label: 'Process heading', default: 'From brief to shelf, in eight steps.' },
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
      { key: 'hero_subtitle', type: 'text', label: 'Hero subtitle (optional)', default: '' },
    ],
  },
  cosmetics: {
    label: 'Cosmetics',
    fields: [
      { key: 'hero_title_lead', type: 'text', label: 'Hero title (line 1)', default: 'Formulated' },
      { key: 'hero_title_accent', type: 'text', label: 'Hero title (accent)', default: 'to transform.' },
      { key: 'hero_subtitle', type: 'text', label: 'Hero subtitle (optional)', default: '' },
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
