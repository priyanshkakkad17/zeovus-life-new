'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CERT_LOGOS = [
  { src: '/logo/gmp.png', alt: 'GMP certification' },
  { src: '/logo/ISO-Logo.png', alt: 'ISO certification' },
  { src: '/logo/haccp.png', alt: 'HACCP certification' },
  { src: '/logo/fssai.png', alt: 'FSSAI certification' },
  { src: '/logo/brcgs.png', alt: 'BRCGS certification' },
  { src: '/logo/ifs-logo.png', alt: 'IFS certification' },
  { src: '/logo/usfda.png', alt: 'US FDA certification' },
  { src: '/logo/iso22000.png', alt: 'FSSC 22000 certification' },
  { src: '/logo/iso 22716-2007.png', alt: 'ISO 22716 certification' },
  { src: '/logo/cosmos-standard.png', alt: 'COSMOS standard' },
  { src: '/logo/halal.png', alt: 'Halal certification' },
  { src: '/logo/kosher.png', alt: 'Kosher certification' },
  { src: '/logo/organic.png', alt: 'Organic certification' },
  { src: '/logo/non gmo project copy.jpg', alt: 'Non-GMO Project' },
  { src: '/logo/reach-compliant copy.png', alt: 'REACH compliant' },
  { src: '/logo/nsf.png', alt: 'NSF certification' },
  { src: '/logo/leaping_bunny.png', alt: 'Leaping Bunny cruelty-free' },
  { src: '/logo/vegan.webp', alt: 'Vegan certification' },
];

function useCountUp(target) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) {
          setCount(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [inView, target]);

  return [count, ref];
}

function Stat({ value, suffix, label }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className="text-left">
      <div className="text-[#0B281E] font-heading font-extrabold text-4xl sm:text-5xl lg:text-[52px] leading-none tracking-tight">
        {count}
        <span className="text-[#15A859]">{suffix}</span>
      </div>
      <div className="mt-2 text-xs sm:text-[13px] font-sans font-medium text-[#4A5D54]">
        {label}
      </div>
    </div>
  );
}

export default function CertificationsSection({ content = {} }) {
  if (content.enabled === false) return null;

  // Stats matching reference screenshot
  const defaultMetrics = [
    { value: 12, suffix: '+', label: 'Years of Expertise' },
    { value: 825, suffix: '+', label: 'Formulas Developed' },
    { value: 3, suffix: 'x', label: 'Global Markets Served' },
  ];

  const incomingMetrics = content.metrics || [];
  const metrics = defaultMetrics.map((dm, idx) => {
    const m = incomingMetrics[idx];
    return {
      value: m?.value ? Number(m.value) : dm.value,
      suffix: m?.suffix !== undefined ? m.suffix : dm.suffix,
      label: m?.label || dm.label,
    };
  });

  // Duplicate logos for seamless conveyor belt marquee
  const logos = [...CERT_LOGOS, ...CERT_LOGOS];

  return (
    <section id="quality" className="bg-[#FAFCF8] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-12">
        
        {/* ================= TOP ROW: 2-COLUMN SPLIT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Eyebrow + Serif Headline + Body Paragraph + Pill CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start max-w-xl"
          >
            {/* Eyebrow */}
            <p className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-[#738C7B] mb-4 flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-[#738C7B]" />
              <span>{content.eyebrow || 'OUR COMMITMENT'}</span>
            </p>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-normal leading-[1.14] text-[#0B281E] tracking-tight mb-5">
              <span>{content.headingLead || 'Quality is not a department.'}</span>
              <br />
              <span className="text-[#15A859] font-medium">
                {content.headingAccent || "It's our DNA."}
              </span>
            </h2>

            {/* Intro Body Copy */}
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4A5D54] mb-8 font-normal">
              {content.intro ||
                'Every product goes through rigorous testing and compliance to ensure safety, purity and consistency — because your brand deserves nothing less.'}
            </p>

            {/* Solid Pill CTA Button */}
            <Link
              href={content.footerCtaHref || '/capabilities'}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#132E22] hover:bg-[#15A859] text-white font-heading font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{content.footerCtaLabel || 'Our Quality Standards'}</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </Link>
          </motion.div>

          {/* RIGHT COLUMN: Stats Row + Rotating Conveyor Belt Logo Marquee */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full pt-2 lg:pt-4">
            
            {/* 3 Metric Stats Counter */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pb-10 sm:pb-12 border-b border-[#E3EAE0]">
              {metrics.map((s, i) => (
                <Stat key={i} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>

            {/* Rotating Carousel Conveyor Belt */}
            {content.showCertifications !== false && (
              <div className="relative w-full pt-8 sm:pt-10 overflow-hidden">
                <div className="group relative overflow-hidden w-full">
                  {/* Left & Right Soft Fade Gradients */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-[#FAFCF8] to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-[#FAFCF8] to-transparent z-10" />
                  
                  {/* Continuously Scrolling Logo Marquee */}
                  <div className="flex w-max items-center animate-cert-scroll group-hover:[animation-play-state:paused]">
                    {logos.map((logo, i) => (
                      <div
                        key={i}
                        className="shrink-0 mx-3 sm:mx-4 flex items-center justify-center h-16 w-24 sm:h-20 sm:w-28"
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain opacity-85 hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= BOTTOM ROW: SCIENTIST IMAGE + VERIFICATION CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="mt-16 sm:mt-20 lg:mt-24 w-full bg-white rounded-2xl sm:rounded-3xl border border-[#E6ECE2] shadow-[0_6px_30px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            
            {/* Left: Lab Scientist Image from /images/certification.png - flush to edges on all screens */}
            <div className="md:col-span-5 lg:col-span-6 relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] w-full overflow-hidden bg-[#EDF3E8]">
              <Image
                src="/images/certification.png"
                alt="Scientist in laboratory examining test tube"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center w-full h-full"
              />
            </div>

            {/* Right: "Held to standards you can verify" + View Certifications button */}
            <div className="md:col-span-7 lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col items-start justify-center">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-medium text-[#0B281E] leading-snug tracking-tight mb-3">
                {content.footerHeading || 'Held to standards you can verify.'}
              </h3>
              
              <p className="font-sans text-sm sm:text-base text-[#4A5D54] leading-relaxed mb-6 max-w-xl font-normal">
                {content.footerBody ||
                  'Explore our certifications, audit reports and compliance frameworks behind Zeovus manufacturing.'}
              </p>

              <Link
                href={content.footerCtaHref || '/capabilities'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0B281E]/30 hover:border-[#15A859] hover:bg-[#15A859]/5 text-[#0B281E] hover:text-[#15A859] font-heading font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-sm"
              >
                <span>View Certifications</span>
                <ArrowRight size={15} strokeWidth={2.2} />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
