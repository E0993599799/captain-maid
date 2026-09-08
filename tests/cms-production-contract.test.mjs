import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const read = (path) => fs.readFileSync(path, 'utf8')

test('Captain Maid has a canonical CMS URL fallback and never requires a read token for public products', () => {
  const client = read('lib/cms/client.ts')
  const products = read('lib/cms/captain-products.ts')
  assert.match(client, /process\.env\.NEXT_PUBLIC_CMS_URL \|\| ["']https:\/\/cms\.arigeo\.com["']/)
  assert.doesNotMatch(products, /if \(!process\.env\.NEXT_PUBLIC_CMS_URL\)/)
  assert.doesNotMatch(products, /CMS_READ_TOKEN/)
})

test('Captain product queries resolve Captain Maid from the public brand list then scope products by relationship id', () => {
  const source = read('lib/cms/client.ts')
  assert.match(source, /getBrandId\(this\.siteSlug/)
  assert.match(source, /\.find\(\(brand\) => brand\.slug === slug\)/)
  assert.match(source, /brand:\s*\{\s*equals:\s*brandId\s*\}/)
  assert.doesNotMatch(source, /where:\s*\{\s*slug:\s*\{\s*equals:\s*slug/)
})

test('product list and detail only request approved content', () => {
  const source = read('lib/cms/client.ts')
  const matches = source.match(/contentStatus:\s*\{\s*equals:\s*["']approved["']\s*\}/g) || []
  assert.ok(matches.length >= 2, 'expected approved filter in list and detail queries')
})

test('signed revalidation invalidates the products cache tag and products route', () => {
  const source = read('app/api/revalidate/route.ts')
  assert.match(source, /revalidateTag\(["']products["'],\s*["']max["']\)/)
  assert.match(source, /revalidatePath\(route\)/)
  assert.match(source, /REVALIDATE_SECRET/)
})

test('root layout mounts the token-bound CMS inspector bridge for inspector mode', () => {
  const bridge = read('components/cms/CmsInspectorBridge.tsx')
  const layout = read('app/layout.tsx')
  assert.match(bridge, /const CMS_PARENT_ORIGIN = ['"]https:\/\/cms\.arigeo\.com['"]/)
  assert.match(bridge, /params\.get\(['"]cmsInspector['"]\) !== ['"]1['"]/) 
  assert.match(bridge, /event\.origin !== CMS_PARENT_ORIGIN \|\| event\.source !== window\.parent/)
  assert.match(bridge, /message\.type === ['"]cms-inspector:init['"]/)
  assert.match(bridge, /post\(\{ type: ['"]cms-inspector:ready['"] \}\)/)
  assert.match(bridge, /message\.token !== context\.token/)
  assert.match(layout, /import CmsInspectorBridge from ['"]@\/components\/cms\/CmsInspectorBridge['"]/)
  assert.match(layout, /<CmsInspectorBridge\s*\/>/)
})
