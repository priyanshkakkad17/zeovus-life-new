'use client';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveBottleImage } from '@/lib/bottleImages';

// Shared category icon set used across nutraceuticals and cosmetics.
export const Icons = {
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
  droplet: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 2.25s6 6.75 6 11.25a6 6 0 11-12 0c0-4.5 6-11.25 6-11.25z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  sun: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95 6.95l-1.4-1.4M6.45 6.45l-1.4-1.4m12.5 0l-1.4 1.4M6.45 17.55l-1.4 1.4M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

// ─── Stamp seal — rubber-stamp "pressed on paper" effect ──────────────────────
function StampSeal({ src, label }) {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <motion.div
        initial={{ opacity: 0, scale: 2.5, rotate: -24, filter: 'blur(4px)' }}
        animate={{
          opacity: [0, 1, 1, 1],
          scale: [2.5, 0.8, 1.07, 1],
          rotate: [-24, -13, -9, -8],
          filter: ['blur(4px)', 'blur(0.4px)', 'blur(0px)', 'blur(0px)'],
        }}
        transition={{
          delay: 0.5,
          duration: 0.52,
          times: [0, 0.55, 0.8, 1],
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="relative"
        style={{ transformOrigin: 'center' }}
      >
        {/* Round paper disc the seal is stamped onto */}
        <div
          className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white sm:h-36 sm:w-36 lg:h-40 lg:w-40"
          style={{
            boxShadow: '0 10px 30px rgba(0,0,0,0.28)',
          }}
        >
          {/* Ink bleed halo that appears on impact */}
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.4, 0], scale: [0.7, 1.15, 1.35] }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(21,120,60,0.30) 0%, transparent 70%)' }}
          />
          <img
            src={src}
            alt={label || 'ZQA seal'}
            className="relative h-[86%] w-[86%] select-none object-contain"
            style={{ mixBlendMode: 'multiply' }}
            draggable={false}
          />
        </div>
      </motion.div>
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.4 }}
          className="mt-3 block font-heading text-[11px] font-semibold uppercase tracking-[2px] text-neutral-400"
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}

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
          <span className="pointer-events-none absolute right-7 whitespace-nowrap rounded bg-black/80 px-3 py-1.5 font-heading text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-sm">
            {cat.name}
          </span>
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
function EditorialScroll({ categories, scrollContainerRef, basePath, labels = {} }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);

  const scrollToCard = useCallback((index) => {
    const card = cardRefs.current[index];
    if (card) card.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Track the visibility ratio of every panel and make the most-visible one
    // active. A single 0.6 threshold could be skipped during a fast swipe,
    // leaving a panel on screen with its (opacity-0) text never revealed.
    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target);
          if (index !== -1) ratios.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let bestIndex = 0;
        let bestRatio = -1;
        ratios.forEach((ratio, index) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestIndex = index; }
        });
        if (bestRatio > 0) setActiveIndex(bestIndex);
      },
      { root: scrollContainerRef.current, threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] }
    );
    cardRefs.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, [categories.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { root: scrollContainerRef.current, threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {isVisible && <DotNav categories={categories} activeIndex={activeIndex} onDotClick={scrollToCard} />}
      {categories.map((cat, i) => (
        <div
          key={cat.slug || i}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="relative h-screen w-full snap-start snap-always overflow-hidden"
        >
          {cat.image ? (
            <motion.img
              src={cat.image}
              alt={cat.name}
              initial={false}
              animate={{ scale: activeIndex === i ? 1.05 : 1.1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${cat.color_from}, ${cat.color_to})` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: activeIndex === i ? 0 : 12 }}
            transition={{ duration: 0.62, delay: activeIndex === i ? 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-12 lg:p-16 xl:p-20"
          >
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <h2 className="max-w-[750px] font-heading text-[38px] font-bold leading-[1.06] tracking-[-0.5px] text-white sm:text-[50px] lg:text-[60px] 2xl:text-[72px]">
                {cat.name}
              </h2>
              <p className="mt-5 max-w-[500px] text-[15px] leading-[1.75] text-white/75 sm:text-[16px]">
                {cat.description}
              </p>
              <Link
                href={`${basePath}?category=${cat.slug}`}
                className="group mt-8 inline-flex w-fit items-center gap-4 font-heading text-[12px] font-semibold uppercase tracking-[2px] text-white"
              >
                <span className="relative pb-1">
                  Explore More
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 bg-white/40 transition-transform duration-300" />
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-400 ease-out group-hover:scale-x-100" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center border border-white/40 transition-colors duration-300 group-hover:border-white group-hover:bg-white/10">
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </span>
              </Link>
            </div>

            {cat.highlights && cat.highlights.length > 0 && (
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: activeIndex === i ? 0 : 12 }}
                transition={{ duration: 0.5, delay: activeIndex === i ? 0.32 : 0, ease: [0.22, 1, 0.36, 1] }}
                className="hidden border-t border-white/15 pt-7 pb-2 lg:block"
              >
                <p className="mb-2 font-heading text-[10px] font-semibold uppercase tracking-[2px] text-white/50">{labels.highlightsHeading}</p>
                <ul className="flex flex-col gap-2.5">
                  {cat.highlights.slice(0, 5).map((h, hi) => (
                    <li key={hi} className="flex items-center gap-3 text-[16px] font-medium text-white">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>

          {i === 0 && (
            <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
              <span className="font-heading text-[9px] font-medium uppercase tracking-[2px] text-white/40">{labels.scrollLabel}</span>
              <svg className="h-4 w-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

// ─── Product card ───────────────────────────────────────────────────────────
function ProductCard({ product, category, index, basePath, labels = {} }) {
  const [imageError, setImageError] = useState(false);
  const IconComponent = (category && Icons[category.icon]) || Icons.pill;
  const colorFrom = category?.color_from || '#15A859';
  const colorTo = category?.color_to || '#1A475C';
  // Cosmetics products surface their "concerns addressed"; nutraceuticals show key actives.
  const chipSource = product.concerns_addressed || product.key_actives;
  const keyActives = chipSource?.split(',').map((active) => active.trim()).filter(Boolean) || [];
  const chipLabel = product.concerns_addressed ? 'Targets' : labels.keyActivesLabel;
  // Prefer the stored image; otherwise fall back to a name-matched bottle image.
  const resolvedImage = product.image_url || resolveBottleImage(product.name);
  const hasImage = Boolean(resolvedImage) && !imageError;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-primary-dark/[0.08] bg-white shadow-[0_2px_14px_rgba(18,45,35,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(18,45,35,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: `linear-gradient(135deg, ${colorFrom}24, ${colorTo}38)` }}>
        {hasImage ? (
          <motion.img
            src={resolvedImage}
            alt={product.name}
            onError={() => setImageError(true)}
            className="h-full w-full object-contain p-4"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
          />
        ) : (
          <>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
            <div className="absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-black/10 blur-2xl" />
            <div className="relative flex h-full items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/50 bg-white/60 shadow-lg backdrop-blur-sm" style={{ color: colorFrom }}>
                <IconComponent />
              </div>
            </div>
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-dark/45 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {category?.division !== 'nutraceuticals' && product.subcategory_name && (
          <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[1.8px] text-primary-light">
            {product.subcategory_name}
          </p>
        )}
        <h4 className="font-heading text-[19px] font-bold leading-[1.12] tracking-[-0.35px] text-primary-dark">
          {product.name}
        </h4>
        {(product.primary_benefit || product.description) && (
          <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-neutral-600">{product.primary_benefit || product.description}</p>
        )}

        {keyActives.length > 0 && (
          <div className="mt-5 border-t border-neutral-100 pt-4">
            <span className="mb-2.5 block font-heading text-[10px] font-semibold uppercase tracking-[1.5px] text-neutral-400">{chipLabel}</span>
            <div className="flex flex-wrap gap-1.5">
              {keyActives.slice(0, 3).map((active, activeIndex) => (
                <span key={activeIndex} className="inline-flex items-center gap-1.5 border-l-2 border-primary-light bg-neutral-50 px-2.5 py-1 text-[10px] font-medium text-primary-dark">
                  {active}
                </span>
              ))}
              {keyActives.length > 3 && <span className="px-1 py-1 text-[10px] font-semibold text-primary-light">+{keyActives.length - 3}</span>}
            </div>
          </div>
        )}

        <Link
          href={`${basePath}/products/${product.id}`}
          className="mt-6 inline-flex items-center gap-2 self-start font-heading text-[11px] font-semibold uppercase tracking-[1px] text-primary-dark transition-colors hover:text-primary-light"
        >
          Product details
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M7 7h10v10" /></svg>
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Catalog content ──────────────────────────────────────────────────────────
function CatalogContent({ scrollContainerRef, division, basePath, staticCategories, labels = {} }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || null);
  const [categories, setCategories] = useState(staticCategories || []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const productSectionRef = useRef(null);

  useEffect(() => { setSelectedCategory(categoryParam || null); }, [categoryParam]);
  useEffect(() => {
    fetch(`/api/categories?division=${division}`)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setCategories(data); })
      .catch(() => {});
  }, [division]);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      const params = new URLSearchParams({ category: selectedCategory, limit: '200' });
      if (activeSubcategory) params.set('subcategory', activeSubcategory);
      if (searchTerm) params.set('search', searchTerm);
      fetch(`/api/products?${params}`).then((r) => r.json()).then((data) => { setProducts(data.products || []); setLoading(false); }).catch(() => setLoading(false));
    }
  }, [selectedCategory, activeSubcategory, searchTerm]);

  const selectedCat = categories.find((c) => c.slug === selectedCategory);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const section = productSectionRef.current;
    if (!selectedCategory || !selectedCat || !container || !section) return;

    const frame = requestAnimationFrame(() => {
      const containerTop = container.getBoundingClientRect().top;
      const sectionTop = section.getBoundingClientRect().top;
      const headerOffset = 92;
      container.scrollTo({
        top: Math.max(0, container.scrollTop + sectionTop - containerTop - headerOffset),
        behavior: 'smooth',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedCategory, selectedCat?.slug, scrollContainerRef]);

  return (
    <>
      {!selectedCategory && (
        <EditorialScroll categories={categories} scrollContainerRef={scrollContainerRef} basePath={basePath} labels={labels} />
      )}

      <AnimatePresence mode="wait">
        {selectedCategory && selectedCat && (
          <motion.section
            ref={productSectionRef}
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

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 border-b border-neutral-100 pb-8"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h2 className="max-w-[850px] font-heading text-[32px] font-bold uppercase leading-[1.02] tracking-[-1px] text-primary-dark sm:text-[42px] lg:text-[50px]">
                      {selectedCat.name}
                    </h2>
                    <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">{selectedCat.description}</p>
                  </div>
                  <div className="flex items-center gap-5 border-l-2 border-primary-light/30 pl-4 lg:mb-1">
                    <div>
                      <span className="editorial-number block font-heading text-[30px] font-bold leading-none text-primary-light">{selectedCat.product_count}</span>
                      <span className="mt-1 block font-heading text-[10px] font-semibold uppercase tracking-[1.5px] text-neutral-400">{labels.productsLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {division !== 'nutraceuticals' && selectedCat.subcategories?.length > 0 && (
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
                  placeholder={labels.searchPlaceholder}
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
                    <ProductCard key={p.id} product={p} category={selectedCat} index={i} basePath={basePath} labels={labels} />
                  ))}
                </div>
              ) : (
                <div className="border-t border-neutral-100 py-16 text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-primary-dark">
                    {Icons[selectedCat.icon] ? Icons[selectedCat.icon]() : null}
                  </div>
                  <h3 className="font-heading text-[18px] font-bold text-primary-dark">
                    {selectedCat.product_count > 0 ? `${selectedCat.product_count}+ Products` : 'Products coming soon'}
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

/**
 * Shared category catalogue page used by both /nutraceuticals and /cosmetics.
 * Renders a hero, an editorial snap-scroll of categories, and a data-driven
 * product view for the selected category.
 */
export default function CategoryCatalog({
  labels = {},
  division,
  basePath,
  staticCategories = [],
  hero,
}) {
  const pageScrollRef = useRef(null);

  const titleLead = hero.titleLead;
  const titleAccent = hero.titleAccent;
  const heroSubtitle = hero.subtitle || '';
  const backgroundVideo = hero.backgroundVideo || '';

  return (
    <div ref={pageScrollRef} className="h-screen snap-y snap-proximity overflow-y-auto scroll-smooth bg-white" style={{ scrollbarWidth: 'none' }}>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-primary-dark pt-32 pb-16 text-white sm:pt-36 lg:pt-40 lg:pb-24">
        {backgroundVideo && (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary-dark/60" aria-hidden="true" />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-[720px] font-heading text-[36px] font-bold uppercase leading-[1.04] tracking-[-1.5px] sm:text-[48px] lg:text-[58px] 2xl:text-[72px]">
                {titleLead}
                <br />
                <span className="text-secondary">{titleAccent}</span>
              </h1>
              {heroSubtitle && (
                <p className="mt-6 max-w-[600px] text-[16px] leading-relaxed text-neutral-300 sm:text-[17px] xl:text-[18px]">
                  {heroSubtitle}
                </p>
              )}

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

            {((hero.stats && hero.stats.length > 0) || hero.seal) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:gap-x-10 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
              >
                {hero.stats?.map((stat) => (
                  <div key={stat.label}>
                    <span className="editorial-number block font-heading text-[36px] font-bold text-secondary sm:text-[42px] lg:text-[50px]">{stat.value}</span>
                    <span className="mt-2 block font-heading text-[11px] uppercase tracking-[2px] text-neutral-400">{stat.label}</span>
                  </div>
                ))}
                {hero.seal && <StampSeal src={hero.seal.src} label={hero.seal.label} />}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ============ MAIN CONTENT ============ */}
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center bg-neutral-900">
          <div className="animate-pulse text-center">
            <div className="mx-auto h-8 w-48 rounded bg-neutral-700" />
            <div className="mx-auto mt-4 h-4 w-64 rounded bg-neutral-700" />
          </div>
        </div>
      }>
        <CatalogContent scrollContainerRef={pageScrollRef} division={division} basePath={basePath} staticCategories={staticCategories} labels={labels} />
      </Suspense>
    </div>
  );
}
