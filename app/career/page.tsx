import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import CareerHero from "@/components/career/career-hero"
import CareerContent from "@/components/career/career-content"
import FooterSection from "@/components/footer-section"

export const metadata: Metadata = {
  title: "Career — PT Halla Mohana",
  description: "Explore open positions at PT Halla Mohana and join our growing hospitality team.",
}

export default function CareerPage() {
  return (
    <main>
      <Navbar />
      <CareerHero />
      <CareerContent />
      <FooterSection />
    </main>
  )
}
