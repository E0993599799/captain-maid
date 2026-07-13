'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ShoppingCart, Search, Heart, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import logoMark from './assets/captain-maid-logo.webp';
import { LanguageToggle } from './LanguageToggle';

/**
 * Enhanced Navigation component with Smart Header scrolling (Sammakorn-style)
 * Features auto-hide on scroll down and reveal on scroll up
 * Premium minimalist colors, typography, and logo transition
 */
export const NavigationEnhanced = () => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cartCount] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;

      // Smart Header: hide when scrolling down, show when scrolling up
      if (scrollY > lastScrollY && scrollY > 80) {
        setIsVisible(false);
      } else if (scrollY < lastScrollY) {
        setIsVisible(true);
      }

      setIsScrolled(scrollY > 20);
      lastScrollY = scrollY <= 0 ? 0 : scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { id: 'home', labelKey: 'navigation.main.home', href: '/' },
    { id: 'products', labelKey: 'navigation.main.shop', href: '/products' },
    { id: 'about', labelKey: 'navigation.main.aboutUs', href: '/about' },
    { id: 'blog', labelKey: 'navigation.main.blog', href: '/blog' },
    { id: 'faq', labelKey: 'navigation.main.faq', href: '/faq' },
    { id: 'contact', labelKey: 'navigation.main.contact', href: '/contact' },
  ];

  const productLinks = [
    { label: 'Floor Cleaner', href: '/products?category=floor' },
    { label: 'Bathroom Cleaner', href: '/products?category=bathroom' },
    { label: 'Kitchen Cleaner', href: '/products?category=kitchen' },
    { label: 'Glass Cleaner', href: '/products?category=glass' },
    { label: 'View All', href: '/products' },
  ];

  return (
    <>
      {/* Top Utility Bar (Premium Soft Style) */}
      <div 
        className={`hidden md:block bg-cm-surface-light text-cm-text-secondary h-9 border-b border-cm-border-soft/40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-full gap-6 text-[11px] font-medium tracking-wider font-body">
            <Link
              href="/faq"
              className="hover:text-captain-primary transition-colors duration-180"
            >
              {t('navigation.main.faq') || 'FAQ'}
            </Link>
            <div className="h-3 w-px bg-cm-border-soft/60"></div>
            <Link
              href="/contact"
              className="hover:text-captain-primary transition-colors duration-180"
            >
              {t('navigation.main.contact') || 'Contact'}
            </Link>
            <div className="h-3 w-px bg-cm-border-soft/60"></div>
            <span className="text-cm-text-secondary/80 font-normal">
              {t('navigation.banner.freeDelivery') || 'FREE Delivery on all orders!'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation (Autohide on Scroll) */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0' : 'md:-translate-y-9 -translate-y-full'
        } ${
          isScrolled
            ? 'bg-captain-white/95 backdrop-blur-md shadow-[0_4px_25px_-4px_rgba(6,58,120,0.06)] border-b border-cm-border-soft/60'
            : 'bg-captain-white border-b border-cm-border-soft'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
          }`}>
            {/* Left: Search (Desktop) */}
            <div className="hidden md:flex items-center">
              <button className="p-2 rounded-[14px] hover:bg-captain-soft text-cm-text-secondary hover:text-captain-primary transition-all duration-300">
                <Search size={18} />
              </button>
            </div>

            {/* Center: Logo and Brand (Smooth Scale Transition) */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'h-9 w-9 md:h-10 md:w-10' : 'h-11 w-11 md:h-14 md:w-14'
              }`}>
                <Image
                  src={logoMark}
                  alt="Captain Maid Logo"
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <span className="hidden md:inline font-heading text-xl md:text-2xl font-bold text-captain-text group-hover:text-captain-primary transition-colors duration-300">
                Captain Maid
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-7">
              {menuItems.map((item) => {
                if (item.id === 'products') {
                  // Dropdown for products
                  return (
                    <div key={item.id} className="relative group py-2">
                      <button className="flex items-center gap-1 text-sm font-semibold text-cm-text-secondary hover:text-captain-primary transition-colors duration-300">
                        {t(item.labelKey)}
                        <ChevronDown size={14} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden min-w-56 rounded-2xl border border-cm-border-soft bg-captain-white p-2.5 shadow-[0_10px_40px_-6px_rgba(6,58,120,0.08)] group-hover:block transition-all duration-300 animate-in fade-in-50 slide-in-from-top-2">
                        {productLinks.map((prod) => (
                          <Link
                            key={prod.label}
                            href={prod.href}
                            className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-cm-text-secondary hover:bg-cm-sky-light hover:text-captain-primary transition-all duration-200"
                          >
                            {prod.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Regular link
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-sm font-semibold text-cm-text-secondary hover:text-captain-primary transition-colors duration-300"
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3.5">
              {/* Language Switcher (Desktop - Quiet Luxury Minimal Style) */}
              <div className="hidden md:block mr-2 border-r border-cm-border-soft/60 pr-5">
                <LanguageToggle />
              </div>

              {/* Heart / Wishlist */}
              <button className="hidden md:flex p-2 rounded-[14px] hover:bg-captain-soft text-cm-text-secondary hover:text-captain-primary transition-all duration-300">
                <Heart size={18} />
              </button>

              {/* Shopping Cart */}
              <button className="relative p-2 rounded-[14px] hover:bg-captain-soft text-cm-text-secondary hover:text-captain-primary transition-all duration-300">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-captain-primary text-white text-[9px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-[14px] hover:bg-captain-soft text-cm-text-secondary hover:text-captain-primary transition-all duration-300"
              >
                {isOpen ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-cm-border-soft py-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="px-2 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block px-4 py-2.5 rounded-[14px] text-sm font-semibold text-cm-text-secondary hover:bg-cm-sky-light hover:text-captain-primary transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>

              <div className="border-t border-cm-border-soft/60 pt-4 px-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-cm-text-secondary/60">Language / ภาษา</span>
                <LanguageToggle />
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
