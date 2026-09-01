import ContactView from '@/components/contact/ContactView';
import { getContentGroup } from '@/lib/content/store';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const content = await getContentGroup('contact');
  return { title: content.seo?.title, description: content.seo?.description };
}

export default async function ContactPage() {
  const content = await getContentGroup('contact');
  return <ContactView content={content} />;
}
