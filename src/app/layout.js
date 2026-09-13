import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import GoogleTranslate from '@/components/GoogleTranslate';
import JsonLd from '@/components/JsonLd';
import { getContentGroup } from '@/lib/content/store';
import { buildPageMetadata, organizationJsonLd } from '@/lib/seoMetadata';

// Content is read from the database on every request so admin edits appear
// immediately without a rebuild.
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const site = await getContentGroup('site');
  const seo = site.seo || {};
  const title = seo.title || 'Zeovus Life';
  const description = seo.description || 'B2B nutraceutical and cosmetic manufacturing, formulation and quality support from Zeovus Life.';
  return {
    ...buildPageMetadata({ title, description, siteUrl: seo.siteUrl }),
    icons: {
      icon: [
        { url: '/Tab-Fevicon-clean.png', type: 'image/png' },
      ],
      shortcut: '/Tab-Fevicon-clean.png',
      apple: '/Tab-Fevicon-clean.png',
    },
    ...(seo.siteUrl ? { metadataBase: safeUrl(seo.siteUrl) } : {}),
  };
}

function safeUrl(value) {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export default async function RootLayout({ children }) {
  const site = await getContentGroup('site');

  return (
    <html lang="en">
      <body className="font-sans text-neutral-900 bg-white">
        <JsonLd data={organizationJsonLd(site.seo?.siteUrl)} />
        <LayoutWrapper site={site}>{children}</LayoutWrapper>
        <GoogleTranslate />
      </body>
    </html>
  );
}
