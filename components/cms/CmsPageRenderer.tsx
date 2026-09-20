import Link from 'next/link'
import { CmsRichText } from './CmsRichText'

type CmsBlock = any

type Localized = string | { th?: string; en?: string } | null | undefined

function localized(value: Localized, locale: 'th' | 'en'): string {
  if (typeof value === 'string') return value
  return value?.[locale] || value?.[locale === 'th' ? 'en' : 'th'] || ''
}

function mediaUrl(value: unknown): string {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''
  const url = (value as { url?: unknown }).url
  return typeof url === 'string' ? url : ''
}

function mediaAlt(value: unknown, locale: 'th' | 'en'): string {
  if (!value || typeof value !== 'object') return ''
  const row = value as { alt?: Localized; filename?: string }
  return localized(row.alt, locale) || row.filename || ''
}

function blockType(block: CmsBlock): string {
  return String(block.blockType || block.type || '')
}

function Block({ block, locale }: { block: CmsBlock; locale: 'th' | 'en' }): React.ReactNode {
  const type = blockType(block)
  const title = localized(block.title as Localized, locale)
  const body = block.body ?? block.content
  const hasBody = body !== null && body !== undefined && body !== ''
  const image = block.image
  const imageSrc = mediaUrl(image)
  const imageAlt = mediaAlt(image, locale)

  if (type === 'hero') {
    return (
      <section className="relative overflow-hidden bg-captain-blue text-white">
        {imageSrc && <img src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover opacity-35" />}
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-captain-yellow">{localized(block.eyebrow as Localized, locale)}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-serif font-bold sm:text-6xl">{localized(block.headline as Localized, locale)}</h1>
          {hasBody && <div className="mt-6 max-w-2xl text-lg leading-8"><CmsRichText value={body} /></div>}
          {Boolean(block.ctaUrl) && <Link href={String(block.ctaUrl)} className="mt-8 inline-flex rounded-sm bg-captain-yellow px-6 py-3 font-semibold text-captain-text">{localized(block.ctaLabel as Localized, locale)}</Link>}
        </div>
      </section>
    )
  }

  if (type === 'featureSplit') {
    return (
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">
        <div className={block.imagePosition === 'left' ? 'lg:order-2' : ''}>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-captain-blue">{localized(block.eyebrow as Localized, locale)}</p>
          <CmsRichText value={body} />
          <div className="mt-6 flex flex-wrap gap-3">{Array.isArray(block.links) && block.links.map((link: any, index: number) => <Link key={link?.id || index} href={String(link?.url || '#')} className="rounded-sm bg-captain-yellow px-5 py-3 font-semibold text-captain-text">{localized(link?.label, locale)}</Link>)}</div>
        </div>
        {imageSrc && <img src={imageSrc} alt={imageAlt} className="aspect-[4/3] w-full rounded-sm object-cover" />}
      </section>
    )
  }

  if (type === 'valueProps' || type === 'trustStats') {
    const items = Array.isArray(block.items) ? block.items : []
    return <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">{items.map((item: any, index: number) => <article key={item?.id || index} className="rounded-sm bg-captain-light p-6"><p className="text-2xl font-bold text-captain-blue">{item?.value}</p><h2 className="mt-2 text-lg font-semibold text-captain-text">{localized(item?.title || item?.label, locale)}</h2><p className="mt-2 text-captain-neutral">{localized(item?.body, locale)}</p></article>)}</section>
  }

  if (type === 'richTextSection') {
    return <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8"><h2 className="mb-5 text-3xl font-serif font-bold text-captain-blue">{title}</h2><CmsRichText value={body} /></section>
  }

  if (type === 'ctaBanner' || type === 'newsletterSignup') {
    return <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8"><div className="rounded-sm bg-captain-blue px-8 py-12 text-center text-white"><h2 className="text-3xl font-serif font-bold">{title || localized(block.headline as Localized, locale)}</h2><p className="mx-auto mt-4 max-w-2xl text-white/80">{localized(block.body as Localized, locale)}</p>{Boolean(block.ctaUrl) && <Link href={String(block.ctaUrl)} className="mt-7 inline-flex rounded-sm bg-captain-yellow px-5 py-3 font-semibold text-captain-text">{localized(block.ctaLabel as Localized, locale)}</Link>}</div></section>
  }

  if (type === 'categoryCards' || type === 'brandGrid' || type === 'solutionGrid' || type === 'newsFeed' || type === 'testimonialCarousel') {
    const items = Array.isArray(block.items) ? block.items : []
    return <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">{items.map((item: any, index: number) => { const name = localized(item?.name || item?.title || item?.quote, locale); const href = item?.slug ? `/products/${item.slug}` : undefined; return <article key={item?.id || index} className="rounded-sm border border-captain-light bg-white p-6"><h2 className="text-xl font-serif font-bold text-captain-blue">{name || `Item ${index + 1}`}</h2>{item?.description && <p className="mt-3 text-captain-neutral">{localized(item.description, locale)}</p>}{href && <Link href={href} className="mt-5 inline-block font-semibold text-captain-blue">{locale === 'th' ? 'ดูรายละเอียด →' : 'View details →'}</Link>}</article> })}</section>
  }

  return null
}

export function CmsPageRenderer({ blocks, locale }: { blocks: any[]; locale: 'th' | 'en' }) {
  return <main className="min-h-screen bg-captain-cream dark:bg-captain-cream-dark">{blocks.map((block, index) => <Block key={block.id || index} block={block} locale={locale} />)}</main>
}
