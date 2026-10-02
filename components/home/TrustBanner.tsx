import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { cmsLink, cmsText, type CmsBindings } from '@/lib/cms/bindings'
import CmsPicture from '@/components/cms/CmsPicture'

export default function TrustBanner({ bindings = {} }: { bindings?: CmsBindings }) {
  const cta = cmsLink(bindings, 'home.trust.cta', { text: 'เกี่ยวกับเรา', href: '/about' })
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="trust-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[460px] items-center overflow-hidden rounded-3xl shadow-xl sm:min-h-[420px]">
          <Reveal className="absolute inset-0">
            <CmsPicture
              bindings={bindings}
              cmsKey="home.trust.image"
              fallback={{ src: '/images/trust-banner.png', alt: 'Trust quality you can count on' }}
              pictureClassName="absolute inset-0 block h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </Reveal>
          <div className="absolute inset-0 lg:right-auto lg:w-[55%] bg-gradient-to-r from-[#002d5f]/70 via-[#002d5f]/40 to-transparent" />

          <Reveal delayMs={100} className="relative max-w-lg p-5 sm:p-12">
            <div className="rounded-3xl bg-[#002d5f]/85 p-7 text-white shadow-2xl backdrop-blur sm:p-10">
              <p data-cms-key="home.trust.eyebrow" className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8ed7ff]">{cmsText(bindings, 'home.trust.eyebrow', 'Our promise')}</p>
              <h2 data-cms-key="home.trust.title" id="trust-title" className="text-3xl font-extrabold leading-tight sm:text-4xl">
                {cmsText(bindings, 'home.trust.title', 'Trust quality you can count on.')}
              </h2>
              <p data-cms-key="home.trust.description" className="mt-4 text-white/75 text-sm sm:text-base leading-relaxed">
                {cmsText(bindings, 'home.trust.description', 'เราคัดสรรวัตถุดิบคุณภาพสูง พัฒนาด้วยนวัตกรรม เพื่อให้ทุกบ้านสะอาด ปลอดภัย และคุณวางใจได้ทุกวัน')}
              </p>
              <Link
                data-cms-key="home.trust.cta"
                href={cta.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold border-b border-white/60 pb-0.5 hover:gap-3 transition-all"
              >
                {cta.text} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
