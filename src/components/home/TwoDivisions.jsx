'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/** Convert a #rrggbb tint into the layered cinematic overlays the design uses. */
function buildOverlays(tint) {
  const hex = /^#[0-9a-fA-F]{6}$/.test(tint || '') ? tint : '#0A260E';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const rgba = (a) => `rgba(${r},${g},${b},${a})`;
  return {
    overlay: `linear-gradient(100deg, ${rgba(0.92)} 0%, ${rgba(0.72)} 30%, ${rgba(0.38)} 58%, ${rgba(0.1)} 100%), linear-gradient(180deg, ${rgba(0.1)} 0%, ${rgba(0.3)} 100%)`,
    hoverOverlay: `linear-gradient(100deg, ${rgba(0.82)} 0%, ${rgba(0.6)} 30%, ${rgba(0.28)} 58%, ${rgba(0.06)} 100%), linear-gradient(180deg, ${rgba(0.06)} 0%, ${rgba(0.22)} 100%)`,
  };
}

export default function TwoDivisions({ content = {} }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  const cards = content.cards || [];

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

  if (content.enabled === false || cards.length === 0) return null;

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
          <h2 className="font-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[42px] md:text-[52px] 2xl:text-[60px]">
            {content.heading}
          </h2>
        </motion.div>

        {/* Cards — GSAP scroll-stagger target */}
        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {cards.map((card, index) => {
            const { overlay, hoverOverlay } = buildOverlays(card.tint);
            return (
              <div
                key={index}
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
                  style={{ background: overlay }}
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-[600ms] ease-out group-hover:opacity-100"
                  style={{ background: hoverOverlay }}
                />

                {/* Lift shadow on hover */}
                <div className="absolute inset-0 rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.10)] transition-shadow duration-[600ms] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.24)]" />

                {/* Content */}
                <div className="relative flex h-full min-h-[440px] flex-col justify-between p-8 md:min-h-[480px] md:p-12">
                  {/* Top */}
                  <div>
                    {/* Category label */}
                    {card.label && (
                      <p className="mb-3 font-heading text-[11px] font-semibold uppercase tracking-[3px] text-white/60">
                        {card.label}
                      </p>
                    )}

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
                  {card.cta && (
                  <div className="mt-10">
                    <Link
                      href={card.href || '/'}
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
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
