'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ContentIcon } from '@/lib/content/icons';
import CaseStudies from '@/components/ourCompany/CaseStudies';

export default function OurCompanyView({ content = {}, certifications = [] }) {
  const hero = content.hero || {};
  const story = content.story || {};
  const visionMission = content.visionMission || {};
  const founders = content.founders || {};
  const audience = content.audience || {};
  const slogan = content.slogan || {};
  const zqa = content.zqa || {};
  const certsSection = content.certifications || {};
  const sustainability = content.sustainability || {};
  const socialImpact = content.socialImpact || {};
  const sustainabilityImage = sustainability.image || 'https://res.cloudinary.com/ac74hfe9/image/upload/v1788717983/WhatsApp_Image_2026-09-06_at_23.34.38.jpg';
  const socialImpactImage = socialImpact.image || 'https://res.cloudinary.com/ac74hfe9/image/upload/v1788718859/IMG_9082.png';

  const heroVideo = hero.media || '';
  const heroTitle = hero.title || '';
  const heroSubtitle = hero.subtitle || '';
  const heroStats = hero.stats || [];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Video Background */}
        {heroVideo && (/\.(mp4|webm|mov)(\?|$)/i.test(heroVideo) ? (
          <video key={heroVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img src={heroVideo} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ))}
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/80 via-primary/70 to-primary-light/60"></div>
        
        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >

              <h1 className="max-w-[820px] font-heading text-[36px] font-bold uppercase leading-[1.04] tracking-[-1.5px] sm:text-[48px] lg:text-[58px] 2xl:text-[72px] text-white">
                {heroTitle}
              </h1>
              <p className="mt-7 max-w-[600px] text-[16px] leading-relaxed text-white/80 sm:text-[17px]">
                {heroSubtitle}
              </p>
              {hero.ctaLabel && (
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href={hero.ctaHref || '/contact'}>
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block cursor-pointer rounded-[2px] bg-secondary px-7 py-3.5 font-heading text-xs font-semibold tracking-widest text-primary-dark transition-colors hover:bg-secondary-dark"
                    >
                      {hero.ctaLabel}
                    </motion.span>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Stat column - similar to capabilities page */}
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
                    <span className="mt-2 block font-heading text-[11px] uppercase tracking-[2px] text-white/70">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Our Story */}
      {story.enabled !== false && (
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100/50 overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary-light font-semibold text-[15px] md:text-[16px] tracking-[0.25em] uppercase mb-6">{story.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-display font-bold text-primary-dark mb-8 leading-[1.15] tracking-tight max-w-4xl mx-auto">
                {story.heading}
              </h2>
            </motion.div>

            {/* Story Journey with Curved Line - KEEP THIS */}
            <div className="relative my-20 mb-16">
              {/* SVG Curved connecting line flowing through cards */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none" style={{ zIndex: 5 }}>
                <path 
                  d="M 200 250 Q 400 100, 600 200 T 1000 250" 
                  stroke="#7FAF7F" 
                  strokeWidth="3" 
                  fill="none"
                  opacity="0.5"
                  strokeDasharray="8 8"
                />
              </svg>

              <div className="grid md:grid-cols-3 gap-8 relative">
                {(story.timeline || []).map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className={`relative ${index % 2 === 1 ? 'md:-mt-8' : 'md:mt-12'}`}
                  >
                    {/* Number Badge */}
                    <div className="absolute -top-4 left-4 z-20">
                      <div className="w-12 h-12 bg-[#4A6F4A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden pt-10 pb-6 px-6 relative" style={{ zIndex: 10 }}>
                      <div className="mb-4">
                        <h3 className="text-lg font-display font-bold text-[#2C3E2C] mb-2">{stage.title}</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed mb-4">{stage.description}</p>
                      </div>

                      {stage.image && (
                        <div className="relative overflow-hidden rounded-2xl">
                          <img src={stage.image} alt={stage.title} className="w-full h-48 object-cover" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Body Content - ENHANCED TEXT STYLING KEPT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-4xl mx-auto mb-16"
            >
              <div className="space-y-6">
                {/* First paragraph - slightly larger and darker */}
                {story.leadParagraph && (
                  <p className="text-neutral-700 text-[18px] md:text-[19px] leading-[1.75] font-normal">
                    {story.leadParagraph}
                  </p>
                )}

                {/* Supporting paragraphs */}
                {(story.paragraphs || []).map((paragraph, index) => (
                  <p key={index} className="text-neutral-600 text-[16px] leading-[1.8]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      )}

      {/* Vision & Mission - Refined Premium Design */}
      {visionMission.enabled !== false && (
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">

        <div className="container relative z-10">
          <div className="max-w-[1080px] mx-auto px-4">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <p className="text-primary-light font-semibold text-[11px] tracking-[0.25em] uppercase mb-3.5">
                {visionMission.eyebrow}
              </p>
              <h2 className="text-[36px] md:text-[44px] font-display font-bold text-primary-dark leading-[1.1] tracking-tight">
                {visionMission.heading}
              </h2>
            </motion.div>

            {/* Cards Container with Connector */}
            <div className="relative">
              
              {/* Subtle Connector Line */}
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-px z-0">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-primary-light/15"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-light/25"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-7 lg:gap-8 items-stretch relative z-10">

                {/* Vision Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative"
                >
                  <div className="relative h-full min-h-[320px] bg-gradient-to-br from-primary-dark to-[#2C4A2C] rounded-[24px] p-10 md:p-11 overflow-hidden flex flex-col transition-all duration-400 hover:-translate-y-1">

                    {/* Scientific Rings - Bottom Right */}
                    <div className="absolute -bottom-16 -right-16 opacity-[0.10] group-hover:opacity-[0.14] transition-opacity duration-500 pointer-events-none">
                      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                        <circle cx="90" cy="90" r="75" stroke="white" strokeWidth="1.5" fill="none"/>
                        <circle cx="90" cy="90" r="55" stroke="white" strokeWidth="1.5" fill="none"/>
                        <circle cx="90" cy="90" r="35" stroke="white" strokeWidth="1.5" fill="none"/>
                        <circle cx="90" cy="90" r="15" stroke="white" strokeWidth="1.5" fill="none"/>
                        {/* Radiating lines */}
                        <line x1="90" y1="90" x2="40" y2="40" stroke="white" strokeWidth="1" opacity="0.6"/>
                        <line x1="90" y1="90" x2="140" y2="40" stroke="white" strokeWidth="1" opacity="0.6"/>
                        <line x1="90" y1="90" x2="40" y2="140" stroke="white" strokeWidth="1" opacity="0.6"/>
                        <line x1="90" y1="90" x2="140" y2="140" stroke="white" strokeWidth="1" opacity="0.6"/>
                        {/* Small nodes */}
                        <circle cx="40" cy="40" r="3" fill="white" opacity="0.8"/>
                        <circle cx="140" cy="40" r="3" fill="white" opacity="0.8"/>
                        <circle cx="40" cy="140" r="3" fill="white" opacity="0.8"/>
                        <circle cx="140" cy="140" r="3" fill="white" opacity="0.8"/>
                      </svg>
                    </div>

                    {/* Top accent line */}
                    <div className="w-10 h-0.5 bg-primary-light rounded-full mb-8 group-hover:w-[70px] transition-all duration-400"></div>

                    {/* Number with line */}
                    <div className="flex items-center gap-3 mb-7">
                      <p className="text-primary-light/60 text-[13px] font-medium tracking-[0.15em] uppercase">01</p>
                      <div className="w-8 h-px bg-primary-light/30"></div>
                    </div>

                    {/* Heading */}
                    <h3 className="text-[42px] md:text-[44px] font-display font-bold text-white mb-6 leading-[1.05] tracking-tight uppercase">
                      {visionMission.visionLabel}
                    </h3>

                    {/* Body */}
                    <p className="text-white/80 text-[17px] md:text-[18px] leading-[1.7] max-w-[380px]">
                      {visionMission.visionBody}
                    </p>
                  </div>
                </motion.div>

                {/* Mission Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="group relative"
                >
                  <div className="relative h-full min-h-[320px] bg-white border border-neutral-200/80 rounded-[24px] p-10 md:p-11 overflow-hidden flex flex-col shadow-[0_2px_24px_rgba(0,0,0,0.06)] transition-all duration-400 hover:-translate-y-1 hover:border-primary-light/30">

                    {/* Molecular Network - Bottom Right (Never overlaps text) */}
                    <div className="absolute -bottom-12 -right-12 opacity-[0.06] group-hover:opacity-[0.09] transition-opacity duration-500 pointer-events-none">
                      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                        {/* Flowing connected nodes */}
                        <path d="M20 80 Q50 60, 80 80 T140 80" stroke="#4CAF50" strokeWidth="1.5" fill="none"/>
                        <path d="M30 50 Q60 40, 90 55 T130 60" stroke="#4CAF50" strokeWidth="1.5" fill="none"/>
                        <path d="M25 110 Q55 100, 85 110 T135 115" stroke="#4CAF50" strokeWidth="1.5" fill="none"/>
                        
                        {/* Nodes */}
                        <circle cx="20" cy="80" r="4" fill="#4CAF50" opacity="0.8"/>
                        <circle cx="80" cy="80" r="5" fill="#4CAF50" opacity="0.9"/>
                        <circle cx="140" cy="80" r="4" fill="#4CAF50" opacity="0.8"/>
                        
                        <circle cx="30" cy="50" r="3" fill="#4CAF50" opacity="0.7"/>
                        <circle cx="90" cy="55" r="4" fill="#4CAF50" opacity="0.8"/>
                        <circle cx="130" cy="60" r="3" fill="#4CAF50" opacity="0.7"/>
                        
                        <circle cx="25" cy="110" r="3" fill="#4CAF50" opacity="0.7"/>
                        <circle cx="85" cy="110" r="4" fill="#4CAF50" opacity="0.8"/>
                        <circle cx="135" cy="115" r="3" fill="#4CAF50" opacity="0.7"/>
                        
                        {/* Small connecting lines */}
                        <line x1="80" y1="80" x2="90" y2="55" stroke="#4CAF50" strokeWidth="1" opacity="0.5"/>
                        <line x1="80" y1="80" x2="85" y2="110" stroke="#4CAF50" strokeWidth="1" opacity="0.5"/>
                      </svg>
                    </div>

                    {/* Top accent line */}
                    <div className="w-10 h-0.5 bg-primary-light rounded-full mb-8 group-hover:w-[70px] transition-all duration-400"></div>

                    {/* Number with line */}
                    <div className="flex items-center gap-3 mb-7">
                      <p className="text-primary-light/70 text-[13px] font-medium tracking-[0.15em] uppercase">02</p>
                      <div className="w-8 h-px bg-primary-light/30"></div>
                    </div>

                    {/* Heading */}
                    <h3 className="text-[42px] md:text-[44px] font-display font-bold text-primary-dark mb-6 leading-[1.05] tracking-tight uppercase">
                      {visionMission.missionLabel}
                    </h3>

                    {/* Body */}
                    <p className="text-neutral-600 text-[17px] md:text-[18px] leading-[1.7] max-w-[380px]">
                      {visionMission.missionBody}
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>
      )}

      {/* Note from Founders - Premium Editorial Redesign */}
      {founders.enabled !== false && (
      <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fafaf8 0%, #f5f7f5 50%, #fafaf8 100%)' }}>
        
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #4A6F4A 1px, transparent 0)', backgroundSize: '36px 36px' }}></div>
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-primary-light/[0.03] rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-[40%_60%] gap-16 xl:gap-24 items-start">
              
              {/* LEFT SIDE — Emotional Anchor */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative lg:sticky lg:top-32"
              >
                {/* Vertical green accent line */}
                <div className="absolute -left-5 top-0 w-[2.5px] h-40 bg-gradient-to-b from-[#2C3E2C] via-primary-light to-transparent rounded-full"></div>
                
                {/* Eyebrow */}
                <p className="text-primary-light font-semibold text-[14px] md:text-[15px] tracking-[0.18em] uppercase mb-6 leading-relaxed">
                  {founders.eyebrow}
                </p>

                {/* Headline - Primary Anchor */}
                <h3 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display font-bold text-[#2C3E2C] leading-[1.05] tracking-tight mb-8">
                  {founders.heading}
                </h3>
                
                {/* Large decorative quotation mark */}
                <div className="relative">
                  <span className="pointer-events-none text-[110px] md:text-[150px] lg:text-[180px] font-serif font-bold text-primary-light/[0.08] leading-none select-none absolute -top-6 -left-1">
                    "
                  </span>
                </div>
              </motion.div>

              {/* RIGHT SIDE — The Letter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                {/* Opening quotation paragraph */}
                {founders.openingParagraph && (
                  <p className="text-[21px] md:text-[23px] text-neutral-600 font-normal leading-[1.65] mb-8">
                    &ldquo;{founders.openingParagraph}
                  </p>
                )}

                {/* Supporting paragraphs */}
                <div className="space-y-6 text-neutral-600 text-[17px] md:text-[18px] leading-[1.8]">
                  {(founders.paragraphs || []).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {founders.closingLine && (
                    <p className="mt-2">
                      <span className="inline-block border-l-[3px] border-primary-light pl-4 text-neutral-600 font-normal text-[17px] md:text-[18px] leading-[1.8]">
                        {founders.closingLine}&rdquo;
                      </span>
                    </p>
                  )}
                  {(founders.attributionName || founders.attributionTitle) && (
                    <footer className="mt-8 border-t border-neutral-200 pt-5">
                      <p className="font-heading text-[15px] font-bold text-primary-dark">{founders.attributionName}</p>
                      <p className="mt-1 text-[13px] uppercase tracking-[1.5px] text-neutral-500">{founders.attributionTitle}</p>
                    </footer>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      )}

      <CaseStudies />

      {/* Who We Build With - Horizontal Row Style */}
      {audience.enabled !== false && (
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100/50 overflow-hidden">

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto px-4">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <h2 className="text-[40px] md:text-[52px] lg:text-[60px] font-display font-bold text-primary-dark leading-[1.05] tracking-tight mb-5 uppercase">
                {audience.heading}
              </h2>
              <p className="text-neutral-600 text-[16px] md:text-[17px] leading-[1.7] whitespace-nowrap">
                {audience.intro}
              </p>
            </motion.div>

            {/* Row List */}
            <div className="space-y-4">

              {(audience.items || []).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, x: 6, scale: 1.015, boxShadow: '0 12px 40px rgba(31,64,21,0.13)' }}
                  className="group flex items-center bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.05)] cursor-pointer"
                  style={{ transition: 'box-shadow 0.4s ease' }}
                >
                  {/* Left bracket accent */}
                  <div className="w-1.5 self-stretch bg-primary-light/40 group-hover:bg-primary-light rounded-l-2xl flex-shrink-0 transition-all duration-500 group-hover:w-2"></div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 flex-1 px-8 md:px-10 py-7 md:py-8">
                    <h4 className="text-[22px] md:text-[26px] font-display font-bold text-primary-dark uppercase tracking-tight md:w-[300px] flex-shrink-0">
                      {item.title}
                    </h4>
                    <div className="hidden md:block w-px h-8 bg-neutral-200 mx-8 flex-shrink-0"></div>
                    <p className="text-neutral-600 text-[15px] md:text-[16px] leading-[1.6]">
                      {item.description}
                    </p>
                  </div>

                </motion.div>
              ))}

            </div>
          </div>
        </div>
      </section>
      )}

      {/* Slogan Statement — Centered, Prominent */}
      {slogan.enabled !== false && (
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Thin top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/30 to-transparent"></div>
        {/* Thin bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/30 to-transparent"></div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto px-4 overflow-hidden">

            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-display font-bold text-primary-dark uppercase leading-[1.15] tracking-[-1px]">
                {slogan.lineOne}
                <br />
                <span className="text-primary-light">{slogan.lineTwo}</span>
              </p>
            </motion.div>

          </div>
        </div>
      </section>
      )}

      {/* Global Standards - Dark Banner Layout with ZQA Seal */}
      {zqa.enabled !== false && (
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1c2620] via-[#2b3a2c] to-[#3a4b3a]">
        {/* Soft radial highlight */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(127,175,127,0.18),transparent_55%)]"></div>

        <div className="container relative z-10">
          <div className="py-16 md:py-20 lg:py-28">

            {/* TITLE + SEAL ROW */}
            <div className="flex items-start justify-between gap-8 mb-10 lg:mb-14">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="max-w-[10ch] font-display font-bold uppercase text-[#f5f2e8] leading-[1.02] tracking-[-0.5px] text-[30px] sm:text-[38px] md:text-[46px] lg:text-[56px]">
                  {zqa.eyebrow || 'Global Standards'}
                </h2>
              </motion.div>

              {/* ZQA Seal - Stamp-press animation (matches cosmetics hero) */}
              <motion.div
                initial={{ opacity: 0, scale: 2.5, rotate: -24, filter: 'blur(4px)' }}
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
                className="relative shrink-0"
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
                  src={zqa.sealImage || '/zqa/seal5.png'}
                  alt="ZQA Seal"
                  draggable={false}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 select-none object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
                />
              </motion.div>
            </div>

            {/* DESCRIPTION - full width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="space-y-4 text-[#e6e9df]/85 text-[15px] md:text-[16px] leading-[1.8]">
                {(zqa.paragraphs || []).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {zqa.ctaLabel && (
                <Link
                  href={zqa.ctaHref || '/capabilities'}
                  className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full border border-[#f5f2e8]/40 text-[#f5f2e8] font-semibold text-[13px] tracking-[0.15em] uppercase group hover:bg-[#f5f2e8]/10 hover:border-[#f5f2e8]/70 transition-all duration-300"
                >
                  {zqa.ctaLabel}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}

              {/* Proof Points */}
              {(zqa.proofPoints || []).length > 0 && (
                <div className="mt-10 pt-6 border-t border-[#f5f2e8]/15">
                  <p className="text-sm text-[#e6e9df]/60 tracking-wide">
                    {zqa.proofPoints.map((point, index) => (
                      <span key={index}>
                        {index > 0 && <span className="mx-2 text-[#f5f2e8]/25">•</span>}
                        <span className="text-primary-light font-semibold">{point}</span>
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* Certifications Grid */}
      {certsSection.enabled !== false && certifications.length > 0 && (
      <section className="section-py bg-neutral-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-dark mb-4">
              {certsSection.heading}
            </h2>
          </motion.div>

          {/* Scrolling Certification Carousel */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-neutral-100 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-neutral-100 to-transparent" />
            <div className="flex w-max animate-cert-scroll items-center gap-5 py-3">
              {[...certifications, ...certifications].map((cert, i) => (
                <div
                  key={i}
                  className="inline-flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-primary-light/20 bg-white px-6 py-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-light/50 hover:shadow-md"
                  style={{ minWidth: '110px', minHeight: '88px' }}
                >
                  {cert.logo ? (
                    <img src={cert.logo} alt={cert.label} className="h-10 w-auto max-w-[80px] object-contain" />
                  ) : (
                    <span className="flex h-10 items-center font-heading text-[15px] font-bold tracking-[-0.5px] text-primary-dark">{cert.label}</span>
                  )}
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[1px] text-neutral-400">{cert.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Sustainability */}
      {sustainability.enabled !== false && (
      <section className="section-py bg-primary-dark text-white">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl text-left"
              >
                <p className="mb-4 font-medium text-primary-light">{sustainability.eyebrow}</p>
                <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl">{sustainability.heading}</h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-6 max-w-3xl space-y-4 text-left text-neutral-300"
              >
                {(sustainability.paragraphs || []).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl"
            >
              <img
                src={sustainabilityImage}
                alt="Sustainability at Zeovus Life"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* Beyond Manufacturing */}
      {socialImpact.enabled !== false && (
      <section className="section-py bg-[#f5f9f6]">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl text-left"
              >
                <p className="mb-4 font-medium text-primary-light">{socialImpact.eyebrow}</p>
                <h2 className="mb-6 font-display text-3xl font-bold text-primary-dark md:text-4xl">
                  {socialImpact.heading}
                </h2>
                <p className="mb-10 text-neutral-600">{socialImpact.intro}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="max-w-2xl"
              >
                <div className="grid grid-cols-3 gap-3 sm:gap-6">
                  {(socialImpact.pillars || []).map((pillar, index) => (
                    <div key={index} className="text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/15 sm:h-14 sm:w-14">
                        <ContentIcon name={pillar.icon} className="h-5 w-5 text-secondary sm:h-6 sm:w-6" />
                      </div>
                      <p className="text-[12px] font-medium text-primary-dark sm:text-sm">{pillar.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-primary-dark/10 bg-white shadow-xl"
            >
              <img
                src={socialImpactImage}
                alt="Social impact at Zeovus Life"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      )}

    </div>
  );
}