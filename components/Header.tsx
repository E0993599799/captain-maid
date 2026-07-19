'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X, ChevronDown, Search, User, ShoppingCart } from 'lucide-react'
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

/** Exact match for `/` (accounting for the locale-prefixed home route),
 *  exact-or-prefix match for everything else — so `/products/some-id`
 *  still lights up the `/products` nav item. */
function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/' || pathname === '/th' || pathname === '/en'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileOpenAccordion, setMobileOpenAccordion] = React.useState<string | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const lastScrollY = React.useRef(0)
  const ticking = React.useRef(false)
  const pathname = usePathname() ?? '/th'
  const locale = pathname.startsWith('/en') ? 'en' : 'th'
  // Only the homepage lives under app/[locale]/ — every other route (about,
  // products, blog, contact, faq) is a single hardcoded-language page with no
  // next-intl support yet, so prefixing them with /th or /en 404s. Only
  // localize the home link until those routes are actually internationalized.
  const localize = (href: string) => (href === '/' ? `/${locale}` : href)

  // rAF-throttled scroll listener: only the `scrolled` (>10px) background/size
  // toggle survives here. The old hide-on-scroll-down/show-on-scroll-up
  // behavior has been removed entirely — the header always stays visible.
  React.useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        setScrolled(lastScrollY.current > 10)
        ticking.current = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`absolute inset-0 -z-10 transition-colors duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : ''
        }`}
        style={
          scrolled
            ? undefined
            : {
                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0) 100%)',
              }
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-[height] duration-300 ease-out ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo */}
          <Link href={localize('/')} className="flex items-center gap-2.5 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Captain Maid"
              className={`object-contain drop-shadow-sm transition-[width,height] duration-300 ease-out ${
                scrolled ? 'w-16 h-16' : 'w-24 h-24'
              }`}
            />
            <div className="leading-tight">
              <div className="font-bold text-[#002d5f] text-lg tracking-tight">Captain Maid</div>
              <div className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                กัปตันเมด
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <NavigationMenu.Root className="hidden lg:flex relative" delayDuration={100} skipDelayDuration={300}>
            <NavigationMenu.List className="flex items-center gap-6">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href)
                const activeClass = active ? 'text-[#0079c1]' : 'text-gray-600'

                if (!item.items) {
                  return (
                    <NavigationMenu.Item key={item.label}>
                      <NavigationMenu.Link asChild active={active}>
                        <Link
                          href={localize(item.href)}
                          aria-current={active ? 'page' : undefined}
                          className={`text-sm font-medium py-2 transition-colors hover:text-[#0079c1] ${activeClass}`}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  )
                }

                return (
                  <NavigationMenu.Item key={item.label}>
                    <NavigationMenu.Trigger
                      className={`group flex items-center gap-1 text-sm font-medium py-2 transition-colors hover:text-[#0079c1] outline-none ${activeClass}`}
                    >
                      {item.label}
                      <ChevronDown
                        className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden
                      />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="w-full">
                      {item.items.map((sub) => (
                        <NavigationMenu.Link asChild key={sub.label}>
                          <Link
                            href={localize(sub.href)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-[#0079c1] hover:bg-[#e6f3fa] transition-colors whitespace-nowrap"
                          >
                            {sub.label}
                          </Link>
                        </NavigationMenu.Link>
                      ))}
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                )
              })}
            </NavigationMenu.List>

            <div className="absolute left-0 top-full pt-1 flex justify-start">
              <NavigationMenu.Viewport className="relative bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[230px] overflow-hidden transition-[width,height] duration-200" />
            </div>
          </NavigationMenu.Root>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            <Link
              href={localize('/products')}
              aria-label={locale === 'th' ? 'ค้นหาสินค้า' : 'Search products'}
              className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full text-gray-500 hover:text-[#0079c1] hover:bg-[#e6f3fa] transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
            {/* Account & cart: no account/e-commerce backend exists yet — shown for visual
                parity with the approved mockup, but intentionally not linked to avoid a
                fake 404 destination. Wire these up once those features are built. */}
            <button
              type="button"
              disabled
              title={locale === 'th' ? 'บัญชีผู้ใช้ (เร็ว ๆ นี้)' : 'Account (coming soon)'}
              aria-label={locale === 'th' ? 'บัญชีผู้ใช้ (เร็ว ๆ นี้)' : 'Account (coming soon)'}
              className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full text-gray-300 cursor-not-allowed"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              type="button"
              disabled
              title={locale === 'th' ? 'ตะกร้าสินค้า (เร็ว ๆ นี้)' : 'Cart (coming soon)'}
              aria-label={locale === 'th' ? 'ตะกร้าสินค้า (เร็ว ๆ นี้)' : 'Cart (coming soon)'}
              className="relative hidden sm:flex items-center justify-center w-11 h-11 rounded-full text-gray-300 cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-300 px-1 text-[10px] font-semibold leading-none text-white">
                0
              </span>
            </button>
            <Link
              href={localize('/products')}
              className="hidden sm:inline-flex items-center bg-[#0079c1] hover:bg-[#0066a8] text-white rounded-full px-5 py-2 text-sm font-semibold shadow-md transition-all"
            >
              {locale === 'th' ? 'เลือกซื้อสินค้า' : 'Shop products'}
            </Link>

            {/* Mobile menu */}
            <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="lg:hidden flex items-center justify-center w-11 h-11 text-gray-600"
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="lg:hidden fixed inset-0 z-40 bg-black/20" />
                <Dialog.Content
                  aria-describedby={undefined}
                  className={`lg:hidden fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-y-auto pb-[env(safe-area-inset-bottom)] transition-[top] duration-300 ${
                    scrolled ? 'top-16 max-h-[calc(100dvh-4rem)]' : 'top-20 max-h-[calc(100dvh-5rem)]'
                  }`}
                >
                  <Dialog.Title className="sr-only">
                    {locale === 'th' ? 'เมนูนำทาง' : 'Navigation menu'}
                  </Dialog.Title>
                  <nav className="flex flex-col px-4 py-4 gap-1">
                    {NAV.map((item) => {
                      const active = isActive(pathname, item.href)
                      return (
                        <div key={item.label}>
                          <div className="flex items-center justify-between">
                            <Dialog.Close asChild>
                              <Link
                                href={localize(item.href)}
                                aria-current={active ? 'page' : undefined}
                                className={`text-sm font-medium py-2 ${
                                  active ? 'text-[#0079c1]' : 'text-gray-600'
                                }`}
                              >
                                {item.label}
                              </Link>
                            </Dialog.Close>
                            {item.items && (
                              <button
                                type="button"
                                aria-label={`Toggle ${item.label}`}
                                aria-expanded={mobileOpenAccordion === item.label}
                                onClick={() =>
                                  setMobileOpenAccordion(
                                    mobileOpenAccordion === item.label ? null : item.label
                                  )
                                }
                                className="p-2 text-gray-400"
                              >
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${
                                    mobileOpenAccordion === item.label ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                            )}
                          </div>
                          {item.items && mobileOpenAccordion === item.label && (
                            <div className="pl-4 pb-2 flex flex-col gap-1">
                              {item.items.map((sub) => (
                                <Dialog.Close asChild key={sub.label}>
                                  <Link
                                    href={localize(sub.href)}
                                    className="text-sm text-gray-500 py-1.5 hover:text-[#0079c1]"
                                  >
                                    {sub.label}
                                  </Link>
                                </Dialog.Close>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                    <Dialog.Close asChild>
                      <Link
                        href={localize('/products')}
                        className="bg-[#0079c1] hover:bg-[#0066a8] text-white rounded-full mt-3 py-2.5 text-center text-sm font-semibold"
                      >
                        {locale === 'th' ? 'เลือกซื้อสินค้า' : 'Shop products'}
                      </Link>
                    </Dialog.Close>
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
