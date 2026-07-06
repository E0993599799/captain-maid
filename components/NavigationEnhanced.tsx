'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart, Search, Heart } from 'lucide-react';

export const NavigationEnhanced = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);
  const [lang, setLang] = useState<'en' | 'th'>('th');
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as 'en' | 'th' || 'th';
    setLang(savedLang);
    document.documentElement.lang = savedLang;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'th' : 'en';
    setLang(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    window.location.reload();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent('Captain Maid ' + searchQuery)}`, '_blank');
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const menuItems = [
    { id: 'shop', label: 'สินค้า', href: '#products' },
    { id: 'essentials', label: 'ผลิตภัณฑ์', href: '#products' },
    { id: 'blog', label: 'บทความ', href: '/blog' },
    { id: 'about', label: 'เกี่ยวกับเรา', href: '#about' },
  ];

  return (
    <>
      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="mx-auto mt-24 max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาสินค้า..."
                className="w-full rounded-2xl border-0 bg-white px-6 py-4 pr-14 text-lg shadow-2xl outline-none ring-2 ring-[#02a6e3]/20 focus:ring-[#02a6e3]"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-[#02a6e3] p-2.5 text-white transition hover:bg-[#0190c7]"
              >
                <Search size={20} />
              </button>
            </form>
            <p className="mt-3 text-center text-sm text-white/70">
              กด Enter เพื่อค้นหาหรือ Esc เพื่อปิด
            </p>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Single header row */}
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative h-10 w-10 md:h-12 md:w-12">
                <Image
                  src="/images/logos/captain-maid-logo.webp"
                  alt="Captain Maid"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="font-script text-xl md:text-2xl text-[#001360] group-hover:text-[#02a6e3] transition-colors">
                Captain Maid
              </span>
            </Link>

            {/* Desktop Menu — centered */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm font-medium text-[#222222] hover:text-[#02a6e3] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="ค้นหา"
              >
                <Search size={20} className="text-[#222222]" />
              </button>

              {/* Wishlist */}
              <button className="hidden md:flex p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="รายการโปรด">
                <Heart size={20} className="text-[#222222]" />
              </button>

              {/* Cart */}
              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="ตะกร้าสินค้า">
                <ShoppingCart size={20} className="text-[#222222]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#02a6e3] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* TH/EN Toggle */}
              {mounted && (
                <button
                  onClick={toggleLanguage}
                  className="ml-1 flex h-8 items-center gap-1 rounded-lg border border-slate-300 px-2.5 text-xs font-semibold text-slate-600 transition hover:border-[#02a6e3] hover:text-[#02a6e3]"
                  aria-label={lang === 'th' ? 'เปลี่ยนเป็นภาษาอังกฤษ' : 'Switch to Thai'}
                >
                  <span className={lang === 'th' ? 'text-[#02a6e3]' : 'text-slate-400'}>TH</span>
                  <span className="text-slate-300">/</span>
                  <span className={lang === 'en' ? 'text-[#02a6e3]' : 'text-slate-400'}>EN</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="เมนู"
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