import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { faqItems } from '@/lib/faq';
import { buildPageMetadata } from '@/lib/seoMetadata';

export const dynamic = 'force-dynamic';

export function generateMetadata() {
  return buildPageMetadata({
    title: 'Nutraceutical & Cosmetic Manufacturing FAQ | Zeovus Life',
    description: 'Answers for buyers on private-label supplements, cosmetic manufacturing, MOQs, formats, certifications, lead times and co-development. Contact Zeovus Life today.',
    path: '/faq',
  });
}

export default function FAQPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <main className="bg-[#f5f9f6] px-5 pb-24 pt-36 sm:px-8 lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-[1040px]">
          <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">Buyer guide</p>
          <h1 className="max-w-[780px] font-heading text-[38px] font-bold uppercase leading-[1.03] tracking-[-1.2px] text-primary-dark sm:text-[54px] lg:text-[68px]">
            Questions, answered.
          </h1>
          <p className="mt-7 max-w-[680px] text-[17px] leading-[1.75] text-neutral-600">
            Clear answers for brands, retailers and distributors evaluating a nutraceutical or cosmetic manufacturing partner.
          </p>

          <div className="mt-16 divide-y divide-neutral-200 border-y border-neutral-200">
            {faqItems.map((item, index) => (
              <article key={item.question} className="py-9 sm:py-11">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[2px] text-primary-light">{String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-3 max-w-[820px] font-heading text-[22px] font-bold leading-tight text-primary-dark sm:text-[28px]">{item.question}</h2>
                <p className="mt-4 max-w-[820px] text-[15px] leading-[1.8] text-neutral-600">{item.answer}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-5">
            <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-primary-dark px-7 py-4 font-heading text-[12px] font-semibold uppercase tracking-[1.5px] text-white transition-colors hover:bg-primary-light">
              Start a conversation
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/capabilities" className="font-heading text-[12px] font-semibold uppercase tracking-[1.5px] text-primary-dark underline decoration-primary-light/50 underline-offset-4">
              See our capabilities
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
