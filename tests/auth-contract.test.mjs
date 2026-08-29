import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = (path) => fs.readFileSync(path, 'utf8')
const exists = (path) => fs.existsSync(path)

const forbidden = [
  'app/(management)/layout.tsx',
  'app/(management)/management/page.tsx',
  'app/api/auth/access-denied/route.ts',
  'app/api/auth/callback/route.ts',
  'app/api/auth/login/route.ts',
  'app/api/auth/logout/route.ts',
  'lib/auth/config.ts',
  'lib/auth/crypto.ts',
  'lib/auth/oidc.ts',
  'lib/auth/require-access.ts',
  'lib/auth/session.ts',
]

test('Captain Maid owns no local authentication runtime', () => {
  for (const path of forbidden) assert.equal(exists(path), false, `${path} must not exist`)
})

test('header exposes public My ARIGEO handoff for both navigation modes', () => {
  const header = read('components/Header.tsx')
  assert.match(header, /https:\/\/auth\.arigeo\.com/)
  assert.match(header, /Login \/ My ARIGEO/)
  assert.match(header, /เข้าสู่ระบบ \/ My ARIGEO/)
  assert.ok((header.match(/https:\/\/auth\.arigeo\.com/g) || []).length >= 2)
})

test('Captain Maid header does not implement an OIDC or session flow', () => {
  const header = read('components/Header.tsx')
  assert.doesNotMatch(header, /OIDC_|code_challenge|CAPTAIN_SESSION_SECRET|ARIGEO_ACCESS_API_KEY|\/api\/auth\//)
})
