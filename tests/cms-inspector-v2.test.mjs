import fs from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const bridge = fs.readFileSync('components/cms/CmsInspectorBridge.tsx', 'utf8')

test('Captain Maid bridge advertises protocol v2 and handles state-aware safe previews', () => {
  assert.match(bridge, /INSPECTOR_PROTOCOL_VERSION\s*=\s*2/)
  assert.match(bridge, /protocolVersion\s*:\s*INSPECTOR_PROTOCOL_VERSION/)
  assert.match(bridge, /cms-inspector:preview-element-style/)
  assert.match(bridge, /message\.state/)
  assert.match(bridge, /focus-visible/)
  assert.match(bridge, /event\.origin\s*!==\s*CMS_PARENT_ORIGIN/)
  assert.match(bridge, /event\.source\s*!==\s*window\.parent/)
  assert.match(bridge, /message\.token\s*!==\s*context\.token/)
  assert.doesNotMatch(bridge, /cssText|eval\(|new Function/)
})
