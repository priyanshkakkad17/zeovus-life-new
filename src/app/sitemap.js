import { categorySeo } from '@/lib/categorySeo';
import { DEFAULT_SITE_URL, absoluteUrl } from '@/lib/seoMetadata';

export default function sitemap() {
  const now = new Date();
  const routes = [
    '/',
    '/our-company',
    '/capabilities',
    '/nutraceuticals',
    '/cosmetics',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/cookie-policy',
  ];
  const categoryRoutes = Object.keys(categorySeo).map((slug) => {
    const division = ['skincare', 'haircare', 'sun-care', 'body-care'].includes(slug) ? 'cosmetics' : 'nutraceuticals';
    return `/${division}?category=${slug}`;
  });

  return [...routes, ...categoryRoutes].map((path) => ({
    url: absoluteUrl(path, DEFAULT_SITE_URL),
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/faq' ? 0.8 : 0.7,
  }));
}
