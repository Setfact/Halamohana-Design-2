"use client"

import { useState, useEffect } from "react"

const navLinks = ["Home", "About", "Properties", "Gallery", "News", "Career"]

const navHrefs: Record<string, string> = {
  Home: "/",
  About: "/about",
  Properties: "/properties",
  Gallery: "/gallery",
  News: "/news",
  Career: "/career",
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-[#F8F9F4] shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Halla Mohana — Home"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo__1_-removebg-preview-AArstaIVTRIMHtMo2H0gojKK9LBla1.png"
              alt="Halla Mohana"
              style={{ height: "100px", width: "auto" }}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={navHrefs[link] ?? `/#${link.toLowerCase()}`}
                className={`relative px-3 py-2 font-sans text-sm font-medium tracking-wide transition-colors duration-200 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1.5px] after:scale-x-0 after:rounded-full after:bg-[#B5B847] after:transition-transform after:duration-200 hover:text-[#B5B847] hover:after:scale-x-100 ${
                  scrolled ? "text-[#3a3a2e]" : "text-white/90"
                }`}
              >
                {link}
              </a>
            ))}

            {/* Contact Us CTA */}
            <a
              href="/contact"
              className="ml-4 rounded-sm bg-[#7A8C3C] px-5 py-2 font-sans text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#B5B847] hover:shadow-md active:scale-95"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`flex flex-col items-center justify-center gap-[5px] p-2 md:hidden transition-colors duration-300 ${
              scrolled ? "text-[#3a3a2e]" : "text-white"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`block h-[1.5px] w-6 rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in panel */}
        <nav
          className={`absolute right-0 top-0 bottom-0 flex w-72 flex-col bg-[#F8F9F4] px-8 pt-24 pb-12 shadow-2xl transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={navHrefs[link] ?? `/#${link.toLowerCase()}`}
                  className="block py-3 font-sans text-base font-medium text-[#3a3a2e] tracking-wide border-b border-[#e8ead8] transition-colors duration-150 hover:text-[#B5B847] hover:pl-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/contact"
            className="mt-8 rounded-sm bg-[#7A8C3C] px-6 py-3 text-center font-sans text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#B5B847]"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </a>

          <p className="mt-auto font-sans text-xs text-[#9aab5a] tracking-widest uppercase">
            PT Halla Mohana
          </p>
        </nav>
      </div>
    </>
  )
}
