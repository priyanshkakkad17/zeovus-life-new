'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const products = [
  { name: 'Omega-3 EPA + DHA', benefit: 'Cardiovascular support', category: 'Heart', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787775498/IMG-20260207-WA0017.jpg' },
  { name: 'CoQ10 100mg', benefit: 'Cellular energy production', category: 'Energy' },
  { name: 'Collagen Peptides', benefit: 'Skin elasticity & joint mobility', category: 'Beauty' },
  { name: 'Probiotic 50B CFU', benefit: 'Gut microbiome balance', category: 'Gut' },
  { name: 'Vitamin D3 5000 IU', benefit: 'Bone density & immune regulation', category: 'Immunity' },
  { name: 'Multivitamin Complete', benefit: 'Daily nutritional coverage', category: 'Daily' },
];

export default function PortfolioHighlights() {
  return (
    <section className="bg-white py-20 sm:py-26 lg:py-30">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* Header — left-aligned for editorial feel */}
        <div className="mb-16 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[640px]"
          >
            <p className="mb-3 font-heading text-[12px] font-bold uppercase tracking-[2.5px] text-primary-light">
              What we formulate
            </p>
            <h2 className="font-heading text-[32px] font-bold uppercase leading-[1.02] tracking-[-1px] text-primary-dark sm:text-[42px] lg:text-[48px]">
              Portfolio Highlights
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[380px]"
          >
            <p className="text-[15px] leading-relaxed text-neutral-600">
              Proven formulations across categories, backed by science and
              manufactured to global standards.
            </p>
          </motion.div>
        </div>

        {/* Editorial grid — asymmetric sizing */}
        <div className="grid grid-cols-1 gap-px overflow-hidden bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative bg-white transition-colors duration-500 hover:bg-[#f5f9f6] ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }`}
            >
              <div className={`flex h-full flex-col justify-between p-7 sm:p-8 lg:p-10 ${
                index === 0 ? 'lg:py-14' : ''
              }`}>
                {/* Top: category + index */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[2px] text-neutral-400">
                    {item.category}
                  </span>
                  <span className="font-heading text-[11px] font-medium tabular-nums text-neutral-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Middle: product info */}
                <div className="flex-1">
                  {item.image && (
                    <div className={`mb-5 overflow-hidden rounded-[4px] bg-neutral-50 ${
                      index === 0 ? 'h-[140px] lg:h-[180px]' : 'h-[100px]'
                    }`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-3"
                      />
                    </div>
                  )}
                  <h3 className={`mb-3 font-heading font-semibold text-primary-dark ${
                    index === 0
                      ? 'text-[22px] sm:text-[24px] lg:text-[28px]'
                      : 'text-[18px] sm:text-[20px]'
                  }`}>
                    {item.name}
                  </h3>
                  <p className={`text-neutral-600 leading-relaxed ${
                    index === 0 ? 'text-[15px] max-w-[320px]' : 'text-[14px]'
                  }`}>
                    {item.benefit}
                  </p>
                </div>

                {/* Bottom: CTA */}
                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <button className="group/btn flex items-center gap-2 font-heading text-[12px] font-medium uppercase tracking-[1px] text-primary-light transition-all duration-300">
                    <span>Request Sheet</span>
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Hover accent line — left edge */}
                <div className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-primary-light transition-transform duration-500 ease-out-quint group-hover:scale-y-100" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex items-center justify-between border-t border-neutral-100 pt-8"
        >
          <p className="font-heading text-[12px] font-medium uppercase tracking-[1.5px] text-neutral-400">
            {products.length} formulations shown
          </p>
          <Link
            href="/nutraceuticals"
            className="group inline-flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-primary-dark transition-colors duration-300 hover:text-primary-light"
          >
            <span className="relative">
              View Full Portfolio
              <span className="absolute -bottom-px left-0 h-px w-0 bg-primary-light transition-all duration-400 group-hover:w-full" />
            </span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
