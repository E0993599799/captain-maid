import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const publicPages = [
  'app/page.tsx',
  'app/about/page.tsx',
  'app/blog/page.tsx',
  'app/products/page.tsx',
  'app/contact/page.tsx',
  'app/faq/page.tsx',
]

test('Captain Maid marketing routes remain public', () => {
  for (const page of publicPages) assert.equal(fs.existsSync(page), true, `Missing public page: ${page}`)
  assert.equal(fs.existsSync('middleware.ts'), false, 'Global auth middleware must not protect Captain Maid marketing routes')
  assert.equal(fs.existsSync('middleware.js'), false, 'Global auth middleware must not protect Captain Maid marketing routes')
})

test('Captain Maid management stays in CMS ARIGEO instead of creating a second login surface', () => {
  const env = fs.readFileSync('.env.example', 'utf8')
  const contract = fs.readFileSync('docs/ARIGEO_IDENTITY_BOUNDARY.md', 'utf8')
  assert.match(env, /CMS_SITE_SLUG=captain-maid/)
  assert.match(contract, /auth\.arigeo\.com/)
  assert.match(contract, /cms\.arigeo\.com/)
  assert.match(contract, /OIDC sub/)
  assert.match(contract, /No Captain Maid local password/i)
})
