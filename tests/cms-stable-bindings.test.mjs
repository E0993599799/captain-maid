import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('stable binding helpers cover text link image and global values', () => {
  const runtime = read('lib/cms/bindings.ts')
  assert.match(runtime, /export type CmsTextBinding/)
  assert.match(runtime, /export type CmsLinkBinding/)
  assert.match(runtime, /export type CmsImageBinding/)
  assert.match(runtime, /cmsText/)
  assert.match(runtime, /cmsLink/)
  assert.match(runtime, /cmsImage/)
  assert.match(runtime, /globalBindings/)
})

test('responsive CMS images render exact mobile tablet and desktop binding URLs', () => {
  const picture = read('components/cms/CmsPicture.tsx')
  assert.match(picture, /max-width: 767px/)
  assert.match(picture, /srcSet=\{image\.mobile\}/)
  assert.match(picture, /max-width: 1023px/)
  assert.match(picture, /srcSet=\{image\.tablet\}/)
  assert.match(picture, /src=\{image\.desktop\}/)
})

test('all top-level editable pages consume the server binding runtime', () => {
  for (const path of ['app/about/page.tsx', 'app/contact/page.tsx', 'app/faq/page.tsx', 'app/blog/page.tsx', 'app/products/page.tsx']) {
    assert.match(read(path), /getCaptainMaidRuntime/)
  }
  assert.match(read('components/products/ProductsGrid.tsx'), /cmsText\(pageBindings/)
})

test('global header and footer are rendered from binding props', () => {
  const header = read('components/Header.tsx')
  const footer = read('components/Footer.tsx')
  assert.match(header, /bindings\?: CmsBindings/)
  assert.match(header, /global\.header\.nav/)
  assert.match(footer, /bindings\?: CmsBindings/)
  assert.match(footer, /global\.footer\./)
})
