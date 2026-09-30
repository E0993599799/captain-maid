import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Captain Maid homepage loads published Builder V2 hero slides with static fallback', () => {
  const page = read('app/page.tsx')
  const hero = read('components/home/HeroSlider.tsx')
  const loader = read('lib/cms/home-hero.ts')

  assert.match(page, /getCaptainMaidHomeHero/)
  assert.match(page, /cmsSlides=\{homeHero\?\.slides\}/)
  assert.match(loader, /captain-maid-home-hero/)
  assert.match(loader, /revalidate:\s*30/)
  assert.match(hero, /cmsSlides/)
  assert.match(hero, /fallbackSlides/)
  assert.match(hero, /slides\.length/)
})

test('localized CMS homepage also applies Builder V2 hero media', () => {
  const localizedPage = read('app/[locale]/page.tsx')
  const renderer = read('components/cms/CmsPageRenderer.tsx')

  assert.match(localizedPage, /getCaptainMaidHomeHero/)
  assert.match(localizedPage, /heroSlides=\{homeHero\?\.slides\}/)
  assert.match(renderer, /heroSlides/)
  assert.match(renderer, /cmsHero\.mobile/)
  assert.match(renderer, /cmsHero\.tablet/)
  assert.match(renderer, /cmsHero\.desktop/)
})
