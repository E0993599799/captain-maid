import assert from 'node:assert/strict'
import test from 'node:test'

import { getCmsPageLayout, resolvePageLayout, type CmsPageClient } from './pages'
import type { CMSPage, CmsSection } from '../../types/cms'

const block = (id: string) => ({ id, type: 'hero', data: {} })
const page: CMSPage = { id: 'page-1', slug: 'home', title: {}, description: {}, layout: [block('legacy')], status: 'published', createdAt: '', updatedAt: '' }

function section(id: string, order: number, contentId: string, overrides: Partial<CmsSection> = {}): CmsSection {
  return { id, site: 'captain-maid', pageSlug: 'home', order, active: true, _status: 'published', content: [block(contentId)], ...overrides }
}

test('published sections override legacy layout in deterministic order', () => {
  const layout = resolvePageLayout(page, [section('b', 2, 'second'), section('a', 1, 'first')], [block('static')])
  assert.deepEqual(layout.map((item) => item.id), ['first', 'second'])
})

test('empty, inactive, and draft sections use Pages.layout', () => {
  const layout = resolvePageLayout(page, [section('inactive', 1, 'no', { active: false }), section('draft', 2, 'no', { _status: 'draft' })], [block('static')])
  assert.deepEqual(layout.map((item) => item.id), ['legacy'])
})

test('CMS failure uses the static fallback', async () => {
  const client: CmsPageClient = {
    getPage: async () => { throw new Error('CMS unavailable') },
    getSections: async () => ({ docs: [] }),
  }
  assert.deepEqual(await getCmsPageLayout('home', 'en', [block('static')], client), [block('static')])
})

test('locale is forwarded to section loading', async () => {
  let requestedLocale = ''
  const client: CmsPageClient = {
    getPage: async () => ({ docs: [page] }),
    getSections: async (_slug, locale) => { requestedLocale = locale; return { docs: [section('one', 1, 'cms')] } },
  }
  await getCmsPageLayout('home', 'th', [block('static')], client)
  assert.equal(requestedLocale, 'th')
})
