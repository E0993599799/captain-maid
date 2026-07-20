'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

interface NavItem {
  label: string
  href: string
  items?: { label: string; href: string }[]
}

const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    items: [
      { label: 'Floor Cleaner', href: '/products?category=floor' },
      { label: 'Bathroom Cleaner', href: '/products?category=bathroom' },
      { label: 'Kitchen Cleaner', href: '/products?category=kitchen' },
      { label: 'Glass Cleaner', href: '/products?category=glass' },
      { label: 'Multi-purpose Disinfectant', href: '/products?category=disinfectant' },
      { label: 'Dish washer', href: '/products?category=dishwasher' },
      { label: 'View All', href: '/products' },
    ],
  },
  {
    label: 'Solutions',
    href: '/blog',
    items: [
      { label: 'Clogs', href: '/blog?topic=clogs' },
      { label: 'Dirt & Grime', href: '/blog?topic=dirt-grime' },
      { label: 'Germs & Bacteria', href: '/blog?topic=germs-bacteria' },
      { label: 'Grease', href: '/blog?topic=grease' },
      { label: 'Whole House', href: '/blog?topic=whole-house' },
      { label: 'Hard Water Spots', href: '/blog?topic=hard-water-spots' },
      { label: 'Limescale', href: '/blog?topic=limescale' },
      { label: 'Odour', href: '/blog?topic=odour' },
      { label: 'Scuffs & Marks', href: '/blog?topic=scuffs-marks' },
      { label: 'Soap Scum', href: '/blog?topic=soap-scum' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const menuId = (label: string) => `desktop-menu-${label.toLowerCase().replace(/\s+/g, '-')}`

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname() ?? '/th'
  const locale = pathname.startsWith('/en') ? 'en' : 'th'
  const pathWithoutLocale = pathname.replace(/^\/(th|en)(?=\/|$)/, '') || '/'

  const localize = (href: string) => (href === '/' ? `/${locale}` : href)
  const isPathActive = (href: string) =>
    href === '/'
      ? pathWithoutLocale === '/'
      : pathWithoutLocale === href || pathWithoutLocale.startsWith(`${href}/`)

  // Direction-aware header: hides on intentional downward scroll, reveals on
  // upward scroll, ignores sub-8px trackpad micro-movements, stays visible
  // near the top and while any menu is open. rAF-throttled so scroll only
  // triggers one state check per frame, not one React update per event.
  const lastScrollY = React.useRef(0)
  const ticking = React.useRef(false)
  React.useEffect(() => {
    lastScrollY.current = window.scrollY
    const menuOpen = mobileOpen || openMenu !== null

    const evaluate = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      setScrolled(y > 12)

      if (menuOpen || y < 80) {
        setHidden(false)
      } else if (Math.abs(delta) > 8) {
        setHidden(delta > 0)
      }

      lastScrollY.current = y
      ticking.current = false
    }

    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(evaluate)
    }

    evaluate()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileOpen, openMenu])

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  React.useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setOpenMenu(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  React.useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    },
    [],
  )

  const openDesktopMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }

  const scheduleDesktopMenuClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }

  const focusFirstSubmenuItem = (label: string) => {
    requestAnimationFrame(() => {
      document.querySelector<HTMLAnchorElement>(`#${menuId(label)} a`)?.focus()
    })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b font-sans transition-[background-color,border-color,box-shadow,transform] duration-300 ease-smooth ${
          hidden ? '-translate-y-full' : ''
        } ${
          scrolled
            ? 'border-[#dbe5ec] bg-white/95 shadow-[0_8px_28px_rgba(0,45,95,0.08)] backdrop-blur-md'
            : 'border-white/50 bg-white/90 backdrop-blur-md'
        }`}
      >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-[height] duration-300 ease-smooth ${
            scrolled ? 'h-16' : 'h-[76px]'
          }`}
        >
          <Link
            href={localize('/')}
            className="flex min-w-0 flex-shrink-0 items-center gap-2.5 self-start rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0079c1]/30"
            aria-label="Captain Maid home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt=""
              className={`object-contain drop-shadow-sm transition-[width,height] duration-300 ${
                scrolled ? 'h-16 w-16' : 'h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28'
              }`}
            />
            <span className="hidden leading-tight md:block">
              <span className="block whitespace-nowrap text-base font-bold tracking-[-0.02em] text-[#002d5f]">
                Captain Maid
              </span>
              <span className="block text-[10px] font-medium tracking-[0.12em] text-[#667b8d]">
                กัปตันเมด
              </span>
            </span>
          </Link>

          <nav className="hidden xl:flex flex-1 items-center justify-center gap-1" aria-label="Primary navigation">
            {NAV.map((item) => {
              const active = item.label !== 'Solutions' && isPathActive(item.href)
              const expanded = openMenu === item.label

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.items && openDesktopMenu(item.label)}
                  onMouseLeave={scheduleDesktopMenuClose}
                  onFocus={() => item.items && openDesktopMenu(item.label)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      scheduleDesktopMenuClose()
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') setOpenMenu(null)
                    if (event.key === 'ArrowDown' && item.items) {
                      event.preventDefault()
                      openDesktopMenu(item.label)
                      focusFirstSubmenuItem(item.label)
                    }
                  }}
                >
                  <Link
                    href={localize(item.href)}
                    aria-current={active ? 'page' : undefined}
                    aria-expanded={item.items ? expanded : undefined}
                    aria-controls={item.items ? menuId(item.label) : undefined}
                    className={`group relative flex min-h-11 items-center gap-1 rounded-lg px-3 text-[15px] font-semibold transition-colors ${
                      active
                        ? 'text-[#006cad]'
                        : 'text-[#31495d] hover:bg-[#eaf5fb] hover:text-[#006cad]'
                    }`}
                  >
                    {item.label}
                    {item.items && (
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-[#0079c1] transition-transform duration-200 ${
                        active || expanded ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>

                  {item.items && expanded && (
                    <div
                      id={menuId(item.label)}
                      className="animate-dropdown-in absolute left-0 top-full z-50 pt-2"
                      onMouseEnter={() => openDesktopMenu(item.label)}
                      onMouseLeave={scheduleDesktopMenuClose}
                      onAnimationEnd={(event) => {
                        event.currentTarget.style.transform = 'none'
                      }}
                    >
                      <div className="min-w-[260px] overflow-hidden rounded-2xl border border-[#dce7ef] bg-white p-2 shadow-[0_20px_55px_rgba(0,45,95,0.16)]">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={localize(sub.href)}
                            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#425a6d] transition-colors hover:bg-[#e6f3fa] hover:text-[#006cad] focus:bg-[#e6f3fa] focus:text-[#006cad]"
                            onClick={() => setOpenMenu(null)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="hidden md:block">
              <LanguageToggle />
            </div>
            <Link
              href="/products"
              aria-label={locale === 'th' ? 'ค้นหาสินค้า' : 'Search products'}
              className="hidden h-11 w-11 items-center justify-center rounded-full text-[#40596d] transition-colors hover:bg-[#e6f3fa] hover:text-[#006cad] sm:flex"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/products"
              className="hidden min-h-11 items-center rounded-full bg-[#0079c1] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,121,193,0.24)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#0066a8] lg:inline-flex"
            >
              {locale === 'th' ? 'เลือกซื้อสินค้า' : 'Shop products'}
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#31495d] hover:bg-[#e6f3fa] hover:text-[#006cad] xl:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="captain-maid-mobile-menu"
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      </header>

      {mobileOpen && (
        <div
          id="captain-maid-mobile-menu"
          className={`fixed inset-x-0 bottom-0 z-[60] xl:hidden ${scrolled ? 'top-16' : 'top-[76px]'}`}
        >
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-[#002d5f]/35 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="animate-mobile-menu-in absolute right-0 top-0 h-full w-full max-w-[420px] overflow-y-auto overscroll-contain border-l border-[#dce7ef] bg-white px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-5 shadow-2xl"
            onAnimationEnd={(event) => {
              event.currentTarget.style.transform = 'none'
            }}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV.map((item) => {
                const active = item.label !== 'Solutions' && isPathActive(item.href)
                const expanded = openMenu === item.label

                return (
                  <div key={item.label} className="border-b border-[#edf2f6] py-1">
                    <div className="flex min-h-12 items-center gap-2">
                      <Link
                        href={localize(item.href)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex min-h-11 flex-1 items-center rounded-lg px-3 text-[15px] font-semibold ${
                          active ? 'bg-[#e6f3fa] text-[#006cad]' : 'text-[#31495d] hover:bg-[#f2f8fc]'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.items && (
                        <button
                          type="button"
                          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
                          aria-expanded={expanded}
                          aria-controls={`mobile-${menuId(item.label)}`}
                          onClick={() => setOpenMenu(expanded ? null : item.label)}
                          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-[#40596d] hover:bg-[#e6f3fa] hover:text-[#006cad]"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>
                    {item.items && expanded && (
                      <div
                        id={`mobile-${menuId(item.label)}`}
                        className="animate-accordion-in pb-2 pl-3"
                        onAnimationEnd={(event) => {
                          event.currentTarget.style.transform = 'none'
                        }}
                      >
                        {item.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={localize(sub.href)}
                            className="block min-h-11 rounded-lg px-4 py-2.5 text-sm font-medium text-[#536b7d] hover:bg-[#e6f3fa] hover:text-[#006cad]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#dce7ef] pt-5 md:hidden">
              <LanguageToggle />
              <Link
                href="/products"
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#0079c1] px-5 text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                {locale === 'th' ? 'เลือกซื้อสินค้า' : 'Shop products'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
