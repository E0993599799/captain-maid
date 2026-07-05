'use client';

import Link from 'next/link';
import { Sparkles, Leaf, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    { icon: Leaf, title: 'Natural Ingredients', desc: 'Eco-friendly, safe components' },
    { icon: Sparkles, title: 'Powerful Cleaning', desc: 'Effective against tough stains' },
    { icon: Heart, title: 'Family Safe', desc: 'Gentle on family and pets' },
  ];

  const products = [
    { id: 1, name: 'Glass Cleaner', emoji: '🪟', price: '5.99' },
    { id: 2, name: 'Drain Foamer', emoji: '🚿', price: '7.99' },
    { id: 3, name: 'Floor Cleaner', emoji: '🧹', price: '6.99' },
    { id: 4, name: 'All-Purpose', emoji: '🧼', price: '4.99' },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navigation */}
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
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          🧹 Captain Maid
        </div>
        <div style={{
          display: 'flex',
          gap: '2rem',
          color: 'white',
        }}>
          <a href="#products" style={{ cursor: 'pointer', opacity: 0.9 }}>Products</a>
          <a href="/blog" style={{ cursor: 'pointer', opacity: 0.9 }}>Blog</a>
          <a href="#about" style={{ cursor: 'pointer', opacity: 0.9 }}>About</a>
          <a href="#contact" style={{ cursor: 'pointer', opacity: 0.9 }}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0066cc 0%, #004fa3 100%)',
        color: 'white',
        padding: '6rem 2rem',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '1rem',
            fontWeight: 'bold',
            lineHeight: 1.2,
          }}>
            Made for Easy Home Cleaning
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 2rem',
          }}>
            Premium cleaning products made from natural ingredients. Clean better, live better.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2.5rem',
              background: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Shop Now <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </section>

      {/* Features */}
      <section style={{
        padding: '4rem 2rem',
        background: '#f9fafb',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          Why Choose Captain Maid?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                }}
              >
                <Icon size={48} style={{
                  color: '#0066cc',
                  marginBottom: '1rem',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }} />
                <h3 style={{
                  fontSize: '1.25rem',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666' }}>
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section id="products" style={{
        padding: '4rem 2rem',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          Featured Products
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '0.75rem',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
              }}>
                {product.emoji}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                {product.name}
              </h3>
              <p style={{
                fontSize: '1.5rem',
                color: '#0066cc',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}>
                ${product.price}
              </p>
              <button style={{
                padding: '0.5rem 1rem',
                background: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/products" style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: '#0066cc',
            color: 'white',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}>
            View All Products
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #0066cc 0%, #004fa3 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Join Thousands of Happy Customers
        </h2>
        <p style={{ fontSize: '1rem', marginBottom: '2rem', opacity: 0.9 }}>
          Experience the difference of natural, effective cleaning products.
        </p>
        <Link href="/products" style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          background: '#22c55e',
          color: 'white',
          borderRadius: '0.5rem',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}>
          Start Shopping Today
        </Link>
      </section>
    </div>
  );
}
