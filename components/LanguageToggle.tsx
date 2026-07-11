'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/navigation';

/**
 * Language Toggle component for switching between Thai and English
 * Positioned in navigation header, top right
 * Preserves the active route when toggling locales
 */
export const LanguageToggle = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const isThaiActive = locale === 'th';

  return (
    <div className="flex items-center gap-0 p-1 bg-captain-soft rounded-full border border-captain-border">
      <Link
        href={pathname}
        locale="th"
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
          isThaiActive
            ? 'bg-captain-primary text-white shadow-sm'
            : 'text-captain-text hover:text-captain-primary'
        }`}
      >
        ไทย
      </Link>
      <Link
        href={pathname}
        locale="en"
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
          !isThaiActive
            ? 'bg-captain-primary text-white shadow-sm'
            : 'text-captain-text hover:text-captain-primary'
        }`}
      >
        EN
      </Link>
    </div>
  );
};
