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
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Built to be trusted with wellness.
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              Leading B2B nutraceutical and cosmetic manufacturer with decades of expertise in formulation science and manufacturing excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary-light font-medium mb-4">OUR PURPOSE</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-6">
                To make everyday wellness products accessible, trusted and affordable.
              </h2>
              <p className="text-neutral-600 text-lg">
                We help brands bring high-quality nutrition, wellness and personal care products to market through thoughtful formulations, reliable sourcing and manufacturing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-py bg-neutral-100">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary-light font-medium mb-4">OUR STORY</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-6">
                Bridging Ancient Wisdom with Modern Innovation
              </h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  Zeovus began with a mission to share India's rich heritage of botanical wellness with the world while embracing cutting-edge nutraceutical science. Today, we stand as one of India's premier B2B supplement manufacturers, trusted by our distributors and importers.
                </p>
                <p>
                  That trust starts with leadership, over two decades spent inside supplier facilities, regulatory reviews, and formulation rooms across the globe. It's that same judgment that runs every formulation and every batch at Zeovus Life.
                </p>
                <p>
                  What sets us apart is our unique position: we combine India's cost-effective, high-quality manufacturing with a deep understanding of nutraceutical supplements at the molecular level and their synergy, backed by experienced international regulatory expertise.
                </p>
                <p>
                  Zeovus Life is part of the wider Zeovus Group, alongside Food and Vet, three categories, one standard. The same supplier relationships built over years, and the same formulation philosophy held, regardless of the category they're applied to.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
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
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                    <p className="text-neutral-700">Decades of leadership expertise in pharmaceuticals and nutraceuticals</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                    <p className="text-neutral-700">One standard, held across Food, Life and Vet</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                    <p className="text-neutral-700">Supplier relationships built over years</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-100 p-8 rounded-2xl"
            >
              <div className="w-12 h-12 bg-primary-light/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-primary-dark mb-4">Vision</h3>
              <p className="text-neutral-600">
                To make everyday wellness products accessible, trusted and affordable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-100 p-8 rounded-2xl"
            >
              <div className="w-12 h-12 bg-primary-light/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-primary-dark mb-4">Mission</h3>
              <p className="text-neutral-600">
                To help brands bring high-quality nutrition, wellness and personal care products to market through thoughtful formulations, reliable sourcing and manufacturing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Build With */}
      <section className="section-py bg-neutral-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-4">
              Who We Build With
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We work with businesses looking for reliable products, strong formulations and a partner they can grow with.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeBuildWith.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl"
              >
                <div className="w-12 h-12 bg-primary-light/10 rounded-xl flex items-center justify-center mb-4 text-primary-light">
                  {item.icon}
                </div>
                <h4 className="font-display font-semibold text-lg text-primary-dark mb-2">{item.title}</h4>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Standards */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary-light font-medium mb-4">GLOBAL STANDARDS</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-6">
                Zeovus Quality Assurance (ZQA) is the standard. Everything else is proof of it.
              </h2>
              <div className="space-y-6 text-neutral-600">
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
              <Link href="/capabilities" className="inline-flex items-center gap-2 mt-6 text-primary-light font-medium hover:gap-3 transition-all">
                View our Standards
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-primary-dark shadow-sm"
              >
                {cert}
              </span>
            ))}
          </motion.div>
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

      {/* Note from Founders */}
      <section className="section-py bg-neutral-100">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <p className="text-primary-light font-medium mb-6">A NOTE FROM THE PEOPLE BEHIND ZEOVUS LIFE</p>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-dark mb-6">
                Built to do it right.
              </h3>
              <blockquote className="text-lg text-neutral-600 italic mb-6">
                "We started Zeovus Life because we believed great wellness products should be accessible to more people, without compromising on quality.
                <br /><br />
                We've spent years working with ingredients, formulations and manufacturing partners, learning that the small things matter: where an ingredient comes from, how it is tested, how a product is made, and what finally goes into the bottle.
                <br /><br />
                We don't make products just to fill a shelf. We work with brands to build supplements and cosmetics that are well formulated, responsibly sourced and made to the standards they deserve.
                <br /><br />
                That's what Zeovus Life is here to do."
              </blockquote>
              <p className="text-center text-neutral-500">
                If your business runs on trust, we're already built for it.
              </p>
            </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Want to know how we take a formulation from lab to your shelf?
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/contact" className="btn-primary bg-secondary text-primary-dark hover:bg-secondary-dark">
                Request a Quote
              </Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Enquire About Private Label
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}