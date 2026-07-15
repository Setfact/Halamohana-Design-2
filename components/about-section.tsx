"use client"

import { useEffect, useRef, useState } from "react"

const pillars = [
  {
    number: "01",
    title: "Hospitality First",
    description:
      "Every space we develop is anchored by genuine care — for guests, for communities, and for the environments we inhabit.",
  },
  {
    number: "02",
    title: "Design with Purpose",
    description:
      "Architecture and interiors are crafted to evoke calm confidence, blending local character with international standards.",
  },
  {
    number: "03",
    title: "Sustainable Growth",
    description:
      "We build for the long term, integrating responsible practices that honour both culture and ecology.",
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
                PT Halla Mohana was founded on the belief that genuine hospitality
                is a form of art — one that requires patience, precision, and deep
                respect for the people it serves. From our first property in
                Indonesia to our growing presence across Southeast Asia, we have
                remained committed to creating environments that feel both
                exceptional and effortlessly human.
              </p>
              <p className="font-sans text-base leading-relaxed text-[#6b6b55] text-pretty">
                We develop, manage, and operate hospitality assets that serve the
                modern business traveller and lifestyle-conscious urban dweller —
                places where comfort is never an afterthought and distinction is
                built into every detail.
              </p>
            </div>

            {/* Pillars */}
            <div className="flex flex-col gap-6 border-t border-[#dde0cc] pt-8">
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.number}
                  className="flex gap-5 transition-all duration-500"
                  style={{
                    opacity: copyVisible ? 1 : 0,
                    transform: copyVisible ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: `${200 + i * 100}ms`,
                  }}
                >
                  <span className="mt-0.5 font-serif text-sm font-semibold text-[#B5B847] shrink-0">
                    {pillar.number}
                  </span>
                  <div>
                    <p className="font-sans text-sm font-semibold text-[#2A2E1F]">
                      {pillar.title}
                    </p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-[#6b6b55]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <a
                href="#properties"
                className="inline-flex items-center gap-2 rounded-sm bg-[#7A8C3C] px-7 py-3 font-sans text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#B5B847] active:scale-95"
              >
                Explore Our Properties
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
