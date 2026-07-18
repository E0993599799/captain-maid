import { redirect } from 'next/navigation'

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }]
}

export default function LocalePage() {
  // เว็บไซต์หลักแสดงที่ root — locale routes ชี้กลับหน้าแรก
  redirect('/')
}
