import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Zeovus Life',
  description: 'Learn how Zeovus Life collects, uses, stores, and protects your personal data.',
};

const sections = [
  {
    title: 'Who We Are (Data Controller)',
    content: (
      <>
        <p><strong>Brand Name:</strong> Zeovus Life</p>
        <p>
          <strong>Registered Address:</strong><br />
          Unit No. 419, 4th Floor, Master Mind V<br />
          Royal Palms Estate, Aarey Milk Colony<br />
          Goregaon (East), Mumbai - 400065<br />
          India
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:info@zeovuslife.com" className="font-medium text-primary-dark underline underline-offset-4 transition hover:text-primary-light">
            info@zeovuslife.com
          </a>
        </p>
        <p>Zeovus Life is the data controller responsible for your personal data.</p>
      </>
    ),
  },
  {
    title: 'Personal Data We Collect',
    content: (
      <>
        <p>We may collect the following types of personal data:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Delivery or billing address, if applicable</li>
          <li>Information submitted through contact or enquiry forms</li>
          <li>IP address</li>
          <li>Browser type and device information</li>
          <li>Website usage data, such as pages visited and time spent</li>
          <li>Cookie and analytics data</li>
        </ul>
        <p>We do not intentionally collect sensitive personal data.</p>
      </>
    ),
  },
  {
    title: 'How We Collect Your Data',
    content: (
      <>
        <p>We collect data when you:</p>
        <ul>
          <li>Fill out a contact or enquiry form</li>
          <li>Subscribe to newsletters or updates</li>
          <li>Place an order or request information</li>
          <li>Browse our website through cookies and analytics tools</li>
          <li>Communicate with us by email or phone</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Why We Use Your Data (Purpose of Processing)',
    content: (
      <>
        <p>We use your personal data to:</p>
        <ul>
          <li>Respond to enquiries and customer support requests</li>
          <li>Process orders or service requests</li>
          <li>Improve website performance and user experience</li>
          <li>Send updates, offers, or marketing communications only with consent</li>
          <li>Maintain website security and prevent fraud</li>
          <li>Meet legal and regulatory obligations</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Legal Basis for Processing (GDPR Article 6)',
    content: (
      <>
        <p>We process your data under the following lawful bases:</p>
        <ul>
          <li>Consent – when you subscribe or opt in</li>
          <li>Contractual necessity – to fulfil requests or orders</li>
          <li>Legitimate interest – to improve services and website functionality</li>
          <li>Legal obligation – where required by law</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Cookies & Tracking Technologies',
    content: (
      <>
        <p>Zeovus Life uses cookies to:</p>
        <ul>
          <li>Enable essential website functionality</li>
          <li>Analyse traffic and performance</li>
          <li>Improve user experience</li>
        </ul>
        <p>You can manage or withdraw cookie consent at any time through your browser settings or our cookie banner.</p>
        <p>
          For more details, please refer to our{' '}
          <Link href="/cookie-policy" className="font-semibold text-primary-dark underline underline-offset-4 transition hover:text-primary-light">
            Cookie Policy
          </Link>.
        </p>
      </>
    ),
  },
  {
    title: 'Sharing of Personal Data',
    content: (
      <>
        <p>We may share your data with:</p>
        <ul>
          <li>Website hosting providers</li>
          <li>Analytics and marketing service providers</li>
          <li>Payment and logistics partners, if applicable</li>
          <li>Legal or regulatory authorities when required by law</li>
        </ul>
        <p>All third parties are required to protect your data and use it only for specified purposes.</p>
      </>
    ),
  },
  {
    title: 'International Data Transfers',
    content: (
      <>
        <p>If your data is transferred outside the EU/EEA, we ensure appropriate safeguards are in place, such as:</p>
        <ul>
          <li>Standard Contractual Clauses (SCCs)</li>
          <li>Adequacy decisions approved by the European Commission</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Data Retention',
    content: (
      <>
        <p>We retain your personal data only for as long as necessary:</p>
        <ul>
          <li>Enquiry data: up to 12–24 months</li>
          <li>Marketing data: until consent is withdrawn</li>
          <li>Legal or accounting data: as required by law</li>
        </ul>
        <p>After this period, data is securely deleted or anonymised.</p>
      </>
    ),
  },
  {
    title: 'Your Rights Under GDPR',
    content: (
      <>
        <p>As an EU/EEA user, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Restrict processing</li>
          <li>Object to processing</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
          <li>Lodge a complaint with a Data Protection Authority (DPA)</li>
        </ul>
        <p>
          To exercise your rights, contact us at{' '}
          <a href="mailto:info@zeovuslife.com" className="font-medium text-primary-dark underline underline-offset-4 transition hover:text-primary-light">
            info@zeovuslife.com
          </a>.
        </p>
      </>
    ),
  },
  {
    title: 'Data Security',
    content: (
      <>
        <p>We implement appropriate technical and organisational measures to protect your personal data against:</p>
        <ul>
          <li>Unauthorised access</li>
          <li>Loss or misuse</li>
          <li>Alteration or disclosure</li>
        </ul>
        <p>However, no online system is 100% secure.</p>
      </>
    ),
  },
  {
    title: 'Children’s Privacy',
    content: <p>Our website is not intended for children under the age of 16. We do not knowingly collect personal data from children.</p>,
  },
  {
    title: 'Third-Party Links',
    content: <p>Our website may contain links to external websites. Zeovus Life is not responsible for the privacy practices or content of third-party sites.</p>,
  },
  {
    title: 'Changes to This Policy',
    content: <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>,
  },
];

function PolicySections() {
  return (
    <section className="bg-white px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
      <div className="mx-auto max-w-[1400px] border-t border-primary-dark/10">
        {sections.map((section) => (
          <article key={section.title} className="border-b border-primary-dark/10 py-10 sm:py-12 lg:py-14">
            <div className="max-w-[1000px]">
              <h2 className="max-w-[900px] font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px] lg:text-[42px]">
                {section.title}
              </h2>
              <div className="mt-6 max-w-[850px] space-y-5 text-[15px] leading-8 text-neutral-600 sm:text-[16px] [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:pl-1">
                {section.content}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-primary-dark">
      <section className="relative overflow-hidden bg-primary-dark px-5 pb-20 pt-32 text-white sm:px-8 sm:pb-24 sm:pt-36 lg:px-12 lg:pb-28 lg:pt-40">
        <div className="pointer-events-none absolute -right-20 top-10 h-[360px] w-[360px] rounded-full bg-primary-light/20 blur-[110px]" />
        <div className="relative mx-auto max-w-[1400px]">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-secondary">Legal</p>
          <h1 className="mt-5 max-w-[1000px] font-heading text-[42px] font-bold uppercase leading-[0.95] tracking-[-1.5px] sm:text-[58px] lg:text-[76px]">
            Privacy Policy
          </h1>
          <p className="mt-7 max-w-[760px] text-[16px] leading-8 text-neutral-300 sm:text-[18px]">
            At Zeovus Life, we value your trust and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or interact with us, in accordance with the EU General Data Protection Regulation (GDPR).
          </p>
          <p className="mt-7 font-heading text-[11px] font-bold uppercase tracking-[1.5px] text-white/50">Last updated: 02-09-2026</p>
        </div>
      </section>

      <PolicySections />

      <section className="bg-white px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl bg-[#f5f9f6] p-7 sm:p-10 lg:grid lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16 lg:p-14">
          <div>
            <p className="font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">Privacy Enquiries</p>
            <h2 className="mt-4 max-w-[700px] font-heading text-[32px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[44px]">Questions About Your Data?</h2>
            <p className="mt-5 max-w-[680px] text-[15px] leading-7 text-neutral-600 sm:text-[17px]">If you have any questions about this Privacy Policy or how we handle your data, please contact us.</p>
          </div>
          <div className="mt-8 space-y-3 lg:mt-0">
            <p className="font-semibold text-primary-dark">Zeovus Ventures Private Limited</p>
            <p className="text-[14px] leading-7 text-neutral-600">
              Unit No. 419, 4th Floor, Master Mind V<br />
              Royal Palms Estate, Aarey Milk Colony<br />
              Goregaon (East), Mumbai - 400065<br />
              India
            </p>
            <a href="tel:+919721062811" className="block w-fit text-[15px] font-semibold text-primary-dark transition hover:text-primary-light">+91 9721062811</a>
            <a href="mailto:info@zeovuslife.com" className="block w-fit text-[15px] font-semibold text-primary-dark transition hover:text-primary-light">info@zeovuslife.com</a>
          </div>
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
