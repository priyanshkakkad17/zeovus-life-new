'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header({ site }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const brand = site?.brand || {};
  const navItems = (site?.nav?.items || []).filter((item) => item?.name);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    if (!href) return false;
    const path = href.split(/[?#]/)[0];
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-primary-light/10 bg-[#e8f5ed]/90 backdrop-blur-lg'
          : 'bg-[#e8f5ed]/75 backdrop-blur-md'
      }`}
    >
      {/* Main Navbar */}
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 sm:px-8 sm:h-[80px] lg:h-[90px] lg:px-12">
        {/* Left: Logo + Tagline */}
        <div className="flex min-w-0 items-center">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex shrink-0 items-center"
          >
            <Image
              src={brand.logo || '/logo.png'}
              alt={brand.logoAlt || 'Zeovus Life'}
              width={160}
              height={60}
              priority
              className="h-[46px] w-auto max-w-[120px] object-contain sm:h-[56px] sm:max-w-[140px] lg:h-[65px] lg:max-w-[160px]"
            />
          </Link>

          {brand.showTagline !== false && brand.tagline && (
            <>
              {/* Divider — shown on tablet, hidden through the lg/xl range where the nav
                  needs the full width (1280px is the target laptop viewport), back at 2xl. */}
              <div className="ml-4 hidden h-8 w-px shrink-0 bg-primary-dark/25 sm:block lg:hidden 2xl:ml-5 2xl:block 2xl:h-9" />

              {/* Tagline */}
              <p className="ml-4 hidden max-w-[180px] font-heading text-[11px] font-bold leading-[1.25] tracking-[0.04em] text-primary-dark/75 sm:block md:max-w-[220px] md:text-[12px] lg:hidden 2xl:ml-5 2xl:block 2xl:max-w-none 2xl:whitespace-nowrap 2xl:text-[15px]">
                {brand.tagline}
              </p>
            </>
          )}
        </div>

        {/* Desktop Navigation — compact through the lg/xl range (1024–1535px, includes the
            1280px target laptop), roomier only at 2xl (1536px+). */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5 2xl:gap-2">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`whitespace-nowrap rounded-md px-3 py-2.5 font-heading text-[12px] font-semibold uppercase tracking-[0.5px] transition-all duration-300 2xl:px-5 2xl:py-3 2xl:text-[13px] 2xl:tracking-[1px] ${
                  active
                    ? 'bg-primary-dark text-[#e8f5ed]'
                    : 'text-primary-dark hover:bg-[#d4ede0]/70'
                }`}
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className="ml-1 inline-block h-3 w-3" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center text-primary-dark lg:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden bg-[#e8f5ed]/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col border-t border-primary-light/20 py-4">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`mx-4 my-1 rounded-md px-5 py-4 font-heading text-[13px] font-medium uppercase tracking-[1px] transition-all duration-300 ${
                  active
                    ? 'bg-primary-dark text-[#e8f5ed]'
                    : 'text-primary-dark hover:bg-[#d4ede0]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}