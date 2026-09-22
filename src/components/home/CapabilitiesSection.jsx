'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ContentIcon } from '@/lib/content/icons';

export default function CapabilitiesSection({ content = {} }) {
  const features = content.features || [];
  const media = content.media || '';
  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(media);

  if (content.enabled === false) return null;

  return (
    <section id="formulation" className="bg-[#FFF5D1] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {content.eyebrow && (
                <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#15A859] mb-4">
                  {content.eyebrow}
                </p>
              )}
              <h2 className="text-[#1F4015] font-bold text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] text-balance mb-5">
                {content.heading || 'Formulation science, proven at manufacturing scale.'}
              </h2>
              {content.intro && (
                <p className="text-[#1F4015]/75 text-base leading-relaxed max-w-lg mb-9">
                  {content.intro}
                </p>
              )}
            </motion.div>

            <div className="space-y-7">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
                >
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-full bg-[#FAD563]/40 text-[#1F4015]">
                      <ContentIcon name={feature.icon} className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-[#1F4015] font-semibold text-base mb-1">{feature.title}</h3>
                      <p className="text-[#1F4015]/75 text-[15px] leading-relaxed">{feature.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href={content.ctaHref || '/capabilities'}
                className="mt-10 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#1F4015] text-[#FFF5D1] font-semibold text-sm hover:bg-[#15A859] hover:text-[#FFF5D1] transition-colors"
              >
                {content.ctaLabel || 'Explore Capabilities'} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Video column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-[#1F4015]/10 aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] shadow-[0_12px_40px_-15px_rgba(31,64,21,0.2)]">
              {isVideo ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Formulation science and manufacturing at Zeovus Life"
                >
                  <source src={media} type="video/mp4" />
                </video>
              ) : media ? (
                <img src={media} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
