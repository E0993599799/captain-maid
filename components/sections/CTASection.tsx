'use client';

import { Link } from '@/lib/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import type { HomeCopy } from './home-copy';

export function CTASection({ copy, locale }: { copy: HomeCopy['cta']; locale: 'en' | 'th' }) {
  return (
    <Section id="contact" className="bg-white">
      <Container>
        <div className="grid gap-6 rounded-[36px] bg-[#0A56C2] px-6 py-10 text-white shadow-[0_24px_60px_rgba(10,86,194,0.24)] sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{copy.title}</h2>
            <p className="max-w-2xl text-lg leading-8 text-white/90">{copy.subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href={`/${locale}/products`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0A56C2] shadow-[0_16px_32px_rgba(255,255,255,0.16)] transition hover:-translate-y-0.5 flex-1 sm:flex-none">
              {copy.primary}
            </Link>
            <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 flex-1 sm:flex-none">
              {copy.secondary}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
