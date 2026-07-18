import { cmsClient } from '@/lib/cms/client'
import { PRODUCTS, type CaptainProduct, type Localized, type ProductCategory } from '@/lib/captain-products'
import type { Locale } from '@/types/cms'

type LocalizedInput = string | { th?: string; en?: string } | null | undefined

interface PayloadMedia {
  url?: string
  filename?: string
  alt?: LocalizedInput
}

interface PayloadRelation {
  slug?: string
  name?: LocalizedInput
}

interface PayloadProduct {
  id?: string
  name?: LocalizedInput
  slug?: string
  productType?: LocalizedInput
  intro?: unknown
  keyBenefits?: Array<{ value?: LocalizedInput }>
  suitableFor?: Array<{ value?: LocalizedInput }>
  freeFrom?: string[]
  images?: Array<string | PayloadMedia>
  category?: string | PayloadRelation
  technology?: Array<{ value?: LocalizedInput }>
  safetyRemark?: LocalizedInput
}

interface PayloadProductsResponse {
  docs?: PayloadProduct[]
}

function localized(value: LocalizedInput, fallback = ''): Localized {
  if (typeof value === 'string') return { th: value, en: value }
  return {
    th: value?.th || value?.en || fallback,
    en: value?.en || value?.th || fallback,
  }
}

function richTextToString(value: unknown): string {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''
  const record = value as Record<string, unknown>
  if (typeof record.text === 'string') return record.text
  const children = Array.isArray(record.children) ? record.children : []
  return children.map(richTextToString).filter(Boolean).join(' ')
}

function localizedRichText(value: unknown): Localized {
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>
    return localized({
      th: richTextToString(record.th),
      en: richTextToString(record.en),
    })
  }
  return localized(richTextToString(value))
}

function list(values: Array<{ value?: LocalizedInput }> | undefined, fallback: Localized): { en: string[]; th: string[] } {
  const items = (values || []).map((item) => localized(item.value)).filter((item) => item.th || item.en)
  if (items.length === 0) return { en: [fallback.en], th: [fallback.th] }
  return {
    en: items.map((item) => item.en),
    th: items.map((item) => item.th),
  }
}

function category(value: string | PayloadRelation | undefined): ProductCategory {
  const raw = typeof value === 'string' ? value : value?.slug || value?.name
  const normalized = typeof raw === 'string' ? raw.toLowerCase() : ''
  if (normalized.includes('bath')) return 'bathroom'
  if (normalized.includes('kitchen')) return 'kitchen'
  if (normalized.includes('glass')) return 'glass'
  if (normalized.includes('dish')) return 'dishwasher'
  if (normalized.includes('disinfect')) return 'disinfectant'
  return 'floor'
}

function imageUrl(image: string | PayloadMedia | undefined): string {
  if (typeof image === 'string') return image
  return image?.url || '/images/product-floor.png'
}

export function adaptCaptainProduct(record: PayloadProduct): CaptainProduct {
  const name = localized(record.name, 'Captain Maid product')
  const intro = localizedRichText(record.intro)
  const benefits = list(record.keyBenefits, { th: 'คุณภาพที่ไว้ใจได้สำหรับบ้านทุกวัน', en: 'A trusted clean for everyday homes' })
  const suitableFor = list(record.suitableFor, { th: 'พื้นผิวทั่วไปภายในบ้าน', en: 'Everyday surfaces around the home' })
  const technology = list(record.technology, { th: '', en: '' })
  const firstImage = Array.isArray(record.images) ? record.images[0] : undefined

  return {
    id: record.slug || record.id || 'cms-product',
    category: category(record.category),
    name,
    size: localized(record.productType, '').th,
    price: 0,
    rating: 0,
    reviews: 0,
    scent: { th: technology.th[0] || '', en: technology.en[0] || '' },
    image: imageUrl(firstImage),
    intro: { en: [intro.en], th: [intro.th] },
    benefits,
    suitableFor: { en: suitableFor.en.join(' • '), th: suitableFor.th.join(' • ') },
    freeFrom: record.freeFrom,
  }
}

export async function getCaptainProducts(locale: Locale = 'th'): Promise<CaptainProduct[]> {
  if (!process.env.NEXT_PUBLIC_CMS_URL || !process.env.CMS_READ_TOKEN) return PRODUCTS

  try {
    const response = await cmsClient.getProducts({ locale, limit: 50 }) as PayloadProductsResponse
    const products = (response.docs || []).map(adaptCaptainProduct)
    return products.length > 0 ? products : PRODUCTS
  } catch (error) {
    console.warn('[Captain Maid CMS] Product fetch failed; using static fallback.', error)
    return PRODUCTS
  }
}

export async function getCaptainProduct(idOrSlug: string, locale: Locale = 'th'): Promise<CaptainProduct | undefined> {
  if (!process.env.NEXT_PUBLIC_CMS_URL || !process.env.CMS_READ_TOKEN) {
    return PRODUCTS.find((product) => product.id === idOrSlug)
  }

  try {
    const response = await cmsClient.getProduct(idOrSlug, locale) as PayloadProductsResponse
    const product = response.docs?.[0]
    return product ? adaptCaptainProduct(product) : PRODUCTS.find((item) => item.id === idOrSlug)
  } catch (error) {
    console.warn('[Captain Maid CMS] Product detail fetch failed; using static fallback.', error)
    return PRODUCTS.find((product) => product.id === idOrSlug)
  }
}
