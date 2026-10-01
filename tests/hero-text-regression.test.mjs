import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('hero uses approved responsive artwork and preserves art direction', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const assets = [
    'slide-1-brand-mobile.jpg',
    'slide-1-brand-tablet.jpg',
    'slide-2-floor-care-mobile.jpg',
    'slide-2-floor-care-tablet.jpg',
    'slide-2-floor-care-desktop.jpg',
    'slide-3-family-safe-mobile.jpg',
    'slide-3-family-safe-tablet.jpg',
    'slide-3-family-safe-desktop.jpg',
    'slide-4-surface-care-mobile.jpg',
    'slide-4-surface-care-tablet.jpg',
    'slide-4-surface-care-desktop.jpg',
  ]

  assert.ok(existsSync(new URL('../public/images/hero/captain-maid-hero-desktop.jpg', import.meta.url)))
  assert.match(hero, /desktop: '\/images\/hero\/captain-maid-hero-desktop\.jpg(?:\?[^']+)?'/)
  assert.match(hero, /mobile: '\/images\/hero\/v2\/slide-1-brand-mobile\.jpg(?:\?[^']+)?'/)
  assert.match(hero, /tablet: '\/images\/hero\/v2\/slide-1-brand-tablet\.jpg(?:\?[^']+)?'/)
  assert.doesNotMatch(hero, /captain-maid-hero-1\.webp/)

  for (const asset of assets) {
    assert.ok(existsSync(new URL(`../public/images/hero/v2/${asset}`, import.meta.url)), `${asset} must exist`)
    assert.match(hero, new RegExp(asset.replace('.', '\\.')))
  }

  assert.match(hero, /<source media="\(max-width: 767px\)" srcSet=\{slide\.mobile\}/)
  assert.match(hero, /<source media="\(max-width: 1023px\)" srcSet=\{slide\.tablet\}/)
  assert.match(hero, /src=\{slide\.desktop\}/)
})

test('hero presents responsive live copy with a thin gray shadow and no blue outline', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const styles = read('app/globals.css')

  assert.match(hero, /hero-content-shell/)
  assert.match(hero, /hero-copy-block/)
  assert.match(hero, /hero-title--dark-bg/)
  assert.match(hero, /hero-description/)
  assert.match(hero, /Made for Easy Home Cleaning/)
  assert.match(hero, /Better Living, Taken Care of by Captain Maid\./)
  assert.match(hero, /WebkitTextStroke: '0 transparent'/)
  assert.match(hero, /textShadow: '0 1px 2px rgba\(75, 85, 99, 0\.5\), 0 2px 5px rgba\(31, 41, 55, 0\.16\)'/)
  assert.doesNotMatch(hero, /hero-media-overlay/)
  assert.doesNotMatch(styles, /\.hero-media-overlay/)
})
