import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const configPath = require.resolve('../next.config.js')
const originalCmsUrl = process.env.NEXT_PUBLIC_CMS_URL

function loadConfig(cmsUrl) {
  if (cmsUrl === undefined) delete process.env.NEXT_PUBLIC_CMS_URL
  else process.env.NEXT_PUBLIC_CMS_URL = cmsUrl

  delete require.cache[configPath]
  return require(configPath)
}

test.after(() => {
  if (originalCmsUrl === undefined) delete process.env.NEXT_PUBLIC_CMS_URL
  else process.env.NEXT_PUBLIC_CMS_URL = originalCmsUrl
  delete require.cache[configPath]
})

test('Next Image allowlists only the configured CMS host', () => {
  const config = loadConfig('https://cms.example.test:8443')
  assert.deepEqual(config.images.remotePatterns, [
    { protocol: 'https', hostname: 'cms.example.test', port: '8443', pathname: '/**' },
  ])
})

test('Next Image rejects malformed, credentialed, and non-HTTP CMS URLs', () => {
  for (const cmsUrl of ['not-a-url', 'ftp://cms.example.test', 'https://token@cms.example.test']) {
    const config = loadConfig(cmsUrl)
    assert.deepEqual(config.images.remotePatterns, [], cmsUrl)
  }
})
