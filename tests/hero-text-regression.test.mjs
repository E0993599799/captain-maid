import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('brand hero uses text-free responsive artwork', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const cleanAssets = [
    'public/images/hero/captain-maid-hero-mobile.jpg',
    'public/images/hero/captain-maid-hero-tablet.jpg',
    'public/images/hero/captain-maid-hero-desktop.jpg',
  ]

  for (const asset of cleanAssets) {
    assert.ok(existsSync(new URL(`../${asset}`, import.meta.url)), `${asset} must exist`)
    assert.match(hero, new RegExp(asset.split('/').at(-1).replace('.', '\\.')))
  }

  assert.doesNotMatch(hero, /Phone01-clean\.jpg'/)
  assert.doesNotMatch(hero, /Tablet-01-clean\.jpg'/)
  assert.doesNotMatch(hero, /1920x900-01-clean\.jpg'/)
})

test('brand hero presents responsive live copy in the image safe area', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const styles = read('app/globals.css')

  assert.match(hero, /className={`hero-copy-block /)
  assert.match(hero, /className="hero-title--dark-bg"/)
  assert.match(hero, /className="hero-title__line"/)
  assert.match(hero, /className="hero-description"/)
  assert.match(hero, /Made for Easy/)
  assert.match(hero, /Home Cleaning/)
  assert.match(hero, /Better Living, Taken Care of by Captain Maid\./)
  assert.match(styles, /\.hero-content-shell \{[\s\S]*padding-top: 42%/)
})
