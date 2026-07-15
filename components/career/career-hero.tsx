"use client"

import { useEffect, useState } from "react"

export default function CareerHero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden"
      aria-label="Career hero banner"
    >
      {/* Background image */}
      <img
        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Gradient fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />

      {/* Content */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-12"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}
      >
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 font-sans text-xs tracking-wide text-white/60">
          <a href="/" className="transition-colors hover:text-white">Home</a>
          <span aria-hidden="true">/</span>
          <span className="text-white/90">Career</span>
        </nav>

        <h1 className="font-serif text-4xl font-semibold text-white text-balance md:text-5xl">
          Career
        </h1>

        {/* Decorative rule */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-[1.5px] w-12 bg-[#B5B847]" />
          <div className="h-1 w-1 rounded-full bg-[#B5B847]" />
        </div>
      </div>
    </section>
  )
}
