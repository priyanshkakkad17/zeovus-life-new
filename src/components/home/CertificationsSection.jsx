'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const certifications = [
  { label: 'GMP',          logo: '/logo/gmp.png' },
  { label: 'ISO',          logo: null },
  { label: 'HACCP',        logo: '/logo/haccp.png' },
  { label: 'FSSC 22000',   logo: '/logo/iso22000.png' },
  { label: 'BRCGS',        logo: '/logo/brcgs.png' },
  { label: 'IFS',          logo: null },
  { label: 'US FDA',       logo: '/logo/usfda.png' },
  { label: 'ISO 22716',    logo: null },
  { label: 'COSMOS',       logo: null },
  { label: 'HALAL',        logo: '/logo/halal.png' },
  { label: 'KOSHER',       logo: '/logo/kosher.png' },
  { label: 'ORGANIC',      logo: '/logo/organic.png' },
  { label: 'NON-GMO',      logo: null },
  { label: 'REACH',        logo: null },
  { label: 'NSF',          logo: null },
  { label: 'LEAPING BUNNY',logo: null },
  { label: 'VEGAN',        logo: '/logo/vegan.webp' },
  { label: 'FSSAI',        logo: '/logo/fssai.png' },
];

const metrics = [
  { value: '12', label: 'Steps' },
  { value: '825+', label: 'Tested Parameters' },
  { value: '3', label: 'Triple-Layer Checks' },
];

export default function CertificationsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f9f6] py-16 sm:py-20 lg:py-28">

      {/* Molecular grid background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hex-grid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon
              points="30,2 56,16 56,36 30,50 4,36 4,16"
              fill="none"
              stroke="#1F4015"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" />
      </svg>

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12">

        {/* Eyebrow + Headline + Body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="mb-4 font-heading text-[12px] font-bold uppercase tracking-[3px] text-primary-light">
            Manufactured in facilities built to global standards
          </p>
          <h2 className="mb-5 font-heading text-[40px] font-bold uppercase leading-[1.05] tracking-[-1.5px] text-primary-dark sm:text-[52px] md:text-[60px]">
            Quality is not a department at Zeovus.
            <br />
            It's our DNA.
          </h2>
          <p className="mx-auto max-w-[720px] text-[17px] leading-relaxed text-neutral-600 sm:text-[19px]">
            Every product is manufactured through facilities built to global quality,
            safety and regulatory standards — verified through our proprietary ZQA
            framework.
          </p>
        </motion.div>

        {/* ZQA seal — standalone, centered between heading and card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-[-90px] flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative z-10 flex h-[180px] w-[180px] items-center justify-center rounded-full border border-primary-light/30 bg-white shadow-[0_8px_40px_rgba(31,64,21,0.16)]"
          >
            <img
              src="/zqa/seal5.png"
              alt="Zeovus Quality Assurance Seal"
              className="h-[156px] w-[156px] object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Metrics card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="relative mb-12"
        >
          {/* Card */}
          <div className="overflow-hidden rounded-[24px] bg-white pt-[104px] shadow-[0_2px_32px_rgba(31,64,21,0.08)] ring-1 ring-primary-dark/5">
            <div className="grid divide-y divide-neutral-100 sm:divide-x sm:divide-y-0 md:grid-cols-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center px-8 py-8 text-center"
                >
                  <span className="font-heading text-[48px] font-bold leading-none tracking-[-2px] text-primary-light sm:text-[52px]">
                    {m.value}
                  </span>
                  <span className="mt-2 font-heading text-[11px] font-semibold uppercase tracking-[2px] text-neutral-500">
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="border-t border-neutral-100 px-8 py-4 text-center text-[13px] text-neutral-500">
              From raw materials to finished goods, ZQA adds an additional layer of verification.
            </p>
          </div>
        </motion.div>

        {/* Certification carousel */}
        <div className="relative mt-2 overflow-hidden">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#f5f9f6] to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#f5f9f6] to-transparent" />

          <div className="flex w-max animate-cert-scroll items-center gap-5 py-3">
            {[...certifications, ...certifications].map((cert, i) => (
              <div
                key={i}
                className="inline-flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-primary-light/20 bg-white px-6 py-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-light/50 hover:shadow-md"
                style={{ minWidth: '110px', minHeight: '88px' }}
              >
                {cert.logo ? (
                  <img
                    src={cert.logo}
                    alt={cert.label}
                    className="h-10 w-auto max-w-[80px] object-contain"
                  />
                ) : (
                  <span className="flex h-10 items-center font-heading text-[15px] font-bold tracking-[-0.5px] text-primary-dark">
                    {cert.label}
                  </span>
                )}
                <span className="font-heading text-[10px] font-semibold uppercase tracking-[1px] text-neutral-400">
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Standards footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 border-t border-primary-dark/10 pt-10 text-center"
        >
          <p className="mb-1 font-heading text-[13px] font-semibold uppercase tracking-[2px] text-neutral-500">
            Held to standards you can verify.
          </p>
          <p className="mx-auto mb-5 max-w-[520px] text-[14px] leading-relaxed text-neutral-500">
            Explore every certification, audit protocol, and compliance framework
            behind Zeovus manufacturing.
          </p>
          <Link
            href="/capabilities"
            className="group inline-flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-primary-light"
          >
            <span className="relative">
              View Manufacturing Standards
              <span className="absolute -bottom-px left-0 h-px w-0 bg-primary-light transition-all duration-300 group-hover:w-full" />
            </span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
        </motion.div>

      </div>
    </section>
  );
}
