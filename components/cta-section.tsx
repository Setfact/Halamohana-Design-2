"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Intersection observer — triggers fade-in
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Parallax — track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate parallax offset relative to section position
  const getParallaxOffset = () => {
    const el = sectionRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    const center = rect.top + rect.height / 2
    return center * 0.15
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "65vh", minHeight: "480px" }}
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          transform: `translateY(${getParallaxOffset()}px)`,
          scale: "1.15",
          willChange: "transform",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div
        className={[
          "relative z-10 flex flex-col items-center gap-6 px-6 text-center transition-all duration-700 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        ].join(" ")}
      >
        {/* Label */}
        <p
          className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-[#B5B847]"
          style={{ transitionDelay: "100ms" }}
        >
          Get in Touch
        </p>

        {/* Headline */}
        <h2
          className={[
            "font-serif font-bold text-white text-balance text-4xl md:text-5xl lg:text-[52px] leading-tight max-w-3xl transition-all duration-700 ease-out",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
          style={{ transitionDelay: "200ms" }}
        >
          {"Let's Connect"}
        </h2>

        {/* Decorative rule */}
        <div
          className={[
            "flex items-center gap-3 transition-all duration-700 ease-out",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "300ms" }}
        >
          <span className="block h-[1px] w-10 bg-[#B5B847]/60" />
          <span className="block h-1 w-1 rounded-full bg-[#B5B847]" />
          <span className="block h-[1px] w-10 bg-[#B5B847]/60" />
        </div>

        {/* Description */}
        <p
          className={[
            "font-sans text-base md:text-lg leading-relaxed text-white/80 max-w-xl text-pretty transition-all duration-700 ease-out",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "380ms" }}
        >
          Whether you&apos;re looking for a premium stay or exploring partnership
          opportunities, we&apos;d love to hear from you.
        </p>

        {/* Phone number */}
        <a
          href="tel:+622129976700"
          className={[
            "flex items-center gap-2 font-sans text-base font-medium text-[#B5B847] transition-all duration-700 ease-out hover:text-white",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "430ms" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.42z"/>
          </svg>
          +62 21 2997 6700
        </a>

        {/* Buttons */}
        <div
          className={[
            "mt-2 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 transition-all duration-700 ease-out",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "480ms" }}
        >
          {/* Primary — Contact Us */}
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center rounded-sm bg-[#7A8C3C] px-8 py-3.5 font-sans text-[15px] font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#B5B847] hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5B847]"
          >
            Contact Us
          </Link>

          {/* Secondary — View Properties */}
          <Link
            href="#properties"
            className="inline-flex items-center justify-center rounded-sm border border-white/70 px-8 py-3.5 font-sans text-[15px] font-medium tracking-wide text-white transition-all duration-300 hover:border-[#B5B847] hover:text-[#B5B847] hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Properties
          </Link>
        </div>
      </div>
    </section>
  )
}
