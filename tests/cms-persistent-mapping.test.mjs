import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const read = (path) => fs.readFileSync(path, 'utf8')

test('Captain Maid homepage exposes stable RuntimeElement mappings for authored content', () => {
  const sources = [
    read('components/home/HeroSlider.tsx'),
    read('components/home/ValueProps.tsx'),
    read('components/home/SolutionsGrid.tsx'),
    read('components/home/SolutionsDeepDive.tsx'),
    read('components/home/TrustBanner.tsx'),
    read('components/home/WhyCaptainMaid.tsx'),
    read('components/home/BlogTestimonial.tsx'),
  ].join('\n')
  for (const id of [
    'captain-home-hero-title', 'captain-home-hero-description',
    'captain-home-values-family-title', 'captain-home-values-quality-title',
    'captain-home-solutions-title', 'captain-home-solutions-description',
    'captain-home-trust-title', 'captain-home-trust-description',
    'captain-home-why-title', 'captain-home-community-title', 'captain-home-testimonial-quote',
  ]) assert.match(sources, new RegExp(id))
  assert.match(sources, /data-cms-component=["']RuntimeElement["']/)
  assert.match(sources, /data-cms-source-kind=["']builder-component["']/)
})

test('published CMS runtime overrides are hydrated onto stable mapped DOM elements', () => {
  const mapper = read('components/cms/CmsRuntimeMapper.tsx')
  const client = read('lib/cms/runtime-overrides.ts')
  const page = read('app/page.tsx')
  assert.match(mapper, /data-cms-instance/)
  assert.match(mapper, /querySelectorAll/)
  assert.match(mapper, /__cms/)
  assert.match(client, /api\/public\/builder-v2\/runtime\/captain-maid\/home/)
  assert.match(page, /getCaptainMaidRuntimeOverrides/)
  assert.match(page, /<CmsRuntimeMapper/)
})
