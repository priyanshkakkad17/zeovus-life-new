import ProductDetail from '@/components/catalog/ProductDetail';
import { getContentGroup } from '@/lib/content/store';

export const dynamic = 'force-dynamic';

export default async function CosmeticProductPage() {
  const content = await getContentGroup('cosmetics');
  return <ProductDetail basePath="/cosmetics" labels={content.productDetail || {}} />;
}
