'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function OurCompany() {
  const certifications = [
    'GMP', 'ISO', 'HACCP', 'FSSC 22000', 'BRCGS', 'IFS', 'FDA', 
    'ISO 22716', 'COSMOS', 'HALAL', 'KOSHER', 'ORGANIC', 
    'NON-GMO', 'REACH', 'NSF', 'LEAPING BUNNY', 'VEGAN'
  ];

  const whoWeBuildWith = [
    {
      title: 'Retailers',
      description: 'Need reliable products that keep your shelves moving.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Distributors',
      description: 'Need consistent products you can take to new markets.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Private Label Brands',
      description: 'Need quality products built for your brand.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      title: 'Emerging & D2C Brands',
      description: 'Need the right partner to turn ideas into products.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/ac74hfe9/video/upload/v1787608494/ourCompanyHero.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/80 via-primary/70 to-primary-light/60"></div>
        
        <div className="container relative z-10 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Built to be trusted with wellness.
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Leading B2B nutraceutical and cosmetic manufacturer with decades of expertise in formulation science and manufacturing excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-neutral-50 via-white to-neutral-50/30 overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-light/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-3xl"></div>
        
        {/* Subtle organic line decoration */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent"></div>
        <div className="absolute bottom-1/3 right-0 w-40 h-px bg-gradient-to-l from-transparent via-primary-light/20 to-transparent"></div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center max-w-7xl mx-auto">
            {/* Image on LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative lg:pr-4 order-2 lg:order-1"
            >
              {/* Subtle accent decoration behind image */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-primary-light/10 rounded-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-secondary/5 rounded-full blur-xl"></div>
              
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/ac74hfe9/image/upload/v1787701789/our_purpose.png"
                  alt="Ingredient macro photography"
                  className="w-full h-auto rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative z-10"
                />
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 rounded-[20px] ring-1 ring-black/5 z-20 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Text on RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:pl-8 order-1 lg:order-2"
            >
              <p className="text-primary-light font-semibold text-[15px] md:text-[16px] tracking-[0.25em] uppercase mb-6">OUR PURPOSE</p>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-display font-bold text-primary-dark mb-8 leading-[1.15] tracking-tight">
                To make everyday wellness products accessible, trusted and affordable.
              </h2>
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed font-light">
                We help brands bring high-quality nutrition, wellness and personal care products to market through thoughtful formulations, reliable sourcing and manufacturing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
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
              <p className="text-primary-light font-semibold text-[15px] md:text-[16px] tracking-[0.25em] uppercase mb-6">OUR STORY</p>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-display font-bold text-primary-dark mb-8 leading-[1.15] tracking-tight max-w-4xl mx-auto">
                Bridging Ancient Wisdom with Modern Innovation
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
                {/* Stage 01 - It started with Food */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative md:mt-12"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-4 z-20">
                    <div className="w-12 h-12 bg-[#4A6F4A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      01
                    </div>
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden pt-10 pb-6 px-6 relative" style={{ zIndex: 10 }}>
                    <div className="mb-4">
                      <h3 className="text-lg font-display font-bold text-[#2C3E2C] mb-2">It started with Food</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                        Natural ingredients and botanical foundations.
                      </p>
                    </div>
                    
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src="https://res.cloudinary.com/ac74hfe9/image/upload/v1787610358/our_story_1_1.png"
                        alt="It started with Food"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Stage 02 - The standard extended to Life - ELEVATED */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative md:-mt-8"
                >
                  <div className="absolute -top-4 left-4 z-20">
                    <div className="w-12 h-12 bg-[#4A6F4A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      02
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden pt-10 pb-6 px-6 relative" style={{ zIndex: 10 }}>
                    <div className="mb-4">
                      <h3 className="text-lg font-display font-bold text-[#2C3E2C] mb-2">The standard extended to Life</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                        Scientific formulation and nutraceutical excellence.
                      </p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src="https://res.cloudinary.com/ac74hfe9/image/upload/v1787610313/our_story_2.png"
                        alt="The standard extended to Life"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Stage 03 - Today: Global Manufacturing */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative md:mt-12"
                >
                  <div className="absolute -top-4 left-4 z-20">
                    <div className="w-12 h-12 bg-[#4A6F4A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      03
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden pt-10 pb-6 px-6 relative" style={{ zIndex: 10 }}>
                    <div className="mb-4">
                      <h3 className="text-lg font-display font-bold text-[#2C3E2C] mb-2">Today: Global Manufacturing</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                        Manufacturing and formulation across categories, exporting globally.
                      </p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src="https://res.cloudinary.com/ac74hfe9/image/upload/v1787610312/our_story_3.png"
                        alt="Today: Global Manufacturing"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
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
                <p className="text-neutral-700 text-[18px] md:text-[19px] leading-[1.75] font-normal">
                  Zeovus began with a mission to share <span className="text-primary-light font-medium">India's rich heritage of botanical wellness</span> with the world while embracing <span className="text-primary-light font-medium">cutting-edge nutraceutical science</span>. Today, we stand as one of India's <span className="text-primary-light font-medium">premier B2B supplement manufacturers</span>, trusted by our distributors and importers.
                </p>
                
                {/* Supporting paragraphs */}
                <p className="text-neutral-600 text-[16px] leading-[1.8]">
                  That trust starts with leadership, over two decades spent inside supplier facilities, regulatory reviews, and formulation rooms across the globe. It's that same judgment that runs every formulation and every batch at Zeovus Life.
                </p>
                <p className="text-neutral-600 text-[16px] leading-[1.8]">
                  What sets us apart is our unique position: we combine India's cost-effective, high-quality manufacturing with a deep understanding of nutraceutical supplements at the molecular level and their synergy, backed by experienced <span className="text-primary-light font-medium">international regulatory expertise</span>.
                </p>
                <p className="text-neutral-600 text-[16px] leading-[1.8]">
                  Zeovus Life is part of the wider Zeovus Group, alongside Food and Vet, three categories, <span className="text-primary-light font-medium">one standard</span>. The same supplier relationships built over years, and the same formulation philosophy held, regardless of the category they're applied to.
                </p>
              </div>
            </motion.div>

            {/* Statistics & Bullet Points - REVERTED */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-xl text-center shadow-md">
                    <p className="text-3xl font-display font-bold text-primary-light">20+</p>
                    <p className="text-sm text-neutral-600">Years Experience</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl text-center shadow-md">
                    <p className="text-3xl font-display font-bold text-primary-light">268+</p>
                    <p className="text-sm text-neutral-600">Formulations</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl text-center shadow-md">
                    <p className="text-3xl font-display font-bold text-primary-light">50+</p>
                    <p className="text-sm text-neutral-600">Countries</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Bullet Points Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="bg-white p-6 rounded-xl shadow-md h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                      <p className="text-neutral-700 text-sm">Decades of leadership expertise in pharmaceuticals and nutraceuticals</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                      <p className="text-neutral-700 text-sm">One standard, held across Food, Life and Vet</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                      <p className="text-neutral-700 text-sm">Supplier relationships built over years</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Premium Dark Card Style */}
      <section className="relative py-8 md:py-10 bg-gradient-to-br from-[#2C3E2C] via-[#354535] to-[#2C3E2C] overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary-light/[0.05] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-primary-light/[0.03] rounded-full blur-3xl"></div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #7FAF7F 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto px-4">
            
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16"
            >
              <p className="text-primary-light/70 font-semibold text-[11px] tracking-[0.2em] uppercase mb-3">
                WHAT GUIDES US
              </p>
              <h2 className="text-[36px] md:text-[44px] lg:text-[52px] font-display font-bold text-white leading-[1.1] tracking-tight">
                Vision & Mission
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div className="relative bg-[#1a251a]/60 backdrop-blur-sm border border-white/[0.08] rounded-[20px] p-10 md:p-12 lg:p-14 min-h-[280px] flex flex-col overflow-hidden transition-all duration-500 hover:bg-[#1a251a]/80 hover:border-primary-light/20">
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-light/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-[32px] md:text-[36px] lg:text-[40px] font-display font-bold text-white mb-6 leading-[1.1] tracking-tight uppercase">
                      Vision
                    </h3>
                    <p className="text-neutral-300 text-[16px] md:text-[17px] leading-[1.65] max-w-[400px]">
                      To make everyday wellness products accessible, trusted and affordable.
                    </p>
                  </div>
                  
                  {/* Bottom subtle accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="group relative"
              >
                <div className="relative bg-[#1a251a]/60 backdrop-blur-sm border border-white/[0.08] rounded-[20px] p-10 md:p-12 lg:p-14 min-h-[280px] flex flex-col overflow-hidden transition-all duration-500 hover:bg-[#1a251a]/80 hover:border-primary-light/20">
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-light/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-[32px] md:text-[36px] lg:text-[40px] font-display font-bold text-white mb-6 leading-[1.1] tracking-tight uppercase">
                      Mission
                    </h3>
                    <p className="text-neutral-300 text-[16px] md:text-[17px] leading-[1.65] max-w-[400px]">
                      To help brands bring high-quality nutrition, wellness and personal care products to market through thoughtful formulations, reliable sourcing and manufacturing.
                    </p>
                  </div>
                  
                  {/* Bottom subtle accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Build With - Horizontal Row Style */}
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
              <p className="text-primary-light font-semibold text-[11px] tracking-[0.25em] uppercase mb-4">
                WHO WE SERVE
              </p>
              <h2 className="text-[40px] md:text-[52px] lg:text-[60px] font-display font-bold text-primary-dark leading-[1.05] tracking-tight mb-5 uppercase">
                Who We Build With
              </h2>
              <p className="text-neutral-600 text-[16px] md:text-[17px] leading-[1.7] max-w-[640px]">
                We work with businesses looking for reliable products, strong formulations and a partner they can grow with.
              </p>
            </motion.div>

            {/* Row List */}
            <div className="space-y-4">

              {[
                { num: '01', title: 'Retailers', desc: 'Need reliable products that keep your shelves moving.' },
                { num: '02', title: 'Distributors', desc: 'Need consistent products you can take to new markets.' },
                { num: '03', title: 'Private Label Brands', desc: 'Need quality products built for your brand.' },
                { num: '04', title: 'Emerging & D2C Brands', desc: 'Need the right partner to turn ideas into products.' },
              ].map((item, index) => (
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
                      {item.desc}
                    </p>
                  </div>

                  {/* Right number */}
                  <div className="pr-8 md:pr-10 flex-shrink-0">
                    <span className="text-[13px] font-semibold text-neutral-300 tracking-[0.15em]">
                      {item.num}
                    </span>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* Slogan Statement - Editorial Light Style */}
      <section className="relative py-12 md:py-16 bg-white overflow-hidden">
        {/* Thin top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/30 to-transparent"></div>
        {/* Thin bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/30 to-transparent"></div>

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto px-4 overflow-hidden">

            {/* Both lines in one overflow-hidden wrapper so they animate as one block */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-display font-bold text-primary-dark uppercase leading-[1.2] tracking-[-0.5px]">
                If your business runs on trust,{' '}
                <span style={{ WebkitTextStroke: '2px #15A859', color: 'transparent' }} className="whitespace-nowrap">
                  we're already built for it.
                </span>
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Global Standards - Two Column Layout with ZQA Framework */}
      <section className="section-py bg-gradient-to-br from-neutral-50 via-white to-neutral-50/50 relative overflow-hidden">
        {/* Subtle scientific pattern background - left side */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="absolute left-0 top-1/4 w-64 h-64" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="60" stroke="#7FAF7F" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="40" stroke="#7FAF7F" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="20" stroke="#7FAF7F" strokeWidth="0.5"/>
          </svg>
          <svg className="absolute left-1/4 bottom-1/4 w-48 h-48" viewBox="0 0 200 200" fill="none">
            <path d="M100 20 L100 180 M20 100 L180 100" stroke="#7FAF7F" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="30" stroke="#7FAF7F" strokeWidth="0.5"/>
          </svg>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[45%_55%] gap-12 xl:gap-16 items-center">
              
              {/* LEFT SIDE - ZQA Framework Visual */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative max-w-[480px] mx-auto">
                  {/* Framework container */}
                  <div className="relative py-12 px-8">
                    
                    {/* ZQA Seal - Central Focus */}
                    <div className="flex justify-center mb-12">
                      <motion.div
                        initial={{ scale: 0, rotate: -45, opacity: 0 }}
                        whileInView={{ scale: 1, rotate: -8, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 0.3,
                          type: "spring",
                          stiffness: 150,
                          damping: 12
                        }}
                        className="relative"
                      >
                        {/* Subtle glow around seal */}
                        <div className="absolute inset-0 bg-primary-light/10 blur-2xl rounded-full scale-125"></div>
                        <div className="absolute inset-0 border border-primary-light/15 rounded-full scale-110"></div>
                        
                        <img
                          src="/zqa/seal5.png"
                          alt="ZQA Seal"
                          className="w-40 h-40 md:w-48 md:h-48 object-contain relative z-10"
                        />
                      </motion.div>
                    </div>
                    
                    {/* Three Quality Stages - Vertical Flow */}
                    <div className="relative">
                      {/* Connecting vertical line */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-light/40 via-primary-light/30 to-primary-light/40 -translate-x-1/2"></div>
                      
                      <div className="space-y-8">
                        {/* Stage 1: Raw Materials */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="relative"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-1 text-right">
                              <div className="inline-block bg-white border border-primary-light/30 rounded-full px-4 py-2">
                                <p className="text-sm font-medium text-primary-dark">Raw Materials</p>
                              </div>
                            </div>
                            <div className="w-3 h-3 bg-primary-light rounded-full border-2 border-white shadow-sm relative z-10"></div>
                            <div className="flex-1"></div>
                          </div>
                        </motion.div>
                        
                        {/* Stage 2: In-Process Production */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="relative"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-1"></div>
                            <div className="w-3 h-3 bg-primary-light rounded-full border-2 border-white shadow-sm relative z-10"></div>
                            <div className="flex-1">
                              <div className="inline-block bg-white border border-primary-light/30 rounded-full px-4 py-2">
                                <p className="text-sm font-medium text-primary-dark">In-Process</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Stage 3: Finished Goods */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          className="relative"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-1 text-right">
                              <div className="inline-block bg-white border border-primary-light/30 rounded-full px-4 py-2">
                                <p className="text-sm font-medium text-primary-dark">Finished Goods</p>
                              </div>
                            </div>
                            <div className="w-3 h-3 bg-primary-light rounded-full border-2 border-white shadow-sm relative z-10"></div>
                            <div className="flex-1"></div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Quality Check Labels - Around Framework */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mt-12 flex flex-wrap justify-center gap-2"
                    >
                      {['Identity', 'Purity', 'Microbiological Safety', 'Contaminants', 'Stability', 'Packaging'].map((check, index) => (
                        <span
                          key={index}
                          className="inline-block bg-primary-light/5 border border-primary-light/20 rounded-full px-3 py-1 text-xs text-primary-dark/70"
                        >
                          {check}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Subtle Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-neutral-200/40 to-transparent -translate-x-1/2"></div>
              
              {/* RIGHT SIDE - Existing Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-[650px]"
              >
                <p className="text-primary-light font-semibold text-[15px] md:text-[16px] tracking-[0.25em] uppercase mb-5">
                  GLOBAL STANDARDS
                </p>
                <h2 className="text-[36px] md:text-[42px] lg:text-[46px] font-display font-bold text-[#2C3E2C] mb-8 leading-[1.1] tracking-tight">
                  Zeovus Quality Assurance (ZQA) is the standard. Everything else is proof of it.
                </h2>
                <div className="space-y-6 text-neutral-600 text-[17px] md:text-[18px] leading-[1.75]">
                  <p>
                    We manufacture supplements and cosmetics through facilities built to global quality, safety and regulatory standards. Every product is then evaluated through Zeovus Quality Assurance (ZQA), our 12-step quality framework covering 825+ verified and validated parameters.
                  </p>
                  <p>
                    From raw materials to finished products, ZQA uses three layers of checks across incoming materials, in-process production and finished goods — covering identity, purity, microbiological safety, contaminants, stability, packaging and more.
                  </p>
                  <p>
                    Beneath ZQA sit the global standards the industry expects as a baseline — FDA, cGMP, BRCGS, IFS and more. We don't treat them as boxes to check. They're the foundation, ZQA is built upon.
                  </p>
                </div>
                
                <Link 
                  href="/capabilities" 
                  className="inline-flex items-center gap-2 mt-8 text-primary-light font-medium text-[15px] group hover:gap-3 transition-all duration-300"
                >
                  View our Standards
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                {/* Bottom Accent - Proof Points */}
                <div className="mt-12 pt-6 border-t border-neutral-200/60">
                  <p className="text-sm text-neutral-500 tracking-wide">
                    <span className="text-primary-light font-semibold">12-step quality framework</span>
                    <span className="mx-2 text-neutral-300">•</span>
                    <span className="text-primary-light font-semibold">825+ verified and validated parameters</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="section-py bg-neutral-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-dark mb-4">
              Certifications & Compliance
            </h2>
          </motion.div>

          {/* Scrolling Certification Carousel */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-neutral-100 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-neutral-100 to-transparent" />
            <div className="flex w-max animate-cert-scroll items-center gap-5 py-3">
              {[
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
                { label: 'REACH', logo: null },
                { label: 'NSF', logo: null },
                { label: 'LEAPING BUNNY', logo: null },
                { label: 'VEGAN', logo: '/logo/vegan.webp' },
                { label: 'FSSAI', logo: '/logo/fssai.png' },
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
                { label: 'REACH', logo: null },
                { label: 'NSF', logo: null },
                { label: 'LEAPING BUNNY', logo: null },
                { label: 'VEGAN', logo: '/logo/vegan.webp' },
                { label: 'FSSAI', logo: '/logo/fssai.png' },
              ].map((cert, i) => (
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

      {/* Sustainability */}
      <section className="section-py bg-primary-dark text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary-light font-medium mb-4">SUSTAINABILITY</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Committed to the preservation and protection of the global environment.
              </h2>
              <div className="space-y-4 text-neutral-300">
                <p>
                  We manufacture nutraceutical and cosmetic formulations that promote the health and well-being of consumers in an environmentally positive manner.
                </p>
                <p>
                  That commitment starts with our ingredient suppliers — we work with partners who take sourcing, sustainable harvesting and fair trade as seriously as we do. Across our manufacturing operations, we hold ourselves to material and energy practices that reduce our footprint at every stage, from packaging through to production.
                </p>
                <p>
                  Sustainability isn't a claim we make once. It's a standard we hold our suppliers, our facilities and our formulations to — consistently.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-2xl p-8"
            >
              <h3 className="text-xl font-display font-semibold mb-4">Beyond Manufacturing</h3>
              <p className="text-neutral-300 mb-6">
                We commit 1% of our profits to programs supporting child nutrition, education, and stronger communities because the places we source from and the world we manufacture for have always been the same world.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-neutral-400">Child Nutrition</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-sm text-neutral-400">Education</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-neutral-400">Communities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Note from Founders - Premium Editorial Redesign */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fafaf8 0%, #f5f7f5 50%, #fafaf8 100%)' }}>
        
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
                  A NOTE FROM THE PEOPLE<br />BEHIND ZEOVUS LIFE
                </p>
                
                {/* Headline - Primary Anchor */}
                <h3 className="text-[44px] md:text-[52px] lg:text-[56px] font-display font-bold text-[#2C3E2C] leading-[1.05] tracking-tight mb-8">
                  Built to do it right.
                </h3>
                
                {/* Large decorative quotation mark */}
                <div className="relative">
                  <span className="text-[160px] md:text-[180px] font-serif font-bold text-primary-light/[0.08] leading-none select-none absolute -top-8 -left-2">
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
                <p className="text-[21px] md:text-[23px] text-[#2C3E2C] font-medium leading-[1.65] mb-8">
                  "We started Zeovus Life because we believed <span className="text-[#2C3E2C] font-semibold">great wellness products</span> should be accessible to more people, <span className="text-[#2C3E2C] font-semibold">without compromising on quality</span>.
                </p>

                {/* Supporting paragraphs */}
                <div className="space-y-6 text-neutral-600 text-[17px] md:text-[18px] leading-[1.8]">
                  <p>
                    We've spent years working with ingredients, formulations and manufacturing partners, learning that <span className="text-[#3a5a3a] font-medium">the small things matter</span>: where an ingredient comes from, how it is tested, how a product is made, and what finally goes into the bottle.
                  </p>
                  <p>
                    We don't make products just to fill a shelf. We work with brands to build supplements and cosmetics that are well formulated, <span className="text-[#3a5a3a] font-medium">responsibly sourced</span> and <span className="text-[#3a5a3a] font-medium">made to the standards they deserve</span>.
                  </p>
                  <p className="mt-2">
                    <span className="inline-block border-l-[3px] border-primary-light pl-4 text-[#2C3E2C] font-semibold text-[18px] md:text-[19px] leading-[1.6] italic">
                      That's what Zeovus Life is here to do."
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-py bg-primary-dark text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
              Want to know how we take a formulation from lab to your shelf?
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-[15px] bg-[#1a2e1a] text-white border border-white/20 hover:bg-[#243524] transition-all duration-300"
              >
                Request a Quote
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-[15px] bg-transparent text-white border border-white hover:bg-white hover:text-primary-dark transition-all duration-300"
              >
                Enquire About Private Label
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}