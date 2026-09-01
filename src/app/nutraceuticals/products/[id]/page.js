import ProductDetail from '@/components/catalog/ProductDetail';
import { getContentGroup } from '@/lib/content/store';

export const dynamic = 'force-dynamic';

export default async function NutraceuticalProductPage() {
  const content = await getContentGroup('nutraceuticals');
  return <ProductDetail basePath="/nutraceuticals" labels={content.productDetail || {}} />;
}
