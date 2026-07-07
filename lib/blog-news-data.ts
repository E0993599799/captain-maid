export type BlogCategory = 'Event' | 'Product' | 'Knowledge' | 'Award' | 'News';

export interface BlogNewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  image: string;
  slug: string;
  featured?: boolean;
}

export const BLOG_NEWS_ARTICLES: BlogNewsArticle[] = [
  {
    id: 1,
    title: 'Captain Maid เข้าร่วมงาน Thailand Cleaning & Sanitation Expo 2026',
    excerpt: 'อีกหนึ่งก้าวสำคัญของแบรนด์ในการนำเสนอผลิตภัณฑ์นวัตกรรมและสร้างเครือข่ายกับพันธมิตรในอุตสาหกรรม',
    category: 'Event',
    date: '24 Jun 2026',
    image: '/images/products/green-bottle.jpg',
    slug: 'cleaning-expo-2026',
    featured: true,
  },
  {
    id: 2,
    title: 'เปิดตัวผลิตภัณฑ์ใหม่ Tea Tree Flash สำหรับการทำความสะอาดที่ลึกซึ้ง',
    excerpt: 'ผลิตภัณฑ์ใหม่ที่ออกแบบโดยคำนึงถึงคุณภาพ ความปลอดภัย และประสบการณ์ของผู้ใช้เป็นหลัก',
    category: 'Product',
    date: '15 Jun 2026',
    image: '/images/products/purple-bottle.jpg',
    slug: 'tea-tree-flash-launch',
  },
  {
    id: 3,
    title: 'Captain Maid ได้รับการรับรอง Green Product Mark จากหน่วยงานสิ่งแวดล้อม',
    excerpt: 'การรับรองนี้เป็นการยืนยันว่าผลิตภัณฑ์ของเราเป็นมิตรต่อสิ่งแวดล้อมและปลอดภัยต่อครอบครัว',
    category: 'Award',
    date: '08 Jun 2026',
    image: '/images/products/pink-bottle.jpg',
    slug: 'green-product-award',
  },
  {
    id: 4,
    title: 'เคล็ดลับการเลือกผลิตภัณฑ์ทำความสะอาดให้เหมาะกับความต้องการของครัวเรือน',
    excerpt: 'สรุปหลักการเลือกใช้ผลิตภัณฑ์อย่างถูกต้อง เพื่อให้ได้ผลลัพธ์ที่ดีและคุ้มค่ามากที่สุด',
    category: 'Knowledge',
    date: '01 Jun 2026',
    image: '/images/heroes/captain-maid-hero.png',
    slug: 'choosing-right-product',
  },
  {
    id: 5,
    title: 'สูตร 5 FREE: ความปลอดภัยเป็นอันดับหนึ่งในการออกแบบผลิตภัณฑ์',
    excerpt: 'เรามุ่งมั่นในการสร้างผลิตภัณฑ์ที่ปลอดภัยสำหรับทุกคนในครอบครัว โดยไม่ลดทุนด้านประสิทธิภาพ',
    category: 'News',
    date: '25 May 2026',
    image: '/images/products/homepro_product_1313729.jpg',
    slug: '5-free-formula',
  },
  {
    id: 6,
    title: 'เบื้องหลังการพัฒนาผลิตภัณฑ์ Lavender Kerry: ความหอมและผ่อนคลาย',
    excerpt: 'ค้นพบวิธีการคัดเลือกส่วนผสมธรรมชาติและการทดสอบคุณภาพเข้มงวดของผลิตภัณฑ์ยอดนิยม',
    category: 'Product',
    date: '18 May 2026',
    image: '/images/products/homepro_product_1313735.jpg',
    slug: 'lavender-kerry-story',
  },
];

export function getFeaturedArticle(): BlogNewsArticle | undefined {
  return BLOG_NEWS_ARTICLES.find((article) => article.featured);
}

export function getRecentArticles(limit: number = 6): BlogNewsArticle[] {
  return BLOG_NEWS_ARTICLES.slice(0, limit);
}

export function getArticleBySlug(slug: string): BlogNewsArticle | undefined {
  return BLOG_NEWS_ARTICLES.find((article) => article.slug === slug);
}

export function getCategoryLabel(category: BlogCategory): string {
  const labels: Record<BlogCategory, string> = {
    Event: 'กิจกรรม',
    Product: 'สินค้า',
    Knowledge: 'ความรู้',
    Award: 'รางวัล',
    News: 'ข่าวสาร',
  };
  return labels[category];
}

export function getCategoryColor(category: BlogCategory): string {
  const colors: Record<BlogCategory, string> = {
    Event: 'bg-blue-100 text-blue-800',
    Product: 'bg-green-100 text-green-800',
    Knowledge: 'bg-purple-100 text-purple-800',
    Award: 'bg-yellow-100 text-yellow-800',
    News: 'bg-red-100 text-red-800',
  };
  return colors[category];
}
