'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/** Hero slider — 4 ภาพสไลด์, แต่ละภาพมี crop แยกตามขนาดจอ */
const slides = [
  {
    id: 'brand-hero',
    mobile: '/images/hero/Banner for Phone/Banner for Phone01.jpg',
    tablet: '/images/hero/Banner for Tablet/Banner for Tablet-01.jpg',
    desktop: '/images/hero/Banner For Destop/Banner 1920x900-01.jpg',
  },
  {
    id: 'product-range',
    mobile: '/images/hero/Banner for Phone/Banner for Phone02.jpg',
    tablet: '/images/hero/Banner for Tablet/Banner for Tablet-03.jpg',
    desktop: '/images/hero/Banner For Destop/Banner 1920x900-03.jpg',
  },
  {
    id: 'family-pet-safety',
    mobile: '/images/hero/Banner for Phone/Banner for Phone 03.jpg',
    tablet: '/images/hero/Banner for Tablet/Banner for Tablet-04.jpg',
    desktop: '/images/hero/Banner For Destop/Banner 1920x900-04.jpg',
  },
  {
    id: 'natural-cleaning-tech',
    mobile: '/images/hero/Banner for Phone/Banner for Phone 04.jpg',
    tablet: '/images/hero/Banner for Tablet/Banner for Tablet-05.jpg',
    desktop: '/images/hero/Banner For Destop/Banner 1920x900-05.jpg',
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
