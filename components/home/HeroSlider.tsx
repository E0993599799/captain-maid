'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/** Hero slider — 4 ภาพสไลด์, แต่ละภาพมี crop แยกตามขนาดจอ */
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

  return (
    <section
      className="hero-carousel relative isolate w-full min-h-[600px] overflow-hidden sm:min-h-[640px] lg:h-[min(85vh,820px)] lg:min-h-[600px]"
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
              className="hero-slide-image h-full w-full object-cover"
              style={{ '--hero-desktop-position': slide.desktopPosition ?? 'center top' } as React.CSSProperties}
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </picture>
        </div>
      ))}

      {/* One continuous overlay avoids a hard seam while preserving the products. */}
      <div className="hero-media-overlay" aria-hidden="true" />


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
