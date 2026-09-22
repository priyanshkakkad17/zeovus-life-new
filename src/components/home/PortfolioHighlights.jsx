'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioHighlights({ content = {} }) {
  const items = (content.items || []).filter((item) => item && item.image);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (content.enabled === false || items.length === 0) return null;

  return (
    <section id="portfolio" className="bg-[#F8F8F8] py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {content.eyebrow && (
              <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-primary-light mb-3">
                {content.eyebrow}
              </p>
            )}
            <h2 className="text-primary-dark font-bold text-3xl sm:text-4xl md:text-5xl whitespace-nowrap">
              {content.heading || 'Wellness that does more'}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {content.intro && (
              <p className="text-primary-dark/70 text-base leading-relaxed max-w-sm">
                {content.intro}
              </p>
            )}
          </motion.div>
        </div>

        {/* Auto-playing slideshow */}
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-2xl border border-primary-dark/10 shadow-[0_12px_40px_-15px_rgba(31,64,21,0.2)]">
          <AnimatePresence mode="wait">
            {items.length > 0 && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={items[activeIndex].image}
                  alt={items[activeIndex].alt || items[activeIndex].caption || 'Portfolio Highlight'}
                  className="w-full h-full object-cover"
                />
                {items[activeIndex].caption && (
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-10">
                    <p className="text-white text-lg md:text-xl font-medium tracking-wide drop-shadow-md">
                      {items[activeIndex].caption}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dots Indicator */}
          {items.length > 1 && (
            <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 flex gap-2 z-10">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {content.footerCtaLabel && (
          <div className="mt-10 md:mt-14 flex justify-center md:justify-start">
            <Link
              href={content.footerCtaHref || '/nutraceuticals'}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary-dark text-white font-semibold text-sm hover:bg-primary-light transition-colors"
            >
              {content.footerCtaLabel} <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
