export interface FaqItem {
  question: { th: string; en: string };
  answer: { th: string; en: string };
  category: 'before-purchase' | 'how-to-use' | 'surfaces' | 'formula' | 'family-safety' | 'where-to-buy';
  productSlugs?: string[];
}

export const faqItems: FaqItem[] = [
  // === ก่อนซื้อ (Before Purchase) ===
  {
    question: {
      th: 'ผลิตภัณฑ์ Captain Maid แตกต่างจากยี่ห้ออื่นอย่างไร?',
      en: 'What makes Captain Maid different from other brands?',
    },
    answer: {
      th: 'เราเน้นส่วนผสมจากธรรมชาติ (Plant-Based), ปราศจากสารเคมีอันตราย 5 ชนิด (5-FREE), มีค่า pH ที่เป็นกลาง และปลอดภัยสำหรับทุกคนในครอบครัว รวมถึงเด็กและสัตว์เลี้ยง',
      en: 'We focus on plant-based ingredients, are free from 5 harmful chemicals (5-FREE), have a neutral pH, and are safe for the entire family, including children and pets.',
    },
    category: 'before-purchase',
  },
  {
    question: {
      th: 'ผลิตภัณฑ์มีขนาดเท่าไหร่บ้าง?',
      en: 'What sizes are available?',
    },
    answer: {
      th: 'ปัจจุบันผลิตภัณฑ์ทำความสะอาดพื้นมีขนาด 900 มล. สำหรับสเปรย์ทำความสะอาดห้องน้ำและห้องครัว กรุณารอการอัปเดตข้อมูล',
      en: 'Currently, our floor cleaner products are available in a 900ml size. Please stay tuned for updates on our bathroom and kitchen spray sizes.',
    },
    category: 'before-purchase',
    productSlugs: ['floor-tea-tree-flash', 'floor-floral-passionate', 'floor-lavender-kerry'],
  },
  
  // === วิธีใช้ (How to Use) ===
  {
    question: {
      th: 'ต้องผสมน้ำยาถูพื้นในอัตราส่วนเท่าไหร่?',
      en: 'What is the mixing ratio for the floor cleaner?',
    },
    answer: {
      th: 'สำหรับพื้นทั่วไป ผสม 1 ฝา (50 มล.) ต่อน้ำ 5 ลิตร / สำหรับคราบฝังลึก ผสม 3 ฝา (150 มล.) ต่อน้ำ 5 ลิตร โดยไม่ต้องเช็ดน้ำซ้ำ',
      en: 'For general cleaning, mix 1 cap (50 ml) per 5 liters of water. For deep stains, mix 3 caps (150 ml) per 5 liters of water. No rinsing is necessary.',
    },
    category: 'how-to-use',
    productSlugs: ['floor-tea-tree-flash', 'floor-floral-passionate', 'floor-lavender-kerry'],
  },
  {
    question: {
      th: 'ใช้กับหุ่นยนต์ดูดฝุ่นได้หรือไม่?',
      en: 'Is it compatible with robot vacuums?',
    },
    answer: {
      th: 'ใช่ ผลิตภัณฑ์ทำความสะอาดพื้นของเราถูกออกแบบมาให้ใช้งานร่วมกับหุ่นยนต์ดูดฝุ่นได้ (Robot Friendly) แห้งไวใน 1 นาทีและไม่ทิ้งคราบเหนียว',
      en: 'Yes, our floor cleaner is designed to be Robot Friendly. It dries in 1 minute and leaves no sticky residue.',
    },
    category: 'how-to-use',
    productSlugs: ['floor-tea-tree-flash', 'floor-floral-passionate', 'floor-lavender-kerry'],
  },

  // === พื้นผิวที่เหมาะสม (Suitable Surfaces) ===
  {
    question: {
      th: 'น้ำยาถูพื้นใช้กับพื้นผิวประเภทใดได้บ้าง?',
      en: 'What types of surfaces can the floor cleaner be used on?',
    },
    answer: {
      th: 'สามารถใช้ได้กับพื้นผิวทั่วไปหลากหลายชนิด เช่น พื้นหินอ่อน, ปาร์เก้, หินแกรนิต, ไม้, เซรามิค, และกระเบื้องยาง โดยไม่ทำลายพื้นผิว',
      en: 'It can be used on a wide variety of general surfaces such as marble, parquet, granite, wood, ceramic, and rubber tiles without causing damage.',
    },
    category: 'surfaces',
    productSlugs: ['floor-tea-tree-flash', 'floor-floral-passionate', 'floor-lavender-kerry'],
  },

  // === กลิ่น-ขนาด-สูตร (Scent, Size, Formula) ===
  {
    question: {
      th: 'ผลิตภัณฑ์ทำความสะอาดพื้นมีกี่กลิ่น?',
      en: 'How many scents are available for the floor cleaner?',
    },
    answer: {
      th: 'ปัจจุบันมี 3 กลิ่นหลัก: ทีทรี แฟลช (สดชื่น), ฟลอรัล แพชชั่น (หอมหวาน), และ ลาเวนเดอร์ แครี่ (ผ่อนคลาย)',
      en: 'We currently have 3 main scents: Tea Tree Flash (refreshing), Floral Passionate (sweet), and Lavender Kerry (relaxing).',
    },
    category: 'formula',
    productSlugs: ['floor-tea-tree-flash', 'floor-floral-passionate', 'floor-lavender-kerry'],
  },
  {
    question: {
      th: 'ผลิตภัณฑ์มีคุณสมบัติฆ่าเชื้อแบคทีเรียหรือไม่?',
      en: 'Does the product have anti-bacterial properties?',
    },
    answer: {
      th: 'ใช่ ผลิตภัณฑ์ของเรามีคุณสมบัติในการฆ่าเชื้อแบคทีเรียได้ 99.9%',
      en: 'Yes, our products have been tested to kill 99.9% of bacteria.',
    },
    category: 'formula',
  },

  // === บ้านที่มีเด็ก-สัตว์เลี้ยง (Family & Pet Safety) ===
  {
    question: {
      th: 'ปลอดภัยสำหรับเด็กและสัตว์เลี้ยงจริงหรือไม่?',
      en: 'Is it truly safe for children and pets?',
    },
    answer: {
      th: 'ปลอดภัยแน่นอน ด้วยส่วนผสมจากพืช (Plant-Based) และค่า pH ที่เป็นกลาง จึงอ่อนโยนต่อผิวและไม่เป็นอันตรายเมื่อสัมผัส อย่างไรก็ตาม ควรเก็บผลิตภัณฑ์ให้พ้นจากมือเด็กและสัตว์เลี้ยงเสมอ',
      en: 'Absolutely. With plant-based ingredients and a neutral pH, it is gentle on skin and not harmful upon contact. However, as with all cleaning products, it should be kept out of reach of children and pets.',
    },
    category: 'family-safety',
  },

  // === ช่องทางซื้อ (Where to Buy) ===
  {
    question: {
      th: 'สามารถซื้อสินค้าได้ที่ไหนบ้าง?',
      en: 'Where can I buy the products?',
    },
    answer: {
      th: 'ท่านสามารถสั่งซื้อได้ที่ HomePro ทุกสาขาทั่วประเทศ และช่องทางออนไลน์อื่นๆ เช่น Shopee, Lazada, และ TikTok Shop ซึ่งกำลังจะเปิดให้บริการเร็วๆ นี้',
      en: 'You can purchase our products at all HomePro branches nationwide, and soon on other online channels like Shopee, Lazada, and TikTok Shop.',
    },
    category: 'where-to-buy',
  },
];
