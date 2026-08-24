'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lightbulb, Tag, Globe, Box } from 'lucide-react';

const options = [
  {
    title: 'Co-Development & Formulation Innovation',
    description: 'Bring us your idea, brief or product challenge. We work with you to develop the right formulation.',
    icon: Lightbulb
  },
  {
    title: 'Private Label & White Label',
    description: 'Launch products under your own brand, with our support across formulation, sourcing and manufacturing.',
    icon: Tag
  },
  {
    title: 'Distribution & Regional Partnerships',
    description: 'Take our products into new markets and grow with us as a distribution partner.',
    icon: Globe
  },
  {
    title: 'Bulk Ingredient & Raw Material Supply',
    description: 'Source the ingredients and raw materials you need, in the quantities your business requires.',
    icon: Box
  }
];

export default function WorkingTogether() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-heading text-[12px] font-bold uppercase tracking-[2px] text-primary-light">
            Build to grow with you.
          </p>
          <h2 className="mb-4 font-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[42px]">
            We shape what you sell —<br />
            and stay for what comes next.
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {options.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[4px] border border-neutral-200 p-6 transition-colors hover:border-primary-light/50"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[2px] bg-primary-light/10 text-primary-light">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 font-heading text-[18px] font-semibold text-primary-dark">
                  {item.title}
                </h3>
                <p className="mb-4 text-[14px] text-neutral-600">{item.description}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-heading text-[13px] font-medium uppercase tracking-[0.5px] text-primary-light transition-all hover:gap-3"
                >
                  Enquire
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
