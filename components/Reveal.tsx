'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger this reveal against a sibling (e.g. image vs. its text), in ms. */
  delayMs?: number
}

/**
 * Reveal — one-shot scroll-triggered fade + rise-in wrapper.
 *
 * ponytail: plain IntersectionObserver, zero dependencies. Unobserves after
 * the first trigger so the animation plays once and never replays on
 * re-scroll. Respects `prefers-reduced-motion` the same way HeroSlider does
 * (matchMedia + change listener) — reduced motion skips the animation and
 * renders children immediately visible. Only opacity/transform are ever
 * animated (via the existing `animate-fade-in-up` Tailwind utility).
 */
export default function Reveal({ children, className = '', delayMs }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleMotionPreference = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMotionPreference)
    return () => mediaQuery.removeEventListener('change', handleMotionPreference)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  const revealClass = reducedMotion ? '' : visible ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'

  return (
    <div
      ref={ref}
      className={[revealClass, className].filter(Boolean).join(' ')}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}
