'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
const Icons = {
  dna: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6M4 4v2M8 4v4M12 4v2M16 4v4M20 4v2M4 18v2M8 16v4M12 18v2M16 16v4M20 18v2" strokeLinecap="round" /></svg>,
  pill: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  gut: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2M8 14c1.5 0 2-1 3-1s1.5 1 3 1M9 9h.01M15 9h.01" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  heart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  brain: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 2a7 7 0 00-7 7c0 2 .5 3.5 2 5l1 1.5V19a2 2 0 002 2h4a2 2 0 002-2v-3.5L17 14c1.5-1.5 2-3 2-5a7 7 0 00-7-7zM9 22h6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  'shield-plus': () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m3-9c-1.928 1.557-4.378 2.484-7 2.626V9.75c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622V5.626A12.015 12.015 0 0112 3z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  bone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M18.5 5.5a2.121 2.121 0 113 3L8.5 21.5a2.121 2.121 0 11-3-3L18.5 5.5zM5.5 5.5a2.121 2.121 0 100 3l13 13a2.121 2.121 0 100-3l-13-13z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  'heart-pulse': () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1112 5.006a5 5 0 017.5 7.566z" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 12h4l2-3 4 6 2-3h6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  zap: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  scale: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 3v18M3 7l3 9h12l3-9M6 16a3 3 0 006 0M12 16a3 3 0 006 0" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  sparkles: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  baby: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 2a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4zM12 14c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  leaf: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M6 21c3-3 7-3 9-6 2-3 3-9 3-9s-6 1-9 3c-3 2-3 6-6 9M8.5 15.5L3 21" strokeLinecap="round" strokeLinejoin="round" /></svg>,
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

function CategoryCard({ category, index, onClick }) {
  const IconComponent = Icons[category.icon] || Icons.pill;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 50px rgba(31,64,21,0.12)' }}
      onClick={onClick}
      className="group relative cursor-pointer"
      style={{ transition: 'box-shadow 0.4s ease' }}
    >
      <div className="relative h-full bg-white rounded-[20px] overflow-hidden border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.05)]">
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 group-hover:w-2 transition-all duration-500 rounded-l-[20px]" style={{ background: `linear-gradient(180deg, ${category.color_from}, ${category.color_to})` }} />
        
        <div className="pl-7 pr-6 py-7">
          {/* Top row: icon + count */}
          <div className="flex items-start justify-between mb-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-md" style={{ background: `linear-gradient(135deg, ${category.color_from}12, ${category.color_to}12)`, color: category.color_from }}>
              <IconComponent />
            </div>
            <div className="text-right">
              <span className="text-3xl font-display font-bold text-primary-dark editorial-number">{category.product_count}</span>
              <p className="text-[10px] text-neutral-400 uppercase tracking-[0.15em] font-semibold mt-0.5">SKUs</p>
            </div>
          </div>

          {/* Name */}
          <h3 className="font-display font-bold text-[17px] text-primary-dark mb-2 leading-tight group-hover:text-primary-light transition-colors duration-300">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-[13px] text-neutral-500 leading-relaxed mb-5 line-clamp-2">
            {category.description}
          </p>

          {/* Subcategory tags */}
          {category.subcategories?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {category.subcategories.slice(0, 2).map((sub, i) => (
                <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 font-medium">{sub.name}</span>
              ))}
              {category.subcategories.length > 2 && (
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary-light/10 text-primary-light font-medium">+{category.subcategories.length - 2}</span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-[13px] font-semibold transition-all duration-300 group-hover:gap-3" style={{ color: category.color_from }}>
            <span>Explore</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductCard({ product, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.02 }}
      className="group bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden hover:shadow-md hover:border-neutral-300/60 transition-all duration-300"
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h4 className="font-display font-semibold text-[15px] text-primary-dark leading-tight">{product.name}</h4>
          {product.brand_line && <span className="shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary-light/10 text-primary-light">{product.brand_line}</span>}
        </div>
        <p className="text-[13px] text-neutral-500 mb-3 leading-relaxed">{product.primary_benefit}</p>
        {product.key_actives && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.key_actives.split(',').slice(0, expanded ? 100 : 3).map((a, i) => (
              <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-50 text-neutral-600 border border-neutral-100 font-medium">{a.trim()}</span>
            ))}
            {!expanded && product.key_actives.split(',').length > 3 && (
              <button onClick={() => setExpanded(true)} className="text-[11px] px-2 py-0.5 rounded-md bg-primary-light/10 text-primary-light font-semibold hover:bg-primary-light/20 transition-colors">+{product.key_actives.split(',').length - 3}</button>
            )}
          </div>
        )}
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              {product.secondary_benefits && <p className="text-[12px] text-neutral-400 mt-2 pt-2 border-t border-neutral-100"><span className="font-semibold text-neutral-500">Also supports:</span> {product.secondary_benefits}</p>}
              {product.manufacturing_formats && (
                <div className="mt-3 pt-3 border-t border-neutral-100">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-semibold">Formats</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">{product.manufacturing_formats.split('|').map((f, i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium">{f.trim()}</span>)}</div>
                </div>
              )}
              {product.dds_delivery_tech && (
                <div className="mt-3 pt-3 border-t border-neutral-100">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-semibold">Delivery Technology</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">{product.dds_delivery_tech.split('|').map((d, i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium">{d.trim()}</span>)}</div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setExpanded(!expanded)} className="mt-3 text-[12px] text-neutral-400 hover:text-primary-light font-semibold flex items-center gap-1 transition-colors">
          {expanded ? 'Show less' : 'View details'}
          <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100/50 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-3xl" />
          <div className="container relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-primary-light font-semibold text-[11px] tracking-[0.25em] uppercase mb-4">14 Health Categories</p>
              <h2 className="text-[36px] md:text-[48px] font-display font-bold text-primary-dark leading-[1.1] tracking-tight mb-5">268+ Proven Formulations</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto text-[16px] md:text-[17px] leading-[1.7]">Each developed with clinical rigor. Manufactured to international standards. Ready to scale for your brand.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((cat, i) => (
                <CategoryCard key={cat.slug || i} category={cat} index={i} onClick={() => { setSelectedCategory(cat.slug); setActiveSubcategory(null); setSearchTerm(''); }} />
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence mode="wait">
        {selectedCategory && selectedCat && (
          <motion.section key={selectedCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative py-16 md:py-24 bg-white">
            <div className="container">
              <button onClick={() => { setSelectedCategory(null); setProducts([]); setSearchTerm(''); setActiveSubcategory(null); }} className="flex items-center gap-2 text-neutral-500 hover:text-primary-dark mb-10 transition-colors group">
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                <span className="text-sm font-medium">All Categories</span>
              </button>

              {/* Category Header */}
              <div className="flex items-start gap-5 mb-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${selectedCat.color_from}15, ${selectedCat.color_to}15)`, color: selectedCat.color_from }}>
                  {Icons[selectedCat.icon] ? Icons[selectedCat.icon]() : null}
                </div>
                <div>
                  <h2 className="text-[28px] md:text-[36px] font-display font-bold text-primary-dark leading-[1.1] tracking-tight">{selectedCat.name}</h2>
                  <p className="text-neutral-500 text-[15px] mt-2">{selectedCat.description}</p>
                  <p className="text-primary-light font-semibold text-[13px] mt-2">{selectedCat.product_count} formulations available</p>
                </div>
              </div>

              {/* Subcategory Tabs */}
              {selectedCat.subcategories?.length > 0 && (
                <div className="mb-8 overflow-x-auto -mx-4 px-4">
                  <div className="flex gap-2 pb-2 min-w-max">
                    <button onClick={() => setActiveSubcategory(null)} className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap border ${!activeSubcategory ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'}`}>
                      All ({selectedCat.product_count})
                    </button>
                    {selectedCat.subcategories.map(sub => (
                      <button key={sub.id} onClick={() => setActiveSubcategory(sub.id.toString())} className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap border ${activeSubcategory === sub.id.toString() ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'}`}>
                        {sub.name} ({sub.product_count})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search */}
              <div className="relative max-w-md mb-10">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Search products, actives, brands..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/30 focus:border-primary-light transition-all" />
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{[...Array(6)].map((_, i) => <div key={i} className="bg-neutral-100 rounded-2xl p-6 h-44 animate-pulse" />)}</div>
              ) : products.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${selectedCat.color_from}10, ${selectedCat.color_to}10)`, color: selectedCat.color_from }}>
                    {Icons[selectedCat.icon] ? Icons[selectedCat.icon]() : null}
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-800 mb-2">{selectedCat.product_count}+ Formulations</h3>
                  <p className="text-neutral-500 max-w-md mx-auto mb-8">Contact us for the complete catalog with detailed specification sheets and customization options.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold transition-all hover:shadow-lg" style={{ background: `linear-gradient(135deg, ${selectedCat.color_from}, ${selectedCat.color_to})` }}>
                    Request Catalog
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="container relative z-10 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Formulated to Deliver.</h1>
            <p className="text-xl text-white/80 max-w-3xl">268 clinically-backed formulations across 14 health categories. Engineered for bioavailability. Built for your brand.</p>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<div className="py-20"><div className="container"><div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{[...Array(8)].map((_, i) => <div key={i} className="bg-white rounded-[20px] p-7 h-56 border border-neutral-200/60 animate-pulse" />)}</div></div></div>}>
        <NutraceuticalsContent />
      </Suspense>

      {/* CTA */}
      <section className="section-py bg-primary-dark text-white">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Bring us a formulation brief or bring us a problem.</h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">We'll work with you to develop the right formulation and bring it to market.</p>
            <Link href="/contact" className="btn-primary bg-secondary text-primary-dark hover:bg-secondary-dark">Enquire Now</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
