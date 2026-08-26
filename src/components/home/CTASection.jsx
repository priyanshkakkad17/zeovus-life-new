'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary-dark py-20 text-white sm:py-26 lg:py-30">
      {/* Subtle radial glow — atmospheric depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 110%, rgba(21,168,89,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Geometric accent — top right */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border border-white/[0.03]" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full border border-white/[0.02]" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center lg:flex-row lg:items-end lg:justify-between lg:gap-16">

          {/* Left: Headline block — editorial weight on the left */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 max-w-[640px] text-center lg:mb-0 lg:text-left"
          >
            <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[3px] text-secondary/60">
              Let's build together
            </p>
            <h2 className="mb-5 font-heading text-[32px] font-bold uppercase leading-[1.02] tracking-[-1px] sm:text-[40px] lg:text-[46px]">
              Ready to bring your
              <br className="hidden sm:block" />{' '}
              vision to life?
            </h2>
            <p className="max-w-[480px] text-[15px] leading-relaxed text-neutral-300 sm:text-[16px] lg:mx-0 mx-auto">
              Tell us what you're building. We'll help you bring high-quality wellness
              products to market — from concept to shelf.
            </p>
          </motion.div>

          {/* Right: CTAs — stacked vertically for emphasis */}
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
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </motion.span>
            </Link>
            <Link href="/capabilities">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex cursor-pointer items-center gap-3 rounded-[3px] border border-white/20 bg-white/[0.04] px-7 py-4 font-heading text-[12px] font-semibold uppercase tracking-[1.5px] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08] sm:px-8"
              >
                Learn More
                <svg
                  className="h-4 w-4 opacity-50"
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
              </motion.span>
            </Link>
          </motion.div>

        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex items-center justify-center gap-6 border-t border-white/[0.06] pt-8 sm:justify-start"
        >
          <span className="text-[12px] tracking-[0.5px] text-neutral-500">
            Trusted by brands across 12+ countries
          </span>
          <div className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
          <span className="hidden text-[12px] tracking-[0.5px] text-neutral-500 sm:block">
            GMP · ISO · HACCP Certified
          </span>
        </motion.div>
      </div>
    </section>
  );
}
