import HeroSection from '@/components/HeroSection';
import TwoDivisions from '@/components/home/TwoDivisions';
import PortfolioHighlights from '@/components/home/PortfolioHighlights';
import CapabilitiesSection from '@/components/home/CapabilitiesSection';
import CertificationsSection from '@/components/home/CertificationsSection';
import WorkingTogether from '@/components/home/WorkingTogether';

export const metadata = {
  title: 'Zeovus Life — Nutraceutical & Cosmetic Manufacturer',
  description:
    'Trusted B2B nutraceutical and cosmetic manufacturer. Formulated to deliver, built to scale. GMP, ISO & HACCP certified.',
  openGraph: {
    title: 'Zeovus Life — Nutraceutical & Cosmetic Manufacturer',
    description:
      'Trusted B2B nutraceutical and cosmetic manufacturer. Formulated to deliver, built to scale.',
    url: 'https://zeovuslife.com',
    siteName: 'Zeovus Life',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TwoDivisions />
      <PortfolioHighlights />
      <CapabilitiesSection />
      <CertificationsSection />
      <WorkingTogether />
    </>
  );
}
