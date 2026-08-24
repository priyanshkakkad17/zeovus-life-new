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
    <section className="bg-primary-dark py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* LEFT — Text content (42%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="w-full lg:w-[42%] lg:flex-shrink-0"
          >
            <h2 className="mb-5 font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] sm:text-[36px] md:text-[42px]">
              Formulation science, proven at manufacturing scale.
            </h2>

            <p className="mb-10 max-w-[480px] text-[15px] leading-relaxed text-neutral-300 sm:text-[16px]">
              Formulation R&D and manufacturing run under one roof at Zeovus
              Life. Every formula is developed and refined by our team before it
              reaches the production line.
            </p>

            {/* Feature rows */}
            <div className="space-y-6">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                      <Icon className="h-4 w-4 text-secondary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="mb-1 font-heading text-[14px] font-semibold uppercase tracking-[0.5px] text-white">
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
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10"
            >
              <Link
                href="/capabilities"
                className="group inline-flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-secondary"
              >
                <span className="relative">
                  Explore Manufacturing &amp; Research
                  <span className="absolute -bottom-px left-0 h-px w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
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

          {/* RIGHT — Video (58%) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="w-full lg:w-[58%]"
          >
            {/* Video container */}
            <div className="group relative overflow-hidden rounded-[22px]" style={{ aspectRatio: '4/3' }}>
              {/* Video */}
              <video
                src="https://res.cloudinary.com/ac74hfe9/video/upload/v1787608635/Formulation-science.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-[transform,filter] duration-[600ms] ease-out group-hover:scale-[1.02] group-hover:brightness-110"
              />

              {/* Cinematic bottom overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,38,14,0) 40%, rgba(10,38,14,0.72) 100%)',
                }}
              />

              {/* Floating pill — bottom left */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                <span className="font-heading text-[10px] font-semibold uppercase tracking-[2px] text-white/90">
                  Manufacturing &amp; R&amp;D
                </span>
              </div>

              {/* Small live indicator — bottom right */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
                </span>
                <span className="font-heading text-[9px] uppercase tracking-[1.5px] text-white/70">
                  Live
                </span>
              </div>
            </div>

            {/* Caption */}
            <p className="mt-3 text-[12px] tracking-[0.3px] text-neutral-500">
              Inside Zeovus Life — From formulation to production
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
