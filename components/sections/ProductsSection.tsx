'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import type { HomeCopy } from './home-copy';
import greenBottle from '../assets/green-bottle.jpg';
import pinkBottle from '../assets/pink-bottle.jpg';
import purpleBottle from '../assets/purple-bottle.jpg';

export function ProductsSection({ copy }: { copy: HomeCopy['products'] }) {
  const cards = [
    { image: greenBottle, title: 'Tea Tree Flash', description: 'Green packaging for floor care and a fresh home-cleaning story.' },
    { image: pinkBottle, title: 'Floral Passionate', description: 'Pink packaging for a softer fragrance-led daily cleaning story.' },
    { image: purpleBottle, title: 'Lavender Kerry', description: 'Purple packaging for a calm, premium cleaning presence.' },
  ];

  return (
    <Section className="bg-[#F8FBFF]">
      <Container>
        <SectionHeader eyebrow={copy.badge} title={copy.title} description={copy.subtitle} />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cards.map((product) => (
            <article key={product.title} className="overflow-hidden rounded-[32px] border border-[#D7E7FB] bg-gradient-to-br from-[#F8FBFF] to-white shadow-[0_18px_40px_rgba(10,86,194,0.08)]">
              <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(10,86,194,0.1),transparent_52%)] p-6">
                <Image src={product.image} alt={product.title} width={420} height={420} className="h-auto w-[180px] object-contain drop-shadow-[0_20px_40px_rgba(10,86,194,0.16)]" />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-2xl font-semibold text-slate-900">{product.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{product.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0A56C2]">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF4FF]">
                    <Star size={16} className="fill-[#0A56C2] text-[#0A56C2]" />
                  </span>
                  Captain Maid premium package
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
