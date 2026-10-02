import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Leaf, Beaker, Heart } from 'lucide-react'
import { headers } from 'next/headers'
import { cmsLink, cmsText, getCaptainMaidRuntime } from '@/lib/cms/bindings'

export const metadata: Metadata = {
  title: 'About Captain Maid | Our Story & Mission',
  description:
    'Learn about Captain Maid. Over 20 years of trusted cleaning solutions for Thai families. Powerful, safe, and eco-conscious.',
  openGraph: {
    title: 'About Captain Maid',
    description: 'Our story, mission, and commitment to Thai families',
    type: 'website',
  },
}

export default async function AboutPage() {
  const requestHeaders = await headers()
  const locale = requestHeaders.get('x-captain-maid-locale') === 'en' ? 'en' : 'th'
  const { bindings } = await getCaptainMaidRuntime('about', locale)
  const cta = cmsLink(bindings, 'about.cta.link', { text: 'Contact Us →', href: `/${locale}/contact` })
  return (
    <div className="min-h-screen bg-captain-cream dark:bg-captain-cream-dark pt-24">
      <div className="container-safe">
        {/* Hero Section */}
        <div className="mb-2xl py-xl text-center">
          <h1 data-cms-key="about.hero.title" className="text-5xl font-serif font-bold mb-md text-captain-blue">{cmsText(bindings, 'about.hero.title', 'About Captain Maid')}</h1>
          <p data-cms-key="about.hero.description" className="text-xl text-captain-neutral max-prose mx-auto">
            Over 20 years of trusted cleaning solutions for Thai families
          </p>
        </div>

        {/* Brand Story */}
        <div className="bg-captain-light rounded-sm p-2xl mb-2xl grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
          <div>
            <h2 data-cms-key="about.story.title" className="text-3xl font-serif font-bold mb-lg text-captain-text">{cmsText(bindings, 'about.story.title', 'Our Story')}</h2>
            <p data-cms-key="about.story.paragraph.1" className="text-lg text-captain-neutral leading-relaxed mb-md">
              {cmsText(bindings, 'about.story.paragraph.1', "Captain Maid was founded on a simple belief: a clean home shouldn't come at the cost of your family's health or the environment.")}
            </p>
            <p data-cms-key="about.story.paragraph.2" className="text-lg text-captain-neutral leading-relaxed mb-md">
              {cmsText(bindings, 'about.story.paragraph.2', "For over 20 years, we've been crafting cleaning solutions specifically designed for Thai homes. We understand your climate, your lifestyle, and your needs.")}
            </p>
            <p data-cms-key="about.story.paragraph.3" className="text-lg text-captain-neutral leading-relaxed">
              {cmsText(bindings, 'about.story.paragraph.3', 'Every product in our range is tested with Thai families in mind—powerful enough to handle our hot, humid weather, yet gentle enough to keep your family safe.')}
            </p>
          </div>
          <div className="bg-gradient-to-br from-captain-blue to-captain-yellow rounded-sm aspect-square flex items-center justify-center text-9xl">
            ⚓
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
          <div className="bg-captain-light rounded-sm p-xl">
            <h3 data-cms-key="about.mission.title" className="text-2xl font-serif font-bold mb-md text-captain-text">{cmsText(bindings, 'about.mission.title', 'Our Mission')}</h3>
            <p data-cms-key="about.mission.description" className="text-captain-neutral">{cmsText(bindings, 'about.mission.description', "To provide powerful, safe, and eco-conscious cleaning solutions that help Thai families maintain clean, healthy homes without compromise.")}</p>
          </div>

          <div className="bg-captain-light rounded-sm p-xl">
            <h3 data-cms-key="about.vision.title" className="text-2xl font-serif font-bold mb-md text-captain-text">{cmsText(bindings, 'about.vision.title', 'Our Vision')}</h3>
            <p data-cms-key="about.vision.description" className="text-captain-neutral">{cmsText(bindings, 'about.vision.description', "To be the most trusted household cleaning brand in Thailand, known for quality, safety, and our commitment to every Thai family.")}</p>
          </div>

          <div className="bg-captain-light rounded-sm p-xl">
            <h3 data-cms-key="about.values.title" className="text-2xl font-serif font-bold mb-md text-captain-text">{cmsText(bindings, 'about.values.title', 'Our Values')}</h3>
            <p data-cms-key="about.values.description" className="text-captain-neutral">{cmsText(bindings, 'about.values.description', "Quality, family safety, environmental responsibility, and transparency in everything we do.")}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-2xl">
          <h2 data-cms-key="about.journey.title" className="text-3xl font-serif font-bold mb-lg text-captain-blue">{cmsText(bindings, 'about.journey.title', 'Our Journey')}</h2>
          <div className="space-y-lg">
            {[
              { year: 2000, event: 'Captain Maid founded by a team dedicated to safe household cleaning' },
              { year: 2005, event: 'Expanded product line to serve diverse Thai household needs' },
              { year: 2010, event: 'Achieved 1 million customers milestone' },
              { year: 2015, event: 'Shifted to eco-friendly formulations and sustainable packaging' },
              { year: 2020, event: 'Launched e-commerce platform for direct customer access' },
              { year: 2024, event: 'Introduced world-class website and expanded digital presence' },
            ].map((milestone, i) => (
              <div key={i} className="flex gap-lg items-start">
                <div className="flex-shrink-0 w-24 pt-1">
                  <span data-cms-key={`about.journey.${i + 1}.year`} className="text-2xl font-bold text-captain-blue">{cmsText(bindings, `about.journey.${i + 1}.year`, String(milestone.year))}</span>
                </div>
                <div className="flex-grow pb-lg border-l-2 border-captain-light pl-lg">
                  <p data-cms-key={`about.journey.${i + 1}.text`} className="text-lg text-captain-neutral">{cmsText(bindings, `about.journey.${i + 1}.text`, milestone.event)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-2xl">
          <h2 data-cms-key="about.team.title" className="text-3xl font-serif font-bold mb-lg text-captain-blue">{cmsText(bindings, 'about.team.title', 'Our Team')}</h2>
          <p data-cms-key="about.team.description" className="text-lg text-captain-neutral mb-lg">{cmsText(bindings, 'about.team.description', "We're a dedicated team of chemists, cleaning experts, and Thai families who share a passion for safe, effective household solutions.")}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
            {[
              { icon: Beaker, label: 'Product Dev' },
              { icon: Check, label: 'Manufacturing' },
              { icon: Check, label: 'Quality Control' },
              { icon: Heart, label: 'Customer Care' }
            ].map((role, i) => {
              const Icon = role.icon
              return (
                <div key={i} className="bg-captain-light rounded-sm p-lg text-center">
                  <div className="flex justify-center mb-md"><Icon className="w-8 h-8 text-captain-blue" /></div>
                  <p data-cms-key={`about.team.role.${i + 1}`} className="font-semibold text-captain-text">{cmsText(bindings, `about.team.role.${i + 1}`, role.label)}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-captain-light rounded-sm p-2xl mb-2xl">
          <h2 data-cms-key="about.certifications.title" className="text-3xl font-serif font-bold mb-lg text-captain-blue">{cmsText(bindings, 'about.certifications.title', 'Certifications & Standards')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
            {[
              { icon: Check, label: 'Thai Safety Standard' },
              { icon: Leaf, label: 'Eco-Certified' },
              { icon: Beaker, label: 'Dermatologist Tested' },
              { icon: Heart, label: 'Family Safe' },
            ].map((cert, i) => {
              const Icon = cert.icon
              return (
                <div key={i} className="text-center">
                  <div className="flex justify-center mb-md"><Icon className="w-8 h-8 text-captain-blue" /></div>
                  <p data-cms-key={`about.certifications.${i + 1}`} className="font-semibold text-captain-text text-sm">{cmsText(bindings, `about.certifications.${i + 1}`, cert.label)}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center py-2xl border-t border-captain-light">
          <h2 data-cms-key="about.cta.title" className="text-3xl font-serif font-bold mb-md text-captain-text">{cmsText(bindings, 'about.cta.title', 'Get in Touch')}</h2>
          <p data-cms-key="about.cta.description" className="text-lg text-captain-neutral mb-lg">{cmsText(bindings, 'about.cta.description', "Have questions? We'd love to hear from you.")}</p>
          <Link
            data-cms-key="about.cta.link"
            href={cta.href}
            className="inline-flex items-center gap-sm px-lg py-md bg-captain-yellow text-captain-text rounded-sm font-semibold hover:bg-captain-blue hover:text-white transition-all"
          >
            {cta.text}
          </Link>
        </div>
      </div>
    </div>
  )
}
