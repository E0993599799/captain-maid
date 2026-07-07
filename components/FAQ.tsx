import { faqItems } from '@/data/faqs';
import { FAQAccordion } from './FAQAccordion';

export function FAQ() {
  return <FAQAccordion items={faqItems.slice(0, 6)} title="Frequently Asked Questions" subtitle="Answers to the questions customers ask most often" />;
}
