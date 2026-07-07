'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeSuccess(true);
    setEmail('');
    setTimeout(() => setSubscribeSuccess(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const footerLinks = [
    {
      title: 'Products',
      links: [
        { name: 'All Products', href: '/products' },
        { name: 'New Arrivals', href: '/products?sort=new' },
        { name: 'Best Sellers', href: '/products?sort=popular' },
        { name: 'On Sale', href: '/products?filter=sale' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Accessibility', href: '/accessibility' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-neutral-900 dark:bg-black text-neutral-100 dark:text-neutral-200">
      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
      >
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-12 mb-12 pb-12 border-b border-neutral-800">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🧹</span>
              <span className="text-xl font-bold text-white">Captain Maid</span>
            </Link>
            <p className="text-sm text-neutral-400 mb-6">
              Premium home cleaning products made from natural ingredients for a healthier home.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-teal-600 dark:bg-neutral-800 dark:hover:bg-teal-600 flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <motion.div key={column.title} variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-teal-400 transition-colors relative inline-block group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-teal-900 to-emerald-900 rounded-xl p-8 lg:p-10 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-neutral-300">
                Get exclusive offers, cleaning tips, and product updates delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 min-w-full md:min-w-fit">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-2 focus:outline-teal-500 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                {subscribeSuccess ? '✓ Subscribed' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-neutral-800"
        >
          {[
            {
              icon: MapPin,
              title: 'Address',
              content: '123 Clean Street, Bangkok, Thailand 10110',
            },
            {
              icon: Phone,
              title: 'Phone',
              content: '+66 (0) 2-xxx-xxxx',
            },
            {
              icon: Mail,
              title: 'Email',
              content: 'support@captainmaid.com',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={idx} variants={itemVariants} className="flex gap-4">
                <div className="flex-shrink-0">
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-neutral-400">{item.content}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-neutral-400">
            © 2024 Captain Maid. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400">Secure Payments:</span>
            <div className="flex gap-2">
              {['💳', '🏦', '📱', '✅'].map((icon, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 bg-neutral-800 rounded flex items-center justify-center text-sm"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll to Top */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Trust Badges Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-neutral-800 dark:bg-neutral-950 py-8 border-t border-neutral-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-neutral-400 mb-6">Certified and Trusted By</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
            {[
              '🏆 Award Winning',
              '✅ Eco Certified',
              '🛡️ Money Back',
              '🚚 Free Shipping',
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-center text-xs text-neutral-400"
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
