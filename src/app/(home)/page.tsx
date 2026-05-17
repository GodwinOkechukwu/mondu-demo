import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/Statssection";
import { SolutionsSection } from "./components/Solutionssection";
import { ProductsSection } from "./components/Productssection";
import { WhyMondySection } from "./components/Whymondysection";
import { DevelopersSection } from "./components/Developerssection";
import { ComplianceSection } from "./components/Compliancesection";
import { CTASection } from "./components/CTASection";
import { ContactSection } from "./components/Contactsection";
import Footer from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <SolutionsSection />
      <ProductsSection />
      <WhyMondySection />
      <DevelopersSection />
      <ComplianceSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </>
  );
}
