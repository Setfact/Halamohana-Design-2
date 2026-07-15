"use client"

import { useState, useEffect, useRef } from "react"

const slides = [
  {
    // Pexels free-use luxury hotel lobby / atrium
    videoSrc: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/3571264/pictures/preview-0.jpg",
    label: "Kuala Lumpur",
  },
  {
    // Pexels free-use rooftop pool at sunset
    videoSrc: "https://videos.pexels.com/video-files/2795405/2795405-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/2795405/pictures/preview-0.jpg",
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

      {/* ── Centered text ── */}
      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Top label */}
        <p className="font-sans text-[11px] font-medium tracking-[0.45em] uppercase text-[#B5B847] mb-5">
          Welcome to
        </p>

        {/* Main headline */}
        <h1 className="font-serif text-5xl font-semibold leading-tight text-white text-balance md:text-7xl lg:text-8xl">
          Halla Mohana
        </h1>

        {/* Decorative rule */}
        <div className="my-5 flex items-center gap-4">
          <span className="block h-[1px] w-16 bg-white/30" />
          <span className="block h-1 w-1 rounded-full bg-[#B5B847]" />
          <span className="block h-[1px] w-16 bg-white/30" />
        </div>

        {/* Subheadline */}
        <p className="font-serif text-xl italic font-light text-white/80 tracking-wide md:text-2xl">
          Hospitality Development
        </p>

        {/* Description */}
        <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/60 text-pretty md:text-base">
          Building premium spaces for business travelers and urban lifestyle
        </p>

        {/* CTA */}
        <a
          href="#properties"
          className="mt-10 inline-block rounded-sm bg-[#1a1a14] px-10 py-3.5 font-sans text-sm font-medium tracking-[0.12em] uppercase text-white border border-white/20 transition-all duration-300 hover:bg-[#7A8C3C] hover:border-[#7A8C3C] hover:shadow-[0_0_30px_rgba(122,140,60,0.35)] active:scale-95"
        >
          Explore Properties
        </a>

        {/* Slide location label */}
        <p className="mt-8 font-sans text-[10px] tracking-[0.35em] uppercase text-white/40">
          {slides[current].label}
        </p>
      </div>

      {/* ── Left arrow ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 hover:border-white/70 md:flex"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="11 4 6 9 11 14" />
        </svg>
      </button>

      {/* ── Right arrow ── */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 hover:border-white/70 md:flex"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="7 4 12 9 7 14" />
        </svg>
      </button>

      {/* ── Dot indicators ── */}
      <div
        className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-[3px] rounded-full transition-all duration-400 ${
              i === current
                ? "w-8 bg-[#B5B847]"
                : "w-3 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5">
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/40">
          Scroll
        </span>
        <span className="block h-6 w-[1px] animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
