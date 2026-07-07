export interface Product {
  id: string;
  slug: string;
  productName: { th: string; en: string };
  category: { th: string; en: string };
  scent: { th: string; en: string };
  size: string;
  shortDescription: { th: string; en: string };
  fullDescription: { th: string; en: string };
  benefits: { th: string; en: string }[];
  howToUse: { th: string; en: string }[];
  suitableFor: { th: string; en: string }[];
  cautions: { th: string; en: string }[];
  ingredients: string;
  images: string[];
  videos: string[];
  priceText: string;
  homeproUrl?: string;
  shopeeUrl?: string;
  lazadaUrl?: string;
  tiktokUrl?: string;
  lineUrl?: string;
  seoTitle: { th: string; en: string };
  seoDescription: { th: string; en: string };
  keywords: string[];
  isFeatured: boolean;
  status: 'active' | 'inactive' | 'archived';
  filters: {
    category: string;
    scent: string;
    need: string[];
  };
}

export const products: Product[] = [
  {
    id: '1313716',
    slug: 'floor-tea-tree-flash',
    productName: {
      th: 'น้ำยาทำความสะอาดพื้น กลิ่นทีทรี แฟลช',
      en: 'Floor Cleaner - Tea Tree Flash Scent',
    },
    category: { th: 'ผลิตภัณฑ์ทำความสะอาดพื้น', en: 'Floor Cleaner' },
    scent: { th: 'ทีทรี แฟลช', en: 'Tea Tree Flash' },
    size: '900ML',
    shortDescription: {
      th: 'ปลุกพลังความสดชื่นด้วยสูตรประสิทธิภาพสูง ขจัดฝุ่นและคราบฝังแน่น',
      en: 'Awaken freshness with a high-performance formula that eliminates dust and tough stains.',
    },
    fullDescription: {
      th: 'ปลุกพลังความสดชื่นให้บ้านของคุณ ด้วยน้ำยาทำความสะอาดพื้น จาก CAPTAIN MAID กลิ่น TEA TREE FLASH สัมผัสประสบการณ์พื้นสะอาดหมดจดที่ช่วยประหยัดแรงและเวลา ด้วยสูตรประสิทธิภาพสูงที่ขจัดฝุ่นและคราบฝังแน่นได้ทุกรูปแบบ พร้อมให้ความสำคัญกับความปลอดภัย เปลี่ยนการทำความสะอาดให้เป็นเรื่องง่ายและรื่นรมย์ พร้อมคืนความสะอาดและถนอมพื้นผิวบ้านอย่างเหนือระดับ',
      en: 'Awaken a sense of freshness in your home with Captain Maid Floor Cleaner, Tea Tree Flash scent. Experience immaculately clean floors while saving time and effort with a high-performance formula that tackles all forms of dust and embedded stains. We prioritize safety, transforming cleaning into an easy and pleasant task, restoring cleanliness and protecting your home’s surfaces to a superior level.',
    },
    benefits: [
      { th: 'สูตรอ่อนโยนพิเศษ ปลอดภัยต่อผิวสัมผัส', en: 'Extra gentle formula, safe for skin contact' },
      { th: 'คัดสรรส่วนผสมที่เป็นมิตรต่อทุกคนในครอบครัว', en: 'Made with ingredients friendly for the whole family' },
      { th: 'ออกแบบมาให้ทำงานร่วมกับหุ่นยนต์ทำความสะอาดได้', en: 'Designed to work with robotic cleaners' },
      { th: 'แห้งไว ไม่ทิ้งคราบเหนียว', en: 'Dries fast, leaves no sticky residue' },
    ],
    howToUse: [
        { th: 'สำหรับพื้นทั่วไป: ผสมผลิตภัณฑ์ 1 ฝา (50 มล.) ลงในน้ำเปล่า 5 ลิตร ใช้ผ้าหรือจุ่มผ้าม็อบนำมาเช็ดให้ทั่วบริเวณโดยไม่ต้องเช็ดน้ำซ้ำ', en: 'For general cleaning: Mix 1 cap (50 ml) with 5 liters of water. Use a cloth or mop to wipe the area. No rinsing needed.'},
        { th: 'สำหรับคราบฝังลึก: ผสมผลิตภัณฑ์ 3 ฝา (150 มล.) ลงในน้ำเปล่า ใช้ผ้าหรือจุ่มผ้าม็อบนำมาเช็ดให้ทั่ว หรือส่วนที่ต้องการทำความสะอาด', en: 'For deep stains: Mix 3 caps (150 ml) with water. Apply with a cloth or mop directly onto the stain.' },
    ],
    suitableFor: [
        { th: 'พื้นหินอ่อน', en: 'Marble' },
        { th: 'พื้นปาร์เก้', en: 'Parquet' },
        { th: 'พื้นหินแกรนิต', en: 'Granite' },
        { th: 'พื้นไม้', en: 'Wood' },
        { th: 'พื้นเซรามิค', en: 'Ceramic' },
        { th: 'พื้นกระเบื้องเคลือบ และกระเบื้องยาง', en: 'Glazed tile and rubber tile' },
    ],
    cautions: [
        { th: 'ห้ามรับประทาน และเก็บให้พ้นจากมือเด็กและสัตว์เลี้ยง', en: 'Do not ingest. Keep out of reach of children and pets.' },
        { th: 'ระวังอย่าให้เข้าตาหรือถูกผิวหนัง ขณะใช้ควรสวมถุงมือยาง', en: 'Avoid contact with eyes and skin. Wear rubber gloves during use.' },
    ],
    ingredients: '[รอข้อมูล]',
    images: ['/images/products/tea-tree-flash.jpg'],
    videos: [],
    priceText: '฿76.63',
    homeproUrl: 'https://www.homepro.co.th/p/1313716',
    shopeeUrl: '[รอข้อมูล]',
    lazadaUrl: '[รอข้อมูล]',
    tiktokUrl: '[รอข้อมูล]',
    lineUrl: '[รอข้อมูล]',
    seoTitle: { th: 'น้ำยาถูพื้น ทีทรี แฟลช 900มล. | Captain Maid', en: 'Tea Tree Flash Floor Cleaner 900ml | Captain Maid' },
    seoDescription: {
      th: 'น้ำยาทำความสะอาดพื้น Captain Maid กลิ่น ทีทรี แฟลช สูตรประสิทธิภาพสูง ขจัดคราบฝังแน่น แห้งไว ไม่เหนียวเหนอะหนะ ปลอดภัยสำหรับทุกคนในครอบครัว',
      en: 'Captain Maid Tea Tree Flash Floor Cleaner. High-performance formula for tough stains. Dries fast, no sticky residue. Safe for the whole family.',
    },
    keywords: ['floor cleaner', 'tea tree', 'captain maid', 'น้ำยาถูพื้น', 'ทีทรี'],
    isFeatured: true,
    status: 'active',
    filters: {
      category: 'floor-care',
      scent: 'tea-tree',
      need: ['tough-stains', 'anti-bacterial'],
    },
  },
  {
    id: '1313735',
    slug: 'floor-floral-passionate',
    productName: {
      th: 'น้ำยาทำความสะอาดพื้น กลิ่นฟลอรัล แพชชั่น',
      en: 'Floor Cleaner - Floral Passionate Scent',
    },
    category: { th: 'ผลิตภัณฑ์ทำความสะอาดพื้น', en: 'Floor Cleaner' },
    scent: { th: 'ฟลอรัล แพชชั่น', en: 'Floral Passionate' },
    size: '900ML',
    shortDescription: {
      th: 'สัมผัสความหอมละมุนจากทุ่งดอกไม้ พร้อมพลังทำความสะอาดล้ำลึก',
      en: 'Experience the gentle fragrance of a flower field with deep cleaning power.',
    },
    fullDescription: {
      th: 'ให้งานบ้านเป็นช่วงเวลาแห่งความผ่อนคลาย ด้วยน้ำยาทำความสะอาดพื้น จาก CAPTAIN MAID กลิ่น FLORAL PASSIONATE สัมผัสความหอมละมุนจากทุ่งดอกไม้ธรรมชาติ ที่มาพร้อมพลังทำความสะอาดล้ำลึก ขจัดฝุ่นและคราบฝังแน่นได้หมดจดในรอบเดียว สูตรอ่อนโยนพิเศษที่ออกแบบมาเพื่อทะนุถนอมทุกพื้นผิวและผิวสัมผัสของคุณ ให้คุณมั่นใจในความปลอดภัยต่อเด็กและสัตว์เลี้ยง พร้อมนวัตกรรมที่รองรับการใช้งานร่วมกับหุ่นยนต์ดูดฝุ่นได้อย่างสมบูรณ์แบบ แห้งไว ไม่ทิ้งคราบเหนียว สบายเท้าทุกย่างก้าว',
      en: 'Turn your housework into a moment of relaxation with Captain Maid Floor Cleaner, Floral Passionate scent. Experience the gentle aroma of natural flower fields, combined with deep cleaning power that removes dust and stubborn stains in a single wipe. Its extra-gentle formula is designed to care for all surfaces and your skin, ensuring safety for children and pets. Perfectly compatible with robot vacuums, it dries quickly without leaving sticky residue, making every step comfortable.',
    },
    benefits: [
        { th: 'สูตรอ่อนโยนพิเศษ ปลอดภัยต่อผิวสัมผัส', en: 'Extra gentle formula, safe for skin contact' },
        { th: 'คัดสรรส่วนผสมที่เป็นมิตรต่อทุกคนในครอบครัว', en: 'Made with ingredients friendly for the whole family' },
        { th: 'ออกแบบมาให้ทำงานร่วมกับหุ่นยนต์ทำความสะอาดได้', en: 'Designed to work with robotic cleaners' },
        { th: 'แห้งไว ไม่ทิ้งคราบเหนียว', en: 'Dries fast, leaves no sticky residue' },
    ],
    howToUse: [
        { th: 'สำหรับพื้นทั่วไป: ผสมผลิตภัณฑ์ 1 ฝา (50 มล.) ลงในน้ำเปล่า 5 ลิตร ใช้ผ้าหรือจุ่มผ้าม็อบนำมาเช็ดให้ทั่วบริเวณโดยไม่ต้องเช็ดน้ำซ้ำ', en: 'For general cleaning: Mix 1 cap (50 ml) with 5 liters of water. Use a cloth or mop to wipe the area. No rinsing needed.'},
        { th: 'สำหรับคราบฝังลึก: ผสมผลิตภัณฑ์ 3 ฝา (150 มล.) ลงในน้ำเปล่า ใช้ผ้าหรือจุ่มผ้าม็อบนำมาเช็ดให้ทั่ว หรือส่วนที่ต้องการทำความสะอาด', en: 'For deep stains: Mix 3 caps (150 ml) with water. Apply with a cloth or mop directly onto the stain.' },
    ],
    suitableFor: [
        { th: 'พื้นหินอ่อน', en: 'Marble' },
        { th: 'พื้นปาร์เก้', en: 'Parquet' },
        { th: 'พื้นหินแกรนิต', en: 'Granite' },
        { th: 'พื้นไม้', en: 'Wood' },
        { th: 'พื้นเซรามิค', en: 'Ceramic' },
        { th: 'พื้นกระเบื้องเคลือบ และกระเบื้องยาง', en: 'Glazed tile and rubber tile' },
    ],
    cautions: [
        { th: 'ห้ามรับประทาน และเก็บให้พ้นจากมือเด็กและสัตว์เลี้ยง', en: 'Do not ingest. Keep out of reach of children and pets.' },
        { th: 'ระวังอย่าให้เข้าตาหรือถูกผิวหนัง ขณะใช้ควรสวมถุงมือยาง', en: 'Avoid contact with eyes and skin. Wear rubber gloves during use.' },
    ],
    ingredients: '[รอข้อมูล]',
    images: ['/images/products/floral-passionate.jpg'],
    videos: [],
    priceText: '฿76.63',
    homeproUrl: 'https://www.homepro.co.th/p/1313735',
    shopeeUrl: '[รอข้อมูล]',
    lazadaUrl: '[รอข้อมูล]',
    tiktokUrl: '[รอข้อมูล]',
    lineUrl: '[รอข้อมูล]',
    seoTitle: { th: 'น้ำยาถูพื้น ฟลอรัล แพชชั่น 900มล. | Captain Maid', en: 'Floral Passionate Floor Cleaner 900ml | Captain Maid' },
    seoDescription: {
      th: 'น้ำยาทำความสะอาดพื้น Captain Maid กลิ่นฟลอรัล แพชชั่น หอมละมุนจากดอกไม้ธรรมชาติ สูตรอ่อนโยน แห้งไว ปลอดภัยสำหรับเด็กและสัตว์เลี้ยง',
      en: 'Captain Maid Floral Passionate Floor Cleaner. Gentle floral scent, quick-drying, and safe for kids and pets.',
    },
    keywords: ['floor cleaner', 'floral', 'captain maid', 'น้ำยาถูพื้น', 'ฟลอรัล'],
    isFeatured: true,
    status: 'active',
    filters: {
      category: 'floor-care',
      scent: 'floral',
      need: ['general-cleaning', 'pet-friendly'],
    },
  },
  {
    id: '1313729',
    slug: 'floor-lavender-kerry',
    productName: {
      th: 'น้ำยาทำความสะอาดพื้น กลิ่นลาเวนเดอร์ แครี่',
      en: 'Floor Cleaner - Lavender Kerry Scent',
    },
    category: { th: 'ผลิตภัณฑ์ทำความสะอาดพื้น', en: 'Floor Cleaner' },
    scent: { th: 'ลาเวนเดอร์ แครี่', en: 'Lavender Kerry' },
    size: '900ML',
    shortDescription: {
      th: 'ดื่มด่ำกับบรรยากาศแห่งความผ่อนคลายเหมือนยกทุ่งลาเวนเดอร์มาไว้ที่บ้าน',
      en: 'Immerse yourself in a relaxing atmosphere, like a lavender field in your home.',
    },
    fullDescription: {
      th: 'ดื่มด่ำกับบรรยากาศแห่งความผ่อนคลายเหมือนยกทุ่งลาเวนเดอร์มาไว้ที่บ้าน ด้วยน้ำยาทำความสะอาดพื้น จาก CAPTAIN MAID กลิ่น LAVENDER KERRY พร้อมสัมผัสพื้นผิวที่สะอาดหมดจดในทุกย่างก้าวด้วยพลังขจัดฝุ่น สูตรพิเศษที่ออกแบบมาเพื่อความปลอดภัยของทุกคนในครอบครัว รวมถึงสัตว์เลี้ยง มอบผลลัพธ์พื้นเงางาม แห้งไว ไม่ทิ้งคราบเหนียวเหนอะหนะ เปลี่ยนงานบ้านที่วุ่นวายให้กลายเป็นช่วงเวลาแห่งความรื่นรมย์ได้อย่างง่ายดาย',
      en: 'Indulge in a relaxing atmosphere that brings the lavender fields to your home with Captain Maid Floor Cleaner, Lavender Kerry scent. Feel the immaculately clean surfaces with every step thanks to its dust-fighting power. This special formula is designed for the safety of the entire family, including pets. It delivers shiny, quick-drying floors without any sticky residue, easily turning chaotic chores into a delightful experience.',
    },
    benefits: [
        { th: 'สูตรอ่อนโยนพิเศษ ปลอดภัยต่อผิวสัมผัส', en: 'Extra gentle formula, safe for skin contact' },
        { th: 'คัดสรรส่วนผสมที่เป็นมิตรต่อทุกคนในครอบครัว', en: 'Made with ingredients friendly for the whole family' },
        { th: 'ออกแบบมาให้ทำงานร่วมกับหุ่นยนต์ทำความสะอาดได้', en: 'Designed to work with robotic cleaners' },
        { th: 'แห้งไว ไม่ทิ้งคราบเหนียว', en: 'Dries fast, leaves no sticky residue' },
    ],
    howToUse: [
        { th: 'สำหรับพื้นทั่วไป: ผสมผลิตภัณฑ์ 1 ฝา (50 มล.) ลงในน้ำเปล่า 5 ลิตร ใช้ผ้าหรือจุ่มผ้าม็อบนำมาเช็ดให้ทั่วบริเวณโดยไม่ต้องเช็ดน้ำซ้ำ', en: 'For general cleaning: Mix 1 cap (50 ml) with 5 liters of water. Use a cloth or mop to wipe the area. No rinsing needed.'},
        { th: 'สำหรับคราบฝังลึก: ผสมผลิตภัณฑ์ 3 ฝา (150 มล.) ลงในน้ำเปล่า ใช้ผ้าหรือจุ่มผ้าม็อบนำมาเช็ดให้ทั่ว หรือส่วนที่ต้องการทำความสะอาด', en: 'For deep stains: Mix 3 caps (150 ml) with water. Apply with a cloth or mop directly onto the stain.' },
    ],
    suitableFor: [
        { th: 'พื้นหินอ่อน', en: 'Marble' },
        { th: 'พื้นปาร์เก้', en: 'Parquet' },
        { th: 'พื้นหินแกรนิต', en: 'Granite' },
        { th: 'พื้นไม้', en: 'Wood' },
        { th: 'พื้นเซรามิค', en: 'Ceramic' },
        { th: 'พื้นกระเบื้องเคลือบ และกระเบื้องยาง', en: 'Glazed tile and rubber tile' },
    ],
    cautions: [
        { th: 'ห้ามรับประทาน และเก็บให้พ้นจากมือเด็กและสัตว์เลี้ยง', en: 'Do not ingest. Keep out of reach of children and pets.' },
        { th: 'ระวังอย่าให้เข้าตาหรือถูกผิวหนัง ขณะใช้ควรสวมถุงมือยาง', en: 'Avoid contact with eyes and skin. Wear rubber gloves during use.' },
    ],
    ingredients: '[รอข้อมูล]',
    images: ['/images/products/lavender-kerry.jpg'],
    videos: [],
    priceText: '฿76.63',
    homeproUrl: 'https://www.homepro.co.th/p/1313729',
    shopeeUrl: '[รอข้อมูล]',
    lazadaUrl: '[รอข้อมูล]',
    tiktokUrl: '[รอข้อมูล]',
    lineUrl: '[รอข้อมูล]',
    seoTitle: { th: 'น้ำยาถูพื้น ลาเวนเดอร์ แครี่ 900มล. | Captain Maid', en: 'Lavender Kerry Floor Cleaner 900ml | Captain Maid' },
    seoDescription: {
      th: 'น้ำยาทำความสะอาดพื้น Captain Maid กลิ่นลาเวนเดอร์ แครี่ ให้ความรู้สึกผ่อนคลายเหมือนอยู่ในทุ่งลาเวนเดอร์ สูตรอ่อนโยน ปลอดภัย',
      en: 'Captain Maid Lavender Kerry Floor Cleaner. Creates a relaxing atmosphere like a lavender field. Gentle and safe formula.',
    },
    keywords: ['floor cleaner', 'lavender', 'captain maid', 'น้ำยาถูพื้น', 'ลาเวนเดอร์'],
    isFeatured: true,
    status: 'active',
    filters: {
      category: 'floor-care',
      scent: 'lavender',
      need: ['relaxing-scent', 'pet-friendly'],
    },
  },
  {
    id: 'CM-BATH-001',
    slug: 'bathroom-clear-active',
    productName: {
      th: 'สเปรย์ทำความสะอาดห้องน้ำ เคลียร์ แอคทีฟ',
      en: 'Bathroom Spray - Clear Active',
    },
    category: { th: 'ผลิตภัณฑ์ทำความสะอาดห้องน้ำ', en: 'Bathroom Cleaner' },
    scent: { th: 'เคลียร์ แอคทีฟ', en: 'Clear Active' },
    size: '[รอข้อมูล]',
    shortDescription: {
      th: 'ขจัดคราบสบู่และคราบน้ำในห้องน้ำได้อย่างหมดจด พร้อมฆ่าเชื้อแบคทีเรีย 99.9%',
      en: 'Effectively removes soap scum and water stains in the bathroom, killing 99.9% of bacteria.',
    },
    fullDescription: {
      th: 'สเปรย์ทำความสะอาดห้องน้ำ Captain Maid กลิ่นเคลียร์ แอคทีฟ สูตรเข้มข้นที่ออกแบบมาเพื่อจัดการกับคราบสบู่ คราบน้ำ และสิ่งสกปรกในห้องน้ำโดยเฉพาะ คืนความเงางามให้กับสุขภัณฑ์และก๊อกน้ำ พร้อมฆ่าเชื้อแบคทีเรียได้ถึง 99.9% ปลอดภัยด้วยส่วนผสมจากธรรมชาติ',
      en: 'Captain Maid Bathroom Cleaner Spray, Clear Active scent. A concentrated formula specifically designed to tackle soap scum, water stains, and dirt in the bathroom. Restores shine to sanitary ware and faucets while killing 99.9% of bacteria. Safe with natural ingredients.',
    },
    benefits: [
      { th: 'ขจัดคราบสบู่และคราบน้ำอย่างมีประสิทธิภาพ', en: 'Effectively removes soap scum and water stains' },
      { th: 'ฆ่าเชื้อแบคทีเรีย 99.9%', en: 'Kills 99.9% of bacteria' },
      { th: 'คืนความเงางามให้สุขภัณฑ์', en: 'Restores shine to sanitary ware' },
      { th: 'ส่วนผสมจากธรรมชาติ', en: 'Natural ingredients' },
    ],
    howToUse: [{ th: '[รอข้อมูล]', en: '[Awaiting Info]'}],
    suitableFor: [{ th: '[รอข้อมูล]', en: '[Awaiting Info]'}],
    cautions: [{ th: '[รอข้อมูล]', en: '[Awaiting Info]'}],
    ingredients: '[รอข้อมูล]',
    images: ['/images/products/bathroom-clear-active.jpg'],
    videos: [],
    priceText: '[รอข้อมูล]',
    homeproUrl: '[รอข้อมูล]',
    shopeeUrl: '[รอข้อมูล]',
    lazadaUrl: '[รอข้อมูล]',
    tiktokUrl: '[รอข้อมูล]',
    lineUrl: '[รอข้อมูล]',
    seoTitle: { th: 'สเปรย์ทำความสะอาดห้องน้ำ | Captain Maid', en: 'Bathroom Cleaner Spray | Captain Maid' },
    seoDescription: {
      th: 'ขจัดคราบในห้องน้ำอย่างง่ายดายด้วย สเปรย์ทำความสะอาดห้องน้ำ Captain Maid ฆ่าเชื้อแบคทีเรีย 99.9% ปลอดภัย ไม่ฉุน',
      en: 'Easily remove bathroom stains with Captain Maid Bathroom Cleaner Spray. Kills 99.9% of bacteria, safe, non-pungent.',
    },
    keywords: ['bathroom cleaner', 'spray', 'captain maid', 'น้ำยาล้างห้องน้ำ'],
    isFeatured: false,
    status: 'active',
    filters: {
      category: 'bathroom-care',
      scent: 'fresh',
      need: ['anti-bacterial', 'stain-removal'],
    },
  },
  {
    id: 'CM-KITCH-001',
    slug: 'kitchen-multi-purpose',
    productName: {
      th: 'สเปรย์ทำความสะอาดห้องครัว อเนกประสงค์',
      en: 'Kitchen Cleaner - Multi-Purpose',
    },
    category: { th: 'ผลิตภัณฑ์ทำความสะอาดห้องครัว', en: 'Kitchen Cleaner' },
    scent: { th: 'อเนกประสงค์', en: 'Multi-Purpose' },
    size: '[รอข้อมูล]',
    shortDescription: {
      th: 'ขจัดคราบไขมันและคราบอาหารในครัวได้อย่างง่ายดาย ใช้ได้กับหลายพื้นผิว',
      en: 'Easily removes grease and food stains in the kitchen. Suitable for multiple surfaces.',
    },
    fullDescription: {
      th: 'สเปรย์ทำความสะอาดห้องครัว อเนกประสงค์ จาก Captain Maid คือผู้ช่วยคนเก่งสำหรับครัวของคุณ ขจัดคราบไขมัน คราบอาหาร และกลิ่นไม่พึงประสงค์ได้อย่างรวดเร็ว ใช้ได้กับเตา, เคาน์เตอร์, อ่างล้างจาน และเครื่องใช้ในครัวอื่นๆ สูตร Food Grade ปลอดภัยเมื่อสัมผัสกับพื้นผิวที่เกี่ยวข้องกับอาหาร',
      en: 'Captain Maid Multi-Purpose Kitchen Cleaner Spray is your kitchen’s best assistant. Quickly eliminates grease stains, food residue, and unpleasant odors. Safe for use on stovetops, counters, sinks, and other kitchen appliances. Food-grade formula, safe for contact with food-related surfaces.',
    },
    benefits: [
      { th: 'ขจัดคราบไขมันได้อย่างรวดเร็ว', en: 'Quickly removes grease stains' },
      { th: 'สูตร Food Grade ปลอดภัย', en: 'Safe, food-grade formula' },
      { th: 'ใช้ได้กับหลากหลายพื้นผิวในครัว', en: 'Multi-surface safe for kitchen use' },
    ],
    howToUse: [{ th: '[รอข้อมูล]', en: '[Awaiting Info]'}],
    suitableFor: [{ th: '[รอข้อมูล]', en: '[Awaiting Info]'}],
    cautions: [{ th: '[รอข้อมูล]', en: '[Awaiting Info]'}],
    ingredients: '[รอข้อมูล]',
    images: ['/images/products/kitchen-multi-purpose.jpg'],
    videos: [],
    priceText: '[รอข้อมูล]',
    homeproUrl: '[รอข้อมูล]',
    shopeeUrl: '[รอข้อมูล]',
    lazadaUrl: '[รอข้อมูล]',
    tiktokUrl: '[รอข้อมูล]',
    lineUrl: '[รอข้อมูล]',
    seoTitle: { th: 'สเปรย์ทำความสะอาดครัว อเนกประสงค์ | Captain Maid', en: 'Multi-Purpose Kitchen Cleaner Spray | Captain Maid' },
    seoDescription: {
      th: 'ทำความสะอาดครัวของคุณให้ปลอดภัยด้วย สเปรย์ทำความสะอาดอเนกประสงค์ Captain Maid สูตร Food Grade ขจัดคราบไขมันอย่างรวดเร็ว',
      en: 'Clean your kitchen safely with Captain Maid Multi-Purpose Cleaner Spray. Food-grade formula, removes grease quickly.',
    },
    keywords: ['kitchen cleaner', 'grease', 'captain maid', 'น้ำยาเช็ดครัว'],
    isFeatured: false,
    status: 'active',
    filters: {
      category: 'kitchen-care',
      scent: 'unscented',
      need: ['grease-removal', 'food-safe'],
    },
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.isFeatured);
};

export const getRelatedProducts = (currentSlug: string): Product[] => {
  const currentProduct = getProductBySlug(currentSlug);
  if (!currentProduct) return [];
  return products.filter(
    (p) => p.slug !== currentSlug && p.category.en === currentProduct.category.en
  );
};

// Compatibility and helper functions
export const featuredProducts = products.filter(p => p.isFeatured);

export const getProductCategories = () => {
  const categories = products.map(p => p.category);
  // Unique by en name
  return Array.from(new Map(categories.map(c => [c.en, c])).values());
};

export const getProductScents = () => {
  const scents = products.map(p => p.scent);
  return Array.from(new Map(scents.map(s => [s.en, s])).values());
};

export const getCustomerNeedFilters = () => {
  // Extract all unique needs from products
  const allNeeds = products.flatMap(p => p.filters.need);
  const uniqueNeeds = Array.from(new Set(allNeeds));
  
  // Map internal keys to labels (this would ideally be in i18n, but providing structure here)
  return uniqueNeeds.map(need => ({
    id: need,
    label: {
      en: need.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      th: need // Placeholder for Thai
    }
  }));
};
