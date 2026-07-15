"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const photos = [
  {
    id: 1,
    title: "Revival Party FOX HARRIS Hotel Pekanbaru",
    category: "Events",
    src: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800",
    srcFull: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 2,
    title: "Mall Events",
    category: "Events",
    src: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800",
    srcFull: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 3,
    title: "Ground Breaking",
    category: "Milestones",
    src: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800",
    srcFull: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 4,
    title: "Underconstruction",
    category: "Milestones",
    src: "https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=800",
    srcFull: "https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 5,
    title: "Hotel Opening",
    category: "Milestones",
    src: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800",
    srcFull: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 6,
    title: "Gala Dinner",
    category: "Events",
    src: "https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=800",
    srcFull: "https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 7,
    title: "Team Building",
    category: "Company",
    src: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    srcFull: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 8,
    title: "Grand Opening",
    category: "Milestones",
    src: "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=800",
    srcFull: "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
]

const categories = ["All", "Events", "Milestones", "Company"]

const YEARS = ["All Years", "2024", "2023", "2022", "2021"]
const MONTHS = [
  "All Months", "January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October", "November", "December",
]

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeYear, setActiveYear] = useState("All Years")
  const [activeMonth, setActiveMonth] = useState("All Months")
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set())
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const filtered = photos.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  )

  // Intersection observer for stagger fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number((entry.target as HTMLElement).dataset.id)
            setVisibleIds((prev) => new Set(prev).add(id))
          }
        })
      },
      { threshold: 0.1 }
    )
    itemRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [filtered.length])

  // Keyboard navigation for lightbox
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIdx === null) return
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i! + 1) % filtered.length)
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i! - 1 + filtered.length) % filtered.length)
      if (e.key === "Escape") setLightboxIdx(null)
    },
    [lightboxIdx, filtered.length]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handleKey])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightboxIdx])

  const activeFilters = [
    activeYear !== "All Years" ? activeYear : null,
    activeMonth !== "All Months" ? activeMonth : null,
  ].filter(Boolean) as string[]

  return (
    <section id="gallery" className="bg-[#F8F9F4] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Quote */}
        <div className="mb-16 text-center">
          <blockquote className="mx-auto max-w-3xl font-serif text-xl italic leading-relaxed text-[#2A2E1F] md:text-2xl text-balance">
            &ldquo;We invite you to join us in every step of our way as we aim to achieve our goals and accomplish our missions.&rdquo;
          </blockquote>
          <p className="mt-4 font-sans text-sm leading-relaxed text-[#6b6b55] text-pretty max-w-2xl mx-auto">
            Since a picture describes a thousand words, so shall we tell our story as it unfolds here and now.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-[1.5px] w-10 bg-[#B5B847]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#B5B847]" />
            <div className="h-[1.5px] w-10 bg-[#B5B847]" />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-sm px-4 py-2 font-sans text-sm font-medium tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#7A8C3C] text-white shadow-sm"
                    : "border border-[#d6d9c4] bg-white text-[#3a3a2e] hover:border-[#7A8C3C] hover:text-[#7A8C3C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dropdowns */}
          <div className="ml-auto flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={activeMonth}
                onChange={(e) => setActiveMonth(e.target.value)}
                className="appearance-none rounded-sm border border-[#d6d9c4] bg-white py-2 pl-4 pr-8 font-sans text-sm text-[#3a3a2e] transition-colors focus:border-[#7A8C3C] focus:outline-none"
              >
                {MONTHS.map((m) => <option key={m}>{m}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8C3C]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <div className="relative">
              <select
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
                className="appearance-none rounded-sm border border-[#d6d9c4] bg-white py-2 pl-4 pr-8 font-sans text-sm text-[#3a3a2e] transition-colors focus:border-[#7A8C3C] focus:outline-none"
              >
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8C3C]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Active filter tags */}
        {activeFilters.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 rounded-full bg-[#7A8C3C]/10 px-3 py-1 font-sans text-xs font-medium text-[#7A8C3C]"
              >
                {f}
                <button
                  aria-label={`Remove ${f} filter`}
                  onClick={() => {
                    if (YEARS.includes(f)) setActiveYear("All Years")
                    else setActiveMonth("All Months")
                  }}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7A8C3C]/20 transition-colors hover:bg-[#7A8C3C]/40"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Masonry grid */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {filtered.map((photo, idx) => {
            const delay = (idx % 4) * 80
            const visible = visibleIds.has(photo.id)
            return (
              <div
                key={photo.id}
                data-id={photo.id}
                ref={(el) => { if (el) itemRefs.current.set(photo.id, el) }}
                className="mb-4 break-inside-avoid"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
                }}
              >
                <button
                  onClick={() => setLightboxIdx(idx)}
                  className="group relative block w-full overflow-hidden rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8C3C]"
                  aria-label={`View ${photo.title}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-black/0 transition-all duration-300 group-hover:bg-black/60">
                    <div className="w-full translate-y-2 px-4 pb-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="font-sans text-sm font-medium leading-snug text-white text-balance">
                        {photo.title}
                      </p>
                      <span className="mt-1 inline-block font-sans text-[11px] tracking-wider uppercase text-[#B5B847]">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center font-sans text-sm text-[#6b6b55]">
            No photos found for the selected filters.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${filtered[lightboxIdx].title}`}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIdx(null)}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 font-sans text-sm text-white/60">
            {lightboxIdx + 1} / {filtered.length}
          </div>

          {/* Prev */}
          <button
            onClick={() => setLightboxIdx((i) => (i! - 1 + filtered.length) % filtered.length)}
            aria-label="Previous photo"
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:left-8"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Image + title */}
          <div className="flex max-h-[85vh] max-w-5xl flex-col items-center gap-4 px-16">
            <img
              key={filtered[lightboxIdx].id}
              src={filtered[lightboxIdx].srcFull}
              alt={filtered[lightboxIdx].title}
              className="max-h-[75vh] w-auto rounded-sm object-contain shadow-2xl"
              style={{ animation: "fadeIn 0.25s ease" }}
            />
            <p className="font-sans text-sm font-medium text-white/90">
              {filtered[lightboxIdx].title}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={() => setLightboxIdx((i) => (i! + 1) % filtered.length)}
            aria-label="Next photo"
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-8"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
    </section>
  )
}
