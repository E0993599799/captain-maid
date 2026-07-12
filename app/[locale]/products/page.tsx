import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationEnhanced />
      <main className="max-w-7xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-cm-navy mb-12">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
