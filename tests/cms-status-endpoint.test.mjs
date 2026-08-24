import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const read = (path) => fs.readFileSync(path, 'utf8')

test('CMS status endpoint probes live Captain Maid products without exposing secrets or env-only gating', () => {
  const route = read('app/api/cms/status/route.ts')
  assert.match(route, /cmsClient\.getProducts/)
  assert.match(route, /source:\s*['"]cms['"]/)
  assert.match(route, /site:\s*['"]captain-maid['"]/)
  assert.match(route, /productCount/)
  assert.match(route, /slugs/)
  assert.doesNotMatch(route, /NEXT_PUBLIC_CMS_URL/)
  assert.doesNotMatch(route, /CMS_READ_TOKEN/)
  assert.doesNotMatch(route, /REVALIDATE_SECRET/)
})
