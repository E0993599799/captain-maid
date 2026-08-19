import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('every hero slide uses its own text-free responsive artwork', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const cleanAssets = [
    'slide-1-brand-mobile.jpg',
    'slide-1-brand-tablet.jpg',
    'slide-1-brand-desktop.jpg',
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

  for (const asset of cleanAssets) {
    assert.ok(existsSync(new URL(`../public/images/hero/v2/${asset}`, import.meta.url)), `${asset} must exist`)
    assert.match(hero, new RegExp(asset.replace('.', '\\.')))
  }
})

test('hero contains no promotional live text or media treatment', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const styles = read('app/globals.css')

  assert.doesNotMatch(hero, /hero-content-shell|hero-copy-block|hero-title|hero-description/)
  assert.doesNotMatch(hero, /Made for Easy|Home Cleaning|Better Living/)
  assert.doesNotMatch(hero, /hero-media-overlay/)
  assert.doesNotMatch(styles, /\.hero-media-overlay/)
})
