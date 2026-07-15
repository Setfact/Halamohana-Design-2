"use client"

import { useEffect, useRef, useState } from "react"

const properties = [
  {
    id: "fox-hotel",
    name: "FOX Hotel Pekanbaru",
    type: "HOTEL",
    badgeColor: "bg-[#7A8C3C]",
    image:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "FOX Hotel Pekanbaru merupakan midscale hotel yang terletak di kawasan strategis di Jalan Riau dan hanya berjarak 30 menit berkendara dari Bandara Sultan Syarif Kasim II.",
    detail:
      "Memiliki akses langsung ke PX Pekanbaru Xchange dan dekat dengan ikon Jembatan Leighton yang terkenal.",
    location: "Jalan Riau, Pekanbaru, Riau, Indonesia",
    contact: "+62 761 741 5999",
  },
  {
    id: "pekanbaruxchange",
    name: "PekanbaruXchange",
    type: "MALL",
    badgeColor: "bg-[#B5B847]",
    image:
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "PekanbaruXchange adalah shopping center modern yang terletak di kawasan strategis Jalan Riau, Pekanbaru.",
    detail:
      "Menjadi ikon belanja dan lifestyle masyarakat Pekanbaru dengan tenant-tenant premium.",
    location: "Jalan Riau, Pekanbaru, Riau, Indonesia",
    contact: "+62 761 741 5000",
  },
]

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.49 6.49l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function PropertyCard({ property, index }: { property: typeof properties[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#e8ead8] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s, box-shadow 0.3s ease, translate 0.3s ease`,
      }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute left-4 top-4 rounded-sm px-3 py-1 font-sans text-xs font-semibold tracking-widest text-white ${property.badgeColor}`}>
          {property.type}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-6">
        <h3 className="font-serif text-xl font-bold text-[#2A2E1F] leading-snug">
          {property.name}
        </h3>

        <p className="font-sans text-base leading-relaxed text-[#5A6040]">
          {property.description}
        </p>

        <p className="font-sans text-sm leading-relaxed text-[#5A6040]/80 italic">
          {property.detail}
        </p>

        <div className="mt-1 flex flex-col gap-2 border-t border-[#e8ead8] pt-4">
          <div className="flex items-start gap-2 font-sans text-sm text-[#5A6040]">
            <span className="mt-0.5 shrink-0 text-[#7A8C3C]"><MapPinIcon /></span>
            <span>{property.location}</span>
          </div>
          <div className="flex items-center gap-2 font-sans text-sm text-[#5A6040]">
            <span className="shrink-0 text-[#7A8C3C]"><PhoneIcon /></span>
            <span>{property.contact}</span>
          </div>
        </div>

        <a
          href="#"
          className="mt-1 inline-flex w-fit items-center gap-1.5 font-sans text-sm font-semibold tracking-wide text-[#7A8C3C] transition-colors duration-200 hover:text-[#B5B847]"
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  )
}

export default function PropertiesContent() {
  const introRef = useRef<HTMLDivElement>(null)
  const [introVisible, setIntroVisible] = useState(false)

  useEffect(() => {
    const el = introRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIntroVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#F8F9F4] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Intro */}
        <div
          ref={introRef}
          className="mx-auto mb-16 max-w-2xl text-center lg:mb-20"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="mb-4 font-sans text-xs tracking-[0.4em] uppercase text-[#7A8C3C]">
            PT Halla Mohana
          </p>
          <h2 className="font-serif text-3xl font-semibold text-[#2A2E1F] text-balance md:text-4xl">
            Building The Best Facilities In Strategic Locations
          </h2>
          <div className="mx-auto my-5 flex items-center justify-center gap-3">
            <div className="h-[1.5px] w-10 bg-[#B5B847]" />
            <div className="h-1 w-1 rounded-full bg-[#B5B847]" />
            <div className="h-[1.5px] w-10 bg-[#B5B847]" />
          </div>
          <p className="font-sans text-base leading-relaxed text-[#5A6040] text-pretty">
            Established in 2013 and we are well on our way in developing major facilities in strategic
            locations to suit the lifestyle of our urban travelers.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-[#5A6040] text-pretty">
            Our first project is the construction of a hotel and shopping center that will serve as an
            iconic symbol to both the people of Pekanbaru and visitors alike.
          </p>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {properties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
