import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
type Locale = (typeof locales)[number];
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
