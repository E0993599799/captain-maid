# Captain Maid 2.0 Project Documentation

## Project Overview

Modern Next.js website for Captain Maid premium home cleaning products. Replaces legacy WordPress site with performance-optimized React application.

## Architecture

- **Framework**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Localization**: next-intl (Thai/English)
- **Animations**: Framer Motion
- **Backend**: Supabase (optional - for products, contacts, orders)
- **Deployment**: Vercel

## Tech Stack

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS
- Framer Motion
- next-intl
- Supabase

## Key Features

✅ Multi-language support (Thai/English)
✅ SEO optimized (sitemap, robots.txt, metadata)
✅ Mobile-responsive design
✅ Product showcase with animations
✅ Blog section
✅ Contact form
✅ Dark mode support
✅ Fast performance (Vercel deployment)

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
vercel deploy
```

## Project Structure

```
app/[locale]/
├── page.tsx           # Home
├── products/          # Products
├── blog/              # Blog
├── about/             # About
├── contact/           # Contact
api/
├── contact/           # Contact form API
lib/
├── supabase.ts        # Supabase client
components/
├── Navigation.tsx     # Main navigation
locales/
├── th.json           # Thai translations
├── en.json           # English translations
public/
├── robots.txt        # SEO
└── sitemap.xml       # SEO
```

## Environment Setup

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Database Schema (Supabase)

Products table:
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  image_url VARCHAR(255),
  category VARCHAR(100),
  created_at TIMESTAMP
);
```

Contacts table:
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP
);
```

Blog posts table:
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255),
  content TEXT,
  author VARCHAR(255),
  published_at TIMESTAMP,
  created_at TIMESTAMP
);
```

## Deployment Checklist

- [ ] Install dependencies: `npm install`
- [ ] Configure environment variables
- [ ] Test locally: `npm run dev`
- [ ] Build for production: `npm run build`
- [ ] Deploy to Vercel: `vercel deploy --prod`
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Configure GitHub integration for auto-deploy
- [ ] Test all pages on production
- [ ] Monitor performance with Vercel Analytics

## Next Steps

1. Integrate Supabase database
2. Migrate product data from WordPress
3. Set up email notifications for contact forms
4. Implement shopping cart / checkout
5. Add product search and filtering
6. Set up analytics and monitoring
7. Configure CDN for images
8. Optimize images with next/image

© 2026 Captain Maid - All rights reserved
