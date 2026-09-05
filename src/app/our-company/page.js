import OurCompanyView from '@/components/ourCompany/OurCompanyView';
import { getContentGroup } from '@/lib/content/store';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const content = await getContentGroup('ourCompany');
  return { title: content.seo?.title, description: content.seo?.description };
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
