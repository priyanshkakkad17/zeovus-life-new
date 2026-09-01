import CapabilitiesView from '@/components/capabilities/CapabilitiesView';
import { getContentGroup } from '@/lib/content/store';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const content = await getContentGroup('capabilities');
  return { title: content.seo?.title, description: content.seo?.description };
}

export default async function CapabilitiesPage() {
  const [content, site] = await Promise.all([getContentGroup('capabilities'), getContentGroup('site')]);
  return <CapabilitiesView content={content} certifications={site.certifications?.items || []} />;
}
