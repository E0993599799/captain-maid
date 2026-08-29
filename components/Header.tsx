'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

type Locale = 'th' | 'en'
type HeaderTone = 'light' | 'dark'

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

const parseColor = (color: string) => {
  const values = color.match(/[\d.]+/g)?.map(Number)
  if (!values || values.length < 3) return null
  return { r: values[0], g: values[1], b: values[2], a: values[3] ?? 1 }
}

const backgroundToneForElement = (element: Element): HeaderTone | null => {
  let current: Element | null = element

  while (current) {
    const explicitTone = current.getAttribute('data-header-tone')
    if (explicitTone === 'light' || explicitTone === 'dark') return explicitTone

    const backgroundColor = window.getComputedStyle(current).backgroundColor
    const rgba = parseColor(backgroundColor)
    if (rgba && rgba.a > 0.05) {
      const toLinear = (channel: number) => {
        const value = channel / 255
        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
      }
      const luminance = 0.2126 * toLinear(rgba.r) + 0.7152 * toLinear(rgba.g) + 0.0722 * toLinear(rgba.b)
      return luminance >= 0.58 ? 'light' : 'dark'
    }

    current = current.parentElement
  }

  return null
}

export function Header() {
  const pathname = usePathname() ?? '/th'
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'th'
  const labels = COPY[locale]
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const [isLightBackground, setIsLightBackground] = React.useState(false)
  const headerRef = React.useRef<HTMLElement | null>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const pathWithoutLocale = pathname.replace(/^\/(th|en)(?=\/|$)/, '') || '/'
  const useDarkControls = scrolled || !isLightBackground
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
    let animationFrame = 0

    const updateHeaderTone = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        const header = headerRef.current
        if (!header) return

        const rect = header.getBoundingClientRect()
        const y = Math.max(1, Math.min(window.innerHeight - 1, rect.height * 0.5))
        const samplePoints = [window.innerWidth * 0.2, window.innerWidth * 0.5, window.innerWidth * 0.8]
        const tones = samplePoints
          .map((x) => {
            const underlying = document.elementsFromPoint(x, y).find((candidate) => candidate !== header && !header.contains(candidate))
            return underlying ? backgroundToneForElement(underlying) : null
          })
          .filter((tone): tone is HeaderTone => tone !== null)

        if (tones.length) {
          const lightVotes = tones.filter((tone) => tone === 'light').length
          setIsLightBackground(lightVotes > tones.length / 2)
          return
        }

        setIsLightBackground(pathWithoutLocale !== '/')
      })
    }

    updateHeaderTone()
    window.addEventListener('scroll', updateHeaderTone, { passive: true })
    window.addEventListener('resize', updateHeaderTone)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateHeaderTone)
      window.removeEventListener('resize', updateHeaderTone)
    }
  }, [pathWithoutLocale])

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
      <header ref={headerRef} className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-[#002d5f]' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <Link href={`/${locale}`} className="group flex items-center gap-2.5 rounded-lg transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0079c1]/30" aria-label="Captain Maid home">
              <img src="/images/logo.png" alt="Captain Maid" className="h-[62px] w-[62px] object-contain drop-shadow-sm transition-transform duration-300 sm:h-[70px] sm:w-[70px]" />
              <span className="hidden leading-tight md:block">
                <span className={`block whitespace-nowrap text-base font-bold tracking-[-0.02em] transition-colors duration-300 ${useDarkControls ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]' : 'text-[#002d5f]'}`}>Captain Maid</span>
                <span className={`block text-[10px] font-medium tracking-[0.12em] transition-colors duration-300 ${useDarkControls ? 'text-white/75 drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)]' : 'text-[#36536f]'}`}>กัปตันเมด</span>
              </span>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex" aria-label={locale === 'th' ? 'เมนูหลัก' : 'Primary navigation'}>
              {NAV.map((item) => {
                const active = item.key !== 'solutions' && isPathActive(item.href)
                const expanded = openMenu === item.key
                const adaptiveNav = useDarkControls
                  ? active
                    ? 'text-white bg-white/10'
                    : 'text-white hover:bg-white/10 hover:text-white'
                  : active
                    ? 'text-[#002d5f] bg-[#002d5f]/10'
                    : 'text-[#002d5f] hover:bg-[#002d5f]/10'
                return (
                  <div key={item.key} className="relative" onMouseEnter={() => item.items && openDesktopMenu(item.key)} onMouseLeave={scheduleClose} onFocus={() => item.items && openDesktopMenu(item.key)}>
                    <Link href={localize(item.href)} aria-current={active ? 'page' : undefined} aria-expanded={item.items ? expanded : undefined} aria-controls={item.items ? menuId(item.key) : undefined} className={`group relative flex min-h-11 items-center gap-1 rounded-lg px-3.5 text-[17px] font-medium tracking-[-0.015em] [text-rendering:geometricPrecision] transition-all duration-200 hover:scale-[1.03] ${adaptiveNav}`}>
                      {labels[item.key]}
                      {item.items && <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />}
                    </Link>
                    {item.items && expanded && (
                      <div id={menuId(item.key)} className="absolute left-0 top-full z-50 pt-2" onMouseEnter={() => openDesktopMenu(item.key)} onMouseLeave={scheduleClose}>
                        <div className="min-w-[270px] overflow-hidden rounded-2xl border border-[#dce7ef] bg-white p-2 shadow-[0_20px_55px_rgba(0,45,95,0.16)]">
                          {item.items.map((sub) => <Link key={sub.key} href={localize(sub.href)} className="block rounded-xl px-4 py-2.5 text-[15px] font-normal tracking-[-0.01em] [text-rendering:geometricPrecision] text-[#425a6d] hover:bg-[#e6f3fa] hover:text-[#006cad]" onClick={() => setOpenMenu(null)}>{labels[sub.key]}</Link>)}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
              <div className="hidden md:block"><React.Suspense fallback={null}><LanguageToggle isDark={useDarkControls} /></React.Suspense></div>
              <Link href={`/${locale}/products`} aria-label={locale === 'th' ? 'ค้นหาสินค้า' : 'Search products'} className={`hidden h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.03] sm:flex ${useDarkControls ? 'text-white hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]' : 'text-[#002d5f] hover:bg-[#002d5f]/10'}`}><Search className="h-5 w-5" /></Link>
              <Link href={`/${locale}/products`} className={`hidden min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] lg:inline-flex ${useDarkControls ? 'border-white/55 bg-transparent text-white hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]' : 'border-[#002d5f]/30 bg-transparent text-[#002d5f] hover:bg-[#002d5f]/10'}`}>{locale === 'th' ? 'เลือกซื้อสินค้า' : 'Shop products'}</Link>
              <button type="button" className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.03] xl:hidden ${useDarkControls ? 'text-white hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]' : 'text-[#002d5f] hover:bg-[#002d5f]/10'}`} aria-label={mobileOpen ? (locale === 'th' ? 'ปิดเมนู' : 'Close menu') : (locale === 'th' ? 'เปิดเมนู' : 'Open menu')} aria-expanded={mobileOpen} aria-controls="captain-maid-mobile-menu" onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div id="captain-maid-mobile-menu" className="fixed inset-x-0 bottom-0 top-20 z-[60] xl:hidden">
          <button type="button" className="absolute inset-0 h-full w-full bg-[#002d5f]/35 backdrop-blur-[2px]" aria-label={locale === 'th' ? 'ปิดเมนู' : 'Close menu'} onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-[420px] overflow-y-auto border-l border-[#dce7ef] bg-white px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-5 shadow-2xl">
            <nav className="flex flex-col gap-1" aria-label={locale === 'th' ? 'เมนูมือถือ' : 'Mobile navigation'}>
              {NAV.map((item) => {
                const active = item.key !== 'solutions' && isPathActive(item.href)
                const expanded = openMenu === item.key
                return <div key={item.key} className="border-b border-[#edf2f6] py-1">
                  <div className="flex min-h-12 items-center gap-2">
                    <Link href={localize(item.href)} aria-current={active ? 'page' : undefined} className={`flex min-h-11 flex-1 items-center rounded-lg px-3 text-[17px] font-medium tracking-[-0.015em] [text-rendering:geometricPrecision] ${active ? 'bg-[#e6f3fa] text-[#006cad]' : 'text-[#31495d] hover:bg-[#f2f8fc]'}`} onClick={() => setMobileOpen(false)}>{labels[item.key]}</Link>
                    {item.items && <button type="button" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${labels[item.key]}`} aria-expanded={expanded} onClick={() => setOpenMenu(expanded ? null : item.key)} className="flex h-11 w-11 items-center justify-center rounded-lg text-[#40596d] hover:bg-[#e6f3fa]"><ChevronDown className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`} /></button>}
                  </div>
                  {item.items && expanded && <div className="pb-2 pl-3">{item.items.map((sub) => <Link key={sub.key} href={localize(sub.href)} className="block min-h-11 rounded-lg px-4 py-2.5 text-[15px] font-normal tracking-[-0.01em] [text-rendering:geometricPrecision] text-[#536b7d] hover:bg-[#e6f3fa]" onClick={() => setMobileOpen(false)}>{labels[sub.key]}</Link>)}</div>}
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