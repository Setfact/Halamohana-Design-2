"use client"

import { useEffect, useRef, useState } from "react"

const partners = [
  { name: "TMT Group", subtitle: "Parent Company" },
  { name: "Mahadasha Group", subtitle: "Management Partner" },
  { name: "FOX Hotels", subtitle: "Brand Partner" },
]

export default function PartnersSection() {
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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="partners"
      aria-labelledby="partners-heading"
      className="w-full bg-white py-20 border-y border-[#e8ead8]"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div
          className="mb-12 flex flex-col items-center gap-2 text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p
            id="partners-heading"
            className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-[#7A8C3C]"
          >
            Trusted By
          </p>
          <div className="mt-1 h-px w-8 bg-[#B5B847]" />
        </div>

        {/* Logo row */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {partners.map((partner, i) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center gap-2 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Logo pill — grayscale by default, color on hover */}
              <div className="flex h-16 min-w-[160px] items-center justify-center rounded-lg border border-[#e8ead8] bg-[#F8F9F4] px-8 py-4 grayscale transition-all duration-300 hover:grayscale-0 hover:border-[#7A8C3C] hover:bg-white hover:shadow-md">
                <span className="font-serif text-xl font-semibold text-[#2A2E1F] leading-none transition-colors duration-300 group-hover:text-[#7A8C3C]">
                  {partner.name}
                </span>
              </div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#9a9e84]">
                {partner.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
