import Navbar from "@/components/navbar"
import NewsHero from "@/components/news/news-hero"
import NewsContent from "@/components/news/news-content"
import FooterSection from "@/components/footer-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News Release | PT Halla Mohana",
  description: "Berita dan informasi terkini dari PT Halla Mohana — pengembang properti perhotelan terkemuka di Indonesia.",
}

export default function NewsPage() {
  return (
    <main>
      <Navbar />
      <NewsHero />
      <NewsContent />
      <FooterSection />
    </main>
  )
}
