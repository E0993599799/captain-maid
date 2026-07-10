'use client';

import { useMemo, useState } from 'react';
import { FaqItem } from '@/data/faqs';
import { Button } from './ui/button';

type FAQAccordionProps = {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  showCategories?: boolean;
};

export function FAQAccordion({ items, title = 'FAQ', subtitle, showCategories = false }: FAQAccordionProps) {
  const [openQuestion, setOpenQuestion] = useState(items[0]?.question.th ?? '');
  const [activeCategory, setActiveCategory] = useState<'all' | FaqItem['category']>('all');
  const lang: 'th' | 'en' = 'th';

  const categories = useMemo(() => {
    if (!showCategories) return [];
    const cats: FaqItem['category'][] = ['before-purchase', 'how-to-use', 'surfaces', 'formula', 'family-safety', 'where-to-buy'];
    return cats;
  }, [showCategories]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter(item => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary md:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 text-text-secondary">{subtitle}</p> : null}
      </div>

      {showCategories && (
        <div className="flex flex-wrap gap-2 border-b pb-4">
          <Button variant={activeCategory === 'all' ? 'default' : 'outline'} onClick={() => setActiveCategory('all')}>All</Button>
          {categories.map(cat => (
            <Button key={cat} variant={activeCategory === cat ? 'default' : 'outline'} onClick={() => setActiveCategory(cat)}>
              {cat.replace(/-/g, ' ')}
            </Button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {filteredItems.map((item) => {
          const questionText = item.question[lang];
          const isOpen = questionText === openQuestion;
          return (
            <div key={questionText} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setOpenQuestion(isOpen ? '' : questionText)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <h3 className="font-semibold text-text-primary">{questionText}</h3>
                <span className="text-2xl font-light text-primary transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {isOpen ? (
                <div className="border-t px-5 pb-4 text-sm leading-7 text-text-secondary">
                  <p className="pt-4">{item.answer[lang]}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
