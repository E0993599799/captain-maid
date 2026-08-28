import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const helper = fs.readFileSync('lib/cms-inspector.ts', 'utf8')
const bridge = fs.readFileSync('components/cms/InspectorBridge.tsx', 'utf8')
const layout = fs.readFileSync('app/layout.tsx', 'utf8')

test('inspector is opt-in and production browsing remains isolated', () => {
  assert.match(helper, /get\('cmsInspector'\) === '1'/)
  assert.match(bridge, /isInspectorRequested\(window\.location\.search\)/)
  assert.match(bridge, /window\.parent === window/)
})

test('bridge accepts only trusted CMS origins and token-bound messages', () => {
  assert.match(helper, /https:\/\/cms\.arigeo\.com/)
  assert.match(helper, /cms-arigeo-/)
  assert.match(bridge, /event\.origin !== parentOrigin/)
  assert.match(bridge, /event\.data\.token !== token/)
})

test('root layout installs bridge once without changing normal page content contract', () => {
  assert.match(layout, /InspectorBridge/)
  assert.match(layout, /<InspectorBridge\s*\/>/)
})
