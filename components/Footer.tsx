'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Link } from '@/lib/navigation';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-captain-text py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/images/logos/captain-maid-logo.jpg"
                alt="Captain Maid"
                className="h-12 w-12 rounded-lg object-contain"
              />
              <h3 className="font-heading text-2xl font-bold text-white">Captain Maid</h3>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-captain-accent">
              Premium cleaning products for every surface in your home.
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-medium text-captain-accent">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-180 hover:text-captain-primary">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-180 hover:text-captain-primary">Instagram</a>
              <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="transition-colors duration-180 hover:text-captain-primary">LINE</a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-heading text-lg font-bold">Products</h4>
            <ul className="space-y-3 text-captain-accent">
              <li><a href="#products" className="transition-colors duration-180 hover:text-captain-primary">Floor Cleaner</a></li>
              <li><a href="#products" className="transition-colors duration-180 hover:text-captain-primary">Bathroom Cleaner</a></li>
              <li><a href="#products" className="transition-colors duration-180 hover:text-captain-primary">Kitchen Cleaner</a></li>
              <li><a href="#products" className="transition-colors duration-180 hover:text-captain-primary">Glass Cleaner</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-heading text-lg font-bold">Company</h4>
            <ul className="space-y-3 text-captain-accent">
              <li><Link href="/about" className="transition-colors duration-180 hover:text-captain-primary">About</Link></li>
              <li><Link href="/blog" className="transition-colors duration-180 hover:text-captain-primary">Blog</Link></li>
              <li><Link href="/faq" className="transition-colors duration-180 hover:text-captain-primary">FAQ</Link></li>
              <li><Link href="/contact" className="transition-colors duration-180 hover:text-captain-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-heading text-lg font-bold">Support & Legal</h4>
            <ul className="space-y-3 text-captain-accent">
              <li><a href="#" className="transition-colors duration-180 hover:text-captain-primary">Shipping Info</a></li>
              <li><a href="#" className="transition-colors duration-180 hover:text-captain-primary">Returns & Refunds</a></li>
              <li><a href="#" className="transition-colors duration-180 hover:text-captain-primary">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors duration-180 hover:text-captain-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 mt-12 rounded-[24px] bg-gradient-to-r from-captain-primary to-captain-dark p-8 md:mb-16"
        >
          <div className="max-w-md">
            <h4 className="mb-2 font-heading text-lg font-bold">Stay Updated</h4>
            <p className="mb-4 text-sm text-white/80">Get exclusive offers and cleaning tips delivered to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-[16px] border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-white/50 transition-colors duration-180 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-[16px] bg-white px-6 py-2 font-semibold text-captain-text transition-colors duration-180 hover:bg-white/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

        <div className="mb-8 border-t border-captain-dark"></div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-captain-accent md:text-left">
            <p>© 2026 Captain Maid. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="/images/logos/captain-maid-logo.jpg"
              alt="Captain Maid"
              className="h-8 w-32 object-contain"
            />
            <button
              onClick={scrollToTop}
              className="rounded-[16px] bg-captain-dark p-2 transition-colors duration-180 hover:bg-captain-primary"
              aria-label="Scroll to top"
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
