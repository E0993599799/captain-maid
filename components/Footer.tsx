'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin, ChevronUp } from 'lucide-react';
import { Link } from '@/lib/navigation';

/**
 * Footer component with deep navy background and Captain Maid branding
 * Features company info, links, newsletter signup, and social links
 */
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
    <footer className="bg-captain-text text-white pt-16 md:pt-24 pb-8">
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
              <h3 className="font-heading text-2xl font-bold text-white">Captain Maid</h3>
            </div>
            <p className="text-captain-accent text-sm mb-6 leading-relaxed">
              {t('footer.brand') || 'Premium cleaning products for every surface in your home.'}
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[16px] bg-captain-dark hover:bg-captain-primary transition-colors duration-180"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[16px] bg-captain-dark hover:bg-captain-primary transition-colors duration-180"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[16px] bg-captain-dark hover:bg-captain-primary transition-colors duration-180"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[16px] bg-captain-dark hover:bg-captain-primary transition-colors duration-180"
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
            <h4 className="font-heading font-bold text-lg mb-6">{t('footer.products') || 'Products'}</h4>
            <ul className="space-y-3 text-captain-accent">
              <motion.li variants={linkVariants}>
                <a href="#products" className="hover:text-captain-primary transition-colors duration-180">{t('footer.glassCleanser') || 'Glass Cleaner'}</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#products" className="hover:text-captain-primary transition-colors duration-180">{t('footer.bathroomCleaner') || 'Bathroom Cleaner'}</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#products" className="hover:text-captain-primary transition-colors duration-180">{t('footer.kitchenCleaner') || 'Kitchen Cleaner'}</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#products" className="hover:text-captain-primary transition-colors duration-180">{t('footer.floorCleaner') || 'Floor Cleaner'}</a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h4 className="font-heading font-bold text-lg mb-6">{t('footer.company') || 'Company'}</h4>
            <ul className="space-y-3 text-captain-accent">
              <motion.li variants={linkVariants}>
                <Link href="/about" className="hover:text-captain-primary transition-colors duration-180">{t('footer.about') || 'About'}</Link>
              </motion.li>
              <motion.li variants={linkVariants}>
                <Link href="/blog" className="hover:text-captain-primary transition-colors duration-180">{t('footer.blog') || 'Blog'}</Link>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#faq" className="hover:text-captain-primary transition-colors duration-180">{t('footer.faq') || 'FAQ'}</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <Link href="/contact" className="hover:text-captain-primary transition-colors duration-180">{t('footer.contact') || 'Contact'}</Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Support & Legal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h4 className="font-heading font-bold text-lg mb-6">{t('footer.support') || 'Support & Legal'}</h4>
            <ul className="space-y-3 text-captain-accent">
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-captain-primary transition-colors duration-180">{t('footer.shipping') || 'Shipping Info'}</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-captain-primary transition-colors duration-180">{t('footer.returns') || 'Returns & Refunds'}</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-captain-primary transition-colors duration-180">{t('footer.privacy') || 'Privacy Policy'}</a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a href="#" className="hover:text-captain-primary transition-colors duration-180">{t('footer.terms') || 'Terms of Service'}</a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 p-8 bg-gradient-to-r from-captain-primary to-captain-dark rounded-[24px]"
        >
          <div className="max-w-md">
            <h4 className="font-heading font-bold text-lg mb-2">{t('footer.stayUpdated') || 'Stay Updated'}</h4>
            <p className="text-white/80 mb-4 text-sm">{t('footer.newsletter') || 'Get exclusive offers and cleaning tips delivered to your inbox.'}</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.enterEmail') || 'Enter your email'}
                className="flex-1 px-4 py-2 rounded-[16px] bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:border-white transition-colors duration-180"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-captain-text font-semibold rounded-[16px] hover:bg-white/90 transition-colors duration-180"
              >
                {t('footer.subscribe') || 'Subscribe'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-captain-dark mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-captain-accent text-sm text-center md:text-left">
            <p>{t('footer.copyright') || '© 2026 Captain Maid. All rights reserved.'}</p>
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
              className="p-2 rounded-[16px] bg-captain-dark hover:bg-captain-primary transition-colors duration-180"
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
