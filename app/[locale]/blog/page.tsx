export default function BlogPage() {
  const posts = [
    { id: 1, title: 'How to Clean Your Home Naturally', excerpt: 'Discover natural ways to keep your home spotless', date: 'Mar 15, 2026' },
    { id: 2, title: 'Spring Cleaning Tips', excerpt: 'Get your home ready for spring', date: 'Mar 10, 2026' },
    { id: 3, title: 'Safe Cleaning Products for Families', excerpt: 'Learn why natural products matter', date: 'Mar 5, 2026' },
  ];
  return (
    <div style={{ minHeight: '100vh', padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Blog</h1>
      <div style={{ display: 'grid', gap: '2rem' }}>
        {posts.map((post) => (
          <article key={post.id} style={{ border: '1px solid #e0e0e0', borderRadius: '0.5rem', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{post.title}</h2>
            <time style={{ color: '#999', fontSize: '0.9rem' }}>{post.date}</time>
            <p style={{ marginTop: '1rem', color: '#666' }}>{post.excerpt}</p>
            <a href={`/blog/${post.id}`} style={{ color: '#0066cc', fontWeight: 'bold', marginTop: '1rem', display: 'inline-block' }}>Read More →</a>
          </article>
        ))}
      </div>
    </div>
  );
}
