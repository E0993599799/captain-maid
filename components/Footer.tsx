'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONTACT_INFO } from '@/lib/contact'

type Locale = 'th' | 'en'

const COPY = {
  th: {
    tagline: 'สะอาดทุกมุม มั่นใจทุกวัน',
    products: 'ผลิตภัณฑ์',
    company: 'เกี่ยวกับ Captain Maid',
    floor: 'ผลิตภัณฑ์ทำความสะอาดพื้น',
    bathroom: 'ผลิตภัณฑ์ทำความสะอาดห้องน้ำ',
    kitchen: 'ผลิตภัณฑ์ทำความสะอาดห้องครัว',
    all: 'ดูสินค้าทั้งหมด',
    about: 'เกี่ยวกับเรา',
    blog: 'บทความ',
    contact: 'ติดต่อเรา',
    rights: 'สงวนลิขสิทธิ์',
  },
  en: {
    tagline: 'Clean every corner. Feel confident every day.',
    products: 'Products',
    company: 'Captain Maid',
    floor: 'Floor Cleaner',
    bathroom: 'Bathroom Cleaner',
    kitchen: 'Kitchen Cleaner',
    all: 'View All Products',
    about: 'About Us',
    blog: 'Blog',
    contact: 'Contact',
    rights: 'All rights reserved.',
  },
} satisfies Record<Locale, Record<string, string>>

export function Footer() {
  const pathname = usePathname() ?? '/th'
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'th'
  const t = COPY[locale]
  const href = (path: string) => `/${locale}${path === '/' ? '' : path}`

  return (
    <footer className="bg-[#002d5f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={href('/')} className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30">
              <img src="/images/logo.png" alt="Captain Maid" className="h-12 w-12 object-contain" />
              <div className="leading-tight">
                <div className="font-bold">Captain Maid</div>
                <div className="text-xs text-white/60">กัปตันเมด</div>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">{t.tagline}</p>
            {(CONTACT_INFO.phone || CONTACT_INFO.email || CONTACT_INFO.address) && (
              <div className="mt-5 space-y-2 text-sm text-white/70">
                {CONTACT_INFO.phone && <a className="block hover:text-white" href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a>}
                {CONTACT_INFO.email && <a className="block break-all hover:text-white" href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>}
                {CONTACT_INFO.address && <p>{CONTACT_INFO.address}</p>}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">{t.products}</h2>
            <nav className="mt-4 space-y-3 text-sm text-white/70" aria-label={t.products}>
              <Link className="block hover:text-white" href={`${href('/products')}?category=floor`}>{t.floor}</Link>
              <Link className="block hover:text-white" href={`${href('/products')}?category=bathroom`}>{t.bathroom}</Link>
              <Link className="block hover:text-white" href={`${href('/products')}?category=kitchen`}>{t.kitchen}</Link>
              <Link className="block font-semibold text-white hover:text-[#7dd3fc]" href={href('/products')}>{t.all}</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">{t.company}</h2>
            <nav className="mt-4 space-y-3 text-sm text-white/70" aria-label={t.company}>
              <Link className="block hover:text-white" href={href('/about')}>{t.about}</Link>
              <Link className="block hover:text-white" href={href('/blog')}>{t.blog}</Link>
              <Link className="block hover:text-white" href={href('/contact')}>{t.contact}</Link>
            </nav>
          </div>

          <div className="lg:text-right">
            <p className="text-sm font-semibold text-white">Made for Easy Home Cleaning</p>
            <p className="mt-2 text-sm leading-6 text-white/60">Better Living, Taken Care of by Captain Maid.</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Captain Maid. {t.rights}
        </div>
      </div>
    </footer>
  )
}
