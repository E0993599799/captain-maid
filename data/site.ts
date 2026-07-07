export const siteConfig = {
  name: 'Captain Maid',
  brandName: 'Captain Maid',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://captain-maid.vercel.app',
  phone: '[รอข้อมูล]',
  email: '[รอข้อมูล]',
  lineOA: '[รอข้อมูล]',
  socials: {
    facebook: '[รอข้อมูล]',
    instagram: '[รอข้อมูล]',
  },
  defaultOgImage: '/images/og-image.png',
  seo: {
    title: 'Captain Maid | Premium Home Cleaning Products',
    description: 'Modern and safe cleaning solutions for your home. Plant-based and pH neutral formulas.',
    keywords: ['cleaning', 'home care', 'captain maid', 'floor cleaner'],
  },
  highlights: [
    'Fast Drying (1 Min)',
    '5-FREE Formula',
    'Plant-Based Surfactant',
    'Robot Friendly',
  ],
};

export const site = siteConfig;
