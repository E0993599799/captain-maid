import Link from 'next/link'
import { Send } from 'lucide-react'

const columns = [
  {
    title: 'หมวดหมู่สินค้า',
    links: [
      { label: 'Floor Cleaner', href: '/products?category=floor' },
      { label: 'Bathroom Cleaner', href: '/products?category=bathroom' },
      { label: 'Kitchen Cleaner', href: '/products?category=kitchen' },
      { label: 'Glass Cleaner', href: '/products?category=glass' },
      { label: 'Multi-purpose Disinfectant', href: '/products?category=disinfectant' },
      { label: 'Dishwasher', href: '/products?category=dishwasher' },
      { label: 'View All', href: '/products' },
    ],
  },
  {
    title: 'โซลูชันการทำความสะอาด',
    links: [
      { label: 'ห้องครัว', href: '/products?category=kitchen' },
      { label: 'ห้องน้ำ', href: '/products?category=bathroom' },
      { label: 'ห้องนั่งเล่น', href: '/products?category=floor' },
      { label: 'กระจกและหน้าต่าง', href: '/products?category=glass' },
      { label: 'ฆ่าเชื้อทั่วบ้าน', href: '/products?category=disinfectant' },
      { label: 'ทำความสะอาดทั่วไป', href: '/products' },
    ],
  },
  {
    title: 'บริการลูกค้า',
    links: [
      { label: 'ติดต่อเรา', href: '/contact' },
      { label: 'คำถามที่พบบ่อย', href: '/faq' },
      { label: 'การจัดส่งและการคืนสินค้า', href: '/faq' },
      { label: 'ความปลอดภัยของผลิตภัณฑ์', href: '/faq' },
      { label: 'นโยบายความเป็นส่วนตัว', href: '/faq' },
      { label: 'เงื่อนไขการใช้บริการ', href: '/faq' },
    ],
  },
]

export function Footer() {
  return (
    <footer>
      {/* Newsletter — เหนือ footer พื้นฟ้าอ่อนลายน้ำ */}
      <div
        className="relative py-12"
        style={{
          background: 'linear-gradient(135deg, #dff1fb 0%, #eaf6fd 50%, #d5ecfa 100%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/newsletter-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#002d5f]">
            ไม่พลาดทุกเคล็ดลับความสะอาด
          </h3>
          <p className="text-[#0079c1]/80 text-sm mt-1.5">
            รับข่าวสาร โปรโมชั่น และเคล็ดลับดีๆ ส่งตรงถึงอีเมลคุณ
          </p>
          <form className="mt-6 flex w-full max-w-xl mx-auto gap-2">
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              className="flex-1 px-5 py-3 rounded-full bg-white border border-white shadow-sm text-[#002d5f] placeholder:text-gray-400 text-sm focus:outline-none focus:border-[#0079c1] transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center bg-[#0079c1] hover:bg-[#0066a8] text-white rounded-full px-6 font-semibold shadow-md transition-all flex-shrink-0 text-sm"
            >
              <Send className="w-4 h-4 mr-1.5" />
              สมัครรับข่าวสาร
            </button>
          </form>
        </div>
      </div>

      {/* Footer columns */}
      <div className="bg-[#002d5f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.png"
                  alt="Captain Maid"
                  className="w-12 h-12 object-contain"
                />
                <div className="leading-tight">
                  <div className="font-bold text-base">Captain Maid</div>
                  <div className="text-[10px] text-white/40 tracking-widest uppercase">กัปตันเมด</div>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                สะอาดทุกมุม มั่นใจทุกวัน
              </p>
              <div className="text-sm text-white/60 space-y-1.5">
                <div>02-123-4567</div>
                <div>hello@captainmaid.co.th</div>
                <div>@captainmaid</div>
              </div>
              {/* Social */}
              <div className="flex gap-2 mt-4">
                {['f', 'ig', 'yt', 'line'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    aria-label={s}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0079c1] flex items-center justify-center text-xs font-bold transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-sm mb-4 text-white">{col.title}</h4>
                <ul className="space-y-2.5 text-sm text-white/60">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="hover:text-[#4db8ff] transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
              <p>© 2026 Captain Maid. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/faq" className="hover:text-white/70 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/faq" className="hover:text-white/70 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
