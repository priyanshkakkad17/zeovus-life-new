'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function WorkingTogether({ content = {} }) {
  const options = content.items || [];
  const scrollContainerRef = useRef(null);

  if (content.enabled === false && options.length === 0) return null;

  // Default fallback items with uncropped original images
  const defaultItems = [
    {
      number: '01',
      title: 'Co-Development &\nFormulation Innovation',
      description: 'Bring your idea, brief or challenge.\nWe help you develop the right formulation.',
      image: '/images/working together 1.png',
      alt: 'Co-Development & Formulation Innovation - lab pipette and beaker',
    },
    {
      number: '02',
      title: 'Private Label & White Label',
      description: 'Launch under your own brand with support across formulation,\nsourcing and manufacturing.',
      image: '/images/working together 2.png',
      alt: 'Private Label & White Label - cosmetic dropper and cream bottles',
    },
    {
      number: '03',
      title: 'Distribution & Regional\nPartnerships',
      description: 'Take our products into new markets\nas a distribution partner.',
      image: '/images/working together 3.png',
      alt: 'Distribution & Regional Partnerships - warehouse and logistics',
    },
    {
      number: '04',
      title: 'Bulk Ingredient & Raw Material\nSupply',
      description: 'Source ingredients and raw materials\nat the required quantities.',
      image: '/images/working together 4.png',
      alt: 'Bulk Ingredient & Raw Material Supply - natural powder ingredient bowl',
    },
  ];

  // Map incoming items with default fallback images and numbering
  const displayItems = defaultItems.map((defaultItem, idx) => {
    const item = options[idx];
    return {
      number: defaultItem.number,
      title: item?.title || defaultItem.title,
      description: item?.description || defaultItem.description,
      image: defaultItem.image,
      alt: defaultItem.alt,
    };
  });

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="partnerships" className="relative w-full bg-[#EBF0E8] py-16 sm:py-20 lg:py-24 overflow-hidden">
      
      {/* Soft organic green ambient curves in corners/sides */}
      <div 
        className="pointer-events-none absolute -left-20 top-0 w-[420px] h-[600px] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle at 10% 30%, #CDE0C7 0%, rgba(205,224,199,0) 70%)'
        }}
      />
      <div 
        className="pointer-events-none absolute -right-24 top-0 w-[450px] h-[650px] rounded-full opacity-55"
        style={{
          background: 'radial-gradient(circle at 90% 20%, #CDE0C7 0%, rgba(205,224,199,0) 70%)'
        }}
      />

      {/* Botanical leaves sketch in bottom right corner */}
      <div className="pointer-events-none absolute right-2 -bottom-4 w-72 sm:w-96 lg:w-[440px] h-72 sm:h-96 lg:h-[440px] opacity-35 z-0">
        <svg viewBox="0 0 320 320" fill="none" className="w-full h-full">
          <path
            d="M320 320 C250 230, 170 170, 70 140 C90 230, 190 290, 320 320 Z"
            fill="#7CA372"
            opacity="0.3"
          />
          <path
            d="M320 250 C230 160, 140 110, 40 90 C70 180, 170 230, 320 250 Z"
            fill="#5D8D51"
            opacity="0.22"
          />
          <path
            d="M300 320 C220 210, 130 140, 20 100"
            stroke="#4A753F"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M230 230 C190 190, 135 155, 75 125"
            stroke="#4A753F"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />
          <path
            d="M170 180 C130 145, 90 120, 35 100"
            stroke="#4A753F"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative mx-auto max-w-[1720px] px-6 sm:px-10 lg:px-14 xl:px-16 z-10">
        
        {/* ================= HEADER ROW ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          
          {/* Left: Eyebrow + Serif Headline */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-5 h-[1.5px] bg-[#15A859]" />
              <p className="font-heading text-[11px] sm:text-[12px] font-bold tracking-[0.16em] uppercase text-[#15A859]">
                HOW WE WORK WITH YOU
              </p>
            </div>

            {/* Serif Title */}
            <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[50px] font-normal leading-[1.12] text-[#0C2D22] tracking-tight">
              We shape what you sell —<br />
              <span>and stay for what comes next.</span>
            </h2>
          </motion.div>

          {/* Right: Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md lg:pb-1"
          >
            <p className="font-sans text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#2C4A3E]/85 font-normal">
              From concept to commercialization, we work as an extension of your team to help you grow with confidence.
            </p>
          </motion.div>

        </div>

        {/* Carousel / Slider Container with side arrows */}
        <div className="relative">
          
          {/* Left Dark Circular Arrow */}
          <button
            type="button"
            aria-label="Previous card"
            onClick={() => scroll('left')}
            className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#525B54] hover:bg-[#3D453F] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={22} strokeWidth={2.2} />
          </button>

          {/* Right Dark Circular Arrow */}
          <button
            type="button"
            aria-label="Next card"
            onClick={() => scroll('right')}
            className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#525B54] hover:bg-[#3D453F] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight size={22} strokeWidth={2.2} />
          </button>

          {/* ================= 4 CARDS ================= */}
          <div
            ref={scrollContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 xl:gap-6 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {displayItems.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E2E8DE] flex flex-col hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 group"
              >
                {/* Image kept at exact original natural ~2.6:1 ratio without any cropping */}
                <div className="relative w-full aspect-[2103/748] overflow-hidden bg-[#EAEFE6] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Translucent Dark Pill with White Ring and White Number */}
                  <div className="absolute top-3.5 left-3.5 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/45 backdrop-blur-sm border border-white/50 flex items-center justify-center text-white font-heading font-medium text-[14px] sm:text-[15px] shadow-sm">
                    {item.number}
                  </div>
                </div>

                {/* Card Content Body - no excessive empty space */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="font-heading font-bold text-[16.5px] sm:text-[17.5px] text-[#0C2D22] mb-3 leading-[1.3] whitespace-pre-line group-hover:text-[#15A859] transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-[#55695E] leading-relaxed mb-6 font-normal whitespace-pre-line">
                    {item.description}
                  </p>

                  {/* Enquire CTA immediately follows description */}
                  <div className="mt-auto">
                    <Link
                      href={content.itemCtaHref || '/contact'}
                      className="inline-flex items-center gap-1.5 font-heading font-bold text-[13.5px] text-[#0C2D22] hover:text-[#15A859] group/link transition-colors"
                    >
                      <span>{content.itemCtaLabel || 'Enquire'}</span>
                      <span className="text-[17px] leading-none transition-transform group-hover/link:translate-x-1 font-sans">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
