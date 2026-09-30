const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.arigeo.com').replace(/\/$/, '')

export interface CaptainMaidHeroSlide {
  id: string
  mobile: string
  tablet: string
  desktop: string
  alt: string
}

export interface CaptainMaidHomeHero {
  slides: CaptainMaidHeroSlide[]
}

export async function getCaptainMaidHomeHero(): Promise<CaptainMaidHomeHero | null> {
  try {
    const response = await fetch(`${CMS_URL}/api/public/builder-v2/captain-maid-home-hero`, {
      next: { revalidate: 30, tags: ['builder-captain-maid-home-hero'] },
      headers: { accept: 'application/json' },
    })
    if (!response.ok) return null

    const value = await response.json() as { slides?: unknown }
    if (!Array.isArray(value.slides)) return null

    const slides = value.slides.flatMap((item, index) => {
      if (!item || typeof item !== 'object') return []
      const row = item as Record<string, unknown>
      const desktop = typeof row.desktop === 'string' ? row.desktop.trim() : ''
      const tablet = typeof row.tablet === 'string' ? row.tablet.trim() : ''
      const mobile = typeof row.mobile === 'string' ? row.mobile.trim() : ''
      const fallback = desktop || tablet || mobile
      if (!fallback) return []
      return [{
        id: typeof row.id === 'string' && row.id.trim() ? row.id.trim() : `cms-slide-${index + 1}`,
        desktop: desktop || fallback,
        tablet: tablet || desktop || mobile || fallback,
        mobile: mobile || tablet || desktop || fallback,
        alt: typeof row.alt === 'string' ? row.alt.trim() : '',
      }]
    })

    return slides.length > 0 ? { slides } : null
  } catch (error) {
    console.error('[cms] Captain Maid Home Hero unavailable', error)
    return null
  }
}
