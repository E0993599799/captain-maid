'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const navLinks = [
    { href: '/#products', label: t('navigation.main.shop') || 'Products' },
    { href: '/blog', label: t('navigation.main.blog') || 'Blog' },
    { href: '/#about', label: t('navigation.main.aboutUs') || 'About' },
    { href: '/#contact', label: t('navigation.main.contact') || 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/10">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white hover:text-captain-primary transition-colors"
          aria-label="Captain Maid Home"
        >
          🧹 <span className="hidden sm:inline">Captain Maid</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-captain-primary transition-colors duration-300 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/20 border-t border-white/10">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
