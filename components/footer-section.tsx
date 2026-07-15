"use client"

import { useEffect, useRef, useState } from "react"

const quickLinks = ["Home", "About Us", "Properties", "Gallery", "News"]
const propertyLinks = ["Hotels", "Malls", "Resorts", "All Properties", "Partnership"]
const companyLinks = ["Careers", "Contact Us", "Privacy Policy", "Terms of Service", "Sitemap"]

const contactItems = [
  { icon: "location", label: "Head Office: Jl. Jend. Sudirman Kav. 52-53, SCBD Lot 19, Jakarta Selatan 12190" },
  { icon: "location", label: "Site Office: Jl. Riau No. 9, Pekanbaru, Riau 28292" },
  { icon: "phone", label: "+62 21 2997 6700" },
  { icon: "email", label: "info@hallamohana.co.id" },
  { icon: "web", label: "hallamohana.co.id" },
]

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.42z"/>
    </svg>
  )
}
function WebIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}
function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
function ChevronUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  )
}

function ContactIcon({ type }: { type: string }) {
  if (type === "location") return <LocationIcon />
  if (type === "email") return <EmailIcon />
  if (type === "phone") return <PhoneIcon />
  return <WebIcon />
}

const socialLinks = [
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "#" },
  { icon: <InstagramIcon />, label: "Instagram", href: "#" },
  { icon: <FacebookIcon />, label: "Facebook", href: "#" },
  { icon: <XIcon />, label: "X / Twitter", href: "#" },
]

const columns = [
  { heading: "Quick Links", links: quickLinks },
  { heading: "Properties", links: propertyLinks },
  { heading: "Company", links: companyLinks },
]

export default function FooterSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <>
      <footer
        ref={ref}
        className="w-full bg-[#1A1A1A] pt-16 pb-0"
        aria-label="Site footer"
      >
        {/* Top brand row */}
        <div
          className="mx-auto max-w-7xl px-6 lg:px-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="mb-12 flex flex-col gap-3 border-b border-white/10 pb-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo__1_-removebg-preview-AArstaIVTRIMHtMo2H0gojKK9LBla1.png"
                alt="Halla Mohana"
                style={{ height: "110px", width: "auto" }}
                className="mb-4 object-contain transition-transform duration-300 hover:scale-105"
              />
              <p className="font-sans text-xs tracking-[0.35em] uppercase text-[#7A8C3C] mb-1">
                Hospitality Development
              </p>
              <h2 className="font-serif text-3xl font-bold text-white leading-tight">
                Halla Mohana
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/70">
                Building premium spaces for business travelers and urban lifestyle across Indonesia.
              </p>
              <p className="mt-2 font-sans text-xs text-white/40 italic">
                A subsidiary of TMT Group
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 md:mt-2">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-300 hover:border-[#B5B847] hover:text-[#B5B847] hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* 4-column grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-14">
            {columns.map(({ heading, links }, colIdx) => (
              <div
                key={heading}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.1 + colIdx * 0.08}s, transform 0.6s ease ${0.1 + colIdx * 0.08}s`,
                }}
              >
                <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-sans text-sm text-white/60 transition-colors duration-300 hover:text-[#B5B847]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.34s, transform 0.6s ease 0.34s",
              }}
            >
              <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Contact
              </h3>
              <ul className="flex flex-col gap-3">
                {contactItems.map(({ icon, label }) => (
                  <li key={label} className="flex items-start gap-2 font-sans text-sm text-white/60">
                    <span className="text-[#7A8C3C]">
                      <ContactIcon type={icon} />
                    </span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-[#111111]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 sm:flex-row lg:px-12">
            <p className="font-sans text-xs text-white/40">
              &copy; 2026 PT Halla Mohana. All rights reserved.
            </p>
            <p className="font-sans text-xs text-white/40">
              A TMT Group Company
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#7A8C3C] text-white shadow-lg transition-all duration-300 hover:bg-[#B5B847] hover:scale-110 active:scale-95"
        style={{
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? "auto" : "none",
          transform: showTop ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.3s ease, transform 0.3s ease, background-color 0.2s, scale 0.2s",
        }}
      >
        <ChevronUpIcon />
      </button>
    </>
  )
}
