import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(path, 'utf8')

test('Captain Maid public article reads remain canonical and published-only', () => {
  const client = read('lib/cms/client.ts')
  assert.match(client, /site:\s*\{\s*equals:\s*this\.siteSlug\s*\}/)
  assert.match(client, /postType:\s*\{\s*equals:\s*["']article["']\s*\}/)
  assert.ok((client.match(/_status:\s*\{\s*equals:\s*["']published["']\s*\}/g) || []).length >= 2)
})

test('blog adapter maps structured articleLayout as well as legacy body', () => {
  const blog = read('lib/cms/blog.ts')
  assert.match(blog, /articleLayout/)
  assert.match(blog, /mapArticleLayout\(raw\.articleLayout\)/)
  assert.match(blog, /raw\.body\s*\?\?\s*null/)
})

test('structured article renderer supports all canonical blocks and legacy fallback safely', () => {
  assert.ok(existsSync('lib/cms/article-layout.ts'), 'article-layout adapter must exist')
  assert.ok(existsSync('components/cms/ArticleBody.tsx'), 'ArticleBody renderer must exist')
  const adapter = read('lib/cms/article-layout.ts')
  const body = read('components/cms/ArticleBody.tsx')
  for (const blockType of [
    'articleText',
    'articleHeading',
    'articleImage',
    'articleGallery',
    'articleQuote',
    'articleVideo',
    'articleCta',
    'articleRelatedProducts',
  ]) {
    assert.match(adapter, new RegExp(blockType))
    assert.match(body, new RegExp(blockType))
  }
  assert.match(body, /articleLayout\.length\s*>\s*0/)
  assert.match(body, /<CmsRichText[^>]+value=\{body\}/)
  assert.doesNotMatch(body, /dangerouslySetInnerHTML/)
})

test('blog detail delegates content rendering to ArticleBody', () => {
  const page = read('app/blog/[slug]/page.tsx')
  assert.match(page, /ArticleBody/)
  assert.match(page, /articleLayout=\{post\.articleLayout\}/)
  assert.match(page, /body=\{post\.content\}/)
  assert.doesNotMatch(page, /<CmsRichText\s+value=\{post\.content\}/)
})
