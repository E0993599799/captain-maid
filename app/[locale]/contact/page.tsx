export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Contact Us</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Get in Touch</h3>
          <form style={{ display: 'grid', gap: '1rem' }}>
            <input type="text" placeholder="Your Name" style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.25rem' }} />
            <input type="email" placeholder="Your Email" style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.25rem' }} />
            <textarea placeholder="Your Message" rows={4} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.25rem', fontFamily: 'inherit' }} />
            <button style={{ padding: '0.75rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
          </form>
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Contact Info</h3>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</p>
            <p style={{ color: '#666' }}>support@captain-maid.com</p>
          </div>
          <div>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Follow Us</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: '#0066cc' }}>Facebook</a>
              <a href="#" style={{ color: '#0066cc' }}>Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
