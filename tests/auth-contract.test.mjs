import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = (path) => fs.readFileSync(path, 'utf8')
const exists = (path) => fs.existsSync(path)

const publicRoutes = ['/', '/about', '/blog', '/products', '/contact', '/faq']

test('public Captain Maid routes are not globally protected by central auth', () => {
  const middleware = exists('middleware.ts') ? read('middleware.ts') : exists('middleware.js') ? read('middleware.js') : ''
  for (const route of publicRoutes) {
    assert.doesNotMatch(middleware, new RegExp(`requireCaptainAccess\\([^)]*${route.replace('/', '\\/')}`))
  }
  assert.doesNotMatch(middleware, /requireCaptainAccess/)
})

test('management routes require the Captain Maid access boundary', () => {
  assert.equal(exists('app/(management)/layout.tsx'), true, 'protected management layout must exist')
  assert.equal(exists('app/(management)/management/page.tsx'), true, 'default protected /management route must exist')
  const layout = read('app/(management)/layout.tsx')
  assert.match(layout, /requireCaptainAccess/)
  assert.match(layout, /await\s+requireCaptainAccess\s*\(/)
})

test('authenticated users without Captain Maid entitlement receive explicit HTTP 403', () => {
  const accessDeniedRoute = 'app/api/auth/access-denied/route.ts'
  assert.equal(exists(accessDeniedRoute), true, 'explicit access-denied route must exist')
  const access = read('lib/auth/require-access.ts')
  const denied = read(accessDeniedRoute)
  assert.doesNotMatch(access, /throw\s+new\s+Error\s*\(\s*`ACCESS_NOT_GRANTED/)
  assert.match(access, /access-denied/)
  assert.match(denied, /ACCESS_NOT_GRANTED/)
  assert.match(denied, /status:\s*403/)
})

test('central auth adapter enforces OIDC PKCE identity and host-local session contract', () => {
  for (const path of [
    'lib/auth/config.ts',
    'lib/auth/session.ts',
    'lib/auth/require-access.ts',
    'lib/auth/oidc.ts',
    'app/api/auth/login/route.ts',
    'app/api/auth/callback/route.ts',
    'app/api/auth/logout/route.ts',
  ]) assert.equal(exists(path), true, `${path} must exist`)

  const config = read('lib/auth/config.ts')
  const session = read('lib/auth/session.ts')
  const access = read('lib/auth/require-access.ts')
  const oidc = read('lib/auth/oidc.ts')
  const login = read('app/api/auth/login/route.ts')
  const callback = read('app/api/auth/callback/route.ts')

  assert.match(config, /auth\.arigeo\.com/)
  assert.match(login, /code_challenge_method/)
  assert.match(login, /S256/)
  assert.match(login, /state/)
  assert.match(login, /nonce/)
  assert.match(oidc, /issuer/)
  assert.match(oidc, /audience/)
  assert.match(oidc, /nonce/)
  assert.match(oidc, /sub/)
  assert.match(callback, /verifyIdToken/)
  assert.match(session, /httpOnly:\s*true/)
  assert.match(session, /sameSite:\s*['\"]lax['\"]/i)
  assert.doesNotMatch(session, /domain\s*:/i)
  assert.match(access, /APP_ACCESS_NOT_GRANTED|ACCESS_NOT_GRANTED/)
})
