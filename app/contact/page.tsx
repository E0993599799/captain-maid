import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/contact'
import { cmsText, getCaptainMaidRuntime } from '@/lib/cms/bindings'

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
  const { bindings } = await getCaptainMaidRuntime('contact', locale)
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
          <p data-cms-key="contact.eyebrow" className="text-sm font-bold uppercase tracking-[0.16em] text-[#0079c1]">{cmsText(bindings, 'contact.eyebrow', 'Captain Maid')}</p>
          <h1 data-cms-key="contact.title" className="mt-3 text-4xl font-bold tracking-tight text-[#002d5f] sm:text-5xl">{cmsText(bindings, 'contact.title', t.title)}</h1>
          <p data-cms-key="contact.intro" className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#52697c] sm:text-lg">{cmsText(bindings, 'contact.intro', t.intro)}</p>
        </div>

        {hasContact ? (
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {CONTACT_INFO.email && (
              <a href={`mailto:${CONTACT_INFO.email}`} className="rounded-2xl border border-[#dce7ef] bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Mail className="h-7 w-7 text-[#0079c1]" aria-hidden="true" />
                <h2 data-cms-key="contact.email.label" className="mt-5 text-lg font-bold text-[#002d5f]">{cmsText(bindings, 'contact.email.label', t.email)}</h2>
                <p data-cms-key="contact.email.value" className="mt-2 break-all text-sm leading-6 text-[#52697c]">{cmsText(bindings, 'contact.email.value', CONTACT_INFO.email)}</p>
              </a>
            )}

            {CONTACT_INFO.phone && (
              <a href={`tel:${CONTACT_INFO.phone}`} className="rounded-2xl border border-[#dce7ef] bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Phone className="h-7 w-7 text-[#0079c1]" aria-hidden="true" />
                <h2 data-cms-key="contact.phone.label" className="mt-5 text-lg font-bold text-[#002d5f]">{cmsText(bindings, 'contact.phone.label', t.phone)}</h2>
                <p data-cms-key="contact.phone.value" className="mt-2 text-sm leading-6 text-[#52697c]">{cmsText(bindings, 'contact.phone.value', CONTACT_INFO.phone)}</p>
              </a>
            )}

            {CONTACT_INFO.address && (
              <div className="rounded-2xl border border-[#dce7ef] bg-white p-7 shadow-sm">
                <MapPin className="h-7 w-7 text-[#0079c1]" aria-hidden="true" />
                <h2 data-cms-key="contact.address.label" className="mt-5 text-lg font-bold text-[#002d5f]">{cmsText(bindings, 'contact.address.label', t.address)}</h2>
                <p data-cms-key="contact.address.value" className="mt-2 text-sm leading-6 text-[#52697c]">{cmsText(bindings, 'contact.address.value', CONTACT_INFO.address)}</p>
              </div>
            )}
          </div>
        ) : (
          <div data-cms-key="contact.empty" className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#dce7ef] bg-white p-7 text-center text-sm leading-6 text-[#52697c] shadow-sm">
            {cmsText(bindings, 'contact.empty', t.empty)}
          </div>
        )}
      </section>
    </div>
  )
}
