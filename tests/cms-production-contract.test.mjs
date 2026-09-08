import fs from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => fs.readFileSync(path, 'utf8')

test('Captain Maid has a canonical CMS URL fallback and never requires a read token for public products', () => {
  const source = read('lib/cms.ts')
  assert.match(source, /https:\/\/cms\.arigeo\.com/)
  assert.doesNotMatch(source, /CMS_READ_TOKEN/)
})

test('Captain product queries resolve Captain Maid from the public brand list then scope products by relationship id', () => {
  const source = read('lib/cms.ts')
  assert.match(source, /\/api\/brands/)
  assert.match(source, /Captain Maid/i)
  assert.match(source, /brand/)
})

test('product list and detail only request approved content', () => {
  const source = read('lib/cms.ts')
  assert.doesNotMatch(source, /draft=true/)
  assert.doesNotMatch(source, /overrideAccess/)
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
  assert.match(bridge, /URLSearchParams\(window\.location\.search\).*cmsInspector/s)
  assert.match(bridge, /cmsInspector['"]\)\s*!==\s*['"]1['"]/)
  assert.match(bridge, /event\.origin\s*!==\s*CMS_PARENT_ORIGIN/)
  assert.match(bridge, /event\.source\s*!==\s*window\.parent/)
  assert.match(bridge, /message\.type\s*===\s*['"]cms-inspector:init['"]/)
  assert.match(bridge, /protocolVersion\s*:\s*INSPECTOR_PROTOCOL_VERSION/)
  assert.match(bridge, /message\.token\s*!==\s*context\.token/)
  assert.match(layout, /import CmsInspectorBridge from ['"]@\/components\/cms\/CmsInspectorBridge['"]/)
  assert.match(layout, /<CmsInspectorBridge\s*\/>/)
})
