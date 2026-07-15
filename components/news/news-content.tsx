"use client"

import { useEffect, useRef, useState } from "react"

const MONTHS = [
  "All", "January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October", "November", "December",
]

const YEARS = ["All", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]

const news = [
  {
    id: 1,
    slug: "whistle-blowing-system",
    date: "Friday, 02 December 2022",
    month: "December",
    year: "2022",
    title: "Whistle Blowing System",
    excerpt: "Implementasi sistem pengaduan pelanggaran di lingkungan PT Halla Mohana untuk menjaga integritas dan tata kelola perusahaan yang baik.",
    image: "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=800",
    body: `PT Halla Mohana dengan bangga mengumumkan implementasi Whistle Blowing System (WBS) sebagai bagian dari komitmen perusahaan terhadap tata kelola yang baik dan budaya integritas.\n\nSistem ini dirancang untuk memberikan saluran aman dan terpercaya bagi karyawan, mitra bisnis, dan pemangku kepentingan untuk melaporkan dugaan pelanggaran etika, kecurangan, atau tindakan yang tidak sesuai dengan kebijakan perusahaan.\n\nDengan adanya WBS, PT Halla Mohana berkomitmen untuk menindaklanjuti setiap laporan secara profesional, konfidensial, dan tanpa retaliasi terhadap pelapor yang beritikad baik. Langkah ini merupakan bagian dari program Good Corporate Governance (GCG) yang terus kami perkuat.`,
  },
  {
    id: 2,
    slug: "company-anniversary",
    date: "Tuesday, 15 August 2022",
    month: "August",
    year: "2022",
    title: "Company Anniversary",
    excerpt: "Perayaan hari jadi perusahaan yang ke-9 dengan berbagai acara kebersamaan dan refleksi pencapaian PT Halla Mohana selama ini.",
    image: "https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=800",
    body: `Pada tanggal 15 Agustus 2022, PT Halla Mohana merayakan hari jadinya yang ke-9 dengan penuh kebanggaan dan semangat kebersamaan.\n\nPerayaan ini dihadiri oleh seluruh jajaran manajemen, karyawan, dan mitra strategis perusahaan. Berbagai kegiatan menarik diselenggarakan, mulai dari apresiasi karyawan berprestasi, pertunjukan seni budaya, hingga forum diskusi mengenai visi perusahaan ke depan.\n\nSelama 9 tahun, PT Halla Mohana telah tumbuh menjadi salah satu pemain utama dalam industri pengembangan properti perhotelan di Sumatera. Kami mengucapkan terima kasih yang sebesar-besarnya kepada seluruh pemangku kepentingan yang telah menjadi bagian dari perjalanan luar biasa ini.`,
  },
  {
    id: 3,
    slug: "new-partnership-announcement",
    date: "Wednesday, 16 March 2022",
    month: "March",
    year: "2022",
    title: "New Partnership Announcement",
    excerpt: "Kerja sama strategis dengan operator hotel internasional untuk meningkatkan kualitas layanan dan standar operasional FOX Hotel Pekanbaru.",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    body: `PT Halla Mohana dengan bangga mengumumkan kemitraan strategis baru dengan operator hotel internasional terkemuka guna memperkuat posisi FOX Hotel Pekanbaru di pasar perhotelan regional.\n\nKerja sama ini mencakup peningkatan standar operasional, program pelatihan sumber daya manusia berkelas dunia, serta pengembangan layanan berbasis teknologi yang akan memberikan pengalaman menginap lebih baik bagi tamu.\n\nDengan kemitraan ini, PT Halla Mohana menegaskan komitmennya untuk terus berinovasi dan menghadirkan standar hospitality terbaik di Pekanbaru dan sekitarnya.`,
  },
  {
    id: 4,
    slug: "hotel-renovation-complete",
    date: "Monday, 01 November 2021",
    month: "November",
    year: "2021",
    title: "Hotel Renovation Complete",
    excerpt: "FOX Hotel Pekanbaru selesai direnovasi dengan fasilitas baru yang modern, memberikan pengalaman menginap yang lebih nyaman dan berkesan.",
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800",
    body: `Kami dengan bangga mengumumkan bahwa renovasi FOX Hotel Pekanbaru telah selesai dilaksanakan. Proyek renovasi komprehensif ini mencakup pembaruan seluruh kamar tamu, lobi utama, restoran, dan fasilitas pertemuan.\n\nDesain interior baru menggabungkan estetika modern dengan sentuhan budaya lokal Melayu Riau, menciptakan atmosfer yang hangat dan berkarakter. Fasilitas teknologi terkini seperti sistem check-in digital dan konektivitas internet berkecepatan tinggi juga turut dihadirkan.\n\nFOX Hotel Pekanbaru kini siap menyambut tamu dengan standar baru yang lebih tinggi, menjadikannya pilihan utama akomodasi bisnis dan leisure di jantung kota Pekanbaru.`,
  },
  {
    id: 5,
    slug: "csr-initiative-launch",
    date: "Tuesday, 15 June 2021",
    month: "June",
    year: "2021",
    title: "CSR Initiative Launch",
    excerpt: "Program kepedulian lingkungan dan masyarakat sekitar sebagai wujud tanggung jawab sosial PT Halla Mohana kepada komunitas lokal.",
    image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800",
    body: `PT Halla Mohana resmi meluncurkan program Corporate Social Responsibility (CSR) perdana yang berfokus pada pemberdayaan masyarakat dan pelestarian lingkungan di sekitar area operasional perusahaan.\n\nProgram ini mencakup beberapa inisiatif utama: penanaman pohon di kawasan perkotaan Pekanbaru, beasiswa pendidikan bagi putra-putri karyawan berprestasi, pemberdayaan UMKM lokal melalui pelatihan kewirausahaan, dan program kesehatan masyarakat gratis.\n\nMelalui CSR ini, PT Halla Mohana mewujudkan komitmennya sebagai perusahaan yang tidak hanya berorientasi pada keuntungan bisnis, tetapi juga memberikan dampak positif nyata bagi masyarakat dan lingkungan sekitarnya.`,
  },
  {
    id: 6,
    slug: "pandemic-recovery-update",
    date: "Monday, 18 January 2021",
    month: "January",
    year: "2021",
    title: "Pandemic Recovery Update",
    excerpt: "Protokol kesehatan dan pemulihan bisnis pasca pandemi yang diimplementasikan PT Halla Mohana untuk menjaga keselamatan tamu dan karyawan.",
    image: "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=800",
    body: `Memasuki tahun 2021, PT Halla Mohana menyampaikan update mengenai langkah-langkah pemulihan bisnis dan protokol kesehatan yang telah diimplementasikan di seluruh lini operasional.\n\nSeluruh properti kami telah memperoleh sertifikasi protokol CHSE (Cleanliness, Health, Safety, and Environmental Sustainability) dari Kementerian Pariwisata dan Ekonomi Kreatif RI. Kami juga mengadopsi sistem reservasi dan check-in contactless untuk meminimalisir kontak fisik.\n\nPT Halla Mohana optimis dengan pemulihan industri pariwisata dan perhotelan, dan kami berkomitmen untuk terus menghadirkan layanan terbaik dengan standar keamanan dan kesehatan tertinggi bagi seluruh tamu dan karyawan kami.`,
  },
]

const ITEMS_PER_PAGE = 6

export default function NewsContent() {
  const [activeMonth, setActiveMonth] = useState("December")
  const [activeYear, setActiveYear] = useState("2022")
  const [page, setPage] = useState(1)
  const [modalNews, setModalNews] = useState<(typeof news)[0] | null>(null)
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set())
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const filtered = news.filter((n) => {
    const monthMatch = activeMonth === "All" || n.month === activeMonth
    const yearMatch = activeYear === "All" || n.year === activeYear
    return monthMatch && yearMatch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  // Reset page when filters change
  useEffect(() => { setPage(1) }, [activeMonth, activeYear])

  // Intersection observer stagger fade-in
  useEffect(() => {
    setVisibleIds(new Set())
    const timeout = setTimeout(() => {
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
    }, 50)
    return () => clearTimeout(timeout)
  }, [paginated.length, page, activeMonth, activeYear])

  // Lock body scroll for modal
  useEffect(() => {
    document.body.style.overflow = modalNews ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [modalNews])

  // Keyboard close modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalNews(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const activeFilters = [
    activeMonth !== "All" ? activeMonth : null,
    activeYear !== "All" ? activeYear : null,
  ].filter(Boolean) as string[]

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <section id="news" className="bg-[#F8F9F4] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Filter bar */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {/* Month */}
          <div className="relative">
            <select
              value={activeMonth}
              onChange={(e) => setActiveMonth(e.target.value)}
              aria-label="Filter by month"
              className="appearance-none rounded-sm border border-[#d6d9c4] bg-white py-2 pl-4 pr-8 font-sans text-sm text-[#3a3a2e] transition-colors focus:border-[#7A8C3C] focus:outline-none"
            >
              {MONTHS.map((m) => <option key={m}>{m}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8C3C]" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* Year */}
          <div className="relative">
            <select
              value={activeYear}
              onChange={(e) => setActiveYear(e.target.value)}
              aria-label="Filter by year"
              className="appearance-none rounded-sm border border-[#d6d9c4] bg-white py-2 pl-4 pr-8 font-sans text-sm text-[#3a3a2e] transition-colors focus:border-[#7A8C3C] focus:outline-none"
            >
              {YEARS.map((y) => <option key={y}>{y}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8C3C]" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* Result count */}
          <span className="ml-auto font-sans text-sm text-[#6b6b55]">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Active filter tags */}
        {activeFilters.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 rounded-full bg-[#7A8C3C]/10 px-3 py-1 font-sans text-xs font-medium text-[#7A8C3C]"
              >
                {f}
                <button
                  aria-label={`Remove ${f} filter`}
                  onClick={() => {
                    if (YEARS.slice(1).includes(f)) setActiveYear("All")
                    else setActiveMonth("All")
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

        {/* Cards grid */}
        {paginated.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((item, idx) => {
              const delay = (idx % 3) * 100
              const visible = visibleIds.has(item.id)
              return (
                <article
                  key={item.id}
                  data-id={item.id}
                  ref={(el) => { if (el) itemRefs.current.set(item.id, el) }}
                  className="flex flex-col overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.3s ease, translate 0.3s ease`,
                  }}
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="font-sans text-xs font-medium uppercase tracking-widest text-[#7A8C3C]">
                      {item.date}
                    </p>
                    <h2 className="font-serif text-xl font-bold leading-snug text-[#2A2E1F] text-balance">
                      {item.title}
                    </h2>
                    <p className="flex-1 font-sans text-sm leading-relaxed text-[#5A6040] text-pretty line-clamp-3">
                      {item.excerpt}
                    </p>
                    <button
                      onClick={() => setModalNews(item)}
                      className="mt-2 self-start font-sans text-sm font-medium text-[#7A8C3C] transition-colors duration-200 hover:text-[#B5B847] focus:outline-none focus-visible:underline"
                    >
                      Read More &rarr;
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="text-[#d6d9c4]">
              <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M14 18h20M14 24h14M14 30h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="font-sans text-sm text-[#6b6b55]">No news found for the selected filters.</p>
            <button
              onClick={() => { setActiveMonth("All"); setActiveYear("All") }}
              className="font-sans text-sm font-medium text-[#7A8C3C] underline-offset-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="News pagination" className="mt-14 flex items-center justify-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-9 items-center gap-1 rounded-sm border border-[#d6d9c4] bg-white px-4 font-sans text-sm text-[#3a3a2e] transition-colors hover:bg-[#f0f2e8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Previous
            </button>

            {pageNumbers.map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                aria-current={page === n ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-sm font-sans text-sm font-medium transition-colors ${
                  page === n
                    ? "bg-[#7A8C3C] text-white"
                    : "border border-[#d6d9c4] bg-white text-[#3a3a2e] hover:bg-[#f0f2e8]"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-9 items-center gap-1 rounded-sm border border-[#d6d9c4] bg-white px-4 font-sans text-sm text-[#3a3a2e] transition-colors hover:bg-[#f0f2e8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </nav>
        )}
      </div>

      {/* Article Modal */}
      {modalNews && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          role="dialog"
          aria-modal="true"
          aria-label={modalNews.title}
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setModalNews(null)} aria-hidden="true" />

          <div
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-sm bg-white shadow-2xl"
            style={{ animation: "modalIn 0.25s ease" }}
          >
            {/* Header image */}
            <div className="relative h-52 shrink-0 overflow-hidden sm:h-64">
              <img
                src={modalNews.image}
                alt={modalNews.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <button
                onClick={() => setModalNews(null)}
                aria-label="Close article"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/70"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col overflow-y-auto p-8">
              <p className="mb-2 font-sans text-xs font-medium uppercase tracking-widest text-[#7A8C3C]">
                {modalNews.date}
              </p>
              <h2 className="font-serif text-2xl font-bold leading-snug text-[#2A2E1F] md:text-3xl text-balance">
                {modalNews.title}
              </h2>
              <div className="my-4 h-[1.5px] w-10 bg-[#B5B847]" />
              <div className="flex-1 space-y-4">
                {modalNews.body.split("\n\n").map((para, i) => (
                  <p key={i} className="font-sans text-sm leading-relaxed text-[#5A6040] text-pretty">
                    {para}
                  </p>
                ))}
              </div>

              {/* Share */}
              <div className="mt-8 border-t border-[#e8ead8] pt-6">
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-widest text-[#6b6b55]">
                  Share this article
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      label: "LinkedIn",
                      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                      color: "#0A66C2",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Facebook",
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                      color: "#1877F2",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Twitter",
                      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(modalNews.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                      color: "#1DA1F2",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                    },
                  ].map(({ label, href, color, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e8ead8] text-[#6b6b55] transition-all duration-200 hover:border-transparent hover:text-white"
                      style={{ ["--hover-bg" as string]: color }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = color }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "" }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Related news */}
              <div className="mt-6 border-t border-[#e8ead8] pt-6">
                <p className="mb-4 font-sans text-xs font-medium uppercase tracking-widest text-[#6b6b55]">
                  Related News
                </p>
                <div className="flex flex-col gap-3">
                  {news
                    .filter((n) => n.id !== modalNews.id)
                    .slice(0, 3)
                    .map((related) => (
                      <button
                        key={related.id}
                        onClick={() => setModalNews(related)}
                        className="flex items-center gap-3 text-left transition-opacity hover:opacity-80"
                      >
                        <img
                          src={related.image}
                          alt={related.title}
                          className="h-12 w-16 shrink-0 rounded-sm object-cover"
                        />
                        <div>
                          <p className="font-sans text-xs text-[#7A8C3C]">{related.date}</p>
                          <p className="font-serif text-sm font-semibold leading-snug text-[#2A2E1F] line-clamp-2">
                            {related.title}
                          </p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  )
}
