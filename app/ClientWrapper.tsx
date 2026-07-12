'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type ClientWrapperProps = {
  children: ReactNode;
  locale: string;
  messages: any;
  fonts: string;
};

export function ClientWrapper({
  children,
  locale,
  messages,
  fonts,
}: ClientWrapperProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem suppressHydrationWarning>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className={fonts}>{children}</div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
