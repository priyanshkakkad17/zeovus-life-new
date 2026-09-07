'use client';

import { useEffect } from 'react';

// Loads the Google Translate widget once and keeps it hidden. Our own
// LanguageSwitcher drives it through the `googtrans` cookie, so the default
// Google UI (banner + dropdown) is suppressed via CSS in globals.css.
export default function GoogleTranslate() {
  useEffect(() => {
    if (window.__zeovusTranslateLoaded) return;
    window.__zeovusTranslateLoaded = true;

    window.googleTranslateElementInit = function googleTranslateElementInit() {
      // eslint-disable-next-line no-new
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,fr,de,ur,zh-CN',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Google re-injects its banner iframe on every translated page load and
    // pushes the body down with an inline `top` style. Actively strip it and
    // reset the offset so our own UI stays clean.
    const cleanup = () => {
      // Only touch the top banner frame — never the translation machinery.
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) banner.style.display = 'none';
      if (document.body.style.top) document.body.style.top = '0px';
      if (document.documentElement.style.top) document.documentElement.style.top = '0px';
    };

    cleanup();
    const interval = setInterval(cleanup, 300);
    const observer = new MutationObserver(cleanup);
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });

    // The banner almost always settles within the first couple of seconds.
    setTimeout(() => clearInterval(interval), 5000);
  }, []);

  return <div id="google_translate_element" aria-hidden="true" />;
}
