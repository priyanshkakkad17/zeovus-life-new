'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children, site }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const hideFooterCta = pathname === '/contact';

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header site={site} />
      <main>{children}</main>
      <Footer site={site} hideCta={hideFooterCta} />
    </>
  );
}
