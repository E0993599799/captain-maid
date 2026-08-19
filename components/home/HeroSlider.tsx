'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/** Hero slider — art-directed presentation across mobile, tablet, and desktop. */
const slides = [
  {
    id: 'brand-hero',
    mobile: '/images/Photo-for-website-captain-maid/Slide Banner/Banner for Phone/Banner for Phone01-clean.jpg',
    tablet: '/images/Photo-for-website-captain-maid/Slide Banner/Banner for Tablet/Banner for Tablet-01-clean.jpg',
    desktop: '/images/Photo-for-website-captain-maid/Slide Banner/Banner For Destop/Banner 1920x900-01-clean.jpg',
    alt: 'Captain Maid — made for easy home cleaning',
  },
  {
    id: 'product-range',
    mobile: '/images/Photo-for-website-captain-maid/Slide Banner/Banner for Phone/Banner for Phone02.jpg',
    tablet: '/images/Photo-for-website-captain-maid/Slide Banner/Banner for Tablet/Banner for Tablet-03.jpg',
    desktop: '/images/Photo-for-website-captain-maid/Slide Banner/Banner For Destop/Banner 1920x900-03.jpg',
    alt: '',
  },
  {
    id: 'family-pet-safety',
    mobile: '/images/Photo-for-website-captain-maid/Slide Banner/Banner for Phone/Banner for Phone 03.jpg',
    tablet: '/images/Photo-for-website-captain-maid/Slide Banner/Banner for Tablet/Banner for Tablet-04.jpg',
    desktop: '/images/Photo-for-website-captain-maid/Slide Banner/Banner For Destop/Banner 1920x900-04.jpg',
    alt: '',
  },
  {
    id: 'natural-cleaning-tech',
    mobile: '/images/Photo-for-website-captain-maid/Slide Banner/Banner for Phone/Banner for Phone 04.jpg',
    tablet: '/images/Photo-for-website-captain-maid/Slide Banner/Banner for Tablet/Banner for Tablet-05.jpg',
    desktop: '/images/Photo-for-website-captain-maid/Slide Banner/Banner For Destop/Banner 1920x900-05.jpg',
    alt: '',
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
      className="hero-carousel relative isolate h-[min(62svh,560px)] min-h-[440px] w-full overflow-hidden bg-[#0460ab] sm:h-[min(66svh,640px)] sm:min-h-[500px] lg:h-[min(85vh,820px)] lg:min-h-[600px]"
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
              width={1920}
              height={900}
              className="hero-slide-image h-full w-full object-cover object-center"
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
        </div>
      ))}

      <div
        className={`hero-media-overlay pointer-events-none z-[4] transition-opacity duration-500 ${
          current === 0 ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      <div className="hero-content-shell pointer-events-none absolute inset-0 z-[5] flex items-start justify-center px-5 pt-[44%] sm:items-end sm:justify-start sm:px-[7%] sm:pb-[9%] sm:pt-0 lg:px-[7%] lg:pb-[10%]">
        <div
          className={`hero-copy-block w-full max-w-[34rem] text-center text-white transition-opacity duration-500 sm:w-[48%] sm:text-left lg:w-[43%] lg:max-w-[38rem] ${
            current === 0 ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={current !== 0}
        >
          <h1 className="hero-title--dark-bg">
            <span className="hero-title__line">Made for Easy</span>
            <span className="hero-title__line">Home Cleaning</span>
          </h1>
          <p className="hero-description">
            Better Living, Taken Care of by Captain Maid.
          </p>
        </div>
      </div>

      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:left-4 sm:flex sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:right-4 sm:flex sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-3 sm:gap-2"
        aria-label="Choose slide"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            className="flex min-h-11 min-w-11 items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
