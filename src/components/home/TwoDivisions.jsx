'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function TwoDivisions({ content = {} }) {
  const cards = content.cards || [];

  if (content.enabled === false || cards.length === 0) return null;

  return (
    <section id="two-ways" className="w-full bg-white py-12 sm:py-20 lg:py-32 overflow-hidden">
      <div className="flex flex-col gap-16 sm:gap-24 lg:gap-44">
        {cards.map((card, i) => {
          // Even (0): Image Left, Green block Right (Desktop)
          // Odd (1): Green block Left, Image Right (Desktop)
          const isReversed = i % 2 !== 0;

          return (
            <div key={i} className="group relative w-full">
              <div className="relative w-full lg:min-h-[580px] lg:flex lg:items-center">
                
                {/* 
                  IMAGE BLOCK:
                  - Mobile/Tablet: Full width with controlled aspect ratio
                  - Desktop: 50% screen width flush to viewport edge
                */}
                <div
                  className={`w-full overflow-hidden shadow-xl lg:shadow-2xl lg:absolute lg:top-0 lg:bottom-0 lg:w-1/2 lg:h-full ${
                    isReversed ? 'lg:right-0 lg:order-2' : 'lg:left-0 lg:order-1'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] lg:h-full overflow-hidden"
                  >
                    <img
                      src={card.image}
                      alt={card.subtitle || card.label || 'Zeovus manufacturing'}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    />
                  </motion.div>
                </div>

                {/* 
                  FOREST GREEN BLOCK (#1F4015):
                  - Replaced blue with brand forest green matching the Hero
                  - Hover shadow matches rich botanical green glow
                */}
                <div
                  className={`relative z-10 w-full lg:w-[52%] px-4 sm:px-6 md:px-10 lg:px-0 -mt-12 sm:-mt-16 md:-mt-20 lg:mt-0 ${
                    isReversed
                      ? 'lg:ml-[4%] lg:mr-auto lg:order-1'
                      : 'lg:mr-[4%] lg:ml-auto lg:order-2'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-[#1F4015] text-white p-6 sm:p-10 md:p-12 lg:p-16 xl:p-20 shadow-[0_20px_50px_-10px_rgba(31,64,21,0.45)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isReversed
                        ? 'group-hover:lg:translate-x-3 group-hover:shadow-[0_30px_70px_-15px_rgba(31,64,21,0.6)]'
                        : 'group-hover:lg:-translate-x-3 group-hover:shadow-[0_30px_70px_-15px_rgba(31,64,21,0.6)]'
                    }`}
                  >
                    {/* Eyebrow Label */}
                    {card.label && (
                      <p className="font-heading text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#9CCD62] mb-3 sm:mb-5">
                        {card.label}
                      </p>
                    )}

                    {/* Big Bold Headline */}
                    <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.1] text-white tracking-[-0.5px] mb-4 sm:mb-6">
                      {card.subtitle}
                    </h2>

                    {/* Paragraph */}
                    <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed text-white/90 mb-6 sm:mb-8 font-normal max-w-xl">
                      {card.body}
                    </p>

                    {/* Action Link */}
                    <div>
                      <Link
                        href={card.href || '/'}
                        className="group/link inline-flex items-center gap-2.5 font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white hover:text-[#FFD374] transition-colors"
                      >
                        <span>{card.cta || 'Explore'}</span>
                        <ArrowRight size={16} strokeWidth={2.4} className="transition-transform duration-300 group-hover/link:translate-x-1.5 text-[#FFD374]" />
                      </Link>
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
