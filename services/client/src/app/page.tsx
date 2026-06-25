import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModelSection from "@/components/ModelSection";
import PhasesSection from "@/components/PhasesSection";
import StatStripSection from "@/components/StatStripSection";
import FeedbackFormWrapper from "@/components/FeedbackFormWrapper";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/SiteConfig";
import { contentService } from "@/lib/ContentService";

/**
 * Composition root for the landing page.
 *
 * DIP  — this Server Component depends on service abstractions
 *         (ISiteConfig, IContentProvider) and passes plain data
 *         objects down to components via their typed prop interfaces.
 *         Components never import services directly; they receive data.
 * SRP  — sole responsibility: wire services → component props.
 */
export default function Home() {
  const heroContent     = contentService.getHeroContent();
  const modelContent    = contentService.getModelContent();
  const phasesContent   = contentService.getPhasesContent();
  const statContent     = contentService.getStatStripContent();
  const feedbackContent = contentService.getFeedbackFormContent();
  const footerContent   = contentService.getFooterContent();

  return (
    <>
      <Navbar
        brandName={siteConfig.name}
        tagline={siteConfig.tagline}
        logoUrl={siteConfig.faviconUrl}
      />
      <HeroSection content={heroContent} />
      <hr className="section-divider" />
      <ModelSection content={modelContent} />
      <hr className="section-divider" />
      <PhasesSection content={phasesContent} />
      <StatStripSection content={statContent} />
      <FeedbackFormWrapper content={feedbackContent} />
      <Footer content={footerContent} />
    </>
  );
}
