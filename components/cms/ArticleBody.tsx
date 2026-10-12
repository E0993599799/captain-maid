import type { ReactNode } from 'react'

import { CmsRichText } from './CmsRichText'
import type { CmsArticleBlock } from '@/lib/cms/article-layout'

function safeHref(value: string): string {
  const href = value.trim()
  return /^(https?:\/\/|\/)/.test(href) ? href : '#'
}

function videoEmbedUrl(value: string): string {
  try {
    const url = new URL(value)
    if (url.hostname === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : ''
    }
    if (url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com') {
      const id = url.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : ''
    }
    if (url.hostname === 'vimeo.com' || url.hostname === 'www.vimeo.com') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : ''
    }
  } catch {
    return ''
  }
  return ''
}

function renderBlock(block: CmsArticleBlock, index: number): ReactNode {
  const key = block.id || `${block.blockType}-${index}`

  switch (block.blockType) {
    case 'articleText':
      return <CmsRichText key={key} value={block.content} />
    case 'articleHeading': {
      const className = 'mt-xl mb-md font-serif font-bold text-captain-text'
      if (block.level === 'h4') return <h4 key={key} className={`text-xl ${className}`}>{block.text}</h4>
      if (block.level === 'h3') return <h3 key={key} className={`text-2xl ${className}`}>{block.text}</h3>
      return <h2 key={key} className={`text-3xl ${className}`}>{block.text}</h2>
    }
    case 'articleImage':
      if (!block.image) return null
      return (
        <figure key={key} className="my-xl">
          <img src={block.image.url} alt={block.alt || block.image.alt} className="block h-auto w-full rounded-sm" />
          {block.caption ? <figcaption className="mt-sm text-sm text-captain-neutral">{block.caption}</figcaption> : null}
        </figure>
      )
    case 'articleGallery':
      return (
        <section key={key} className="my-xl grid grid-cols-1 gap-md sm:grid-cols-2" aria-label="Article gallery">
          {block.items.map((item, itemIndex) => item.image ? (
            <figure key={item.id || `${key}-${itemIndex}`}>
              <img src={item.image.url} alt={item.alt || item.image.alt} className="block h-auto w-full rounded-sm" />
              {item.caption ? <figcaption className="mt-sm text-sm text-captain-neutral">{item.caption}</figcaption> : null}
            </figure>
          ) : null)}
        </section>
      )
    case 'articleQuote':
      return (
        <blockquote key={key} className="my-xl border-l-4 border-captain-yellow pl-lg text-xl italic text-captain-text">
          <p>{block.quote}</p>
          {block.attribution ? <footer className="mt-sm text-sm not-italic text-captain-neutral">— {block.attribution}</footer> : null}
        </blockquote>
      )
    case 'articleVideo': {
      const embed = videoEmbedUrl(block.url)
      const href = safeHref(block.url)
      return (
        <figure key={key} className="my-xl">
          {embed ? (
            <iframe
              src={embed}
              title={block.title || 'Article video'}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full border-0"
            />
          ) : href !== '#' ? (
            <video controls src={href} className="h-auto w-full" />
          ) : null}
          {block.caption ? <figcaption className="mt-sm text-sm text-captain-neutral">{block.caption}</figcaption> : null}
        </figure>
      )
    }
    case 'articleCta': {
      const href = safeHref(block.url)
      return (
        <aside key={key} className="my-xl rounded-sm bg-captain-light p-lg">
          {block.title ? <h3 className="text-2xl font-serif font-bold text-captain-text">{block.title}</h3> : null}
          {block.body ? <p className="mt-sm text-captain-neutral">{block.body}</p> : null}
          {block.label && href !== '#' ? <a href={href} className="mt-md inline-flex font-semibold text-captain-blue underline-offset-4 hover:underline">{block.label}</a> : null}
        </aside>
      )
    }
    case 'articleRelatedProducts':
      if (block.products.length === 0) return null
      return (
        <section key={key} className="my-xl">
          <h2 className="mb-md text-2xl font-serif font-bold text-captain-text">{block.title || 'Related products'}</h2>
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
            {block.products.map((product) => (
              <a key={product.id} href={`/products/${encodeURIComponent(product.slug)}`} className="rounded-sm border border-captain-light p-md font-semibold text-captain-blue hover:underline">
                {product.name}
              </a>
            ))}
          </div>
        </section>
      )
  }
}

export function ArticleBody({ articleLayout, body }: { articleLayout: CmsArticleBlock[]; body: unknown }) {
  if (articleLayout.length > 0) {
    return <div className="text-lg leading-relaxed text-captain-neutral">{articleLayout.map(renderBlock)}</div>
  }
  return <CmsRichText value={body} />
}
