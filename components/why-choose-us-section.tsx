"use client"

import { useEffect, useRef, useState } from "react"

const reasons = [
  {
    title: "Strategic Locations",
    description:
      "Our properties are positioned in high-demand commercial and lifestyle districts, maximising value for partners and guests alike.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    title: "Modern Facilities",
    description:
      "Every property is built and operated to international standards — from smart rooms to integrated retail and convention spaces.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: "Business & Lifestyle",
    description:
      "We serve both corporate travelers and lifestyle seekers — offering a seamless blend of productivity and premium comfort.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    title: "Trusted Management",
    description:
      "Backed by the experience of TMT Group and Mahadasha Group, our assets are managed with integrity and long-term vision.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
]

export default function WhyChooseUsSection() {
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
      id="why-us"
      aria-labelledby="why-us-heading"
      className="w-full bg-[#2A2E1F] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div
          className="mb-14 flex flex-col items-center gap-3 text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-[#B5B847]">
            Our Advantage
          </p>
          <h2
            id="why-us-heading"
            className="font-serif text-3xl font-semibold text-white text-balance md:text-4xl lg:text-5xl"
          >
            Why Choose Halla Mohana?
          </h2>
          <div className="mt-1 h-px w-12 bg-[#7A8C3C]" />
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="group flex flex-col gap-5 rounded-xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-[#7A8C3C]/50 hover:bg-white/10"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, background-color 0.3s ease, border-color 0.3s ease`,
              }}
            >
              {/* Icon circle */}
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7A8C3C]/20 text-[#B5B847] transition-colors duration-300 group-hover:bg-[#7A8C3C]/40">
                {reason.icon}
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-base font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-white/60">
                  {reason.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="mt-auto h-[2px] w-0 rounded-full bg-[#B5B847] transition-all duration-400 group-hover:w-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
