import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8')

test('Captain Maid permits framing only from the ARIGEO CMS', () => {
  const config = read('next.config.js')
  assert.doesNotMatch(config, /X-Frame-Options[\s\S]*SAMEORIGIN/)
  assert.match(config, /Content-Security-Policy/)
  assert.match(config, /frame-ancestors 'self' https:\/\/cms\.arigeo\.com/)
})

test('root layout mounts the CMS inspector bridge', () => {
  const layout = read('app/layout.tsx')
  assert.match(layout, /CmsInspectorBridge/)
  assert.match(layout, /<CmsInspectorBridge\s*\/?>/)
})

test('bridge implements the secure Captain Maid inspector protocol', () => {
  const bridge = read('components/cms/CmsInspectorBridge.tsx')
  assert.match(bridge, /CMS_PARENT_ORIGIN\s*=\s*['"]https:\/\/cms\.arigeo\.com['"]/)
  assert.match(bridge, /message\.site !== ['"]captain-maid['"]/)
  assert.match(bridge, /cms-inspector:element-context/)
  assert.match(bridge, /cms-inspector:preview-element-style/)
  assert.match(bridge, /cms-inspector:preview-element-content/)
  assert.match(bridge, /cms-inspector:preview-element-attribute/)
  assert.doesNotMatch(bridge, /postMessage\([^,]+,\s*['"]\*['"]/)
})
