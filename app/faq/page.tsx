import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions | Captain Maid',
  description: 'Answers to common questions about Captain Maid products, usage, shipping, and safety.',
  openGraph: {
    title: 'FAQ | Captain Maid',
    description: 'Frequently asked questions about our cleaning products',
    type: 'website',
  },
}

/**
 * FAQ content policy: every answer here must trace back to real, approved
 * copy (the product-requirement PPTX in lib/captain-products.ts) or a safe,
 * generic instruction. Do not add shipping costs, return policy specifics,
 * sustainability targets/certifications, or any other business fact that
 * isn't sourced — mark it CONTENT REQUIRED instead of inventing a plausible
 * answer. This applies doubly to safety-critical content (e.g. poison
 * control contact): give safe generic guidance, never a fabricated phone
 * number or hotline.
 */
const faqCategories = [
  {
    category: 'การใช้งานผลิตภัณฑ์',
    questions: [
      {
        q: 'น้ำยาถูพื้นใช้อย่างไร?',
        a: 'ผสมผลิตภัณฑ์ 1 ฝา (50 มล.) ลงในน้ำ 5 ลิตร ถูพื้นให้ทั่วแล้วปล่อยให้แห้ง ไม่ต้องล้างน้ำซ้ำ สำหรับคราบฝังลึก ผสม 1 ฝากับน้ำ 150 มล. แล้วเช็ดบริเวณที่ต้องการให้สะอาด',
      },
      {
        q: 'สเปรย์ทำความสะอาดห้องน้ำ/ห้องครัวใช้อย่างไร?',
        a: 'ปรับหัวฉีดไปที่โหมดสเปรย์ ฉีดลงบนบริเวณที่ต้องการ ทิ้งไว้ 10–15 นาทีสำหรับคราบฝังแน่น จากนั้นเช็ดหรือขัดออกแล้วล้าง/เช็ดด้วยผ้าสะอาด',
      },
      {
        q: 'น้ำยาเช็ดกระจกใช้อย่างไร?',
        a: 'ฉีดให้ทั่วบริเวณที่ต้องการ แล้วเช็ดตามด้วยผ้าสะอาด ควรเปลี่ยนผ้าบ่อย ๆ หากพื้นผิวสกปรกมาก',
      },
      {
        q: 'ใช้กับหุ่นยนต์ถูพื้นได้ไหม?',
        a: 'ผลิตภัณฑ์ทำความสะอาดพื้นของกัปตันเมดใช้ได้กับหุ่นยนต์ถูพื้น',
      },
    ],
  },
  {
    category: 'ความปลอดภัย',
    questions: [
      {
        q: 'ปลอดภัยสำหรับเด็กและสัตว์เลี้ยงหรือไม่?',
        a: 'ผลิตภัณฑ์ปลอดภัยต่อการใช้งานเมื่อปฏิบัติตามคำแนะนำบนฉลากอย่างถูกต้อง ผลิตภัณฑ์ทำความสะอาดพื้นระบุว่าใช้ได้ทุกวันและปลอดภัยสำหรับเด็กและสัตว์เลี้ยงเมื่อใช้ตามคำแนะนำ',
      },
      {
        q: 'สูตร 5 FREE คืออะไร?',
        a: 'ผลิตภัณฑ์ทำความสะอาดพื้นของกัปตันเมด ปลอดสาร 5 ชนิด ได้แก่ ฟอสเฟต พาราเบน แอมโมเนีย ฟอร์มาลดีไฮด์ และ SLS',
      },
      {
        q: 'ผสมผลิตภัณฑ์ทำความสะอาดหลายชนิดเข้าด้วยกันได้ไหม?',
        a: 'CONTENT REQUIRED — คำแนะนำเรื่องการผสมผลิตภัณฑ์ยังไม่ได้รับการยืนยันจากทีมงาน โปรดปฏิบัติตามคำแนะนำบนฉลากผลิตภัณฑ์แต่ละชิ้นเป็นหลัก',
      },
      {
        q: 'หากกลืนกินผลิตภัณฑ์โดยไม่ได้ตั้งใจ ควรทำอย่างไร?',
        a: 'ควรติดต่อสถานพยาบาลหรือศูนย์พิษวิทยาใกล้บ้านทันที และนำฉลากผลิตภัณฑ์ติดตัวไปด้วยเพื่อให้ข้อมูลกับแพทย์ (CONTENT REQUIRED — เบอร์ติดต่อศูนย์พิษวิทยาที่ยืนยันแล้วจะเพิ่มในภายหลัง)',
      },
    ],
  },
  {
    category: 'การจัดส่งและการคืนสินค้า',
    questions: [
      {
        q: 'ระยะเวลาจัดส่งใช้เวลานานเท่าไร?',
        a: 'CONTENT REQUIRED — นโยบายและระยะเวลาจัดส่งยังไม่ได้รับการยืนยัน',
      },
      {
        q: 'มีค่าจัดส่งหรือไม่?',
        a: 'CONTENT REQUIRED — อัตราค่าจัดส่งยังไม่ได้รับการยืนยัน',
      },
      {
        q: 'นโยบายการคืนสินค้าเป็นอย่างไร?',
        a: 'CONTENT REQUIRED — นโยบายการคืนสินค้ายังไม่ได้รับการยืนยัน',
      },
    ],
  },
  {
    category: 'ความยั่งยืน',
    questions: [
      {
        q: 'บรรจุภัณฑ์เป็นมิตรต่อสิ่งแวดล้อมหรือไม่?',
        a: 'CONTENT REQUIRED — ข้อมูลสัดส่วนวัสดุรีไซเคิลและเป้าหมายด้านความยั่งยืนยังไม่ได้รับการยืนยันจากทีมงาน',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-captain-cream dark:bg-captain-cream-dark pt-24">
      <div className="container-safe">
        {/* Page Header */}
        <div className="mb-2xl py-xl text-center">
          <h1 className="text-5xl font-serif font-bold mb-md text-captain-blue">คำถามที่พบบ่อย</h1>
          <p className="text-xl text-captain-neutral max-prose mx-auto">
            คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับผลิตภัณฑ์ กัปตันเมด การใช้งาน และการจัดส่ง
          </p>
        </div>

        {/* Search (Placeholder) */}
        <div className="mb-2xl">
          <input
            id="faq-search"
            name="faq-search"
            type="text"
            aria-label="ค้นหาคำถามที่พบบ่อย"
            placeholder="ค้นหาคำถามที่พบบ่อย..."
            className="w-full px-lg py-md border border-captain-light rounded-sm focus:outline-none focus:ring-2 focus:ring-captain-blue"
          />
        </div>

        {/* FAQ Sections */}
        {faqCategories.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-2xl">
            <h2 className="text-3xl font-serif font-bold mb-lg text-captain-blue">{section.category}</h2>

            <div className="space-y-md">
              {section.questions.map((item, itemIndex) => (
                <details key={itemIndex} className="bg-white dark:bg-captain-cream-dark rounded-sm border border-captain-light overflow-hidden group cursor-pointer hover:border-captain-blue transition-colors">
                  <summary className="flex items-center justify-between p-lg font-semibold text-captain-text hover:bg-captain-light/50 transition-colors">
                    <span className="text-lg">{item.q}</span>
                    <span className="text-captain-blue group-open:rotate-180 transition-transform">▼</span>
                  </summary>

                  <div className="px-lg pb-lg pt-0 text-captain-neutral leading-relaxed bg-captain-light/30 border-t border-captain-light">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Still Have Questions */}
        <div className="bg-captain-light rounded-sm p-2xl text-center my-2xl">
          <h2 className="text-3xl font-serif font-bold mb-md text-captain-text">ไม่พบคำตอบที่คุณต้องการใช่ไหม?</h2>
          <p className="text-lg text-captain-neutral mb-lg">
            เราพร้อมช่วยเหลือคุณ! ติดต่อทีมสนับสนุนของเรา แล้วเราจะติดต่อกลับภายใน 24 ชั่วโมง
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-sm px-lg py-md bg-captain-yellow text-captain-text rounded-sm font-semibold hover:bg-captain-blue hover:text-white transition-all"
          >
            ติดต่อฝ่ายสนับสนุน →
          </Link>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqCategories.flatMap((section) =>
              section.questions.map((q) => ({
                '@type': 'Question',
                name: q.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: q.a,
                },
              }))
            ),
          }),
        }}
      />
    </div>
  )
}
