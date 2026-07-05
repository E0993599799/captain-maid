export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>About Captain Maid</h1>
      <div style={{ lineHeight: '1.8', fontSize: '1rem', color: '#333' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Our Story</h2>
        <p style={{ marginBottom: '1rem' }}>Captain Maid was founded with a simple mission: to make home cleaning easier and safer with natural products.</p>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Our Values</h2>
        <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
          <li>Quality: Premium ingredients</li>
          <li>Safety: Non-toxic products</li>
          <li>Sustainability: Eco-friendly</li>
          <li>Innovation: Constantly improving</li>
        </ul>
      </div>
    </div>
  );
}
