'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header({ site }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);

  const brand = site?.brand || {};
  const navItems = (site?.nav?.items || []).filter((item) => item?.name);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The tagline only fits beside the English nav. Translated languages produce
  // longer nav labels, so we hide the tagline whenever the page isn't English.
  useEffect(() => {
    const readLang = () => {
      const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
      if (!match) return setIsEnglish(true);
      const parts = decodeURIComponent(match[1]).split('/');
      const target = parts[parts.length - 1];
      return setIsEnglish(!target || target === 'en');
    };
    readLang();
    const interval = setInterval(readLang, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isSearchOpen || searchTerm.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return undefined;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/products?search=${encodeURIComponent(searchTerm.trim())}&limit=8`, {
          signal: controller.signal,
        });
        const data = await response.json();
        if (!controller.signal.aborted) setSearchResults(data.products || []);
      } catch (error) {
        if (error.name !== 'AbortError') setSearchResults([]);
      } finally {
        if (!controller.signal.aborted) setIsSearching(false);
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [isSearchOpen, searchTerm]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const isActive = (href) => {
    if (!href) return false;
    const path = href.split(/[?#]/)[0];
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const solid = isScrolled || isMenuOpen || isSearchOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        solid
          ? 'bg-[#F8F8F8]/95 backdrop-blur-md shadow-[0_1px_0_rgba(31,64,21,0.08)]'
          : 'bg-transparent'
      }`}
    >
      {/* Main Navbar */}
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 sm:px-8 sm:h-[80px] lg:h-[90px] lg:px-12">
        {/* Left: Logo + Tagline */}
        <div className="flex min-w-0 flex-1 items-center lg:flex-none">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex shrink-0 items-center"
          >
            <Image
              src="/navbar_logo.png"
              alt={brand.logoAlt || 'Zeovus Life'}
              width={220}
              height={90}
              priority
              className={`h-[54px] w-auto max-w-[150px] object-contain sm:h-[68px] sm:max-w-[180px] lg:h-[80px] lg:max-w-[210px] transition-[filter] duration-500 ${solid ? '' : 'brightness-0 invert'}`}
            />
          </Link>

          {brand.showTagline !== false && brand.tagline && (
            <>
              {/* Divider — pairs with the tagline. Visible on all phones, hidden
                  through the lg–xl desktop range, and back at 2xl alongside the tagline. */}
              <div className={`ml-2.5 block h-7 w-px shrink-0 transition-colors duration-500 sm:ml-4 sm:h-8 lg:hidden 2xl:ml-5 2xl:block 2xl:h-9 ${solid ? 'bg-primary-dark/25' : 'bg-white/25'}`} />

              {/* Tagline: visible on all phones. Wraps to two lines on mobile so it
                  never overflows, single line on tablet, hidden through lg–xl, and
                  returns beside the nav at 2xl. */}
              <p
                translate="no"
                className={`notranslate ml-2.5 block min-w-0 flex-1 font-heading text-[10px] font-bold leading-[1.2] tracking-[0.04em] transition-colors duration-500 sm:ml-4 sm:max-w-[180px] sm:flex-none sm:truncate sm:whitespace-nowrap sm:text-[11px] md:max-w-[220px] md:text-[12px] lg:hidden 2xl:ml-5 2xl:block 2xl:max-w-none 2xl:overflow-visible 2xl:text-[13px] ${solid ? 'text-primary-dark/75' : 'text-white/80'}`}
              >
                {brand.tagline}
              </p>
            </>
          )}
        </div>

        {/* Desktop Navigation — compact through the lg/xl range (1024–1535px, includes the
            1280px target laptop), roomier only at 2xl (1536px+). */}
        <nav
          className={`hidden shrink-0 items-center lg:flex ${
            isEnglish ? 'gap-2 xl:gap-4 2xl:gap-5' : 'gap-2 2xl:gap-3'
          }`}
        >
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`whitespace-nowrap font-heading uppercase transition-colors duration-200 ${
                  isEnglish
                    ? 'text-[12px] font-bold tracking-[1px] 2xl:text-[13px] 2xl:tracking-[1.5px]'
                    : 'text-[11px] font-bold tracking-[0.5px] 2xl:text-[12px]'
                } ${
                  solid
                    ? active ? 'text-primary-light' : 'text-primary-dark hover:text-primary-light'
                    : active ? 'text-accent' : 'text-white/90 hover:text-accent'
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

        {/* Desktop controls (Search, Language, CTA) */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => { setIsSearchOpen((open) => !open); setIsMenuOpen(false); }}
              className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
                solid
                  ? isSearchOpen ? 'text-primary-light' : 'text-primary-dark hover:text-primary-light'
                  : isSearchOpen ? 'text-accent' : 'text-white/90 hover:text-accent'
              }`}
              aria-label="Search products"
              aria-expanded={isSearchOpen}
            >
              <Search size={18} strokeWidth={2} />
            </button>
            <div className={`transition-opacity duration-500 ${solid ? 'opacity-100' : 'opacity-80'}`}>
               <LanguageSwitcher variant="desktop" />
            </div>
          </div>
          
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-[42px] px-6 rounded-full bg-accent text-primary-dark font-heading text-[12px] font-bold uppercase tracking-[1px] hover:bg-[#ffdf97] transition-colors duration-200"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="ml-3 flex shrink-0 items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
            className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors ${
              solid
                ? isSearchOpen ? 'text-primary-light' : 'text-primary-dark hover:bg-primary-dark/5'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Search products"
            aria-expanded={isSearchOpen}
          >
            <Search size={21} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex h-11 w-11 shrink-0 items-center justify-center transition-colors ${
              solid ? 'text-primary-dark' : 'text-white'
            }`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Global product search panel */}
      {isSearchOpen && (
        <div className="border-t border-primary-light/15 bg-[#F8F8F8]/95 shadow-lg backdrop-blur-lg">
          <div className="mx-auto max-w-[1500px] px-5 py-4 sm:px-8 lg:px-12">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-0 h-5 w-5 text-primary-light" strokeWidth={1.8} />
              <input
                type="search"
                autoFocus
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search Nutraceuticals and Cosmetics products..."
                className="w-full border-b border-primary-dark/20 bg-transparent py-3 pl-8 pr-12 font-heading text-[15px] text-primary-dark outline-none placeholder:text-primary-dark/45 focus:border-primary-light"
                aria-label="Search Nutraceuticals and Cosmetics products"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-md text-primary-dark/60 transition-colors hover:bg-primary-dark/5 hover:text-primary-dark"
                aria-label="Close product search"
              >
                <X size={19} strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-3">
              {searchTerm.trim().length < 2 && (
                <p className="py-2 text-[12px] text-primary-dark/55">Type at least 2 characters to search all products.</p>
              )}
              {isSearching && (
                <p className="py-2 text-[12px] text-primary-dark/55">Searching products...</p>
              )}
              {!isSearching && searchTerm.trim().length >= 2 && searchResults.length === 0 && (
                <p className="py-2 text-[12px] text-primary-dark/55">No products found for “{searchTerm.trim()}”.</p>
              )}
              {!isSearching && searchResults.length > 0 && (
                <div className="grid max-h-[330px] gap-2 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4">
                  {searchResults.map((product) => {
                    const productPath = product.division === 'cosmetics' ? '/cosmetics' : '/nutraceuticals';
                    const divisionLabel = product.division === 'cosmetics' ? 'Cosmetics' : 'Nutraceuticals';
                    return (
                      <Link
                        key={product.id}
                        href={`${productPath}/products/${product.id}`}
                        onClick={closeSearch}
                        className="group rounded-md border border-primary-dark/10 bg-white/75 px-4 py-3 transition-colors hover:border-primary-light/40 hover:bg-white"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-heading text-[9px] font-bold uppercase tracking-[1.2px] ${product.division === 'cosmetics' ? 'text-pink-700' : 'text-primary-light'}`}>
                            {divisionLabel}
                          </span>
                          <span className="text-[10px] text-neutral-400">{product.category_name}</span>
                        </div>
                        <p className="mt-2 line-clamp-2 font-heading text-[13px] font-semibold leading-snug text-primary-dark group-hover:text-primary-light">
                          {product.name}
                        </p>
                        {(product.primary_benefit || product.description || product.concerns_addressed) && (
                          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-neutral-500">
                            {product.primary_benefit || product.description || product.concerns_addressed}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <div
        className={`bg-[#F8F8F8]/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'max-h-[85vh] overflow-y-auto' : 'max-h-0 overflow-hidden'
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
                className={`mx-4 my-1 rounded-md px-5 py-4 font-heading text-[13px] font-bold uppercase tracking-[1px] transition-colors duration-300 ${
                  active
                    ? 'bg-primary-dark text-[#F8F8F8]'
                    : 'text-primary-dark hover:bg-primary-dark/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          <div className="mx-4 mt-2 mb-4">
             <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center h-12 w-full rounded-full bg-accent text-primary-dark font-heading text-[13px] font-bold uppercase tracking-[1px] hover:bg-[#ffdf97]"
              >
                Enquire Now
              </Link>
          </div>
          
          <LanguageSwitcher variant="mobile" />
        </div>
      </div>
    </header>
  );
}