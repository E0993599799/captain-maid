import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Captain Maid hero consumes generic runtime bindings with static fallback', () => {
  const page = read('app/page.tsx')
  const hero = read('components/home/HeroSlider.tsx')
  assert.match(page, /getCaptainMaidRuntime\('home', locale\)/)
  assert.match(hero, /fallbackSlides/)
  assert.match(hero, /home\.hero\.slide/)
  assert.match(hero, /home\.hero\.title/)
  assert.doesNotMatch(page, /getCaptainMaidHomeHero/)
})

test('localized home uses the same React binding path and no alternate CMS page renderer', () => {
  const localizedPage = read('app/[locale]/page.tsx')
  assert.match(localizedPage, /HomeContent/)
  assert.doesNotMatch(localizedPage, /CmsPageRenderer/)
  assert.doesNotMatch(localizedPage, /getCmsPage/)
})
