'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const SOCIAL_PATHS = {
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  linkedin:
    'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.121 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.376-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
};

const FALLBACK_SOCIALS = [
  {
    platform: 'linkedin',
    href: 'https://www.linkedin.com/company/zeovus-ventures-pvt-ltd/',
  },
  {
    platform: 'instagram',
    href: 'https://www.instagram.com/zeovusworld?igsh=MWs2ZWszemxmOTV3aw==',
  },
  {
    platform: 'youtube',
    href: 'https://youtube.com',
  },
];

export default function Footer({ site, hideCta = false }) {
  const currentYear = 2026;

  const footer = site?.footer || {};
  const brand = site?.brand || {};
  const configuredSocials = site?.social?.items || [];
  const hasConfiguredSocials = configuredSocials.some((item) => item?.href && item.href !== '#');
  const socials = hasConfiguredSocials ? configuredSocials : FALLBACK_SOCIALS;

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Company', href: '/our-company' },
    { name: 'Capabilities', href: '/capabilities' },
    { name: 'Nutraceuticals', href: '/nutraceuticals' },
    { name: 'Cosmetics', href: '/cosmetics' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const nutraceuticalCategories = [
    { name: 'Healthy Ageing', href: '/nutraceuticals?category=healthy-ageing' },
    { name: 'Multivitamins', href: '/nutraceuticals?category=multivitamins' },
    { name: 'Gut Health', href: '/nutraceuticals?category=gut-health' },
    { name: "Women's Health", href: '/nutraceuticals?category=womens-health' },
    { name: "Men's Health", href: '/nutraceuticals?category=mens-health' },
    { name: 'Brain, Stress & Sleep', href: '/nutraceuticals?category=brain-stress-sleep' },
    { name: 'Immunity & Respiratory', href: '/nutraceuticals?category=immunity' },
    { name: 'Joint & Bone Health', href: '/nutraceuticals?category=joint-bone' },
  ];

  const cosmeticsCategories = [
    { name: 'Skincare', href: '/cosmetics?category=skincare' },
    { name: 'Haircare', href: '/cosmetics?category=haircare' },
    { name: 'Sun Care', href: '/cosmetics?category=sun-care' },
    { name: 'Body Care', href: '/cosmetics?category=body-care' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Terms of Use', href: '/terms' },
  ];

  return (
    <footer className="relative w-full text-white overflow-hidden bg-[#0D2E25]">
      
      {/* ═══════════════════ TOP CTA BANNER: LET'S CREATE TOGETHER ═══════════════════ */}
      {!hideCta && (
        <div>
          {/* Top gap above CTA banner: Matches the section above (#F4F6F0) */}
          <div className="w-full bg-[#EBF0E8] pt-12 sm:pt-16 lg:pt-20">
            <section className="relative w-full bg-[#0B2A1F] text-white py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 overflow-hidden shadow-2xl">
              
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#15A859]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-[1360px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                
                {/* Left Column: Eyebrow + Headline */}
                <div className="max-w-xl">
                  <p className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-[#15A859] mb-4 flex items-center gap-2">
                    <span className="w-5 h-[1.5px] bg-[#15A859]" />
                    <span>LET&apos;S CREATE TOGETHER</span>
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.12] text-white tracking-tight">
                    Your next breakthrough<br className="hidden sm:inline" /> product starts here.
                  </h2>
                </div>

                {/* Right Column: Paragraph + Gold Pill Button */}
                <div className="flex flex-col items-start lg:items-start max-w-md">
                  <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-6 font-normal">
                    From formulation to final product — partner with a manufacturer that delivers science, quality, and scale.
                  </p>
                  
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E5B54F] hover:bg-[#d8a840] text-[#0D2111] font-heading font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(229,181,79,0.3)] hover:shadow-[0_6px_25px_rgba(229,181,79,0.4)] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Start a Conversation</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </Link>
                </div>

              </div>

            </section>
          </div>

          {/* Bottom gap below CTA banner: Matches the exact misty sky header color of footer.png (#F6EFE2) */}
          <div className="w-full bg-[#F6EFE2] h-12 sm:h-16 lg:h-20" />
        </div>
      )}

      {/* ═══════════════════ MAIN FOOTER WITH FULL-BLEED LANDSCAPE ARTWORK ═══════════════════ */}
      <div className="relative w-full overflow-hidden">
        
        {/* Full-Bleed Artwork Image as Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src="/images/footer.png"
            alt="Zeovus landscape footer background"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Botanical Leaf Stick - Right Bottom Corner */}
        <div className="pointer-events-none absolute right-2 bottom-8 z-20 block sm:right-3 sm:bottom-10 md:right-4 md:bottom-12 lg:right-6 xl:right-8">
          <div className="relative w-[36px] h-[72px] sm:w-[48px] sm:h-[96px] md:w-[60px] md:h-[120px] lg:w-[72px] lg:h-[144px] xl:w-[84px] xl:h-[168px] opacity-95 brightness-110">
            <Image
              src="/images/stick with flowe.png"
              alt="Botanical twig accent"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 w-full">
          
          {/* TOP MISTY SKY HEADER ROW */}
          <div className="pt-12 sm:pt-16 pb-16 sm:pb-24 lg:pb-28 px-6 sm:px-10 lg:px-16">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-10">
                {/* Serif Title + Accent Line */}
                <div>
                  <h3 className="font-serif text-[#0C2D22] text-2xl sm:text-3xl lg:text-[32px] font-medium leading-[1.15] tracking-tight">
                    Better Nutrition<br />for a Healthier Tomorrow
                  </h3>
                  <div className="w-12 h-[2.5px] bg-[#89BA64] mt-3 rounded-full" />
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-[1px] h-14 bg-[#0C2D22]/20" />

                {/* Subtitle */}
                <p className="font-sans text-[#0C2D22]/80 text-sm sm:text-base leading-relaxed max-w-sm font-normal">
                  Partnering for a healthier world through<br className="hidden sm:inline" /> science, nature and innovation.
                </p>
              </div>


            </div>
          </div>

          {/* MAIN 6-COLUMN FOOTER CONTENT OVER GREEN HILL */}
          <div className="pt-2 sm:pt-4 pb-12 px-6 sm:px-10 lg:px-16">
            <div className="max-w-[1440px] mx-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8 pb-10">
                
                {/* Column 1: Brand Info & Address (Col Span 3) */}
                <div className="lg:col-span-3 flex flex-col items-start">
                  <Link href="/" className="block mb-3.5 hover:opacity-85 transition-opacity">
                    <Image
                      src="/navbar_logo.png"
                      alt={brand.logoAlt || 'Zeovus Life'}
                      width={150}
                      height={55}
                      className="brightness-0 invert w-[130px] h-auto object-contain object-left"
                    />
                  </Link>
                  
                  <p className="text-white/80 text-xs font-medium mb-3">
                    Science. Nature. A Healthier Tomorrow.
                  </p>

                  <p className="text-[#9CCD62] font-heading font-bold text-xs tracking-wider mb-2">
                    INDIA &nbsp;|&nbsp; USA &nbsp;|&nbsp; QATAR
                  </p>

                  <div className="text-white/70 text-xs leading-relaxed mb-3">
                    <p className="font-semibold text-white/90 mb-1">Zeovus Ventures Private Limited</p>
                    <p>Unit No. 419, 4th Floor, Master Mind V</p>
                    <p>Royal Palms Estate, Aarey Milk Colony</p>
                    <p>Goregaon (East), Mumbai - 400065</p>
                    <p>India</p>
                  </div>

                  <a
                    href="mailto:info@zeovuslife.com"
                    className="text-[#9CCD62] hover:underline text-xs font-medium mb-5"
                  >
                    info@zeovuslife.com
                  </a>

                  {/* Social Icons Row */}
                  <div className="flex items-center gap-2.5 mt-auto">
                    {socials.map((item, i) => (
                      <a
                        key={`${item.platform}-${i}`}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-white/30 text-white/85 flex items-center justify-center hover:border-[#9CCD62] hover:text-[#9CCD62] hover:bg-white/5 transition-all duration-200"
                        aria-label={item.platform}
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={SOCIAL_PATHS[item.platform] || SOCIAL_PATHS.linkedin} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Column 2: COMPANY (Col Span 2) */}
                <div className="lg:col-span-2">
                  <h4 className="font-heading font-bold text-xs text-[#9CCD62] uppercase tracking-wider mb-4">
                    COMPANY
                  </h4>
                  <ul className="space-y-2.5">
                    {quickLinks.map((link, i) => (
                      <li key={`${link.name}-${i}`}>
                        <Link
                          href={link.href}
                          className="text-white/80 hover:text-white text-xs sm:text-[13px] font-normal transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: NUTRACEUTICALS (Col Span 2) */}
                <div className="lg:col-span-2">
                  <h4 className="font-heading font-bold text-xs text-[#9CCD62] uppercase tracking-wider mb-4">
                    NUTRACEUTICALS
                  </h4>
                  <ul className="space-y-2.5">
                    {nutraceuticalCategories.map((cat, i) => (
                  <li key={`${cat.name}-${i}`}>
                    <Link
                      href={cat.href}
                      className="text-white/80 hover:text-white text-xs sm:text-[13px] font-normal transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                    ))}
                  </ul>
                </div>

                {/* Column 4: COSMETICS (Col Span 1.5 -> 2) */}
                <div className="lg:col-span-2">
                  <h4 className="font-heading font-bold text-xs text-[#9CCD62] uppercase tracking-wider mb-4">
                    COSMETICS
                  </h4>
                  <ul className="space-y-2.5 mb-8">
                    {cosmeticsCategories.map((cat, i) => (
                  <li key={`${cat.name}-${i}`}>
                    <Link
                      href={cat.href}
                      className="text-white/80 hover:text-white text-xs sm:text-[13px] font-normal transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                    ))}
                  </ul>

                  {/* GROUP SECTION */}
                  <h4 className="font-heading font-bold text-xs text-[#9CCD62] uppercase tracking-wider mb-4">
                    GROUP
                  </h4>
                  <div className="space-y-4">
                    <div className="block">
                      <Image
                        src="/images/zeovus_logo.png"
                        alt="zeovus"
                        width={105}
                        height={32}
                        className="brightness-0 invert w-[95px] h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="block">
                      <Image
                        src="/footer_food_logo.webp"
                        alt="zeovus food"
                        width={110}
                        height={36}
                        className="brightness-0 invert w-[100px] h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </div>

                {/* Column 5: STAY CONNECTED (Col Span 3) */}
                <div className="lg:col-span-3 flex flex-col">
                  <h4 className="font-heading font-bold text-xs text-[#9CCD62] uppercase tracking-wider mb-2">
                    STAY CONNECTED
                  </h4>
                  
                  <h5 className="font-serif text-white text-lg font-normal mb-2">
                    Get the latest updates
                  </h5>

                  <p className="text-white/70 text-xs leading-relaxed mb-4 max-w-xs font-normal">
                    Subscribe to our newsletter for product updates, insights and more.
                  </p>

                  {/* Newsletter Form */}
                  <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center mb-4 max-w-xs w-full">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-white/5 border border-white/20 rounded-full px-4 py-2.5 pr-11 text-xs text-white placeholder-white/45 focus:outline-none focus:border-[#9CCD62] transition-colors"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="absolute right-1 w-7 h-7 rounded-full bg-[#9CCD62] hover:bg-white text-[#08261D] flex items-center justify-center transition-colors shadow-sm"
                    >
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </button>
                  </form>

                  {/* Legal Links under Email Input */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/70 pt-1">
                    {legalLinks.map((link, i) => (
                      <span key={`${link.name}-${i}`} className="inline-flex items-center gap-3">
                        {i > 0 && <span className="text-white/20">|</span>}
                        <Link href={link.href} className="hover:text-[#9CCD62] transition-colors">
                          {link.name}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* ═══════════════════ BOTTOM COPYRIGHT BAR ═══════════════════ */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
                <p>© {currentYear} Zeovus Ventures Private Limited. All rights reserved.</p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </footer>
  );
}
