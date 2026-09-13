import OurCompanyView from '@/components/ourCompany/OurCompanyView';
import { getContentGroup } from '@/lib/content/store';
import { buildPageMetadata } from '@/lib/seoMetadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const [content, site] = await Promise.all([getContentGroup('ourCompany'), getContentGroup('site')]);
  return buildPageMetadata({
    title: content.seo?.title || 'Our Company | Zeovus Life',
    description: content.seo?.description || 'Meet Zeovus Life, a global nutraceutical and cosmetic manufacturing partner built on formulation judgment, quality and long-term trust. Learn more today.',
    path: '/our-company',
    siteUrl: site.seo?.siteUrl,
  });
}

export default async function OurCompanyPage() {
  const [content, site] = await Promise.all([getContentGroup('ourCompany'), getContentGroup('site')]);
  const companyContent = {
    ...content,
    hero: {
      ...content.hero,
      media: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1788638276/ourcompany.mp4',
    },
  };

  return <OurCompanyView content={companyContent} certifications={site.certifications?.items || []} />;
}
