'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

type Locale = 'th' | 'en'

type NavItem = {
  key: string
  href: string
  items?: { key: string; href: string }[]
}

const NAV: NavItem[] = [
  { key: 'home', href: '/' },
  {
    key: 'products',
    href: '/products',
    items: [
      { key: 'floor', href: '/products?category=floor' },
      { key: 'bathroom', href: '/products?category=bathroom' },
      { key: 'kitchen', href: '/products?category=kitchen' },
      { key: 'glass', href: '/products?category=glass' },
      { key: 'disinfectant', href: '/products?category=disinfectant' },
      { key: 'dishwasher', href: '/products?category=dishwasher' },
      { key: 'viewAll', href: '/products' },
    ],
  },
  {
    key: 'solutions',
    href: '/blog',
    items: [
      { key: 'clogs', href: '/blog?topic=clogs' },
      { key: 'dirt', href: '/blog?topic=dirt-grime' },
      { key: 'germs', href: '/blog?topic=germs-bacteria' },
      { key: 'grease', href: '/blog?topic=grease' },
      { key: 'wholeHouse', href: '/blog?topic=whole-house' },
      { key: 'hardWater', href: '/blog?topic=hard-water-spots' },
      { key: 'limescale', href: '/blog?topic=limescale' },
      { key: 'odour', href: '/blog?topic=odour' },
      { key: 'scuffs', href: '/blog?topic=scuffs-marks' },
      { key: 'soapScum', href: '/blog?topic=soap-scum' },
    ],
  },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
]

const COPY: Record<Locale, Record<string, string>> = {
  th: {
    home: 'หน้าแรก', products: 'ผลิตภัณฑ์', solutions: 'โซลูชัน', about: 'เกี่ยวกับเรา', blog: 'บทความ', contact: 'ติดต่อเรา',
    floor: 'น้ำยาทำความสะอาดพื้น', bathroom: 'ห้องน้ำ', kitchen: 'ห้องครัว', glass: 'กระจก', disinfectant: 'ฆ่าเชื้ออเนกประสงค์', dishwasher: 'ล้างจาน', viewAll: 'ดูสินค้าทั้งหมด',
    clogs: 'ท่ออุดตัน', dirt: 'คราบสกปรก', germs: 'เชื้อโรคและแบคทีเรีย', grease: 'คราบมัน', wholeHouse: 'ทั้งบ้าน', hardWater: 'คราบน้ำ', limescale: 'คราบหินปูน', odour: 'กลิ่นไม่พึงประสงค์', scuffs: 'รอยเปื้อนและรอยขีด', soapScum: 'คราบสบู่',
  },
  en: {
    home: 'Home', products: 'Products', solutions: 'Solutions', about: 'About', blog: 'Blog', contact: 'Contact',
    floor: 'Floor Cleaner', bathroom: 'Bathroom Cleaner', kitchen: 'Kitchen Cleaner', glass: 'Glass Cleaner', disinfectant: 'Multi-purpose Disinfectant', dishwasher: 'Dishwasher', viewAll: 'View All',
    clogs: 'Clogs', dirt: 'Dirt & Grime', germs: 'Germs & Bacteria', grease: 'Grease', wholeHouse: 'Whole House', hardWater: 'Hard Water Spots', limescale: 'Limescale', odour: 'Odour', scuffs: 'Scuffs & Marks', soapScum: 'Soap Scum',
  },
}

const menuId = (key: string) => `desktop-menu-${key}`

export function Header() {
  const pathname = usePathname() ?? '/th'
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'th'
  const labels = COPY[locale]
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const pathWithoutLocale = pathname.replace(/^\/(th|en)(?=\/|$)/, '') || '/'
  const isHome = pathWithoutLocale === '/'
  const darkHeader = isHome && !scrolled
  const localize = (href: string) => {
    const [path, query] = href.split('?')
    const localizedPath = path === '/' ? `/${locale}` : `/${locale}${path}`
    return query ? `${localizedPath}?${query}` : localizedPath
  }
  const isPathActive = (href: string) => {
    const path = href.split('?')[0]
    return path === '/' ? pathWithoutLocale === '/' : pathWithoutLocale === path || pathWithoutLocale.startsWith(`${path}/`)
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  React.useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setOpenMenu(null)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  React.useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const openDesktopMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(key)
  }
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 140) }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${darkHeader ? 'border-white/15 bg-[#002d5f]/82 shadow-[0_10px_34px_rgba(0,24,52,0.16)] backdrop-blur-xl' : 'border-[#dbe5ec] bg-white shadow-[0_8px_28px_rgba(0,45,95,0.08)]'}`}>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            <Link href={`/${locale}`} className="group flex items-center gap-2.5 rounded-lg transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0079c1]/30" aria-label="Captain Maid home">
              <img src="/images/logo.png" alt="Captain Maid" className={`${scrolled ? 'h-12 w-12' : 'h-14 w-14 sm:h-16 sm:w-16'} ${darkHeader ? 'brightness-0 invert drop-shadow-[0_2px_10px_rgba(255,255,255,0.24)]' : 'drop-shadow-sm'} object-contain transition-all duration-300`} />
              <span className="hidden leading-tight md:block">
                <span className={`block whitespace-nowrap text-base font-bold tracking-[-0.02em] transition-colors duration-300 ${darkHeader ? 'text-white' : 'text-[#002d5f]'}`}>Captain Maid</span>
                <span className={`block text-[10px] font-medium tracking-[0.12em] transition-colors duration-300 ${darkHeader ? 'text-white/70' : 'text-[#667b8d]'}`}>กัปตันเมด</span>
              </span>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex" aria-label={locale === 'th' ? 'เมนูหลัก' : 'Primary navigation'}>
              {NAV.map((item) => {
                const active = item.key !== 'solutions' && isPathActive(item.href)
                const expanded = openMenu === item.key
                return (
                  <div key={item.key} className="relative" onMouseEnter={() => item.items && openDesktopMenu(item.key)} onMouseLeave={scheduleClose} onFocus={() => item.items && openDesktopMenu(item.key)}>
                    <Link href={localize(item.href)} aria-current={active ? 'page' : undefined} aria-expanded={item.items ? expanded : undefined} aria-controls={item.items ? menuId(item.key) : undefined} className={`group relative flex min-h-11 items-center gap-1 rounded-lg px-3 text-[15px] font-semibold transition-all duration-200 hover:scale-[1.03] ${darkHeader ? (active ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white') : (active ? 'text-[#006cad]' : 'text-[#31495d] hover:bg-[#eaf5fb] hover:text-[#006cad]')}`}>
                      {labels[item.key]}
                      {item.items && <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />}
                    </Link>
                    {item.items && expanded && (
                      <div id={menuId(item.key)} className="absolute left-0 top-full z-50 pt-2" onMouseEnter={() => openDesktopMenu(item.key)} onMouseLeave={scheduleClose}>
                        <div className="min-w-[270px] overflow-hidden rounded-2xl border border-[#dce7ef] bg-white p-2 shadow-[0_20px_55px_rgba(0,45,95,0.16)]">
                          {item.items.map((sub) => <Link key={sub.key} href={localize(sub.href)} className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#425a6d] hover:bg-[#e6f3fa] hover:text-[#006cad]" onClick={() => setOpenMenu(null)}>{labels[sub.key]}</Link>)}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
              <div className="hidden md:block"><React.Suspense fallback={null}><LanguageToggle isDark={darkHeader} /></React.Suspense></div>
              <Link href={`/${locale}/products`} aria-label={locale === 'th' ? 'ค้นหาสินค้า' : 'Search products'} className={`hidden h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.03] sm:flex ${darkHeader ? 'text-white hover:bg-white/10' : 'text-[#40596d] hover:bg-[#e6f3fa] hover:text-[#006cad]'}`}><Search className="h-5 w-5" /></Link>
              <Link href={`/${locale}/products`} className={`hidden min-h-11 items-center rounded-full px-5 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] lg:inline-flex ${darkHeader ? 'border border-white/45 bg-white/10 text-white hover:bg-white/20' : 'bg-[#0079c1] text-white shadow-[0_8px_20px_rgba(0,121,193,0.24)] hover:bg-[#0066a8]'}`}>{locale === 'th' ? 'เลือกซื้อสินค้า' : 'Shop products'}</Link>
              <button type="button" className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.03] xl:hidden ${darkHeader ? 'text-white hover:bg-white/10' : 'text-[#31495d] hover:bg-[#e6f3fa]'}`} aria-label={mobileOpen ? (locale === 'th' ? 'ปิดเมนู' : 'Close menu') : (locale === 'th' ? 'เปิดเมนู' : 'Open menu')} aria-expanded={mobileOpen} aria-controls="captain-maid-mobile-menu" onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div id="captain-maid-mobile-menu" className={`fixed inset-x-0 bottom-0 z-[60] xl:hidden ${scrolled ? 'top-16' : 'top-20'}`}>
          <button type="button" className="absolute inset-0 h-full w-full bg-[#002d5f]/35 backdrop-blur-[2px]" aria-label={locale === 'th' ? 'ปิดเมนู' : 'Close menu'} onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-[420px] overflow-y-auto border-l border-[#dce7ef] bg-white px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-5 shadow-2xl">
            <nav className="flex flex-col gap-1" aria-label={locale === 'th' ? 'เมนูมือถือ' : 'Mobile navigation'}>
              {NAV.map((item) => {
                const active = item.key !== 'solutions' && isPathActive(item.href)
                const expanded = openMenu === item.key
                return <div key={item.key} className="border-b border-[#edf2f6] py-1">
                  <div className="flex min-h-12 items-center gap-2">
                    <Link href={localize(item.href)} aria-current={active ? 'page' : undefined} className={`flex min-h-11 flex-1 items-center rounded-lg px-3 text-[15px] font-semibold ${active ? 'bg-[#e6f3fa] text-[#006cad]' : 'text-[#31495d] hover:bg-[#f2f8fc]'}`} onClick={() => setMobileOpen(false)}>{labels[item.key]}</Link>
                    {item.items && <button type="button" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${labels[item.key]}`} aria-expanded={expanded} onClick={() => setOpenMenu(expanded ? null : item.key)} className="flex h-11 w-11 items-center justify-center rounded-lg text-[#40596d] hover:bg-[#e6f3fa]"><ChevronDown className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`} /></button>}
                  </div>
                  {item.items && expanded && <div className="pb-2 pl-3">{item.items.map((sub) => <Link key={sub.key} href={localize(sub.href)} className="block min-h-11 rounded-lg px-4 py-2.5 text-sm font-medium text-[#536b7d] hover:bg-[#e6f3fa]" onClick={() => setMobileOpen(false)}>{labels[sub.key]}</Link>)}</div>}
                </div>
              })}
            </nav>
            <div className="mt-5 border-t border-[#dce7ef] pt-5 md:hidden"><React.Suspense fallback={null}><LanguageToggle /></React.Suspense></div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
