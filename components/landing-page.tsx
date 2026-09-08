import { AnnouncementBanner } from "@/components/landing-page/announcement-banner";
import { Header } from "@/components/landing-page/header";
import { Hero } from "@/components/landing-page/hero";
import { SocialProof } from "@/components/landing-page/social-proof";
import { ProblemSolution } from "@/components/landing-page/problem-solution";
import { FeaturePillars } from "@/components/landing-page/feature-pillars";
import { Workflow } from "@/components/landing-page/workflow";
import { DocumentPreview } from "@/components/landing-page/document-preview";
import { Pricing } from "@/components/landing-page/pricing";
import { Testimonials } from "@/components/landing-page/testimonials";
import { Faq } from "@/components/landing-page/faq";
import { AiEthics } from "@/components/landing-page/ai-ethics";
import { FinalCta } from "@/components/landing-page/final-cta";
import { ThemeDemo } from "@/components/theme/theme-demo";
import { Footer } from "@/components/landing-page/footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <AnnouncementBanner />
      <Header />
      <main className="w-full overflow-hidden">
        <Hero />
        <SocialProof />
        <ProblemSolution />
        <FeaturePillars />
        <Workflow />
        <DocumentPreview />
        <Pricing />
        <Testimonials />
        <Faq />
        <AiEthics />
        <FinalCta />
        <ThemeDemo />
      </main>
      <Footer />
    </div>
  );
}
