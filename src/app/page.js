import HeroSection from '@/components/HeroSection';
import TwoDivisions from '@/components/home/TwoDivisions';
import PortfolioHighlights from '@/components/home/PortfolioHighlights';
import CapabilitiesSection from '@/components/home/CapabilitiesSection';
import CertificationsSection from '@/components/home/CertificationsSection';
import WorkingTogether from '@/components/home/WorkingTogether';
import { getContentGroup } from '@/lib/content/store';

export async function generateMetadata() {
  const [home, site] = await Promise.all([getContentGroup('home'), getContentGroup('site')]);
  const seo = home.seo || {};
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: site.seo?.siteUrl,
      siteName: site.seo?.siteName,
      type: 'website',
    },
  };
}

export default async function Home() {
  const [home, site] = await Promise.all([getContentGroup('home'), getContentGroup('site')]);
  const certifications = site.certifications?.items || [];
  const homeHero = {
    ...home.hero,
    media: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1788637260/hero_banner.mp4',
  };
  const homeCapabilities = {
    ...home.capabilities,
    media: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1788637325/Formulation_science.mp4',
  };

  return (
    <>
      <HeroSection content={homeHero} />
      <TwoDivisions content={home.divisions} />
      <PortfolioHighlights content={home.portfolio} />
      <CapabilitiesSection content={homeCapabilities} />
      <CertificationsSection content={home.quality} certifications={certifications} />
      <WorkingTogether content={home.partnership} />
    </>
  );
}
