import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('hero uses approved responsive artwork and preserves art direction', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const route = read('app/api/captain-maid-hero-1.webp/route.ts')
  const assets = [
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

  assert.match(hero, /\/api\/captain-maid-hero-1\.webp\?v=20260830-hero1/)
  assert.match(route, /'Content-Type': 'image\/webp'/)
  assert.match(route, /max-age=31536000, immutable/)

  const encodedHero = Array.from({ length: 6 }, (_, index) => {
    const part = index + 1
    const partUrl = new URL(`../lib/assets/hero-brand/part${part}.ts`, import.meta.url)
    assert.ok(existsSync(partUrl), `hero WebP part ${part} must exist`)
    const source = read(`lib/assets/hero-brand/part${part}.ts`)
    const match = source.match(/= '([^']+)'/)
    assert.ok(match, `hero WebP part ${part} must contain base64 payload`)
    return match[1]
  }).join('')

  const heroWebp = Buffer.from(encodedHero, 'base64')
  assert.equal(heroWebp.byteLength, 67072)
  assert.equal(heroWebp.subarray(0, 4).toString('ascii'), 'RIFF')
  assert.equal(heroWebp.subarray(8, 12).toString('ascii'), 'WEBP')
  assert.equal(createHash('sha256').update(heroWebp).digest('hex'), 'bff25c9e33f79d3985cbf45e0c0d5efb674a3810665a4673a72b2bb569cd6714')

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
