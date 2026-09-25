'use client';

import { motion } from 'framer-motion';
import { FlaskConical, Settings, ShieldCheck } from 'lucide-react';

export default function CapabilitiesSection({ content = {} }) {
  const media =
    content.media ||
    'https://res.cloudinary.com/ac74hfe9/video/upload/v1788197673/capabilities_vid.mp4';
  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(media);

  if (content.enabled === false) return null;

  const badges = [
    {
      icon: FlaskConical,
      title: 'In-house',
      subtitle: 'Formulation R&D',
    },
    {
      icon: Settings,
      title: 'Pilot-to-Commercial',
      subtitle: 'Manufacturing',
    },
    {
      icon: ShieldCheck,
      title: 'Certified Quality',
      subtitle: 'at Every Batch',
    },
  ];

  return (
    <section
      id="formulation"
      className="relative w-full bg-[#F8FAF6] text-[#0B281E] overflow-hidden"
    >
      <div className="relative w-full flex flex-col md:flex-row min-h-[500px] md:min-h-[540px] lg:min-h-[580px] xl:min-h-[620px]">
        
        {/* ================= LEFT CONTENT PANEL (PERFECTLY CENTERED) ================= */}
        <div className="w-full md:w-[50%] flex flex-col justify-center items-center px-6 sm:px-10 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-18 lg:py-20 relative z-20 bg-[#F8FAF6]">
          
          {/* Soft Watercolor Botanical Leaf Art in Bottom-Left Corner */}
          <div className="absolute left-0 bottom-0 w-32 sm:w-44 h-auto pointer-events-none opacity-40 z-0">
            <svg viewBox="0 0 160 200" fill="none" className="w-full h-full">
              <path d="M-10 200 C30 150, 60 90, 80 20" stroke="#7BA887" strokeWidth="1" strokeOpacity="0.4" />
              <path
                d="M-5 190 C15 150, 45 120, 85 105 C75 145, 40 180, 5 195 Z"
                fill="#8CB897"
                opacity="0.6"
              />
              <path
                d="M25 145 C50 115, 90 90, 130 95 C115 130, 75 155, 30 150 Z"
                fill="#9BC3A5"
                opacity="0.7"
              />
              <path
                d="M45 105 C70 75, 105 50, 140 45 C130 80, 95 110, 50 110 Z"
                fill="#ABCDB4"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Centered Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative z-10 w-full max-w-[520px] mx-auto flex flex-col items-start"
          >
            {/* Eyebrow Tag */}
            <p className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-[#15A859] mb-3.5 flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-[#15A859]" />
              <span>{content.eyebrow || 'MANUFACTURING & R&D EXCELLENCE'}</span>
            </p>

            {/* High-Contrast Serif Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-normal leading-[1.14] text-[#0B281E] tracking-tight mb-4">
              {content.heading || (
                <>
                  Formulation science,<br />
                  proven at manufacturing scale.
                </>
              )}
            </h2>

            {/* Body Copy */}
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#0B281E]/75 mb-8 max-w-lg font-normal">
              {content.intro ||
                'Formulation R&D and manufacturing run under one roof at Zeovus Life. Every formula is developed and refined by our team before it reaches the production line.'}
            </p>

            {/* 3 Badges Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 w-full pt-1">
              {badges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF5EE] border border-[#15A859]/25 text-[#15A859] shadow-sm">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-xs sm:text-[13px] font-bold text-[#0B281E] leading-tight">
                        {badge.title}
                      </span>
                      <span className="font-sans text-[11px] sm:text-[12px] font-semibold text-[#0B281E]/70 leading-tight">
                        {badge.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>

          {/* 
            EXACT DIAGONAL SWEEP DIVIDER (MATCHES SCREENSHOT):
            Starts at 50% at the top and slopes down-rightward to the bottom.
          */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="hidden md:block absolute top-0 bottom-0 -right-20 lg:-right-28 xl:-right-36 h-full w-20 lg:w-28 xl:w-36 z-20 text-[#F8FAF6] pointer-events-none fill-current"
          >
            <path
              d="M0 0 L5 0 C25 35, 55 70, 95 100 L0 100 Z"
            />
          </svg>
        </div>

        {/* ================= RIGHT MEDIA PANEL ================= */}
        <div className="w-full md:w-[50%] md:flex-1 relative h-[360px] sm:h-[450px] md:h-auto min-h-full overflow-hidden bg-[#0A261D]">
          
          {isVideo ? (
            <video
              className="absolute inset-0 h-[122%] w-[122%] max-w-none -top-[10%] -left-[10%] object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://res.cloudinary.com/ac74hfe9/image/upload/v1788197210/Formulated_to_be_seen..jpg"
              aria-label="Manufacturing and laboratory machinery at Zeovus Life"
            >
              <source src={media} type="video/mp4" />
            </video>
          ) : (
            <img
              src={
                media ||
                'https://res.cloudinary.com/ac74hfe9/image/upload/v1788197210/Formulated_to_be_seen..jpg'
              }
              alt="Laboratory formulation machinery"
              className="absolute inset-0 h-[122%] w-[122%] max-w-none -top-[10%] -left-[10%] object-cover"
            />
          )}

        </div>

      </div>
    </section>
  );
}
