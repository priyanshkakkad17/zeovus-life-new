import ContactView from '@/components/contact/ContactView';
import { getContentGroup } from '@/lib/content/store';
import { buildPageMetadata } from '@/lib/seoMetadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const [content, site] = await Promise.all([getContentGroup('contact'), getContentGroup('site')]);
  return buildPageMetadata({
    title: content.seo?.title || 'Contact Zeovus Life | Start a Manufacturing Brief',
    description: content.seo?.description || 'Talk to Zeovus Life about private-label supplements, cosmetics, formulation, volumes and export markets. Send your product brief today.',
    path: '/contact',
    siteUrl: site.seo?.siteUrl,
  });
}

export default async function ContactPage() {
  const content = await getContentGroup('contact');
  return <ContactView content={content} />;
}
