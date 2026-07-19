import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('root layout installs the Thai body and heading font variables', () => {
  const layout = read('app/layout.tsx')

  assert.match(layout, /Noto_Sans_Thai/)
  assert.match(layout, /Mitr/)
  assert.match(layout, /className=\{`\$\{bodyFont\.variable\} \$\{headingFont\.variable\}`\}/)
})

test('dark hero uses one white treatment for every heading line', () => {
  const hero = read('components/home/HeroSlider.tsx')

  assert.doesNotMatch(hero, /text-\[#4db8ff\]/)
  assert.match(hero, /className="hero-title__line"/)
  assert.match(hero, /className="hero-media-overlay"/)
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
})
