import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import GalleryHero from "@/components/gallery/gallery-hero"
import GalleryContent from "@/components/gallery/gallery-content"
import FooterSection from "@/components/footer-section"

export const metadata: Metadata = {
  title: "Gallery — PT Halla Mohana",
  description:
    "Explore the moments, milestones, and events that tell the story of PT Halla Mohana's journey in hospitality and property development.",
}

export default function GalleryPage() {
  return (
    <main>
      <Navbar />
      <GalleryHero />
      <GalleryContent />
      <FooterSection />
    </main>
  )
}
