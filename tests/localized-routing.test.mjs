import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const middleware = fs.readFileSync('middleware.ts', 'utf8')

test('locale-prefixed legacy pages rewrite to their existing app routes while preserving the public URL', () => {
  assert.match(middleware, /LOCALIZED_LEGACY_ROOTS/)
  assert.match(middleware, /new Set\(\['about', 'blog', 'faq', 'contact'\]\)/)
  assert.match(middleware, /NextResponse\.rewrite/)
  assert.match(middleware, /internalUrl\.pathname = `\/\$\{parts\.slice\(1\)\.join\('\/'\)\}`/)
  assert.match(middleware, /x-captain-maid-locale/)
})
