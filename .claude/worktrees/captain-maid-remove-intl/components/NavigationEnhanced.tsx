'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavigationEnhanced() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkDarkMode();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Products', href: '/#products' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white dark:bg-neutral-900 shadow-lg'
            : 'bg-white dark:bg-neutral-900 shadow-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
            >
              <span className="text-3xl">🧹</span>
              <span className="hidden sm:inline">Captain Maid</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-neutral-700 dark:text-neutral-300 font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 dark:bg-teal-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Cart Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 bg-white dark:bg-neutral-900 shadow-xl z-40 lg:hidden"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-700 dark:text-neutral-300 font-medium hover:text-teal-600 dark:hover:text-teal-400 py-2 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed nav */}
      <div className="h-20" />
    </>
  );
}
