import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')

test('published Vvveb text runtime is mounted globally', () => {
  const layout = read('app/layout.tsx')
  const runtime = read('components/cms/CmsLiveTextRuntime.tsx')

  assert.match(layout, /CmsLiveTextRuntime/)
  assert.match(runtime, /usePathname/)
  assert.match(runtime, /runtime\/captain-maid/)
  assert.match(runtime, /textPatches/)
  assert.match(runtime, /MutationObserver/)
  assert.match(runtime, /querySelectorAll\(patch\.tag\)/)
})

test('homepage hero consumes CMS title and description', () => {
  const loader = read('lib/cms/home-hero.ts')
  const hero = read('components/home/HeroSlider.tsx')
  const page = read('app/page.tsx')

  assert.match(loader, /title\?: string/)
  assert.match(loader, /description\?: string/)
  assert.match(hero, /cmsTitle/)
  assert.match(hero, /cmsDescription/)
  assert.match(page, /cmsTitle=\{homeHero\?\.title\}/)
  assert.match(page, /cmsDescription=\{homeHero\?\.description\}/)
})
