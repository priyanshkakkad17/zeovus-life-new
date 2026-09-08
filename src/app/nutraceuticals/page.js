import CategoryCatalog from '@/components/catalog/CategoryCatalog';
import CategorySeoSection from '@/components/catalog/CategorySeoSection';
import { getContentGroup } from '@/lib/content/store';
import { nutraceuticalFallbackCategories } from '@/lib/catalogFallbacks';
import { getCategoryMetadata } from '@/lib/categorySeo';
import { buildPageMetadata } from '@/lib/seoMetadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
  const [content, site] = await Promise.all([getContentGroup('nutraceuticals'), getContentGroup('site')]);
  const slug = searchParams?.category;
  if (slug) {
    const category = getCategoryMetadata(slug, 'nutraceutical');
    return buildPageMetadata({ title: category.title, description: category.description, path: `/nutraceuticals?category=${encodeURIComponent(slug)}`, siteUrl: site.seo?.siteUrl });
  }
  return buildPageMetadata({
    title: content.seo?.title || 'Nutraceuticals | Zeovus Life',
    description: content.seo?.description || 'Explore Zeovus Life nutraceutical manufacturing across healthy ageing, multivitamins, gut health, immunity and more. Request a catalog today.',
    path: '/nutraceuticals',
    siteUrl: site.seo?.siteUrl,
  });
}

export default async function NutraceuticalsPage({ searchParams }) {
  const content = await getContentGroup('nutraceuticals');
  const hero = content.hero || {};

  return (
    <>
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
      <CategorySeoSection slug={searchParams?.category} division="nutraceutical" />
    </>
  );
}
