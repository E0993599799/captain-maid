'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/** Hero slider — art-directed presentation across mobile, tablet, and desktop. */
const slides = [
  {
    id: 'brand-hero',
    mobile: '/api/captain-maid-hero-1.webp?v=20260830-recovery',
    tablet: '/api/captain-maid-hero-1.webp?v=20260830-recovery',
    desktop: '/api/captain-maid-hero-1.webp?v=20260830-recovery',
    alt: 'Captain Maid home cleaning hero',
  },
  {
    id: 'product-range',
    mobile: '/images/hero/v2/slide-2-floor-care-mobile.jpg',
    tablet: '/images/hero/v2/slide-2-floor-care-tablet.jpg',
    desktop: '/images/hero/v2/slide-2-floor-care-desktop.jpg',
    alt: 'Captain Maid floor cleaner range',
  },
  {
    id: 'family-pet-safety',
    mobile: '/images/hero/v2/slide-3-family-safe-mobile.jpg',
    tablet: '/images/hero/v2/slide-3-family-safe-tablet.jpg',
    desktop: '/images/hero/v2/slide-3-family-safe-desktop.jpg',
    alt: 'A family relaxing with their pets in a clean home',
  },
  {
    id: 'natural-cleaning-tech',
    mobile: '/images/hero/v2/slide-4-surface-care-mobile.jpg',
    tablet: '/images/hero/v2/slide-4-surface-care-tablet.jpg',
    desktop: '/images/hero/v2/slide-4-surface-care-desktop.jpg',
    alt: 'Captain Maid surface cleaner range in a bright kitchen',
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
    }, 8000)
    return () => clearInterval(timer)
  }, [paused, reducedMotion])

  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length)

  return (
    <section
      className="hero-carousel relative isolate aspect-[3/4] w-full overflow-hidden bg-[#0460ab] sm:aspect-[4/3] lg:aspect-[1920/900]"
      aria-roledescription="carousel"
      aria-label="Captain Maid highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
      }}
    >
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
              alt={slide.alt}
              width={slide.id === 'brand-hero' ? 2560 : 1920}
              height={slide.id === 'brand-hero' ? 1280 : 900}
              className={`hero-slide-image h-full w-full object-cover ${
                slide.id === 'brand-hero'
                  ? 'object-[72%_center] sm:object-[68%_center] lg:object-center'
                  : 'object-center'
              }`}
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
        </div>
      ))}

      <div className="hero-content-shell pointer-events-none absolute inset-0 z-[5] flex items-end justify-center px-5 pb-16 sm:justify-start sm:px-[7%] sm:pb-[8%] lg:pb-[9%]">
        <div
          className={`hero-copy-block w-full max-w-[34rem] text-center text-white transition-opacity duration-500 sm:w-[48%] sm:text-left lg:w-[43%] lg:max-w-[38rem] ${
            current === 0 ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={current !== 0}
        >
          <h1
            className="hero-title--dark-bg"
            style={{
              fontSize: 'clamp(1.15rem, 3vw, 2.75rem)',
              whiteSpace: 'nowrap',
              WebkitTextStroke: '0 transparent',
              textShadow: '0 1px 2px rgba(75, 85, 99, 0.5), 0 2px 5px rgba(31, 41, 55, 0.16)',
            }}
          >
            Made for Easy Home Cleaning
          </h1>
          <p className="hero-description">Better Living, Taken Care of by Captain Maid.</p>
        </div>
      </div>

      <button onClick={goPrev} aria-label="Previous slide" className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:left-4 sm:flex sm:h-12 sm:w-12"><ChevronLeft className="h-5 w-5" /></button>
      <button onClick={goNext} aria-label="Next slide" className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:right-4 sm:flex sm:h-12 sm:w-12"><ChevronRight className="h-5 w-5" /></button>

      <div className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-3 sm:gap-2" aria-label="Choose slide">
        {slides.map((slide, i) => (
          <button key={slide.id} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === current} className="flex min-h-11 min-w-11 items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <span className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
          </button>
        ))}
      </div>
    </section>
  )
}
