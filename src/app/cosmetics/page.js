import CategoryCatalog from '@/components/catalog/CategoryCatalog';
import { getContentGroup } from '@/lib/content/store';
import { cosmeticsFallbackCategories } from '@/lib/catalogFallbacks';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const content = await getContentGroup('cosmetics');
  return { title: content.seo?.title, description: content.seo?.description };
}

export default async function CosmeticsPage() {
  const content = await getContentGroup('cosmetics');
  const hero = content.hero || {};

  return (
    <CategoryCatalog
      division="cosmetics"
      basePath="/cosmetics"
      staticCategories={cosmeticsFallbackCategories}
      labels={content.labels || {}}
      hero={{
        titleLead: hero.titleLead,
        titleAccent: hero.titleAccent,
        backgroundVideo: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1788633389/cosmatics.mp4',
        stats: hero.stats || [],
        seal: hero.sealImage ? { src: hero.sealImage, label: hero.sealLabel } : null,
      }}
    />
  );
}
