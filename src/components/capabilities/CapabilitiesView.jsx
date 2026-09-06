'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Small branded thumbnail placeholder for a format tile. If `src` is provided it
 * renders the image; otherwise a subtle green motif slot (ready for real imagery).
 */
function FormatThumb({ src, alt = '', index = 0 }) {
  return (
    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-primary-dark/[0.06] bg-[#eef4ee]">
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(120% 120% at 30% 20%, rgba(21,168,89,0.14) 0%, transparent 60%), linear-gradient(150deg, #f2f8f2 0%, #e6efe6 100%)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-primary-light/60">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Flip card for a manufacturing format. Front shows the thumbnail + name; the
 * back reveals the full "card brief" description. Flips on hover (desktop) and
 * on tap/focus (touch + keyboard). No content is truncated.
 */
function FormatFlipCard({ format, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full [perspective:1400px]"
      tabIndex={0}
    >
      <div className="relative h-full min-h-[220px] w-full rounded-[18px] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 flex flex-col rounded-[18px] border border-neutral-200/70 bg-white p-5 [backface-visibility:hidden]">
          <div className="flex items-center gap-3.5">
            <FormatThumb src={format.image} alt={format.name} index={index} />
          </div>
          <h4 className="mt-3.5 font-heading text-[15px] font-bold uppercase leading-snug tracking-[-0.2px] text-primary-dark">
            {format.name}
          </h4>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col rounded-[18px] border border-primary-light/40 bg-primary-dark p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h4 className="font-heading text-[13px] font-bold uppercase leading-snug tracking-[-0.2px] text-secondary">
            {format.name}
          </h4>
          <span className="mt-2 block h-px w-8 bg-secondary/50" />
          <p className="mt-3 text-[13px] leading-relaxed text-white/80">
            {format.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

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

export default function CapabilitiesView({ content = {}, certifications = [], heroVideo = '' }) {
  const innovationRef = useRef(null);
  const manufacturingRef = useRef(null);

  const hero = content.hero || {};
  const pillars = content.pillars || {};
  const innovation = content.innovation || {};
  const manufacturing = content.manufacturing || {};
  const process = content.process || {};
  const qualityPromise = content.qualityPromise || {};
  const certsSection = content.certifications || {};
  const qualitySealImage = qualityPromise.sealImage || '/zqa/seal5.png';

  const heroStats = hero.stats || [];
  const innovationFacts = innovation.facts || [];
  const formulationScience = innovation.formulationItems || [];
  const testingValidation = innovation.testingItems || [];
  const regulatoryScience = innovation.regulatoryItems || [];
  const manufacturingFacts = manufacturing.facts || [];
  const nutraceuticalFormats = (manufacturing.nutraFormats || []).map((format, index) => ({
    ...format,
    image: format.image || `/images/nf${index + 1}.jpg`,
  }));
  const cosmeticsFormats = (manufacturing.cosmeticsFormats || []).map((format, index) => ({
    ...format,
    image: format.image || `/images/cf${index + 1}.jpg`,
  }));
  const processSteps = process.steps || [];
  const qualityChecks = qualityPromise.checks || [];
  const qualityParagraphs = qualityPromise.qualityParagraphs || [];
  const qualityStats = qualityPromise.stats || [];

  const horizontalStageRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

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
        {heroVideo && (
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
              <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary-dark/70" aria-hidden="true" />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >

              <h1 className="max-w-[820px] font-heading text-[36px] font-bold uppercase leading-[1.04] tracking-[-1.5px] sm:text-[48px] lg:text-[58px] 2xl:text-[72px]">
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
                className="flex flex-wrap gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:gap-x-10 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
              >
                {heroStats.map((stat, i) => (
                  <div key={i}>
                    <span className="editorial-number block font-heading text-[36px] font-bold text-secondary sm:text-[42px] lg:text-[50px]">
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
          <div className="mx-auto max-w-[1180px]">

            <div className="space-y-24 lg:space-y-32">

              {/* ---- 01 Innovation ---- */}
              <div id="innovation" ref={innovationRef} className="[scroll-margin-top:110px]">
                {/* Section marker */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-9 flex items-end gap-5 border-b border-neutral-200 pb-6"
                >
                  <div className="pb-1.5">
                    <span className="block h-1 w-10 rounded-full bg-primary-light" />
                    <span className="mt-3 block font-heading text-[32px] font-bold uppercase leading-none tracking-[1px] text-primary-dark sm:text-[40px] lg:text-[46px]">
                      {pillars.oneLabel}
                    </span>
                  </div>
                </motion.div>

                {/* Editorial intro */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="whitespace-pre-line font-heading text-[30px] font-bold uppercase leading-[1.04] tracking-[-1px] text-primary-dark sm:text-[40px] lg:text-[44px]">
                    {innovation.heading}
                  </h2>
                  <p className="mt-6 max-w-[760px] text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                    {innovation.intro}
                  </p>
                  {pillars.note && (
                    <p className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#f5f9f6] px-4 py-2 font-heading text-[12px] font-semibold uppercase tracking-[1px] text-primary-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
                      {pillars.note}
                    </p>
                  )}
                </motion.div>

                {/* Innovation feature image */}
                <motion.figure
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative mt-10 aspect-[16/8] overflow-hidden rounded-[24px] border border-primary-dark/[0.06] bg-[#f5f9f6] shadow-[0_16px_45px_rgba(18,45,35,0.08)] sm:aspect-[16/7]"
                >
                  <img
                    src="https://res.cloudinary.com/ac74hfe9/image/upload/v1788717754/WhatsApp_Image_2026-09-06_at_23.24.54.jpg"
                    alt="Zeovus Life formulation science and product innovation"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent" aria-hidden="true" />
                </motion.figure>

                {/* Three supporting points — vertical editorial blocks */}
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

                  <div className="relative grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
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

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="font-heading text-[13px] font-bold uppercase tracking-[1.5px] text-primary-dark">
                        {innovation.regulatoryHeading}
                      </h3>
                      <span className="mt-2.5 block h-px w-full bg-primary-light/30" />
                      <ul className="mt-1">
                        {regulatoryScience.map((line, i) => (
                          <li key={i} className="flex gap-3 border-b border-neutral-100 py-3.5 last:border-b-0">
                            <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                            <span className="text-[14px] leading-relaxed text-neutral-600">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* ---- 02 Manufacturing ---- */}
              <div id="manufacturing" ref={manufacturingRef} className="[scroll-margin-top:110px]">
                {/* Section marker */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-9 flex items-end gap-5 border-b border-neutral-200 pb-6"
                >
                  <div className="pb-1.5">
                    <span className="block h-1 w-10 rounded-full bg-primary-light" />
                    <span className="mt-3 block font-heading text-[32px] font-bold uppercase leading-none tracking-[1px] text-primary-dark sm:text-[40px] lg:text-[46px]">
                      {pillars.twoLabel}
                    </span>
                  </div>
                </motion.div>

                {/* Editorial intro */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="max-w-[820px] font-heading text-[30px] font-bold uppercase leading-[1.04] tracking-[-1px] text-primary-dark sm:text-[40px] lg:text-[46px]">
                    {manufacturing.heading}
                  </h2>
                  <p className="mt-6 max-w-[760px] text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                    {manufacturing.intro}
                  </p>
                </motion.div>

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
                  <div className="mb-6 flex items-baseline justify-between border-b border-neutral-100 pb-4">
                    <h3 className="font-heading text-[22px] font-bold uppercase tracking-[-0.5px] text-primary-dark sm:text-[26px]">
                      {manufacturing.nutraHeading}
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {nutraceuticalFormats.map((f, i) => (
                      <FormatFlipCard key={i} format={f} index={i} />
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

                {/* Elegant divider between divisions */}
                <div className="mt-16 flex items-center gap-5 lg:mt-20">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[2.5px] text-neutral-400">Cosmetics division</span>
                  <span className="h-px flex-1 bg-neutral-200" />
                </div>

                {/* ===== COSMETICS FORMATS ZONE ===== */}
                <div className="mt-10">
                  <div className="mb-6 flex items-baseline justify-between border-b border-neutral-100 pb-4">
                    <h3 className="font-heading text-[22px] font-bold uppercase tracking-[-0.5px] text-primary-dark sm:text-[26px]">
                      {manufacturing.cosmeticsHeading}
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cosmeticsFormats.map((f, i) => (
                      <FormatFlipCard key={i} format={f} index={i} />
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
            <h2 className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px] lg:text-[42px] 2xl:text-[48px]">
              {process.heading}
            </h2>
          </motion.div>
        </div>

        <div ref={horizontalStageRef} className="relative lg:h-screen lg:overflow-hidden">
          <div className="flex h-full items-center">
            <div
              ref={trackRef}
              className="flex items-stretch gap-5 overflow-x-auto px-5 pb-10 snap-x snap-mandatory sm:gap-6 sm:px-8 lg:snap-none lg:overflow-visible lg:px-12 lg:pb-0"
            >
              {processSteps.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex w-[280px] flex-shrink-0 flex-col snap-start sm:w-[320px] lg:w-[340px] 2xl:w-[400px]"
                >
                  {/* Text content — original layout */}
                  <div className="h-[240px] overflow-hidden border-t-2 border-neutral-200 pt-6 transition-colors duration-500 group-hover:border-primary-light sm:h-[245px] lg:h-[235px] lg:pt-7 2xl:h-[250px]">
                    <span className="editorial-number font-heading text-[48px] font-bold leading-none text-neutral-300 transition-colors duration-500 group-hover:text-primary-light/40 sm:text-[60px] lg:text-[56px] 2xl:text-[68px]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className="mt-5 font-heading text-[17px] font-bold uppercase tracking-[-0.3px] text-primary-dark sm:text-[19px] lg:mt-4 lg:text-[20px] 2xl:text-[21px]">
                      {item.title}
                    </h4>
                    <p className="mt-3 max-w-full text-[14px] leading-relaxed text-neutral-600 lg:mt-2.5 lg:line-clamp-4 lg:text-[13.5px] 2xl:text-[14px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Consistent image frame for every process step. The fixed ratio
                      prevents source images with different dimensions from creating
                      uneven-looking cards. */}
                  <div className="mt-5 lg:mt-4">
                    {item.image ? (
                      <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] w-full bg-neutral-100" />
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
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden bg-[#f5f9f6] px-4 py-12 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
          >
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
                    initial={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-primary-dark px-4 py-12 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
          >
            <div className="relative mx-auto max-w-[680px]">
              <div className="flex flex-col gap-6 lg:block">
                <div className="min-w-0">
                  {qualityPromise.qualityEyebrow && (
                    <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[2px] text-secondary">
                      {qualityPromise.qualityEyebrow}
                    </p>
                  )}
                  <h2 className="font-heading text-[28px] font-bold uppercase leading-[0.98] tracking-[-1.2px] text-white sm:text-[44px] lg:text-[42px]">
                    {qualityPromise.qualityHeadingLead}
                    {qualityPromise.qualityHeadingAccent && (
                      <>
                        <br />
                        <span
                          className="inline-block w-max whitespace-nowrap text-secondary"
                          style={{ display: 'inline-block', width: 'max-content', maxWidth: 'none', whiteSpace: 'nowrap', wordBreak: 'keep-all', overflowWrap: 'normal' }}
                        >
                          {qualityPromise.qualityHeadingAccent}
                        </span>
                      </>
                    )}
                  </h2>
                </div>
                {qualitySealImage && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1, rotate: -8, filter: 'blur(0px)' }}
                    whileInView={{
                      opacity: [0, 1, 1, 1],
                      scale: [2.5, 0.8, 1.07, 1],
                      rotate: [-24, -13, -9, -8],
                      filter: ['blur(4px)', 'blur(0.4px)', 'blur(0px)', 'blur(0px)'],
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3,
                      duration: 0.52,
                      times: [0, 0.55, 0.8, 1],
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="relative z-10 flex-shrink-0 self-end lg:absolute lg:right-0 lg:top-0"
                    style={{ transformOrigin: 'center' }}
                  >
                    {/* Ink bleed halo that appears on impact */}
                    <motion.span
                      aria-hidden="true"
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: [0, 0.4, 0], scale: [0.7, 1.15, 1.35] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'radial-gradient(circle, rgba(127,175,127,0.35) 0%, transparent 70%)' }}
                    />
                    <img
                      src={qualitySealImage}
                      alt={qualityPromise.sealAlt || ''}
                      draggable={false}
                      className="relative h-24 w-24 select-none object-contain sm:h-[140px] sm:w-[140px]"
                    />
                  </motion.div>
                )}
              </div>

              <div className="mt-7 space-y-5 text-[14.5px] leading-[1.7] text-white/75 sm:text-[15px]">
                {qualityParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Stat cards */}
              {qualityStats.length > 0 && (
                <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3">
                  {qualityStats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, y: 0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-4 sm:px-4 sm:py-5"
                    >
                      <span className="editorial-number block font-heading text-[26px] font-bold leading-none text-secondary sm:text-[38px] lg:text-[44px]">
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
