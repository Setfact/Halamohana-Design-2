"use client"

import { useEffect, useRef, useState } from "react"

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 2,  suffix: "",  label: "Properties" },
  { value: 50, suffix: "K+", label: "Guests Served" },
  { value: 2,  suffix: "",  label: "Strategic Locations" },
]

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

function StatItem({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
  const count = useCountUp(stat.value, 1600, active)

  return (
    <div
      className="group relative flex flex-col items-center justify-center px-8 py-12 text-center transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Left divider (hidden on first item and on mobile) */}
      {index > 0 && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-[#7A8C3C]/30 md:block"
        />
      )}

      {/* Accent dot */}
      <span className="mb-3 block h-1 w-6 rounded-full bg-[#7A8C3C]" />

      {/* Number */}
      <p className="font-serif text-5xl font-bold leading-none text-[#2A2E1F] md:text-6xl">
        {count}
        <span>{stat.suffix}</span>
      </p>

      {/* Label */}
      <p className="mt-3 font-sans text-xs font-medium uppercase tracking-widest text-[#6B6560]">
        {stat.label}
      </p>
    </div>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Company achievements"
      className="w-full bg-[#F8F9F4] py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div
          className="mb-14 flex flex-col items-center gap-3 text-center transition-all duration-700"
          style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(16px)" }}
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-[#7A8C3C]">
            PT Halla Mohana
          </p>
          <h2 className="font-serif text-3xl font-semibold text-[#2A2E1F] text-balance md:text-4xl">
            A Legacy of Distinction
          </h2>
          <div className="mt-1 h-px w-12 bg-[#B5B847]" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 divide-y divide-[#7A8C3C]/20 sm:grid-cols-2 sm:divide-y-0 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
