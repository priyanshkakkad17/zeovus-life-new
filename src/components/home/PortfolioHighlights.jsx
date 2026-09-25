'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const LABS = [
  {
    title: 'Make-up Lab.',
    description: 'Our Make-up Lab. reaching around the world develops cosmetic products of excellent quality.',
    image: '/portfolio-highlights/Potfolio_Highlight_3.jpeg',
  },
  {
    title: 'Personal Care Lab.',
    description: "Our researchers with expertise develop personal care products, ranging from hair to body, to upgrade our consumers' lifestyles.",
    image: '/portfolio-highlights/Potfolio_Highlight_5.jpeg',
  },
  {
    title: 'UV Tech Innovation Lab.',
    description: 'UV Tech Innovation Lab. develops UV protection materials based on our technologies which has led to the growth of suncare products. We will continue to promote technological innovation to lead the Korean suncare market.',
    image: '/portfolio-highlights/Potfolio_Highlight_4.jpeg',
  },
  {
    title: 'Nutraceutical R&D Lab.',
    description: 'Targeted botanical and synthetic bioactive formulations engineered for bioavailability and physiological absorption.',
    image: '/portfolio-highlights/Potfolio_Highlight.jpeg',
  },
  {
    title: 'Bio-Fermentation Lab.',
    description: 'Proprietary cellular extraction and micro-batch fermentation processes for clinical-grade wellness purity.',
    image: '/portfolio-highlights/Potfolio_Highlight_2.jpeg',
  },
];

export default function PortfolioHighlights({ content = {} }) {
  const cmsItems = (content.items || []).filter((item) => item && item.image);

  const baseItems = cmsItems.length >= 3 ? cmsItems.map((item, idx) => ({
    title: item.caption || LABS[idx % LABS.length].title,
    description: item.alt || LABS[idx % LABS.length].description,
    image: item.image,
  })) : LABS;

  const N = baseItems.length;

  const REPEAT_COUNT = 12;
  const loopedItems = Array.from({ length: REPEAT_COUNT }, () => baseItems).flat();

  const startIndex = Math.floor(REPEAT_COUNT / 2) * N;
  const [index, setIndex] = useState(startIndex);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= loopedItems.length - 2) {
          return startIndex;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, loopedItems.length, startIndex]);

  if (content.enabled === false || baseItems.length === 0) return null;

  return (
    <section id="portfolio" className="relative w-full bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1520px] px-6 sm:px-10 lg:px-12">
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: Headings & Call to Action */}
          <div className="xl:col-span-4 flex flex-col justify-center">
            {content.eyebrow && (
              <p className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#15A859] mb-4 sm:mb-6">
                {content.eyebrow}
              </p>
            )}

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl xl:text-[46px] font-extrabold leading-[1.12] text-[#111827] tracking-tight mb-8 sm:mb-10 text-balance">
              {content.heading || 'Technical prowess is the core driver of 30 years of continuous progress made by Zeovus Life.'}
            </h2>

            {content.intro && (
              <p className="font-sans text-base leading-relaxed text-neutral-600 mb-8 max-w-md">
                {content.intro}
              </p>
            )}

            <div>
              <Link
                href={content.footerCtaHref || '/nutraceuticals'}
                className="inline-flex items-center gap-2 rounded-none border border-neutral-300 bg-white px-7 py-3 font-heading text-xs font-semibold text-neutral-800 shadow-sm hover:border-[#1F4015] hover:bg-[#1F4015] hover:text-[#FFF5D1] transition-all duration-200"
              >
                <span>{content.footerCtaLabel || 'view more'}</span>
                <span className="text-sm font-light text-neutral-500 hover:text-[#FFF5D1]">+</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Auto-sliding Card Track without buttons (pauses on hover) */}
          <div
            className="xl:col-span-8 relative flex items-center justify-center w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Sharp Container with Shadow */}
            <div className="w-full max-w-[860px] overflow-hidden rounded-none bg-white border border-neutral-100 shadow-[0_25px_65px_-15px_rgba(0,0,0,0.12)] pb-14 sm:pb-20">
              
              {/* Continuous Auto-Sliding Track */}
              <motion.div
                animate={{ x: `-${index * 50}%` }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="flex w-full will-change-transform transform-gpu"
              >
                {loopedItems.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  const clipSlope = isEven
                    ? 'polygon(0 0, 100% 0, 100% 86%, 0 100%)'
                    : 'polygon(0 0, 100% 0, 100% 100%, 0 86%)';

                  return (
                    <div
                      key={idx}
                      className="w-full sm:w-1/2 shrink-0 flex flex-col bg-white rounded-none border-r border-neutral-200/80"
                    >
                      {/* Alternating Diagonal Angled Photo Ramp */}
                      <div
                        className="relative w-full h-[280px] sm:h-[330px] md:h-[360px] overflow-hidden bg-neutral-900 rounded-none"
                        style={{ clipPath: clipSlope }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                        />
                      </div>

                      {/* Content below the angled ramp */}
                      <div className="px-8 pt-7 sm:px-9 sm:pt-8 flex flex-col justify-start">
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-neutral-600 font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
