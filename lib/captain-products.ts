/**
 * Captain Maid — Product catalogue
 * Content per requirement PPTX (Edit website), TH + EN
 */

export type ProductCategory =
  | 'floor'
  | 'bathroom'
  | 'kitchen'
  | 'glass'
  | 'disinfectant'
  | 'dishwasher'

export interface Localized {
  en: string
  th: string
}

export interface LocalizedList {
  en: string[]
  th: string[]
}

export interface CaptainProduct {
  id: string
  category: ProductCategory
  name: Localized
  size: string
  price: number
  rating: number
  reviews: number
  scent: Localized
  image: string
  badge?: string
  intro: LocalizedList
  benefits: LocalizedList
  suitableFor: Localized
  freeFrom?: string[]
}

export const CATEGORIES: { id: ProductCategory | 'all'; label: Localized }[] = [
  { id: 'all', label: { en: 'All', th: 'ทั้งหมด' } },
  { id: 'floor', label: { en: 'Floor Cleaner', th: 'น้ำยาถูพื้น' } },
  { id: 'bathroom', label: { en: 'Bathroom Cleaner', th: 'ทำความสะอาดห้องน้ำ' } },
  { id: 'kitchen', label: { en: 'Kitchen Cleaner', th: 'ทำความสะอาดห้องครัว' } },
  { id: 'glass', label: { en: 'Glass Cleaner', th: 'เช็ดกระจก' } },
  { id: 'disinfectant', label: { en: 'Multi-purpose Disinfectant', th: 'ฆ่าเชื้ออเนกประสงค์' } },
  { id: 'dishwasher', label: { en: 'Dish Washer', th: 'น้ำยาล้างจาน' } },
]

const FLOOR_BENEFITS: LocalizedList = {
  en: [
    'One-pass clean: less repeat mopping, more time back',
    'Fast-drying, no streaks left behind',
    'Comfortable underfoot',
    'Works on every floor and robot mops',
    'Clean, natural scent',
    'Gentle on hands and surfaces',
    'Safe around kids and pets',
  ],
  th: [
    'ขจัดฝุ่น/คราบได้ในรอบเดียว ลดการถูซ้ำ ประหยัดเวลา',
    'พื้นแห้งไว ไม่ทิ้งคราบ',
    'เดินสบายเท้า ไม่ลื่น ไม่เหนอะ',
    'ใช้ได้กับทุกพื้นผิว และหุ่นยนต์ถูพื้น',
    'กลิ่นหอมสะอาด ไม่ฉุน ไม่แสบจมูก',
    'อ่อนโยนต่อมือและพื้นผิว',
    'มิตรกับเด็กและสัตว์เลี้ยงในครอบครัว',
  ],
}

const FLOOR_SUITABLE: Localized = {
  en: 'General surfaces, marble floors, parquet floors, granite floors, wood floors, ceramic floors, terrazzo floors, glazed tile floors, and vinyl tile floors',
  th: 'พื้นผิวทั่วไป พื้นหินอ่อน พื้นปาร์เก้ พื้นหินแกรนิต พื้นไม้ พื้นเซรามิค พื้นหินขัด พื้นกระเบื้องเคลือบ พื้นกระเบื้องยาง',
}

const FLOOR_FREE_FROM = ['Phosphate', 'Paraben', 'Ammonia', 'Formaldehyde', 'SLS']

export const PRODUCTS: CaptainProduct[] = [
  {
    id: 'floor-cleaner-lavender-kerry',
    category: 'floor',
    name: {
      en: 'CAPTAINMAID Floor Cleaner Lavender Kerry',
      th: 'กัปตันเมด ผลิตภัณฑ์ทำความสะอาดพื้น กลิ่นลาเวนเดอร์ เคอรี่',
    },
    size: '900 ml.',
    price: 89,
    rating: 5,
    reviews: 128,
    scent: { en: 'Lavender Kerry', th: 'ลาเวนเดอร์ เคอรี่' },
    image: '/images/solution-floor.png',
    badge: 'BEST SELLER',
    intro: {
      en: [
        'Captainmaid Floor Cleaner in Lavender Kerry cleans your floors in a single pass, lifting dust, stains, and sticky residue without repeated mopping.',
        'Use it for everyday floor cleaning throughout the home: add one cap (50 ml) to 5 litres of water, mop, and let it dry — no rinsing needed. For deep-set stains, mix one cap with 150 ml of water and wipe the area clean.',
        'Powered by gentle plant-based surfactants and Double Clean technology, it dries fast and leaves no streaks or sticky film, safe for daily use around children and pets, and compatible with robot mops.',
        'Finished with a Lavender Kerry scent, soothing lavender woven with eucalyptus and natural herbal notes, for floors that feel calm, soft, and relaxing underfoot.',
      ],
      th: [
        'กัปตันเมด ผลิตภัณฑ์ทำความสะอาดพื้น กลิ่นลาเวนเดอร์ เคอรี่ ทำความสะอาดพื้นให้จบในรอบเดียว ขจัดฝุ่น คราบ และความเหนอะได้หมดจด โดยไม่ต้องถูซ้ำหลายรอบ',
        'ใช้สำหรับทำความสะอาดพื้นทั่วบ้านได้ทุกวัน เพียงผสมผลิตภัณฑ์ 1 ฝา (50 มล.) ลงในน้ำ 5 ลิตร ถูให้ทั่วแล้วปล่อยให้แห้ง โดยไม่ต้องเช็ดน้ำซ้ำ สำหรับคราบฝังลึก ผสม 1 ฝากับน้ำ 150 มล. แล้วเช็ดบริเวณที่ต้องการให้สะอาด',
        'ด้วยสารทำความสะอาดจากธรรมชาติและเทคโนโลยี Double Clean พื้นจึงแห้งไว ไม่ทิ้งคราบหรือความเหนียวเหนอะ ใช้ได้ทุกวัน ปลอดภัยต่อเด็กและสัตว์เลี้ยง และใช้ได้กับหุ่นยนต์ถูพื้น',
        'หอมด้วยกลิ่นลาเวนเดอร์ เคอรี่ กลิ่นลาเวนเดอร์ผสานยูคาลิปตัสและโทนสมุนไพรธรรมชาติ ให้ความรู้สึกสงบ นุ่มลึก และผ่อนคลายในทุกก้าว',
      ],
    },
    benefits: FLOOR_BENEFITS,
    suitableFor: FLOOR_SUITABLE,
    freeFrom: FLOOR_FREE_FROM,
  },
  {
    id: 'floor-cleaner-floral-passion',
    category: 'floor',
    name: {
      en: 'CAPTAINMAID Floor Cleaner Floral Passion',
      th: 'กัปตันเมด ผลิตภัณฑ์ทำความสะอาดพื้น กลิ่นฟลอรัล แพสชันเนท',
    },
    size: '900 ml.',
    price: 89,
    rating: 5,
    reviews: 96,
    scent: { en: 'Floral Passion', th: 'ฟลอรัล แพสชันเนท' },
    image: '/images/deep-floor.png',
    intro: {
      en: [
        'Captainmaid Floor Cleaner in Floral Passionate cleans your floors in a single pass, lifting dust, stains, and sticky residue without the need to mop over and over.',
        'Use it for everyday floor cleaning throughout the home: add one cap (50 ml) to 5 litres of water, mop, and let it dry, no rinsing needed. For deep-set stains, mix one cap with 150 ml of water and wipe the area clean.',
        'Powered by gentle plant-based surfactants and Double Clean technology, it dries fast and leaves no streaks or sticky film — safe for daily use around children and pets, and compatible with robot mops.',
        "Finished with a Floral Passionate scent, a soft floral bouquet brightened with citrus and warm Pimenta Berry, so every room feels cleaner and more inviting the moment you're done.",
      ],
      th: [
        'กัปตันเมด ผลิตภัณฑ์ทำความสะอาดพื้น กลิ่นฟลอรัล แพสชันเนท ทำความสะอาดพื้นให้จบในรอบเดียว ขจัดฝุ่น คราบ และความเหนอะได้หมดจด โดยไม่ต้องถูซ้ำหลายรอบ',
        'ใช้สำหรับทำความสะอาดพื้นทั่วบ้านได้ทุกวัน เพียงผสมผลิตภัณฑ์ 1 ฝา (50 มล.) ลงในน้ำ 5 ลิตร ถูให้ทั่วแล้วปล่อยให้แห้ง โดยไม่ต้องเช็ดน้ำซ้ำ สำหรับคราบฝังลึก ผสม 1 ฝากับน้ำ 150 มล. แล้วเช็ดบริเวณที่ต้องการให้สะอาด',
        'ด้วยสารทำความสะอาดจากธรรมชาติและเทคโนโลยี Double Clean พื้นจึงแห้งไว ไม่ทิ้งคราบหรือความเหนียวเหนอะ ใช้ได้ทุกวัน ปลอดภัยต่อเด็กและสัตว์เลี้ยง และใช้ได้กับหุ่นยนต์ถูพื้น',
        'หอมด้วยกลิ่นฟลอรัล แพสชันเนท กลิ่นดอกไม้ละมุนผสานความสดชื่นของซิตรัสและความอบอุ่นของ Pimenta Berry ให้ทุกห้องรู้สึกสะอาดและน่าอยู่ทันทีหลังทำความสะอาด',
      ],
    },
    benefits: FLOOR_BENEFITS,
    suitableFor: FLOOR_SUITABLE,
    freeFrom: FLOOR_FREE_FROM,
  },
  {
    id: 'floor-cleaner-tea-tree-flash',
    category: 'floor',
    name: {
      en: 'CAPTAINMAID Floor Cleaner Tea Tree Flash',
      th: 'กัปตันเมด ผลิตภัณฑ์ทำความสะอาดพื้น กลิ่นทีทรี แฟลช',
    },
    size: '900 ml.',
    price: 89,
    rating: 4,
    reviews: 87,
    scent: { en: 'Tea Tree Flash', th: 'ทีทรี แฟลช' },
    image: '/images/hero-1.png',
    intro: {
      en: [
        'Captainmaid Floor Cleaner in Tea Tree Flash cleans your floors in a single pass, lifting dust, stains, and sticky residue without repeated mopping.',
        'Use it for everyday floor cleaning throughout the home: add one cap (50 ml) to 5 litres of water, mop, and let it dry — no rinsing needed. For deep-set stains, mix one cap with 150 ml of water and wipe the area clean.',
        'Powered by gentle plant-based surfactants and Double Clean technology, it dries fast and leaves no streaks or sticky film — safe for daily use around children and pets, and compatible with robot mops.',
        'Finished with a Tea Tree Flash scent, a crisp blend of tea tree, eucalyptus, and patchouli, for a fresh, airy, unmistakably clean feel with no mustiness.',
      ],
      th: [
        'กัปตันเมด ผลิตภัณฑ์ทำความสะอาดพื้น กลิ่นทีทรี แฟลช ทำความสะอาดพื้นให้จบในรอบเดียว ขจัดฝุ่น คราบ และความเหนอะได้หมดจด โดยไม่ต้องถูซ้ำหลายรอบ',
        'ใช้สำหรับทำความสะอาดพื้นทั่วบ้านได้ทุกวัน เพียงผสมผลิตภัณฑ์ 1 ฝา (50 มล.) ลงในน้ำ 5 ลิตร ถูให้ทั่วแล้วปล่อยให้แห้ง โดยไม่ต้องเช็ดน้ำซ้ำ สำหรับคราบฝังลึก ผสม 1 ฝากับน้ำ 150 มล. แล้วเช็ดบริเวณที่ต้องการให้สะอาด',
        'ด้วยสารทำความสะอาดจากธรรมชาติและเทคโนโลยี Double Clean พื้นจึงแห้งไว ไม่ทิ้งคราบหรือความเหนียวเหนอะ ใช้ได้ทุกวัน ปลอดภัยต่อเด็กและสัตว์เลี้ยง และใช้ได้กับหุ่นยนต์ถูพื้น',
        'หอมด้วยกลิ่นทีทรี แฟลช กลิ่นทีทรีผสานยูคาลิปตัสและแพตชูลี ให้ความรู้สึกสะอาดชัดเจน โปร่ง โล่ง สดชื่น ไม่อับ',
      ],
    },
    benefits: FLOOR_BENEFITS,
    suitableFor: FLOOR_SUITABLE,
    freeFrom: FLOOR_FREE_FROM,
  },
  {
    id: 'bathroom-cleaner-spray',
    category: 'bathroom',
    name: {
      en: 'Captainmaid Bathroom Cleaner Spray',
      th: 'กัปตันเมด ผลิตภัณฑ์สเปรย์ทำความสะอาดห้องน้ำ',
    },
    size: '900 ml.',
    price: 99,
    rating: 5,
    reviews: 96,
    scent: { en: 'Fresh Air', th: 'เฟรชแอร์' },
    image: '/images/solution-bathroom.png',
    badge: 'NEW',
    intro: {
      en: [
        'Captainmaid Bathroom Cleaner Spray in Fresh Air dissolves stubborn bathroom stains like soap scum, grease, limescale, and built-up grime in every corner and lifts them away with barely any scrubbing.',
        'Use it across bathroom walls and floors, tiles, sanitary ware, glass, partitions, and grout lines. Set the nozzle to spray, apply to the area, leave for 10–15 minutes on tough stains, then wipe or scrub off and rinse with clean water.',
        "Powered by plant-based Plant Clean Active Power, it's tough on stains yet gentle and non-corrosive on surfaces.",
        'Finished with a Fresh Air scent from 100% Australian essential oils, cutting through musty odours and leaving your bathroom smelling clean, open, and fresh.',
      ],
      th: [
        'กัปตันเมด ผลิตภัณฑ์สเปรย์ทำความสะอาดห้องน้ำ กลิ่นเฟรชแอร์ สลายคราบฝังแน่นในห้องน้ำ ทั้งคราบสบู่ คราบมัน คราบหินปูน และคราบสะสมตามซอกมุม ให้หลุดออกง่ายโดยแทบไม่ต้องออกแรงขัด',
        'ใช้ได้กับผนังและพื้นห้องน้ำ กระเบื้อง สุขภัณฑ์ กระจก ฉากกั้น และร่องยาแนว ปรับหัวฉีดไปที่โหมดฉีด ฉีดลงบนบริเวณที่ต้องการ ทิ้งไว้ 10–15 นาทีสำหรับคราบฝังแน่น จากนั้นเช็ดหรือขัดออกแล้วล้างด้วยน้ำสะอาด',
        'ด้วยพลัง Plant Clean Active Power จากธรรมชาติ จึงจัดการคราบได้อย่างมีประสิทธิภาพ แต่ยังอ่อนโยนและไม่กัดกร่อนพื้นผิว',
        'หอมด้วยกลิ่นเฟรชแอร์จาก Essential Oils แท้ 100% จากออสเตรเลีย ช่วยลดกลิ่นอับ ให้ห้องน้ำหอมสะอาด โปร่ง โล่ง สดชื่น',
      ],
    },
    benefits: {
      en: [
        'Stains lift easily, dissolves stubborn grime without hard scrubbing',
        'Clean, natural scent, never harsh',
        'Instantly refreshes the whole bathroom',
        'Works on many surfaces, non-corrosive',
        'Leaves surfaces shiny, no residue',
        'Easy-spray formula, reaches every corner',
      ],
      th: [
        'คราบหลุดง่าย สลายคราบฝังแน่นได้อย่างมีประสิทธิภาพ โดยไม่ต้องออกแรงขัดมาก',
        'กลิ่นหอมสะอาด ไม่ฉุน ไม่แสบจมูก',
        'รีเฟรชบรรยากาศห้องน้ำให้รู้สึกน่าอยู่ขึ้นทันที',
        'ใช้ได้กับพื้นผิวหลากหลาย ไม่กัดกร่อน',
        'ช่วยให้พื้นเงาสะอาด ไม่ทิ้งคราบตกค้าง',
        'สูตรสเปรย์ ใช้งานง่าย ครอบคลุมทุกซอกมุม',
      ],
    },
    suitableFor: {
      en: 'Bathroom walls and floors, tiles, sanitary ware, glass / partitions, grout lines / corners',
      th: 'ผนังและพื้นห้องน้ำ, กระเบื้อง, สุขภัณฑ์, กระจก / ฉากกั้น, ร่องยาแนว / ซอกมุม',
    },
  },
  {
    id: 'kitchen-cleaner-spray',
    category: 'kitchen',
    name: {
      en: 'Captainmaid Kitchen Cleaner Spray',
      th: 'กัปตันเมด ผลิตภัณฑ์สเปรย์ทำความสะอาดห้องครัว',
    },
    size: '900 ml.',
    price: 95,
    rating: 5,
    reviews: 87,
    scent: { en: 'Citrus Express', th: 'ซิตรัส เอ็กซ์เพรส' },
    image: '/images/solution-kitchen.png',
    intro: {
      en: [
        'Captainmaid Kitchen Cleaner Spray in Citrus Express cuts through heavy kitchen grease, stubborn food stains, and burnt-on residue, and neutralises food odours at the source, all in one step.',
        'Use it on stovetops, counters, sinks, dining tables, microwaves, glass, and everyday surfaces. Set the nozzle to spray, apply, leave for 10–15 minutes on tough spots, then wipe clean with a damp cloth.',
        'Powered by Plant Clean Active Power plus an Active Odor Clean blend of citrus and Australian tea tree oils, it dissolves grease while erasing fishy and lingering food smells.',
        'Finished with a fresh citrus scent, never harsh, leaving your kitchen clean, fresh, and ready to cook again.',
      ],
      th: [
        'กัปตันเมด ผลิตภัณฑ์สเปรย์ทำความสะอาดห้องครัว กลิ่นซิตรัส เอ็กซ์เพรส สลายคราบมันหนัก คราบอาหารฝังแน่น และคราบไหม้ พร้อมดับกลิ่นอาหารจากต้นตอ ได้ในขั้นตอนเดียว',
        'ใช้ได้กับเตา เคาน์เตอร์ครัว อ่างล้างจาน โต๊ะอาหาร ไมโครเวฟ กระจก และพื้นผิวทั่วไป ปรับหัวฉีดไปที่โหมดฉีด ฉีดลงบนบริเวณที่ต้องการ ทิ้งไว้ 10–15 นาทีสำหรับคราบฝังแน่น แล้วเช็ดออกด้วยผ้าชุบน้ำหมาดๆ',
        'ด้วยพลัง Plant Clean Active Power ผสานเทคโนโลยี Active Odor Clean จากน้ำมันซิตรัสและทีทรีออสเตรเลีย จึงสลายคราบมันพร้อมขจัดกลิ่นคาวและกลิ่นอาหารที่ตกค้าง',
        'หอมด้วยกลิ่นซิตรัสสดชื่น ไม่ฉุน ให้ห้องครัวสะอาด สดชื่น พร้อมสำหรับการทำอาหารครั้งต่อไป',
      ],
    },
    benefits: {
      en: [
        'Targets grease, food stains, and built-up grime',
        'Less scrubbing — faster cleanup',
        'Clean, fresh scent — never intrusive',
        'Leaves surfaces clean and shiny — no residue',
        'Easy-spray formula — covers every corner of the kitchen',
      ],
      th: [
        'ขจัดคราบมัน คราบอาหาร และคราบสกปรกสะสมได้อย่างตรงจุด',
        'ลดแรงขัด ประหยัดเวลาในการทำความสะอาด',
        'กลิ่นสะอาดสดชื่น ไม่ฉุน ไม่รบกวนการใช้งาน',
        'ช่วยให้พื้นผิวดูสะอาด เงา โดยไม่ทิ้งคราบตกค้าง',
        'สูตรสเปรย์ใช้งานง่าย ครอบคลุมทุกมุมของห้องครัว',
      ],
    },
    suitableFor: {
      en: 'Stovetops / kitchen counters / sinks / dining tables / microwaves / glass / general surfaces',
      th: 'เตา / เคาน์เตอร์ครัว / อ่างล้างจาน / โต๊ะอาหาร / ไมโครเวฟ / กระจก / พื้นผิวทั่วไป ฯลฯ',
    },
  },
  {
    id: 'glass-cleaner',
    category: 'glass',
    name: {
      en: 'Captainmaid Glass Cleaner',
      th: 'กัปตันเมด ผลิตภัณฑ์เช็ดกระจก',
    },
    size: '900 ml.',
    price: 119,
    rating: 5,
    reviews: 112,
    scent: { en: 'Fruity Fresh', th: 'ฟรุตตี้ เฟรช' },
    image: '/images/solution-glass.png',
    intro: {
      en: [
        'Captainmaid Glass Cleaner in Fruity Fresh delivers streak-free clarity in a single wipe, clearing dust, grease, and fingerprints with no smears or distracting streaks.',
        'Use it on glass, mirrors, chrome, stainless steel, and smooth surfaces throughout your home. Spray across the area, then wipe with a clean cloth, changing the cloth often on heavily soiled surfaces.',
        "Powered by plant-based cleaning agents and fast-drying alcohol with Smart Clear Technology, it lifts, dissolves, and evaporates fast, drying in seconds so there's nothing left to wipe.",
        'Finished with a light Fruity Fresh scent, leaving surfaces sparkling clean and clear, like new.',
      ],
      th: [
        'กัปตันเมด ผลิตภัณฑ์เช็ดกระจก กลิ่นฟรุตตี้ เฟรช ให้กระจกใสปิ๊งในปาดเดียว ขจัดฝุ่น คราบมัน และรอยนิ้วมือ โดยไม่ทิ้งคราบหรือรอยเส้นกวนสายตา',
        'ใช้ได้กับกระจก กระจกเงา โครเมียม สเตนเลส และพื้นผิวเรียบต่างๆ ทั่วบ้าน ฉีดให้ทั่วบริเวณที่ต้องการ แล้วเช็ดตามด้วยผ้าสะอาด ควรเปลี่ยนผ้าบ่อยๆ หากพื้นผิวสกปรกมาก',
        'ด้วยสารทำความสะอาดจากพืชและแอลกอฮอล์แห้งไว พร้อมเทคโนโลยี Smart Clear จึงยกคราบ สลายคราบ และระเหยแห้งอย่างรวดเร็วในไม่กี่วินาที โดยไม่ต้องเช็ดซ้ำ',
        'หอมด้วยกลิ่นฟรุตตี้ เฟรชอ่อนๆ ให้พื้นผิวสะอาดใสเป็นประกายเหมือนใหม่',
      ],
    },
    benefits: {
      en: [
        'Cleans glass and surfaces like chrome, stainless steel, and ceramic',
        'Removes grime effectively',
        'Gentle around kids and pets',
        "Won't damage or corrode surfaces",
        'Sparkling, streak-free, crystal-clear shine',
      ],
      th: [
        'ใช้เช็ดถูทำความสะอาดกระจก และพื้นผิวต่างๆ เช่น โครเมียม สเตนเลส หรือเซรามิก',
        'ขจัดคราบอย่างมีประสิทธิภาพ',
        'อ่อนโยนต่อเด็ก และสัตว์เลี้ยง',
        'ไม่กัดทำลายพื้นผิว ไม่กัดกร่อน',
        'แวววาว เงางาม กระจกใสเป็นประกาย',
      ],
    },
    suitableFor: {
      en: 'Glass surfaces, chrome, stainless steel, or ceramic',
      th: 'พื้นผิวกระจก, โครเมียม, สเตนเลส หรือเซรามิก',
    },
  },
]

export function getProduct(id: string): CaptainProduct | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductsByCategory(category: ProductCategory | 'all'): CaptainProduct[] {
  if (category === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.category === category)
}
