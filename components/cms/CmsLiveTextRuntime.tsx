'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.arigeo.com').replace(/\/$/, '')

type TextPatch = { tag: string; index: number; text: string }

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

function applyTextPatch(patch: TextPatch) {
  const elements = document.querySelectorAll(patch.tag)
  const element = elements.item(patch.index)
  if (!element) return

  const textNodes = directTextNodes(element)
  if (textNodes.length) {
    const current = textNodes.map((node) => node.nodeValue || '').join(' ').replace(/\s+/g, ' ').trim()
    if (current === patch.text) return
    textNodes[0].nodeValue = patch.text
    for (let i = 1; i < textNodes.length; i += 1) textNodes[i].nodeValue = ''
    return
  }

  if (!element.children.length && element.textContent !== patch.text) {
    element.textContent = patch.text
  }
}

export default function CmsLiveTextRuntime() {
  const pathname = usePathname()

  useEffect(() => {
    let disposed = false
    let observer: MutationObserver | null = null
    const { locale, slug } = normalizeRoute(pathname || '/')

    const load = async () => {
      try {
        const response = await fetch(
          `${CMS_URL}/api/public/builder-v2/runtime/captain-maid/${encodeURIComponent(slug)}?locale=${locale}`,
          { headers: { accept: 'application/json' }, cache: 'no-store' },
        )
        if (!response.ok || disposed) return
        const data = await response.json() as { textPatches?: TextPatch[] }
        const patches = Array.isArray(data.textPatches) ? data.textPatches : []
        if (!patches.length || disposed) return

        const apply = () => patches.forEach(applyTextPatch)
        apply()

        observer = new MutationObserver(() => apply())
        observer.observe(document.body, { childList: true, subtree: true, characterData: true })
      } catch {
        // Preserve the React page unchanged when CMS runtime text is unavailable.
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
