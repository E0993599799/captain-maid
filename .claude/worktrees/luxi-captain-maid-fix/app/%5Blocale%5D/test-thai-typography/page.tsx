import { ThaiTypographyTest } from '@/components/ThaiTypographyTest';

export const metadata = {
  title: 'Thai Typography Test - Captain Maid',
  description: 'Typography and design validation for Thai text rendering',
};

export default function ThaiTypographyTestPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <ThaiTypographyTest />
    </main>
  );
}
