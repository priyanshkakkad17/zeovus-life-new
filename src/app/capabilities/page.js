'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import EditableRegion from '@/components/cms/EditableRegion';

gsap.registerPlugin(ScrollTrigger);

const nutraceuticalFormats = [
  { name: 'Capsules', desc: 'Hard-shell and softgel capsules with various fill types' },
  { name: 'Tablets', desc: 'Compressed tablets including chewable and effervescent' },
  { name: 'Gummies', desc: 'Chewable gummies in various shapes and flavors' },
  { name: 'Softgels', desc: 'Oil-based formulations in softgel shells' },
  { name: 'Powder Sachets', desc: 'Stick packs and sachets for easy consumption' },
  { name: 'Oral Dissolving Strips', desc: 'Fast-dissolving strips for quick absorption' },
  { name: 'Transdermal Patches', desc: 'Patches for controlled release delivery' },
  { name: 'Liquid Shots', desc: 'Ready-to-drink ampoules and shots' },
];

const cosmeticsFormats = [
  { name: 'Creams & Lotions', desc: 'Emulsions for skin application' },
  { name: 'Serums', desc: 'High-concentration active formulations' },
  { name: 'Sun Care', desc: 'SPF formulations and after-sun products' },
  { name: 'Hair Care', desc: 'Shampoos, conditioners, and treatments' },
  { name: 'Body Care', desc: 'Body lotions, butters, and oils' },
  { name: 'Facial Masks', desc: 'Sheet masks and wash-off formulations' },
  { name: 'Topical Oils', desc: 'Essential oil blends and massage oils' },
  { name: 'Soaps', desc: 'Liquid and solid soap formulations' },
];

const processSteps = [
  { step: 1, title: 'Consultation', description: "Goal, audience and format. We start by understanding what the product needs to do, who it's for, and what format is to be built.", image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868035/Consultation.png' },
  { step: 2, title: 'Formulation', description: "In-house R&D builds an evidence-based formula with particle engineering when standard raw materials won't do the job.", image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868039/Formulation.png' },
  { step: 3, title: 'Ingredient Selection', description: 'Choosing which ingredients and forms meet our potency and bioavailability standards.', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787869644/Ingredient_Selection.png' },
  { step: 4, title: 'PO & Kickoff', description: 'Production begins once the order is confirmed. Procurement, scheduling and production planning all start at the same time.', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868037/PO_Kickoff.png' },
  { step: 5, title: 'Procurement', description: 'Ordering and shipping the ingredients chosen, including made-to-order and temperature-sensitive actives.', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868039/Procurement.png' },
  { step: 6, title: 'Manufacturing', description: 'The production run itself, across the chosen format — granulating, encapsulating, or emulsifying.', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868037/Manufacturing.png' },
  { step: 7, title: 'QC & Testing', description: 'Every batch is tested against the original formula and for long-term stability, through ZQA.', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868058/QC_Testing.png' },
  { step: 8, title: 'Packaging & Delivery', description: 'The final step is labelling, packaging and shipping the finished product ready for shelf.', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868037/Packaging_Delivery.png' },
];

const formulationScience = [
  'In-house formulation team working from clinical literature',
  'Liposomal, nanoemulsion and microencapsulation systems',
  'Biomimetic emulsion design and sensory/texture optimisation',
  'Continuous evaluation of next-generation delivery technology',
];

const testingValidation = [
  'Compatibility and accelerated-ageing studies',
  'Particle size and encapsulation efficiency testing',
  'Pilot-batch trials before any scale-up',
  'Release-profile testing at every stage',
];

const regulatoryScience = [
  'Formulated in line with global compliance frameworks',
  'Every claim backed by measurable, label-ready specificity',
  "Built to meet the requirements of its target market",
];

const innovationFacts = [
  'Formulation and regulatory science developed together, not sequentially',
  'Pilot-batch validation before every scale-up',
  'Continuous evaluation of next-generation delivery technology',
];

const manufacturingFacts = [
  'Multiple production lines running in parallel across both divisions',
  'Pilot-to-commercial scale-up without changing manufacturing partners',
  'GMP-certified, allergen-controlled, machine-vision quality control',
];

const certifications = [
  { label: 'GMP', logo: '/logo/gmp.png' },
  { label: 'ISO', logo: null },
  { label: 'HACCP', logo: '/logo/haccp.png' },
  { label: 'FSSC 22000', logo: '/logo/iso22000.png' },
  { label: 'BRCGS', logo: '/logo/brcgs.png' },
  { label: 'IFS', logo: null },
  { label: 'US FDA', logo: '/logo/usfda.png' },
  { label: 'ISO 22716', logo: null },
  { label: 'COSMOS', logo: null },
  { label: 'HALAL', logo: '/logo/halal.png' },
  { label: 'KOSHER', logo: '/logo/kosher.png' },
  { label: 'ORGANIC', logo: '/logo/organic.png' },
  { label: 'NON-GMO', logo: null },
  { label: 'VEGAN', logo: '/logo/vegan.webp' },
  { label: 'FSSAI', logo: '/logo/fssai.png' },
];

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

export default function Capabilities() {
  const [activeSection, setActiveSection] = useState('innovation');
  const [content, setContent] = useState(null);
  const innovationRef = useRef(null);
  const manufacturingRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/content?page=capabilities')
      .then((res) => res.json())
      .then((data) => { if (!cancelled && data?.content) setContent(data.content); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  const cms = (key, fallback) => content?.[key] || fallback;

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

              <EditableRegion page="capabilities">
                <h1 className="max-w-[820px] font-heading text-[38px] font-bold uppercase leading-[1.02] tracking-[-1.5px] sm:text-[52px] lg:text-[64px]">
                  {cms('hero_title_lead', 'Proven in research.')}
                  <br />
                  <span className="text-secondary">{cms('hero_title_accent', 'Built to scale.')}</span>
                </h1>
              </EditableRegion>

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
                <a href="#process">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block cursor-pointer rounded-[2px] border border-white/25 bg-white/[0.04] px-7 py-3.5 font-heading text-xs font-semibold tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
                  >
                    SEE OUR PROCESS
                  </motion.span>
                </a>
              </div>
            </motion.div>

            {/* Stat column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-10 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
            >
              <div>
                <span className="editorial-number block font-heading text-[42px] font-bold text-secondary lg:text-[50px]">8</span>
                <span className="mt-2 block font-heading text-[11px] uppercase tracking-[2px] text-neutral-400">Step Process</span>
              </div>
              <div>
                <span className="editorial-number block font-heading text-[42px] font-bold text-secondary lg:text-[50px]">17</span>
                <span className="mt-2 block font-heading text-[11px] uppercase tracking-[2px] text-neutral-400">Certifications</span>
              </div>

            </motion.div>
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
                    Innovation
                  </h4>
                </a>
                <a href="#manufacturing" className="group block">
                  <span className={`font-heading text-[11px] font-semibold uppercase tracking-[2px] transition-colors duration-300 ${activeSection === 'manufacturing' ? 'text-primary-light' : 'text-neutral-400'}`}>
                    02
                  </span>
                  <h4 className={`mt-1 font-heading text-[18px] font-bold uppercase transition-colors duration-300 ${activeSection === 'manufacturing' ? 'text-primary-dark' : 'text-neutral-400'}`}>
                    Manufacturing
                  </h4>
                </a>
                <div className="border-t border-neutral-100 pt-6">
                  <p className="text-[13px] leading-relaxed text-neutral-500">
                    Two disciplines. One quality standard.
                  </p>
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
                    01 — Innovation
                  </p>
                  <EditableRegion page="capabilities">
                    <h2 className="max-w-[640px] font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px]">
                      {cms('innovation_heading', 'Where formulation science meets real-world performance.')}
                    </h2>
                    <p className="mt-5 max-w-[620px] text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                      {cms('innovation_intro', "Zeovus Life's in-house formulation team is adept at turning ideas into expertly formulated nutraceutical and cosmetic products. We specialise in custom formulation across gummies, softgels and tablets, alongside serums, lotions and other topical formats, each developed with the same clinical rigour, whatever the format.")}
                    </p>
                  </EditableRegion>

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
                      Formulation Design &amp; Delivery Science
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
                      Testing &amp; Validation
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
                  {cms('innovation_quote', 'Every format is developed with the same clinical rigour.')}
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
                    Regulatory Science
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
                    02 — Manufacturing
                  </p>
                  <EditableRegion page="capabilities">
                    <h2 className="max-w-[640px] font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px]">
                      {cms('manufacturing_heading', 'Manufacturing built for every format, at scale.')}
                    </h2>
                    <p className="mt-5 max-w-[680px] text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                      {cms('manufacturing_intro', 'Zeovus Life manufactures nutraceuticals and cosmetics across every major format on the market today, inside GMP, ISO- and HACCP-certified, allergen-controlled facilities — with capacity that scales from first sample to full commercial volume without ever changing partners.')}
                    </p>
                  </EditableRegion>

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
                        Nutraceutical Formats
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
                    <div className="mt-6">
                      <ArrowLink href="/nutraceuticals">Explore Nutraceuticals</ArrowLink>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-5 flex items-baseline justify-between">
                      <h3 className="font-heading text-[13px] font-bold uppercase tracking-[1.5px] text-primary-dark">
                        Cosmetics Formats
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
                    <div className="mt-6">
                      <ArrowLink href="/cosmetics">Explore Cosmetics</ArrowLink>
                    </div>
                  </motion.div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS — GSAP horizontal scroll ============ */}
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
              How we work
            </p>
            <h2 className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px] lg:text-[42px]">
              {cms('process_heading', 'From brief to shelf, in eight steps.')}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
              Scroll to move through our process — from first consultation to the
              finished product ready for shelf.
            </p>
          </motion.div>
        </div>

        <div ref={horizontalStageRef} className="relative lg:h-screen lg:overflow-hidden">
          <div className="flex h-full items-end">
            <div
              ref={trackRef}
              className="flex items-end gap-5 overflow-x-auto px-5 pb-10 snap-x snap-mandatory sm:gap-6 sm:px-8 lg:snap-none lg:overflow-visible lg:px-12 lg:pb-12"
            >
              {processSteps.map((item) => (
                <div
                  key={item.step}
                  className="group relative w-[280px] flex-shrink-0 snap-start sm:w-[320px] lg:w-[380px]"
                >
                  {/* Text content — original layout */}
                  <div className="border-t-2 border-neutral-200 pt-6 transition-colors duration-500 group-hover:border-primary-light lg:pt-8">
                    <span className="editorial-number font-heading text-[52px] font-bold leading-none text-neutral-300 transition-colors duration-500 group-hover:text-primary-light/40 sm:text-[64px] lg:text-[76px]">
                      {String(item.step).padStart(2, '0')}
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

      {/* ============ CERTIFICATIONS MARQUEE ============ */}
      <section id="certifications" className="relative overflow-hidden border-t border-neutral-100 bg-white py-16 sm:py-20 [scroll-margin-top:90px]">
        <div className="mx-auto mb-8 max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">
            Certified excellence
          </p>
          <h3 className="mt-2 font-heading text-[22px] font-bold uppercase tracking-[-0.5px] text-primary-dark sm:text-[26px]">
            Every certification behind Zeovus manufacturing.
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

      {/* ============ CLOSING CTA ============ */}
      <section className="relative overflow-hidden bg-primary-dark py-20 text-white sm:py-26 lg:py-30">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 110%, rgba(21,168,89,0.08) 0%, transparent 70%)' }}
        />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border border-white/[0.03]" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full border border-white/[0.02]" />

        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 max-w-[640px] text-center lg:mb-0 lg:text-left"
            >
              <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[3px] text-secondary/60">
                Bring us the brief
              </p>
              <h2 className="mb-5 font-heading text-[32px] font-bold uppercase leading-[1.02] tracking-[-1px] sm:text-[40px] lg:text-[46px]">
                Bring us a formulation brief —
                <br className="hidden sm:block" /> or bring us a problem.
              </h2>
              <p className="max-w-[480px] text-[15px] leading-relaxed text-neutral-300 sm:text-[16px] lg:mx-0 mx-auto">
                We'll work with you to develop the right formulation and bring it to market.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end"
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
              <Link href="/nutraceuticals">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex cursor-pointer items-center gap-3 rounded-[3px] border border-white/20 bg-white/[0.04] px-7 py-4 font-heading text-[12px] font-semibold uppercase tracking-[1.5px] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08] sm:px-8"
                >
                  View Portfolio
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
