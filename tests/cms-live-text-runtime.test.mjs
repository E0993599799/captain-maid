import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('published CMS bindings are fetched on the server and MutationObserver runtime is not mounted', () => {
  const layout = read('app/layout.tsx')
  const client = read('lib/cms/bindings.ts')
  assert.match(layout, /getCaptainMaidRuntime/)
  assert.match(layout, /globalBindings/)
  assert.doesNotMatch(layout, /CmsLiveTextRuntime/)
  assert.match(client, /runtime\/captain-maid/)
  assert.match(client, /cache: 'no-store'/)
})

test('home React components receive generic published bindings directly', () => {
  const page = read('app/page.tsx')
  const localized = read('app/[locale]/page.tsx')
  const hero = read('components/home/HeroSlider.tsx')
  assert.match(page, /getCaptainMaidRuntime\('home', locale\)/)
  assert.match(page, /<HeroSlider bindings=\{bindings\}/)
  assert.match(page, /<TrustBanner bindings=\{bindings\}/)
  assert.match(localized, /<HomeContent locale=\{locale as Locale\}/)
  assert.match(hero, /home\.hero\.title/)
  assert.match(hero, /home\.hero\.slide/)
})
