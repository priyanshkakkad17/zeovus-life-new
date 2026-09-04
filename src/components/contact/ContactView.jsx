'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const officeContacts = [
  {
    key: 'india',
    country: 'India',
    person: 'Kushagra Didwania',
    phone: '+91 9721062811',
    email: 'info@zeovuslife.com',
    address: [
      'Unit No. 419, 4th Floor, Master Mind V',
      'Royal Palms Estate, Aarey Milk Colony',
      'Goregaon (East), Mumbai - 400065',
    ],
    image: '/contact/india.png',
  },
  {
    key: 'usa',
    country: 'USA',
    person: 'Vishal Mehta',
    phone: '+1 856-313-7067',
    email: null,
    address: ['11634 Ecclesia Drive', 'Tampa, Florida 33626', 'USA'],
    image: '/contact/usa.png',
  },
  {
    key: 'qatar',
    country: 'Qatar',
    person: 'Karishma Desai',
    phone: '+974 3374 3896',
    email: null,
    address: ['West Bay, Doha, Qatar'],
    image: '/contact/qatar.png',
  },
];

export default function ContactView({ content = {} }) {
  const hero = content.hero || {};
  const options = content.options || {};
  const form = content.form || {};
  const partnershipOptions = (options.items || []).filter((o) => o?.title);
  const processSteps = form.steps || [];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send your enquiry.');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full border-b border-neutral-200 bg-transparent py-2.5 text-[15px] text-primary-dark placeholder:text-neutral-400 transition-colors focus:border-primary-light focus:outline-none';
  const labelClass = 'mb-2 block font-heading text-[11px] font-semibold uppercase tracking-[1.2px] text-neutral-500';

  return (
    <div className="bg-white">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-primary-dark pt-32 pb-16 text-white sm:pt-36 lg:pt-40 lg:pb-24">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
          <defs>
            <pattern id="contact-hex-grid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="#ffffff" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-hex-grid)" />
        </svg>

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-[760px] font-heading text-[36px] font-bold uppercase leading-[1.04] tracking-[-1.5px] sm:text-[48px] lg:text-[58px] 2xl:text-[72px]">
                {hero.titleLead}
                <br />
                <span className="text-secondary lg:whitespace-nowrap">{hero.titleAccent}</span>
              </h1>
              <p className="mt-7 max-w-[600px] text-[16px] leading-relaxed text-neutral-300 sm:text-[17px]">
                {hero.subtitle}
              </p>
              {hero.ctaLabel && (
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#enquire">
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block cursor-pointer rounded-[2px] bg-secondary px-7 py-3.5 font-heading text-xs font-semibold tracking-widest text-primary-dark transition-colors hover:bg-secondary-dark"
                    >
                      {hero.ctaLabel}
                    </motion.span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PARTNERSHIP OPTIONS ============ */}
      {options.enabled !== false && partnershipOptions.length > 0 && (
      <section className="relative bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 max-w-[640px]"
          >
            <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">
              {options.eyebrow}
            </p>
            <h2 className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px] lg:text-[42px]">
              {options.heading}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
              {options.intro}
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {partnershipOptions.map((option, index) => {
              const value = option.id || option.title;
              const active = formData.interest === value;
              return (
                <motion.button
                  key={value}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, interest: value }));
                    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group relative overflow-hidden rounded-2xl border p-7 text-left transition-all duration-300 ${
                    active
                      ? 'border-primary-light bg-[#f5f9f6] shadow-[0_12px_34px_rgba(21,168,89,0.12)]'
                      : 'border-primary-dark/[0.08] bg-white hover:border-primary-light/40 hover:shadow-[0_12px_34px_rgba(18,45,35,0.08)]'
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 h-full w-1 origin-top transition-transform duration-400 ${active ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}
                    style={{ background: 'linear-gradient(180deg, #15A859, #1A475C)' }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-heading text-[11px] font-bold text-neutral-300">{String(index + 1).padStart(2, '0')}</span>
                    <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${active ? 'border-primary-light bg-primary-light text-white' : 'border-neutral-300 text-transparent'}`}>
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="m5 12 4 4L19 6" /></svg>
                    </span>
                  </div>
                  <h3 className="mt-3 font-heading text-[18px] font-bold leading-tight text-primary-dark">{option.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-neutral-500">{option.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ============ ENQUIRY FORM ============ */}
      <section id="enquire" className="relative bg-[#f5f9f6] py-20 sm:py-24 [scroll-margin-top:90px]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            {/* Left — context column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">{form.eyebrow}</p>
              <h2 className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px]">
                {form.heading}
              </h2>

              <div className="mt-10 space-y-6 border-t border-neutral-200 pt-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="editorial-number font-heading text-[22px] font-bold leading-none text-primary-light">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-heading text-[14px] font-bold uppercase tracking-[0.5px] text-primary-dark">{step.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-primary-dark/[0.06] bg-white p-7 shadow-[0_2px_18px_rgba(18,45,35,0.05)] sm:p-9"
            >
              {submitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light/10 text-primary-light">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="mt-5 font-heading text-[24px] font-bold text-primary-dark">{form.successHeading}</h3>
                  <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-neutral-500">{form.successBody}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>{form.firstNameLabel} *</label>
                      <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} className={inputClass} placeholder={form.firstNamePlaceholder} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>{form.lastNameLabel} *</label>
                      <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} className={inputClass} placeholder={form.lastNamePlaceholder} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClass}>{form.companyLabel}</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder={form.companyPlaceholder} />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>{form.emailLabel} *</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder={form.emailPlaceholder} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>{form.phoneLabel}</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder={form.phonePlaceholder} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className={labelClass}>{form.interestLabel} *</label>
                    <select id="interest" name="interest" required value={formData.interest} onChange={handleChange} className={`${inputClass} bg-transparent`}>
                      <option value="">{form.interestPlaceholder}</option>
                      {partnershipOptions.map((option) => (
                        <option key={option.id || option.title} value={option.id || option.title}>{option.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>{form.messageLabel} *</label>
                    <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder={form.messagePlaceholder} />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.01 }}
                    whileTap={{ scale: submitting ? 1 : 0.99 }}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-[3px] bg-primary-dark px-7 py-4 font-heading text-[12px] font-semibold uppercase tracking-[1.5px] text-white transition-colors duration-300 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? 'Sending…' : form.submitLabel}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                  </motion.button>

                  {error && <p className="text-center text-[12px] text-red-600">{error}</p>}

                  <p className="text-center text-[12px] text-neutral-400">{form.footnote}</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT US — OFFICES ============ */}
      <section id="contact" className="relative bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 max-w-[640px]"
          >
            <h2 className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px] lg:text-[42px]">
              Contact Us
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
              Reach out to our India, USA, or Qatar team for product, distribution, partnership, and business enquiries.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {officeContacts.map((contact, index) => (
              <motion.div
                key={contact.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-[520px] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(18,45,35,0.15)]"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url("${contact.image}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/45 to-primary-dark/10" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col p-7 text-white md:p-8">
                  {/* Header */}
                  <div className="h-[132px] shrink-0">
                    <h3 className="break-words font-heading text-[42px] font-bold uppercase leading-none tracking-[-1px] text-white [overflow-wrap:anywhere] md:text-[52px]">
                      {contact.country}
                    </h3>
                  </div>

                  {/* Divider */}
                  <div className="shrink-0 border-t border-white/25" />

                  {/* Details */}
                  <div className="flex-1 pt-6">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6">
                      <div className="min-w-0">
                        <p className="font-heading text-[11px] font-medium uppercase tracking-[1.5px] text-white/55">
                          Contact Person
                        </p>
                        <p className="mt-2 text-[15px] font-semibold text-white">{contact.person}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="font-heading text-[11px] font-medium uppercase tracking-[1.5px] text-white/55">
                          Phone
                        </p>
                        <a
                          href={`tel:${contact.phone.replace(/[\s-]/g, '')}`}
                          className="mt-2 inline-block text-[15px] font-semibold text-white transition hover:text-secondary"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>

                    {contact.email && (
                      <div className="mt-5">
                        <p className="font-heading text-[11px] font-medium uppercase tracking-[1.5px] text-white/55">
                          Email
                        </p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="mt-2 inline-block break-all text-[15px] font-semibold text-white transition hover:text-secondary"
                        >
                          {contact.email}
                        </a>
                      </div>
                    )}

                    <div className="mt-5">
                      <p className="font-heading text-[11px] font-medium uppercase tracking-[1.5px] text-white/55">
                        Address
                      </p>
                      <address className="mt-2 not-italic text-[15px] leading-7 text-white/90">
                        {contact.address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/15" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
