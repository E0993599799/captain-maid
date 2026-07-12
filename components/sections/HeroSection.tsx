'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import type { HomeCopy } from './home-copy';
import heroImage from '../assets/landing/01_Brand-Hero_Desktop.png';

export function HeroSection({ copy, locale }: { copy: HomeCopy['hero']; locale: 'en' | 'th' }) {
  return (
    <Section className="bg-gradient-to-br from-[#EAF4FF] via-white to-[#F7FBFF]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2] shadow-[0_12px_24px_rgba(10,86,194,0.06)]">
              {copy.badge}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-[#083A75] sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              {copy.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 rounded-full bg-[#0A56C2] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(10,86,194,0.18)] transition hover:bg-[#073E91]">
                {copy.primary}
                <ArrowRight size={16} />
              </Link>
              <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-6 py-3 text-sm font-semibold text-[#0A56C2] transition hover:border-[#0A56C2]">
                {copy.secondary}
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[36px] border border-[#D7E7FB] bg-white shadow-[0_24px_60px_rgba(10,86,194,0.10)]">
            <div className="relative aspect-[16/11]">
              <Image src={heroImage} alt="Captain Maid hero" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
