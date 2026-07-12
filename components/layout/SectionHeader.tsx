'use client';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
  align = 'left',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-3xl space-y-4 ${alignClass} ${className}`.trim()}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
