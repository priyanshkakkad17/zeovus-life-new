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

const FALLBACK_SOCIALS = [
  {
    platform: 'instagram',
    href: 'https://www.instagram.com/zeovusworld?igsh=MWs2ZWszemxmOTV3aw==',
  },
  {
    platform: 'linkedin',
    href: 'https://www.linkedin.com/company/zeovus-ventures-pvt-ltd/',
  },
];

const SOCIAL_LABELS = {
  twitter: 'Twitter',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  youtube: 'YouTube',
};

const GROUP_LOGOS = {
  'Zeovus Group': {
    src: '/Zeovus_new_logo-removebg-preview.png',
    width: 2172,
    height: 724,
    className: 'h-8 brightness-0 invert',
  },
  'Zeovus Food': {
    src: '/footer_food_logo.webp',
    width: 1536,
    height: 1024,
    className: 'h-16 brightness-0 invert',
  },
};

export default function Footer({ site, hideCta = false }) {
  const currentYear = new Date().getFullYear();

  const cta = site?.footerCta || {};
  const footer = site?.footer || {};
  const brand = site?.brand || {};
  const contact = site?.contactInfo || {};
  const configuredSocials = site?.social?.items || [];
  const hasConfiguredSocials = configuredSocials.some((item) => item?.href && item.href !== '#');
  const socials = (hasConfiguredSocials ? configuredSocials : FALLBACK_SOCIALS).filter(
    (item) => item?.href && item.href !== '#'
  );

  const officeCountries = footer.officeCountries || ['India', 'USA', 'Qatar'];
  const companyName = footer.companyName || brand.legalName || 'Zeovus Ventures Private Limited';
  const addressLines = (contact.address
    ? contact.address.split('\n')
    : [
        'Unit No. 419, 4th Floor, Master Mind V',
        'Royal Palms Estate, Aarey Milk Colony',
        'Goregaon (East), Mumbai - 400065',
        'India',
      ]
  ).map((line) => line.trim()).filter(Boolean);

  const configuredQuickLinks = footer.companyLinks || [];
  const quickLinks = configuredQuickLinks.some((link) => link.href === '/faq')
    ? configuredQuickLinks
    : [...configuredQuickLinks, { name: 'FAQ', href: '/faq' }];
  const nutraceuticalCategories = footer.nutraceuticalsLinks || [];
  const cosmeticsCategories = footer.cosmeticsLinks || [];
  const groupLinks = footer.groupLinks || [];
  const configuredLegalLinks = footer.legalLinks || [];
  const legalLinks = configuredLegalLinks.length > 0
    ? configuredLegalLinks.map((link) => {
        if (link?.name === 'Privacy Policy' && (!link.href || link.href === '#')) {
          return { ...link, href: '/privacy-policy' };
        }
        if (link?.name === 'Terms' && (!link.href || link.href === '#' || link.href === '/terms')) {
          return { ...link, name: 'Cookie Policy', href: '/cookie-policy' };
        }
        return link;
      })
    : [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
      ];

  return (
    <footer className="relative overflow-hidden">

      {/* ═══════════════════ CURVED TOP CTA SECTION ═══════════════════ */}
      {cta.enabled !== false && !hideCta && (
      <div className="relative bg-[#FFF5D1]">
        {/* Wave separator at bottom matching footer primary dark */}
        <svg className="absolute -bottom-px left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40C240 80 480 100 720 80C960 60 1200 20 1440 40V101H0V40Z" fill="#1F4015"/>
        </svg>

        <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-20 pb-32 md:pt-28 md:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* CTA Card */}
            <div className="relative bg-gradient-to-br from-[#1F4015] to-[#1A475C] rounded-[40px] p-10 md:p-16 overflow-hidden">
              
              {/* Decorative curves inside card */}
              <svg className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.08] pointer-events-none" viewBox="0 0 400 400" fill="none">
                <circle cx="350" cy="50" r="150" stroke="#FAD563" strokeWidth="1"/>
                <circle cx="350" cy="50" r="100" stroke="#FAD563" strokeWidth="0.8"/>
                <circle cx="350" cy="50" r="50" stroke="#FAD563" strokeWidth="0.6"/>
                <path d="M200 0 Q350 100 300 250" stroke="#FAD563" strokeWidth="0.8" fill="none"/>
                <path d="M250 0 Q400 80 380 200" stroke="#FAD563" strokeWidth="0.6" fill="none"/>
              </svg>

              <div className="relative z-10 text-center max-w-2xl mx-auto">
                {cta.eyebrow && (
                  <p className="text-[#9CCD62] text-[12px] font-semibold tracking-[0.35em] uppercase mb-4">
                    {cta.eyebrow}
                  </p>
                )}
                <h3 className="font-display text-[32px] md:text-[44px] font-bold text-[#FFF5D1] leading-[1.15] tracking-tight mb-6">
                  {cta.heading || 'Your next breakthrough product starts here.'}
                </h3>
                <p className="text-white/80 text-[16px] md:text-[18px] leading-[1.7] mb-10">
                  {cta.body || 'From formulation to final product — partner with a manufacturer that delivers science, quality, and scale.'}
                </p>
                <Link
                  href={cta.buttonHref || '/contact'}
                  className="group inline-flex items-center gap-3 px-9 py-4 bg-[#FAD563] text-[#1F4015] text-[13px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-[#FFD374] hover:shadow-[0_8px_40px_rgba(250,213,99,0.35)] transition-all duration-300 hover:-translate-y-1"
                >
                  {cta.buttonLabel || 'Enquire Now'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      )}

      {/* ═══════════════════ MAIN FOOTER ═══════════════════ */}
      <div className="relative bg-[#1F4015]">
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-10 pb-16 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-6">

            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-5">
                <Image
                  src="/navbar_logo.png"
                  alt={brand.logoAlt || 'Zeovus Life'}
                  width={160}
                  height={60}
                  className="h-auto w-[140px] object-contain brightness-0 invert"
                />
              </Link>
              {footer.brandBlurb && (
                <p className="text-[#FFF5D1]/60 text-[14px] leading-[1.8] mb-7 max-w-[270px]">
                  {footer.brandBlurb}
                </p>
              )}

              {/* ── Address block (India | USA | Qatar) ── */}
              <div className="mb-7 max-w-[280px]">
                {officeCountries.length > 0 && (
                  <p className="mb-4 flex flex-wrap items-center gap-x-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#9CCD62]">
                    {officeCountries.map((country, i) => (
                      <span key={`${country}-${i}`} className="flex items-center gap-2">
                        {i > 0 && <span className="text-white/20">|</span>}
                        {country}
                      </span>
                    ))}
                  </p>
                )}

                <p className="mb-2 text-[15px] font-semibold text-[#FFF5D1]">{companyName}</p>

                {addressLines.length > 0 && (
                  <address className="not-italic text-[14px] leading-[1.9] text-[#FFF5D1]/60">
                    {addressLines.map((line, i) => (
                      <span key={`addr-${i}`} className="block">{line}</span>
                    ))}
                  </address>
                )}

                {(contact.phone || contact.email) && (
                  <div className="mt-4 space-y-1.5">
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        className="block text-[14px] font-semibold text-[#FAD563] transition-colors hover:text-[#FFF5D1]"
                      >
                        {contact.phone}
                      </a>
                    )}
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="block text-[14px] font-semibold text-[#FAD563] transition-colors hover:text-[#FFF5D1]"
                      >
                        {contact.email}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Social Icons - pill shape */}
              {socials.length > 0 && (
                <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-black/10 border border-[#FFF5D1]/10">
                  {socials.map((item, i) => (
                    <a
                      key={`${item.platform}-${i}`}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#FAD563]/20 transition-all duration-300"
                      aria-label={SOCIAL_LABELS[item.platform] || item.platform}
                    >
                      <svg className="w-4 h-4 text-[#FFF5D1]/60 hover:text-[#FAD563] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d={SOCIAL_PATHS[item.platform] || SOCIAL_PATHS.linkedin} />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9CCD62] mb-5">
                {footer.companyHeading}
              </p>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <li key={`${link.name}-${i}`}>
                    <Link href={link.href || '/'} className="text-[#FFF5D1]/70 text-[14px] hover:text-[#FAD563] transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutraceuticals */}
            <div className="lg:col-span-3">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9CCD62] mb-5">
                {footer.nutraceuticalsHeading}
              </p>
              <ul className="space-y-3">
                {nutraceuticalCategories.map((cat, i) => (
                  <li key={`${cat.name}-${i}`}>
                    <Link
                      href={cat.href || '/nutraceuticals'}
                      className="text-[#FFF5D1]/70 text-[14px] hover:text-[#FAD563] transition-colors duration-200"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cosmetics */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9CCD62] mb-5">
                {footer.cosmeticsHeading}
              </p>
              <ul className="space-y-3">
                {cosmeticsCategories.map((cat, i) => (
                  <li key={`${cat.name}-${i}`}>
                    <Link
                      href={cat.href || '/cosmetics'}
                      className="text-[#FFF5D1]/70 text-[14px] hover:text-[#FAD563] transition-colors duration-200"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Group */}
            <div className="lg:col-span-1">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9CCD62] mb-5">
                {footer.groupHeading}
              </p>
              <ul className="space-y-3">
                {groupLinks.map((link, i) => {
                  const logo = GROUP_LOGOS[link.name];
                  const content = logo ? (
                    <Image
                      src={logo.src}
                      alt={link.name}
                      width={logo.width}
                      height={logo.height}
                      className={`${logo.className} w-auto max-w-[140px] object-contain`}
                    />
                  ) : link.name;

                  return (
                    <li key={`${link.name}-${i}`}>
                      {link.href ? (
                        <a
                          href={link.href}
                          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          aria-label={link.name}
                          className="inline-flex items-center text-[#FFF5D1]/70 text-[14px] whitespace-nowrap hover:text-[#FAD563] transition-colors"
                        >
                          {content}
                        </a>
                      ) : (
                        <span className="inline-flex items-center text-[#FFF5D1]/70 text-[14px] whitespace-nowrap" aria-label={logo ? link.name : undefined}>
                          {content}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* ═══════════════════ BOTTOM BAR ═══════════════════ */}
        <div className="bg-[#122B0B]">
          {/* Wave top */}
          <svg className="w-full h-6" viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 24H1440V0C1440 0 1320 12 1080 12C840 12 720 0 480 0C240 0 0 12 0 12V24Z" fill="#122B0B"/>
          </svg>
          
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-[#FFF5D1]/50 text-[12px]">
                {(footer.copyright || '').replace('{year}', String(currentYear))}
              </p>
              <div className="flex items-center gap-5 text-[12px]">
                {legalLinks.map((link, i) => (
                  <span key={`${link.name}-${i}`} className="flex items-center gap-5">
                    {i > 0 && <span className="w-1 h-1 rounded-full bg-[#FFF5D1]/30" />}
                    <Link href={link.href || '#'} className="text-[#FFF5D1]/50 hover:text-[#FAD563] transition-colors">
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
