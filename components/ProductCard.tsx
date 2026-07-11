'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Star } from 'lucide-react';
import type { Product } from '@/data/products';
import { trackEvent } from '@/lib/analytics';
import { ProductBadges } from './ProductBadges';

type LegacyProps = {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  price?: number;
  priceThb?: number;
  originalPrice?: number;
  originalPriceThb?: number;
  image?: string;
  category?: string;
  badge?: string;
  inStock?: boolean;
  featured?: boolean;
};

type ProductCardProps = {
  product?: Product;
  className?: string;
} & LegacyProps;

export function ProductCard(props: ProductCardProps) {
  const pathname = usePathname();
  const product = props.product;
  const name = product ? product.productName.en : (props.name ?? '[รอข้อมูล]');
  const description = product ? product.shortDescription.en : (props.description ?? '[รอข้อมูล]');
  const category = product ? product.category.en : (props.category ?? '[รอข้อมูล]');
  const image = product?.images?.[0] ?? props.image ?? '/images/heroes/captain-maid-hero.png';
  const imageAlt = name;
  const slugOrId = product?.slug ?? props.slug ?? props.id ?? '#';
  const localePrefix = pathname.split('/')[1];
  const isLocaleRoute = localePrefix === 'th' || localePrefix === 'en';
  const href = product?.slug
    ? `/products/${product.slug}`
    : props.id
      ? `${isLocaleRoute ? `/${localePrefix}` : ''}/products/${props.id}`
      : `/products/${slugOrId}`;
  const priceText = product?.priceText ?? (typeof props.priceThb === 'number' ? `฿${props.priceThb}` : typeof props.price === 'number' ? `฿${props.price}` : '[รอข้อมูล]');
  const status = product?.status ?? (props.inStock === false ? 'สินค้าหมด' : 'พร้อมวางขาย');
  const badgeLabels = product ? [product.filters.scent, ...product.filters.need.slice(0, 2)] : [props.badge].filter(Boolean) as string[];
  const productProperties = product ? [product.shortDescription.en, product.seoDescription.en].filter(Boolean) : [];
  const rating = product?.rating ?? 4.8;
  const reviewCount = product?.reviewCount ?? 0;


  return (
    <article className={`overflow-hidden rounded-[32px] border border-cm-border-soft bg-white shadow-[0_16px_40px_rgba(10,86,194,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(10,86,194,0.12)] ${props.className ?? ''}`}>
      <Link
        href={href}
        onClick={() => trackEvent('click_product_card', { slug: slugOrId, product_name: name })}
        className="block"
      >
        <div className="relative aspect-[4/5] bg-captain-soft">
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2 pr-3">
            <span className="rounded-full bg-captain-primary px-3 py-1 text-xs font-semibold text-white">{category}</span>
            {status ? <span className="rounded-full bg-captain-white/95 px-3 py-1 text-xs font-semibold text-captain-text">{status}</span> : null}
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-captain-dark">Captain Maid</p>
          <h3 className="mt-1 text-lg font-bold text-captain-text">{name}</h3>
          <p className="mt-2 text-sm leading-6 text-captain-muted">{description}</p>
          {productProperties.length ? (
            <ul className="mt-3 space-y-2 text-xs leading-5 text-captain-muted">
              {productProperties.slice(0, 3).map((item: string) => (
                <li key={item} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-captain-primary" />{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-captain-text">{rating}</span>
          {reviewCount > 0 && <span className="text-xs text-captain-muted">({reviewCount})</span>}
        </div>
        {badgeLabels.length ? <ProductBadges badges={badgeLabels} /> : null}
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-bold text-captain-primary">{priceText}</span>
          <Link
            href={href}
            onClick={() => trackEvent('click_product_card', { slug: slugOrId, product_name: name, cta: 'view_detail' })}
            className="rounded-full bg-cm-primary-blue px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-cm-navy active:scale-95 shadow-md shadow-cm-primary-blue/10 hover:shadow-lg"
          >
            ดูรายละเอียด
          </Link>
        </div>
        {badgeLabels.length ? (
          <div className="flex flex-wrap gap-2">
            {badgeLabels.filter(Boolean).map((label) => (
              <span key={label} className="rounded-full bg-captain-soft px-3 py-1 text-xs font-semibold text-captain-text">
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
