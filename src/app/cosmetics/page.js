import CategoryCatalog from '@/components/catalog/CategoryCatalog';
import CategorySeoSection from '@/components/catalog/CategorySeoSection';
import { getContentGroup } from '@/lib/content/store';
import { cosmeticsFallbackCategories } from '@/lib/catalogFallbacks';
import { getCategoryMetadata } from '@/lib/categorySeo';
import { buildPageMetadata } from '@/lib/seoMetadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
  const [content, site] = await Promise.all([getContentGroup('cosmetics'), getContentGroup('site')]);
  const slug = searchParams?.category;
  if (slug) {
    const category = getCategoryMetadata(slug, 'cosmetic');
    return buildPageMetadata({ title: category.title, description: category.description, path: `/cosmetics?category=${encodeURIComponent(slug)}`, siteUrl: site.seo?.siteUrl });
  }
  return buildPageMetadata({
    title: content.seo?.title || 'Cosmetics | Zeovus Life',
    description: content.seo?.description || 'Explore Zeovus Life cosmetic manufacturing across skincare, haircare, sun care and body care. Request a catalog today.',
    path: '/cosmetics',
    siteUrl: site.seo?.siteUrl,
  });
}

export default async function CosmeticsPage({ searchParams }) {
  const content = await getContentGroup('cosmetics');
  const hero = content.hero || {};

  return (
    <>
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
          seal: null,
        }}
      />
      <CategorySeoSection slug={searchParams?.category} division="cosmetic" />
    </>
  );
}
