'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20">
      {/* Background Pattern/Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg, 
              var(--color-primary-dark) 0%, 
              var(--color-primary) 35%, 
              var(--color-primary-light) 100%
            )
          `,
        }}
      >
        {/* Animated overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-64 w-64 animate-pulse rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 animate-pulse rounded-full bg-secondary blur-3xl animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent blur-3xl animation-delay-4000" />
        </div>
      </div>

      {/* Dark overlay for text contrast */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(31, 64, 21, 0.78) 0%,
              rgba(31, 64, 21, 0.60) 24%,
              rgba(31, 64, 21, 0.30) 46%,
              rgba(31, 64, 21, 0.08) 65%,
              rgba(31, 64, 21, 0) 100%
            ),
            linear-gradient(
              180deg,
              rgba(31, 64, 21, 0.04) 0%,
              rgba(31, 64, 21, 0.08) 55%,
              rgba(31, 64, 21, 0.26) 100%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1800px]">
        <motion.div
          className="max-w-[900px]"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-heading text-[42px] font-black uppercase leading-[0.9] tracking-[-2px] sm:text-[58px] md:text-[72px] lg:text-[88px]">
            <motion.span
              variants={item}
              className="block text-[#f7f2e6]"
              style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.18)' }}
            >
              Wellness,
            </motion.span>

            <motion.span
              variants={item}
              className="block text-[#f7f2e6]"
              style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.22)' }}
            >
              Inside & Outside.
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[600px] text-[16px] leading-relaxed text-[#e8f5ed]/90 sm:text-[18px] md:text-[20px]"
            style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.15)' }}
          >
            Trusted B2B nutraceutical and cosmetic manufacturer. Formulated to
            deliver, built to scale.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link href="/nutraceuticals">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block cursor-pointer rounded-[2px] bg-[#9CCD62] px-6 py-3 text-xs font-semibold tracking-widest text-[#1F4015] transition-colors hover:bg-[#B4BD62] sm:px-8 sm:py-4 sm:text-sm"
              >
                EXPLORE NUTRACEUTICALS
              </motion.span>
            </Link>

            <Link href="/cosmetics">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block cursor-pointer rounded-[2px] border border-[#e8f5ed]/50 bg-[#e8f5ed]/10 px-6 py-3 text-xs font-semibold tracking-widest text-[#e8f5ed] backdrop-blur-sm transition-colors hover:bg-[#e8f5ed]/20 sm:px-8 sm:py-4 sm:text-sm"
              >
                EXPLORE COSMETICS
              </motion.span>
            </Link>

            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block cursor-pointer rounded-[2px] bg-[#FFD374] px-6 py-3 text-xs font-semibold tracking-widest text-[#1F4015] transition-colors hover:bg-[#FFEF98] sm:px-8 sm:py-4 sm:text-sm"
              >
                ENQUIRE NOW
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}