'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LanguageToggleProps {
  isDark?: boolean
}

export function LanguageToggle({ isDark }: LanguageToggleProps) {
  const pathname = usePathname() ?? '/th'
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'th'

  const pathFor = (locale: 'th' | 'en') =>
    pathname.replace(/^\/\w{2}(?=\/|$)/, `/${locale}`) || `/${locale}`

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${
        isDark ? 'border-white/40 bg-white/10' : 'border-[#b8c6d1] bg-white/70'
      }`}
    >
      {(['th', 'en'] as const).map((locale) => {
        const current = currentLocale === locale
        return (
          <Link
            key={locale}
            href={pathFor(locale)}
            aria-current={current ? 'true' : undefined}
            className={`inline-flex min-h-9 min-w-11 items-center justify-center rounded-full px-3 text-xs font-bold transition-colors ${
              current
                ? 'bg-[#0079c1] text-white'
                : isDark
                  ? 'text-white/75 hover:text-white'
                  : 'text-[#16324f] hover:text-[#005b91]'
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
