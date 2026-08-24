'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-primary-dark py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 text-center sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[-1px] sm:text-[42px]">
            Ready to bring your vision to life?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[15px] leading-relaxed text-neutral-300 sm:text-[16px]">
            Tell us what you're building. We'll help you bring high-quality wellness
            products to market.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block cursor-pointer rounded-[2px] bg-secondary px-6 py-3 font-heading text-xs font-semibold uppercase tracking-widest text-primary-dark transition-colors hover:bg-secondary-dark sm:px-8 sm:py-4 sm:text-sm"
              >
                Enquire Now
              </motion.span>
            </Link>
            <Link href="/capabilities">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block cursor-pointer rounded-[2px] border border-white px-6 py-3 font-heading text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-primary sm:px-8 sm:py-4 sm:text-sm"
              >
                Learn More
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
