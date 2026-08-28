'use client';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
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

// ─── Side dot navigation ─────────────────────────────────────────────────────
function DotNav({ categories, activeIndex, onDotClick }) {
  return (
    <div className="fixed right-5 top-1/2 z-[90] -translate-y-1/2 flex flex-col gap-2.5 sm:right-7">
      {categories.map((cat, i) => (
        <button
          key={cat.slug || i}
          onClick={() => onDotClick(i)}
          aria-label={cat.name}
          title={cat.name}
          className="group relative flex items-center justify-end"
        >
          {/* Tooltip */}
          <span className="pointer-events-none absolute right-7 whitespace-nowrap rounded bg-black/80 px-3 py-1.5 font-heading text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-sm">
            {cat.name}
          </span>
          {/* Dot */}
          <span
            className={`block rounded-full transition-all duration-400 ${
              activeIndex === i
                ? 'h-3 w-3 bg-white shadow-lg shadow-white/30'
                : 'h-2 w-2 bg-white/30 group-hover:bg-white/60'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Editorial scroll — snap cards in page-level scroll container ─────────────
function EditorialScroll({ categories }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);

  const scrollToCard = useCallback((index) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Track which card is active via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [categories.length]);

  return (
    <>
      <DotNav categories={categories} activeIndex={activeIndex} onDotClick={scrollToCard} />
      {categories.map((cat, i) => (
        <div
          key={cat.slug || i}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="relative h-screen w-full snap-start snap-always overflow-hidden"
        >
            {/* Background image */}
            {cat.image ? (
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover scale-[1.05]"
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(160deg, ${cat.color_from}, ${cat.color_to})` }}
              />
            )}

            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)' }} />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-12 lg:p-16 xl:p-20">
              <div className="mb-8 sm:mb-10 lg:mb-12">
                <p className="mb-4 font-heading text-[13px] font-medium tracking-[2.5px] text-white/70">
                  Category {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="max-w-[750px] font-heading text-[40px] font-bold leading-[1.06] tracking-[-0.5px] text-white sm:text-[54px] lg:text-[66px] xl:text-[74px]">
                  {cat.name}
                </h2>
                <p className="mt-5 max-w-[500px] text-[15px] leading-[1.75] text-white/75 sm:text-[16px]">
                  {cat.description}
                </p>
                <Link
                  href={`/nutraceuticals?category=${cat.slug}`}
                  className="group mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[1px] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:shadow-white/5"
                >
                  Explore More
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </Link>
              </div>

              {/* Bottom bar */}
              <div className="flex flex-wrap items-end gap-x-14 gap-y-4 border-t border-white/15 pt-7 pb-2">
                <div>
                  <p className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[2px] text-white/50">Format</p>
                  <p className="text-[15px] font-semibold text-white">Contract Manufacturing</p>
                </div>
                <div>
                  <p className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[2px] text-white/50">Products</p>
                  <p className="text-[15px] font-semibold text-white">{cat.product_count}</p>
                </div>
                {cat.highlights && (
                  <div className="ml-auto hidden lg:block">
                    <p className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[2px] text-white/50">Key Offerings</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.highlights.slice(0, 5).map((h, hi) => (
                        <span key={hi} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[12px] font-medium text-white/80 backdrop-blur-sm">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scroll hint on first card */}
            {i === 0 && (
              <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
                <span className="font-heading text-[9px] font-medium uppercase tracking-[2px] text-white/40">Scroll</span>
                <svg className="h-4 w-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

// ─── View mode toggle (floating) ─────────────────────────────────────────────
function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="fixed top-6 right-6 z-[100]">
      <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/70 p-1.5 shadow-2xl backdrop-blur-md">
        <button
          onClick={() => setViewMode('editorial')}
          className={`flex items-center gap-2 rounded-full px-4 py-2 font-heading text-[11px] font-semibold tracking-[0.5px] transition-all duration-300 ${
            viewMode === 'editorial' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
          }`}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="14" height="14" rx="2" />
          </svg>
          Editorial
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center gap-2 rounded-full px-4 py-2 font-heading text-[11px] font-semibold tracking-[0.5px] transition-all duration-300 ${
            viewMode === 'list' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
          }`}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="2" width="5" height="5" rx="1" />
            <rect x="9" y="2" width="5" height="5" rx="1" />
            <rect x="1" y="9" width="5" height="5" rx="1" />
            <rect x="9" y="9" width="5" height="5" rx="1" />
          </svg>
          List
        </button>
      </div>
    </div>
  );
}

// ─── List view card ──────────────────────────────────────────────────────────
function ListCard({ category, index }) {
  const IconComponent = Icons[category.icon] || Icons.pill;
  return (
    <Link
      href={`/nutraceuticals?category=${category.slug}`}
      className="group flex items-center gap-6 border-b border-neutral-200 py-6 transition-colors hover:bg-neutral-50 px-4 -mx-4 rounded-lg"
    >
      <span className="hidden sm:block font-heading text-[13px] font-bold text-neutral-300 w-8">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: `linear-gradient(135deg, ${category.color_from}20, ${category.color_to}30)`, color: category.color_from }}
      >
        <IconComponent />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-[16px] font-bold text-primary-dark group-hover:text-primary-light transition-colors sm:text-[18px]">
          {category.name}
        </h3>
        <p className="mt-1 text-[13px] text-neutral-500 truncate">{category.description}</p>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <div className="text-right">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Products</span>
          <span className="block text-[14px] font-bold text-primary-dark">{category.product_count}</span>
        </div>
      </div>
      <svg className="h-5 w-5 flex-shrink-0 text-neutral-300 transition-all duration-300 group-hover:text-primary-light group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

// ─── Product card (unchanged from before) ────────────────────────────────────
function ProductCard({ product, category, index }) {
  const [expanded, setExpanded] = useState(false);
  const IconComponent = (category && Icons[category.icon]) || Icons.pill;
  const colorFrom = category?.color_from || '#15A859';
  const colorTo = category?.color_to || '#1A475C';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200/60 hover:border-neutral-200"
    >
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})` }} />
      <div className="overflow-hidden">
        <div
          className="flex aspect-[5/3] w-full items-center justify-center transition-transform duration-700 ease-out-quint group-hover:scale-[1.03]"
          style={{ background: `linear-gradient(135deg, ${colorFrom}1A, ${colorTo}2A)` }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm" style={{ color: colorFrom }}>
            {IconComponent && <IconComponent />}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-heading text-[16px] font-bold leading-tight text-primary-dark">{product.name}</h4>
          {product.brand_line && (
            <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-primary-light/10 px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.5px] text-primary-light">
              {product.brand_line}
            </span>
          )}
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">{product.primary_benefit}</p>
        {product.key_actives && (
          <div className="mt-4">
            <span className="mb-2 block font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">Key Actives</span>
            <div className="flex flex-wrap gap-1.5">
              {product.key_actives.split(',').slice(0, expanded ? 100 : 3).map((a, i) => (
                <span key={i} className="rounded-full border border-primary-light/20 bg-primary-light/5 px-2.5 py-1 text-[11px] font-medium text-primary-dark">{a.trim()}</span>
              ))}
              {!expanded && product.key_actives.split(',').length > 3 && (
                <button onClick={() => setExpanded(true)} className="rounded-full bg-primary-light/10 px-2.5 py-1 text-[11px] font-bold text-primary-light transition-colors hover:bg-primary-light/20">
                  +{product.key_actives.split(',').length - 3} more
                </button>
              )}
            </div>
          </div>
        )}
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              {product.secondary_benefits && (
                <div className="mt-4 rounded-lg bg-neutral-50 p-3.5">
                  <span className="mb-1.5 block font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">Also Supports</span>
                  <p className="text-[12px] leading-relaxed text-neutral-600">{product.secondary_benefits}</p>
                </div>
              )}
              {product.manufacturing_formats && (
                <div className="mt-4">
                  <span className="mb-2 block font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">Formats</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.manufacturing_formats.split('|').map((f, i) => (
                      <span key={i} className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-medium text-neutral-700">{f.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
              {product.dds_delivery_tech && (
                <div className="mt-4">
                  <span className="mb-2 block font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">Delivery Technology</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.dds_delivery_tech.split('|').map((d, i) => (
                      <span key={i} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-medium text-neutral-600 shadow-sm">{d.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-neutral-200 px-4 py-2 font-heading text-[11px] font-semibold uppercase tracking-[0.5px] text-neutral-500 transition-all duration-300 hover:border-primary-light hover:bg-primary-light/5 hover:text-primary-light"
        >
          {expanded ? 'Show less' : 'View details'}
          <svg className={`h-3 w-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main content ────────────────────────────────────────────────────────────
function NutraceuticalsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || null);
  const [categories, setCategories] = useState(staticCategories);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [viewMode, setViewMode] = useState('editorial');

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
      {/* ===== SNAP SCROLL CARDS ===== */}
      {!selectedCategory && (
        <section className="relative">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

          {viewMode === 'editorial' && (
            <EditorialScroll categories={categories} />
          )}

          {viewMode === 'list' && (
            <div className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8 sm:py-20">
              <div className="mb-10">
                <h2 className="font-heading text-[28px] font-bold text-primary-dark sm:text-[34px]">All Categories</h2>
                <p className="mt-2 text-[15px] text-neutral-500">14 health categories. 268+ formulations.</p>
              </div>
              <div>
                {categories.map((cat, i) => (
                  <ListCard key={cat.slug || i} category={cat} index={i} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ===== PRODUCT DETAIL VIEW ===== */}
      <AnimatePresence mode="wait">
        {selectedCategory && selectedCat && (
          <motion.section
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative bg-white py-16 sm:py-20 lg:py-24"
          >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
              <button
                onClick={() => { setSelectedCategory(null); setProducts([]); setSearchTerm(''); setActiveSubcategory(null); }}
                className="group mb-10 inline-flex items-center gap-2 font-heading text-[12px] font-semibold uppercase tracking-[1px] text-neutral-500 transition-colors hover:text-primary-dark"
              >
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m0 0l6-6m-6 6l6 6" />
                </svg>
                All Categories
              </button>

              <h2 className="mb-10 font-heading text-[24px] font-bold uppercase leading-[1.05] tracking-[-0.5px] text-primary-dark sm:text-[30px]">
                {selectedCat.name}
              </h2>

              {selectedCat.subcategories?.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setActiveSubcategory(null)}
                    className={`rounded-full px-5 py-2.5 font-heading text-[12px] font-semibold tracking-[0.5px] transition-all duration-300 ${
                      !activeSubcategory ? 'bg-primary-dark text-white shadow-md shadow-primary-dark/20' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-primary-dark'
                    }`}
                  >
                    All <span className="ml-1 opacity-70">({selectedCat.product_count})</span>
                  </button>
                  {selectedCat.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubcategory(sub.id.toString())}
                      className={`rounded-full px-5 py-2.5 font-heading text-[12px] font-semibold tracking-[0.5px] transition-all duration-300 ${
                        activeSubcategory === sub.id.toString() ? 'bg-primary-dark text-white shadow-md shadow-primary-dark/20' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-primary-dark'
                      }`}
                    >
                      {sub.name} <span className="ml-1 opacity-70">({sub.product_count})</span>
                    </button>
                  ))}
                </div>
              )}

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
    <div className="h-screen snap-y snap-mandatory overflow-y-auto bg-white" style={{ scrollbarWidth: 'none' }}>
      {/* ============ HERO — first snap section ============ */}
      <section className="relative snap-start snap-always overflow-hidden bg-primary-dark pt-32 pb-16 text-white sm:pt-36 lg:pt-40 lg:pb-24">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
          <defs>
            <pattern id="nutra-hex-grid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="#ffffff" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nutra-hex-grid)" />
        </svg>

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
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

      {/* ============ MAIN CONTENT ============ */}
      <Suspense fallback={
        <div className="flex h-screen snap-start items-center justify-center bg-neutral-900">
          <div className="animate-pulse text-center">
            <div className="mx-auto h-8 w-48 rounded bg-neutral-700" />
            <div className="mx-auto mt-4 h-4 w-64 rounded bg-neutral-700" />
          </div>
        </div>
      }>
        <NutraceuticalsContent />
      </Suspense>

      {/* ============ CLOSING CTA — last snap section ============ */}
      <section className="relative snap-start snap-always overflow-hidden bg-primary-dark py-20 text-white sm:py-24 lg:py-28">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 110%, rgba(21,168,89,0.08) 0%, transparent 70%)' }}
          />
          <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
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
