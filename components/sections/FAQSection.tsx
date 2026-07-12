'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import type { HomeCopy } from './home-copy';

export function FAQSection({ copy, locale }: { copy: HomeCopy['faq']; locale: 'en' | 'th' }) {
  return (
    <Section id="faq" className="bg-white">
      <Container>
        <SectionHeader eyebrow={copy.badge} title={copy.title} description={copy.subtitle} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {copy.items.map((item) => (
            <article key={item.question.th} className="rounded-[28px] border border-[#D7E7FB] bg-[#F8FBFF] p-6 shadow-[0_16px_30px_rgba(10,86,194,0.06)]">
              <h3 className="text-lg font-semibold text-slate-900">{item.question[locale]}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer[locale]}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
