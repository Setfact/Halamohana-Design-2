import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import AboutSection from "@/components/about-section"

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />

      {/* Filler sections to demonstrate sticky behavior on scroll */}
      {(["Properties", "Gallery", "News", "Career", "Contact"] as const).map(
        (section) => (
          <section
            key={section}
            id={section.toLowerCase()}
            className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F8F9F4] px-6"
          >
            <p className="font-sans text-xs tracking-[0.35em] uppercase text-[#7A8C3C]">
              PT Halla Mohana
            </p>
            <h2 className="font-serif text-4xl font-semibold text-[#3a3a2e] text-balance text-center">
              {section}
            </h2>
            <div className="mt-2 h-[1.5px] w-12 rounded-full bg-[#B5B847]" />
            <p className="max-w-md text-center font-sans text-base leading-relaxed text-[#6b6b55] text-pretty">
              This section is a placeholder to demonstrate the sticky navigation
              bar and scroll behavior of the Halla Mohana website.
            </p>
          </section>
        )
      )}
    </main>
  )
}
