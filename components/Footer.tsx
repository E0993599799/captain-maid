import Link from 'next/link'
import { Send } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/contact'

// lucide-react (installed: 1.24.0) does not ship brand/logo icons (Facebook,
// Instagram, YouTube, LINE, etc. were removed from the core icon set), so
// these are inline SVGs using the open-source (Simple Icons, CC0-licensed)
// brand glyph paths, viewBox 0 0 24 24, fill=currentColor.
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.732-.009c-.845 0-1.464.104-1.936.288-.582.223-.987.578-1.259 1.037-.322.532-.442 1.147-.442 1.865v1.79h4.6l-.618 3.667h-3.982v7.98H9.101z"/>
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.795.646-1.439 1.44-1.439.793-.001 1.44.644 1.44 1.439z"/>
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function LineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.001 0C5.373 0 0 4.664 0 10.415c0 5.14 4.293 9.446 10.098 10.26.393.084.928.258 1.063.593.121.303.079.778.038 1.084 0 0-.14.85-.171 1.032-.053.303-.242 1.187 1.024.647 1.267-.54 6.828-4.021 9.317-6.885C23.822 15.184 24 12.938 24 10.415 24 4.664 18.627 0 12.001 0zM7.152 13.62H4.011a.395.395 0 01-.395-.395V8.108a.395.395 0 11.79 0v4.723h2.746a.395.395 0 010 .79zm2.328 0a.395.395 0 01-.395-.395V8.108a.395.395 0 11.79 0v5.117a.395.395 0 01-.395.395zm6.033 0a.396.396 0 01-.319-.163l-2.833-3.858v3.626a.395.395 0 01-.79 0V8.108a.396.396 0 01.714-.232l2.833 3.857V8.108a.395.395 0 11.79 0v5.117a.395.395 0 01-.395.395zm4.126-3.717h-1.947v1.146h1.541a.395.395 0 010 .79h-1.541v1.146h1.947a.395.395 0 010 .79h-2.342a.395.395 0 01-.395-.395V8.108a.395.395 0 01.395-.395h2.342a.395.395 0 010 .79z"/>
    </svg>
  )
}

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
    title: 'ฝ่ายสนับสนุน',
    links: [
      { label: 'เคล็ดลับความสะอาด', href: '/blog' },
      { label: 'คำถามที่พบบ่อย', href: '/faq' },
      { label: 'ข่าวสาร', href: '/blog' },
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
          <form className="mt-6 flex w-full max-w-xl mx-auto flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              className="min-w-0 flex-1 px-5 py-3 rounded-full bg-white border border-white shadow-sm text-[#002d5f] placeholder:text-gray-400 text-sm focus:outline-none focus:border-[#0079c1] transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-[#0079c1] hover:bg-[#0066a8] text-white rounded-full px-6 py-3 sm:py-0 font-semibold shadow-md transition-[background-color] sm:flex-shrink-0 text-sm"
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
                {CONTACT_INFO.phone && <div>{CONTACT_INFO.phone}</div>}
                {CONTACT_INFO.email && <div>{CONTACT_INFO.email}</div>}
                {CONTACT_INFO.address && <div>{CONTACT_INFO.address}</div>}
                {!CONTACT_INFO.phone && !CONTACT_INFO.email && !CONTACT_INFO.address && (
                  <Link href="/contact" className="text-white/80 hover:text-[#4db8ff]">
                    ติดต่อเราผ่านแบบฟอร์ม
                  </Link>
                )}
                <div>@captainmaid</div>
              </div>
              {/* Social */}
              <div className="flex gap-2 mt-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0079c1] flex items-center justify-center transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0079c1] flex items-center justify-center transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0079c1] flex items-center justify-center transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="LINE"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0079c1] flex items-center justify-center transition-colors"
                >
                  <LineIcon className="w-4 h-4" />
                </a>
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
