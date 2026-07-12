import type { FaqItem } from '@/data/faqs';

export type HomeCopy = {
  hero: { badge: string; title: string; description: string; primary: string; secondary: string };
  solutions: { badge: string; title: string; subtitle: string; cards: { title: string; description: string; icon: 'chef' | 'bath' | 'sparkles' | 'shirt' | 'package' }[] };
  products: { badge: string; title: string; subtitle: string };
  trust: { badge: string; title: string; subtitle: string };
  blog: { badge: string; title: string; subtitle: string; cta: string };
  faq: { badge: string; title: string; subtitle: string; items: FaqItem[] };
  cta: { title: string; subtitle: string; primary: string; secondary: string };
  footer: { description: string; copyright: string; links: { solutions: string; products: string; trust: string; faq: string } };
};
