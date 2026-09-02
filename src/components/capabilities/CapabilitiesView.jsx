'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function ArrowLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-primary-light"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-px left-0 h-px w-0 bg-primary-light transition-all duration-400 group-hover:w-full" />
      </span>
      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </Link>
  );
}

export default function CapabilitiesView({ content = {}, certifications = [] }) {
  const [activeSection, setActiveSection] = useState('innovation');
  const innovationRef = useRef(null);
  const manufacturingRef = useRef(null);

  const hero = content.hero || {};
  const pillars = content.pillars || {};
  const innovation = content.innovation || {};
  const manufacturing = content.manufacturing || {};
  const process = content.process || {};
  const qualityPromise = content.qualityPromise || {};
  const certsSection = content.certifications || {};

  const heroStats = hero.stats || [];
  const innovationFacts = innovation.facts || [];
  const formulationScience = innovation.formulationItems || [];
  const testingValidation = innovation.testingItems || [];
  const regulatoryScience = innovation.regulatoryItems || [];
  const manufacturingFacts = manufacturing.facts || [];
  const nutraceuticalFormats = manufacturing.nutraFormats || [];
  const cosmeticsFormats = manufacturing.cosmeticsFormats || [];
  const processSteps = process.steps || [];
  const qualityChecks = qualityPromise.checks || [];
  const qualityParagraphs = qualityPromise.qualityParagraphs || [];
  const qualityStats = qualityPromise.stats || [];

  const horizontalStageRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  // Sticky index nav — highlight active pillar as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    if (innovationRef.current) observer.observe(innovationRef.current);
    if (manufacturingRef.current) observer.observe(manufacturingRef.current);
    return () => observer.disconnect();
  }, []);

  // GSAP horizontal-scroll storytelling for the process — desktop + motion-safe only
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current;
      const stage = horizontalStageRef.current;
      if (!track || !stage) return;

      gsap.set(track, { overflowX: 'visible' });

      const getScrollLength = () => track.scrollWidth - stage.clientWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollLength(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${getScrollLength()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: 'overflowX' });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="bg-white">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-primary-dark pt-32 pb-16 text-white sm:pt-36 lg:pt-40 lg:pb-24">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
          <defs>
            <pattern id="cap-hex-grid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="#ffffff" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cap-hex-grid)" />
        </svg>

        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >

              <h1 className="max-w-[820px] font-heading text-[38px] font-bold uppercase leading-[1.02] tracking-[-1.5px] sm:text-[52px] lg:text-[64px]">
                {hero.titleLead}
                <br />
                <span className="text-secondary">{hero.titleAccent}</span>
              </h1>

              <div className="mt-9 flex flex-wrap gap-3">
                {hero.ctaPrimaryLabel && (
                  <Link href={hero.ctaPrimaryHref || '/contact'}>
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block cursor-pointer rounded-[2px] bg-secondary px-7 py-3.5 font-heading text-xs font-semibold tracking-widest text-primary-dark transition-colors hover:bg-secondary-dark"
                    >
                      {hero.ctaPrimaryLabel}
                    </motion.span>
                  </Link>
                )}
                {hero.ctaSecondaryLabel && (
                  <a href={hero.ctaSecondaryHref || '#process'}>
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block cursor-pointer rounded-[2px] border border-white/25 bg-white/[0.04] px-7 py-3.5 font-heading text-xs font-semibold tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
                    >
                      {hero.ctaSecondaryLabel}
                    </motion.span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Stat column */}
            {heroStats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-10 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
              >
                {heroStats.map((stat, i) => (
                  <div key={i}>
                    <span className="editorial-number block font-heading text-[42px] font-bold text-secondary lg:text-[50px]">
                      {stat.value}
                    </span>
                    <span className="mt-2 block font-heading text-[11px] uppercase tracking-[2px] text-neutral-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ============ TWO-PILLAR EDITORIAL LAYOUT ============ */}
      <section className="relative bg-white py-20 sm:py-26 lg:py-30">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="lg:grid lg:grid-cols-[288px_1fr] lg:gap-20">

            {/* Sticky index nav — desktop only */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <p className="mb-8 font-heading text-[10px] font-bold uppercase tracking-[3px] text-primary-light">
                  Our capabilities
                </p>

                {/* Vertical progress rail with the two pillars */}
                <div className="relative pl-8">
                  {/* Rail track + active fill */}
                  <span className="absolute left-[5px] top-1.5 bottom-[92px] w-px bg-neutral-200" aria-hidden="true" />
                  <span
                    className="absolute left-[5px] top-1.5 w-px bg-primary-light transition-all duration-500 ease-out"
                    style={{ height: activeSection === 'manufacturing' ? 'calc(100% - 92px)' : '46px' }}
                    aria-hidden="true"
                  />

                  {[
                    { id: 'innovation', num: '01', label: pillars.oneLabel },
                    { id: 'manufacturing', num: '02', label: pillars.twoLabel },
                  ].map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a key={item.id} href={`#${item.id}`} className="group relative block pb-12 last:pb-0">
                        {/* Node dot on the rail */}
                        <span
                          className={`absolute -left-8 top-1.5 flex h-[11px] w-[11px] items-center justify-center rounded-full border-2 bg-white transition-all duration-400 ${
                            isActive ? 'border-primary-light scale-110' : 'border-neutral-300 group-hover:border-primary-light/60'
                          }`}
                        >
                          <span className={`h-[3px] w-[3px] rounded-full transition-colors duration-400 ${isActive ? 'bg-primary-light' : 'bg-transparent'}`} />
                        </span>

                        <span className={`editorial-number block font-heading text-[34px] font-bold leading-none transition-colors duration-400 ${isActive ? 'text-primary-light' : 'text-neutral-200 group-hover:text-neutral-300'}`}>
                          {item.num}
                        </span>
                        <h4 className={`mt-2 font-heading text-[19px] font-bold uppercase leading-tight tracking-[-0.3px] transition-colors duration-400 ${isActive ? 'text-primary-dark' : 'text-neutral-400 group-hover:text-neutral-600'}`}>
                          {item.label}
                        </h4>
                        {/* Active underline accent */}
                        <span className={`mt-2.5 block h-px origin-left bg-primary-light transition-transform duration-500 ${isActive ? 'w-10 scale-x-100' : 'w-10 scale-x-0'}`} />
                      </a>
                    );
                  })}
                </div>

                {/* Editorial closing statement */}
                <div className="mt-4 rounded-2xl bg-[#f5f9f6] p-6">
                  <svg className="mb-3 h-5 w-5 text-primary-light/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <p className="font-heading text-[15px] font-semibold leading-snug text-primary-dark">{pillars.note}</p>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="space-y-24 lg:space-y-32">

              {/* Mobile pillar note */}
              {pillars.note && (
                <div className="lg:hidden -mt-2 flex items-center gap-3 rounded-xl bg-[#f5f9f6] px-4 py-3.5">
                  <span className="h-8 w-1 flex-shrink-0 rounded-full bg-primary-light/60" />
                  <p className="font-heading text-[14px] font-semibold leading-snug text-primary-dark">{pillars.note}</p>
                </div>
              )}

              {/* ---- 01 Innovation ---- */}
              <div id="innovation" ref={innovationRef} className="[scroll-margin-top:110px]">
                {/* Split-screen editorial hero: copy left, R&D image right */}
                <div className="grid gap-10 lg:grid-cols-[48%_52%] lg:items-center lg:gap-14">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light lg:hidden">
                      01 — {pillars.oneLabel}
                    </p>
                    <div className="mb-5 hidden items-baseline gap-3 lg:flex">
                      <span className="editorial-number font-heading text-[13px] font-bold tracking-[2px] text-primary-light">01</span>
                      <span className="font-heading text-[12px] font-bold uppercase tracking-[3px] text-neutral-400">{pillars.oneLabel}</span>
                    </div>
                    <h2 className="max-w-[640px] font-heading text-[30px] font-bold uppercase leading-[1.04] tracking-[-1px] text-primary-dark sm:text-[40px] lg:text-[46px]">
                      {innovation.heading}
                    </h2>
                    <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                      {innovation.intro}
                    </p>
                  </motion.div>

                  {/* Large R&D visual */}
                  <motion.figure
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-[24px] bg-[#f5f9f6]"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
                        alt="Zeovus Life formulation and R&D laboratory"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary-dark/70 via-primary-dark/15 to-transparent" />
                    <figcaption className="absolute bottom-5 left-5 flex items-center gap-2 font-heading text-[10px] font-bold uppercase tracking-[2px] text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      Formulation R&amp;D
                    </figcaption>
                  </motion.figure>
                </div>

                {/* Three supporting points — vertical editorial blocks */}
                <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-100 sm:grid-cols-3">
                  {innovationFacts.map((fact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white p-6 sm:p-7"
                    >
                      <span className="editorial-number font-heading text-[13px] font-bold tracking-[1.5px] text-primary-light">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-3 block h-px w-8 bg-primary-light/40" />
                      <p className="mt-4 text-[14px] leading-relaxed text-neutral-600">{fact}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Technical content — two lightweight panels over a subtle science backdrop */}
                <div className="relative mt-14">
                  {/* Subtle scientific background pattern */}
                  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden="true">
                    <defs>
                      <pattern id="cap-molecule" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="4" fill="none" stroke="#1F4015" strokeWidth="1" />
                        <circle cx="90" cy="45" r="4" fill="none" stroke="#1F4015" strokeWidth="1" />
                        <circle cx="55" cy="95" r="4" fill="none" stroke="#1F4015" strokeWidth="1" />
                        <line x1="20" y1="20" x2="90" y2="45" stroke="#1F4015" strokeWidth="0.7" />
                        <line x1="90" y1="45" x2="55" y2="95" stroke="#1F4015" strokeWidth="0.7" />
                        <line x1="55" y1="95" x2="20" y2="20" stroke="#1F4015" strokeWidth="0.7" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cap-molecule)" />
                  </svg>

                  <div className="relative grid gap-10 sm:grid-cols-2 sm:gap-12">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="font-heading text-[13px] font-bold uppercase tracking-[1.5px] text-primary-dark">
                        {innovation.formulationHeading}
                      </h3>
                      <span className="mt-2.5 block h-px w-full bg-primary-light/30" />
                      <ul className="mt-1">
                        {formulationScience.map((line, i) => (
                          <li key={i} className="flex gap-3 border-b border-neutral-100 py-3.5 last:border-b-0">
                            <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                            <span className="text-[14px] leading-relaxed text-neutral-600">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="font-heading text-[13px] font-bold uppercase tracking-[1.5px] text-primary-dark">
                        {innovation.testingHeading}
                      </h3>
                      <span className="mt-2.5 block h-px w-full bg-primary-light/30" />
                      <ul className="mt-1">
                        {testingValidation.map((line, i) => (
                          <li key={i} className="flex gap-3 border-b border-neutral-100 py-3.5 last:border-b-0">
                            <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                            <span className="text-[14px] leading-relaxed text-neutral-600">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>

                {/* Pull-quote break */}
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-14 border-l-2 border-primary-light pl-6 font-heading text-[20px] font-semibold leading-snug text-primary-dark sm:text-[24px]"
                >
                  {innovation.quote}
                </motion.blockquote>

                {/* Regulatory Science inset */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-14 border-l-2 border-primary-dark/20 bg-[#f5f9f6] px-6 py-7 sm:px-8 sm:py-8"
                >
                  <h4 className="mb-4 font-heading text-[13px] font-bold uppercase tracking-[2px] text-primary-dark">
                    {innovation.regulatoryHeading}
                  </h4>
                  <ul className="space-y-3">
                    {regulatoryScience.map((line, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-[2px] text-primary-light">—</span>
                        <span className="text-[14px] leading-relaxed text-neutral-600">{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* ---- 02 Manufacturing ---- */}
              <div id="manufacturing" ref={manufacturingRef} className="[scroll-margin-top:110px]">
                {/* Hero: copy left, large manufacturing image right */}
                <div className="grid gap-10 lg:grid-cols-[46%_54%] lg:items-center lg:gap-14">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light lg:hidden">
                      02 — {pillars.twoLabel}
                    </p>
                    <div className="mb-5 hidden items-baseline gap-3 lg:flex">
                      <span className="editorial-number font-heading text-[13px] font-bold tracking-[2px] text-primary-light">02</span>
                      <span className="font-heading text-[12px] font-bold uppercase tracking-[3px] text-neutral-400">{pillars.twoLabel}</span>
                    </div>
                    <h2 className="max-w-[640px] font-heading text-[30px] font-bold uppercase leading-[1.04] tracking-[-1px] text-primary-dark sm:text-[40px] lg:text-[46px]">
                      {manufacturing.heading}
                    </h2>
                    <p className="mt-6 max-w-[680px] text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                      {manufacturing.intro}
                    </p>
                  </motion.div>

                  <motion.figure
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-[24px] bg-[#f5f9f6]"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1500&q=80"
                        alt="Zeovus Life manufacturing facility at scale"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary-dark/70 via-primary-dark/15 to-transparent" />
                    <figcaption className="absolute bottom-5 left-5 flex items-center gap-2 font-heading text-[10px] font-bold uppercase tracking-[2px] text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      Manufacturing at scale
                    </figcaption>
                  </motion.figure>
                </div>

                {/* Three supporting statements — compact editorial blocks */}
                <div className="mt-12 grid gap-5 sm:grid-cols-3">
                  {manufacturingFacts.map((fact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl border border-neutral-100 bg-white p-6"
                    >
                      <span className="block h-px w-8 bg-primary-light" />
                      <p className="mt-4 text-[14px] leading-relaxed text-neutral-600">{fact}</p>
                    </motion.div>
                  ))}
                </div>

                {/* ===== NUTRACEUTICAL FORMATS ZONE ===== */}
                <div className="mt-16 lg:mt-20">
                  <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-12">
                    <div className="lg:order-1">
                      <div className="mb-6 flex items-baseline justify-between border-b border-neutral-100 pb-4">
                        <h3 className="font-heading text-[22px] font-bold uppercase tracking-[-0.5px] text-primary-dark sm:text-[26px]">
                          {manufacturing.nutraHeading}
                        </h3>
                        <span className="font-heading text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-light">
                          {nutraceuticalFormats.length} formats
                        </span>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {nutraceuticalFormats.map((f, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            className="group rounded-[18px] border border-neutral-200/70 bg-white p-5 transition-all duration-300 hover:border-primary-light/40 hover:shadow-[0_8px_24px_rgba(31,64,21,0.06)]"
                          >
                            <span className="editorial-number font-heading text-[11px] font-bold tracking-[1.5px] text-primary-light">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <h4 className="mt-2 font-heading text-[15px] font-bold uppercase tracking-[-0.2px] text-primary-dark">
                              {f.name}
                            </h4>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
                              {f.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                      {manufacturing.nutraCtaLabel && (
                        <div className="mt-7">
                          <ArrowLink href={manufacturing.nutraCtaHref || '/nutraceuticals'}>
                            {manufacturing.nutraCtaLabel}
                          </ArrowLink>
                        </div>
                      )}
                    </div>

                    {/* Nutraceutical formats image */}
                    <motion.figure
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative overflow-hidden rounded-[24px] bg-[#f5f9f6] lg:sticky lg:top-32"
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1000&q=80"
                          alt="Nutraceutical formats — capsules, tablets, softgels and powders"
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-dark/55 to-transparent" />
                    </motion.figure>
                  </div>
                </div>

                {/* Elegant divider between divisions */}
                <div className="mt-16 flex items-center gap-5 lg:mt-20">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[2.5px] text-neutral-400">Cosmetics division</span>
                  <span className="h-px flex-1 bg-neutral-200" />
                </div>

                {/* ===== COSMETICS FORMATS ZONE ===== */}
                <div className="mt-10">
                  <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start lg:gap-12">
                    {/* Cosmetics formats image */}
                    <motion.figure
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative order-2 overflow-hidden rounded-[24px] bg-[#f5f9f6] lg:order-1 lg:sticky lg:top-32"
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
                          alt="Cosmetic formulation textures — creams, serums and lotions"
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-dark/55 to-transparent" />
                    </motion.figure>

                    <div className="order-1 lg:order-2">
                      <div className="mb-6 flex items-baseline justify-between border-b border-neutral-100 pb-4">
                        <h3 className="font-heading text-[22px] font-bold uppercase tracking-[-0.5px] text-primary-dark sm:text-[26px]">
                          {manufacturing.cosmeticsHeading}
                        </h3>
                        <span className="font-heading text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-light">
                          {cosmeticsFormats.length} formats
                        </span>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {cosmeticsFormats.map((f, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            className="group rounded-[18px] border border-neutral-200/70 bg-white p-5 transition-all duration-300 hover:border-primary-light/40 hover:shadow-[0_8px_24px_rgba(31,64,21,0.06)]"
                          >
                            <span className="editorial-number font-heading text-[11px] font-bold tracking-[1.5px] text-primary-light">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <h4 className="mt-2 font-heading text-[15px] font-bold uppercase tracking-[-0.2px] text-primary-dark">
                              {f.name}
                            </h4>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
                              {f.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                      {manufacturing.cosmeticsCtaLabel && (
                        <div className="mt-7">
                          <ArrowLink href={manufacturing.cosmeticsCtaHref || '/cosmetics'}>
                            {manufacturing.cosmeticsCtaLabel}
                          </ArrowLink>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS — GSAP horizontal scroll ============ */}
      {process.enabled !== false && processSteps.length > 0 && (
      <section id="process" className="relative bg-[#f5f9f6]">
        <div className="mx-auto max-w-[1500px] px-5 pt-20 sm:px-8 sm:pt-26 lg:px-12 lg:pt-30">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 max-w-[820px] lg:mb-16"
          >
            <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">
              {process.eyebrow}
            </p>
            <h2 className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px] lg:text-[42px]">
              {process.heading}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
              {process.intro}
            </p>
          </motion.div>
        </div>

        <div ref={horizontalStageRef} className="relative lg:h-screen lg:overflow-hidden">
          <div className="flex h-full items-end">
            <div
              ref={trackRef}
              className="flex items-end gap-5 overflow-x-auto px-5 pb-10 snap-x snap-mandatory sm:gap-6 sm:px-8 lg:snap-none lg:overflow-visible lg:px-12 lg:pb-12"
            >
              {processSteps.map((item, index) => (
                <div
                  key={index}
                  className="group relative w-[280px] flex-shrink-0 snap-start sm:w-[320px] lg:w-[380px]"
                >
                  {/* Text content — original layout */}
                  <div className="border-t-2 border-neutral-200 pt-6 transition-colors duration-500 group-hover:border-primary-light lg:pt-8">
                    <span className="editorial-number font-heading text-[52px] font-bold leading-none text-neutral-300 transition-colors duration-500 group-hover:text-primary-light/40 sm:text-[64px] lg:text-[76px]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className="mt-5 font-heading text-[17px] font-bold uppercase tracking-[-0.3px] text-primary-dark sm:text-[19px] lg:mt-6 lg:text-[21px]">
                      {item.title}
                    </h4>
                    <p className="mt-3 max-w-[290px] text-[14px] leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </div>

                  {/* Image — 4:5 aspect ratio, square edges */}
                  <div className="mt-5">
                    {item.image ? (
                      <div className="overflow-hidden aspect-[3/4]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[3/4]" />
                    )}
                  </div>
                </div>
              ))}
              {/* trailing spacer for pinned desktop track */}
              <div className="hidden w-[8vw] flex-shrink-0 lg:block" />
            </div>
          </div>

          {/* Progress bar — desktop pinned mode only */}
          <div className="absolute bottom-0 left-12 right-12 hidden h-[2px] bg-neutral-200 lg:block">
            <div ref={progressRef} className="h-full origin-left scale-x-0 bg-primary-light" />
          </div>
        </div>
      </section>
      )}

      {/* ============ QUALITY PROMISE ============ */}
      {qualityPromise.enabled !== false && (
      <section className="relative overflow-hidden border-t border-neutral-100">
        <div className="grid lg:grid-cols-2">

          {/* LEFT PANEL — Our Promise + checklist */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden bg-[#f5f9f6] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
          >
            {/* Ghost watermark */}
            {qualityPromise.promiseWatermark && (
              <span className="pointer-events-none absolute -top-4 right-0 select-none font-heading text-[130px] font-bold leading-none tracking-tight text-primary-dark/[0.05] sm:text-[170px]">
                {qualityPromise.promiseWatermark}
              </span>
            )}

            <div className="relative mx-auto max-w-[560px]">
              {qualityPromise.promiseBadge && (
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-primary-light/[0.07] px-3.5 py-1.5 font-heading text-[10px] font-bold uppercase tracking-[1.8px] text-primary-dark">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
                  {qualityPromise.promiseBadge}
                </span>
              )}

              <h2 className="mt-6 font-heading text-[34px] font-bold uppercase leading-[1.0] tracking-[-1px] text-primary-dark sm:text-[46px]">
                {qualityPromise.promiseHeadingLead}
                {qualityPromise.promiseHeadingAccent && (
                  <>
                    <br />
                    {qualityPromise.promiseHeadingAccent}
                  </>
                )}
              </h2>

              {qualityPromise.promiseIntro && (
                <p className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-neutral-600">
                  {qualityPromise.promiseIntro}
                </p>
              )}

              <div className="mt-9 grid gap-3.5 sm:grid-cols-2">
                {qualityChecks.map((check, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 rounded-xl border border-primary-dark/[0.06] bg-white px-4 py-3.5 shadow-[0_1px_3px_rgba(31,64,21,0.04)]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-light/12 text-primary-light">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-[13.5px] font-medium leading-snug text-neutral-700">
                      {check}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL — Quality & Certifications */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-primary-dark px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
          >
            <div className="relative mx-auto max-w-[600px]">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  {qualityPromise.qualityEyebrow && (
                    <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[2px] text-secondary">
                      {qualityPromise.qualityEyebrow}
                    </p>
                  )}
                  <h2 className="font-heading text-[38px] font-bold uppercase leading-[0.98] tracking-[-1.5px] text-white sm:text-[52px]">
                    {qualityPromise.qualityHeadingLead}
                    {qualityPromise.qualityHeadingAccent && (
                      <>
                        <br />
                        <span className="text-secondary">{qualityPromise.qualityHeadingAccent}</span>
                      </>
                    )}
                  </h2>
                </div>
                {qualityPromise.sealImage && (
                  <img
                    src={qualityPromise.sealImage}
                    alt={qualityPromise.sealAlt || ''}
                    className="h-[110px] w-[110px] flex-shrink-0 object-contain sm:h-[140px] sm:w-[140px]"
                  />
                )}
              </div>

              <div className="mt-7 space-y-5 text-[14.5px] leading-[1.7] text-white/75 sm:text-[15px]">
                {qualityParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Stat cards */}
              {qualityStats.length > 0 && (
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {qualityStats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-5"
                    >
                      <span className="editorial-number block font-heading text-[38px] font-bold leading-none text-secondary sm:text-[44px]">
                        {stat.value}
                      </span>
                      <span className="mt-2.5 block font-heading text-[9.5px] font-semibold uppercase tracking-[1px] leading-tight text-white/50">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Closing quote */}
              {qualityPromise.quote && (
                <div className="mt-6 rounded-xl border-l-[3px] border-primary-light bg-white/[0.05] px-6 py-6">
                  <p className="font-heading text-[16px] font-semibold leading-[1.55] tracking-[0.2px] text-white sm:text-[18px]">
                    {qualityPromise.quote}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </section>
      )}

      {/* ============ CERTIFICATIONS MARQUEE ============ */}
      {certsSection.enabled !== false && certifications.length > 0 && (
      <section id="certifications" className="relative overflow-hidden border-t border-neutral-100 bg-white py-16 sm:py-20 [scroll-margin-top:90px]">
        <div className="mx-auto mb-8 max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">
            {certsSection.eyebrow}
          </p>
          <h3 className="mt-2 font-heading text-[22px] font-bold uppercase tracking-[-0.5px] text-primary-dark sm:text-[26px]">
            {certsSection.heading}
          </h3>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent sm:w-28" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent sm:w-28" />

          <div className="flex w-max animate-cert-scroll items-center gap-4 py-3">
            {[...certifications, ...certifications].map((cert, i) => (
              <div
                key={i}
                className="inline-flex flex-shrink-0 flex-col items-center justify-center gap-2.5 rounded-xl border border-primary-dark/[0.06] bg-white px-5 py-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-light/30 hover:shadow-[0_4px_16px_rgba(21,168,89,0.08)]"
                style={{ minWidth: '105px', minHeight: '84px' }}
              >
                {cert.logo ? (
                  <img src={cert.logo} alt={cert.label} className="h-9 w-auto max-w-[72px] object-contain" />
                ) : (
                  <span className="flex h-9 items-center font-heading text-[14px] font-bold tracking-[-0.3px] text-primary-dark">
                    {cert.label}
                  </span>
                )}
                <span className="font-heading text-[9px] font-semibold uppercase tracking-[1.2px] text-neutral-400">
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

    </div>
  );
}
