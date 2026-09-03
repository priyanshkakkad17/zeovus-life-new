import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getContentGroup } from '@/lib/content/store';

// Content is read from the database on every request so admin edits appear
// immediately without a rebuild.
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const site = await getContentGroup('site');
  const seo = site.seo || {};
  return {
    title: seo.title || 'Zeovus Life',
    description: seo.description || '',
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
        <LayoutWrapper site={site}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
