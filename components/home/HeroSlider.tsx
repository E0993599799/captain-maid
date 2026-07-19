'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

/** Hero slider — 6 ภาพสไลด์ (5 ตาม requirement + 1 เพิ่มเติม), แต่ละภาพมี crop แยกตามขนาดจอ */
const slides = [
  {
    id: 'brand-hero',
    mobile: '/images/hero/01-brand-hero-mobile.png',
    tablet: '/images/hero/01-brand-hero-tablet.png',
    desktop: '/images/hero/01-brand-hero-desktop.png',
    eyebrow: 'มืออาชีพด้านการทำความสะอาด',
    heading: 'สะอาดทุกมุม',
    headingAccent: 'มั่นใจทุกวัน',
    body: 'ผลิตภัณฑ์ทำความสะอาดคุณภาพสูง เพื่อบ้านที่สะอาด ปลอดภัย และน่าอยู่สำหรับทุกคน',
  },
  {
    id: 'product-range',
    mobile: '/images/hero/02-product-range-mobile.png',
    tablet: '/images/hero/02-product-range-tablet.png',
    desktop: '/images/hero/02-product-range-desktop.png',
    eyebrow: 'ครบทุกพื้นที่ในบ้าน',
    heading: 'ครบทุกความต้องการ',
    headingAccent: 'ทำความสะอาด',
    body: 'ผลิตภัณฑ์คุณภาพครอบคลุมพื้น ห้องน้ำ ห้องครัว กระจก และการฆ่าเชื้อ ในแบรนด์เดียว',
    desktopPosition: 'center 58%',
  },
  {
    id: 'family-pet-safety',
    mobile: '/images/hero/03-family-pet-safety-mobile.png',
    tablet: '/images/hero/03-family-pet-safety-tablet.png',
    desktop: '/images/hero/03-family-pet-safety-desktop.png',
    eyebrow: 'ปลอดภัยสำหรับทุกคน',
    heading: 'อ่อนโยนต่อเด็ก',
    headingAccent: 'และสัตว์เลี้ยง',
    body: 'สูตรอ่อนโยน ไว้ใจได้ทุกวัน แม้เป็นบ้านที่มีเด็กเล็กและสัตว์เลี้ยงที่คุณรัก',
  },
  {
    id: 'natural-cleaning-tech',
    mobile: '/images/hero/04-natural-cleaning-tech-mobile.png',
    tablet: '/images/hero/04-natural-cleaning-tech-tablet.png',
    desktop: '/images/hero/04-natural-cleaning-tech-desktop.png',
    eyebrow: 'เทคโนโลยีจากธรรมชาติ',
    heading: 'สะอาดล้ำลึก',
    headingAccent: 'ด้วยพลังจากธรรมชาติ',
    body: 'สารทำความสะอาดจากพืช อ่อนโยนต่อพื้นผิวและมือ แต่ยังคงประสิทธิภาพเต็มที่',
  },
  {
    id: 'trust-cta',
    mobile: '/images/hero/05-trust-cta-mobile.png',
    tablet: '/images/hero/05-trust-cta-tablet.png',
    desktop: '/images/hero/05-trust-cta-desktop.png',
    eyebrow: 'ไว้วางใจโดยครอบครัวไทย',
    heading: 'เลือกกัปตันเมด',
    headingAccent: 'เพื่อบ้านที่คุณวางใจ',
    body: 'คุณภาพที่พิสูจน์ได้ทุกขวด พร้อมดูแลบ้านของคุณให้สะอาดและปลอดภัยทุกวัน',
  },
  {
    id: 'object-hero',
    mobile: '/images/hero/06-object-hero-mobile.png',
    tablet: '/images/hero/06-object-hero-tablet.png',
    desktop: '/images/hero/06-object-hero-desktop.png',
    eyebrow: 'ออกแบบมาเพื่อคุณ',
    heading: 'ใช้งานง่าย',
    headingAccent: 'เห็นผลจริงทุกวัน',
    body: 'ดีไซน์ขวดถือสบายมือ เทง่าย ไม่หกเลอะเทอะ พร้อมใช้งานได้ทันทีในทุกจุดของบ้าน',
  },
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
    }, 6000)
    return () => clearInterval(timer)
  }, [paused, reducedMotion])

  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length)
  const active = slides[current]

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
      {/* Slides — art-directed crops per breakpoint via <picture>, image + text change together */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 ${reducedMotion ? '' : 'transition-opacity duration-700'}`}
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <picture className="block h-full w-full">
            <source media="(max-width: 767px)" srcSet={slide.mobile} />
            <source media="(max-width: 1023px)" srcSet={slide.tablet} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.desktop}
              alt={i === current ? `Captain Maid — ${slide.heading} ${slide.headingAccent}` : ''}
              className="h-full w-full object-cover"
              style={{ objectPosition: slide.desktopPosition ?? 'center top' }}
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </picture>
        </div>
      ))}

      {/* One continuous overlay avoids a hard seam while preserving the products. */}
      <div className="hero-media-overlay" aria-hidden="true" />

      {/* Content — text block owned by the active slide, transitions with it */}
      <div className="relative flex min-h-[600px] items-center px-5 pb-24 pt-28 sm:min-h-[640px] sm:px-8 lg:min-h-0 lg:h-full lg:px-16">
        <div className="mx-auto w-full max-w-[1440px]">
          <div
            key={active.id}
            className={`max-w-[680px] text-center lg:text-left ${reducedMotion ? '' : 'animate-hero-copy-in'}`}
          >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 shadow-sm backdrop-blur">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold text-white">{active.eyebrow}</span>
          </div>
          <h1 className="hero-title hero-title--dark-bg">
            {active.heading}
            <span className="hero-title__line">{active.headingAccent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-white/85 sm:text-lg lg:mx-0">
            {active.body}
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
        className="absolute left-3 top-1/2 z-10 hidden sm:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:left-4 sm:h-12 sm:w-12"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 hidden sm:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:right-4 sm:h-12 sm:w-12"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-6 sm:gap-2" aria-label="Choose slide">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
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
