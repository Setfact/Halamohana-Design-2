"use client"

import { useState, useEffect, useRef } from "react"

const slides = [
  {
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7820473-hd_1920_1080_25fps-uMJkTDi3VwM3xWq9J5ZxrKWqARxToP.mp4",
    poster: "",
    label: "Kuala Lumpur",
  },
  {
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4185227-hd_1920_1080_25fps-NzswSs3FGe8NDQdJgxEVCzFd2wosgl.mp4",
    poster: "",
    label: "Jakarta",
  },
  {
    // Pexels free-use modern hotel corridor
    videoSrc: "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/3209828/pictures/preview-0.jpg",
    label: "Bali",
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // When slide changes, play the new video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === current) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [current])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero — Halla Mohana"
    >
      {/* ── Video layers ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== current}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el }}
            src={slide.videoSrc}
            poster={slide.poster}
            autoPlay={i === 0}
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.55)_100%)]"
        aria-hidden="true"
      />

      {/* ── Social icons — left side ── */}
      <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
        <span className="block h-12 w-[1px] bg-white/20" />
        <a
          href="#"
          aria-label="LinkedIn"
          className="text-white/50 transition-all duration-200 hover:text-[#B5B847] hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="text-white/50 transition-all duration-200 hover:text-[#B5B847] hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </a>
        <span className="block h-12 w-[1px] bg-white/20" />
      </div>

      {/* ── Centered text ── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Top label — fade up */}
        <p
          className="font-sans text-[11px] font-medium tracking-[0.45em] uppercase text-[#B5B847] mb-5"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          Welcome to
        </p>

        {/* Main headline — word by word reveal */}
        <h1 className="font-serif text-5xl font-semibold leading-tight text-white text-balance md:text-7xl lg:text-8xl">
          {"Halla Mohana".split(" ").map((word, wi) => (
            <span
              key={wi}
              className="inline-block mr-4 last:mr-0"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s ease ${0.25 + wi * 0.18}s, transform 0.7s ease ${0.25 + wi * 0.18}s`,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Decorative rule — fade */}
        <div
          className="my-5 flex items-center gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.7s ease 0.65s",
          }}
        >
          <span className="block h-[1px] w-16 bg-white/30" />
          <span className="block h-1 w-1 rounded-full bg-[#B5B847]" />
          <span className="block h-[1px] w-16 bg-white/30" />
        </div>

        {/* Subheadline — fade up */}
        <p
          className="font-serif text-xl italic font-light text-white/80 tracking-wide md:text-2xl"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s",
          }}
        >
          Hospitality Development
        </p>

        {/* Description — fade up */}
        <p
          className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/60 text-pretty md:text-base"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.7s ease 0.88s, transform 0.7s ease 0.88s",
          }}
        >
          Building premium spaces for business travelers and urban lifestyle
        </p>

        {/* CTA — fade up */}
        <a
          href="#properties"
          className="mt-10 inline-block rounded-sm bg-[#1a1a14] px-10 py-3.5 font-sans text-sm font-medium tracking-[0.12em] uppercase text-white border border-white/20 transition-all duration-300 hover:bg-[#7A8C3C] hover:border-[#7A8C3C] hover:shadow-[0_0_30px_rgba(122,140,60,0.35)] active:scale-95"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.7s ease 1.0s, transform 0.7s ease 1.0s",
          }}
        >
          Explore Properties
        </a>

        {/* Slide location label */}
        <p
          className="mt-8 font-sans text-[10px] tracking-[0.35em] uppercase text-white/40"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.7s ease 1.1s",
          }}
        >
          {slides[current].label}
        </p>
      </div>

      {/* ── Left arrow ── */}
      <div
        className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full p-2 md:flex"
        style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
      >
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2A2E1F] transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="10 3 5 8 10 13" />
          </svg>
        </button>
      </div>

      {/* ── Right arrow ── */}
      <div
        className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full p-2 md:flex"
        style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
      >
        <button
          onClick={next}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2A2E1F] transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 3 11 8 6 13" />
          </svg>
        </button>
      </div>

      {/* ── Slide track indicators — right side ── */}
      <div
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex"
        role="tablist"
        aria-label="Slide indicators"
      >
        {slides.map((slide, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            onClick={() => setCurrent(i)}
            className="group relative flex items-center gap-2 transition-all duration-300"
          >
            {/* Track line */}
            <span
              className="block w-[2px] rounded-full transition-all duration-300"
              style={{
                height: i === current ? "40px" : "24px",
                background: i === current ? "#7A8C3C" : "rgba(255,255,255,0.5)",
              }}
            />
            {/* Label — shown on active */}
            <span
              className="font-sans text-[9px] tracking-[0.25em] uppercase transition-all duration-300"
              style={{
                color: i === current ? "#B5B847" : "rgba(255,255,255,0.4)",
                opacity: i === current ? 1 : 0,
                transform: i === current ? "translateX(0)" : "translateX(-4px)",
              }}
            >
              {slide.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 rounded-full px-4 py-3"
        style={{ background: "rgba(0,0,0,0.3)" }}
      >
        <span
          className="font-sans font-medium uppercase text-white"
          style={{ fontSize: "12px", letterSpacing: "3px" }}
        >
          Scroll
        </span>

        {/* Progress bar */}
        <div
          className="overflow-hidden rounded-sm"
          style={{ width: "60px", height: "4px", background: "rgba(255,255,255,0.3)" }}
        >
          <div
            className="h-full rounded-sm bg-[#7A8C3C] transition-all duration-700"
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Bouncing arrow */}
        <a
          href="#stats"
          aria-label="Scroll down"
          className="flex animate-bounce items-center justify-center text-white transition-colors duration-300 hover:text-[#B5B847]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
