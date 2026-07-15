"use client"

import { useEffect, useRef, useState } from "react"

const values = [
  {
    title: "Hospitality First",
    description: "Genuine care for guests, communities, and every space we inhabit.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: "Design with Purpose",
    description: "Architecture crafted to blend local character with international standards.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    title: "Sustainable Growth",
    description: "Building for the long term with responsible and culturally-aware practices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22V12"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M8 6.8A9.98 9.98 0 0 1 12 2c1.87 0 3.61.52 5.09 1.41"/><path d="M8 6.8C9.14 5.08 10.47 4 12 4s2.86 1.08 4 2.8"/>
      </svg>
    ),
  },
]

function useFadeIn(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

export default function AboutSection() {
  const { ref: headerRef, visible: headerVisible } = useFadeIn(0.2)
  const { ref: imageRef, visible: imageVisible } = useFadeIn(0.15)
  const { ref: copyRef, visible: copyVisible } = useFadeIn(0.15)

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full overflow-hidden bg-[#F8F9F4] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Section label */}
        <div
          ref={headerRef}
          className="mb-16 flex flex-col items-center gap-3 text-center transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-[#7A8C3C]">
            Who We Are
          </p>
          <h2
            id="about-heading"
            className="font-serif text-3xl font-semibold text-[#2A2E1F] text-balance md:text-4xl lg:text-5xl"
          >
            Curating Places People
            <br />
            <span className="italic text-[#7A8C3C]">Love to Return To</span>
          </h2>
          <div className="mt-1 h-px w-12 bg-[#B5B847]" />
        </div>

        {/* Two-column layout: image left, copy right */}
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20">

          {/* Image column */}
          <div
            ref={imageRef}
            className="relative transition-all duration-700"
            style={{
              opacity: imageVisible ? 1 : 0,
              transform: imageVisible ? "translateX(0)" : "translateX(-32px)",
            }}
          >
            {/* Decorative offset frame */}
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-sm border border-[#B5B847]/40" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-sm bg-[#2c3320] aspect-[4/5]">
              <img
                src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Elegant hotel lobby interior reflecting PT Halla Mohana design philosophy"
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 right-6 z-10 rounded-sm bg-[#2A2E1F] px-5 py-4 shadow-lg">
              <p className="font-serif text-2xl font-bold leading-none text-[#B5B847]">15+</p>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-widest text-white/70">Years of Excellence</p>
            </div>
          </div>

          {/* Copy column */}
          <div
            ref={copyRef}
            className="flex flex-col gap-8 transition-all duration-700 delay-150"
            style={{
              opacity: copyVisible ? 1 : 0,
              transform: copyVisible ? "translateX(0)" : "translateX(32px)",
            }}
          >
            <div className="flex flex-col gap-5">
              <p className="font-sans text-base leading-relaxed text-[#6b6b55] text-pretty">
                PT Halla Mohana develops and manages premium hospitality assets — from hotels to lifestyle destinations — built for the modern business traveller and urban dweller across Indonesia.
              </p>
              <p className="font-sans text-base leading-relaxed text-[#6b6b55] text-pretty">
                Every space we create reflects our commitment to genuine comfort, purposeful design, and lasting distinction.
              </p>
            </div>

            {/* Value icon cards */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#dde0cc] pt-8">
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className="flex flex-col items-center gap-3 rounded-xl bg-white p-4 text-center shadow-sm transition-all duration-500"
                  style={{
                    opacity: copyVisible ? 1 : 0,
                    transform: copyVisible ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: `${200 + i * 100}ms`,
                  }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F2E6] text-[#7A8C3C]">
                    {value.icon}
                  </span>
                  <p className="font-sans text-xs font-semibold leading-snug text-[#2A2E1F]">
                    {value.title}
                  </p>
                  <p className="font-sans text-[11px] leading-relaxed text-[#8a8e72]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <a
                href="/about"
                className="inline-flex items-center gap-2 rounded-sm bg-[#7A8C3C] px-7 py-3 font-sans text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#B5B847] active:scale-95"
              >
                About Us
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
