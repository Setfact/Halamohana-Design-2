"use client"

import { useEffect, useRef, useState } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Department = "Operations" | "Marketing" | "Finance" | "F&B" | "HR"

interface Job {
  id: number
  title: string
  department: Department
  location: string
  type: string
  description: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const jobs: Job[] = [
  {
    id: 1,
    title: "Front Office Manager",
    department: "Operations",
    location: "Jakarta",
    type: "Full-time",
    description: "Oversee front desk operations and ensure exceptional guest experiences.",
  },
  {
    id: 2,
    title: "Marketing Executive",
    department: "Marketing",
    location: "Pekanbaru",
    type: "Full-time",
    description: "Develop and implement marketing strategies to promote our properties.",
  },
  {
    id: 3,
    title: "Finance Analyst",
    department: "Finance",
    location: "Jakarta",
    type: "Full-time",
    description: "Analyze financial data and prepare reports for management.",
  },
  {
    id: 4,
    title: "Chef de Cuisine",
    department: "F&B",
    location: "Pekanbaru",
    type: "Full-time",
    description: "Lead kitchen operations and create exceptional dining experiences.",
  },
  {
    id: 5,
    title: "Housekeeping Supervisor",
    department: "Operations",
    location: "Jakarta",
    type: "Full-time",
    description: "Supervise housekeeping team and maintain cleanliness standards.",
  },
]

const deptColors: Record<Department, { bg: string; text: string }> = {
  Operations: { bg: "#7A8C3C", text: "#fff" },
  Marketing:  { bg: "#B5B847", text: "#2A2E1F" },
  Finance:    { bg: "#3D3A1A", text: "#fff" },
  "F&B":      { bg: "#C9A96E", text: "#2A2E1F" },
  HR:         { bg: "#1E2A12", text: "#fff" },
}

const departments = ["All", "Operations", "Marketing", "Finance", "F&B", "HR"]
const locations   = ["All", "Jakarta", "Pekanbaru"]

// ─── MapPin icon ─────────────────────────────────────────────────────────────

function MapPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function X({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function Upload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  )
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({
  job,
  index,
  onApply,
}: {
  job: Job
  index: number
  onApply: (title: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const dept = deptColors[job.department] ?? { bg: "#7A8C3C", text: "#fff" }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
      className="flex flex-col gap-4 rounded-sm border-l-4 border-[#7A8C3C] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Left: info */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-serif text-xl font-semibold text-[#2A2E1F]">{job.title}</h3>
          <span
            className="rounded-sm px-2.5 py-0.5 font-sans text-xs font-medium tracking-wide"
            style={{ backgroundColor: dept.bg, color: dept.text }}
          >
            {job.department}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-[#5A6040]">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-[#7A8C3C]" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#7A8C3C]" />
            {job.type}
          </span>
        </div>

        <p className="font-sans text-sm leading-relaxed text-[#5A6040]">{job.description}</p>
      </div>

      {/* Right: button */}
      <div className="flex-shrink-0">
        <button
          onClick={() => onApply(job.title)}
          className="rounded-sm bg-[#7A8C3C] px-6 py-2.5 font-sans text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#B5B847] hover:scale-[1.02] hover:shadow-md active:scale-95 whitespace-nowrap"
        >
          Apply Now
        </button>
      </div>
    </div>
  )
}

// ─── Application Modal ────────────────────────────────────────────────────────

function ApplicationModal({
  defaultPosition,
  onClose,
}: {
  defaultPosition: string
  onClose: () => void
}) {
  const [name, setName]             = useState("")
  const [email, setEmail]           = useState("")
  const [phone, setPhone]           = useState("")
  const [position, setPosition]     = useState(defaultPosition)
  const [coverLetter, setCoverLetter] = useState("")
  const [fileName, setFileName]     = useState("")
  const [submitted, setSubmitted]   = useState(false)
  const [dragging, setDragging]     = useState(false)

  // Sync position if defaultPosition changes (e.g. user clicks a different card)
  useEffect(() => { setPosition(defaultPosition) }, [defaultPosition])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const handleFileChange = (file: File | null) => {
    if (file) setFileName(file.name)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const labelClass = "block font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#5A6040] mb-1.5"
  const inputClass = "w-full rounded-sm border border-[#d4d8c0] bg-white px-4 py-2.5 font-sans text-sm text-[#2A2E1F] outline-none transition-colors duration-150 focus:border-[#7A8C3C] focus:ring-1 focus:ring-[#7A8C3C]/30 placeholder:text-[#aab08a]"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Apply Now form"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-sm bg-[#F8F9F4] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e2e5d0] bg-[#F8F9F4] px-8 py-5">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#2A2E1F]">Apply Now</h2>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-[1.5px] w-8 bg-[#B5B847]" />
              <div className="h-1 w-1 rounded-full bg-[#B5B847]" />
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close form"
            className="rounded-sm p-1.5 text-[#5A6040] transition-colors hover:bg-[#e8ead8] hover:text-[#2A2E1F]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center gap-4 px-8 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7A8C3C]/10">
              <svg className="h-8 w-8 text-[#7A8C3C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#2A2E1F]">Application Submitted</h3>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-[#5A6040]">
              Thank you for your interest in joining PT Halla Mohana. We will review your application and reach out shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-4 rounded-sm bg-[#7A8C3C] px-8 py-2.5 font-sans text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#B5B847] hover:scale-[1.02]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 py-7">
            {/* Name */}
            <div>
              <label htmlFor="cf-name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
              <input
                id="cf-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="cf-email" className={labelClass}>Email Address <span className="text-red-500">*</span></label>
              <input
                id="cf-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="cf-phone" className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
              <input
                id="cf-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 xxx xxxx xxxx"
                className={inputClass}
              />
            </div>

            {/* Position */}
            <div>
              <label htmlFor="cf-position" className={labelClass}>Position <span className="text-red-500">*</span></label>
              <select
                id="cf-position"
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={inputClass}
              >
                <option value="">Select a position</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.title}>{j.title}</option>
                ))}
              </select>
            </div>

            {/* Resume upload */}
            <div>
              <label className={labelClass}>Resume / CV <span className="text-red-500">*</span></label>
              <label
                htmlFor="cf-resume"
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragging(false)
                  handleFileChange(e.dataTransfer.files?.[0] ?? null)
                }}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-sm border-2 border-dashed px-6 py-8 text-center transition-colors duration-150 ${
                  dragging
                    ? "border-[#7A8C3C] bg-[#7A8C3C]/5"
                    : "border-[#d4d8c0] bg-white hover:border-[#7A8C3C] hover:bg-[#7A8C3C]/5"
                }`}
              >
                <Upload className="h-7 w-7 text-[#7A8C3C]" />
                {fileName ? (
                  <span className="font-sans text-sm font-medium text-[#2A2E1F]">{fileName}</span>
                ) : (
                  <>
                    <span className="font-sans text-sm text-[#5A6040]">
                      Drag & drop your file here, or <span className="text-[#7A8C3C] underline underline-offset-2">browse</span>
                    </span>
                    <span className="font-sans text-xs text-[#9aab5a]">PDF, DOC, DOCX — max 5 MB</span>
                  </>
                )}
              </label>
              <input
                id="cf-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label htmlFor="cf-cover" className={labelClass}>Cover Letter</label>
              <textarea
                id="cf-cover"
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell us why you are a great fit for this role..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-1 w-full rounded-sm bg-[#7A8C3C] py-3 font-sans text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#B5B847] hover:scale-[1.01] hover:shadow-md active:scale-95"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function CareerContent() {
  const [deptFilter, setDeptFilter]   = useState("All")
  const [locFilter, setLocFilter]     = useState("All")
  const [modalPos, setModalPos]       = useState<string | null>(null)

  const missionRef = useRef<HTMLDivElement>(null)
  const [missionVisible, setMissionVisible] = useState(false)

  useEffect(() => {
    const el = missionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMissionVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const filtered = jobs.filter((j) => {
    const byDept = deptFilter === "All" || j.department === deptFilter
    const byLoc  = locFilter === "All"  || j.location  === locFilter
    return byDept && byLoc
  })

  const selectClass = "rounded-sm border border-[#d4d8c0] bg-white px-4 py-2 font-sans text-sm text-[#2A2E1F] outline-none transition-colors duration-150 focus:border-[#7A8C3C] focus:ring-1 focus:ring-[#7A8C3C]/30 cursor-pointer"

  return (
    <>
      <div className="bg-[#F8F9F4]">
        {/* ── Mission Statement ─────────────────────────────────── */}
        <section
          ref={missionRef}
          className="mx-auto max-w-7xl px-6 py-20 lg:px-12"
          style={{
            opacity: missionVisible ? 1 : 0,
            transform: missionVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <div className="max-w-3xl">
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.35em] text-[#7A8C3C]">
              Join Our Team
            </p>
            <h2 className="font-serif text-2xl font-semibold leading-snug text-[#2A2E1F] text-balance md:text-3xl">
              It Is Our Main Mission At Halla Mohana To Continuously Create Meaningful And Challenging Job Opportunities For As Many Locals As Possible
            </h2>
            <div className="my-6 flex items-center gap-3">
              <div className="h-[1.5px] w-12 bg-[#B5B847]" />
              <div className="h-1 w-1 rounded-full bg-[#B5B847]" />
            </div>
            <p className="mb-4 font-sans text-base leading-relaxed text-[#5A6040]">
              Join our team and be part of a growing hospitality company that values innovation, integrity, and excellence.
            </p>
            <p className="font-sans text-base leading-relaxed text-[#5A6040]">
              We believe that our people are our greatest asset. We are committed to providing a supportive work environment where every team member can grow and thrive.
            </p>
          </div>
        </section>

        {/* ── Job Listings ──────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12" id="positions">
          {/* Section heading + filters */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 font-sans text-xs uppercase tracking-[0.35em] text-[#7A8C3C]">
                Opportunities
              </p>
              <h2 className="font-serif text-3xl font-semibold text-[#2A2E1F] md:text-4xl">
                Open Positions
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-[1.5px] w-12 bg-[#B5B847]" />
                <div className="h-1 w-1 rounded-full bg-[#B5B847]" />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="dept-filter" className="font-sans text-xs uppercase tracking-[0.08em] text-[#5A6040]">Department</label>
                <select
                  id="dept-filter"
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className={selectClass}
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="loc-filter" className="font-sans text-xs uppercase tracking-[0.08em] text-[#5A6040]">Location</label>
                <select
                  id="loc-filter"
                  value={locFilter}
                  onChange={(e) => setLocFilter(e.target.value)}
                  className={selectClass}
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filtered.map((job, i) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={i}
                  onApply={(title) => setModalPos(title)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="font-serif text-xl text-[#2A2E1F]">No positions found</p>
              <p className="font-sans text-sm text-[#5A6040]">Try adjusting the filters above.</p>
            </div>
          )}
        </section>
      </div>

      {/* Application modal */}
      {modalPos !== null && (
        <ApplicationModal
          defaultPosition={modalPos}
          onClose={() => setModalPos(null)}
        />
      )}
    </>
  )
}
