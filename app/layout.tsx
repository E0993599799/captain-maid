import type { ReactNode } from 'react';
import '@/app/globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
