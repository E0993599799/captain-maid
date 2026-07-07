'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { trackEvent } from '@/lib/analytics';
import { Button } from './ui/button';

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

type FilterType = 'category' | 'scent' | 'need';

export function ProductFilter({ products, onFilterChange }: ProductFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<FilterType, Set<string>>>(() => ({
    category: new Set(),
    scent: new Set(),
    need: new Set(),
  }));

  const allCategories = [...new Set(products.map(p => p.filters.category))];
  const allScents = [...new Set(products.map(p => p.filters.scent))];
  const allNeeds = [...new Set(products.flatMap(p => p.filters.need))];

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      if (activeFilters.category.size > 0) {
        filtered = filtered.filter(p => activeFilters.category.has(p.filters.category));
      }
      if (activeFilters.scent.size > 0) {
        filtered = filtered.filter(p => activeFilters.scent.has(p.filters.scent));
      }
      if (activeFilters.need.size > 0) {
        filtered = filtered.filter(p => p.filters.need.some(n => activeFilters.need.has(n)));
      }

      onFilterChange(filtered);
    };

    applyFilters();
  }, [activeFilters, products, onFilterChange]);

  const handleFilterClick = (type: FilterType, value: string) => {
    setActiveFilters(prev => {
      const newSet = new Set(prev[type]);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      
      trackEvent('filter_product', { filter_type: type, filter_value: value });
      return { ...prev, [type]: newSet };
    });
  };

  const renderFilterGroup = (title: string, type: FilterType, options: string[]) => (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => {
          const isActive = activeFilters[type].has(option);
          return (
            <Button
              key={option}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterClick(type, option)}
            >
              {option}
            </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-4 border rounded-lg">
      {renderFilterGroup('Category', 'category', allCategories)}
      {renderFilterGroup('Scent', 'scent', allScents)}
      {renderFilterGroup('Customer Need', 'need', allNeeds)}
    </div>
  );
}
