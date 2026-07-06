'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin, ChevronUp } from 'lucide-react';
import { Link } from '@/lib/navigation';

export const Footer = () => {
  const t = useTranslations();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <footer className="bg-[#001360] text-white pt-16 md:pt-24 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-12">
                <Image
                  src="/images/logos/captain-maid-logo.jpg"
                  alt="Captain Maid"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <h3 className="font-script text-2xl text-white">Captain Maid</h3>
            </div>
            <p className="text-[#b0d0f0] text-sm mb-6">
              {t('footer.brand')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1070b0] hover:bg-[#02a6e3] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1070b0] hover:bg-[#02a6e3] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1070b0] hover:bg-[#02a6e3] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1070b0] hover:bg-[#02a6e3] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h4 className="font-bold text-lg mb-6">Products</h4>
            <ul className="space-y-3 text-[#b0d0f0]">
              <motion.li variants={linkVariants}>
                <a href="#products" className="hover:text-[#02a6e3] transition-colors">Glass Cleaner</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#products" className="hover:text-[#02a6e3] transition-colors">Bathroom Cleaner</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#products" className="hover:text-[#02a6e3] transition-colors">Kitchen Cleaner</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#products" className="hover:text-[#02a6e3] transition-colors">Floor Cleaner</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#products" className="hover:text-[#02a6e3] transition-colors">Drain Solutions</a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h4 className="font-bold text-lg mb-6">{t('footer.company') || 'Company'}</h4>
            <ul className="space-y-3 text-[#b0d0f0]">
              <motion.li variants={linkVariants}>
                <Link href="/about" className="hover:text-[#02a6e3] transition-colors">{t('footer.about')}</Link>
              </motion.li>
              <motion.li variants={linkVariants}>
                <Link href="/blog" className="hover:text-[#02a6e3] transition-colors">{t('footer.blog')}</Link>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-[#02a6e3] transition-colors">{t('footer.faq')}</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <Link href="/contact" className="hover:text-[#02a6e3] transition-colors">{t('footer.contact')}</Link>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-[#02a6e3] transition-colors">Careers</a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Support & Legal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h4 className="font-bold text-lg mb-6">Support & Legal</h4>
            <ul className="space-y-3 text-[#b0d0f0]">
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-[#02a6e3] transition-colors">Shipping Info</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-[#02a6e3] transition-colors">Returns & Refunds</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-[#02a6e3] transition-colors">Privacy Policy</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-[#02a6e3] transition-colors">Terms of Service</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-[#02a6e3] transition-colors">Cookie Policy</a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 p-8 bg-gradient-to-r from-[#02a6e3] to-[#0090c8] rounded-xl"
        >
          <div className="max-w-md">
            <h4 className="font-bold text-lg mb-2">Stay Updated</h4>
            <p className="text-white/80 mb-4">Get exclusive offers and cleaning tips delivered to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-[#001360] font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-[#1070b0] mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#b0d0f0] text-sm text-center md:text-left">
            <p>{t('footer.copyright')}</p>
          </div>

          {/* Company Logo */}
          <div className="flex items-center gap-4">
            <div className="relative h-8 w-32">
              <Image
                src="/images/logos/arigeo-logo.webp"
                alt="ARIGEO Inc."
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#1070b0] hover:bg-[#02a6e3] transition-colors"
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