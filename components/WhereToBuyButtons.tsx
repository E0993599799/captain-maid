'use client';

import { trackEvent } from '@/lib/analytics';
import { Button } from './ui/button';

interface Channel {
  name: string;
  url: string;
  logo: string;
  status?: string;
  eventName?: string;
}

interface WhereToBuyButtonsProps {
  product?: {
    homeproUrl?: string;
    shopeeUrl?: string;
    lazadaUrl?: string;
    tiktokUrl?: string;
    lineUrl?: string;
    slug: string;
  };
  links?: Channel[];
  className?: string;
}

export function WhereToBuyButtons({ product, links, className }: WhereToBuyButtonsProps) {
  const channels = links || [
    { name: 'HomePro', url: product?.homeproUrl || '', logo: '/images/retailers/HomePro_Logo.svg', eventName: 'click_homepro' },
    { name: 'Shopee', url: product?.shopeeUrl || '', logo: '/images/retailers/Shopee.svg', eventName: 'click_shopee' },
    { name: 'Lazada', url: product?.lazadaUrl || '', logo: '/images/retailers/Lazada_(2019).svg', eventName: 'click_lazada' },
    { name: 'TikTok', url: product?.tiktokUrl || '', logo: '/images/retailers/TikTok_logo.svg', eventName: 'click_tiktok' },
    { name: 'LINE', url: product?.lineUrl || '', logo: '/images/retailers/LINE_Shopping.svg', eventName: 'click_line' },
  ];

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {channels.map((channel: Channel) => {
        const isAvailable = channel.url && !channel.url.startsWith('[รอข้อมูล]') && channel.status !== 'coming-soon';
        const eventName = channel.eventName && ['click_line','click_call','click_email','click_homepro','click_shopee','click_lazada','click_tiktok','view_product','view_blog','filter_product','click_product_card','click_blog_card'].includes(channel.eventName)
          ? channel.eventName
          : 'click_channel';
        return (
          <Button
            key={channel.name}
            variant="outline"
            asChild={Boolean(isAvailable)}
            disabled={!isAvailable}
            onClick={() => isAvailable && trackEvent(eventName as any, { channel: channel.name })}
            className="flex items-center gap-2"
          >
            {isAvailable ? (
              <a href={channel.url} target="_blank" rel="noopener noreferrer">
                <img src={channel.logo} alt={channel.name} className="h-6 w-auto" />
                <span>ซื้อที่ {channel.name}</span>
              </a>
            ) : (
              <>
                <img src={channel.logo} alt={channel.name} className="h-6 w-auto opacity-50" />
                <span className="opacity-50">รออัปเดต</span>
              </>
            )}
          </Button>
        );
      })}
    </div>
  );
}
