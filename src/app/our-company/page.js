import OurCompanyView from '@/components/ourCompany/OurCompanyView';
import { getContentGroup } from '@/lib/content/store';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const content = await getContentGroup('ourCompany');
  return { title: content.seo?.title, description: content.seo?.description };
}

export default async function OurCompanyPage() {
  const [content, site] = await Promise.all([getContentGroup('ourCompany'), getContentGroup('site')]);
  return <OurCompanyView content={content} certifications={site.certifications?.items || []} />;
}
