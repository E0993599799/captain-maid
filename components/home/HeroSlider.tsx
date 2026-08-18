'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/** Hero slider — art-directed presentation across mobile, tablet, and desktop. */
const slides = [
  {
    id: 'brand-hero',
    mobile: '/images/hero/captain-maid-brand-hero.svg',
    tablet: '/images/hero/captain-maid-brand-hero.svg',
    desktop: '/images/hero/captain-maid-brand-hero.svg',
    alt: 'Captain Maid brand mascot and logo for easy home cleaning',
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
    }, 6000)
    return () => clearInterval(timer)
  }, [paused, reducedMotion])

  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length)

  return (
    <section
      className="hero-carousel relative isolate h-[430px] w-full overflow-hidden bg-[#0460ab] sm:h-[560px] lg:h-[min(85vh,820px)] lg:min-h-[600px]"
      aria-roledescription="carousel"
      aria-label="Captain Maid highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      {slides.map((slide, i) => {
        const isBrandHero = slide.id === 'brand-hero'
        return (
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
                width={isBrandHero ? 1600 : 1920}
                height={isBrandHero ? 750 : 900}
                className={`hero-slide-image h-full w-full ${
                  isBrandHero
                    ? 'object-contain object-top lg:object-cover lg:object-center'
                    : 'object-cover'
                }`}
                fetchPriority={i === 0 ? 'high' : 'low'}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
          </div>
        )
      })}

      <div
        className={`absolute inset-x-0 bottom-12 z-[5] px-6 text-center text-white transition-opacity duration-500 sm:bottom-16 sm:px-10 lg:bottom-[15%] lg:left-[6%] lg:right-auto lg:max-w-[620px] lg:px-0 lg:text-left ${
          current === 0 ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={current !== 0}
      >
        <h1 className="text-balance text-3xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-4xl lg:text-5xl xl:text-6xl">
          Made for Easy Home Cleaning
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-balance text-base font-medium leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:mt-4 sm:text-xl lg:mx-0 lg:text-2xl">
          Better Living, Taken Care of by Captain Maid.
        </p>
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
        className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-4 sm:gap-2"
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
