import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const read = (path) => fs.readFileSync(path, 'utf8')

test('Captain products use CMS whenever CMS URL is configured and do not require a read token', () => {
  const source = read('lib/cms/captain-products.ts')
  assert.match(source, /if \(!process\.env\.NEXT_PUBLIC_CMS_URL\) return PRODUCTS/)
  assert.doesNotMatch(source, /!process\.env\.NEXT_PUBLIC_CMS_URL \|\| !process\.env\.CMS_READ_TOKEN/)
})

test('Captain product queries resolve the Captain Maid brand and scope the relationship by its id', () => {
  const source = read('lib/cms/client.ts')
  assert.match(source, /getBrandId\(this\.siteSlug/)
  assert.match(source, /brand:\s*\{\s*equals:\s*brandId\s*\}/)
})

test('product list and detail only request approved content', () => {
  const source = read('lib/cms/client.ts')
  const matches = source.match(/contentStatus:\s*\{\s*equals:\s*["']approved["']\s*\}/g) || []
  assert.ok(matches.length >= 2, 'expected approved filter in list and detail queries')
})

test('signed revalidation invalidates the products cache tag and products route', () => {
  const source = read('app/api/revalidate/route.ts')
  assert.match(source, /revalidateTag\(["']products["']\)/)
  assert.match(source, /revalidatePath\(route\)/)
  assert.match(source, /REVALIDATE_SECRET/)
})
