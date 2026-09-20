import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = (file) => fs.readFileSync(file, 'utf8')
const client = read('lib/cms/client.ts')
const adapter = read('lib/cms/blog.ts')
const list = read('app/blog/page.tsx')
const detail = read('app/blog/[slug]/page.tsx')

test('Payload article queries scope site, type, publication, locale, and slug', () => {
  assert.match(client, /site:\s*\{ equals: this\.siteSlug \}/)
  assert.match(client, /postType:\s*\{ equals: "article" \}/)
  assert.match(client, /_status:\s*\{ equals: "published" \}/)
  assert.match(client, /fallbackLocale:\s*"en"/)
  assert.match(client, /slug:\s*\{ equals: slug \}/)
  assert.match(client, /limit:\s*1/)
  assert.match(adapter, /getArticles\(\{ locale, limit: 100 \}\)/)
  assert.match(adapter, /getArticle\(slug, locale\)/)
})

test('article adapter preserves localized fields, SEO, date, rich body, and media URL', () => {
  for (const field of ['title', 'excerpt', 'publishedAt', 'content']) assert.match(adapter, new RegExp(`raw\\.${field}`))
  assert.match(adapter, /raw\.seo\.title/)
  assert.match(adapter, /raw\.seo\.description/)
  assert.match(adapter, /heroImage: media\(raw\.heroImage\)/)
  assert.match(adapter, /value\.url !== 'string'/)
  assert.match(adapter, /locale === 'th' \? 'en' : 'th'/)
})

test('missing and malformed documents are safely omitted', () => {
  assert.match(adapter, /if \(!id \|\| !slug \|\| !title\) return null/)
  assert.match(adapter, /filter\(\(post\): post is BlogPost => Boolean\(post\)\)/)
  assert.match(adapter, /response\.docs\?\.\[0\] \? mapCmsBlogPost\(response\.docs\[0\], locale\) : null/)
})

test('public list and detail render CMS data rather than hard-coded articles', () => {
  assert.match(list, /getBlogPosts\('th'\)/)
  assert.match(detail, /getBlogPost\(slug, 'th'\)/)
  assert.match(list, /post\.slug/)
  assert.match(detail, /post\.content/)
  assert.doesNotMatch(list, /const blogArticles\s*=/)
  assert.doesNotMatch(detail, /const blogDatabase\s*=/)
})
