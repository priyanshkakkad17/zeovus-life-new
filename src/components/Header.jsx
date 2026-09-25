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
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Language check
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#EBF1EB]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
          : 'bg-[#EBF1EB]'
      }`}
    >
      {/* Main Navbar */}
      <div className="mx-auto flex h-[74px] sm:h-[84px] lg:h-[92px] w-full max-w-[1720px] items-center justify-between px-4 sm:px-6 lg:px-10">
        
        {/* Left: Brand Logo + Vertical Divider + Tagline */}
        <div className="flex min-w-0 items-center">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex shrink-0 items-center mr-3 sm:mr-4 lg:mr-5"
          >
            <Image
              src="/navbar_logo.png"
              alt={brand.logoAlt || 'Zeovus Life'}
              width={220}
              height={70}
              priority
              className="h-[46px] sm:h-[54px] lg:h-[62px] w-auto object-contain"
            />
          </Link>

          {/* Vertical Separator Line */}
          <div className="hidden sm:block h-8 sm:h-9 lg:h-10 w-[1.5px] bg-[#0B281E]/30 shrink-0 mx-2 sm:mx-3 lg:mx-4" />

          {/* Tagline */}
          <p
            translate="no"
            className="notranslate hidden sm:block font-heading text-[13px] lg:text-[14px] font-semibold text-[#0B281E]/80 tracking-normal whitespace-nowrap"
          >
            {brand.tagline || 'Committed to better tomorrow'}
          </p>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3">
          {navItems.map((item) => {
            const active = isActive(item.href);

            if (active) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-md bg-[#1B3B2B] text-white font-heading text-[12px] 2xl:text-[13px] font-bold tracking-[0.08em] uppercase transition-colors shadow-sm"
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-1.5 font-heading text-[12px] 2xl:text-[13px] font-bold tracking-[0.08em] uppercase text-[#0B281E] hover:text-[#15A859] transition-colors whitespace-nowrap inline-flex items-center gap-1"
              >
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <ChevronDown className="h-3.5 w-3.5 text-[#0B281E]/70" strokeWidth={2.5} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search + Language Dropdown + Enquire Now Button */}
        <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0">
          
          {/* Search Glass Icon */}
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen((open) => !open);
              setIsMenuOpen(false);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#0B281E] hover:text-[#15A859] hover:bg-black/5 transition-colors"
            aria-label="Search products"
          >
            <Search size={19} strokeWidth={2.2} />
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Enquire Now Pill Button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#1B3B2B] hover:bg-[#15A859] text-white px-5 sm:px-6 py-2.5 sm:py-3 font-heading text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>ENQUIRE NOW</span>
            <span className="ml-1.5 font-sans text-sm leading-none">&rarr;</span>
          </Link>
        </div>

        {/* Mobile Controls (Search + Hamburger) */}
        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(true);
              setIsMenuOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-md text-[#0B281E] hover:bg-black/5 transition-colors"
            aria-label="Search products"
            aria-expanded={isSearchOpen}
          >
            <Search size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center text-[#0B281E] hover:bg-black/5 rounded-md transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Global product search panel */}
      {isSearchOpen && (
        <div className="border-t border-[#0B281E]/10 bg-[#EBF1EB]/95 shadow-lg backdrop-blur-lg">
          <div className="mx-auto max-w-[1500px] px-5 py-4 sm:px-8 lg:px-12">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-0 h-5 w-5 text-[#15A859]" strokeWidth={2} />
              <input
                type="search"
                autoFocus
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search Nutraceuticals and Cosmetics products..."
                className="w-full border-b border-[#0B281E]/20 bg-transparent py-3 pl-8 pr-12 font-heading text-[15px] text-[#0B281E] outline-none placeholder:text-[#0B281E]/45 focus:border-[#15A859]"
                aria-label="Search Nutraceuticals and Cosmetics products"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="absolute right-0 flex h-10 w-10 items-center justify-center text-[#0B281E]/70 transition-colors hover:text-[#0B281E]"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results list */}
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              {isSearching ? (
                <div className="py-8 text-center font-heading text-sm text-[#0B281E]/60">
                  Searching catalog...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-8 text-center font-heading text-sm text-[#0B281E]/60">
                  {searchTerm.trim().length >= 2
                    ? 'No products found. Try a different search term.'
                    : 'Type at least 2 characters to search'}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-4">
                  {searchResults.map((product) => {
                    const categorySlug = product.category?.toLowerCase() || 'general';
                    const productHref = `/${categorySlug}?product=${product.id}`;

                    return (
                      <Link
                        key={product.id}
                        href={productHref}
                        onClick={closeSearch}
                        className="group flex flex-col rounded-lg border border-[#0B281E]/10 bg-white p-4 transition-all hover:border-[#15A859] hover:shadow-md"
                      >
                        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-neutral-100">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                              No image
                            </div>
                          )}
                        </div>
                        <p className="mt-2 line-clamp-2 font-heading text-[13px] font-semibold leading-snug text-[#0B281E] group-hover:text-[#15A859]">
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
        className={`bg-[#EBF1EB]/98 backdrop-blur-md transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'max-h-[85vh] overflow-y-auto' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col border-t border-[#0B281E]/10 py-4">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`mx-4 my-1 rounded-md px-5 py-3 font-heading text-[12px] font-bold uppercase tracking-[1px] transition-colors duration-200 ${
                  active
                    ? 'bg-[#1B3B2B] text-white'
                    : 'text-[#0B281E] hover:bg-black/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          <div className="mx-4 mt-3 mb-3">
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center h-11 w-full rounded-full bg-[#1B3B2B] text-white font-heading text-[12px] font-bold uppercase tracking-[1.5px] hover:bg-[#15A859] transition-colors shadow-md"
            >
              <span>Enquire Now</span>
              <span className="ml-1.5">&rarr;</span>
            </Link>
          </div>
          
          <LanguageSwitcher variant="mobile" />
        </div>
      </div>
    </header>
  );
}
