'use client';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
function EditorialScroll({ categories, scrollContainerRef, basePath }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const previousActiveIndex = useRef(0);

  const scrollToCard = useCallback((index) => {
    const card = cardRefs.current[index];
    if (card) card.scrollIntoView({ behavior: 'smooth' });
  }, []);

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
      { root: scrollContainerRef.current, threshold: 0.6 }
    );
    cardRefs.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, [categories.length]);

  useEffect(() => {
    if (previousActiveIndex.current !== activeIndex) {
      setIsTransitioning(true);
      previousActiveIndex.current = activeIndex;
    }
  }, [activeIndex]);

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
      <AnimatePresence>
        {isVisible && isTransitioning && (
          <motion.div
            key={activeIndex}
            initial={{ x: '-115%', opacity: 0 }}
            animate={{ x: '125%', opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setIsTransitioning(false)}
            className="pointer-events-none fixed inset-y-0 left-0 z-[80] w-[65vw]"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(156, 205, 98, 0.26) 36%, rgba(255, 255, 255, 0.18) 52%, rgba(21, 168, 89, 0.16) 68%, transparent 100%)' }}
          />
        )}
      </AnimatePresence>
      {categories.map((cat, i) => (
        <motion.div
          key={cat.slug || i}
          ref={(el) => { cardRefs.current[i] = el; }}
          initial={false}
          animate={{ opacity: activeIndex === i ? 1 : 0.82 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-screen w-full snap-start snap-always overflow-hidden"
        >
          {cat.image ? (
            <motion.img
              src={cat.image}
              alt={cat.name}
              initial={{ scale: 1.14, opacity: 0.72 }}
              animate={{ scale: activeIndex === i ? 1.05 : 1.14, opacity: activeIndex === i ? 1 : 0.72 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0.72 }}
              animate={{ opacity: activeIndex === i ? 1 : 0.72 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${cat.color_from}, ${cat.color_to})` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)' }} />

          <motion.div
            initial={false}
            animate={{ opacity: activeIndex === i ? 1 : 0, y: activeIndex === i ? 0 : 44 }}
            transition={{ duration: 0.62, delay: activeIndex === i ? 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-12 lg:p-16 xl:p-20"
          >
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
                href={`${basePath}?category=${cat.slug}`}
                className="group mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[1px] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:shadow-white/5"
              >
                Explore More
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
            </div>

            <motion.div
              initial={false}
              animate={{ opacity: activeIndex === i ? 1 : 0, y: activeIndex === i ? 0 : 20 }}
              transition={{ duration: 0.5, delay: activeIndex === i ? 0.32 : 0, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-end gap-x-14 gap-y-4 border-t border-white/15 pt-7 pb-2"
            >
              <div>
                <p className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[2px] text-white/50">Format</p>
                <p className="text-[15px] font-semibold text-white">Contract Manufacturing</p>
              </div>
              <div>
                <p className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[2px] text-white/50">Products</p>
                <p className="text-[15px] font-semibold text-white">{cat.product_count}</p>
              </div>
              {cat.highlights && cat.highlights.length > 0 && (
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
            </motion.div>
          </motion.div>

          {i === 0 && (
            <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
              <span className="font-heading text-[9px] font-medium uppercase tracking-[2px] text-white/40">Scroll</span>
              <svg className="h-4 w-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </motion.div>
      ))}
    </section>
  );
}

// ─── Product card ───────────────────────────────────────────────────────────
function ProductCard({ product, category, index, basePath }) {
  const [imageError, setImageError] = useState(false);
  const IconComponent = (category && Icons[category.icon]) || Icons.pill;
  const colorFrom = category?.color_from || '#15A859';
  const colorTo = category?.color_to || '#1A475C';
  const keyActives = product.key_actives?.split(',').map((active) => active.trim()).filter(Boolean) || [];
  const hasImage = Boolean(product.image_url) && !imageError;

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
            src={product.image_url}
            alt={product.name}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
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
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/30 bg-black/15 px-2.5 py-1 font-heading text-[9px] font-semibold uppercase tracking-[1.2px] text-white backdrop-blur-md">
            {String(index + 1).padStart(2, '0')}
          </span>
          {product.status === 'Verified' && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-primary-light shadow-sm" title="Verified formulation">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="m5 12 4 4L19 6" /></svg>
            </span>
          )}
        </div>
        {product.brand_line && (
          <span className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] truncate rounded-full bg-white/90 px-3 py-1.5 font-heading text-[10px] font-bold uppercase tracking-[0.6px] text-primary-dark shadow-sm backdrop-blur-md">
            {product.brand_line}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {product.subcategory_name && (
          <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[1.8px] text-primary-light">
            {product.subcategory_name}
          </p>
        )}
        <h4 className="font-heading text-[19px] font-bold leading-[1.12] tracking-[-0.35px] text-primary-dark">
          {product.name}
        </h4>
        {product.primary_benefit && (
          <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">{product.primary_benefit}</p>
        )}

        {keyActives.length > 0 && (
          <div className="mt-5 border-t border-neutral-100 pt-4">
            <span className="mb-2.5 block font-heading text-[10px] font-semibold uppercase tracking-[1.5px] text-neutral-400">Key actives</span>
            <div className="flex flex-wrap gap-1.5">
              {keyActives.slice(0, 3).map((active, activeIndex) => (
                <span key={activeIndex} className="rounded-full border border-primary-light/15 bg-primary-light/[0.06] px-2.5 py-1 text-[10px] font-medium text-primary-dark">
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
function CatalogContent({ scrollContainerRef, division, basePath, staticCategories }) {
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
        <EditorialScroll categories={categories} scrollContainerRef={scrollContainerRef} basePath={basePath} />
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
                <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.4px] text-primary-light">Products</p>
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
                      <span className="mt-1 block font-heading text-[10px] font-semibold uppercase tracking-[1.5px] text-neutral-400">Products</span>
                    </div>
                    <div className="h-9 w-px bg-neutral-200" />
                    <p className="max-w-[120px] text-[12px] leading-relaxed text-neutral-500">Open a product to see its listed formats and delivery technology.</p>
                  </div>
                </div>
              </motion.div>

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
                    <ProductCard key={p.id} product={p} category={selectedCat} index={i} basePath={basePath} />
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
  division,
  basePath,
  staticCategories = [],
  hero,
  cta,
}) {
  const pageScrollRef = useRef(null);

  return (
    <div ref={pageScrollRef} className="h-screen snap-y snap-proximity overflow-y-auto scroll-smooth bg-white" style={{ scrollbarWidth: 'none' }}>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-primary-dark pt-32 pb-16 text-white sm:pt-36 lg:pt-40 lg:pb-24">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
          <defs>
            <pattern id={`${division}-hex-grid`} x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="#ffffff" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${division}-hex-grid)`} />
        </svg>

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-[720px] font-heading text-[38px] font-bold uppercase leading-[1.02] tracking-[-1.5px] sm:text-[52px] lg:text-[64px]">
                {hero.titleLead}
                <br />
                <span className="text-secondary">{hero.titleAccent}</span>
              </h1>

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

            {hero.stats && hero.stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-10 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
              >
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="editorial-number block font-heading text-[42px] font-bold text-secondary lg:text-[50px]">{stat.value}</span>
                    <span className="mt-2 block font-heading text-[11px] uppercase tracking-[2px] text-neutral-400">{stat.label}</span>
                  </div>
                ))}
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
        <CatalogContent scrollContainerRef={pageScrollRef} division={division} basePath={basePath} staticCategories={staticCategories} />
      </Suspense>

      {/* ============ CLOSING CTA ============ */}
      <section className="relative overflow-hidden bg-primary-dark py-20 text-white sm:py-24 lg:py-28">
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
                {cta.eyebrow}
              </p>
              <h2 className="mb-5 font-heading text-[32px] font-bold uppercase leading-[1.02] tracking-[-1px] sm:text-[40px] lg:text-[46px]">
                {cta.heading}
              </h2>
              <p className="max-w-[480px] text-[15px] leading-relaxed text-neutral-300 sm:text-[16px] lg:mx-0 mx-auto">
                {cta.body}
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
