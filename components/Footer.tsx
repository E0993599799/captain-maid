'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONTACT_INFO } from '@/lib/contact'
import { cmsLink, cmsText, type CmsBindings } from '@/lib/cms/bindings'
import CmsPicture from '@/components/cms/CmsPicture'

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

export function Footer({ bindings = {} }: { bindings?: CmsBindings }) {
  const pathname = usePathname() ?? '/th'
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'th'
  const t = COPY[locale]
  const href = (path: string) => `/${locale}${path === '/' ? '' : path}`
  const boundLink = (key: string, text: string, url: string) => cmsLink(bindings, key, { text, href: url })

  return (
    <footer className="bg-[#002d5f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={href('/')} className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30">
              <CmsPicture
                bindings={bindings}
                cmsKey="global.footer.logo"
                fallback={{ src: '/images/logo.png', alt: 'Captain Maid' }}
                pictureClassName="block h-12 w-12"
                imgClassName="h-12 w-12 object-contain"
                width={48}
                height={48}
              />
              <div className="leading-tight">
                <div data-cms-key="global.footer.brand.en" className="font-bold">{cmsText(bindings, 'global.footer.brand.en', 'Captain Maid')}</div>
                <div data-cms-key="global.footer.brand.th" className="text-xs text-white/60">{cmsText(bindings, 'global.footer.brand.th', 'กัปตันเมด')}</div>
              </div>
            </Link>
            <p data-cms-key="global.footer.tagline" className="mt-4 max-w-xs text-sm leading-6 text-white/70">{cmsText(bindings, 'global.footer.tagline', t.tagline)}</p>
            {(CONTACT_INFO.phone || CONTACT_INFO.email || CONTACT_INFO.address) && (
              <div className="mt-5 space-y-2 text-sm text-white/70">
                {CONTACT_INFO.phone && <a className="block hover:text-white" href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a>}
                {CONTACT_INFO.email && <a className="block break-all hover:text-white" href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>}
                {CONTACT_INFO.address && <p>{CONTACT_INFO.address}</p>}
              </div>
            )}
          </div>

          <div>
            <h2 data-cms-key="global.footer.products.heading" className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">{cmsText(bindings, 'global.footer.products.heading', t.products)}</h2>
            <nav className="mt-4 space-y-3 text-sm text-white/70" aria-label={t.products}>
              <Link data-cms-key="global.footer.products.floor" className="block hover:text-white" href={boundLink('global.footer.products.floor', t.floor, `${href('/products')}?category=floor`).href}>{boundLink('global.footer.products.floor', t.floor, `${href('/products')}?category=floor`).text}</Link>
              <Link data-cms-key="global.footer.products.bathroom" className="block hover:text-white" href={boundLink('global.footer.products.bathroom', t.bathroom, `${href('/products')}?category=bathroom`).href}>{boundLink('global.footer.products.bathroom', t.bathroom, `${href('/products')}?category=bathroom`).text}</Link>
              <Link data-cms-key="global.footer.products.kitchen" className="block hover:text-white" href={boundLink('global.footer.products.kitchen', t.kitchen, `${href('/products')}?category=kitchen`).href}>{boundLink('global.footer.products.kitchen', t.kitchen, `${href('/products')}?category=kitchen`).text}</Link>
              <Link data-cms-key="global.footer.products.all" className="block font-semibold text-white hover:text-[#7dd3fc]" href={boundLink('global.footer.products.all', t.all, href('/products')).href}>{boundLink('global.footer.products.all', t.all, href('/products')).text}</Link>
            </nav>
          </div>

          <div>
            <h2 data-cms-key="global.footer.company.heading" className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">{cmsText(bindings, 'global.footer.company.heading', t.company)}</h2>
            <nav className="mt-4 space-y-3 text-sm text-white/70" aria-label={t.company}>
              <Link data-cms-key="global.footer.company.about" className="block hover:text-white" href={boundLink('global.footer.company.about', t.about, href('/about')).href}>{boundLink('global.footer.company.about', t.about, href('/about')).text}</Link>
              <Link data-cms-key="global.footer.company.blog" className="block hover:text-white" href={boundLink('global.footer.company.blog', t.blog, href('/blog')).href}>{boundLink('global.footer.company.blog', t.blog, href('/blog')).text}</Link>
              <Link data-cms-key="global.footer.company.contact" className="block hover:text-white" href={boundLink('global.footer.company.contact', t.contact, href('/contact')).href}>{boundLink('global.footer.company.contact', t.contact, href('/contact')).text}</Link>
            </nav>
          </div>

          <div className="lg:text-right">
            <p data-cms-key="global.footer.promise.title" className="text-sm font-semibold text-white">{cmsText(bindings, 'global.footer.promise.title', 'Made for Easy Home Cleaning')}</p>
            <p data-cms-key="global.footer.promise.description" className="mt-2 text-sm leading-6 text-white/60">{cmsText(bindings, 'global.footer.promise.description', 'Better Living, Taken Care of by Captain Maid.')}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Captain Maid. {t.rights}
        </div>
      </div>
    </footer>
  )
}
