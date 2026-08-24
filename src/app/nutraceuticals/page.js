'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const categories = [
  {
    id: 'healthy-ageing',
    name: 'Healthy Ageing & Cellular Health',
    description: 'Formulations designed to support healthy ageing, cellular health and antioxidant protection.',
    products: 27,
    keyActives: ['CoQ10', 'Omega-3', 'Collagen', 'Vitamin D3', 'Glutathione', 'Lutein'],
    color: 'from-amber-600 to-orange-600'
  },
  {
    id: 'multivitamins',
    name: 'Daily Multivitamins & Foundational Nutrition',
    description: 'Comprehensive daily multivitamins for complete nutritional support.',
    products: 28,
    keyActives: ['Vitamin B-Complex', 'Vitamin C', 'Zinc', 'Magnesium', 'Iron', 'Selenium'],
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 'gut-health',
    name: 'Gut Health & Digestive Wellness',
    description: 'Probiotics, prebiotics and digestive enzymes for optimal gut health.',
    products: 28,
    keyActives: ['Probiotics', 'Prebiotics', 'Digestive Enzymes', 'Fiber', 'L-Glutamine'],
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    description: "Specialized formulations for women's unique nutritional needs across life stages.",
    products: 46,
    keyActives: ['Iron', 'Calcium', 'Vitamin D3', 'Evening Primrose', 'B-Vitamins', 'Folate'],
    color: 'from-pink-600 to-rose-600'
  },
  {
    id: 'mens-health',
    name: "Men's Health",
    description: "Targeted solutions for men's health concerns including energy, vitality and prostate support.",
    products: 18,
    keyActives: ['Zinc', 'Selenium', 'Saw Palmetto', 'B-Vitamins', 'L-Carnitine', 'Ashwagandha'],
    color: 'from-indigo-600 to-blue-600'
  },
  {
    id: 'brain-stress-sleep',
    name: 'Brain, Stress & Sleep',
    description: 'Nootropic, adaptogenic and sleep-support formulations for mental wellness.',
    products: 41,
    keyActives: ['Ashwagandha', 'GABA', 'L-Theanine', 'Melatonin', 'Bacopa', 'Phosphatidylserine'],
    color: 'from-purple-600 to-violet-600'
  },
  {
    id: 'immunity',
    name: 'Immunity & Respiratory',
    description: 'Immune-support formulations with vitamins, minerals and herbal extracts.',
    products: 38,
    keyActives: ['Vitamin C', 'Zinc', 'Elderberry', 'Echinacea', 'Vitamin D3', 'Propolis'],
    color: 'from-red-600 to-orange-600'
  },
  {
    id: 'joint-bone',
    name: 'Joint & Bone Health',
    description: 'Comprehensive bone and joint support with clinically studied ingredients.',
    products: 35,
    keyActives: ['Glucosamine', 'Chondroitin', 'MSM', 'Calcium', 'Vitamin D3', 'Boswellia'],
    color: 'from-cyan-600 to-blue-600'
  },
  {
    id: 'heart-health',
    name: 'Heart Health',
    description: 'Cardiovascular support formulations with heart-healthy nutrients.',
    products: 28,
    keyActives: ['Omega-3 EPA/DHA', 'CoQ10', 'Garlic Extract', 'Plant Sterols', 'Fiber', 'Vitamin K2'],
    color: 'from-rose-600 to-pink-600'
  },
  {
    id: 'energy-sports',
    name: 'Energy, Sports & Recovery',
    description: 'Performance and recovery formulations for active lifestyles.',
    products: 35,
    keyActives: ['Caffeine', 'Creatine', 'BCAA', 'L-Citrulline', 'Electrolytes', 'CoQ10'],
    color: 'from-yellow-600 to-amber-600'
  },
  {
    id: 'weight-mgmt',
    name: 'Weight Management',
    description: 'Science-backed formulations to support healthy weight management.',
    products: 16,
    keyActives: ['Garcinia Cambogia', 'Green Tea Extract', 'L-Carnitine', 'Fiber', 'Chromium'],
    color: 'from-lime-600 to-green-600'
  },
  {
    id: 'beauty',
    name: 'Beauty from Within',
    description: 'Nutri-cosmetics for skin, hair and nail health from the inside out.',
    products: 32,
    keyActives: ['Collagen', 'Biotin', 'Hyaluronic Acid', 'Vitamin C', 'Zinc', 'Silica'],
    color: 'from-fuchsia-600 to-pink-600'
  },
  {
    id: 'children',
    name: "Children's Nutrition",
    description: 'Kid-friendly formulations for growing bodies and developing minds.',
    products: 5,
    keyActives: ['Multivitamins', 'Omega-3', 'Probiotics', 'Vitamin D3', 'Calcium'],
    color: 'from-sky-600 to-blue-600'
  },
  {
    id: 'specialty',
    name: 'Specialty Care',
    description: 'Specialized formulations for specific health conditions and needs.',
    products: 24,
    keyActives: ['Herbal Blends', 'Standardized Extracts', 'Botanicals', 'Ayurvedic Herbs'],
    color: 'from-emerald-600 to-green-600'
  }
];

function NutraceuticalsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || null);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const selectedCat = categories.find(c => c.id === selectedCategory);

  return (
    <>
      {/* Hero Section - only show when no category selected */}
      {!selectedCategory && (
        <section className="section-py bg-neutral-100">
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
                268+ proven formulations across 14 health categories, each developed with clinical rigor and manufactured to international standards.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer card-hover group"
                >
                  <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display font-semibold text-lg text-primary-dark group-hover:text-primary-light transition-colors">
                        {category.name}
                      </h3>
                      <span className="bg-neutral-100 text-neutral-600 text-sm px-2 py-1 rounded">
                        {category.products} SKUs
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {category.keyActives.slice(0, 4).map((active, i) => (
                        <span key={i} className="text-xs bg-primary-light/10 text-primary-light px-2 py-0.5 rounded">
                          {active}
                        </span>
                      ))}
                    </div>
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
                <div className={`w-1 h-16 bg-gradient-to-b ${selectedCat.color} rounded-full`}></div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark">
                    {selectedCat.name}
                  </h2>
                  <p className="text-neutral-600 mt-2">{selectedCat.description}</p>
                </div>
              </div>

              <div className="bg-neutral-100 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-primary-dark mb-4">Key Actives</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCat.keyActives.map((active, i) => (
                    <span key={i} className="bg-white text-primary-dark px-3 py-1.5 rounded-full text-sm font-medium">
                      {active}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-neutral-500 text-center">
                {selectedCat.products}+ product formulations available in this category.
                <br />
                Contact us for detailed specification sheets and customization options.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 h-48"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Nutraceuticals() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
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
              Formulated to Deliver.
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              Health improvements your customers notice. Trusted formulations backed by science and manufactured to global standards.
            </p>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<LoadingFallback />}>
        <NutraceuticalsContent />
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
              Let's build your next formula.
            </h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Bring us your formulation brief and we'll work with you to create the perfect product.
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