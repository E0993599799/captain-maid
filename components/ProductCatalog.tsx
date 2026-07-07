'use client';

import { useMemo, useState } from 'react';
import { products, getCustomerNeedFilters, getProductCategories, getProductScents, Product } from '@/data/products';
import { ProductFilter } from './ProductFilter';
import { ProductGrid } from './ProductGrid';

type FilterState = {
  category: string;
  scent: string;
  need: string;
};

export function ProductCatalog({ items = products }: { items?: Product[] }) {
  const [filter, setFilter] = useState<FilterState>({ category: '', scent: '', need: '' });

  const filtered = useMemo(() => {
    return items.filter((product) => {
      const categoryMatch = !filter.category || product.filters.category === filter.category;
      const scentMatch = !filter.scent || product.filters.scent === filter.scent;
      const needMatch = !filter.need || product.filters.needs.includes(filter.need);
      return categoryMatch && scentMatch && needMatch;
    });
  }, [items, filter]);

  return (
    <div className="space-y-6">
      <ProductFilter
        categories={getProductCategories()}
        scents={getProductScents()}
        needs={getCustomerNeedFilters()}
        value={filter}
        onChange={setFilter}
      />
      <div className="flex items-center justify-between gap-4 text-sm text-captain-muted">
        <p>{filtered.length} products found</p>
        <p>Filters update instantly</p>
      </div>
      <ProductGrid products={filtered} emptyMessage="ไม่พบสินค้าที่ตรงกับตัวกรอง" />
    </div>
  );
}
