'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.arigeo.com').replace(/\/$/, '')

type TextPatch = { tag: string; index: number; text: string }
type TextBinding = { type: 'text'; text: string }
type LinkBinding = { type: 'link'; text: string; href?: string }
type ImageBinding = {
  type: 'image'
  src: string
  alt?: string
  mobile?: string
  tablet?: string
  desktop?: string
}
type StableBinding = TextBinding | LinkBinding | ImageBinding

function normalizeRoute(pathname: string) {
  const parts = pathname.split('/').filter(Boolean)
  const locale = parts[0] === 'en' ? 'en' : 'th'
  const contentParts = parts[0] === 'en' || parts[0] === 'th' ? parts.slice(1) : parts
  const slug = contentParts.length ? contentParts.join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'home'
  return { locale, slug: slug.replace(/^-+|-+$/g, '') || 'home' }
}

function directTextNodes(element: Element): Text[] {
  return Array.from(element.childNodes).filter((node): node is Text => node.nodeType === Node.TEXT_NODE)
}

function setText(element: Element, value: string) {
  const target = element.querySelector('[data-cms-value]') || element
  const textNodes = directTextNodes(target)
  if (textNodes.length) {
    const current = textNodes.map((node) => node.nodeValue || '').join(' ').replace(/\s+/g, ' ').trim()
    if (current === value) return
    textNodes[0].nodeValue = value
    for (let i = 1; i < textNodes.length; i += 1) textNodes[i].nodeValue = ''
    return
  }
  if (!target.children.length && target.textContent !== value) target.textContent = value
}

function applyImage(element: Element, binding: ImageBinding) {
  const picture = element.tagName.toLowerCase() === 'picture' ? element : element.closest('picture')
  if (picture) {
    const sources = Array.from(picture.querySelectorAll('source'))
    for (const source of sources) {
      const media = source.getAttribute('media') || ''
      if (/max-width\s*:\s*767px/i.test(media) && binding.mobile) source.setAttribute('srcset', binding.mobile)
      if (/max-width\s*:\s*1023px/i.test(media) && binding.tablet) source.setAttribute('srcset', binding.tablet)
    }
    const image = picture.querySelector('img')
    if (image) {
      image.setAttribute('src', binding.desktop || binding.src)
      if (binding.alt !== undefined) image.setAttribute('alt', binding.alt)
    }
    return
  }

  if (element.tagName.toLowerCase() === 'img') {
    element.setAttribute('src', binding.src)
    if (binding.alt !== undefined) element.setAttribute('alt', binding.alt)
  }
}

function applyBinding(key: string, binding: StableBinding) {
  const selector = `[data-cms-key="${CSS.escape(key)}"]`
  document.querySelectorAll(selector).forEach((element) => {
    if (binding.type === 'image') {
      applyImage(element, binding)
      return
    }
    if (binding.type === 'link' && binding.href && element.tagName.toLowerCase() === 'a') {
      element.setAttribute('href', binding.href)
    }
    setText(element, binding.text)
  })
}

function applyLegacyTextPatch(patch: TextPatch) {
  const elements = document.querySelectorAll(patch.tag)
  const element = elements.item(patch.index)
  if (element) setText(element, patch.text)
}

async function fetchRuntime(slug: string, locale: string) {
  const response = await fetch(
    `${CMS_URL}/api/public/builder-v2/runtime/captain-maid/${encodeURIComponent(slug)}?locale=${locale}`,
    { headers: { accept: 'application/json' }, cache: 'no-store' },
  )
  if (!response.ok) return null
  return response.json() as Promise<{
    bindings?: Record<string, StableBinding>
    legacyTextPatches?: TextPatch[]
  }>
}

export default function CmsLiveTextRuntime() {
  const pathname = usePathname()

  useEffect(() => {
    let disposed = false
    let observer: MutationObserver | null = null
    const { locale, slug } = normalizeRoute(pathname || '/')

    const load = async () => {
      try {
        const [pageRuntime, homeRuntime] = await Promise.all([
          fetchRuntime(slug, locale),
          slug === 'home' ? Promise.resolve(null) : fetchRuntime('home', locale),
        ])
        if (disposed) return

        const pageBindings = pageRuntime?.bindings ?? {}
        const globalBindings = Object.fromEntries(
          Object.entries(homeRuntime?.bindings ?? {}).filter(([key]) => key.startsWith('global.')),
        )
        const bindings = { ...globalBindings, ...pageBindings }
        const legacy = Object.keys(bindings).length === 0 ? (pageRuntime?.legacyTextPatches ?? []) : []

        if (!Object.keys(bindings).length && !legacy.length) return
        const apply = () => {
          Object.entries(bindings).forEach(([key, binding]) => applyBinding(key, binding))
          legacy.forEach(applyLegacyTextPatch)
        }
        apply()

        observer = new MutationObserver(() => apply())
        observer.observe(document.body, { childList: true, subtree: true, characterData: true })
      } catch {
        // Keep the React page unchanged when the CMS runtime is unavailable.
      }
    }

    void load()
    return () => {
      disposed = true
      observer?.disconnect()
    }
  }, [pathname])

  return null
}
