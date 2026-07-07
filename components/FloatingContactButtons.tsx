'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

export function FloatingContactButtons() {
  const contacts = [
    {
      name: 'LINE',
      icon: <MessageCircle size={24} />,
      url: siteConfig.lineOA,
      eventName: 'click_line',
      label: 'LINE OA'
    },
    {
      name: 'Email',
      icon: <Mail size={24} />,
      url: `mailto:${siteConfig.email}`,
      eventName: 'click_email',
      label: 'Email'
    },
    {
      name: 'Call',
      icon: <Phone size={24} />,
      url: `tel:${siteConfig.phone}`,
      eventName: 'click_call',
      label: 'Call Us'
    },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3"
    >
      {contacts.map((contact) => {
        const isAvailable = contact.url && !contact.url.includes('[รอข้อมูล]');
        if (!isAvailable) return null;

        return (
          <a
            key={contact.name}
            href={contact.url}
            onClick={() => trackEvent(contact.eventName)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-end gap-3 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 w-14 hover:w-32"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold whitespace-nowrap">
              {contact.label}
            </span>
            {contact.icon}
          </a>
        );
      })}
    </motion.div>
  );
}
