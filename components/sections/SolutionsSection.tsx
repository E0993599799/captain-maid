'use client';

import { Bath, ChefHat, Package, Shirt, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import type { HomeCopy } from './home-copy';

const iconMap = {
  chef: ChefHat,
  bath: Bath,
  sparkles: Sparkles,
  shirt: Shirt,
  package: Package,
} as const;

export function SolutionsSection({ copy }: { copy: HomeCopy['solutions'] }) {
  return (
    <Section id="solutions" className="bg-white">
      <Container>
        <SectionHeader eyebrow={copy.badge} title={copy.title} description={copy.subtitle} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {copy.cards.map((card) => {
            const Icon = iconMap[card.icon];
            return (
              <article key={card.title} className="rounded-[28px] border border-[#D7E7FB] bg-white p-5 shadow-[0_18px_40px_rgba(10,86,194,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(10,86,194,0.12)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A56C2] text-white shadow-[0_16px_30px_rgba(10,86,194,0.2)]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
