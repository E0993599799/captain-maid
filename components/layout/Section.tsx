'use client';

import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`.trim()}>
      {children}
    </section>
  );
}
