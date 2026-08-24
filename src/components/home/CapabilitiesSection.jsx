'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lightbulb, Beaker, Shield } from 'lucide-react';

export default function CapabilitiesSection() {
  return (
    <section className="bg-primary-dark py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 font-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[-1px] sm:text-[42px]">
              Formulation science, proven at manufacturing scale.
            </h2>
            <p className="mb-8 text-[15px] leading-relaxed text-neutral-300 sm:text-[16px]">
              Formulation R&D and manufacturing run under one roof at Zeovus Life.
              Every formula is developed and refined by our team before it reaches
              the production line.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <Lightbulb className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="mb-1 font-heading text-[15px] font-semibold">
                    In-House Formulation R&D
                  </h4>
                  <p className="text-[13px] text-neutral-400">
                    Every formula is developed and refined by our team before it
                    reaches the production line.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <Beaker className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="mb-1 font-heading text-[15px] font-semibold">
                    Pilot-to-Commercial Manufacturing
                  </h4>
                  <p className="text-[13px] text-neutral-400">
                    From small-batch trials to full commercial runs, without
                    re-engineering the formula.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="mb-1 font-heading text-[15px] font-semibold">
                    Certified Quality on Every Batch
                  </h4>
                  <p className="text-[13px] text-neutral-400">
                    Every line operates under certified quality systems, audited
                    to international benchmarks.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/capabilities"
              className="mt-8 inline-flex items-center gap-2 font-heading text-[14px] font-medium uppercase tracking-[1px] text-secondary transition-all hover:gap-3"
            >
              Explore Manufacturing & Research
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video overflow-hidden rounded-[4px]">
              <video
                src="https://res.cloudinary.com/ac74hfe9/video/upload/v1787608635/Formulation-science.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
