import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(path, 'utf8')

test('homepage fetches canonical CMS posts at the server boundary', () => {
  const page = read('app/page.tsx')
  assert.match(page, /getBlogPosts/)
  assert.match(page, /getBlogPosts\(locale\)/)
  assert.match(page, /posts\.slice\(0,\s*3\)/)
  assert.match(page, /<BlogTestimonial[^>]+posts=\{[^}]+\}[^>]+locale=\{locale\}/s)
})

test('homepage blog cards are presentation-only canonical CMS records', () => {
  const component = read('components/home/BlogTestimonial.tsx')
  assert.doesNotMatch(component, /@\/lib\/blog/)
  assert.doesNotMatch(component, /getAllBlogPosts/)
  assert.match(component, /posts:\s*BlogPost\[\]/)
  assert.match(component, /locale:\s*['"]th['"]\s*\|\s*['"]en['"]/)
  assert.match(component, /href=\{`\/\$\{locale\}\/blog\/\$\{post\.slug\}`\}/)
  assert.match(component, /post\.heroImage/)
  assert.match(component, /post\.title/)
  assert.match(component, /post\.publishedAt/)
  assert.doesNotMatch(component, /\/images\/blog-\$\{/)
})

test('empty homepage CMS feed does not revive static blog records', () => {
  const component = read('components/home/BlogTestimonial.tsx')
  assert.doesNotMatch(component, /blogPosts\s*=\s*getAllBlogPosts/)
  assert.doesNotMatch(component, /blogPosts\.slice/)
  assert.match(component, /posts\.map/)
})

test('sitemap emits canonical published CMS blog URLs for both locales without static dataset', () => {
  const sitemap = read('app/sitemap.ts')
  assert.match(sitemap, /getBlogPosts/)
  assert.doesNotMatch(sitemap, /@\/lib\/blog/)
  assert.match(sitemap, /LOCALES\.map\(async\s*\(locale\)/)
  assert.match(sitemap, /getBlogPosts\(locale\)/)
  assert.match(sitemap, /`\$\{siteUrl\}\/\$\{locale\}\/blog\/\$\{post\.slug\}`/)
  assert.match(sitemap, /new Set/)
})
