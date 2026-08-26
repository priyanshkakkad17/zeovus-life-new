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
  { value: '12', suffix: '', label: 'Quality Steps' },
  { value: '825', suffix: '+', label: 'Tested Parameters' },
  { value: '3', suffix: '×', label: 'Layer Verification' },
];

export default function CertificationsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f9f6] py-20 sm:py-26 lg:py-30">

      {/* Molecular grid background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hex-grid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon
              points="30,2 56,16 56,36 30,50 4,36 4,16"
              fill="none"
              stroke="#1F4015"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" />
      </svg>

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">

        {/* Eyebrow + Headline — tightened hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[3px] text-primary-light">
            Manufactured in facilities built to global standards
          </p>
          <h2 className="mb-5 font-heading text-[36px] font-bold uppercase leading-[1.02] tracking-[-1.5px] text-primary-dark sm:text-[48px] md:text-[56px]">
            Quality is not a department.
            <br />
            <span className="text-primary-light">It's our DNA.</span>
          </h2>
          <p className="mx-auto max-w-[680px] text-[16px] leading-relaxed text-neutral-600 sm:text-[18px]">
            Every product passes through facilities verified to global quality,
            safety and regulatory standards — anchored by our proprietary ZQA
            framework.
          </p>
        </motion.div>

        {/* ZQA seal — overlaps the metrics card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-[-80px] flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.04, rotate: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex h-[160px] w-[160px] items-center justify-center rounded-full border border-primary-light/25 bg-white shadow-[0_8px_48px_rgba(31,64,21,0.14)] sm:h-[180px] sm:w-[180px]"
          >
            <img
              src="/zqa/seal5.png"
              alt="Zeovus Quality Assurance Seal"
              className="h-[132px] w-[132px] object-contain sm:h-[152px] sm:w-[152px]"
            />
          </motion.div>
        </motion.div>

        {/* Metrics card — refined with editorial number styling */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-14"
        >
          <div className="overflow-hidden rounded-[20px] bg-white pt-[96px] shadow-[0_2px_40px_rgba(31,64,21,0.07)] ring-1 ring-primary-dark/[0.04]">
            <div className="grid divide-y divide-neutral-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center px-6 py-8 text-center sm:px-8"
                >
                  <span className="editorial-number font-heading text-[52px] font-bold leading-none text-primary-light sm:text-[56px] lg:text-[64px]">
                    {m.value}
                    {m.suffix && (
                      <span className="text-[32px] text-primary-light/60 lg:text-[36px]">{m.suffix}</span>
                    )}
                  </span>
                  <span className="mt-3 font-heading text-[11px] font-semibold uppercase tracking-[2px] text-neutral-500">
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-neutral-100 px-8 py-4">
              <p className="text-center text-[13px] text-neutral-500">
                From raw materials to finished goods — ZQA adds a verification layer at every stage.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Certification carousel — refined cards */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#f5f9f6] to-transparent sm:w-28" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#f5f9f6] to-transparent sm:w-28" />

          <div className="flex w-max animate-cert-scroll items-center gap-4 py-3">
            {[...certifications, ...certifications].map((cert, i) => (
              <div
                key={i}
                className="inline-flex flex-shrink-0 flex-col items-center justify-center gap-2.5 rounded-xl border border-primary-dark/[0.06] bg-white px-5 py-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-light/30 hover:shadow-[0_4px_16px_rgba(21,168,89,0.08)]"
                style={{ minWidth: '105px', minHeight: '84px' }}
              >
                {cert.logo ? (
                  <img
                    src={cert.logo}
                    alt={cert.label}
                    className="h-9 w-auto max-w-[72px] object-contain"
                  />
                ) : (
                  <span className="flex h-9 items-center font-heading text-[14px] font-bold tracking-[-0.3px] text-primary-dark">
                    {cert.label}
                  </span>
                )}
                <span className="font-heading text-[9px] font-semibold uppercase tracking-[1.2px] text-neutral-400">
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Standards footer CTA — refined */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 border-t border-primary-dark/[0.06] pt-10 text-center"
        >
          <p className="mb-2 font-heading text-[12px] font-semibold uppercase tracking-[2px] text-neutral-500">
            Held to standards you can verify.
          </p>
          <p className="mx-auto mb-6 max-w-[500px] text-[14px] leading-relaxed text-neutral-500">
            Explore every certification, audit protocol, and compliance framework
            behind Zeovus manufacturing.
          </p>
          <Link
            href="/capabilities"
            className="group inline-flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-primary-light"
          >
            <span className="relative">
              View Manufacturing Standards
              <span className="absolute -bottom-px left-0 h-px w-0 bg-primary-light transition-all duration-400 group-hover:w-full" />
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
