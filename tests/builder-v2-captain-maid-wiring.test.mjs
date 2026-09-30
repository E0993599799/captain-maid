import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Captain Maid homepage consumes the CMS Builder V2 hero contract', () => {
  const app = read('app/page.tsx')
  const hero = read('components/home/HeroSlider.tsx')
  const loader = read('lib/builder-home-hero.ts')

  assert.match(app, /getBuilderHomeHero/)
  assert.match(app, /<HeroSlider slides=/)
  assert.match(hero, /slides\?:/)
  assert.match(loader, /export type CaptainMaidHeroSlide/)
  assert.match(loader, /captain-maid-home-hero/)
})
