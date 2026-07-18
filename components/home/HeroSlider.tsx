'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

/** Hero slider — 5 ภาพสไลด์ ตาม requirement */
const slides = [
  '/images/hero-1.png',
  '/images/hero-2.png',
  '/images/hero-3.png',
  '/images/hero-4.png',
  '/images/hero-5.png',
]

export default function HeroSlider() {
  const [current, setCurrent] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleMotionPreference = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMotionPreference)
    return () => mediaQuery.removeEventListener('change', handleMotionPreference)
  }, [])

  React.useEffect(() => {
    if (paused || reducedMotion) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [paused, reducedMotion])

  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length)

  return (
    <section
      className="relative isolate w-full min-h-[600px] overflow-hidden sm:min-h-[640px] lg:h-[min(85vh,820px)] lg:min-h-[600px]"
      aria-roledescription="carousel"
      aria-label="Captain Maid highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      {/* Slides */}
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 ${reducedMotion ? '' : 'transition-opacity duration-700'}`}
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={src}
            alt={i === current ? `Captain Maid slide ${i + 1}` : ''}
            fill
            className="w-full h-full object-cover"
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#002d5f]/70 via-[#002d5f]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#002d5f]/40 to-transparent" />

      {/* Content */}
      <div className="relative flex min-h-[600px] items-center px-4 py-24 sm:min-h-[640px] sm:px-6 lg:min-h-0 lg:h-full lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-xl text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 shadow-sm backdrop-blur">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold text-white">มืออาชีพด้านการทำความสะอาด</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            สะอาดทุกมุม
            <span className="block text-[#4db8ff]">มั่นใจทุกวัน</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-white/85 sm:text-lg lg:mx-0">
            ผลิตภัณฑ์ทำความสะอาดคุณภาพสูง เพื่อบ้านที่สะอาด ปลอดภัย และน่าอยู่สำหรับทุกคน
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/products"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0079c1] px-7 py-3 text-base font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#0066a8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
            >
              เลือกซื้อสินค้า
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white bg-white/10 px-7 py-3 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-[#002d5f] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
            >
              ค้นหาโซลูชัน
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:left-4 sm:h-12 sm:w-12"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:right-4 sm:h-12 sm:w-12"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-6 sm:gap-2" aria-label="Choose slide">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            className="flex min-h-11 min-w-11 items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`} />
          </button>
        ))}
      </div>
    </section>
  )
}
