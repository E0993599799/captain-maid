import { HERO_BRAND_WEBP_PART_1 } from '@/lib/assets/hero-brand/part1'
import { HERO_BRAND_WEBP_PART_2 } from '@/lib/assets/hero-brand/part2'
import { HERO_BRAND_WEBP_PART_3 } from '@/lib/assets/hero-brand/part3'
import { HERO_BRAND_WEBP_PART_4 } from '@/lib/assets/hero-brand/part4'
import { HERO_BRAND_WEBP_PART_5 } from '@/lib/assets/hero-brand/part5'
import { HERO_BRAND_WEBP_PART_6 } from '@/lib/assets/hero-brand/part6'

export const dynamic = 'force-static'
export const runtime = 'nodejs'

const HERO_WEBP_BASE64 = [
  HERO_BRAND_WEBP_PART_1,
  HERO_BRAND_WEBP_PART_2,
  HERO_BRAND_WEBP_PART_3,
  HERO_BRAND_WEBP_PART_4,
  HERO_BRAND_WEBP_PART_5,
  HERO_BRAND_WEBP_PART_6,
].join('')

const HERO_WEBP = Buffer.from(HERO_WEBP_BASE64, 'base64')

export async function GET() {
  return new Response(HERO_WEBP, {
    headers: {
      'Content-Type': 'image/webp',
      'Content-Length': String(HERO_WEBP.byteLength),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
