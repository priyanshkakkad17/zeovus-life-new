'use client';

import { motion } from 'framer-motion';

const products = [
  { name: 'Omega-3 EPA + DHA', benefit: 'Cardiovascular support' },
  { name: 'CoQ10 100mg', benefit: 'Cellular energy' },
  { name: 'Collagen Peptides', benefit: 'Skin & joint health' },
  { name: 'Probiotic 50B CFU', benefit: 'Gut microbiome' },
  { name: 'Vitamin D3 5000 IU', benefit: 'Bone & immune' },
  { name: 'Multivitamin Complete', benefit: 'Daily nutrition' },
];

export default function PortfolioHighlights() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[42px]">
            Portfolio Highlights
          </h2>
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
            Proven formulations across categories, backed by science and
            manufactured to global standards.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-[4px] bg-neutral-100 p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-32 items-center justify-center rounded-[2px] bg-white">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-light/10">
                  <span className="font-heading text-2xl font-bold text-primary-light">
                    {item.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h3 className="mb-2 font-heading text-[16px] font-semibold text-primary-dark">
                {item.name}
              </h3>
              <p className="mb-4 text-[14px] text-neutral-600">{item.benefit}</p>
              <button className="font-heading text-[13px] font-medium uppercase tracking-[0.5px] text-primary-light hover:underline">
                Request Sheet →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}