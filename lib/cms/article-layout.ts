type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function idOf(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  if (!isRecord(value)) return ''
  return value.id == null ? '' : String(value.id)
}

export type CmsArticleMedia = {
  id: string
  url: string
  alt: string
}

export type CmsArticleProduct = {
  id: string
  slug: string
  name: string
}

export type CmsArticleGalleryItem = {
  id: string
  image: CmsArticleMedia | null
  alt: string
  caption: string
}

export type CmsArticleBlock =
  | { id: string; blockType: 'articleText'; content: unknown }
  | { id: string; blockType: 'articleHeading'; text: string; level: 'h2' | 'h3' | 'h4' }
  | { id: string; blockType: 'articleImage'; image: CmsArticleMedia | null; alt: string; caption: string }
  | { id: string; blockType: 'articleGallery'; items: CmsArticleGalleryItem[] }
  | { id: string; blockType: 'articleQuote'; quote: string; attribution: string }
  | { id: string; blockType: 'articleVideo'; url: string; title: string; caption: string }
  | { id: string; blockType: 'articleCta'; title: string; body: string; label: string; url: string }
  | { id: string; blockType: 'articleRelatedProducts'; title: string; products: CmsArticleProduct[] }

function media(value: unknown): CmsArticleMedia | null {
  if (!isRecord(value)) return null
  const url = text(value.url)
  if (!url) return null
  return {
    id: idOf(value),
    url,
    alt: text(value.alt) || text(value.filename),
  }
}

function product(value: unknown): CmsArticleProduct | null {
  if (!isRecord(value)) return null
  const id = idOf(value)
  const slug = text(value.slug)
  if (!id || !slug) return null
  return { id, slug, name: text(value.name) || slug }
}

export function mapArticleLayout(value: unknown): CmsArticleBlock[] {
  if (!Array.isArray(value)) return []

  const blocks: CmsArticleBlock[] = []
  for (const entry of value) {
    if (!isRecord(entry)) continue
    const blockType = text(entry.blockType)
    const id = idOf(entry)

    switch (blockType) {
      case 'articleText':
        blocks.push({ id, blockType, content: entry.content ?? null })
        break
      case 'articleHeading': {
        const level = entry.level === 'h3' || entry.level === 'h4' ? entry.level : 'h2'
        blocks.push({ id, blockType, text: text(entry.text), level })
        break
      }
      case 'articleImage':
        blocks.push({ id, blockType, image: media(entry.image), alt: text(entry.alt), caption: text(entry.caption) })
        break
      case 'articleGallery': {
        const items = Array.isArray(entry.items)
          ? entry.items.filter(isRecord).map((item) => ({
              id: idOf(item),
              image: media(item.image),
              alt: text(item.alt),
              caption: text(item.caption),
            }))
          : []
        blocks.push({ id, blockType, items })
        break
      }
      case 'articleQuote':
        blocks.push({ id, blockType, quote: text(entry.quote), attribution: text(entry.attribution) })
        break
      case 'articleVideo':
        blocks.push({ id, blockType, url: text(entry.url), title: text(entry.title), caption: text(entry.caption) })
        break
      case 'articleCta':
        blocks.push({ id, blockType, title: text(entry.title), body: text(entry.body), label: text(entry.label), url: text(entry.url) })
        break
      case 'articleRelatedProducts': {
        const products = Array.isArray(entry.products)
          ? entry.products.map(product).filter((item): item is CmsArticleProduct => Boolean(item))
          : []
        blocks.push({ id, blockType, title: text(entry.title), products })
        break
      }
      default:
        break
    }
  }

  return blocks
}
