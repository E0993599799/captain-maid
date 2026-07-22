'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LanguageToggleProps {
  isDark?: boolean
}

export function LanguageToggle({ isDark }: LanguageToggleProps) {
  const pathname = usePathname() ?? '/th'

  const currentLocale = pathname.startsWith('/en') ? 'en' : 'th'
  const toggleLocale = currentLocale === 'th' ? 'en' : 'th'
  const newPath = pathname.replace(/^\/\w{2}(?=\/|$)/, `/${toggleLocale}`)
    || `/${toggleLocale}`

  return (
    <Link
      href={newPath}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
        isDark
          ? 'text-white border-white/40 hover:bg-white/10'
          : 'border-[#b8c6d1] bg-white/70 text-[#16324f] hover:border-[#0079c1] hover:bg-[#e6f3fa] hover:text-[#005b91]'
      }`}
      aria-label={`Switch to ${toggleLocale === 'th' ? 'Thai' : 'English'}`}
    >
      {currentLocale === 'th' ? '🇹🇭 ไทย' : '🇬🇧 English'}
    </Link>
  )
}
