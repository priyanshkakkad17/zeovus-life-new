'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children, site }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const hideFooterCta = pathname === '/contact';

  const publicSite = isAdmin
    ? site
    : {
        ...site,
        nav: {
          ...(site?.nav || {}),
          items: (site?.nav?.items || []).filter(
            (item) => item?.href !== '/faq' && item?.name?.toLowerCase() !== 'faq'
          ),
        },
      };

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header site={publicSite} />
      <main>{children}</main>
      <Footer site={publicSite} hideCta={hideFooterCta} />
    </>
  );
}
