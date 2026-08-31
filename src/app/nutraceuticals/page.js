'use client';

import CategoryCatalog from '@/components/catalog/CategoryCatalog';

const staticCategories = [
  { id: 1, slug: 'healthy-ageing', name: 'Healthy Ageing & Cellular Health', description: 'Advanced formulations designed to support healthy ageing, cellular vitality and antioxidant protection at the molecular level.', icon: 'dna', color_from: '#9CCD62', color_to: '#15A859', product_count: 27, subcategories: [], image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868213/nura-1.png', highlights: ['CoQ10 & PQQ', 'NAD+ Precursors', 'Resveratrol Blends', 'Telomere Support', 'Mitochondrial Health'] },
  { id: 2, slug: 'multivitamins', name: 'Daily Multivitamins & Foundational Nutrition', description: 'Comprehensive daily multivitamins engineered for complete nutritional coverage across demographics.', icon: 'pill', color_from: '#15A859', color_to: '#1A475C', product_count: 28, subcategories: [], image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868214/nura-2.png', highlights: ['One-a-Day Formulas', 'Gender-Specific', 'Age-Targeted', 'Whole Food Based', 'High Bioavailability'] },
  { id: 3, slug: 'gut-health', name: 'Gut Health & Digestive Wellness', description: 'Probiotics, prebiotics and digestive enzymes formulated for optimal gut barrier function and microbiome balance.', icon: 'gut', color_from: '#1A475C', color_to: '#15A859', product_count: 28, subcategories: [], image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868213/nura-3.png', highlights: ['Multi-Strain Probiotics', 'Prebiotic Fibres', 'Digestive Enzymes', 'Gut Barrier Support', 'Microbiome Balance'] },
  { id: 4, slug: 'womens-health', name: "Women's Health", description: "Targeted formulations for women's nutritional needs across all life stages, from fertility to menopause.", icon: 'heart', color_from: '#E879A8', color_to: '#9CCD62', product_count: 46, subcategories: [], image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868216/nura-4.png', highlights: ['Hormonal Balance', 'PCOS Support', 'Prenatal & Postnatal', 'Menopause Relief', 'Iron & Folate'] },
  { id: 5, slug: 'mens-health', name: "Men's Health", description: "Performance-driven solutions for men's vitality, hormonal health, and recovery.", icon: 'shield', color_from: '#1A475C', color_to: '#1F4015', product_count: 18, subcategories: [], image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868212/nura-5.png', highlights: ['Testosterone Support', 'Prostate Health', 'Fertility Blends', 'Stamina & Vitality', 'Muscle Recovery'] },
  { id: 6, slug: 'brain-stress-sleep', name: 'Brain, Stress & Sleep', description: 'Nootropic and adaptogenic formulations for cognitive performance, stress resilience and restorative sleep.', icon: 'brain', color_from: '#7C3AED', color_to: '#1A475C', product_count: 41, subcategories: [], image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868231/nura-6.png', highlights: ['Nootropic Stacks', 'Adaptogen Blends', 'Sleep Formulas', 'Stress & Cortisol', 'Focus & Memory'] },
  { id: 7, slug: 'immunity', name: 'Immunity & Respiratory', description: 'Immune-fortifying formulations with clinically studied extracts for year-round defence.', icon: 'shield-plus', color_from: '#DC2626', color_to: '#F97316', product_count: 38, subcategories: [], image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868212/nura-7.png', highlights: ['Vitamin C & Zinc', 'Elderberry Extracts', 'Beta-Glucans', 'Respiratory Support', 'Seasonal Defence'] },
  { id: 8, slug: 'joint-bone', name: 'Joint & Bone Health', description: 'Clinically validated ingredients for joint mobility, bone density and connective tissue support.', icon: 'bone', color_from: '#0891B2', color_to: '#1A475C', product_count: 35, subcategories: [], image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868229/nura-8.png', highlights: ['Glucosamine & MSM', 'Collagen Peptides', 'Calcium & Vitamin D', 'Curcumin Complexes', 'Mobility Support'] },
  { id: 9, slug: 'heart-health', name: 'Heart Health', description: 'Cardiovascular support formulations with omega-3s, CoQ10 and plant-based cardio-protective nutrients.', icon: 'heart-pulse', color_from: '#E11D48', color_to: '#9CCD62', product_count: 28, subcategories: [], highlights: ['Omega-3 EPA/DHA', 'CoQ10 Ubiquinol', 'Plant Sterols', 'Magnesium Blends', 'Blood Pressure Support'] },
  { id: 10, slug: 'energy-sports', name: 'Energy, Sports & Recovery', description: 'Performance-grade formulations for athletes and active lifestyles, from pre-workout to recovery.', icon: 'zap', color_from: '#F59E0B', color_to: '#15A859', product_count: 35, subcategories: [], highlights: ['Pre-Workout Blends', 'BCAA & EAA', 'Electrolyte Formulas', 'Recovery Complexes', 'Natural Energy'] },
  { id: 11, slug: 'weight-management', name: 'Weight Management', description: 'Science-backed metabolic formulations for sustainable weight management and body composition.', icon: 'scale', color_from: '#84CC16', color_to: '#15A859', product_count: 16, subcategories: [], highlights: ['Thermogenic Blends', 'Appetite Control', 'Metabolic Boosters', 'CLA & L-Carnitine', 'Fibre Complexes'] },
  { id: 12, slug: 'beauty', name: 'Beauty from Within', description: 'Nutri-cosmetics for radiant skin, stronger hair and healthier nails from the inside out.', icon: 'sparkles', color_from: '#EC4899', color_to: '#A855F7', product_count: 32, subcategories: [], highlights: ['Marine Collagen', 'Biotin & Keratin', 'Hyaluronic Acid', 'Skin Glow Blends', 'Hair & Nail Complex'] },
  { id: 13, slug: 'children', name: "Children's Nutrition", description: 'Kid-friendly formulations in fun formats for growing bodies and developing minds.', icon: 'baby', color_from: '#06B6D4', color_to: '#3B82F6', product_count: 5, subcategories: [], highlights: ['Gummy Vitamins', 'Growth Support', 'Immunity Boosters', 'Omega for Kids', 'Calcium Chews'] },
  { id: 14, slug: 'specialty', name: 'Specialty Care', description: 'Ayurvedic, botanical and condition-specific formulations for targeted health outcomes.', icon: 'leaf', color_from: '#059669', color_to: '#1F4015', product_count: 24, subcategories: [], highlights: ['Ayurvedic Blends', 'Liver Detox', 'Eye Health', 'Diabetic Support', 'Herbal Extracts'] },
];

const hero = {
  titleLead: 'Formulated',
  titleAccent: 'to deliver.',
  stats: [
    { value: '268+', label: 'Formulations' },
    { value: '14', label: 'Categories' },
  ],
};

export default function Nutraceuticals() {
  return (
    <CategoryCatalog
      division="nutraceuticals"
      basePath="/nutraceuticals"
      staticCategories={staticCategories}
      hero={hero}
    />
  );
}
