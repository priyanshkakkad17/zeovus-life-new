import { DEFAULT_SITE_URL } from '@/lib/seoMetadata';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }],
    sitemap: `${DEFAULT_SITE_URL}/sitemap.xml`,
    host: DEFAULT_SITE_URL,
  };
}
