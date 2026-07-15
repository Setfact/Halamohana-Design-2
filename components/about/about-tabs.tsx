"use client"

import { useState, useEffect, useRef } from "react"

/* ─── Tab definitions ─── */
const TABS = ["Overviews", "Vision & Mission", "Core Values", "Company Structure", "Code of Ethics"] as const
type Tab = (typeof TABS)[number]

/* ─── Icon helpers ─── */
function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

/* ─── Overviews ─── */
function Overviews({ visible }: { visible: boolean }) {
  return (
    <div
      className="max-w-3xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <p className="font-sans text-xs tracking-[0.35em] uppercase text-[#7A8C3C] mb-3">
        Who We Are
      </p>
      <h2 className="font-serif text-3xl font-semibold leading-snug text-[#2A2E1F] text-balance mb-6 md:text-4xl">
        PT Halla Mohana Provides Hospitality Services That Offer Enjoyable Stays And Visits
      </h2>
      <div className="h-[1.5px] w-12 bg-[#B5B847] mb-8" />
      <div className="flex flex-col gap-5">
        <p className="font-sans text-base leading-[1.8] text-[#5A6040]">
          We provide complete, efficient, and easily accessible facilities for business and lifestyle enjoyment.
        </p>
        <p className="font-sans text-base leading-[1.8] text-[#5A6040]">
          PT Halla Mohana is a hospitality development company under TMT Group, managed by Mahadasha Group.
        </p>
        <p className="font-sans text-base leading-[1.8] text-[#5A6040]">
          It is the main goal for us at PT Halla Mohana to develop facilities which meet the demands of the business traveler and urban lifestyle requirement.
        </p>
      </div>
    </div>
  )
}

/* ─── Vision & Mission ─── */
function VisionMission({ visible }: { visible: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {[
        {
          label: "Vision",
          text: "To be the leading hospitality development company in Southeast Asia, creating spaces that inspire and delight.",
          delay: "0s",
        },
        {
          label: "Mission",
          text: "We develop, manage, and operate hospitality assets that serve the modern business traveller and lifestyle-conscious urban dweller.",
          delay: "0.12s",
        },
      ].map(({ label, text, delay }) => (
        <div
          key={label}
          className="rounded-sm border border-[#dde0cc] bg-white p-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.55s ease ${delay}, transform 0.55s ease ${delay}`,
          }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#eef0e6] flex items-center justify-center text-[#7A8C3C]">
              <StarIcon />
            </div>
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#7A8C3C]">
              {label}
            </span>
          </div>
          <div className="h-[1.5px] w-8 bg-[#B5B847] mb-5" />
          <p className="font-serif text-xl font-medium leading-relaxed text-[#2A2E1F]">
            {text}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ─── Core Values ─── */
const coreValues = [
  {
    icon: <StarIcon />,
    title: "Hospitality First",
    desc: "Every space we develop is anchored by genuine care for the guest experience — from lobby to suite.",
  },
  {
    icon: <BuildingIcon />,
    title: "Design with Purpose",
    desc: "Architecture crafted to evoke calm confidence — purposeful, refined, and enduring.",
  },
  {
    icon: <LeafIcon />,
    title: "Sustainable Growth",
    desc: "We build for the long term, balancing development ambition with environmental and social responsibility.",
  },
]

function CoreValues({ visible }: { visible: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {coreValues.map(({ icon, title, desc }, i) => (
        <div
          key={title}
          className="group rounded-sm border border-[#dde0cc] bg-white p-8 transition-shadow duration-300 hover:shadow-md"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
          }}
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef0e6] text-[#7A8C3C] transition-colors duration-300 group-hover:bg-[#7A8C3C] group-hover:text-white">
            {icon}
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#2A2E1F] mb-3">{title}</h3>
          <div className="h-[1.5px] w-8 bg-[#B5B847] mb-4 transition-all duration-300 group-hover:w-14" />
          <p className="font-sans text-sm leading-[1.8] text-[#5A6040]">{desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ─── Company Structure ─── */
function CompanyStructure({ visible }: { visible: boolean }) {
  const nodes = [
    { label: "Board of Directors", level: 0 },
    { label: "PT Mahadana Dasha Utama\n(Parent Company)", level: 1 },
    { label: "PT Halla Mohana\n(Subsidiary)", level: 2 },
  ]
  const depts = ["Operations", "Finance", "Human Resources", "Marketing"]

  return (
    <div
      className="flex flex-col items-center gap-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
    >
      {nodes.map(({ label, level }, i) => (
        <div key={label} className="flex flex-col items-center">
          {i > 0 && (
            <div className="w-[1.5px] h-8 bg-[#dde0cc]" aria-hidden="true" />
          )}
          <div
            className="rounded-sm border px-8 py-4 text-center font-sans text-sm font-medium leading-tight whitespace-pre-line"
            style={{
              borderColor: level === 2 ? "#7A8C3C" : "#dde0cc",
              backgroundColor: level === 2 ? "#f3f5ec" : "#ffffff",
              color: "#2A2E1F",
              minWidth: "220px",
              boxShadow: level === 2 ? "0 0 0 2px #7A8C3C20" : undefined,
            }}
          >
            {label}
          </div>
        </div>
      ))}

      {/* Departments */}
      <div className="w-[1.5px] h-8 bg-[#dde0cc]" aria-hidden="true" />
      <div className="flex flex-wrap justify-center gap-3">
        {depts.map((d, i) => (
          <div
            key={d}
            className="rounded-sm border border-[#dde0cc] bg-white px-5 py-3 font-sans text-sm text-[#5A6040]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.45s ease ${0.2 + i * 0.07}s, transform 0.45s ease ${0.2 + i * 0.07}s`,
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Code of Ethics ─── */
const ethicsPrinciples = [
  "Integrity and honesty in all business dealings and communications.",
  "Respect for all stakeholders — employees, partners, guests, and communities.",
  "Compliance with applicable laws, regulations, and internal policies.",
  "Confidentiality of proprietary, financial, and personal information.",
  "Proactive avoidance of actual or perceived conflicts of interest.",
]

function CodeOfEthics({ visible }: { visible: boolean }) {
  return (
    <div className="max-w-2xl">
      <h2
        className="font-serif text-3xl font-semibold text-[#2A2E1F] mb-3 text-balance"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        Code of Business Conduct &amp; Ethics
      </h2>
      <div
        className="h-[1.5px] w-12 bg-[#B5B847] mb-8"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease 0.08s",
        }}
      />
      <ul className="flex flex-col gap-5">
        {ethicsPrinciples.map((principle, i) => (
          <li
            key={i}
            className="flex items-start gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
            }}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef0e6] text-[#7A8C3C] font-sans text-xs font-semibold">
              {i + 1}
            </span>
            <p className="font-sans text-base leading-[1.8] text-[#5A6040] pt-0.5">{principle}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── Main component ─── */
export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("Overviews")
  const [contentVisible, setContentVisible] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  function switchTab(tab: Tab) {
    if (tab === activeTab) return
    setContentVisible(false)
    setTimeout(() => {
      setActiveTab(tab)
      setContentVisible(true)
    }, 200)
  }

  return (
    <section
      ref={ref}
      id="corporate-info"
      className="w-full bg-[#F8F9F4]"
      aria-label="Corporate Info tabs"
    >
      {/* Tab bar */}
      <div
        className="border-b border-[#dde0cc] bg-white sticky top-[68px] z-30"
        style={{
          opacity: sectionVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-12">
          <nav
            role="tablist"
            aria-label="Corporate Info sections"
            className="flex items-center gap-0 overflow-x-auto scrollbar-hide"
          >
            {TABS.map((tab) => {
              const isActive = tab === activeTab
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab}`}
                  id={`tab-${tab}`}
                  onClick={() => switchTab(tab)}
                  className="relative shrink-0 px-5 py-5 font-sans text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8C3C]"
                  style={{
                    color: isActive ? "#7A8C3C" : "#5A6040",
                  }}
                >
                  {tab}
                  {/* Active underline */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-sm bg-[#7A8C3C] transition-opacity duration-200"
                    style={{ opacity: isActive ? 1 : 0 }}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {activeTab === "Overviews" && <Overviews visible={contentVisible} />}
          {activeTab === "Vision & Mission" && <VisionMission visible={contentVisible} />}
          {activeTab === "Core Values" && <CoreValues visible={contentVisible} />}
          {activeTab === "Company Structure" && <CompanyStructure visible={contentVisible} />}
          {activeTab === "Code of Ethics" && <CodeOfEthics visible={contentVisible} />}
        </div>
      </div>
    </section>
  )
}
