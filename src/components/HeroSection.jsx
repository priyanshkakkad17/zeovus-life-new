'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroSection({ content = {} }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  const heroVideo = content.media || '';
  const titleLine1 = content.titleLine1 || '';
  const titleLine2 = content.titleLine2 || '';
  const ctas = [
    { label: content.ctaPrimaryLabel, href: content.ctaPrimaryHref || '/', className: 'bg-[#9CCD62] text-[#1F4015] hover:bg-[#B4BD62]' },
    {
      label: content.ctaSecondaryLabel,
      href: content.ctaSecondaryHref || '/',
      className: 'border border-[#e8f5ed]/50 bg-[#e8f5ed]/10 text-[#e8f5ed] backdrop-blur-sm hover:bg-[#e8f5ed]/20',
    },
    { label: content.ctaTertiaryLabel, href: content.ctaTertiaryHref || '/', className: 'bg-[#FFD374] text-[#1F4015] hover:bg-[#FFEF98]' },
  ].filter((cta) => cta.label);

  useGSAP(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!section || !video || !content) return;

    // Parallax: video moves slower than scroll (zooms slightly + moves down)
    gsap.to(video, {
      yPercent: 20,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Content fades out and lifts as user scrolls away
    gsap.to(content, {
      yPercent: -15,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '60% top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Overlay darkens slightly on scroll-out for cleaner transition
    gsap.to(overlay, {
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '70% top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20"
    >
      {/* Background Video — parallax target */}
      <div ref={videoRef} className="absolute inset-0 z-0 bg-primary-dark will-change-transform">
        {heroVideo && (/\.(mp4|webm|mov)(\?|$)/i.test(heroVideo) ? (
          <video
            key={heroVideo}
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img src={heroVideo} alt="" className="h-full w-full object-cover" />
        ))}
      </div>

      {/* Cinematic gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(31, 64, 21, 0.78) 0%,
              rgba(31, 64, 21, 0.60) 24%,
              rgba(31, 64, 21, 0.30) 46%,
              rgba(31, 64, 21, 0.08) 65%,
              rgba(31, 64, 21, 0) 100%
            ),
            linear-gradient(
              180deg,
              rgba(31, 64, 21, 0.04) 0%,
              rgba(31, 64, 21, 0.08) 55%,
              rgba(31, 64, 21, 0.26) 100%
            )
          `,
        }}
      />

      {/* Scroll-out darken overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-[2] opacity-0"
        style={{ background: 'linear-gradient(180deg, rgba(31,64,21,0) 0%, rgba(31,64,21,0.5) 100%)' }}
      />

      {/* Content — scroll-fade target */}
      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-[1800px] will-change-transform">
          <motion.div
            className="max-w-[900px]"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-heading text-[42px] font-black uppercase leading-[0.9] tracking-[-2px] sm:text-[58px] md:text-[72px] lg:text-[88px]">
              <motion.span
                variants={item}
                className="block text-[#f7f2e6]"
                style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.18)' }}
              >
                {titleLine1}
              </motion.span>

              <motion.span
                variants={item}
                className="block text-[#f7f2e6]"
                style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.22)' }}
              >
                {titleLine2}
              </motion.span>
            </h1>

            {/* Buttons */}
            {ctas.length > 0 && (
              <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
                {ctas.map((cta, i) => (
                  <Link key={i} href={cta.href}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className={`inline-block cursor-pointer rounded-[2px] px-6 py-3 text-xs font-semibold tracking-widest transition-colors sm:px-8 sm:py-4 sm:text-sm ${cta.className}`}
                    >
                      {cta.label}
                    </motion.span>
                  </Link>
                ))}
              </motion.div>
            )}
          </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-0 right-0 hidden items-center gap-3 lg:flex"
        >
          <span className="font-heading text-[10px] uppercase tracking-[2px] text-white/40">
            {content.scrollLabel}
          </span>
          <div className="flex h-10 w-[1px] items-end overflow-hidden bg-white/10">
            <motion.div
              className="w-full bg-white/50"
              animate={{ height: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
