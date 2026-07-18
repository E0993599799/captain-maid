'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
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
    label: 'Cleaning Tips & Solutions',
    href: '/blog',
    items: [
      { label: 'Clogs', href: '/blog' },
      { label: 'Dirt & Grime', href: '/blog' },
      { label: 'Germs & Bacteria', href: '/blog' },
      { label: 'Grease', href: '/blog' },
      { label: 'Whole House', href: '/blog' },
      { label: 'Hard Water Spots', href: '/blog' },
      { label: 'Limescale', href: '/blog' },
      { label: 'Odour', href: '/blog' },
      { label: 'Scuffs & Marks', href: '/blog' },
      { label: 'Soap Scum', href: '/blog' },
    ],
  },
  {
    label: 'Support',
    href: '/contact',
    items: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  { label: 'About us', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [visible, setVisible] = React.useState(true)
  const [scrolled, setScrolled] = React.useState(false)
  const lastScrollY = React.useRef(0)
  const pathname = usePathname() ?? '/th'
  const locale = pathname.startsWith('/en') ? 'en' : 'th'
  const localize = (href: string) => `/${locale}${href === '/' ? '' : href}`

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      if (y > lastScrollY.current && y > 80) {
        setVisible(false)
        setOpenMenu(null)
      } else {
        setVisible(true)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
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
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={localize('/')} className="flex items-center gap-2.5 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Captain Maid"
              className="w-12 h-12 object-contain drop-shadow-sm"
            />
            <div className="leading-tight">
              <div className="font-bold text-[#002d5f] text-lg tracking-tight">Captain Maid</div>
              <div className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                กัปตันเมด
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((item, i) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.items && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => item.items && setOpenMenu(item.label)}
              >
                <Link
                  href={localize(item.href)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#0079c1] py-2 ${
                    i === 0 ? 'text-[#0079c1]' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                  {item.items && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {item.items && openMenu === item.label && (
                  <div className="absolute left-0 top-full pt-1 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[230px]">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={localize(sub.href)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-[#0079c1] hover:bg-[#e6f3fa] transition-colors"
                          onClick={() => setOpenMenu(null)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            <Link
              href={localize('/products')}
              className="hidden sm:inline-flex items-center bg-[#0079c1] hover:bg-[#0066a8] text-white rounded-full px-5 py-2 text-sm font-semibold shadow-md transition-all"
            >
              {locale === 'th' ? 'เลือกซื้อสินค้า' : 'Shop products'}
            </Link>
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 text-gray-600"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="captain-maid-mobile-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="captain-maid-mobile-menu" className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {NAV.map((item, i) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <Link
                    href={localize(item.href)}
                    className={`text-sm font-medium py-2 ${i === 0 ? 'text-[#0079c1]' : 'text-gray-600'}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.items && (
                    <button
                      aria-label={`Toggle ${item.label}`}
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      className="p-2 text-gray-400"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>
                {item.items && openMenu === item.label && (
                  <div className="pl-4 pb-2 flex flex-col gap-1">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label}
                        href={localize(sub.href)}
                        className="text-sm text-gray-500 py-1.5 hover:text-[#0079c1]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href={localize('/products')}
              className="bg-[#0079c1] hover:bg-[#0066a8] text-white rounded-full mt-3 py-2.5 text-center text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              {locale === 'th' ? 'เลือกซื้อสินค้า' : 'Shop products'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
