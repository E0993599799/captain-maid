'use client';

import { Container } from '@/components/layout/Container';
import type { HomeCopy } from './home-copy';

export function FooterSection({ copy, locale }: { copy: HomeCopy['footer']; locale: 'en' | 'th' }) {
  return (
    <footer className="border-t border-[#D7E7FB] bg-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-[#EAF4FF]" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">Captain Maid</p>
                <p className="text-xs text-slate-500">Premium home care</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">{copy.description}</p>
          </div>
          <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <a href="#solutions" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{locale === 'th' ? 'โซลูชัน' : copy.links.solutions}</a>
            <a href="#products" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{locale === 'th' ? 'สินค้า' : copy.links.products}</a>
            <a href="#trust" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{locale === 'th' ? 'ความน่าเชื่อถือ' : copy.links.trust}</a>
            <a href="#faq" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{locale === 'th' ? 'คำถาม' : copy.links.faq}</a>
          </div>
        </div>
      </Container>
      <div className="border-t border-[#D7E7FB] px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        {copy.copyright}
      </div>
    </footer>
  );
}
