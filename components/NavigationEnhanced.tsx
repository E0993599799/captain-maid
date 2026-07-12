'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ShoppingCart, Search, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import logoMark from './assets/captain-maid-logo.webp';

/**
 * Enhanced Navigation component with top utility bar and main navigation
 * Features Captain Maid brand styling with aqua and navy colors
 */
export const NavigationEnhanced = () => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(lastScrollY > 10);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const menuItems = [
    { id: 'shop', labelKey: 'navigation.main.shop', href: '/products' },
    { id: 'products', labelKey: 'navigation.main.essentials', href: '/products' },
    { id: 'best-sellers', labelKey: 'navigation.main.bestSellers', href: '/products' },
    { id: 'about', labelKey: 'navigation.main.aboutUs', href: '/about' },
    { id: 'blog', labelKey: 'navigation.main.blog', href: '/blog' },
  ];

  const productLinks = [
    { label: 'Floor Cleaner', href: '/products?category=floor' },
    { label: 'Bathroom Cleaner', href: '/products?category=bathroom' },
    { label: 'Kitchen Cleaner', href: '/products?category=kitchen' },
    { label: 'Glass Cleaner', href: '/products?category=glass' },
    { label: 'View All', href: '/products' },
  ];

  const supportLinks = [
    { label: 'Support', href: '/contact' },
    { label: 'About us', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ];


  return (
    <>
      {/* Top Utility Bar */}
      <div className="hidden md:block bg-captain-text text-white h-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-full gap-6 text-xs font-body">
            <a
              href="#help"
              className="hover:text-captain-primary transition-colors duration-180"
            >
              {t('navigation.main.help') || 'Help'}
            </a>
            <div className="h-4 w-px bg-white/30"></div>
            <a
              href="#contact"
              className="hover:text-captain-primary transition-colors duration-180"
            >
              {t('navigation.main.contact') || 'Contact'}
            </a>
            <div className="h-4 w-px bg-white/30"></div>
            <span className="text-white/90">
              {t('navigation.banner.freeDelivery') || 'FREE Delivery on all orders!'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-captain-white/95 backdrop-blur-md shadow-md'
            : 'bg-captain-white border-b border-captain-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Search (Desktop) */}
            <div className="hidden md:flex items-center">
              <button className="p-2 rounded-[16px] hover:bg-captain-soft transition-colors duration-180">
                <Search size={20} className="text-captain-text" />
              </button>
            </div>

            {/* Center: Logo and Brand */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative h-10 w-10 md:h-12 md:w-12">
                <Image
                  src={logoMark}
                  alt="Captain Maid"
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <span className="hidden md:inline font-heading text-xl md:text-2xl font-bold text-captain-text group-hover:text-captain-primary transition-colors duration-180">
                Captain Maid
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <div className="relative group">
                <button className="text-sm font-medium text-captain-text hover:text-captain-dark transition-colors duration-180">
                  {t('navigation.main.shop') || 'Products'}
                </button>
                <div className="absolute left-0 top-full mt-3 hidden min-w-64 rounded-2xl border border-captain-border bg-captain-white p-3 shadow-brand group-hover:block">
                  {productLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-captain-text hover:bg-captain-soft"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              {menuItems.filter((item) => item.id !== 'shop').map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm font-medium text-captain-text hover:text-captain-dark transition-colors duration-180"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="relative group">
                <button className="text-sm font-medium text-captain-text hover:text-captain-dark transition-colors duration-180">
                  Support
                </button>
                <div className="absolute right-0 top-full mt-3 hidden min-w-48 rounded-2xl border border-captain-border bg-captain-white p-3 shadow-brand group-hover:block">
                  {supportLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-captain-text hover:bg-captain-soft"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Heart / Wishlist */}
              <button className="hidden md:flex p-2 rounded-[16px] hover:bg-captain-soft transition-colors duration-180">
                <Heart size={20} className="text-captain-text" />
              </button>

              {/* Shopping Cart */}
              <button className="relative p-2 rounded-[16px] hover:bg-captain-soft transition-colors duration-180">
                <ShoppingCart size={20} className="text-captain-text" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-captain-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-[16px] hover:bg-captain-soft transition-colors duration-180"
              >
                {isOpen ? (
                  <X size={24} className="text-captain-text" />
                ) : (
                  <Menu size={24} className="text-captain-text" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
          <div className="md:hidden border-t border-captain-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block px-3 py-2 rounded-[16px] text-sm font-medium text-captain-text hover:bg-captain-soft transition-colors duration-180"
                  onClick={() => setIsOpen(false)}
                >
                  {item.id === 'shop' ? 'Products' : t(item.labelKey)}
                </Link>
              ))}
              <div className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-captain-muted">Products</div>
              {productLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 rounded-[16px] text-sm font-medium text-captain-text hover:bg-captain-soft transition-colors duration-180"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-captain-muted">Support</div>
              {supportLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 rounded-[16px] text-sm font-medium text-captain-text hover:bg-captain-soft transition-colors duration-180"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          )}
        </div>
      </nav>
    </>
  );
};
