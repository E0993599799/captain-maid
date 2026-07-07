import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';
export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationEnhanced />
      <main className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-cm-navy mb-8">About Captain Maid</h1>
        <p className="text-lg text-cm-text-secondary leading-relaxed">
          Coming soon - Learn more about Captain Maid's mission to provide premium cleaning products for every home.
        </p>
      </main>
      <Footer />
    </div>
  );
}
