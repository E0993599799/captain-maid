export default function ProductsPage() {
  const products = [
    { id: 1, name: 'Glass Cleaner', description: 'Streak-free glass cleaner', image: '🪟' },
    { id: 2, name: 'Drain Foamer', description: 'Powerful drain cleaner', image: '🚿' },
    { id: 3, name: 'Floor Cleaner', description: 'Safe for all floors', image: '🧹' },
    { id: 4, name: 'All-Purpose', description: 'Clean everything', image: '🧼' },
  ];
  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>Our Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #e0e0e0', borderRadius: '0.5rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{product.image}</div>
            <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
            <p style={{ color: '#666' }}>{product.description}</p>
            <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
}
