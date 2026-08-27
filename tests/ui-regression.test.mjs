import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
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

test('global typography prevents synthetic Thai bold and keeps readable hero contrast', () => {
  const styles = read('app/globals.css')

  assert.match(styles, /font-family: var\(--font-english\), var\(--font-thai\)/)
  assert.match(styles, /font-synthesis: none/)
  assert.match(styles, /\.hero-title--dark-bg/)
  assert.match(styles, /color: #ffffff/)
  assert.match(styles, /-webkit-text-fill-color: #ffffff/)
  assert.match(styles, /-webkit-text-stroke:/)
})

test('hero keeps live white text and no artificial media overlay', () => {
  const hero = read('components/home/HeroSlider.tsx')

  assert.doesNotMatch(hero, /text-\[#4db8ff\]/)
  assert.match(hero, /className="hero-title--dark-bg"/)
  assert.match(hero, /className="hero-description"/)
  assert.doesNotMatch(hero, /hero-media-overlay/)
})

test('mobile hero keeps responsive artwork, aspect ratio, and accessible controls', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const styles = read('app/globals.css')

  assert.match(hero, /className="hero-carousel [^"]*aspect-\[3\/4\]/)
  assert.match(hero, /sm:aspect-\[4\/3\]/)
  assert.match(hero, /lg:aspect-\[1920\/900\]/)
  assert.match(hero, /className="hero-content-shell /)
  assert.match(hero, /className={`hero-copy-block /)
  assert.match(hero, /className="hero-description"/)
  assert.match(hero, /prefers-reduced-motion: reduce/)
  assert.match(styles, /@media \(max-width: 767px\)/)
  assert.match(styles, /\.hero-content-shell \{[\s\S]*align-items: flex-end/)
  assert.match(styles, /font-size: clamp\(1\.8rem, 8\.2vw, 2\.35rem\)/)
  assert.match(hero, /aria-label="Previous slide"/)
  assert.match(hero, /aria-label="Next slide"/)
})

test('catalogue product packshot mappings point to real repository assets', () => {
  const catalogue = read('lib/captain-products.ts')
  const mappings = {
    'floor-cleaner-lavender-kerry': 'floor-lavender.webp',
    'floor-cleaner-floral-passion': 'floor-floral.webp',
    'floor-cleaner-tea-tree-flash': 'floor-teatree.webp',
    'bathroom-cleaner-spray': 'bathroom.jpg',
    'kitchen-cleaner-spray': 'kitchen.jpg',
    'glass-cleaner': 'glass.jpg',
  }

  for (const [id, asset] of Object.entries(mappings)) {
    assert.ok(existsSync(new URL(`../public/images/products-img/${asset}`, import.meta.url)), `${asset} must exist`)
    assert.match(
      catalogue,
      new RegExp(`id: '${id}'[\\s\\S]*?image: '/images/products-img/${asset.replace('.', '\\.')}''?`.replace("''?", "'")),
      `${id} must point to ${asset}`,
    )
  }
})

test('header stays visible while scrolling and uses route-aware active state', () => {
  const header = read('components/Header.tsx')

  assert.doesNotMatch(header, /lastScrollY|setVisible|translateY\(-100%\)/)
  assert.match(header, /const isPathActive/)
  assert.match(header, /aria-current=\{active \? 'page' : undefined\}/)
})

test('header switches to mobile navigation before desktop actions crowd', () => {
  const header = read('components/Header.tsx')

  assert.match(header, /hidden[^\"]*xl:flex/)
  assert.match(header, /xl:hidden/)
  assert.match(header, /document\.body\.style\.overflow = mobileOpen \? 'hidden' : ''/)
  assert.match(header, /<>[\s\S]*<header[\s\S]*<\/header>[\s\S]*\{mobileOpen && \(/)
  assert.match(header, /fixed inset-x-0 bottom-0 z-\[60\] xl:hidden/)
})
