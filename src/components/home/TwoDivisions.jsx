'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Heart } from 'lucide-react';

const CARDS = [
  {
    id: 'nutraceuticals',
    icon: Shield,
    label: 'NUTRACEUTICALS',
    subtitle: 'Formulated to be felt.',
    body: 'Immunity, sleep, joints, heart — formulated by life stage, dosed for what the body can absorb.',
    cta: 'Explore Nutraceuticals',
    href: '/nutraceuticals',
    image:
      'https://res.cloudinary.com/ac74hfe9/image/upload/v1787607303/Nutraceuticals-home.jpg',
    overlay:
      'linear-gradient(100deg, rgba(10,38,14,0.92) 0%, rgba(10,38,14,0.72) 30%, rgba(10,38,14,0.38) 58%, rgba(10,38,14,0.10) 100%), linear-gradient(180deg, rgba(10,38,14,0.10) 0%, rgba(10,38,14,0.30) 100%)',
    hoverOverlay:
      'linear-gradient(100deg, rgba(10,38,14,0.82) 0%, rgba(10,38,14,0.60) 30%, rgba(10,38,14,0.28) 58%, rgba(10,38,14,0.06) 100%), linear-gradient(180deg, rgba(10,38,14,0.06) 0%, rgba(10,38,14,0.22) 100%)',
  },
  {
    id: 'cosmetics',
    icon: Heart,
    label: 'COSMETICS',
    subtitle: 'Formulated to be seen.',
    body: 'Skincare and haircare, formulated clean-label first and reviewed for how they perform on skin.',
    cta: 'Explore Cosmetics',
    href: '/cosmetics',
    image:
      'https://res.cloudinary.com/ac74hfe9/image/upload/v1787607303/Cosmetics-home.jpg',
    overlay:
      'linear-gradient(100deg, rgba(8,48,36,0.92) 0%, rgba(8,48,36,0.72) 30%, rgba(8,48,36,0.38) 58%, rgba(8,48,36,0.10) 100%), linear-gradient(180deg, rgba(8,48,36,0.10) 0%, rgba(8,48,36,0.30) 100%)',
    hoverOverlay:
      'linear-gradient(100deg, rgba(8,48,36,0.82) 0%, rgba(8,48,36,0.60) 30%, rgba(8,48,36,0.28) 58%, rgba(8,48,36,0.06) 100%), linear-gradient(180deg, rgba(8,48,36,0.06) 0%, rgba(8,48,36,0.22) 100%)',
  },
];

export default function TwoDivisions() {
  return (
    <section className="relative overflow-hidden bg-[#f5f9f6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
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

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.12 }}
                className="group relative min-h-[440px] overflow-hidden rounded-[22px] md:min-h-[460px]"
                style={{ willChange: 'transform' }}
              >
                {/* Background image with zoom */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />

                {/* Cinematic overlay — lightens slightly on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-[600ms] ease-out"
                  style={{ background: card.overlay }}
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-[600ms] ease-out group-hover:opacity-100"
                  style={{ background: card.hoverOverlay }}
                />

                {/* Subtle lift shadow on hover */}
                <div className="absolute inset-0 rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.10)] transition-shadow duration-[600ms] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)]" />

                {/* Content */}
                <div className="relative flex h-full min-h-[440px] flex-col justify-between p-8 md:min-h-[460px] md:p-12">
                  {/* Top */}
                  <div>
                    {/* Icon badge */}
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                      <Icon className="h-5 w-5 text-white/90" strokeWidth={1.5} />
                    </div>

                    {/* Category label */}
                    <p className="mb-3 font-heading text-[11px] font-semibold uppercase tracking-[3px] text-white/60">
                      {card.label}
                    </p>

                    {/* Subtitle */}
                    <h3 className="mb-4 font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.5px] text-white sm:text-[32px] md:text-[36px]">
                      {card.subtitle}
                    </h3>

                    {/* Body */}
                    <p className="max-w-[420px] text-[15px] leading-relaxed text-white/70 sm:text-[16px]">
                      {card.body}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-10">
                    <Link
                      href={card.href}
                      className="group/cta inline-flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-white transition-all duration-300"
                    >
                      {card.cta}
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-[4px]"
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
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
