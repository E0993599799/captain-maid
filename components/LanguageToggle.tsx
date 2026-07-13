'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/navigation';

/**
 * Premium Language Toggle component (Minimalist TH | EN text style)
 * Matches the Quiet Luxury design philosophy of Sammakorn
 */
export const LanguageToggle = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const isThaiActive = locale === 'th';

  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider font-body">
      <Link
        href={pathname}
        locale="th"
        className={`transition-colors duration-300 ${
          isThaiActive
            ? 'text-captain-text font-bold'
            : 'text-captain-muted/60 hover:text-captain-primary'
        }`}
      >
        TH
      </Link>
      <span className="text-captain-muted/20 font-light text-[10px]">|</span>
      <Link
        href={pathname}
        locale="en"
        className={`transition-colors duration-300 ${
          !isThaiActive
            ? 'text-captain-text font-bold'
            : 'text-captain-muted/60 hover:text-captain-primary'
        }`}
      >
        EN
      </Link>
    </div>
  );
};
