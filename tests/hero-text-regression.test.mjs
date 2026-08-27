import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('hero uses approved responsive artwork and preserves art direction', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const assets = [
    'slide-1-brand-clean.webp',
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

  for (const asset of assets) {
    assert.ok(existsSync(new URL(`../public/images/hero/v2/${asset}`, import.meta.url)), `${asset} must exist`)
    assert.match(hero, new RegExp(asset.replace('.', '\\.')))
  }

  assert.match(hero, /<source media="\(max-width: 767px\)" srcSet=\{slide\.mobile\}/)
  assert.match(hero, /<source media="\(max-width: 1023px\)" srcSet=\{slide\.tablet\}/)
  assert.match(hero, /src=\{slide\.desktop\}/)
})

test('hero presents responsive live copy without a media treatment', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const styles = read('app/globals.css')

  assert.match(hero, /hero-content-shell/)
  assert.match(hero, /hero-copy-block/)
  assert.match(hero, /hero-title--dark-bg/)
  assert.match(hero, /hero-description/)
  assert.match(hero, /Made for Easy Home Cleaning/)
  assert.match(hero, /Better Living, Taken Care of by Captain Maid\./)
  assert.doesNotMatch(hero, /hero-media-overlay/)
  assert.doesNotMatch(styles, /\.hero-media-overlay/)
})
