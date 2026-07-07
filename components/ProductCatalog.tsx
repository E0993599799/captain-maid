'use client';

import { useState } from 'react';
import { products, Product } from '@/data/products';
import { ProductFilter } from './ProductFilter';
import { ProductGrid } from './ProductGrid';

export function ProductCatalog({ items = products }: { items?: Product[] }) {
  const [filtered, setFiltered] = useState<Product[]>(items);

  return (
    <div className="space-y-6">
      <ProductFilter
        products={items}
        onFilterChange={setFiltered}
      />
      <div className="flex items-center justify-between gap-4 text-sm text-captain-muted">
        <p>{filtered.length} products found</p>
        <p>Filters update instantly</p>
      </div>
      <ProductGrid products={filtered} emptyMessage="ไม่พบสินค้าที่ตรงกับตัวกรอง" />
    </div>
  );
}
