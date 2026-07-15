import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import AboutHero from "@/components/about/about-hero"
import AboutTabs from "@/components/about/about-tabs"
import FooterSection from "@/components/footer-section"

export const metadata: Metadata = {
  title: "Corporate Info — PT Halla Mohana",
  description:
    "Learn about PT Halla Mohana — our vision, mission, core values, company structure, and code of ethics.",
}

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <AboutTabs />
      <FooterSection />
    </main>
  )
}
