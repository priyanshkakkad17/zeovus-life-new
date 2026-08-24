'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const certifications = [
  'GMP', 'ISO', 'HACCP', 'FSSC 22000', 'BRCGS', 'IFS', 'FDA',
  'ISO 22716', 'COSMOS', 'HALAL', 'KOSHER', 'ORGANIC',
  'NON-GMO', 'REACH', 'NSF', 'LEAPING BUNNY', 'VEGAN'
];

export default function CertificationsSection() {
  return (
    <section className="bg-[#f5f9f6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="mb-2 font-heading text-[12px] font-bold uppercase tracking-[2px] text-primary-light">
            MANUFACTURED IN FACILITIES BUILT TO GLOBAL STANDARDS
          </p>
          <h2 className="mb-4 font-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[42px]">
            Quality is not a department at Zeovus.
            <br />
            It's our DNA.
          </h2>
          <p className="mx-auto max-w-3xl text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
            Every product is manufactured through facilities built to global quality,
            safety and regulatory standards — verified through our proprietary ZQA
            framework.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 rounded-[4px] bg-white p-6 shadow-lg sm:p-8"
        >
          <div className="grid gap-6 text-center md:grid-cols-3">
            <div>
              <p className="mb-2 font-heading text-[42px] font-bold text-primary-light">
                12
              </p>
              <p className="font-heading text-[13px] uppercase tracking-[1px] text-neutral-600">
                STEPS
              </p>
            </div>
            <div>
              <p className="mb-2 font-heading text-[42px] font-bold text-primary-light">
                825+
              </p>
              <p className="font-heading text-[13px] uppercase tracking-[1px] text-neutral-600">
                TESTED PARAMETERS
              </p>
            </div>
            <div>
              <p className="mb-2 font-heading text-[42px] font-bold text-primary-light">
                3
              </p>
              <p className="font-heading text-[13px] uppercase tracking-[1px] text-neutral-600">
                TRIPLE-LAYER CHECKS
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-[14px] text-neutral-500">
            From raw materials to finished goods, ZQA adds an additional layer of
            verification.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {certifications.map((cert) => (
            <span
              key={cert}
              className="rounded-[2px] bg-white px-4 py-2 font-heading text-[12px] font-medium uppercase tracking-[0.5px] text-primary-dark shadow-sm"
            >
              {cert}
            </span>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-[13px] text-neutral-500">
          Held to standards you can verify.{' '}
          <Link href="/capabilities" className="text-primary-light hover:underline">
            View our Standards →
          </Link>
        </p>
      </div>
    </section>
  );
}
