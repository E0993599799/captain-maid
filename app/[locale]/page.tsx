import Link from 'next/link';
import { Sparkles, Leaf, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0066cc 0%, #004fa3 100%)' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Captain Maid</div>
        <div style={{ display: 'flex', gap: '2rem', color: 'white' }}>
          <a href="#products">Products</a>
          <a href="/blog">Blog</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section style={{ padding: '4rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>Made for Easy Home Cleaning</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>Premium cleaning products made from natural ingredients</p>
        <button style={{ padding: '0.75rem 2rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>Shop Now</button>
      </section>

      <section style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Leaf size={48} style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Natural Ingredients</h3>
          <p style={{ opacity: 0.9 }}>Eco-friendly, safe components</p>
        </div>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Sparkles size={48} style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Powerful Cleaning</h3>
          <p style={{ opacity: 0.9 }}>Effective against tough stains</p>
        </div>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Heart size={48} style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Family Safe</h3>
          <p style={{ opacity: 0.9 }}>Gentle on your family and pets</p>
        </div>
      </section>

      <section style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
        <h2 style={{ marginBottom: '1rem' }}>Ready to Clean Better?</h2>
        <Link href="/products" style={{ padding: '0.75rem 2rem', background: '#22c55e', color: 'white', borderRadius: '0.5rem', display: 'inline-block', fontWeight: 'bold' }}>Explore Products</Link>
      </section>
    </div>
  );
}
