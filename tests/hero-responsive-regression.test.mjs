import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('hero uses the approved responsive artwork at each breakpoint', () => {
  const hero = read('components/home/HeroSlider.tsx')

  assert.equal((hero.match(/mobile: '\/images\/hero\/v2\//g) ?? []).length, 3)
  assert.equal((hero.match(/tablet: '\/images\/hero\/v2\//g) ?? []).length, 3)
  assert.equal((hero.match(/desktop: '\/images\/hero\/v2\//g) ?? []).length, 3)
  assert.match(hero, /desktop: '\/images\/hero\/captain-maid-hero-desktop\.jpg(?:\?[^']+)?'/)
  assert.match(hero, /media="\(max-width: 767px\)"/)
  assert.match(hero, /media="\(max-width: 1023px\)"/)
})

test('hero renders original artwork without a visual filter', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const styles = read('app/globals.css')

  assert.doesNotMatch(hero, /hero-media-overlay/)
  assert.doesNotMatch(styles, /\.hero-media-overlay/)
})

test('hero follows responsive source aspect ratios instead of forcing viewport height', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const styles = read('app/globals.css')

  assert.match(hero, /aspect-\[3\/4\]/)
  assert.match(hero, /sm:aspect-\[4\/3\]/)
  assert.match(hero, /lg:aspect-\[1920\/900\]/)
  assert.doesNotMatch(hero, /\b(?:h-|min-h-)\[/)
  assert.doesNotMatch(styles, /115svh|min-height:\s*760px/)
})
