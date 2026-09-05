import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy | Zeovus Life',
  description: 'Learn how Zeovus Life uses cookies and similar technologies and how to manage your preferences.',
};

const sections = [
  {
    title: 'What Are Cookies?',
    content: <p>Cookies are small text files placed on your device, such as a computer, mobile phone, or tablet, when you visit a website. They help the website function properly, improve user experience, and provide analytical insights.</p>,
  },
  {
    title: 'How Zeovus Life Uses Cookies',
    content: (
      <>
        <p>We use cookies to:</p>
        <ul>
          <li>Ensure the website functions correctly</li>
          <li>Improve website performance and user experience</li>
          <li>Understand how visitors use our website</li>
          <li>Enable marketing or promotional communications only with consent</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Types of Cookies We Use',
    content: (
      <>
        <div>
          <h3 className="font-semibold text-primary-dark">a) Strictly Necessary Cookies</h3>
          <p className="mt-3">These cookies are essential for the website to function and cannot be switched off. They include cookies that enable basic functions such as page navigation and secure access.</p>
          <p className="mt-3"><strong>Legal basis:</strong> Legitimate interest<br /><strong>Consent required:</strong> No</p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-dark">b) Performance &amp; Analytics Cookies</h3>
          <p className="mt-3">These cookies help us understand how visitors interact with our website by collecting anonymous information such as page visits and traffic sources.</p>
          <p className="mt-3">Examples include analytics tools like Google Analytics.</p>
          <p className="mt-3"><strong>Legal basis:</strong> Consent<br /><strong>Consent required:</strong> Yes</p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-dark">c) Functional Cookies</h3>
          <p className="mt-3">These cookies allow the website to remember choices you make, such as language preferences or region, to provide a more personalised experience.</p>
          <p className="mt-3"><strong>Legal basis:</strong> Consent<br /><strong>Consent required:</strong> Yes</p>
        </div>
        <div>
          <h3 className="font-semibold text-primary-dark">d) Marketing &amp; Advertising Cookies</h3>
          <p className="mt-3">These cookies may be used to deliver relevant advertisements or promotional messages and track campaign performance.</p>
          <p className="mt-3"><strong>Legal basis:</strong> Consent<br /><strong>Consent required:</strong> Yes</p>
        </div>
      </>
    ),
  },
  {
    title: 'Third-Party Cookies',
    content: <p>Some cookies may be placed by trusted third-party services used on our website, such as analytics, hosting, or marketing platforms. These third parties may process data outside the EU/EEA with appropriate safeguards in place.</p>,
  },
  {
    title: 'How You Can Manage Cookies',
    content: (
      <>
        <p>You can manage or withdraw your cookie consent at any time by:</p>
        <ul>
          <li>Using the cookie settings on our website</li>
          <li>Adjusting your browser settings to block or delete cookies</li>
          <li>Declining non-essential cookies via our cookie banner</li>
        </ul>
        <p>Please note that disabling some cookies may affect website functionality.</p>
      </>
    ),
  },
  {
    title: 'Data Retention',
    content: <p>Cookies are stored for different periods depending on their purpose. Some cookies are deleted when you close your browser, while others remain until they expire or are manually deleted.</p>,
  },
  {
    title: 'Updates to This Cookie Policy',
    content: <p>We may update this Cookie Policy from time to time to reflect changes in law or technology. Any updates will be posted on this page with a revised date.</p>,
  },
  {
    title: 'Contact Us',
    content: (
      <>
        <p>If you have any questions about our use of cookies, please contact us at:</p>
        <p>
          <a href="mailto:info@zeovuslife.com" className="font-semibold text-primary-dark underline underline-offset-4 transition hover:text-primary-light">info@zeovuslife.com</a>
        </p>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="bg-white text-primary-dark">
      <section className="relative overflow-hidden bg-primary-dark px-5 pb-20 pt-32 text-white sm:px-8 sm:pb-24 sm:pt-36 lg:px-12 lg:pb-28 lg:pt-40">
        <div className="pointer-events-none absolute -right-20 top-10 h-[360px] w-[360px] rounded-full bg-primary-light/20 blur-[110px]" />
        <div className="relative mx-auto max-w-[1400px]">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-secondary">Legal</p>
          <h1 className="mt-5 max-w-[1100px] font-heading text-[42px] font-bold uppercase leading-[0.95] tracking-[-1.5px] sm:text-[58px] lg:text-[76px]">Cookie Policy</h1>
          <p className="mt-7 max-w-[800px] text-[16px] leading-8 text-neutral-300 sm:text-[18px]">This Cookie Policy explains how Zeovus Life uses cookies and similar technologies on our website and how you can manage your preferences, in accordance with the EU General Data Protection Regulation (GDPR) and the ePrivacy Directive.</p>
          <p className="mt-7 font-heading text-[11px] font-bold uppercase tracking-[1.5px] text-white/50">Last updated: 02-09-2026</p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1400px] border-t border-primary-dark/10">
          {sections.map((section) => (
            <article key={section.title} className="border-b border-primary-dark/10 py-10 sm:py-12 lg:py-14">
              <div className="max-w-[1000px]">
                <h2 className="max-w-[900px] font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px] lg:text-[42px]">{section.title}</h2>
                <div className="mt-6 max-w-[850px] space-y-5 text-[15px] leading-8 text-neutral-600 sm:text-[16px] [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:pl-1">{section.content}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 pb-20 text-center sm:px-8 lg:px-12 lg:pb-28">
        <Link href="/" className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[1.8px] text-primary-dark transition hover:text-primary-light">
          <span aria-hidden="true">←</span>
          Back to Home
        </Link>
      </section>
    </div>
  );
}
