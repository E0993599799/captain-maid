'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ShoppingCart, Search, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

export const NavigationEnhanced = () => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'shop', labelKey: 'nav.shop', href: '/products' },
    { id: 'essentials', labelKey: 'nav.essentials', href: '/products' },
    { id: 'best-sellers', labelKey: 'nav.bestSellers', href: '/products' },
    { id: 'about', labelKey: 'nav.about', href: '/about' },
  ];

  return (
    <>
      {/* Top Bar — MACC Essentials style */}
      <div className="hidden md:block top-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-8 gap-6 text-xs text-[#4a4b4d]">
            <a href="#" className="hover:text-[#02a6e3] transition-colors">Return</a>
            <a href="#" className="hover:text-[#02a6e3] transition-colors">Help</a>
            <a href="#" className="hover:text-[#02a6e3] transition-colors">Register / Sign In</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Search */}
            <div className="hidden md:flex items-center">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Search size={20} className="text-[#222222]" />
              </button>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative h-10 w-10 md:h-12 md:w-12">
                <Image
                  src="/images/logos/captain-maid-logo.webp"
                  alt="Captain Maid"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="font-script text-2xl md:text-3xl text-[#001360] group-hover:text-[#02a6e3] transition-colors">
                Captain Maid
              </span>
            </Link>

            {/* Desktop Menu — MACC style */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm font-medium text-[#222222] hover:text-[#02a6e3] transition-colors duration-200 tracking-wide"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Heart / Wishlist */}
              <button className="hidden md:flex p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Heart size={20} className="text-[#222222]" />
              </button>

              {/* Shopping Cart — MACC badge style */}
              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <ShoppingCart size={20} className="text-[#222222]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#02a6e3] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isOpen ? (
                  <X size={24} className="text-[#222222]" />
                ) : (
                  <Menu size={24} className="text-[#222222]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-slate-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-[#222222] hover:bg-slate-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.labelKey)}
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