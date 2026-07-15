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
    videoSrc: "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/3209828/pictures/preview-0.jpg",
    label: "Bali",
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

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
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
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

      {/* ── Dark overlay — z1 ── */}
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 1 }} aria-hidden="true" />

      {/* ── Vignette — z1 ── */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.55)_100%)]"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />


      {/* ── Centered text — z5 ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-24 text-center"
        style={{ zIndex: 5 }}
      >
        {/* Logo */}
          <div
            className="mb-6 flex items-center justify-center rounded-full bg-white"
            style={{
              width: "120px",
              height: "120px",
              border: "2px solid rgba(122,140,60,0.3)",
              padding: "12px",
              boxShadow: "0 0 30px rgba(122,140,60,0.3), 0 4px 20px rgba(0,0,0,0.3)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.9)",
              transition: "opacity 0.7s ease 0s, transform 0.7s ease 0s",
              animation: loaded ? "logoPulse 3s ease-in-out infinite" : "none",
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-FjjaJkB3gWSasnXq8EdrmCwfzN8R1f.png"
              alt="Halla Mohana logo"
              className="h-full w-full object-contain"
            />
          </div>
          <style>{`
            @keyframes logoPulse {
              0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(122,140,60,0.3), 0 4px 20px rgba(0,0,0,0.3); }
              50% { transform: scale(1.04); box-shadow: 0 0 45px rgba(122,140,60,0.5), 0 4px 24px rgba(0,0,0,0.35); }
            }
          `}</style>

        {/* Top label */}
          <p
            className="font-sans text-[11px] font-medium tracking-[0.45em] uppercase text-[#B5B847] mb-5"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Welcome to
          </p>

          {/* Main headline — word-by-word reveal */}
          <h1
            className="font-serif text-5xl font-semibold leading-tight text-white text-balance md:text-7xl lg:text-8xl"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
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

          {/* Decorative rule */}
          <div
            className="my-5 flex items-center gap-4"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.7s ease 0.65s",
            }}
          >
            <span className="block h-px w-16 bg-white/30" />
            <span className="block h-1 w-1 rounded-full bg-[#B5B847]" />
            <span className="block h-px w-16 bg-white/30" />
          </div>

          {/* Subheadline */}
          <p
            className="font-serif text-xl italic font-light text-white/80 tracking-wide md:text-2xl"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Hospitality Development
          </p>

          {/* Description */}
          <p
            className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/60 text-pretty md:text-base"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.7s ease 0.88s, transform 0.7s ease 0.88s",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Building premium spaces for business travelers and urban lifestyle
          </p>

          {/* CTA */}
          <a
            href="#properties"
            className="mt-8 inline-block rounded-sm bg-[#1a1a14] px-10 py-3.5 font-sans text-sm font-medium tracking-[0.12em] uppercase text-white border border-white/20 transition-all duration-300 hover:bg-[#7A8C3C] hover:border-[#7A8C3C] hover:shadow-[0_0_30px_rgba(122,140,60,0.35)] active:scale-95"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.7s ease 1.0s, transform 0.7s ease 1.0s",
            }}
          >
            Explore Properties
          </a>
      </div>

      {/* ── Slide label — bottom-left, z5 ── */}
      <div
        className="absolute left-10 hidden md:flex items-center"
        style={{
          bottom: "80px",
          zIndex: 5,
          background: "rgba(0,0,0,0.4)",
          padding: "8px 16px",
          borderRadius: "4px",
          borderLeft: "3px solid #7A8C3C",
          transition: "opacity 0.3s ease",
          opacity: loaded ? 1 : 0,
        }}
      >
        <span
          className="font-sans font-medium text-white"
          style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px" }}
        >
          {slides[current].label}
        </span>
      </div>

      {/* ── Previous button — z10, left 20px, top 50% ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute hidden md:flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "white",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* ── Next button — z10, right 20px, top 50% ── */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute hidden md:flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "white",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── Pagination indicators — bottom 30px, center, z10 ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{
          bottom: "30px",
          zIndex: 10,
          background: "rgba(0,0,0,0.4)",
          padding: "8px 16px",
          borderRadius: "20px",
        }}
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
            className="transition-all duration-300"
            style={{
              width: "24px",
              height: "4px",
              borderRadius: "2px",
              background: i === current ? "white" : "rgba(255,255,255,0.5)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  )
}
