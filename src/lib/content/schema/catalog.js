/**
 * Nutraceuticals and Cosmetics catalog pages. Product and category records stay
 * in the Products / Categories admin sections — this covers the surrounding copy
 * and every UI label on those pages.
 */
function catalogSchema({ id, label, preview, hero, labels }) {
  return {
    id,
    label,
    description: 'Hero copy, stats and the labels used across the category and product grid.',
    icon: 'layers',
    preview,
    sections: [
      {
        id: 'hero',
        label: 'Hero',
        fields: [
          { id: 'titleLead', label: 'Title — line 1', type: 'text', default: hero.titleLead },
          { id: 'titleAccent', label: 'Title — line 2 (accent)', type: 'text', default: hero.titleAccent },
          {
            id: 'stats',
            label: 'Hero stats',
            type: 'list',
            itemLabel: 'Stat',
            titleField: 'label',
            fields: [
              { id: 'value', label: 'Value', type: 'text', default: '' },
              { id: 'label', label: 'Label', type: 'text', default: '' },
            ],
            default: hero.stats,
          },
          { id: 'sealImage', label: 'Seal image (optional)', type: 'image', default: hero.sealImage || '' },
          { id: 'sealLabel', label: 'Seal label', type: 'text', default: hero.sealLabel || '' },
        ],
      },
      {
        id: 'labels',
        label: 'Catalog Labels',
        description: 'Small pieces of UI text shown around the category and product lists.',
        fields: [
          { id: 'highlightsHeading', label: '"Key Offerings" heading', type: 'text', default: 'Key Offerings' },
          { id: 'scrollLabel', label: 'Scroll indicator label', type: 'text', default: 'Scroll' },
          { id: 'productsLabel', label: 'Products label', type: 'text', default: 'Products' },
          { id: 'keyActivesLabel', label: '"Key actives" label', type: 'text', default: 'Key actives' },
          { id: 'searchPlaceholder', label: 'Search placeholder', type: 'text', default: labels.searchPlaceholder },
          { id: 'emptyState', label: 'No-results message', type: 'textarea', default: 'No products match your search.' },
        ],
      },
      {
        id: 'productDetail',
        label: 'Product Detail Labels',
        fields: [
          { id: 'backLabel', label: 'Back link prefix', type: 'text', default: 'Back to' },
          { id: 'enquireLabel', label: 'Enquiry button label', type: 'text', default: 'Ask about this product' },
          { id: 'enquireHref', label: 'Enquiry button link', type: 'url', default: '/contact' },
          { id: 'keyActivesLabel', label: '"Key actives" heading', type: 'text', default: 'Key actives' },
          { id: 'benefitsLabel', label: '"Benefits" heading', type: 'text', default: 'Benefits' },
          { id: 'potentLabel', label: '"What makes it potent" heading', type: 'text', default: 'What makes it potent' },
          { id: 'concernsLabel', label: '"Concerns addressed" heading', type: 'text', default: 'Concerns addressed' },
          { id: 'secondaryLabel', label: '"Additional support" heading', type: 'text', default: 'Additional support' },
          { id: 'formatsLabel', label: '"Feasible manufacturing formats" heading', type: 'text', default: 'Feasible manufacturing formats' },
          { id: 'sizesLabel', label: '"Standard size available" heading (cosmetics)', type: 'text', default: 'Standard size available' },
          { id: 'deliveryLabel', label: '"Feasible delivery technology benefits" heading', type: 'text', default: 'Feasible delivery technology benefits' },
          { id: 'dosageLabel', label: '"Recommended dosage" heading', type: 'text', default: 'Recommended dosage' },
          { id: 'mechanismLabel', label: '"Mechanism of action" heading', type: 'text', default: 'Mechanism of action' },
          { id: 'infoLabel', label: '"Product information" heading', type: 'text', default: 'Product information' },
        ],
      },
      {
        id: 'seo',
        label: 'SEO',
        fields: [
          { id: 'title', label: 'Page title', type: 'text', default: `${label.replace(/ Page$/, '')} | Zeovus Life` },
          { id: 'description', label: 'Meta description', type: 'textarea', default: labels.seoDescription },
        ],
      },
    ],
  };
}

export const nutraceuticals = catalogSchema({
  id: 'nutraceuticals',
  label: 'Nutraceuticals Page',
  preview: '/nutraceuticals',
  hero: {
    titleLead: 'Formulated',
    titleAccent: 'to deliver.',
    stats: [
      { value: '268+', label: 'Formulations' },
      { value: '14', label: 'Categories' },
    ],
    sealImage: '',
    sealLabel: '',
  },
  labels: {
    searchPlaceholder: 'Search formulations, actives or benefits…',
    seoDescription:
      'Explore Zeovus Life nutraceutical manufacturing across healthy ageing, multivitamins, gut health and more. Request a tailored product catalog today.',
  },
});

export const cosmetics = catalogSchema({
  id: 'cosmetics',
  label: 'Cosmetics Page',
  preview: '/cosmetics',
  hero: {
    titleLead: 'Formulated',
    titleAccent: 'to transform.',
    stats: [{ value: '4', label: 'Categories' }],
    sealImage: '',
    sealLabel: '',
  },
  labels: {
    searchPlaceholder: 'Search products, actives or benefits…',
    seoDescription: 'Explore Zeovus Life cosmetic manufacturing across skincare, haircare, sun care and body care. Request a tailored product catalog today.',
  },
});
