export interface WhereToBuyChannel {
  name: string;
  logo: string; // Path relative to /public
  url: string;
  status: 'available' | 'coming-soon';
}

export const whereToBuyChannels: WhereToBuyChannel[] = [
  {
    name: 'HomePro',
    logo: '/images/retailers/HomePro_Logo.svg',
    url: 'https://www.homepro.co.th/search?q=captain%20maid',
    status: 'available',
  },
  {
    name: 'Shopee',
    logo: '/images/retailers/Shopee.svg',
    url: '[รอข้อมูล]',
    status: 'coming-soon',
  },
  {
    name: 'Lazada',
    logo: '/images/retailers/Lazada_(2019).svg',
    url: '[รอข้อมูล]',
    status: 'coming-soon',
  },
  {
    name: 'TikTok Shop',
    logo: '/images/retailers/TikTok_logo.svg',
    url: '[รอข้อมูล]',
    status: 'coming-soon',
  },
  {
    name: 'LINE Shopping',
    logo: '/images/retailers/LINE_Shopping.svg',
    url: '[รอข้อมูล]',
    status: 'coming-soon',
  },
];
