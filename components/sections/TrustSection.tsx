'use client';

import Image from 'next/image';
import { CheckCircle2, Leaf, ShieldCheck, Users } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import slide5Desktop from '../assets/landing/05_Trust-and-Call-to-Action_Desktop.png';

export function TrustSection({ locale }: { locale: 'en' | 'th' }) {
  return (
    <Section id="trust" className="bg-white">
      <Container>
        <div className="grid gap-8 overflow-hidden rounded-[36px] border border-[#D7E7FB] bg-gradient-to-br from-[#EAF4FF] via-white to-[#F7FBFF] p-6 shadow-[0_22px_60px_rgba(10,86,194,0.09)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10 lg:items-center">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2] shadow-[0_12px_24px_rgba(10,86,194,0.06)]">
              Trust
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl">
              {locale === 'th' ? 'แบรนด์ที่เชื่อถือได้และดูแลบ้านอย่างมั่นใจ' : 'Trusted quality you can count on'}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              {locale === 'th'
                ? 'ระบบภาพลักษณ์ที่สะอาด ชัดเจน และให้ความมั่นใจในทันที'
                : 'A clean, clear brand system that sends confidence from the first screen.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]"><CheckCircle2 size={16} className="text-[#0A56C2]" />{locale === 'th' ? 'ผลิตในประเทศไทย' : 'Made in Thailand'}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]"><ShieldCheck size={16} className="text-[#0A56C2]" />{locale === 'th' ? 'ผ่านการทดสอบคุณภาพ' : 'Quality Tested'}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]"><Leaf size={16} className="text-[#0A56C2]" />{locale === 'th' ? 'ใส่ใจสิ่งแวดล้อม' : 'Eco Friendly'}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]"><Users size={16} className="text-[#0A56C2]" />{locale === 'th' ? 'แบรนด์ที่ได้รับความไว้วางใจ' : 'Trusted Brand'}</span>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_18px_40px_rgba(10,86,194,0.08)] aspect-[16/11]">
            <Image src={slide5Desktop} alt="Captain Maid trust visual" fill className="object-cover object-center" sizes="(min-width: 1024px) 44vw, 100vw" />
          </figure>
        </div>
      </Container>
    </Section>
  );
}
