"use client"

import { useEffect, useRef, useState } from "react"

type PropertyType = "Hotels" | "Malls"

const properties = [
  {
    type: "Hotels" as PropertyType,
    name: "FOX Hotel Pekanbaru",
    location: "Jl. Riau, Pekanbaru",
    description: "A contemporary business hotel offering comfortable rooms and modern amenities in the heart of Pekanbaru.",
    image:
      "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "FOX Hotel Pekanbaru lobby",
  },
  {
    type: "Malls" as PropertyType,
    name: "PekanbaruXchange",
    location: "Jl. Riau, Pekanbaru",
    description: "A premier lifestyle and retail destination anchoring the commercial heart of Pekanbaru's most vibrant district.",
    image:
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "PekanbaruXchange shopping mall interior",
  },
]

const badgeColor: Record<PropertyType, string> = {
  Hotels: "bg-[#7A8C3C] text-white",
  Malls: "bg-[#B5B847] text-[#2A2E1F]",
}

function useScrollReveal(threshold = 0.15) {
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

function PropertyCard({
  property,
  index,
  visible,
}: {
  property: (typeof properties)[number]
  index: number
  visible: boolean
}) {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, box-shadow 0.3s ease, translate 0.3s ease`,
      }}
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#e8ead8]">
        <img
          src={property.image}
          alt={property.imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Type badge */}
        <span
          className={`absolute left-3 top-3 rounded-sm px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-widest ${badgeColor[property.type]}`}
        >
          {property.type.slice(0, -1)}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-serif text-lg font-semibold leading-snug text-[#2A2E1F]">
          {property.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-[#7A8C3C]"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="font-sans text-sm text-[#5A6040]">{property.location}</span>
        </div>

        <p className="font-sans text-sm leading-relaxed text-[#8a8e72]">
          {property.description}
        </p>

        {/* View Details link */}
        <div className="mt-auto pt-4">
          <a
            href="#properties"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#7A8C3C] transition-colors duration-200 hover:text-[#B5B847]"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

export default function PropertiesSection() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2)
  const { ref: gridRef, visible: gridVisible } = useScrollReveal(0.1)


  return (
    <section
      id="properties"
      aria-labelledby="properties-heading"
      className="w-full bg-[#F8F9F4] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-12 flex flex-col items-center gap-3 text-center transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-[#7A8C3C]">
            Our Properties
          </p>
          <h2
            id="properties-heading"
            className="font-serif text-3xl font-semibold text-[#2A2E1F] text-balance md:text-4xl lg:text-5xl"
          >
            Spaces We Create &amp; Manage
          </h2>
          <div className="h-px w-12 bg-[#B5B847]" />
          <p className="mt-1 max-w-lg font-sans text-base leading-relaxed text-[#5A6040] text-pretty">
            Hotels and Malls designed for business travelers and urban lifestyle
            across Indonesia.
          </p>
        </div>

        {/* Property grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {properties.map((property, i) => (
            <PropertyCard
              key={property.name}
              property={property}
              index={i}
              visible={gridVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
