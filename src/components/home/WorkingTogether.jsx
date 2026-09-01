'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
export default function WorkingTogether({ content = {} }) {
  const options = content.items || [];

  if (content.enabled === false || options.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-26 lg:py-30">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* Two-column header with asymmetric weight */}
        <div className="mb-16 lg:mb-22">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 font-heading text-[12px] font-bold uppercase tracking-[2.5px] text-primary-light">
              {content.eyebrow}
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[720px] font-heading text-[32px] font-bold uppercase leading-[1.02] tracking-[-1px] text-primary-dark sm:text-[42px] lg:text-[48px]"
          >
            {content.headingLead}{' '}
            <span className="text-primary-light">{content.headingAccent}</span>
          </motion.h2>
        </div>

        {/* Staggered list layout — numbered, with progressive reveal */}
        <div className="grid gap-0">
          {options.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative border-b border-neutral-100 py-8 first:border-t lg:py-10"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 lg:gap-12">
                  {/* Number block */}
                  <div className="flex items-center sm:w-[110px] sm:flex-shrink-0 lg:w-[140px]">
                    <span className="font-heading text-[72px] font-bold leading-none tracking-[-4px] text-neutral-200 transition-colors duration-500 group-hover:text-primary-light/30 lg:text-[96px]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-2 font-heading text-[18px] font-semibold text-primary-dark transition-colors duration-300 sm:text-[20px] lg:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="max-w-[520px] text-[14px] leading-relaxed text-neutral-600 sm:text-[15px]">
                      {item.description}
                    </p>
                  </div>

                  {/* CTA — right-aligned on desktop */}
                  {content.itemCtaLabel && (
                  <div className="mt-4 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                    <Link
                      href={content.itemCtaHref || '/contact'}
                      className="group/link inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 font-heading text-[11px] font-medium uppercase tracking-[1px] text-neutral-500 transition-all duration-300 hover:border-primary-light/40 hover:text-primary-light"
                    >
                      {content.itemCtaLabel}
                      <svg
                        className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  )}
                </div>

                {/* Hover accent — left vertical bar */}
                <div className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-primary-light transition-transform duration-600 ease-out-quint group-hover:scale-y-100" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 flex items-center gap-4 border-t border-neutral-100 pt-8"
        >
          <div className="h-2 w-2 rounded-full bg-primary-light/40" />
          <p className="text-[13px] text-neutral-500">{content.footnote}</p>
        </motion.div>

      </div>
    </section>
  );
}
