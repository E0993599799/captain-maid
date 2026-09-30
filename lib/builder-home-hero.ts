const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL ?? 'https://cms.arigeo.com').replace(/\/$/, '')

export type CaptainMaidHeroSlide = {
  id: string
  mobile: string
  tablet: string
  desktop: string
  alt: string
}

export async function getBuilderHomeHero(locale: 'th' | 'en'): Promise<CaptainMaidHeroSlide[] | null> {
  try {
    const response = await fetch(`${CMS_URL}/api/public/builder-v2/captain-maid-home-hero?locale=${encodeURIComponent(locale)}`, {
      next: { revalidate: 30, tags: ['builder-captain-maid-home-hero'] },
      headers: { accept: 'application/json' },
    })
    if (!response.ok) return null
    const value = await response.json() as { slides?: unknown }
    if (!Array.isArray(value.slides) || value.slides.length === 0) return null
    const slides = value.slides.filter((slide): slide is CaptainMaidHeroSlide => {
      if (!slide || typeof slide !== 'object') return false
      const row = slide as Record<string, unknown>
      return ['id', 'mobile', 'tablet', 'desktop', 'alt'].every((key) => typeof row[key] === 'string' && String(row[key]).length > 0)
    })
    return slides.length > 0 ? slides : null
  } catch (error) {
    console.error('[cms] Captain Maid Builder V2 hero unavailable', error)
    return null
  }
}
