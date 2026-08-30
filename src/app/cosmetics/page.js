'use client';

import CategoryCatalog from '@/components/catalog/CategoryCatalog';

// Fallback categories shown before any cosmetics categories are added in admin.
// Once cosmetics categories exist in the database, the live list replaces these.
const staticCategories = [
  { id: 1, slug: 'skincare', name: 'Skincare', description: 'Creams, serums, lotions and treatments developed for every skin type and concern.', icon: 'sparkles', color_from: '#EC4899', color_to: '#A855F7', product_count: 0, subcategories: [], highlights: ['Vitamin C', 'Retinol', 'Hyaluronic Acid', 'Niacinamide', 'Peptides'] },
  { id: 2, slug: 'haircare', name: 'Haircare', description: 'Shampoos, conditioners, treatments and styling products for scalp and strand health.', icon: 'droplet', color_from: '#0891B2', color_to: '#1A475C', product_count: 0, subcategories: [], highlights: ['Biotin', 'Keratin', 'Argan Oil', 'Caffeine', 'Saw Palmetto'] },
  { id: 3, slug: 'sun-care', name: 'Sun Care', description: 'Sunscreens, after-sun products and broad-spectrum UV protection formulas.', icon: 'sun', color_from: '#F59E0B', color_to: '#F97316', product_count: 0, subcategories: [], highlights: ['Zinc Oxide', 'Titanium Dioxide', 'Vitamin E', 'Aloe Vera', 'Niacinamide'] },
  { id: 4, slug: 'body-care', name: 'Body Care', description: 'Body lotions, butters, oils and hand care products for everyday nourishment.', icon: 'leaf', color_from: '#84CC16', color_to: '#15A859', product_count: 0, subcategories: [], highlights: ['Shea Butter', 'Coconut Oil', 'Glycerin', 'Urea', 'Collagen'] },
];

const hero = {
  titleLead: 'Formulated',
  titleAccent: 'to transform.',
  stats: [
    { value: '4', label: 'Categories' },
    { value: 'ZQA', label: 'Quality Standard' },
  ],
};

const cta = {
  eyebrow: 'Bring us the brief',
  heading: "Let's build your next launch.",
  body: "Bring us your formulation brief and we'll create cosmetics your customers will love.",
};

export default function Cosmetics() {
  return (
    <CategoryCatalog
      division="cosmetics"
      basePath="/cosmetics"
      staticCategories={staticCategories}
      hero={hero}
      cta={cta}
    />
  );
}
