'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/navigation';

/**
 * Language Toggle component for switching between Thai and English
 * Positioned in navigation header, top right
 */
export const LanguageToggle = () => {
  const locale = useLocale();
  const isThaiActive = locale === 'th';

  return (
    <div className="flex items-center gap-0 p-1 bg-captain-soft rounded-full border border-captain-border">
      <Link
        href="/"
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
        href="/"
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
