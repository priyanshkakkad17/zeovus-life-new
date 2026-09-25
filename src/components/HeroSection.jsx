'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Factory,
  Sparkles,
  RotateCw,
} from 'lucide-react';

export default function HeroSection({ content = {} }) {
  const containerRef = useRef(null);

  // Parallax scroll effect on background video
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  const heroVideo =
    content.media ||
    'https://res.cloudinary.com/ac74hfe9/video/upload/v1788197673/hero_banner.mp4';

  const titleLine1 = content.titleLine1 || 'WELLNESS,';
  const titleLine2 = content.titleLine2 || 'INSIDE & OUTSIDE';

  const ctaNutra = {
    label: content.ctaPrimaryLabel || 'EXPLORE NUTRACEUTICALS',
    href: content.ctaPrimaryHref || '/nutraceuticals',
  };

  const ctaCosmetics = {
    label: content.ctaSecondaryLabel || 'EXPLORE COSMETICS',
    href: content.ctaSecondaryHref || '/cosmetics',
  };

  const ctaEnquire = {
    label: content.ctaTertiaryLabel || 'ENQUIRE NOW',
    href: content.ctaTertiaryHref || '/contact',
  };

  // Trust badges from the reference design
  const trustBadges = [
    {
      title: 'Science Backed Formulations',
      icon: Sparkles,
    },
    {
      title: 'Global Quality Standards',
      icon: ShieldCheck,
    },
    {
      title: 'Trusted by Leading Brands',
      icon: Award,
    },
    {
      title: 'End-to-End Manufacturing Support',
      icon: Factory,
    },
  ];

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-neutral-900 pt-[100px] sm:pt-[110px] pb-6 sm:pb-8 flex flex-col justify-end">
      
      {/* 
        BACKGROUND VIDEO / MEDIA:
        Plays vividly in the background with parallax depth.
      */}
      <motion.div
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        style={{ y: videoY }}
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
          <img
            src={heroVideo || 'https://res.cloudinary.com/ac74hfe9/image/upload/v1788197673/Formulated_to_be_felt.jpg'}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
      </motion.div>

      {/* 
        REFINED READABILITY OVERLAY:
        - Reduced white milky hue: dialed down to 78% on left and 8% on right
        - Allows the video's rich colors, depth, and motion to show through with much stronger opacity
      */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(251,251,250,0.78) 0%, rgba(251,251,250,0.65) 42%, rgba(251,251,250,0.28) 72%, rgba(251,251,250,0.08) 100%)',
        }}
      />
      
      {/* Subtle organic warmth vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(21,168,89,0.06)_0%,transparent_60%)]" />

      {/* 
        TOP-RIGHT FLOATING EDITORIAL CALLOUT:
        "From nature's potential to products that make a difference"
      */}
      <div className="hidden lg:block absolute top-[135px] right-12 xl:right-24 z-10 pointer-events-none max-w-[240px] text-right">
        <p className="font-serif italic text-neutral-800 text-base xl:text-lg leading-snug drop-shadow-sm">
          &ldquo;From nature&apos;s potential to products that make a difference&rdquo;
        </p>
        <div className="w-16 h-[1.5px] bg-[#15A859] ml-auto mt-2 rounded-full shadow-sm" />
      </div>

      {/* 
        MAIN HERO CONTENT (POSITIONED MUCH LOWER):
      */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-12 pt-16 sm:pt-24 lg:pt-36 pb-6 sm:pb-8">
        <div className="max-w-3xl">
          
          {/* Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-heading text-xs sm:text-[13px] font-bold tracking-[0.22em] uppercase text-[#1F4015] mb-3 sm:mb-4 drop-shadow-sm">
              Nutraceutical &amp; Cosmetic Manufacturing
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading font-extrabold uppercase text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[76px] leading-[1.02] tracking-tight text-[#0D1F12] drop-shadow-sm"
          >
            <span>{titleLine1 || 'WELLNESS,'}</span>
            <br />
            <span>
              INSIDE &amp; <span className="text-[#15A859]">OUTSIDE</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-sm sm:text-base md:text-[17px] leading-relaxed text-neutral-800/90 font-medium mt-4 sm:mt-5 mb-7 sm:mb-8 max-w-xl"
          >
            End-to-end manufacturing solutions for nutraceuticals, cosmetics and functional products — backed by science, quality and scale.
          </motion.p>

          {/* 3 Call to Action Pill Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Primary Solid Dark Green Button */}
            <Link
              href={ctaNutra.href}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#132A18] text-white font-heading font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#15A859] hover:shadow-lg transition-all duration-200"
            >
              <span>{ctaNutra.label}</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </Link>

            {/* Secondary Outline Pill Button */}
            <Link
              href={ctaCosmetics.href}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-neutral-300/90 bg-white/90 backdrop-blur-sm text-neutral-900 font-heading font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:border-neutral-900 hover:bg-white transition-all duration-200"
            >
              <span>{ctaCosmetics.label}</span>
              <ArrowRight size={15} strokeWidth={2} className="text-neutral-600" />
            </Link>

            {/* Tertiary Outline Pill Button */}
            <Link
              href={ctaEnquire.href}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-neutral-300/90 bg-white/90 backdrop-blur-sm text-neutral-900 font-heading font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:border-neutral-900 hover:bg-white transition-all duration-200"
            >
              <span>{ctaEnquire.label}</span>
              <ArrowRight size={15} strokeWidth={2} className="text-neutral-600" />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* 
        BOTTOM ROW: TRUST BADGES & ROTATING CIRCULAR STAMP
      */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-12 pt-3 sm:pt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center"
          >
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/95 border border-neutral-200 text-[#1F4015] shadow-sm">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <span className="font-heading text-xs sm:text-[13px] font-semibold text-neutral-900 leading-tight drop-shadow-sm">
                    {badge.title}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Rotating Circular Stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="hidden md:flex items-center gap-3 pl-4"
          >
            <div className="relative flex items-center justify-center w-20 h-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text className="text-[9.5px] font-heading font-bold uppercase tracking-[0.18em] fill-[#1F4015]">
                    <textPath href="#circlePath" startOffset="0%">
                      • ZEOVUS QUALITY ASSURED •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div className="w-9 h-9 rounded-full bg-white/95 border border-neutral-200 flex items-center justify-center text-[#15A859] shadow-sm">
                <ShieldCheck size={20} strokeWidth={2.2} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
