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
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="why-captain-maid-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0079c1]">Made for real homes</p>
        <h2 id="why-captain-maid-title" className="mb-10 text-3xl font-extrabold leading-tight text-[#002d5f] sm:text-4xl">
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
            <div className="relative flex h-44 w-44 flex-col items-center justify-center rounded-full border-2 border-[#002d5f] text-[#002d5f] sm:h-48 sm:w-48">
              <Image
                src="/images/logo.png"
                alt="Captain Maid"
                width={40}
                height={40}
                className="absolute top-5 h-8 w-8 object-contain"
              />
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
