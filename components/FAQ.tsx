import { faqItems } from '@/data/faqs';
import { FAQAccordion } from './FAQAccordion';

export function FAQ() {
  return <FAQAccordion items={faqItems.slice(0, 6)} title="คำถามที่พบบ่อย" subtitle="รวมคำถามที่ลูกค้าถามบ่อยที่สุด" />;
}
