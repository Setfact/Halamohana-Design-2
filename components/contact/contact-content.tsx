"use client"

import { useEffect, useRef, useState } from "react"

/* ── Fade-in hook ─────────────────────────────────────────── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Info card ────────────────────────────────────────────── */
function InfoCard({
  icon,
  title,
  detail,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  detail: string
  delay?: number
}) {
  const { ref, visible } = useFadeIn()
  return (
    <div
      ref={ref}
      className="flex flex-col items-center rounded-xl bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.2s, translateY 0.2s`,
      }}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7A8C3C]/10">
        {icon}
      </div>
      <h3 className="mb-2 font-serif text-lg font-semibold text-[#2A2E1F]">{title}</h3>
      <p className="font-sans text-sm leading-relaxed text-[#5A6040]">{detail}</p>
    </div>
  )
}

/* ── Map + Office Info section ────────────────────────────── */
function MapSection() {
  const { ref, visible } = useFadeIn(0.1)
  return (
    <div
      ref={ref}
      className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-12"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
      }}
    >
      {/* Map */}
      <div className="overflow-hidden rounded-xl border border-[#E5E5E5] shadow-sm" style={{ height: 400 }}>
        <iframe
          title="PT Halla Mohana Head Office"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9456!2d106.8214!3d-6.2878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e5a85c5e3b%3A0x5e7f3a5b5e7f3a5b!2sGedung%20TMT%201%2C%20Jl.%20Cilandak%20KKO%20No.%201%2C%20Jakarta%2012560!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Office info */}
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-[#2A2E1F]">Address</h2>
          <div className="mt-3 h-[1.5px] w-10 bg-[#B5B847]" />
        </div>

        {/* Head office */}
        <div>
          <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#7A8C3C]">
            Head Office:
          </h3>
          <address className="not-italic space-y-2 font-sans text-sm leading-relaxed text-[#5A6040]">
            <p>Gedung TMT 1, 1st Floor</p>
            <p>Jl. Cilandak KKO No. 1</p>
            <p>Jakarta 12560, Indonesia</p>
            <div className="pt-1 space-y-1">
              <p className="flex items-center gap-2">
                <PhoneIcon />
                <span>+62 21 2997 6700</span>
              </p>
              <p className="flex items-center gap-2">
                <FaxIcon />
                <span>+62 21 2997 6708</span>
              </p>
            </div>
          </address>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e8ead8]" />

        {/* Site office */}
        <div>
          <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#7A8C3C]">
            Site Office:
          </h3>
          <address className="not-italic space-y-2 font-sans text-sm leading-relaxed text-[#5A6040]">
            <p>Jalan Riau No. 147</p>
            <p>Pekanbaru, Riau, Indonesia</p>
            <div className="pt-1 space-y-1">
              <p className="flex items-center gap-2">
                <PhoneIcon />
                <span>FOX Harris Hotel: +62 761 741 5999</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon />
                <span>PekanbaruXchange: +62 761 741 5000</span>
              </p>
            </div>
          </address>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e8ead8]" />

        {/* Email */}
        <p className="flex items-center gap-2 font-sans text-sm text-[#5A6040]">
          <MailIcon />
          <a
            href="mailto:info@hallamohana.co.id"
            className="transition-colors hover:text-[#7A8C3C]"
          >
            info@hallamohana.co.id
          </a>
        </p>
      </div>
    </div>
  )
}

/* ── Contact form ─────────────────────────────────────────── */
function ContactForm() {
  const { ref, visible } = useFadeIn(0.1)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <div
      ref={ref}
      className="mx-auto max-w-3xl px-6 lg:px-12"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
      }}
    >
      <div className="mb-8 text-center">
        <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#7A8C3C]">
          Get In Touch
        </p>
        <h2 className="font-serif text-3xl font-semibold text-[#2A2E1F] md:text-4xl">
          Send Us a Message
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <div className="h-[1.5px] w-10 bg-[#B5B847]" />
          <div className="h-1 w-1 rounded-full bg-[#B5B847]" />
          <div className="h-[1.5px] w-10 bg-[#B5B847]" />
        </div>
      </div>

      {submitted ? (
        <div className="rounded-xl border border-[#c6d48a] bg-[#f5f8e8] px-8 py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7A8C3C]/10">
            <CheckIcon />
          </div>
          <h3 className="mb-2 font-serif text-2xl font-semibold text-[#2A2E1F]">
            Message Sent
          </h3>
          <p className="font-sans text-sm leading-relaxed text-[#5A6040]">
            Thank you for your message. We will get back to you soon.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }) }}
            className="mt-6 rounded-sm border border-[#7A8C3C] px-6 py-2 font-sans text-sm font-medium text-[#7A8C3C] transition-colors hover:bg-[#7A8C3C] hover:text-white"
          >
            Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#5A6040]">
              Name <span className="text-[#7A8C3C]">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="rounded-md border border-[#dde0cc] bg-white px-4 py-3 font-sans text-sm text-[#2A2E1F] placeholder-[#b0b8a0] outline-none transition-colors focus:border-[#7A8C3C] focus:ring-2 focus:ring-[#7A8C3C]/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#5A6040]">
              Email <span className="text-[#7A8C3C]">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="rounded-md border border-[#dde0cc] bg-white px-4 py-3 font-sans text-sm text-[#2A2E1F] placeholder-[#b0b8a0] outline-none transition-colors focus:border-[#7A8C3C] focus:ring-2 focus:ring-[#7A8C3C]/20"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="subject" className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#5A6040]">
              Subject <span className="text-[#7A8C3C]">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="rounded-md border border-[#dde0cc] bg-white px-4 py-3 font-sans text-sm text-[#2A2E1F] placeholder-[#b0b8a0] outline-none transition-colors focus:border-[#7A8C3C] focus:ring-2 focus:ring-[#7A8C3C]/20"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="message" className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#5A6040]">
              Message <span className="text-[#7A8C3C]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="resize-none rounded-md border border-[#dde0cc] bg-white px-4 py-3 font-sans text-sm text-[#2A2E1F] placeholder-[#b0b8a0] outline-none transition-colors focus:border-[#7A8C3C] focus:ring-2 focus:ring-[#7A8C3C]/20"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-sm bg-[#7A8C3C] px-8 py-3 font-sans text-sm font-medium tracking-wide text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#B5B847] hover:shadow-md active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export default function ContactContent() {
  return (
    <div id="contact" className="bg-white">
      {/* Info cards */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <InfoCard
            icon={<MapPinIcon />}
            title="Visit Us"
            detail="Gedung TMT 1, Jakarta"
            delay={0}
          />
          <InfoCard
            icon={<PhoneIcon size={20} color="#7A8C3C" />}
            title="Call Us"
            detail="+62 21 2997 6700"
            delay={120}
          />
          <InfoCard
            icon={<MailIcon size={20} color="#7A8C3C" />}
            title="Email Us"
            detail="info@hallamohana.co.id"
            delay={240}
          />
        </div>
      </section>

      {/* Map + office info */}
      <section className="pb-20">
        <MapSection />
      </section>

      {/* Contact form */}
      <section className="bg-[#F8F9F4] py-20">
        <ContactForm />
      </section>
    </div>
  )
}

/* ── Inline SVG icons ─────────────────────────────────────── */
function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7A8C3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon({ size = 14, color = "#5A6040" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.21h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.91a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69a2 2 0 0 1 1.72 2z" />
    </svg>
  )
}

function FaxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A6040" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 7 13 7" />
      <polyline points="9 7 2 7" />
      <rect x="9" y="3" width="4" height="8" rx="1" />
      <path d="M2 7v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7" />
      <line x1="6" y1="13" x2="6" y2="18" />
      <line x1="10" y1="13" x2="10" y2="18" />
      <line x1="14" y1="13" x2="14" y2="18" />
      <line x1="18" y1="13" x2="18" y2="18" />
    </svg>
  )
}

function MailIcon({ size = 14, color = "#5A6040" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A8C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
