'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState('innovation');

  const certifications = [
    'GMP', 'ISO', 'HACCP', 'FSSC 22000', 'BRCGS', 'IFS', 'FDA', 
    'ISO 22716', 'COSMOS', 'HALAL', 'KOSHER', 'ORGANIC', 
    'NON-GMO', 'REACH', 'NSF', 'LEAPING BUNNY', 'VEGAN'
  ];

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
    {
      step: 1,
      title: 'Consultation',
      description: 'Goal, audience and format. We start by understanding what the product needs to do, who it\'s for, and what format is to be built.'
    },
    {
      step: 2,
      title: 'Formulation',
      description: 'In-house R&D builds an evidence-based formula with particle engineering when standard raw materials won\'t do the job.'
    },
    {
      step: 3,
      title: 'Ingredient Selection',
      description: 'Choosing which ingredients and forms meet our potency and bioavailability standards.'
    },
    {
      step: 4,
      title: 'PO & Kickoff',
      description: 'Production begins once the order is confirmed. Procurement, scheduling and production planning all start at the same time.'
    },
    {
      step: 5,
      title: 'Procurement',
      description: 'Ordering and shipping the ingredients chosen, including made-to-order and temperature-sensitive actives.'
    },
    {
      step: 6,
      title: 'Manufacturing',
      description: 'The production run itself, across the chosen format — granulating, encapsulating, or emulsifying.'
    },
    {
      step: 7,
      title: 'QC & Testing',
      description: 'Every batch is tested against the original formula and for long-term stability, through ZQA.'
    },
    {
      step: 8,
      title: 'Packaging & Delivery',
      description: 'The final step is labelling, packaging and shipping the finished product ready for shelf.'
    },
  ];

  const capabilityStrips = [
    'Formulation and regulatory science developed together, not sequentially',
    'Pilot-batch validation before every scale-up',
    'Continuous evaluation of next-generation delivery technology',
    'Multiple production lines running in parallel across both divisions',
    'Pilot-to-commercial scale-up without changing manufacturing partners',
    'GMP-certified, allergen-controlled, machine-vision quality control',
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
              Proven in research. Built to scale.
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mb-4">
              Trusted by nutraceutical and cosmetic brands across the global markets to turn formulations into shelf-ready, certified products.
            </p>
            <p className="text-lg text-white/60 max-w-2xl">
              Whether you're launching your first product or scaling an established line, Zeovus Life brings the formulation expertise, manufacturing capacity and regulatory know-how to get it right.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-neutral-100 sticky top-[72px] z-40">
        <div className="container">
          <div className="flex">
            <button
              onClick={() => setActiveTab('innovation')}
              className={`flex-1 py-4 px-6 font-medium text-center transition-colors ${
                activeTab === 'innovation'
                  ? 'text-primary-dark border-b-2 border-primary-light'
                  : 'text-neutral-500 hover:text-primary-dark'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Innovation
              </span>
            </button>
            <button
              onClick={() => setActiveTab('manufacturing')}
              className={`flex-1 py-4 px-6 font-medium text-center transition-colors ${
                activeTab === 'manufacturing'
                  ? 'text-primary-dark border-b-2 border-primary-light'
                  : 'text-neutral-500 hover:text-primary-dark'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Manufacturing
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'innovation' && (
          <motion.section
            key="innovation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="section-py bg-white"
          >
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-6">
                    Where formulation science meets real-world performance.
                  </h2>
                  <p className="text-neutral-600 text-lg mb-8">
                    Zeovus Life's in-house formulation team is adept at turning ideas into expertly formulated nutraceutical and cosmetic products. We specialise in custom formulation across gummies, softgels and tablets, alongside serums, lotions and other topical formats, each developed with the same clinical rigour, whatever the format.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-neutral-100 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-display font-semibold text-primary-dark mb-4">
                      Formulation Design & Delivery Science
                    </h3>
                    <ul className="space-y-3 text-neutral-600">
                      <li className="flex gap-3">
                        <span className="text-primary-light">✓</span>
                        <span>In-house formulation team working from clinical literature</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary-light">✓</span>
                        <span>Liposomal, nanoemulsion and microencapsulation systems</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary-light">✓</span>
                        <span>Biomimetic emulsion design and sensory/texture optimisation</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary-light">✓</span>
                        <span>Continuous evaluation of next-gen actives</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-neutral-100 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-display font-semibold text-primary-dark mb-4">
                      Testing & Validation
                    </h3>
                    <ul className="space-y-3 text-neutral-600">
                      <li className="flex gap-3">
                        <span className="text-primary-light">✓</span>
                        <span>Compatibility and accelerated-ageing studies</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary-light">✓</span>
                        <span>Particle size and encapsulation efficiency testing</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary-light">✓</span>
                        <span>Pilot-batch trials before any scale-up</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary-light">✓</span>
                        <span>Release-profile testing at every stage</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-primary-dark text-white rounded-xl p-6 mt-8"
                >
                  <h3 className="text-xl font-display font-semibold mb-4">Regulatory Science</h3>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex gap-3">
                      <span className="text-secondary">✓</span>
                      <span>Formulated in line with global compliance frameworks</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary">✓</span>
                      <span>Every claim backed by measurable, label-ready specificity</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary">✓</span>
                      <span>Built to meet the requirements of its target market</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Capability Strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-12"
                >
                  <div className="flex flex-wrap justify-center gap-4">
                    {capabilityStrips.slice(0, 3).map((item, index) => (
                      <span key={index} className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'manufacturing' && (
          <motion.section
            key="manufacturing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="section-py bg-white"
          >
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-6">
                    Manufacturing built for every format, at scale.
                  </h2>
                  <p className="text-neutral-600 text-lg mb-8">
                    Zeovus Life manufactures nutraceuticals and cosmetics across every major format on the market today — from hard-shell and softgel capsules to gummies, oral dissolving strips and transdermal patches; from creams and serums to soaps and sun care — inside GMP, ISO- and HACCP-certified, allergen-controlled facilities, with capacity that scales from first sample to full commercial volume without ever changing partners.
                  </p>
                </motion.div>

                {/* Nutraceutical Formats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-display font-semibold text-primary-dark mb-6">Nutraceutical Formats</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {nutraceuticalFormats.map((format, index) => (
                      <div key={index} className="bg-neutral-100 rounded-lg p-4 hover:bg-primary-light/10 transition-colors">
                        <h4 className="font-semibold text-primary-dark mb-1">{format.name}</h4>
                        <p className="text-sm text-neutral-600">{format.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/nutraceuticals" className="inline-flex items-center gap-2 mt-4 text-primary-light font-medium hover:gap-3 transition-all">
                    Explore Nutraceuticals
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Cosmetics Formats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-display font-semibold text-primary-dark mb-6">Cosmetics Formats</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cosmeticsFormats.map((format, index) => (
                      <div key={index} className="bg-neutral-100 rounded-lg p-4 hover:bg-primary-light/10 transition-colors">
                        <h4 className="font-semibold text-primary-dark mb-1">{format.name}</h4>
                        <p className="text-sm text-neutral-600">{format.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/cosmetics" className="inline-flex items-center gap-2 mt-4 text-primary-light font-medium hover:gap-3 transition-all">
                    Explore Cosmetics
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Certifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-neutral-100 rounded-xl p-6 mb-8"
                >
                  <h3 className="text-xl font-display font-semibold text-primary-dark mb-4">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                      <span key={cert} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-primary-dark">
                        {cert}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Capability Strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-wrap justify-center gap-4">
                    {capabilityStrips.slice(3).map((item, index) => (
                      <span key={index} className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* How We Work */}
      <section className="section-py bg-neutral-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-4">
              From brief to shelf, in eight steps.
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our streamlined process ensures every product gets the attention it deserves.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 card-hover"
              >
                <div className="w-10 h-10 bg-primary-light/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary-light font-bold">{item.step}</span>
                </div>
                <h4 className="font-semibold text-primary-dark mb-2">{item.title}</h4>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </motion.div>
            ))}
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
              Bring us a formulation brief or bring us a problem.
            </h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              We'll work with you to develop the right formulation and bring it to market.
            </p>
            <Link href="/contact" className="btn-primary bg-secondary text-primary-dark hover:bg-secondary-dark">
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}