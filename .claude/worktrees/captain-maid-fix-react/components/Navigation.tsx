'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 2rem',
      background: 'rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <Link href="/" style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        🧹 Captain Maid
      </Link>

      {/* Desktop Menu */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        color: 'white',
      }}>
        <a href="/#products" style={{ cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s' }}>Products</a>
        <a href="/blog" style={{ cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s' }}>Blog</a>
        <a href="/#about" style={{ cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s' }}>About</a>
        <a href="#contact" style={{ cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s' }}>Contact</a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
}
