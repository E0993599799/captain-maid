import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')

test('live CMS runtime uses stable data-cms-key bindings as the primary contract', () => {
  const runtime = read('components/cms/CmsLiveTextRuntime.tsx')
  assert.match(runtime, /bindings\?: Record<string, StableBinding>/)
  assert.match(runtime, /data-cms-key/)
  assert.match(runtime, /applyImage/)
  assert.match(runtime, /globalBindings/)
  assert.match(runtime, /legacyTextPatches/)
  assert.match(runtime, /Object\.keys\(bindings\)\.length === 0/)
})

test('homepage exposes stable text and responsive-image keys', () => {
  const hero = read('components/home/HeroSlider.tsx')
  const valueProps = read('components/home/ValueProps.tsx')
  const solutions = read('components/home/SolutionsGrid.tsx')
  const deepDive = read('components/home/SolutionsDeepDive.tsx')
  const trust = read('components/home/TrustBanner.tsx')
  const why = read('components/home/WhyCaptainMaid.tsx')

  assert.match(hero, /home\.hero\.title/)
  assert.match(hero, /home\.hero\.description/)
  assert.match(hero, /home\.hero\.slide\.\$\{i \+ 1\}\.image/)
  assert.match(valueProps, /home\.valueProps/)
  assert.match(solutions, /home\.solutionsGrid/)
  assert.match(deepDive, /home\.solutions/)
  assert.match(trust, /home\.trust\.image/)
  assert.match(why, /home\.why\.image/)
})

test('global header and footer plus static pages expose stable keys', () => {
  const header = read('components/Header.tsx')
  const footer = read('components/Footer.tsx')
  const about = read('app/about/page.tsx')
  const contact = read('app/contact/page.tsx')
  const faq = read('app/faq/page.tsx')
  const blog = read('app/blog/page.tsx')
  const products = read('components/products/ProductsGrid.tsx')

  assert.match(header, /global\.header\.logo/)
  assert.match(header, /global\.header\.nav/)
  assert.match(footer, /global\.footer\.logo/)
  assert.match(about, /about\.hero\.title/)
  assert.match(contact, /contact\.title/)
  assert.match(faq, /faq\.hero\.title/)
  assert.match(blog, /blog\.title/)
  assert.match(products, /products\.title/)
})
