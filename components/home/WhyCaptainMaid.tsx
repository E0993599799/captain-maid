import Image from 'next/image'
import { ShieldCheck, FlaskConical, Leaf } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'ปลอดภัย อ่อนโยน',
    sub: 'สูตรอ่อนโยน ปราศจากสารอันตราย ปลอดภัยสำหรับทุกคนในครอบครัว',
  },
  {
    icon: FlaskConical,
    title: 'ประสิทธิภาพที่พิสูจน์ได้',
    sub: 'ผลผ่านการทดสอบประสิทธิภาพในการทำความสะอาดและฆ่าเชื้ออย่างมีประสิทธิภาพ',
  },
  {
    icon: Leaf,
    title: 'ใส่ใจสิ่งแวดล้อม',
    sub: 'เลือกใช้ส่วนผสมที่เป็นมิตรกับสิ่งแวดล้อม บรรจุภัณฑ์รีไซเคิลได้',
  },
]

const stats = [
  { value: '50+', label: 'ผลิตภัณฑ์คุณภาพ' },
  { value: '1M+', label: 'ครอบครัวที่ไว้วางใจ' },
  { value: '99%', label: 'ความพึงพอใจ' },
]

export default function WhyCaptainMaid() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002d5f] mb-10">
          ทำไมต้อง Captain Maid
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Image */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-[4/5] relative">
              <Image
                src="/images/why-us.png"
                alt="Captain Maid family care"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#e6f3fa] shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#0079c1] transition-colors duration-300">
                    <b.icon className="w-5 h-5 text-[#0079c1] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#002d5f]">{b.title}</h4>
                    <p className="text-sm text-gray-400 mt-0.5 leading-relaxed">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge + stats */}
          <div className="lg:col-span-3 flex flex-col items-center gap-8">
            <div className="w-44 h-44 rounded-full border-2 border-[#002d5f] flex flex-col items-center justify-center text-[#002d5f] relative">
              <span className="absolute top-4 text-[8px] tracking-[0.25em] font-semibold uppercase">
                Quality you can count on
              </span>
              <span className="text-2xl font-extrabold leading-tight text-center">
                Captain
                <br />
                Maid
              </span>
              <span className="absolute bottom-5 text-[9px] tracking-widest font-semibold">
                SINCE 2020
              </span>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-6 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-[#0079c1]">{s.value}</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
