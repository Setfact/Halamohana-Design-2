import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import AboutSection from "@/components/about-section"
import PropertiesSection from "@/components/properties-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import TestimonialsSection from "@/components/testimonials-section"
import PartnersSection from "@/components/partners-section"
import CtaSection from "@/components/cta-section"
import FooterSection from "@/components/footer-section"

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <PropertiesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <PartnersSection />
      <CtaSection />
      <FooterSection />
    </main>
  )
}
