'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navigation />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Get in Touch</h1>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            style={{ display: 'grid', gap: '1.5rem' }}
          >
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                }}
                placeholder="Your name"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
                placeholder="Your message..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              style={{
                padding: '0.75rem',
                background: loading ? '#ccc' : '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: '1rem',
                  background: '#22c55e',
                  color: 'white',
                  borderRadius: '0.5rem',
                  textAlign: 'center',
                }}
              >
                ✅ Message received! We'll get back to you soon.
              </motion.div>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>📧 Email</h3>
              <p style={{ color: '#666' }}>support@captain-maid.com</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>📞 Phone</h3>
              <p style={{ color: '#666' }}>+66 (0) XX-XXX-XXXX</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>📍 Address</h3>
              <p style={{ color: '#666' }}>Bangkok, Thailand</p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>Follow Us</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ color: '#0066cc', fontWeight: 'bold', textDecoration: 'none' }}>Facebook</a>
                <a href="#" style={{ color: '#0066cc', fontWeight: 'bold', textDecoration: 'none' }}>Instagram</a>
                <a href="#" style={{ color: '#0066cc', fontWeight: 'bold', textDecoration: 'none' }}>Twitter</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
