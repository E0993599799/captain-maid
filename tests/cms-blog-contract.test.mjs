import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

test('Captain Maid blog listing and detail use the canonical Payload posts collection', () => {
  const listing = read('app/blog/page.tsx')
  const detail = read('app/blog/[slug]/page.tsx')
  const client = read('lib/cms/client.ts')
  assert.match(listing, /getBlogPosts\('th'\)/)
  assert.match(detail, /getBlogPost\(slug, 'th'\)/)
  assert.match(client, /restGet\("posts"/)
  assert.match(client, /postType: \{ equals: "article" \}/)
  assert.match(client, /_status: \{ equals: "published" \}/)
  assert.match(client, /sort: "-publishedDate"/)
  assert.doesNotMatch(listing, /const blogArticles\s*=/)
  assert.doesNotMatch(detail, /const blogDatabase\s*=/)
})

test('blog adapter rejects malformed CMS records and preserves rich body/media', () => {
  const adapter = read('lib/cms/blog.ts')
  assert.match(adapter, /if \(!id \|\| !slug \|\| !title\) return null/)
  assert.match(adapter, /content: raw\.body \?\? null/)
  assert.match(adapter, /heroImage: media\(raw\.coverImage\)/)
  assert.match(adapter, /raw\.publishedDate/)
  assert.match(adapter, /raw\.newsCategory/)
  assert.match(adapter, /raw\.seo\.metaTitle/)
  assert.match(adapter, /raw\.seo\.metaDescription/)
})
