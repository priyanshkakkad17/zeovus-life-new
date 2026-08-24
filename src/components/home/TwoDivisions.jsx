'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Heart } from 'lucide-react';

export default function TwoDivisions() {
  return (
    <section className="relative overflow-hidden bg-[#f5f9f6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[42px] md:text-[52px]">
            Two ways we care for you.
          </h2>
          <p className="mx-auto max-w-3xl text-[15px] leading-relaxed text-neutral-600 sm:text-[16px] md:text-[18px]">
            Two disciplines, one process: formulated against the evidence, tested
            to the same protocols, manufactured on lines that answer to the same
            certifications.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Nutraceuticals Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative overflow-hidden rounded-[4px]"
          >
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
              }}
            />
            <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-4 font-heading text-[28px] font-bold uppercase tracking-[-0.5px] text-white sm:text-[32px] md:text-[36px]">
                Nutraceuticals
              </h3>
              <p className="mb-2 text-[20px] font-medium text-white/80 sm:text-[22px]">
                Formulated to be felt.
              </p>
              <p className="mb-6 text-[15px] leading-relaxed text-neutral-300 sm:text-[16px]">
                Immunity, sleep, joints, heart — formulated by life stage, dosed
                for what the body can absorb.
              </p>
              <Link
                href="/nutraceuticals"
                className="inline-flex items-center gap-2 font-heading text-[14px] font-medium uppercase tracking-[1px] text-white transition-all hover:gap-3"
              >
                Explore Nutraceuticals
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Cosmetics Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative overflow-hidden rounded-[4px]"
          >
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',
              }}
            />
            <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-4 font-heading text-[28px] font-bold uppercase tracking-[-0.5px] text-white sm:text-[32px] md:text-[36px]">
                Cosmetics
              </h3>
              <p className="mb-2 text-[20px] font-medium text-white/80 sm:text-[22px]">
                Formulated to be seen.
              </p>
              <p className="mb-6 text-[15px] leading-relaxed text-neutral-300 sm:text-[16px]">
                Skincare and haircare, formulated clean-label first and reviewed
                for how they perform on skin.
              </p>
              <Link
                href="/cosmetics"
                className="inline-flex items-center gap-2 font-heading text-[14px] font-medium uppercase tracking-[1px] text-white transition-all hover:gap-3"
              >
                Explore Cosmetics
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}