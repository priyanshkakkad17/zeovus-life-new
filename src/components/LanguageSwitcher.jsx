'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

// Languages offered in the switcher. `code` is the Google Translate target code.
const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', flag: 'us' },
  { code: 'fr', label: 'Français', short: 'FR', flag: 'fr' },
  { code: 'de', label: 'Deutsch', short: 'DE', flag: 'de' },
  { code: 'ur', label: 'اردو', short: 'UR', flag: 'sa' },
  { code: 'zh-CN', label: '中文', short: 'ZH', flag: 'cn' },
];

const COOKIE_NAME = 'googtrans';

// Small inline SVG flags so we don't depend on any image assets.
function Flag({ country, className = '' }) {
  const common = { className, viewBox: '0 0 60 40', preserveAspectRatio: 'xMidYMid slice' };
  switch (country) {
    case 'us':
      return (
        <svg {...common} aria-hidden="true">
          <rect width="60" height="40" fill="#b22234" />
          {[1, 3, 5, 7, 9].map((i) => (
            <rect key={i} y={(i * 40) / 13} width="60" height={40 / 13} fill="#fff" />
          ))}
          <rect width="26" height={(40 / 13) * 7} fill="#3c3b6e" />
        </svg>
      );
    case 'fr':
      return (
        <svg {...common} aria-hidden="true">
          <rect width="20" height="40" fill="#0055a4" />
          <rect x="20" width="20" height="40" fill="#fff" />
          <rect x="40" width="20" height="40" fill="#ef4135" />
        </svg>
      );
    case 'de':
      return (
        <svg {...common} aria-hidden="true">
          <rect width="60" height="13.33" y="0" fill="#000" />
          <rect width="60" height="13.33" y="13.33" fill="#dd0000" />
          <rect width="60" height="13.34" y="26.66" fill="#ffce00" />
        </svg>
      );
    case 'sa':
      return (
        <svg {...common} aria-hidden="true">
          <rect width="60" height="40" fill="#006c35" />
          <path
            d="M10 14 h34 M10 18 h30 M42 12 v8 M14 12 v6 M20 12 v6 M26 12 v6 M32 12 v6"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M9 27 h40" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <path d="M49 27 l4 -1.5 -4 -1.5 z" fill="#fff" />
        </svg>
      );
    case 'cn':
      return (
        <svg {...common} aria-hidden="true">
          <rect width="60" height="40" fill="#de2910" />
          <path d="M12 6 l2.4 5 5.4.5-4.1 3.6 1.3 5.3L12 22.6 6.9 25.4l1.3-5.3-4.1-3.6 5.4-.5z" fill="#ffde00" />
          <path d="M24 5 l.9 1.9 2.1.2-1.6 1.4.5 2-1.9-1.1-1.9 1.1.5-2-1.6-1.4 2.1-.2z" fill="#ffde00" />
          <path d="M28 11 l.9 1.9 2.1.2-1.6 1.4.5 2-1.9-1.1-1.9 1.1.5-2-1.6-1.4 2.1-.2z" fill="#ffde00" />
          <path d="M28 18 l.9 1.9 2.1.2-1.6 1.4.5 2-1.9-1.1-1.9 1.1.5-2-1.6-1.4 2.1-.2z" fill="#ffde00" />
          <path d="M24 24 l.9 1.9 2.1.2-1.6 1.4.5 2-1.9-1.1-1.9 1.1.5-2-1.6-1.4 2.1-.2z" fill="#ffde00" />
        </svg>
      );
    default:
      return null;
  }
}

function readCurrentLang() {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return 'en';
  const parts = decodeURIComponent(match[1]).split('/');
  const target = parts[parts.length - 1];
  return target || 'en';
}

function setLangCookie(code) {
  const value = `/en/${code}`;
  const domain = window.location.hostname;
  document.cookie = `${COOKIE_NAME}=${value};path=/`;
  document.cookie = `${COOKIE_NAME}=${value};path=/;domain=${domain}`;
  if (domain.split('.').length > 1) {
    document.cookie = `${COOKIE_NAME}=${value};path=/;domain=.${domain}`;
  }
}

function clearLangCookie() {
  const domain = window.location.hostname;
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = `${COOKIE_NAME}=;path=/;${expire}`;
  document.cookie = `${COOKIE_NAME}=;path=/;domain=${domain};${expire}`;
  if (domain.split('.').length > 1) {
    document.cookie = `${COOKIE_NAME}=;path=/;domain=.${domain};${expire}`;
  }
}

export default function LanguageSwitcher({ variant = 'desktop' }) {
  const [current, setCurrent] = useState('en');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setCurrent(readCurrentLang());
  }, []);

  useEffect(() => {
    if (variant !== 'desktop') return undefined;
    function onClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [variant]);

  const changeLanguage = useCallback((code) => {
    setCurrent(code);
    setOpen(false);

    if (code === 'en') {
      clearLangCookie();
      window.location.reload();
      return;
    }

    setLangCookie(code);
    const combo = document.querySelector('select.goog-te-combo');
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event('change'));
      return;
    }

    window.location.reload();
  }, []);

  const activeLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  if (variant === 'mobile') {
    return (
      <div className="mt-2 border-t border-[#0B281E]/10 px-4 pt-4">
        <p className="mb-2 px-1 font-heading text-[10px] font-bold uppercase tracking-[1.5px] text-[#0B281E]/50">
          Language
        </p>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((lang) => {
            const active = lang.code === current;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-2 rounded-md px-3 py-2.5 font-heading text-[13px] font-medium transition-colors ${
                  active ? 'bg-[#1B3B2B] text-white' : 'text-[#0B281E] hover:bg-black/5'
                }`}
              >
                <Flag country={lang.flag} className="h-4 w-6 shrink-0 rounded-[2px] shadow-sm" />
                <span className="truncate">{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative notranslate">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 items-center gap-1.5 rounded-md px-2 font-heading text-[12px] font-bold uppercase tracking-[0.5px] text-[#0B281E] hover:bg-black/5 transition-colors"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Flag country={activeLang.flag} className="h-3.5 w-5 shrink-0 rounded-[1.5px] shadow-sm" />
        <span className="inline-block text-[#0B281E] text-xs font-bold">{activeLang.short}</span>
        <ChevronDown className={`h-3 w-3 text-[#0B281E]/70 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2.5} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-lg border border-[#0B281E]/10 bg-white/95 py-1 shadow-xl backdrop-blur-lg">
          {LANGUAGES.map((lang) => {
            const active = lang.code === current;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left font-heading text-[13px] font-medium transition-colors ${
                  active ? 'bg-[#EBF1EB] text-[#0B281E] font-bold' : 'text-[#0B281E]/80 hover:bg-[#F4F6F0]'
                }`}
              >
                <Flag country={lang.flag} className="h-4 w-6 shrink-0 rounded-[2px] shadow-sm" />
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
