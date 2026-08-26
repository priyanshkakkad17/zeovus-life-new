export const categoriesData = [
  {
    slug: 'healthy-ageing',
    name: 'Healthy Ageing & Cellular Health',
    description: 'Advanced formulations designed to support healthy ageing, cellular vitality and antioxidant protection at the molecular level.',
    icon: 'dna',
    color_from: '#9CCD62',
    color_to: '#15A859',
    sort_order: 1,
    subcategories: [
      { slug: 'healthy-ageing-longevity', name: 'Healthy Ageing & Longevity', sort_order: 1 },
      { slug: 'cellular-antioxidant', name: 'Cellular Health & Antioxidant Support', sort_order: 2 }
    ]
  },
  {
    slug: 'multivitamins',
    name: 'Daily Multivitamins & Foundational Nutrition',
    description: 'Comprehensive daily multivitamins engineered for complete nutritional coverage across demographics.',
    icon: 'pill',
    color_from: '#15A859',
    color_to: '#1A475C',
    sort_order: 2,
    subcategories: [
      { slug: 'daily-multivitamins', name: 'Daily Multivitamins', sort_order: 1 }
    ]
  },
  {
    slug: 'gut-health',
    name: 'Gut Health & Digestive Wellness',
    description: 'Probiotics, prebiotics and digestive enzymes formulated for optimal gut microbiome balance.',
    icon: 'gut',
    color_from: '#1A475C',
    color_to: '#15A859',
    sort_order: 3,
    subcategories: [
      { slug: 'probiotics-prebiotics', name: 'Probiotics & Prebiotics', sort_order: 1 },
      { slug: 'digestive-enzymes', name: 'Digestive Enzymes & Support', sort_order: 2 }
    ]
  },
  {
    slug: 'womens-health',
    name: "Women's Health",
    description: "Specialized formulations addressing women's unique nutritional needs across every life stage — from fertility to menopause.",
    icon: 'heart',
    color_from: '#E879A8',
    color_to: '#9CCD62',
    sort_order: 4,
    subcategories: [
      { slug: 'prenatal-fertility', name: 'Prenatal & Fertility', sort_order: 1 },
      { slug: 'hormonal-balance', name: 'Hormonal Balance', sort_order: 2 },
      { slug: 'womens-multivitamins', name: "Women's Multivitamins", sort_order: 3 }
    ]
  },
  {
    slug: 'mens-health',
    name: "Men's Health",
    description: "Targeted solutions for men's vitality, prostate health, testosterone support and performance optimization.",
    icon: 'shield',
    color_from: '#1A475C',
    color_to: '#1F4015',
    sort_order: 5,
    subcategories: [
      { slug: 'mens-vitality', name: "Men's Vitality & Performance", sort_order: 1 },
      { slug: 'prostate-health', name: 'Prostate Health', sort_order: 2 }
    ]
  },
  {
    slug: 'brain-stress-sleep',
    name: 'Brain, Stress & Sleep',
    description: 'Nootropic, adaptogenic and sleep-support formulations backed by neuroscience for mental wellness.',
    icon: 'brain',
    color_from: '#7C3AED',
    color_to: '#1A475C',
    sort_order: 6,
    subcategories: [
      { slug: 'cognitive-nootropics', name: 'Cognitive & Nootropics', sort_order: 1 },
      { slug: 'stress-adaptogens', name: 'Stress & Adaptogens', sort_order: 2 },
      { slug: 'sleep-support', name: 'Sleep Support', sort_order: 3 }
    ]
  },
  {
    slug: 'immunity',
    name: 'Immunity & Respiratory',
    description: 'Immune-fortifying formulations combining vitamins, minerals, and clinically studied herbal extracts.',
    icon: 'shield-plus',
    color_from: '#DC2626',
    color_to: '#F97316',
    sort_order: 7,
    subcategories: [
      { slug: 'immune-support', name: 'Immune Support', sort_order: 1 },
      { slug: 'respiratory-wellness', name: 'Respiratory Wellness', sort_order: 2 }
    ]
  },
  {
    slug: 'joint-bone',
    name: 'Joint & Bone Health',
    description: 'Comprehensive bone mineralization and joint lubrication support with clinically validated ingredients.',
    icon: 'bone',
    color_from: '#0891B2',
    color_to: '#1A475C',
    sort_order: 8,
    subcategories: [
      { slug: 'joint-mobility', name: 'Joint Mobility & Flexibility', sort_order: 1 },
      { slug: 'bone-density', name: 'Bone Density & Mineralization', sort_order: 2 }
    ]
  },
  {
    slug: 'heart-health',
    name: 'Heart Health',
    description: 'Cardiovascular support formulations with omega-3s, antioxidants and heart-protective nutrients.',
    icon: 'heart-pulse',
    color_from: '#E11D48',
    color_to: '#9CCD62',
    sort_order: 9,
    subcategories: [
      { slug: 'cardiovascular', name: 'Cardiovascular Support', sort_order: 1 },
      { slug: 'cholesterol-bp', name: 'Cholesterol & Blood Pressure', sort_order: 2 }
    ]
  },
  {
    slug: 'energy-sports',
    name: 'Energy, Sports & Recovery',
    description: 'Performance-grade formulations for athletes and active lifestyles — from pre-workout to recovery.',
    icon: 'zap',
    color_from: '#F59E0B',
    color_to: '#15A859',
    sort_order: 10,
    subcategories: [
      { slug: 'pre-workout-energy', name: 'Pre-Workout & Energy', sort_order: 1 },
      { slug: 'recovery-endurance', name: 'Recovery & Endurance', sort_order: 2 },
      { slug: 'protein-muscle', name: 'Protein & Muscle Support', sort_order: 3 }
    ]
  },
  {
    slug: 'weight-management',
    name: 'Weight Management',
    description: 'Science-backed thermogenic, appetite-modulating and metabolic formulations for healthy weight management.',
    icon: 'scale',
    color_from: '#84CC16',
    color_to: '#15A859',
    sort_order: 11,
    subcategories: [
      { slug: 'fat-metabolism', name: 'Fat Metabolism & Thermogenics', sort_order: 1 },
      { slug: 'appetite-control', name: 'Appetite Control', sort_order: 2 }
    ]
  },
  {
    slug: 'beauty',
    name: 'Beauty from Within',
    description: 'Nutri-cosmetics combining collagen, hyaluronic acid and antioxidants for radiant skin, hair and nails.',
    icon: 'sparkles',
    color_from: '#EC4899',
    color_to: '#A855F7',
    sort_order: 12,
    subcategories: [
      { slug: 'skin-radiance', name: 'Skin Radiance & Anti-Ageing', sort_order: 1 },
      { slug: 'hair-nails', name: 'Hair & Nail Health', sort_order: 2 }
    ]
  },
  {
    slug: 'children',
    name: "Children's Nutrition",
    description: 'Kid-friendly, palatable formulations for growing bodies and developing minds with age-appropriate dosing.',
    icon: 'baby',
    color_from: '#06B6D4',
    color_to: '#3B82F6',
    sort_order: 13,
    subcategories: [
      { slug: 'kids-vitamins', name: "Children's Vitamins & Minerals", sort_order: 1 }
    ]
  },
  {
    slug: 'specialty',
    name: 'Specialty Care',
    description: 'Specialized Ayurvedic, botanical and condition-specific formulations for targeted health outcomes.',
    icon: 'leaf',
    color_from: '#059669',
    color_to: '#1F4015',
    sort_order: 14,
    subcategories: [
      { slug: 'ayurvedic-herbs', name: 'Ayurvedic & Herbal', sort_order: 1 },
      { slug: 'condition-specific', name: 'Condition-Specific', sort_order: 2 }
    ]
  }
];
