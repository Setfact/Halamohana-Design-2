import Navbar from "@/components/navbar"

export default function Page() {
  return (
    <main>
      <Navbar />

      {/* Hero Section — dark bg so transparent navbar is visible */}
      <section
        id="home"
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#2c3320]"
      >
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#B5B847]">
            PT Halla Mohana
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl text-balance">
            Where Comfort Meets&nbsp;
            <span className="italic text-[#B5B847]">Distinction</span>
          </h1>
          <p className="max-w-xl font-sans text-base leading-relaxed text-white/70 text-pretty">
            Curated hospitality developments for the discerning business traveler
            and urban lifestyle connoisseur.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#properties"
              className="rounded-sm bg-[#7A8C3C] px-8 py-3 font-sans text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#B5B847] hover:shadow-lg active:scale-95"
            >
              Explore Properties
            </a>
            <a
              href="#about"
              className="rounded-sm border border-white/40 px-8 py-3 font-sans text-sm font-medium tracking-wide text-white/90 transition-all duration-200 hover:border-white hover:text-white"
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50">
            Scroll
          </span>
          <span className="block h-8 w-[1px] animate-pulse bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* Filler sections to demonstrate sticky behavior on scroll */}
      {(["About", "Properties", "Gallery", "News", "Career", "Contact"] as const).map(
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
