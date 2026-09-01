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

  return (
    <>
      <HeroSection content={home.hero} />
      <TwoDivisions content={home.divisions} />
      <PortfolioHighlights content={home.portfolio} />
      <CapabilitiesSection content={home.capabilities} />
      <CertificationsSection content={home.quality} certifications={certifications} />
      <WorkingTogether content={home.partnership} />
    </>
  );
}
