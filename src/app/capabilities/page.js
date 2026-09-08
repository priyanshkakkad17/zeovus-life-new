import CapabilitiesView from '@/components/capabilities/CapabilitiesView';
import JsonLd from '@/components/JsonLd';
import { getContentGroup } from '@/lib/content/store';
import { buildPageMetadata } from '@/lib/seoMetadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const [content, site] = await Promise.all([getContentGroup('capabilities'), getContentGroup('site')]);
  return buildPageMetadata({
    title: content.seo?.title || 'Capabilities | Zeovus Life',
    description: content.seo?.description || 'From formulation R&D and ingredient selection to certified manufacturing, Zeovus Life takes nutraceutical and cosmetic products from brief to shelf. Start today.',
    path: '/capabilities',
    siteUrl: site.seo?.siteUrl,
  });
}

export default async function CapabilitiesPage() {
  const [content, site] = await Promise.all([getContentGroup('capabilities'), getContentGroup('site')]);
  const steps = content.process?.steps || [];
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: content.process?.heading || 'From brief to shelf, in eight steps',
    description: content.process?.intro || 'Zeovus Life process for developing and manufacturing nutraceutical and cosmetic products.',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
      ...(step.image ? { image: step.image } : {}),
    })),
  };
  return (
    <>
      <JsonLd data={howTo} />
      <CapabilitiesView
        content={content}
        certifications={site.certifications?.items || []}
        heroVideo="https://res.cloudinary.com/ac74hfe9/video/upload/v1788637642/capabilities.mp4"
      />
    </>
  );
}
