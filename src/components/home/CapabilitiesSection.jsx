'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lightbulb, Settings, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: Lightbulb,
    title: 'In-House Formulation R&D',
    body: 'Every formula is developed and refined by our team before it reaches the production line.',
  },
  {
    icon: Settings,
    title: 'Pilot-to-Commercial Manufacturing',
    body: 'From small-batch trials to full commercial runs, without re-engineering the formula.',
  },
  {
    icon: Shield,
    title: 'Certified Quality on Every Batch',
    body: 'Every line operates under certified quality systems, audited to international benchmarks.',
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="bg-primary-dark py-20 text-white sm:py-26 lg:py-30">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">

          {/* LEFT — Text content (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[40%] lg:flex-shrink-0 lg:py-6"
          >
            <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[3px] text-secondary/70">
              Manufacturing & Research
            </p>

            <h2 className="mb-6 font-heading text-[28px] font-bold uppercase leading-[1.02] tracking-[-1px] sm:text-[36px] md:text-[42px]">
              Formulation science, proven at manufacturing scale.
            </h2>

            <p className="mb-12 max-w-[460px] text-[15px] leading-relaxed text-neutral-300 sm:text-[16px]">
              Formulation R&D and manufacturing run under one roof at Zeovus
              Life. Every formula is developed and refined by our team before it
              reaches the production line.
            </p>

            {/* Feature rows — refined with connecting lines */}
            <div className="relative space-y-8">
              {/* Vertical connecting line */}
              <div className="absolute left-[18px] top-[36px] hidden h-[calc(100%-72px)] w-px bg-gradient-to-b from-white/10 via-white/10 to-transparent lg:block" />

              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex gap-5"
                  >
                    <div className="relative mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/[0.08] transition-all duration-500 group-hover:bg-secondary/10 group-hover:ring-secondary/30">
                      <Icon className="h-4 w-4 text-secondary/80 transition-colors duration-500 group-hover:text-secondary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="mb-1.5 font-heading text-[14px] font-semibold uppercase tracking-[0.5px] text-white/90">
                        {feature.title}
                      </h4>
                      <p className="text-[13px] leading-relaxed text-neutral-400">
                        {feature.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-12"
            >
              <Link
                href="/capabilities"
                className="group inline-flex items-center gap-2.5 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-secondary"
              >
                <span className="relative">
                  Explore Capabilities
                  <span className="absolute -bottom-px left-0 h-px w-0 bg-secondary transition-all duration-400 group-hover:w-full" />
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
          </motion.div>

          {/* RIGHT — Video (60%) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[60%]"
          >
            {/* Video container with refined frame */}
            <div className="group relative overflow-hidden rounded-[18px] ring-1 ring-white/[0.06]" style={{ aspectRatio: '4/3' }}>
              {/* Video */}
              <video
                src="https://res.cloudinary.com/ac74hfe9/video/upload/v1787608635/Formulation-science.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-[transform] duration-[800ms] ease-out-quint group-hover:scale-[1.02]"
              />

              {/* Cinematic overlays */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,38,14,0) 50%, rgba(10,38,14,0.65) 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(10,38,14,0) 80%, rgba(10,38,14,0.3) 100%)',
                }}
              />

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
