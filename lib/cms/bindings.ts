export type CmsTextBinding = { type: 'text'; text: string }
export type CmsLinkBinding = { type: 'link'; text: string; href?: string }
export type CmsImageBinding = {
  type: 'image'
  src: string
  mobile?: string
  tablet?: string
  desktop?: string
  alt?: string
  assetIds?: { mobile?: string; tablet?: string; desktop?: string }
}
export type CmsBinding = CmsTextBinding | CmsLinkBinding | CmsImageBinding
export type CmsBindings = Record<string, CmsBinding>

export type CmsRuntime = {
  bindings: CmsBindings
  bindingSource?: string
  bindingVersion?: number
  publishedVersionId?: string | null
}

const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.arigeo.com').replace(/\/$/, '')

export async function getCaptainMaidRuntime(slug: string, locale: 'th' | 'en'): Promise<CmsRuntime> {
  try {
    const response = await fetch(
      `${CMS_URL}/api/public/builder-v2/runtime/captain-maid/${encodeURIComponent(slug)}?locale=${locale}`,
      { cache: 'no-store', headers: { accept: 'application/json' } },
    )
    if (!response.ok) return { bindings: {} }
    const value = await response.json() as Partial<CmsRuntime>
    return {
      bindings: value.bindings && typeof value.bindings === 'object' ? value.bindings : {},
      bindingSource: typeof value.bindingSource === 'string' ? value.bindingSource : undefined,
      bindingVersion: typeof value.bindingVersion === 'number' ? value.bindingVersion : undefined,
      publishedVersionId: typeof value.publishedVersionId === 'string' ? value.publishedVersionId : null,
    }
  } catch {
    return { bindings: {} }
  }
}

export function cmsText(bindings: CmsBindings | undefined, key: string, fallback: string): string {
  const binding = bindings?.[key]
  return binding && (binding.type === 'text' || binding.type === 'link') && binding.text
    ? binding.text
    : fallback
}

export function cmsLink(
  bindings: CmsBindings | undefined,
  key: string,
  fallback: { text: string; href: string },
): { text: string; href: string } {
  const binding = bindings?.[key]
  if (!binding || binding.type !== 'link') return fallback
  return {
    text: binding.text || fallback.text,
    href: binding.href || fallback.href,
  }
}

export function cmsImage(
  bindings: CmsBindings | undefined,
  key: string,
  fallback: { src: string; mobile?: string; tablet?: string; desktop?: string; alt?: string },
): { src: string; mobile: string; tablet: string; desktop: string; alt: string } {
  const binding = bindings?.[key]
  if (!binding || binding.type !== 'image') {
    const src = fallback.desktop || fallback.src
    return {
      src,
      desktop: src,
      tablet: fallback.tablet || src,
      mobile: fallback.mobile || fallback.tablet || src,
      alt: fallback.alt || '',
    }
  }
  const desktop = binding.desktop || binding.src || fallback.desktop || fallback.src
  return {
    src: desktop,
    desktop,
    tablet: binding.tablet || desktop,
    mobile: binding.mobile || binding.tablet || desktop,
    alt: binding.alt ?? fallback.alt ?? '',
  }
}

export function globalBindings(bindings: CmsBindings): CmsBindings {
  return Object.fromEntries(Object.entries(bindings).filter(([key]) => key.startsWith('global.')))
}
