'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function hexToRgb(hex) {
  const cleanHex = (hex || '#0A260E').replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 10;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 38;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 14;
  return `${r},${g},${b}`;
}

function Panel({ card, side }) {
  const rgb = hexToRgb(card.tint);
  const overlay = `linear-gradient(to top, rgba(${rgb}, 0.62) 8%, rgba(${rgb}, 0.28) 55%, rgba(${rgb}, 0.12) 100%)`;

  return (
    <Link
      href={card.href || '/'}
      className="group relative block overflow-hidden md:h-[65vh] h-[50vh]"
      aria-label={`${card.label}: ${card.subtitle}`}
    >
      <img
        src={card.image}
        alt={card.subtitle}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04] ${
          side === "right" ? "object-[center_30%]" : "object-center"
        }`}
      />
      <div className="absolute inset-0 transition-opacity duration-700" style={{ background: overlay }} />
      <div className="relative z-10 h-full flex flex-col justify-end p-7 sm:p-12 md:p-14 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {card.label && (
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-accent mb-4">
              {card.label}
            </p>
          )}
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-balance mb-4">
            {card.subtitle}
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-6 max-w-md">
            {card.body}
          </p>
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
            {card.cta} <ArrowRight size={16} />
          </span>
        </motion.div>
      </div>
    </Link>
  );
}

export default function TwoDivisions({ content = {} }) {
  const cards = content.cards || [];

  if (content.enabled === false || cards.length === 0) return null;

  return (
    <section id="two-ways" className="bg-[#FFF5D1]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 md:pt-16 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[#1F4015] font-bold text-3xl sm:text-4xl md:text-5xl text-balance max-w-2xl mx-auto">
            {content.heading || 'Two ways we care for you.'}
          </h2>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1F4015]/40">
        {cards.map((card, i) => (
          <Panel key={i} card={card} side={i % 2 === 1 ? "right" : "left"} />
        ))}
      </div>
    </section>
  );
}
