import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Contact | Captain Maid',
  description: 'Official Captain Maid contact information.',
  openGraph: {
    title: 'Contact | Captain Maid',
    description: 'Official Captain Maid contact information.',
    type: 'website',
  },
}

const COPY = {
  th: {
    title: 'ติดต่อ Captain Maid',
    intro: 'ช่องทางติดต่ออย่างเป็นทางการของ Captain Maid',
    email: 'อีเมล',
    phone: 'โทรศัพท์',
    address: 'ที่อยู่',
    empty: 'ขณะนี้ไม่มีช่องทางติดต่อสาธารณะที่ได้รับการยืนยันและเผยแพร่บนเว็บไซต์',
  },
  en: {
    title: 'Contact Captain Maid',
    intro: 'Official contact channels for Captain Maid.',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    empty: 'There are currently no verified public contact channels published on this website.',
  },
} as const

export default async function ContactPage() {
  const requestHeaders = await headers()
  const locale = requestHeaders.get('x-captain-maid-locale') === 'en' ? 'en' : 'th'
  const t = COPY[locale]
  const hasContact = Boolean(CONTACT_INFO.email || CONTACT_INFO.phone || CONTACT_INFO.address)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Captain Maid',
    ...(siteUrl ? { url: siteUrl } : {}),
    ...(CONTACT_INFO.email ? { email: CONTACT_INFO.email } : {}),
    ...(CONTACT_INFO.phone ? { telephone: CONTACT_INFO.phone } : {}),
    ...(CONTACT_INFO.address ? { address: CONTACT_INFO.address } : {}),
  }

  return (
    <div className="min-h-screen bg-[#f7fbfe] pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0079c1]">Captain Maid</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#002d5f] sm:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#52697c] sm:text-lg">{t.intro}</p>
        </div>

        {hasContact ? (
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {CONTACT_INFO.email && (
              <a href={`mailto:${CONTACT_INFO.email}`} className="rounded-2xl border border-[#dce7ef] bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Mail className="h-7 w-7 text-[#0079c1]" aria-hidden="true" />
                <h2 className="mt-5 text-lg font-bold text-[#002d5f]">{t.email}</h2>
                <p className="mt-2 break-all text-sm leading-6 text-[#52697c]">{CONTACT_INFO.email}</p>
              </a>
            )}

            {CONTACT_INFO.phone && (
              <a href={`tel:${CONTACT_INFO.phone}`} className="rounded-2xl border border-[#dce7ef] bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Phone className="h-7 w-7 text-[#0079c1]" aria-hidden="true" />
                <h2 className="mt-5 text-lg font-bold text-[#002d5f]">{t.phone}</h2>
                <p className="mt-2 text-sm leading-6 text-[#52697c]">{CONTACT_INFO.phone}</p>
              </a>
            )}

            {CONTACT_INFO.address && (
              <div className="rounded-2xl border border-[#dce7ef] bg-white p-7 shadow-sm">
                <MapPin className="h-7 w-7 text-[#0079c1]" aria-hidden="true" />
                <h2 className="mt-5 text-lg font-bold text-[#002d5f]">{t.address}</h2>
                <p className="mt-2 text-sm leading-6 text-[#52697c]">{CONTACT_INFO.address}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#dce7ef] bg-white p-7 text-center text-sm leading-6 text-[#52697c] shadow-sm">
            {t.empty}
          </div>
        )}
      </section>
    </div>
  )
}
