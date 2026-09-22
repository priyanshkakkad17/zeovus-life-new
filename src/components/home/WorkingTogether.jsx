'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WorkingTogether({ content = {} }) {
  const options = content.items || [];

  if (content.enabled === false || options.length === 0) return null;

  return (
    <section id="partnerships" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          {content.eyebrow && (
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-primary-light mb-4">
              {content.eyebrow}
            </p>
          )}
          <h2 className="text-primary-dark font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-balance">
            {content.headingLead}
            <br />
            {content.headingAccent && (
              <span className="text-primary-light">{content.headingAccent}</span>
            )}
          </h2>
          <p className="mt-5 text-primary-dark/60 text-sm italic">
            {content.intro || 'All partnership models include dedicated account management and quality assurance.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-dark/10 border border-primary-dark/10 rounded-2xl overflow-hidden">
          {options.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 * i }}
              className="h-full"
            >
              <article className="group h-full bg-white p-8 md:p-10 flex flex-col">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="text-accent font-bold text-2xl tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-primary-dark/10" />
                </div>
                <h3 className="text-primary-dark font-semibold text-xl md:text-2xl leading-snug mb-4 text-balance">
                  {m.title}
                </h3>
                <p className="text-primary-dark/65 text-[15px] leading-relaxed mb-7 flex-1">
                  {m.description}
                </p>
                <Link
                  href={content.itemCtaHref || '/contact'}
                  className="inline-flex items-center gap-2 self-start text-primary-dark font-semibold text-sm border-b-2 border-accent pb-1 hover:gap-3 transition-all"
                >
                  {content.itemCtaLabel || 'Enquire'} <ArrowRight size={15} />
                </Link>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
