import { getCategoryMetadata } from '@/lib/categorySeo';

export default function CategorySeoSection({ slug, division }) {
  if (!slug) return null;
  const category = getCategoryMetadata(slug, division);
  if (!category?.overview?.length) return null;

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24" aria-labelledby={`${slug}-seo-heading`}>
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">Product development guide</p>
          <h2 id={`${slug}-seo-heading`} className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-0.8px] text-primary-dark sm:text-[38px]">{category.name} manufacturing</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-[1.8] text-neutral-600">
            {category.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="mt-6 text-[14px] leading-relaxed text-neutral-600"><strong className="font-semibold text-primary-dark">Typical buyers: </strong>{category.buyerProfile}</p>
          <p className="mt-4 text-[13px] leading-relaxed text-neutral-500">{category.certifications}</p>
        </div>
        <div>
          <h3 className="font-heading text-[17px] font-bold uppercase tracking-[1px] text-primary-dark">{category.name} FAQs</h3>
          <div className="mt-5 space-y-5">
            {category.faqs.map((faq) => (
              <div key={faq.question}>
                <h4 className="font-heading text-[14px] font-semibold leading-snug text-primary-dark">{faq.question}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
