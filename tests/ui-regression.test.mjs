import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('root layout installs Roboto for English and regular Noto Sans Thai for Thai', () => {
  const layout = read('app/layout.tsx')

  assert.match(layout, /Roboto/)
  assert.match(layout, /Noto_Sans_Thai/)
  assert.doesNotMatch(layout, /Mitr/)
  assert.match(layout, /weight: \['400'\]/)
  assert.match(layout, /className=\{`\$\{englishFont\.variable\} \$\{thaiFont\.variable\}`\}/)
})

test('global typography prevents synthetic Thai bold and uses expanded hero outlines', () => {
  const styles = read('app/globals.css')

  assert.match(styles, /font-family: var\(--font-english\), var\(--font-thai\)/)
  assert.match(styles, /font-synthesis: none/)
  assert.match(styles, /font-weight: 600/)
  assert.match(styles, /-webkit-text-stroke: 25\.2px #ffffff/)
  assert.match(styles, /-webkit-text-stroke: clamp\(8\.4px, 0\.924vw, 16\.8px\) #101849/)
  assert.match(styles, /letter-spacing: 0\.015em/)
  assert.match(styles, /letter-spacing: 0\.012em/)
})

test('dark hero uses one white treatment for every heading line', () => {
  const hero = read('components/home/HeroSlider.tsx')

  assert.doesNotMatch(hero, /text-\[#4db8ff\]/)
  assert.match(hero, /className="hero-title__line"/)
  assert.match(hero, /className="hero-media-overlay"/)
})

test('mobile hero preserves portrait artwork and its upper text-safe area', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const styles = read('app/globals.css')

  assert.match(hero, /className="hero-carousel /)
  assert.match(hero, /className="hero-content-shell /)
  assert.match(styles, /@media \(max-width: 767px\)/)
  assert.match(styles, /height: max\(100svh, min\(177\.68vw, 900px\)\)/)
  assert.match(styles, /align-items: flex-start/)
  assert.match(styles, /transparent 42%/)
})

test('every catalogue product uses its matching product packshot', () => {
  const catalogue = read('lib/captain-products.ts')
  const productIds = [
    'floor-cleaner-lavender-kerry',
    'floor-cleaner-floral-passion',
    'floor-cleaner-tea-tree-flash',
    'bathroom-cleaner-spray',
    'kitchen-cleaner-spray',
    'glass-cleaner',
  ]

  for (const id of productIds) {
    assert.match(
      catalogue,
      new RegExp(`id: '${id}'[\\s\\S]*?image: '/images/products/${id}\\.png'`),
      `${id} must point to its matching packshot`,
    )
  }
})

test('header stays visible while scrolling and uses route-aware active state', () => {
  const header = read('components/Header.tsx')

  assert.doesNotMatch(header, /lastScrollY|setVisible|translateY\(-100%\)/)
  assert.match(header, /const isPathActive/)
  assert.match(header, /aria-current=\{active \? 'page' : undefined\}/)
})

test('header switches to its mobile navigation before desktop actions crowd', () => {
  const header = read('components/Header.tsx')

  assert.match(header, /hidden xl:flex/)
  assert.match(header, /xl:hidden/)
  assert.match(header, /document\.body\.style\.overflow = mobileOpen \? 'hidden' : ''/)
  assert.match(header, /<>[\s\S]*<header[\s\S]*<\/header>[\s\S]*\{mobileOpen && \(/)
  assert.match(header, /fixed inset-x-0 bottom-0 z-\[60\] xl:hidden/)
})
