import { Shield, Beaker, Leaf } from 'lucide-react'
import { cmsText, type CmsBindings } from '@/lib/cms/bindings'
import CmsPicture from '@/components/cms/CmsPicture'

const benefits = [
  {
    icon: Shield,
    title: 'ปลอดภัย อ่อนโยน',
    sub: 'สูตรอ่อนโยน ปราศจากสารอันตราย ปลอดภัยสำหรับทุกคนในครอบครัว',
  },
  {
    icon: Beaker,
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

export default function WhyCaptainMaid({ bindings = {} }: { bindings?: CmsBindings }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="why-captain-maid-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p data-cms-key="home.why.eyebrow" className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0079c1]">{cmsText(bindings, 'home.why.eyebrow', 'Made for real homes')}</p>
        <h2 data-cms-key="home.why.heading" id="why-captain-maid-title" className="mb-10 text-3xl font-extrabold leading-tight text-[#002d5f] sm:text-4xl">
          {cmsText(bindings, 'home.why.heading', 'ทำไมต้อง Captain Maid')}
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Image */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-[4/5] relative">
              <CmsPicture
                bindings={bindings}
                cmsKey="home.why.image"
                fallback={{ src: '/images/why-us.png', alt: 'Captain Maid family care' }}
                pictureClassName="absolute inset-0 block h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {benefits.map((b, index) => (
                <div key={b.title} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#e6f3fa] shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#0079c1] transition-colors duration-300">
                    <b.icon className="w-5 h-5 text-[#0079c1] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 data-cms-key={`home.why.benefit.${index + 1}.title`} className="text-base font-bold text-[#002d5f]">{cmsText(bindings, `home.why.benefit.${index + 1}.title`, b.title)}</h4>
                    <p data-cms-key={`home.why.benefit.${index + 1}.description`} className="text-sm text-gray-400 mt-0.5 leading-relaxed">{cmsText(bindings, `home.why.benefit.${index + 1}.description`, b.sub)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand logo + stats */}
          <div className="lg:col-span-3 flex flex-col items-center gap-8">
            <CmsPicture
              bindings={bindings}
              cmsKey="home.why.logo"
              fallback={{ src: '/images/logo.png', alt: 'Captain Maid' }}
              pictureClassName="block w-44 sm:w-52 lg:w-56"
              imgClassName="h-auto w-full object-contain"
              width={240}
              height={328}
            />
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-6 text-center">
              {stats.map((s, index) => (
                <div key={s.label}>
                  <div data-cms-key={`home.why.stat.${index + 1}.value`} className="text-3xl font-extrabold text-[#0079c1]">{cmsText(bindings, `home.why.stat.${index + 1}.value`, s.value)}</div>
                  <div data-cms-key={`home.why.stat.${index + 1}.label`} className="text-xs text-gray-400 font-medium mt-0.5">{cmsText(bindings, `home.why.stat.${index + 1}.label`, s.label)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
