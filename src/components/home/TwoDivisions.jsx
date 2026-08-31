'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: 'nutraceuticals',
    label: 'NUTRACEUTICALS',
    subtitle: 'Formulated to be felt.',
    body: 'Immunity, sleep, joints, heart — formulated by life stage, dosed for what the body can absorb.',
    cta: 'Explore Nutraceuticals',
    href: '/nutraceuticals',
    image:
      'https://res.cloudinary.com/ac74hfe9/image/upload/v1788197673/Formulated_to_be_felt.jpg',
    overlay:
      'linear-gradient(100deg, rgba(10,38,14,0.92) 0%, rgba(10,38,14,0.72) 30%, rgba(10,38,14,0.38) 58%, rgba(10,38,14,0.10) 100%), linear-gradient(180deg, rgba(10,38,14,0.10) 0%, rgba(10,38,14,0.30) 100%)',
    hoverOverlay:
      'linear-gradient(100deg, rgba(10,38,14,0.82) 0%, rgba(10,38,14,0.60) 30%, rgba(10,38,14,0.28) 58%, rgba(10,38,14,0.06) 100%), linear-gradient(180deg, rgba(10,38,14,0.06) 0%, rgba(10,38,14,0.22) 100%)',
  },
  {
    id: 'cosmetics',
    label: 'COSMETICS',
    subtitle: 'Formulated to be seen.',
    body: 'Skincare and haircare, formulated clean-label first and reviewed for how they perform on skin.',
    cta: 'Explore Cosmetics',
    href: '/cosmetics',
    image:
      'https://res.cloudinary.com/ac74hfe9/image/upload/v1788197210/Formulated_to_be_seen..jpg',
    overlay:
      'linear-gradient(100deg, rgba(8,48,36,0.92) 0%, rgba(8,48,36,0.72) 30%, rgba(8,48,36,0.38) 58%, rgba(8,48,36,0.10) 100%), linear-gradient(180deg, rgba(8,48,36,0.10) 0%, rgba(8,48,36,0.30) 100%)',
    hoverOverlay:
      'linear-gradient(100deg, rgba(8,48,36,0.82) 0%, rgba(8,48,36,0.60) 30%, rgba(8,48,36,0.28) 58%, rgba(8,48,36,0.06) 100%), linear-gradient(180deg, rgba(8,48,36,0.06) 0%, rgba(8,48,36,0.22) 100%)',
  },
];

export default function TwoDivisions() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    // Staggered card reveal on scroll — offset timing between the two
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play none none none',
        },
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f5f9f6] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center lg:mb-16"
        >
          <h2 className="font-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[42px] md:text-[52px]">
            Two ways we care for you.
          </h2>
        </motion.div>

        {/* Cards — GSAP scroll-stagger target */}
        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {CARDS.map((card) => {
            return (
              <div
                key={card.id}
                className="group relative min-h-[440px] overflow-hidden rounded-[22px] opacity-0 will-change-transform md:min-h-[480px]"
              >
                {/* Background image with zoom */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
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

                {/* Lift shadow on hover */}
                <div className="absolute inset-0 rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.10)] transition-shadow duration-[600ms] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.24)]" />

                {/* Content */}
                <div className="relative flex h-full min-h-[440px] flex-col justify-between p-8 md:min-h-[480px] md:p-12">
                  {/* Top */}
                  <div>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
