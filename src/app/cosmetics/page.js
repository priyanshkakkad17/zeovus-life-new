'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Creams, serums, lotions and treatments for all skin types.',
    keyActives: ['Vitamin C', 'Retinol', 'Hyaluronic Acid', 'Niacinamide', 'Peptides', 'Aloe Vera'],
    formats: ['Creams', 'Serums', 'Lotions', 'Gels', 'Masks', 'Essences']
  },
  {
    id: 'haircare',
    name: 'Haircare',
    description: 'Shampoos, conditioners, treatments and styling products.',
    keyActives: ['Biotin', 'Keratin', 'Argan Oil', 'Saw Palmetto', 'Caffeine', 'Vitamins'],
    formats: ['Shampoos', 'Conditioners', 'Hair Serums', 'Hair Masks', 'Scalp Treatments', 'Styling']
  },
  {
    id: 'sun-care',
    name: 'Sun Care',
    description: 'Sunscreens, after-sun products and UV protection formulas.',
    keyActives: ['Zinc Oxide', 'Titanium Dioxide', 'Vitamin E', 'Aloe Vera', 'Niacinamide'],
    formats: ['SPF Lotions', 'SPF Creams', 'Spray Sunscreens', 'Mineral Sunscreens', 'After-Sun']
  },
  {
    id: 'body-care',
    name: 'Body Care',
    description: 'Body lotions, butters, oils and hand care products.',
    keyActives: ['Shea Butter', 'Coconut Oil', 'Vitamin E', 'Glycerin', 'Urea', 'Collagen'],
    formats: ['Body Lotions', 'Body Butters', 'Body Oils', 'Hand Creams', 'Foot Care', 'Bath Products']
  }
];

const benefits = [
  {
    title: 'Clean-Label Formulation',
    description: 'We prioritize minimal, recognizable ingredients without compromising efficacy.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Dermatologically Tested',
    description: 'Every formulation undergoes rigorous skin compatibility testing.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Sustainable Sourcing',
    description: 'We work with suppliers committed to ethical and sustainable ingredient sourcing.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Custom Formulations',
    description: 'Tailored solutions developed to meet your specific brand requirements.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    )
  }
];

function CosmeticsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || null);

  const selectedCat = categories.find(c => c.id === selectedCategory);

  return (
    <>
      {/* Benefits Section */}
      <section className="section-py bg-neutral-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-4">
              What Sets Our Cosmetics Apart
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Every product is developed with the same rigor and attention to quality as our nutraceuticals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary-light/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-light">
                  {benefit.icon}
                </div>
                <h3 className="font-display font-semibold text-lg text-primary-dark mb-2">{benefit.title}</h3>
                <p className="text-neutral-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Selection */}
      {!selectedCategory && (
        <section className="section-py bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-4">
                Explore Our Categories
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Clean-label cosmetics formulated for performance. Every product dermatologically tested and made in certified facilities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-neutral-100 rounded-xl overflow-hidden cursor-pointer card-hover group"
                >
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-2xl text-primary-dark mb-3 group-hover:text-primary-light transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-neutral-600 mb-4">{category.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-primary-dark mb-2">Key Actives</h4>
                      <div className="flex flex-wrap gap-1">
                        {category.keyActives.slice(0, 4).map((active, i) => (
                          <span key={i} className="text-xs bg-primary-light/10 text-primary-light px-2 py-0.5 rounded">
                            {active}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-primary-dark mb-2">Formats</h4>
                      <div className="flex flex-wrap gap-1">
                        {category.formats.slice(0, 4).map((format, i) => (
                          <span key={i} className="text-xs bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded">
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary-dark text-white py-3 px-6 flex items-center justify-between group-hover:bg-primary-light transition-colors">
                    <span className="font-medium">Explore {category.name}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Selected Category View */}
      {selectedCategory && selectedCat && (
        <section className="section-py bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-primary-light mb-6 hover:gap-3 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Categories
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-16 bg-primary-light rounded-full"></div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark">
                    {selectedCat.name}
                  </h2>
                  <p className="text-neutral-600 mt-2">{selectedCat.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-neutral-100 rounded-xl p-6">
                  <h3 className="font-semibold text-primary-dark mb-4">Key Actives</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCat.keyActives.map((active, i) => (
                      <span key={i} className="bg-white text-primary-dark px-3 py-1.5 rounded-full text-sm font-medium">
                        {active}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral-100 rounded-xl p-6">
                  <h3 className="font-semibold text-primary-dark mb-4">Available Formats</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCat.formats.map((format, i) => (
                      <span key={i} className="bg-white text-primary-dark px-3 py-1.5 rounded-full text-sm font-medium">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-neutral-500 text-center mt-8">
                Custom formulations available. Contact us for detailed specification sheets and customization options.
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="section-py bg-neutral-100">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-64 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 h-48"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cosmetics() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary-light via-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Formulated to Transform.
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              Visible results your customers notice — and come back for. Clean-label cosmetics formulated for performance.
            </p>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<LoadingFallback />}>
        <CosmeticsContent />
      </Suspense>

      {/* CTA Section */}
      <section className="section-py bg-primary-dark text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Let's build your next launch.
            </h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Bring us your formulation brief and we'll create cosmetics your customers will love.
            </p>
            <Link href="/contact" className="btn-primary bg-secondary text-primary-dark hover:bg-secondary-dark">
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}