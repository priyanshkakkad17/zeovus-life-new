'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SOCIAL_PATHS = {
  twitter:
    'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  linkedin:
    'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  facebook:
    'M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.121 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.376-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
};

export default function Footer({ site }) {
  const currentYear = new Date().getFullYear();

  const cta = site?.footerCta || {};
  const footer = site?.footer || {};
  const brand = site?.brand || {};
  const contact = site?.contactInfo || {};
  const socials = (site?.social?.items || []).filter((item) => item?.href && item.href !== '#');

  const quickLinks = footer.companyLinks || [];
  const nutraceuticalCategories = footer.nutraceuticalsLinks || [];
  const cosmeticsCategories = footer.cosmeticsLinks || [];
  const groupLinks = footer.groupLinks || [];
  const legalLinks = footer.legalLinks || [];

  return (
    <footer className="relative overflow-hidden">

      {/* ═══════════════════ CURVED TOP CTA SECTION ═══════════════════ */}
      {cta.enabled !== false && (
      <div className="relative bg-[#f5f9f6]">
        {/* Wave separator at bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40C240 80 480 100 720 80C960 60 1200 20 1440 40V100H0V40Z" fill="#162E10"/>
        </svg>

        <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-20 pb-32 md:pt-28 md:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* CTA Card with curved design */}
            <div className="relative bg-gradient-to-br from-primary-dark via-[#1a3812] to-[#0D1F09] rounded-[40px] p-10 md:p-16 overflow-hidden">
              
              {/* Decorative curves inside card */}
              <svg className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none" viewBox="0 0 400 400" fill="none">
                <circle cx="350" cy="50" r="150" stroke="white" strokeWidth="1"/>
                <circle cx="350" cy="50" r="100" stroke="white" strokeWidth="0.8"/>
                <circle cx="350" cy="50" r="50" stroke="white" strokeWidth="0.6"/>
                <path d="M200 0 Q350 100 300 250" stroke="white" strokeWidth="0.8" fill="none"/>
                <path d="M250 0 Q400 80 380 200" stroke="white" strokeWidth="0.6" fill="none"/>
              </svg>

              {/* Flowing organic shape */}
              <svg className="absolute bottom-0 left-0 w-[350px] h-[250px] opacity-[0.07] pointer-events-none" viewBox="0 0 350 250" fill="none">
                <path d="M0 250 Q80 180 150 200 T300 150 T350 50" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M0 200 Q100 150 180 170 T320 100" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="150" cy="200" r="6" fill="white" opacity="0.6"/>
                <circle cx="300" cy="150" r="4" fill="white" opacity="0.6"/>
                <circle cx="180" cy="170" r="4" fill="white" opacity="0.5"/>
              </svg>

              {/* Green glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary-light/[0.06] blur-[80px] pointer-events-none"></div>

              <div className="relative z-10 text-center max-w-xl mx-auto">
                {cta.eyebrow && (
                  <p className="text-primary-light text-[11px] font-semibold tracking-[0.35em] uppercase mb-4">
                    {cta.eyebrow}
                  </p>
                )}
                <h3 className="font-display text-[28px] md:text-[38px] font-bold text-white leading-[1.15] tracking-tight mb-5">
                  {cta.heading}
                </h3>
                <p className="text-white/60 text-[15px] md:text-[16px] leading-[1.7] mb-9">
                  {cta.body}
                </p>
                {cta.buttonLabel && (
                  <Link
                    href={cta.buttonHref || '/contact'}
                    className="group inline-flex items-center gap-3 px-9 py-4 bg-primary-light text-white text-[13px] font-semibold uppercase tracking-[0.15em] rounded-full hover:bg-[#12964E] transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_40px_rgba(21,168,89,0.3)]"
                  >
                    {cta.buttonLabel}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      )}

      {/* ═══════════════════ MAIN FOOTER ═══════════════════ */}
      <div className="relative bg-[#162E10]">

        {/* Organic decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.04]">
          <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
            <path d="M250 50 C350 50 450 150 450 250 C450 350 350 450 250 450 C150 450 50 350 50 250 C50 150 150 50 250 50Z" stroke="white" strokeWidth="1"/>
            <path d="M250 100 C320 100 400 180 400 250 C400 320 320 400 250 400 C180 400 100 320 100 250 C100 180 180 100 250 100Z" stroke="white" strokeWidth="0.8"/>
            <path d="M180 120 Q250 80 320 150 T350 300 Q300 400 200 380 T100 250 Q120 150 180 120Z" stroke="white" strokeWidth="0.6" fill="none"/>
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none opacity-[0.03]">
          <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
            <ellipse cx="100" cy="300" rx="200" ry="150" stroke="white" strokeWidth="1" fill="none"/>
            <ellipse cx="120" cy="280" rx="150" ry="100" stroke="white" strokeWidth="0.8" fill="none"/>
          </svg>
        </div>

        {/* Main content */}
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-6 pb-16 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-6">

            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-5 bg-white rounded-[16px] px-3 py-1.5 shadow-sm">
                <Image
                  src={brand.logo || '/logo.png'}
                  alt={brand.logoAlt || 'Zeovus Life'}
                  width={160}
                  height={60}
                  className="h-auto w-[100px] object-contain"
                />
              </Link>
              <p className="text-neutral-400 text-[14px] leading-[1.8] mb-7 max-w-[270px]">
                {footer.brandBlurb}
              </p>

              {/* Social Icons - pill shape */}
              {socials.length > 0 && (
                <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/[0.04] border border-white/10">
                  {socials.map((item, i) => (
                    <a
                      key={`${item.platform}-${i}`}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary-light/20 transition-all duration-300"
                      aria-label={item.platform}
                    >
                      <svg className="w-4 h-4 text-neutral-400 hover:text-primary-light transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d={SOCIAL_PATHS[item.platform] || SOCIAL_PATHS.linkedin} />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary-light/60 mb-5">
                {footer.companyHeading}
              </p>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <li key={`${link.name}-${i}`}>
                    <Link href={link.href || '/'} className="text-neutral-400 text-[14px] hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutraceuticals */}
            <div className="lg:col-span-3">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary-light/60 mb-5">
                {footer.nutraceuticalsHeading}
              </p>
              <ul className="space-y-3">
                {nutraceuticalCategories.map((cat, i) => (
                  <li key={`${cat.name}-${i}`}>
                    <Link
                      href={cat.href || '/nutraceuticals'}
                      className="text-neutral-400 text-[14px] hover:text-white transition-colors duration-200"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cosmetics */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary-light/60 mb-5">
                {footer.cosmeticsHeading}
              </p>
              <ul className="space-y-3">
                {cosmeticsCategories.map((cat, i) => (
                  <li key={`${cat.name}-${i}`}>
                    <Link
                      href={cat.href || '/cosmetics'}
                      className="text-neutral-400 text-[14px] hover:text-white transition-colors duration-200"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact */}
              {(contact.email || contact.phone || contact.address) && (
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary-light/60 mb-4">
                    {footer.contactHeading}
                  </p>
                  <div className="space-y-2">
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="block text-neutral-400 text-[14px] hover:text-white transition-colors">
                        {contact.email}
                      </a>
                    )}
                    {contact.phone && (
                      <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="block text-neutral-400 text-[14px] hover:text-white transition-colors">
                        {contact.phone}
                      </a>
                    )}
                    {contact.address && (
                      <p className="whitespace-pre-line text-neutral-400 text-[14px] leading-[1.7]">{contact.address}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Group */}
            <div className="lg:col-span-1">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary-light/60 mb-5">
                {footer.groupHeading}
              </p>
              <ul className="space-y-3">
                {groupLinks.map((link, i) => (
                  <li key={`${link.name}-${i}`}>
                    {link.href ? (
                      <a
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-neutral-400 text-[14px] whitespace-nowrap hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <span className="text-neutral-400 text-[14px] whitespace-nowrap">{link.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ═══════════════════ BOTTOM BAR ═══════════════════ */}
        <div className="bg-[#0A1A06]">
          {/* Wave top */}
          <svg className="w-full h-6" viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 24H1440V0C1440 0 1320 12 1080 12C840 12 720 0 480 0C240 0 0 12 0 12V24Z" fill="#0A1A06"/>
            <path d="M0 24V12C0 12 240 0 480 0C720 0 840 12 1080 12C1320 12 1440 0 1440 0" stroke="white" strokeWidth="0.3" opacity="0.1" fill="none"/>
          </svg>
          
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-neutral-600 text-[12px]">
                {(footer.copyright || '').replace('{year}', String(currentYear))}
              </p>
              <div className="flex items-center gap-5 text-[12px]">
                {legalLinks.map((link, i) => (
                  <span key={`${link.name}-${i}`} className="flex items-center gap-5">
                    {i > 0 && <span className="w-1 h-1 rounded-full bg-neutral-700" />}
                    <Link href={link.href || '#'} className="text-neutral-600 hover:text-neutral-400 transition-colors">
                      {link.name}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
