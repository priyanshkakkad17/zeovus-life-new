'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function PortfolioHighlights({ content = {} }) {
  const items = (content.items || []).filter((item) => item && item.image);

  const [active, setActive] = useState(0);
  const total = items.length;

  const go = useCallback(
    (dir) => setActive((prev) => (prev + dir + total) % total),
    [total]
  );
  const jump = useCallback((i) => setActive(i), []);

  useEffect(() => {
    if (total === 0) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, total]);

  if (content.enabled === false || total === 0) return null;

  const offsetOf = (i) => {
    let diff = i - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const activeItem = items[active];

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-20 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          {content.eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-3 font-heading text-[12px] font-bold uppercase tracking-[3px] text-primary-light"
            >
              {content.eyebrow}
            </motion.p>
          )}
          {content.heading && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-[820px] font-heading text-[32px] font-bold uppercase leading-[1.03] tracking-[-1px] text-primary-dark sm:text-[44px] lg:text-[52px]"
            >
              {content.heading}
            </motion.h2>
          )}
          {content.intro && (
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-relaxed text-neutral-600">{content.intro}</p>
          )}
        </div>

        {/* 3D coverflow stage */}
        <div
          className="relative mx-auto h-[520px] select-none sm:h-[640px] lg:h-[720px]"
          style={{ perspective: '1800px' }}
        >
          {items.map((item, i) => {
            const offset = offsetOf(i);
            const abs = Math.abs(offset);
            const isActive = offset === 0;

            if (abs > 3) return null;

            const Wrapper = item.href ? Link : 'div';
            const wrapperProps = item.href && isActive ? { href: item.href } : {};

            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                initial={false}
                animate={{
                  x: `calc(-50% + ${offset * 52}%)`,
                  y: '-50%',
                  scale: isActive ? 1 : 0.76 - abs * 0.06,
                  rotateY: isActive ? 0 : offset * -20,
                  opacity: abs > 2 ? 0 : 1,
                  zIndex: 20 - abs,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => !isActive && jump(i)}
                style={{
                  transformStyle: 'preserve-3d',
                  cursor: isActive ? 'default' : 'pointer',
                  // Keep the active (front-facing) card on its own crisp raster layer.
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'transform',
                }}
              >
                <Wrapper
                  {...wrapperProps}
                  className={`group block h-[460px] w-[350px] overflow-hidden rounded-[20px] bg-white shadow-[0_20px_50px_rgba(18,45,35,0.16)] transition-shadow duration-500 sm:h-[580px] sm:w-[440px] lg:h-[660px] lg:w-[510px] ${
                    isActive ? 'shadow-[0_34px_80px_rgba(18,45,35,0.22)] ring-1 ring-neutral-200' : ''
                  }`}
                >
                  <div className="relative flex h-full w-full items-center justify-center bg-white p-3">
                    <img
                      src={item.image}
                      alt={item.caption || 'Portfolio highlight'}
                      loading={abs <= 1 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                      className="h-full w-full rounded-[12px] object-contain"
                      style={{ imageRendering: 'auto', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                    />
                    {/* Soft veil on inactive cards for focus */}
                    {!isActive && <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-neutral-50/40" />}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}

          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-primary-dark shadow-md transition-all duration-300 hover:border-primary-light hover:text-primary-light sm:left-6 lg:left-10"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-primary-dark shadow-md transition-all duration-300 hover:border-primary-light hover:text-primary-light sm:right-6 lg:right-10"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* Active caption */}
        <div className="mt-8 h-7 text-center">
          <AnimatePresence mode="wait">
            {activeItem?.caption && (
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="font-heading text-[16px] font-semibold text-primary-dark"
              >
                {activeItem.caption}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex items-center justify-center gap-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => jump(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-400 ${
                active === i ? 'w-8 bg-primary-dark' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

        {/* Footer CTA */}
        {content.footerCtaLabel && (
          <div className="mt-12 flex justify-center">
            <Link
              href={content.footerCtaHref || '/nutraceuticals'}
              className="group inline-flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-primary-dark transition-colors duration-300 hover:text-primary-light"
            >
              <span className="relative">
                {content.footerCtaLabel}
                <span className="absolute -bottom-px left-0 h-px w-0 bg-primary-light transition-all duration-400 group-hover:w-full" />
              </span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
