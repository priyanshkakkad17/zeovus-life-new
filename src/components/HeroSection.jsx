'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection({ content = {} }) {
  const heroVideo = content.media || '';
  const titleLine1 = content.titleLine1 || 'Wellness,';
  const titleLine2 = content.titleLine2 || 'Inside & Outside';
  
  // By default home.js sets:
  // 0: Explore Nutraceuticals
  // 1: Explore Cosmetics
  // 2: Enquire Now
  const ctas = [
    { label: content.ctaPrimaryLabel, href: content.ctaPrimaryHref || '/' },
    { label: content.ctaSecondaryLabel, href: content.ctaSecondaryHref || '/' },
    { label: content.ctaTertiaryLabel, href: content.ctaTertiaryHref || '/' },
  ].filter((cta) => cta.label);

  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 1000], ['0%', '20%']);
  const videoScale = useTransform(scrollY, [0, 1000], [1, 1.08]);
  const contentY = useTransform(scrollY, [0, 600], ['0%', '-15%']);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 1]);

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-primary-dark">
      {/* Background video with parallax */}
      <motion.div 
        className="absolute inset-0 z-0 h-full w-full"
        style={{ y: videoY, scale: videoScale }}
      >
        {heroVideo && (/\.(mp4|webm|mov)(\?|$)/i.test(heroVideo) ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://res.cloudinary.com/ac74hfe9/image/upload/v1788197673/Formulated_to_be_felt.jpg"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img src={heroVideo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ))}
      </motion.div>

      {/* Readability overlay — forest-dark radial anchored bottom-left */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 90% at 12% 100%, rgba(10,38,14,0.92) 0%, rgba(31,64,21,0.72) 38%, rgba(31,64,21,0.35) 70%, rgba(31,64,21,0.45) 100%)",
        }}
      />
      
      {/* Scroll-out darken overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ 
          opacity: overlayOpacity,
          background: 'linear-gradient(180deg, rgba(31,64,21,0) 0%, rgba(31,64,21,0.5) 100%)' 
        }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full mx-auto max-w-7xl px-5 sm:px-8 flex flex-col justify-end pb-20 md:pb-28"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[12px] sm:text-[13px] font-semibold tracking-[0.22em] uppercase text-accent mb-5">
            Nutraceutical &amp; Cosmetic Manufacturing
          </p>
          <h1 className="text-white font-bold leading-[1.04] text-[2.75rem] sm:text-6xl md:text-7xl text-balance">
            {titleLine1}
            <br />
            {titleLine2}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          {ctas[2] && (
            <Link
              href={ctas[2].href}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-accent text-primary-dark font-semibold text-sm tracking-wide hover:bg-[#ffdf97] transition-colors"
            >
              {ctas[2].label} <ArrowRight size={16} />
            </Link>
          )}
          {ctas[0] && (
            <Link
              href={ctas[0].href}
              className="inline-flex items-center h-12 px-6 rounded-full border border-accent text-accent font-semibold text-sm tracking-wide hover:bg-accent/10 transition-colors"
            >
              {ctas[0].label}
            </Link>
          )}
          {ctas[1] && (
            <Link
              href={ctas[1].href}
              className="inline-flex items-center h-12 px-6 rounded-full border border-secondary/70 text-secondary font-semibold text-sm tracking-wide hover:bg-secondary/10 hover:border-secondary transition-colors"
            >
              {ctas[1].label}
            </Link>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-white/60 pointer-events-none" aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">{content.scrollLabel || 'Scroll'}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
