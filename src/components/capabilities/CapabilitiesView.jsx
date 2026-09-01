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
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">

            {/* Sticky index nav — desktop only */}
            <div className="hidden lg:block">
              <div className="sticky top-32 space-y-10">
                <a href="#innovation" className="group block">
                  <span className={`font-heading text-[11px] font-semibold uppercase tracking-[2px] transition-colors duration-300 ${activeSection === 'innovation' ? 'text-primary-light' : 'text-neutral-400'}`}>
                    01
                  </span>
                  <h4 className={`mt-1 font-heading text-[18px] font-bold uppercase transition-colors duration-300 ${activeSection === 'innovation' ? 'text-primary-dark' : 'text-neutral-400'}`}>
                    {pillars.oneLabel}
                  </h4>
                </a>
                <a href="#manufacturing" className="group block">
                  <span className={`font-heading text-[11px] font-semibold uppercase tracking-[2px] transition-colors duration-300 ${activeSection === 'manufacturing' ? 'text-primary-light' : 'text-neutral-400'}`}>
                    02
                  </span>
                  <h4 className={`mt-1 font-heading text-[18px] font-bold uppercase transition-colors duration-300 ${activeSection === 'manufacturing' ? 'text-primary-dark' : 'text-neutral-400'}`}>
                    {pillars.twoLabel}
                  </h4>
                </a>
                <div className="border-t border-neutral-100 pt-6">
                  <p className="text-[13px] leading-relaxed text-neutral-500">{pillars.note}</p>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="space-y-24 lg:space-y-32">

              {/* ---- 01 Innovation ---- */}
              <div id="innovation" ref={innovationRef} className="[scroll-margin-top:110px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light lg:hidden">
                    01 — {pillars.oneLabel}
                  </p>
                  <h2 className="max-w-[640px] font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px]">
                    {innovation.heading}
                  </h2>
                  <p className="mt-5 max-w-[620px] text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                    {innovation.intro}
                  </p>

                  {/* At-a-glance facts */}
                  <div className="mt-8 grid gap-x-8 gap-y-3 border-t border-neutral-100 pt-6 sm:grid-cols-3">
                    {innovationFacts.map((fact, i) => (
                      <p key={i} className="text-[12px] leading-relaxed text-neutral-500">
                        <span className="text-primary-light">— </span>{fact}
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* Formulation Design & Testing — side-by-side spec lists */}
                <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-10">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="mb-4 font-heading text-[13px] font-bold uppercase tracking-[1.5px] text-primary-dark">
                      {innovation.formulationHeading}
                    </h3>
                    <ul>
                      {formulationScience.map((line, i) => (
                        <li key={i} className="flex gap-3 border-b border-neutral-100 py-3 last:border-b-0">
                          <span className="mt-[2px] text-primary-light">—</span>
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
                    <h3 className="mb-4 font-heading text-[13px] font-bold uppercase tracking-[1.5px] text-primary-dark">
                      {innovation.testingHeading}
                    </h3>
                    <ul>
                      {testingValidation.map((line, i) => (
                        <li key={i} className="flex gap-3 border-b border-neutral-100 py-3 last:border-b-0">
                          <span className="mt-[2px] text-primary-light">—</span>
                          <span className="text-[14px] leading-relaxed text-neutral-600">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light lg:hidden">
                    02 — {pillars.twoLabel}
                  </p>
                  <h2 className="max-w-[640px] font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px]">
                    {manufacturing.heading}
                  </h2>
                  <p className="mt-5 max-w-[680px] text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                    {manufacturing.intro}
                  </p>

                  <div className="mt-8 grid gap-x-8 gap-y-3 border-t border-neutral-100 pt-6 sm:grid-cols-3">
                    {manufacturingFacts.map((fact, i) => (
                      <p key={i} className="text-[12px] leading-relaxed text-neutral-500">
                        <span className="text-primary-light">— </span>{fact}
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* Formats directory — spec-sheet lists, not cards */}
                <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-5 flex items-baseline justify-between">
                      <h3 className="font-heading text-[13px] font-bold uppercase tracking-[1.5px] text-primary-dark">
                        {manufacturing.nutraHeading}
                      </h3>
                      <span className="font-heading text-[11px] text-neutral-400">
                        {nutraceuticalFormats.length} formats
                      </span>
                    </div>
                    <div className="border-t border-neutral-100">
                      {nutraceuticalFormats.map((f, i) => (
                        <div
                          key={i}
                          className="group relative flex flex-col gap-1 border-b border-neutral-100 py-4 pl-4 -ml-4 transition-colors duration-300 hover:bg-[#f5f9f6]/70 sm:flex-row sm:items-baseline sm:gap-4"
                        >
                          <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-primary-light transition-transform duration-400 ease-out-quint group-hover:scale-y-100" />
                          <span className="flex-shrink-0 font-heading text-[14px] font-semibold text-primary-dark sm:w-[160px]">
                            {f.name}
                          </span>
                          <span className="text-[13px] leading-relaxed text-neutral-500">
                            {f.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                    {manufacturing.nutraCtaLabel && (
                      <div className="mt-6">
                        <ArrowLink href={manufacturing.nutraCtaHref || '/nutraceuticals'}>
                          {manufacturing.nutraCtaLabel}
                        </ArrowLink>
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-5 flex items-baseline justify-between">
                      <h3 className="font-heading text-[13px] font-bold uppercase tracking-[1.5px] text-primary-dark">
                        {manufacturing.cosmeticsHeading}
                      </h3>
                      <span className="font-heading text-[11px] text-neutral-400">
                        {cosmeticsFormats.length} formats
                      </span>
                    </div>
                    <div className="border-t border-neutral-100">
                      {cosmeticsFormats.map((f, i) => (
                        <div
                          key={i}
                          className="group relative flex flex-col gap-1 border-b border-neutral-100 py-4 pl-4 -ml-4 transition-colors duration-300 hover:bg-[#f5f9f6]/70 sm:flex-row sm:items-baseline sm:gap-4"
                        >
                          <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-primary-light transition-transform duration-400 ease-out-quint group-hover:scale-y-100" />
                          <span className="flex-shrink-0 font-heading text-[14px] font-semibold text-primary-dark sm:w-[160px]">
                            {f.name}
                          </span>
                          <span className="text-[13px] leading-relaxed text-neutral-500">
                            {f.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                    {manufacturing.cosmeticsCtaLabel && (
                      <div className="mt-6">
                        <ArrowLink href={manufacturing.cosmeticsCtaHref || '/cosmetics'}>
                          {manufacturing.cosmeticsCtaLabel}
                        </ArrowLink>
                      </div>
                    )}
                  </motion.div>
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
