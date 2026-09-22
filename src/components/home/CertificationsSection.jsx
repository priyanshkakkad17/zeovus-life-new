'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CERT_LOGOS = [
  { src: "/logo/gmp.png", alt: "GMP certification" },
  { src: "/logo/ISO-Logo.png", alt: "ISO certification" },
  { src: "/logo/haccp.png", alt: "HACCP certification" },
  { src: "/logo/iso22000.png", alt: "FSSC 22000 certification" },
  { src: "/logo/brcgs.png", alt: "BRCGS certification" },
  { src: "/logo/ifs-logo.png", alt: "IFS certification" },
  { src: "/logo/usfda.png", alt: "US FDA certification" },
  { src: "/logo/iso 22716-2007.png", alt: "ISO 22716 certification" },
  { src: "/logo/cosmos-standard.png", alt: "COSMOS standard" },
  { src: "/logo/halal.png", alt: "Halal certification" },
  { src: "/logo/kosher.png", alt: "Kosher certification" },
  { src: "/logo/organic.png", alt: "Organic certification" },
  { src: "/logo/non gmo project copy.jpg", alt: "Non-GMO Project" },
  { src: "/logo/reach-compliant copy.png", alt: "REACH compliant" },
  { src: "/logo/nsf.png", alt: "NSF certification" },
  { src: "/logo/leaping_bunny.png", alt: "Leaping Bunny cruelty-free" },
  { src: "/logo/vegan.webp", alt: "Vegan certification" },
  { src: "/logo/fssai.png", alt: "FSSAI certification" },
];

function useCountUp(target) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [inView, target]);

  return [count, ref];
}

function Stat({ value, suffix, label }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-primary-dark font-bold text-5xl md:text-6xl leading-none tracking-tight">
        {count}
        <span className="text-primary-light">{suffix}</span>
      </div>
      <div className="mt-3 text-[13px] font-medium tracking-[0.12em] uppercase text-primary-dark/60">{label}</div>
    </div>
  );
}

export default function CertificationsSection({ content = {} }) {
  const metrics = content.metrics || [];
  const logos = [...CERT_LOGOS, ...CERT_LOGOS];

  if (content.enabled === false) return null;

  return (
    <section id="quality" className="bg-[#F8F8F8] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
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
          {content.intro && (
            <p className="mt-6 text-primary-dark/70 text-base leading-relaxed">
              {content.intro}
            </p>
          )}
        </motion.div>

        {/* Stats + seal */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          <div className="md:col-span-8 grid grid-cols-3 gap-4 md:gap-8">
            {metrics.map((s, i) => (
              <Stat key={i} value={Number(s.value) || 0} suffix={s.suffix} label={s.label} />
            ))}
          </div>
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 2.5, rotate: -24, filter: 'blur(4px)' }}
              whileInView={{
                opacity: [0, 1, 1, 1],
                scale: [2.5, 0.8, 1.07, 1],
                rotate: [-24, -13, -9, -8],
                filter: ['blur(4px)', 'blur(0.4px)', 'blur(0px)', 'blur(0px)'],
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3,
                duration: 0.52,
                times: [0, 0.55, 0.8, 1],
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative shrink-0"
              style={{ transformOrigin: 'center' }}
            >
              {/* Ink bleed halo that appears on impact */}
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: [0, 0.4, 0], scale: [0.7, 1.15, 1.35] }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(127,175,127,0.35) 0%, transparent 70%)' }}
              />
              <img
                src={content.sealImage || "/zqa/seal5.png"}
                alt={content.sealAlt || "Zeovus Quality Assurance Seal"}
                loading="lazy"
                draggable={false}
                className="relative h-40 w-40 md:h-48 md:w-48 object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)] select-none"
              />
            </motion.div>
          </div>
        </div>

        {content.metricsFootnote && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mt-8 text-[13px] text-primary-dark/55 italic border-l-2 border-primary-light/40 pl-4 max-w-2xl">
              {content.metricsFootnote}
            </p>
          </motion.div>
        )}
      </div>

      {/* Certification logo carousel */}
      {content.showCertifications !== false && (
        <div className="mt-16 md:mt-20">
          <div className="group relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8F8F8] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8F8F8] to-transparent z-10" />
            <div className="flex w-max animate-cert-scroll group-hover:[animation-play-state:paused]">
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="shrink-0 mx-3 sm:mx-5 flex items-center justify-center h-24 w-28 sm:h-28 sm:w-36"
                  tabIndex={0}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer strip */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-14 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-primary-dark/10 pt-10">
            <div className="max-w-xl">
              <h3 className="text-primary-dark font-bold text-2xl md:text-3xl text-balance mb-3">
                {content.footerHeading || 'Held to standards you can verify.'}
              </h3>
              <p className="text-primary-dark/70 text-base leading-relaxed">
                {content.footerBody || 'Explore every certification, audit protocol, and compliance framework behind Zeovus manufacturing.'}
              </p>
            </div>
            <Link
              href={content.footerCtaHref || '/capabilities'}
              className="shrink-0 inline-flex items-center gap-2 h-12 px-7 rounded-full border-2 border-primary-dark text-primary-dark font-semibold text-sm hover:bg-primary-dark hover:text-white transition-colors"
            >
              {content.footerCtaLabel || 'View Manufacturing Standards'} <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
