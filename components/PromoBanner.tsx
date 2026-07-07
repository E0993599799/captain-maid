'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations('navigation.banner');

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-primary text-white text-center p-2 text-sm">
      <span>{t('freeDelivery')}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 right-4 -translate-y-1/2"
        aria-label="Dismiss promotional banner"
      >
        <X size={16} />
      </button>
    </div>
  );
}
