'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Icons — monochrome, currentColor driven
const Icons = {
  dna: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6M4 4v2M8 4v4M12 4v2M16 4v4M20 4v2M4 18v2M8 16v4M12 18v2M16 16v4M20 18v2" strokeLinecap="round" /></svg>,
  pill: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  gut: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2M8 14c1.5 0 2-1 3-1s1.5 1 3 1M9 9h.01M15 9h.01" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  heart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  brain: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 2a7 7 0 00-7 7c0 2 .5 3.5 2 5l1 1.5V19a2 2 0 002 2h4a2 2 0 002-2v-3.5L17 14c1.5-1.5 2-3 2-5a7 7 0 00-7-7zM9 22h6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  'shield-plus': () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m3-9c-1.928 1.557-4.378 2.484-7 2.626V9.75c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622V5.626A12.015 12.015 0 0112 3z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  bone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M18.5 5.5a2.121 2.121 0 113 3L8.5 21.5a2.121 2.121 0 11-3-3L18.5 5.5zM5.5 5.5a2.121 2.121 0 100 3l13 13a2.121 2.121 0 100-3l-13-13z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  'heart-pulse': () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1112 5.006a5 5 0 017.5 7.566z" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 12h4l2-3 4 6 2-3h6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  zap: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  scale: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 3v18M3 7l3 9h12l3-9M6 16a3 3 0 006 0M12 16a3 3 0 006 0" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  sparkles: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  baby: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 2a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4zM12 14c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  leaf: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M6 21c3-3 7-3 9-6 2-3 3-9 3-9s-6 1-9 3c-3 2-3 6-6 9M8.5 15.5L3 21" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

const staticCategories = [
  { id: 1, slug: 'healthy-ageing', name: 'Healthy Ageing & Cellular Health', description: 'Advanced formulations for healthy ageing and antioxidant protection.', icon: 'dna', color_from: '#9CCD62', color_to: '#15A859', product_count: 27, subcategories: [] },
  { id: 2, slug: 'multivitamins', name: 'Daily Multivitamins & Foundational Nutrition', description: 'Comprehensive daily multivitamins for complete nutritional coverage.', icon: 'pill', color_from: '#15A859', color_to: '#1A475C', product_count: 28, subcategories: [] },
  { id: 3, slug: 'gut-health', name: 'Gut Health & Digestive Wellness', description: 'Probiotics, prebiotics and digestive enzymes for gut balance.', icon: 'gut', color_from: '#1A475C', color_to: '#15A859', product_count: 28, subcategories: [] },
  { id: 4, slug: 'womens-health', name: "Women's Health", description: "Formulations for women's nutritional needs across life stages.", icon: 'heart', color_from: '#E879A8', color_to: '#9CCD62', product_count: 46, subcategories: [] },
  { id: 5, slug: 'mens-health', name: "Men's Health", description: "Targeted solutions for men's vitality and performance.", icon: 'shield', color_from: '#1A475C', color_to: '#1F4015', product_count: 18, subcategories: [] },
  { id: 6, slug: 'brain-stress-sleep', name: 'Brain, Stress & Sleep', description: 'Nootropic and adaptogenic formulations for mental wellness.', icon: 'brain', color_from: '#7C3AED', color_to: '#1A475C', product_count: 41, subcategories: [] },
  { id: 7, slug: 'immunity', name: 'Immunity & Respiratory', description: 'Immune-fortifying formulations with clinically studied extracts.', icon: 'shield-plus', color_from: '#DC2626', color_to: '#F97316', product_count: 38, subcategories: [] },
  { id: 8, slug: 'joint-bone', name: 'Joint & Bone Health', description: 'Bone and joint support with clinically validated ingredients.', icon: 'bone', color_from: '#0891B2', color_to: '#1A475C', product_count: 35, subcategories: [] },
  { id: 9, slug: 'heart-health', name: 'Heart Health', description: 'Cardiovascular support with heart-healthy nutrients.', icon: 'heart-pulse', color_from: '#E11D48', color_to: '#9CCD62', product_count: 28, subcategories: [] },
  { id: 10, slug: 'energy-sports', name: 'Energy, Sports & Recovery', description: 'Performance-grade formulations for active lifestyles.', icon: 'zap', color_from: '#F59E0B', color_to: '#15A859', product_count: 35, subcategories: [] },
  { id: 11, slug: 'weight-management', name: 'Weight Management', description: 'Science-backed metabolic formulations for weight management.', icon: 'scale', color_from: '#84CC16', color_to: '#15A859', product_count: 16, subcategories: [] },
  { id: 12, slug: 'beauty', name: 'Beauty from Within', description: 'Nutri-cosmetics for radiant skin, hair and nails.', icon: 'sparkles', color_from: '#EC4899', color_to: '#A855F7', product_count: 32, subcategories: [] },
  { id: 13, slug: 'children', name: "Children's Nutrition", description: 'Kid-friendly formulations for growing bodies.', icon: 'baby', color_from: '#06B6D4', color_to: '#3B82F6', product_count: 5, subcategories: [] },
  { id: 14, slug: 'specialty', name: 'Specialty Care', description: 'Ayurvedic, botanical and condition-specific formulations.', icon: 'leaf', color_from: '#059669', color_to: '#1F4015', product_count: 24, subcategories: [] },
];

// Placeholder visual — stands in for real product/category photography.
// Swap for a real <img src={category.image} /> once photography is available.
function PlaceholderPhoto({ colorFrom, colorTo, icon: IconComponent, className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${colorFrom}1A, ${colorTo}2A)` }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]" aria-hidden="true">
        <defs>
          <pattern id={`ph-${colorFrom.replace('#', '')}`} x="0" y="0" width="34" height="30" patternUnits="userSpaceOnUse">
            <polygon points="17,1 32,9 32,21 17,29 2,21 2,9" fill="none" stroke={colorTo} strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ph-${colorFrom.replace('#', '')})`} />
      </svg>
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm sm:h-16 sm:w-16"
        style={{ color: colorFrom }}
      >
        {IconComponent && <IconComponent />}
      </div>
    </div>
  );
}

function CategoryCard({ category, index, onClick }) {
  const IconComponent = Icons[category.icon] || Icons.pill;
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative flex flex-col text-left"
    >
      <div className="relative overflow-hidden rounded-[6px]">
        <PlaceholderPhoto
          colorFrom={category.color_from}
          colorTo={category.color_to}
          icon={IconComponent}
          className="aspect-[5/4] w-full transition-transform duration-700 ease-out-quint group-hover:scale-[1.03]"
        />
        {/* Count badge */}
        <div className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 backdrop-blur-sm">
          <span className="font-heading text-[11px] font-bold text-primary-dark">
            {category.product_count} formulations
          </span>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="font-heading text-[16px] font-semibold leading-snug text-primary-dark transition-colors duration-300 group-hover:text-primary-light">
          {category.name}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500 line-clamp-2">
          {category.description}
        </p>
        <div className="mt-3 flex items-center gap-2 font-heading text-[12px] font-semibold uppercase tracking-[1px] text-primary-light">
          <span>Explore</span>
          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

function ProductCard({ product, category, index }) {
  const [expanded, setExpanded] = useState(false);
  const IconComponent = (category && Icons[category.icon]) || Icons.pill;
  const colorFrom = category?.color_from || '#15A859';
  const colorTo = category?.color_to || '#1A475C';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 9) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <div className="overflow-hidden rounded-[6px]">
        <PlaceholderPhoto
          colorFrom={colorFrom}
          colorTo={colorTo}
          icon={IconComponent}
          className="aspect-[4/3] w-full transition-transform duration-700 ease-out-quint group-hover:scale-[1.03]"
        />
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-heading text-[15px] font-semibold leading-tight text-primary-dark">{product.name}</h4>
          {product.brand_line && (
            <span className="flex-shrink-0 whitespace-nowrap font-heading text-[10px] font-semibold uppercase tracking-[0.5px] text-primary-light">
              {product.brand_line}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">{product.primary_benefit}</p>

        {product.key_actives && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.key_actives.split(',').slice(0, expanded ? 100 : 3).map((a, i) => (
              <span key={i} className="rounded-sm border border-neutral-200 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                {a.trim()}
              </span>
            ))}
            {!expanded && product.key_actives.split(',').length > 3 && (
              <button
                onClick={() => setExpanded(true)}
                className="rounded-sm px-2 py-0.5 text-[11px] font-semibold text-primary-light transition-colors hover:bg-primary-light/10"
              >
                +{product.key_actives.split(',').length - 3}
              </button>
            )}
          </div>
        )}

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              {product.secondary_benefits && (
                <p className="mt-3 border-t border-neutral-100 pt-3 text-[12px] leading-relaxed text-neutral-500">
                  <span className="font-semibold text-neutral-600">Also supports — </span>{product.secondary_benefits}
                </p>
              )}
              {product.manufacturing_formats && (
                <div className="mt-3 border-t border-neutral-100 pt-3">
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">Formats</span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {product.manufacturing_formats.split('|').map((f, i) => (
                      <span key={i} className="rounded-sm bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">{f.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
              {product.dds_delivery_tech && (
                <div className="mt-3 border-t border-neutral-100 pt-3">
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">Delivery Technology</span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {product.dds_delivery_tech.split('|').map((d, i) => (
                      <span key={i} className="rounded-sm bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">{d.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.5px] text-neutral-400 transition-colors hover:text-primary-light"
        >
          {expanded ? 'Show less' : 'View details'}
          <svg className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function NutraceuticalsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || null);
  const [categories, setCategories] = useState(staticCategories);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  useEffect(() => { if (categoryParam) setSelectedCategory(categoryParam); }, [categoryParam]);
  useEffect(() => { fetch('/api/categories').then(r => r.json()).then(data => { if (Array.isArray(data) && data.length > 0) setCategories(data); }).catch(() => {}); }, []);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      const params = new URLSearchParams({ category: selectedCategory, limit: '200' });
      if (activeSubcategory) params.set('subcategory', activeSubcategory);
      if (searchTerm) params.set('search', searchTerm);
      fetch(`/api/products?${params}`).then(r => r.json()).then(data => { setProducts(data.products || []); setLoading(false); }).catch(() => setLoading(false));
    }
  }, [selectedCategory, activeSubcategory, searchTerm]);

  const selectedCat = categories.find(c => c.slug === selectedCategory);

  return (
    <>
      {!selectedCategory && (
        <section className="relative bg-white py-20 sm:py-26 lg:py-30">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-14 max-w-[640px] lg:mb-16"
            >
              <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">
                The Full Range
              </p>
              <h2 className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px]">
                Browse by health category.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                Every category is formulated in-house and manufactured on certified
                lines. Select one to see the formulations inside it.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat, i) => (
                <CategoryCard
                  key={cat.slug || i}
                  category={cat}
                  index={i}
                  onClick={() => { setSelectedCategory(cat.slug); setActiveSubcategory(null); setSearchTerm(''); }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence mode="wait">
        {selectedCategory && selectedCat && (
          <motion.section
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative bg-white py-16 sm:py-20 lg:py-24"
          >
            <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
              <button
                onClick={() => { setSelectedCategory(null); setProducts([]); setSearchTerm(''); setActiveSubcategory(null); }}
                className="group mb-10 inline-flex items-center gap-2 font-heading text-[12px] font-semibold uppercase tracking-[1px] text-neutral-500 transition-colors hover:text-primary-dark"
              >
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m0 0l6-6m-6 6l6 6" />
                </svg>
                All Categories
              </button>

              {/* Category Header — photo banner */}
              <div className="mb-10 overflow-hidden rounded-[6px]">
                <div className="relative">
                  <PlaceholderPhoto
                    colorFrom={selectedCat.color_from}
                    colorTo={selectedCat.color_to}
                    icon={Icons[selectedCat.icon] || Icons.pill}
                    className="h-[160px] w-full sm:h-[200px]"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/35 via-black/0 to-black/0 p-6 sm:p-8">
                    <h2 className="font-heading text-[24px] font-bold uppercase leading-[1.05] tracking-[-0.5px] text-white drop-shadow sm:text-[30px]">
                      {selectedCat.name}
                    </h2>
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 backdrop-blur-sm sm:right-6 sm:top-6">
                    <span className="font-heading text-[11px] font-bold text-primary-dark">
                      {selectedCat.product_count} formulations
                    </span>
                  </div>
                </div>
                <p className="mt-4 max-w-[600px] text-[14px] leading-relaxed text-neutral-500">
                  {selectedCat.description}
                </p>
              </div>

              {/* Subcategory tabs — underline style */}
              {selectedCat.subcategories?.length > 0 && (
                <div className="mb-8 -mx-1 flex gap-6 overflow-x-auto border-b border-neutral-100 px-1">
                  <button
                    onClick={() => setActiveSubcategory(null)}
                    className={`flex-shrink-0 whitespace-nowrap border-b-2 pb-3 font-heading text-[12px] font-semibold uppercase tracking-[0.5px] transition-colors ${
                      !activeSubcategory ? 'border-primary-light text-primary-dark' : 'border-transparent text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    All ({selectedCat.product_count})
                  </button>
                  {selectedCat.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubcategory(sub.id.toString())}
                      className={`flex-shrink-0 whitespace-nowrap border-b-2 pb-3 font-heading text-[12px] font-semibold uppercase tracking-[0.5px] transition-colors ${
                        activeSubcategory === sub.id.toString() ? 'border-primary-light text-primary-dark' : 'border-transparent text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      {sub.name} ({sub.product_count})
                    </button>
                  ))}
                </div>
              )}

              {/* Search — minimal underline field */}
              <div className="relative mb-10 max-w-md">
                <svg className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products, actives, brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-b border-neutral-200 bg-transparent py-2.5 pl-7 text-[14px] text-primary-dark placeholder:text-neutral-400 focus:border-primary-light focus:outline-none"
                />
              </div>

              {/* Products */}
              {loading ? (
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[4/3] w-full rounded-[6px] bg-neutral-100" />
                      <div className="mt-4 h-3 w-2/3 rounded-sm bg-neutral-100" />
                      <div className="mt-2 h-3 w-1/2 rounded-sm bg-neutral-100" />
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p, i) => (
                    <ProductCard key={p.id} product={p} category={selectedCat} index={i} />
                  ))}
                </div>
              ) : (
                <div className="border-t border-neutral-100 py-16 text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-primary-dark">
                    {Icons[selectedCat.icon] ? Icons[selectedCat.icon]() : null}
                  </div>
                  <h3 className="font-heading text-[18px] font-bold text-primary-dark">
                    {selectedCat.product_count}+ Formulations
                  </h3>
                  <p className="mx-auto mt-2 mb-7 max-w-md text-[14px] leading-relaxed text-neutral-500">
                    Contact us for the complete catalog with detailed specification sheets and customization options.
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-primary-light"
                  >
                    <span className="relative">
                      Request Catalog
                      <span className="absolute -bottom-px left-0 h-px w-0 bg-primary-light transition-all duration-400 group-hover:w-full" />
                    </span>
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Nutraceuticals() {
  return (
    <div className="bg-white">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-primary-dark pt-32 pb-16 text-white sm:pt-36 lg:pt-40 lg:pb-24">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
          <defs>
            <pattern id="nutra-hex-grid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="#ffffff" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nutra-hex-grid)" />
        </svg>

        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-5 font-heading text-[11px] font-bold uppercase tracking-[3px] text-secondary/70">
                Nutraceuticals
              </p>
              <h1 className="max-w-[720px] font-heading text-[38px] font-bold uppercase leading-[1.02] tracking-[-1.5px] sm:text-[52px] lg:text-[64px]">
                Formulated
                <br />
                <span className="text-secondary">to deliver.</span>
              </h1>
              <p className="mt-7 max-w-[600px] text-[16px] leading-relaxed text-neutral-300 sm:text-[17px]">
                268+ clinically-backed formulations across 14 health categories.
                Engineered for bioavailability. Manufactured to certified standards.
                Built for your brand.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block cursor-pointer rounded-[2px] bg-secondary px-7 py-3.5 font-heading text-xs font-semibold tracking-widest text-primary-dark transition-colors hover:bg-secondary-dark"
                  >
                    ENQUIRE NOW
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            {/* Stat column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-10 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
            >
              <div>
                <span className="editorial-number block font-heading text-[42px] font-bold text-secondary lg:text-[50px]">268+</span>
                <span className="mt-2 block font-heading text-[11px] uppercase tracking-[2px] text-neutral-400">Formulations</span>
              </div>
              <div>
                <span className="editorial-number block font-heading text-[42px] font-bold text-secondary lg:text-[50px]">14</span>
                <span className="mt-2 block font-heading text-[11px] uppercase tracking-[2px] text-neutral-400">Categories</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Suspense fallback={
        <div className="bg-white py-20">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-x-12 lg:grid-cols-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-20 animate-pulse border-b border-neutral-100 py-5">
                  <div className="h-3 w-2/3 rounded-sm bg-neutral-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }>
        <NutraceuticalsContent />
      </Suspense>

      {/* ============ CLOSING CTA ============ */}
      <section className="relative overflow-hidden bg-primary-dark py-20 text-white sm:py-26 lg:py-30">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 110%, rgba(21,168,89,0.08) 0%, transparent 70%)' }}
        />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border border-white/[0.03]" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full border border-white/[0.02]" />

        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 max-w-[640px] text-center lg:mb-0 lg:text-left"
            >
              <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[3px] text-secondary/60">
                Bring us the brief
              </p>
              <h2 className="mb-5 font-heading text-[32px] font-bold uppercase leading-[1.02] tracking-[-1px] sm:text-[40px] lg:text-[46px]">
                Bring us a formulation brief —
                <br className="hidden sm:block" /> or bring us a problem.
              </h2>
              <p className="max-w-[480px] text-[15px] leading-relaxed text-neutral-300 sm:text-[16px] lg:mx-0 mx-auto">
                We'll work with you to develop the right formulation and bring it to market.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex cursor-pointer items-center gap-3 rounded-[3px] bg-secondary px-7 py-4 font-heading text-[12px] font-semibold uppercase tracking-[1.5px] text-primary-dark transition-colors duration-300 hover:bg-secondary-dark sm:px-8"
                >
                  Enquire Now
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
