import { Product } from '@/data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p className="py-10 text-center text-captain-muted">{emptyMessage || 'No products found.'}</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
