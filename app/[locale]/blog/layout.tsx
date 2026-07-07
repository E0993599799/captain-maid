import type { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

type Props = {
  children: ReactNode;
};

export default function BlogLayout({ children }: Props) {
  return <>{children}</>;
}
