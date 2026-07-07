'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface RetailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const RETAILERS = [
  {
    name: 'Shopee',
    logo: '/images/retailers/Shopee.svg',
    url: 'https://shopee.co.th/search?fe_filter_options=%5B%7B%22group_name%22%3A%22FACET%22%2C%22values%22%3A%5B%2211045823%22%5D%7D%2C%7B%22group_name%22%3A%22BRANDS%22%2C%22values%22%3A%5B%226055490%22%2C%226035765%22%5D%7D%5D&keyword=%E0%B8%81%E0%B8%B1%E0%B8%9B%E0%B8%95%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%94&page=0',
    bgClass: 'hover:bg-orange-50 border-orange-200 hover:border-orange-400',
    textClass: 'text-orange-600',
  },
  {
    name: 'HomePro',
    logo: '/images/retailers/HomePro_Logo.svg',
    url: 'https://www.homepro.co.th/search?ca=HHP0605&q=captain%20maid&page_ga=search_suggest',
    bgClass: 'hover:bg-blue-50 border-blue-200 hover:border-blue-400',
    textClass: 'text-blue-600',
  },
];

export const RetailerModal = ({ isOpen, onClose, productName }: RetailerModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">เลือกช่องทางสั่งซื้อ</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="ปิด"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product name */}
        <p className="mb-6 text-sm leading-6 text-slate-500 line-clamp-2">{productName}</p>

        {/* Retailer list */}
        <div className="flex flex-col gap-4">
          {RETAILERS.map((retailer) => (
            <a
              key={retailer.name}
              href={retailer.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${retailer.bgClass}`}
            >
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-2 shadow-sm">
                <Image
                  src={retailer.logo}
                  alt={retailer.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">{retailer.name}</p>
                <p className={`text-xs font-medium ${retailer.textClass}`}>
                  สั่งซื้อสินค้า
                </p>
              </div>
              <svg className="h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};