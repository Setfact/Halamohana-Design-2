"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    quote:
      "Our partnership with Halla Mohana has been exceptional. Their attention to detail and commitment to quality sets them apart in the Indonesian hospitality market.",
    name: "Budi Santoso",
    position: "Director of Investments",
    company: "TMT Group",
  },
  {
    quote:
      "FOX Hotel Pekanbaru has consistently exceeded our expectations in terms of service delivery and operational excellence. A true benchmark for the region.",
    name: "Rina Wulandari",
    position: "Regional Manager",
    company: "Mahadasha Group",
  },
  {
    quote:
      "PekanbaruXchange has transformed the retail landscape of the city. Working with the Halla Mohana team is always a pleasure — professional and results-driven.",
    name: "Ahmad Fauzi",
    position: "Chief Executive Officer",
    company: "Riau Property Associates",
  },
]

function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-[#B5B847]/30"
      aria-hidden="true"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  )
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full overflow-hidden bg-[#F8F9F4] py-24 md:py-32"
    >
      {/* Subtle dot-grid pattern (same as stats) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.25]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dot-grid-t" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#7A8C3C" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid-t)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header */}
        <div
          className="mb-14 flex flex-col items-center gap-3 text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-[#7A8C3C]">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="font-serif text-3xl font-semibold text-[#2A2E1F] text-balance md:text-4xl"
          >
            What Our Partners Say
          </h2>
          <div className="mt-1 h-px w-12 bg-[#B5B847]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <blockquote
              key={t.name}
              className="flex flex-col gap-5 rounded-xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms, box-shadow 0.3s ease, translate 0.3s ease`,
              }}
            >
              <QuoteIcon />

              <p className="font-sans text-sm leading-relaxed text-[#5A5A4A] flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px w-full bg-[#e8ead8]" />

              {/* Attribution */}
              <footer className="flex items-center gap-4">
                {/* Avatar initials */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7A8C3C] font-sans text-sm font-semibold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-[#2A2E1F]">{t.name}</p>
                  <p className="font-sans text-xs text-[#7A8C3C]">
                    {t.position}, {t.company}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
