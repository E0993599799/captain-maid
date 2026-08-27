'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface LanguageToggleProps {
  isDark?: boolean
}

export function LanguageToggle({ isDark }: LanguageToggleProps) {
  const pathname = usePathname() ?? '/th'
  const searchParams = useSearchParams()
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'th'
  const toggleLocale = currentLocale === 'th' ? 'en' : 'th'
  const pathWithoutLocale = pathname.replace(/^\/(th|en)(?=\/|$)/, '') || '/'
  const localizedPath = pathWithoutLocale === '/' ? `/${toggleLocale}` : `/${toggleLocale}${pathWithoutLocale}`
  const query = searchParams.toString()
  const newPath = query ? `${localizedPath}?${query}` : localizedPath

  return (
    <Link
      href={newPath}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
        isDark
          ? 'border-white/40 text-white hover:bg-white/10'
          : 'border-[#b8c6d1] bg-white/70 text-[#16324f] hover:border-[#0079c1] hover:bg-[#e6f3fa] hover:text-[#005b91]'
      }`}
      aria-label={toggleLocale === 'th' ? 'เปลี่ยนเป็นภาษาไทย' : 'Switch to English'}
    >
      {currentLocale === 'th' ? 'ไทย' : 'English'}
    </Link>
  )
}
