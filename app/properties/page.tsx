import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import PropertiesHero from "@/components/properties/properties-hero"
import PropertiesContent from "@/components/properties/properties-content"
import FooterSection from "@/components/footer-section"

export const metadata: Metadata = {
  title: "Our Project — PT Halla Mohana",
  description:
    "Explore PT Halla Mohana's flagship developments: FOX Hotel Pekanbaru and PekanbaruXchange — building the best facilities in strategic locations.",
}

export default function PropertiesPage() {
  return (
    <main>
      <Navbar />
      <PropertiesHero />
      <PropertiesContent />
      <FooterSection />
    </main>
  )
}
