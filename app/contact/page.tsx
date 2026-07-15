import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import ContactHero from "@/components/contact/contact-hero"
import ContactContent from "@/components/contact/contact-content"
import FooterSection from "@/components/footer-section"

export const metadata: Metadata = {
  title: "Contact Us — PT Halla Mohana",
  description:
    "Get in touch with PT Halla Mohana. Visit our head office in Jakarta or our site office in Pekanbaru.",
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />
      <ContactContent />
      <FooterSection />
    </main>
  )
}
