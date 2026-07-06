'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'safety',
    question: 'Are Captain Maid products safe for children and pets?',
    answer:
      'Yes! All Captain Maid products are formulated with nature-derived ingredients and are safe for homes with children and pets. They are dermatologist-tested and do not contain harsh chemicals like chlorine or ammonia.',
  },
  {
    id: 'ingredients',
    question: 'What are the key ingredients?',
    answer:
      'Our products feature premium ingredients like Lavender extract from Germany and Tea Tree extract from Spain, combined with our advanced encapsulation technology for superior cleaning power while maintaining safety.',
  },
  {
    id: 'effectiveness',
    question: 'How effective are Captain Maid products?',
    answer:
      'Captain Maid products eliminate 99.9% of germs and are highly effective against tough stains. Our advanced formula provides quick-dry results and is compatible with robot cleaners and all floor types.',
  },
  {
    id: 'environment',
    question: 'Are Captain Maid products eco-friendly?',
    answer:
      'Yes, Captain Maid is committed to sustainability. Our products use nature-derived ingredients, biodegradable formulas, and minimal plastic packaging. We care about your home and the environment.',
  },
  {
    id: 'shipping',
    question: 'How long does shipping take?',
    answer:
      'We offer standard shipping (5-7 business days) and expedited shipping (2-3 business days). All orders include tracking information. Free shipping on orders over $50.',
  },
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day money-back guarantee. If you are not satisfied with any Captain Maid product, simply return it for a full refund. No questions asked.',
  },
  {
    id: 'storage',
    question: 'How should I store Captain Maid products?',
    answer:
      'Store products in a cool, dry place away from direct sunlight. Keep bottles upright and tightly sealed. Do not freeze. Products have a shelf life of 2 years when properly stored.',
  },
  {
    id: 'warranty',
    question: 'Do you offer any warranty?',
    answer:
      'All products come with a satisfaction guarantee. If a product does not meet your expectations, we will replace it or refund your money. We stand behind our products 100%.',
  },
];

export const FAQ = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-h2 md:text-h1 font-bold text-[#001360] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-body text-[#506090]">
            Find answers to common questions about Captain Maid products
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              viewport={{ once: true, margin: '-50px' }}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: expanded === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="text-[#02a6e3]" size={24} />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {expanded === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-[#b0d0f0] to-[#90d0f0] rounded-xl text-center">
          <p className="text-[#001360] mb-4">
            Can't find your answer? We're here to help!
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-[#02a6e3] text-white rounded-lg hover:bg-[#0090c8] transition-colors font-semibold"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};
