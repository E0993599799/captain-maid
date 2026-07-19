import { ShieldCheck, Award, Sparkles, HeartHandshake } from 'lucide-react'
import Reveal from '@/components/Reveal'

const values = [
  { icon: ShieldCheck, title: 'Family Safe', sub: 'ปลอดภัยสำหรับทุกคนในบ้าน' },
  { icon: Award, title: 'Quality You Can Count On', sub: 'คุณภาพที่เชื่อถือได้ทุกหยด' },
  { icon: Sparkles, title: 'Effective Cleaning', sub: 'สะอาดหมดจด เต็มพลังจริง' },
  { icon: HeartHandshake, title: 'Trusted Care', sub: 'ดูแลบ้านด้วยความใส่ใจ' },
]

export default function ValueProps() {
  return (
    <section className="py-12 bg-white border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-[#e6f3fa] flex items-center justify-center mb-3 group-hover:bg-[#0079c1] transition-all duration-300">
                <v.icon className="w-7 h-7 text-[#0079c1] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-bold text-[#002d5f]">{v.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{v.sub}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
