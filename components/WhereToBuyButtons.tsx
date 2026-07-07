'use client';

import { Product } from '@/data/products';
import { trackEvent } from '@/lib/analytics';
import { Button } from './ui/button';
import Image from 'next/image';

interface WhereToBuyButtonsProps {
  product: Product;
  className?: string;
}

export function WhereToBuyButtons({ product, className }: WhereToBuyButtonsProps) {
  const channels = [
    { name: 'HomePro', url: product.homeproUrl, logo: '/images/retailers/HomePro_Logo.svg', eventName: 'click_homepro' },
    { name: 'Shopee', url: product.shopeeUrl, logo: '/images/retailers/Shopee.svg', eventName: 'click_shopee' },
    { name: 'Lazada', url: product.lazadaUrl, logo: '/images/retailers/Lazada_(2019).svg', eventName: 'click_lazada' },
    { name: 'TikTok', url: product.tiktokUrl, logo: '/images/retailers/TikTok_logo.svg', eventName: 'click_tiktok' },
    { name: 'LINE', url: product.lineUrl, logo: '/images/retailers/LINE_Shopping.svg', eventName: 'click_line' },
  ] as const;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {channels.map((channel) => {
        const isAvailable = channel.url && !channel.url.startsWith('[รอข้อมูล]');
        return (
          <Button
            key={channel.name}
            variant="outline"
            asChild={isAvailable}
            disabled={!isAvailable}
            onClick={() => isAvailable && trackEvent(channel.eventName, { product_slug: product.slug })}
            className="flex items-center gap-2"
          >
            {isAvailable ? (
              <a href={channel.url} target="_blank" rel="noopener noreferrer">
                <Image src={channel.logo} alt={channel.name} width={24} height={24} className="h-6 w-auto" />
                <span>ซื้อที่ {channel.name}</span>
              </a>
            ) : (
              <>
                <Image src={channel.logo} alt={channel.name} width={24} height={24} className="h-6 w-auto opacity-50" />
                <span className="opacity-50">รออัปเดต</span>
              </>
            )}
          </Button>
        );
      })}
    </div>
  );
}
