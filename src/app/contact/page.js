'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Bring the Brief. We'll Bring the Batch.
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Backed by decades of leadership experience across pharmaceuticals and nutraceuticals — now behind your next formula.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Options */}
      <section className="section-py bg-neutral-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-4">
              How Can We Work Together?
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Choose how you'd like to partner with us. Each option is tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {partnershipOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer ${
                  formData.interest === option.id
                    ? 'border-primary-light shadow-lg'
                    : 'border-transparent hover:border-primary-light/30'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, interest: option.id }))}
              >
                <h3 className="font-display font-semibold text-lg text-primary-dark mb-3">{option.title}</h3>
                <p className="text-neutral-600 text-sm">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-primary-dark mb-2 text-center">
                Enquire Now
              </h2>
              <p className="text-neutral-600 text-center mb-8">
                Tell us what you're building. Fill out the form below, and we'll come back with a clear, competitive quote.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
                  <p className="text-green-700">
                    We've received your enquiry and will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-neutral-700 mb-2">
                      I'm interested in *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select an option</option>
                      {partnershipOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Please describe your requirements, including product type, quantity, and any specific formulation needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary bg-primary-light hover:bg-primary text-white py-4 text-lg"
                  >
                    Submit Enquiry
                  </button>
                </form>
              )}

              <div className="mt-8 text-center text-neutral-500 text-sm">
                <p>We'll get back to you within one business day by email or phone.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="section-py bg-neutral-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-display font-bold text-primary-dark mb-8">
              What Happens After You Submit Your Enquiry?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-light font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-primary-dark mb-2">We'll Respond</h3>
                <p className="text-neutral-600 text-sm">
                  We'll get back to you within one business day by email or phone.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-light font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-primary-dark mb-2">We'll Discuss</h3>
                <p className="text-neutral-600 text-sm">
                  We'll understand your requirements and discuss the right formulation, ingredients and manufacturing approach for your product.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-light font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-primary-dark mb-2">We'll Quote</h3>
                <p className="text-neutral-600 text-sm">
                  We'll provide a clear, competitive quote tailored to your specific project needs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}