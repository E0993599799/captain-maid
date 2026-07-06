import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationEnhanced />
      <main className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-cm-navy mb-8">Contact Us</h1>
        <p className="text-lg text-cm-text-secondary leading-relaxed">
          Coming soon - Get in touch with Captain Maid team.
        </p>
      </main>
      <Footer />
    </div>
  );
}
