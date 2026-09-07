'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search } from 'lucide-react';

export default function Header({ site }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const brand = site?.brand || {};
  const navItems = (site?.nav?.items || []).filter((item) => item?.name);

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
              src="/navbar_logo.png"
              alt={brand.logoAlt || 'Zeovus Life'}
              width={160}
              height={60}
              priority
              className="h-[46px] w-auto max-w-[120px] object-contain sm:h-[56px] sm:max-w-[140px] lg:h-[65px] lg:max-w-[160px]"
            />
          </Link>

          {brand.showTagline !== false && brand.tagline && (
            <>
              {/* Divider — shown from tablet up. Hidden only in the lg range (1024–1279px)
                  where the nav is tightest; back at xl (1280px, the target laptop). */}
              <div className="ml-4 hidden h-8 w-px shrink-0 bg-primary-dark/25 sm:block lg:hidden xl:block xl:ml-4 xl:h-9 2xl:ml-5" />

              {/* Tagline — compact and width-capped at xl (wraps to 2 lines so it never
                  pushes into the nav), full single-line size only at 2xl. */}
              <p className="ml-4 hidden max-w-[180px] font-heading text-[11px] font-bold leading-[1.25] tracking-[0.04em] text-primary-dark/75 sm:block md:max-w-[220px] md:text-[12px] lg:hidden xl:ml-4 xl:block xl:max-w-[150px] xl:text-[11px] 2xl:ml-5 2xl:max-w-none 2xl:whitespace-nowrap 2xl:text-[15px]">
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

        {/* Desktop product search */}
        <button
          type="button"
          onClick={() => { setIsSearchOpen((open) => !open); setIsMenuOpen(false); }}
          className={`hidden h-10 w-10 items-center justify-center rounded-md transition-colors lg:flex ${
            isSearchOpen ? 'bg-primary-dark text-[#e8f5ed]' : 'text-primary-dark hover:bg-[#d4ede0]/70'
          }`}
          aria-label="Search products"
          aria-expanded={isSearchOpen}
        >
          <Search size={18} strokeWidth={1.8} />
        </button>

        {/* Mobile controls */}
        <div className="ml-3 flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
            className={`flex h-11 w-11 items-center justify-center rounded-md text-primary-dark transition-colors ${
              isSearchOpen ? 'bg-primary-dark text-[#e8f5ed]' : 'hover:bg-[#d4ede0]'
            }`}
            aria-label="Search products"
            aria-expanded={isSearchOpen}
          >
            <Search size={21} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 shrink-0 items-center justify-center text-primary-dark"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Global product search panel */}
      {isSearchOpen && (
        <div className="border-t border-primary-light/15 bg-[#e8f5ed]/95 shadow-lg backdrop-blur-lg">
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
                className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-md text-primary-dark/60 transition-colors hover:bg-[#d4ede0] hover:text-primary-dark"
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