import CategoryCatalog from '@/components/catalog/CategoryCatalog';
import { getContentGroup } from '@/lib/content/store';
import { nutraceuticalFallbackCategories } from '@/lib/catalogFallbacks';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const content = await getContentGroup('nutraceuticals');
  return { title: content.seo?.title, description: content.seo?.description };
}

export default async function NutraceuticalsPage() {
  const content = await getContentGroup('nutraceuticals');
  const hero = content.hero || {};

  return (
    <CategoryCatalog
      division="nutraceuticals"
      basePath="/nutraceuticals"
      staticCategories={nutraceuticalFallbackCategories}
      labels={content.labels || {}}
      hero={{
        titleLead: hero.titleLead,
        titleAccent: hero.titleAccent,
        backgroundVideo: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1788637056/nutra-hero.mp4',
        stats: hero.stats || [],
        seal: hero.sealImage ? { src: hero.sealImage, label: hero.sealLabel } : null,
      }}
    />
  );
}
