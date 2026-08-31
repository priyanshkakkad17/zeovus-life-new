'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EditableRegion from '@/components/cms/EditableRegion';

const partnershipOptions = [
  {
    id: 'co-development',
    title: 'Co-Development & Formulation Innovation',
    description: 'Bring us a brief. Or bring us a problem nobody\'s solved yet. Either way, our formulation team builds it with you.'
  },
  {
    id: 'private-label',
    title: 'Private Label & White Label',
    description: 'Launch under your name, built on our formulation and manufacturing standard from the first batch to the last.'
  },
  {
    id: 'bulk-ingredients',
    title: 'Bulk Ingredient & Raw Material Supply',
    description: 'Actives and raw materials, sourced and supplied at the volume your production line actually needs.'
  },
  {
    id: 'distribution',
    title: 'Distribution & Regional Partnership',
    description: 'Take Zeovus Life formulations into markets we haven\'t reached yet — together.'
  }
];

const processSteps = [
  { num: '01', title: "We'll Respond", description: "We'll get back to you within one business day by email or phone." },
  { num: '02', title: "We'll Discuss", description: 'We\'ll understand your requirements and discuss the right formulation, ingredients and manufacturing approach for your product.' },
  { num: '03', title: "We'll Quote", description: 'We\'ll provide a clear, competitive quote tailored to your specific project needs.' },
];

export default function Contact() {
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
  const [content, setContent] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/content?page=contact')
      .then((res) => res.json())
      .then((data) => { if (!cancelled && data?.content) setContent(data.content); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
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
              <EditableRegion page="contact">
                <h1 className="max-w-[760px] font-heading text-[38px] font-bold uppercase leading-[1.02] tracking-[-1.5px] sm:text-[52px] lg:text-[62px]">
                  {content?.hero_title_lead || 'Bring the brief.'}
                  <br />
                  <span className="text-secondary lg:whitespace-nowrap">{content?.hero_title_accent || "We'll bring the batch."}</span>
                </h1>
                <p className="mt-7 max-w-[600px] text-[16px] leading-relaxed text-neutral-300 sm:text-[17px]">
                  {content?.hero_subtitle || 'Backed by decades of leadership experience across pharmaceuticals and nutraceuticals — now behind your next formula.'}
                </p> 
              </EditableRegion>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#enquire">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block cursor-pointer rounded-[2px] bg-secondary px-7 py-3.5 font-heading text-xs font-semibold tracking-widest text-primary-dark transition-colors hover:bg-secondary-dark"
                  >
                    START AN ENQUIRY
                  </motion.span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PARTNERSHIP OPTIONS ============ */}
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
              How we work together
            </p>
            <h2 className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px] lg:text-[42px]">
              Choose how you'd like to partner.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
              Select the model that fits your business. Your choice pre-fills the enquiry form below.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {partnershipOptions.map((option, index) => {
              const active = formData.interest === option.id;
              return (
                <motion.button
                  key={option.id}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, interest: option.id }));
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
              <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-primary-light">Enquire now</p>
              <h2 className="font-heading text-[28px] font-bold uppercase leading-[1.05] tracking-[-1px] text-primary-dark sm:text-[36px]">
                Tell us what you're building.
              </h2>

              <div className="mt-10 space-y-6 border-t border-neutral-200 pt-8">
                {processSteps.map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <span className="editorial-number font-heading text-[22px] font-bold leading-none text-primary-light">{step.num}</span>
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
                  <h3 className="mt-5 font-heading text-[24px] font-bold text-primary-dark">Thank you.</h3>
                  <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-neutral-500">
                    We've received your enquiry and will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>First Name *</label>
                      <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} className={inputClass} placeholder="John" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>Last Name *</label>
                      <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} className={inputClass} placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClass}>Company Name</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Your Company Ltd" />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address *</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@company.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone Number</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className={labelClass}>I'm interested in *</label>
                    <select id="interest" name="interest" required value={formData.interest} onChange={handleChange} className={`${inputClass} bg-transparent`}>
                      <option value="">Select an option</option>
                      {partnershipOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Tell us about your project *</label>
                    <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Product type, quantity, and any specific formulation needs..." />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-[3px] bg-primary-dark px-7 py-4 font-heading text-[12px] font-semibold uppercase tracking-[1.5px] text-white transition-colors duration-300 hover:bg-primary-light"
                  >
                    Submit Enquiry
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                  </motion.button>

                  <p className="text-center text-[12px] text-neutral-400">
                    We'll get back to you within one business day by email or phone.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
