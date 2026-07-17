# System Architecture: ARIGEO + Captain Maid + Brand Content Platform

**Status**: MVP Architecture (Not Over-Engineered)  
**Updated**: 2026-07-17  
**Author**: พี่เอก (Ekkarat)  
**Version**: 1.0

---

## Executive Summary

A pragmatic, three-part system architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Marketing / Admin Team                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  Brand Content Platform    │
        │  (Payload CMS Backend)     │
        │  Supabase + Vercel Blob    │
        └────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
    ┌─────────────┐      ┌──────────────────┐
    │   ARIGEO    │      │  Captain Maid    │
    │  Frontend   │      │    Frontend      │
    └─────────────┘      └──────────────────┘
         │                       │
         ▼                       ▼
    Corporate Site      Consumer Brand Site
```

---

## Part 1: ARIGEO Frontend

### Location

```
mission-control/arigeo-project/arigeo-web-draft/
```

### Role

ARIGEO is a **corporate brand platform**:

- Company overview & mission
- Brand portfolio (Captain Maid, GenuLeaf, CeraTory)
- Product discovery gateway
- Innovation & sustainability hub
- Newsroom & media center
- Careers portal
- Partner & distributor info

**Not** an e-commerce site; drives traffic to brand sites.

### Technology Stack

```
Framework:       Next.js 15
Runtime:         React 19
Language:        TypeScript
Styling:         Tailwind CSS 4
Localization:    next-intl
Hosting:         Vercel
Database Access: Payload CMS REST/GraphQL
```

### Routes

```
/[locale]                                  # Homepage
/[locale]/about                           # Company story
/[locale]/brands                          # Brand index
/[locale]/brands/[brand-slug]             # Brand detail
/[locale]/products                        # Product gallery
/[locale]/products/[product-slug]         # Product detail
/[locale]/innovation                      # Innovation hub
/[locale]/sustainability                  # Sustainability
/[locale]/newsroom                        # News index
/[locale]/newsroom/[article-slug]         # Article detail
/[locale]/careers                         # Careers portal
/[locale]/contact                         # Contact form
/[locale]/privacy                         # Legal
/[locale]/terms                           # Legal
```

### Key Sections

- Hero / Leadership
- Brand Showcase
- Product Gallery
- Impact Metrics
- Media Kit
- Job Listings
- Partner Network
- Contact Channels

### Data from CMS

```
✓ Pages (corporate copy, hero, blocks)
✓ Brands (Captain Maid, GenuLeaf, CeraTory)
✓ Products (featured, categorized)
✓ Articles (news, press releases)
✓ Navigation (header, footer)
✓ Site Settings (company info, contact)
✓ Media (logos, images, documents)
```

### Frontend Responsibilities

- Render responsive UI (desktop, tablet, mobile)
- Localization (Thai + English)
- SEO metadata & structured data
- Content preview from CMS draft
- ISR & caching strategy
- Error handling & fallbacks
- Form submission to backend
- Analytics events
- Graceful degradation if CMS is down

---

## Part 2: Captain Maid Frontend

### Location

```
mission-control/captain-maid/
```

### Role

Captain Maid is a **consumer brand website**:

- Product discovery & browsing
- Cleaning solutions by room & problem
- Product detail pages with usage
- Educational content
- Shopping gateway (links to e-commerce)
- Brand storytelling
- Customer testimonials

**Consumer-focused**, not admin-focused.

### Technology Stack

```
Framework:       Next.js 15+ (existing)
Runtime:         React 19+
Language:        TypeScript
Styling:         Tailwind CSS (existing)
Localization:    next-intl
Hosting:         Vercel
Database Access: Payload CMS REST/GraphQL
```

### Routes

```
/[locale]                                 # Homepage
/[locale]/products                        # Product listing
/[locale]/products/[product-slug]         # Product detail
/[locale]/categories/[category-slug]      # Category browse
/[locale]/solutions                       # Solutions hub
/[locale]/solutions/room/[room-slug]      # By room (kitchen, bath, etc.)
/[locale]/solutions/problem/[problem-slug] # By problem (grease, mold, etc.)
/[locale]/about                           # Brand story
/[locale]/blog                            # Articles & tips
/[locale]/blog/[article-slug]             # Article detail
/[locale]/faq                             # FAQ
/[locale]/contact                         # Contact form
/[locale]/privacy                         # Legal
/[locale]/terms                           # Legal
```

### Homepage Sections

```
Header (navbar, localization, search)
Hero Slider (featured products)
Trust Strip (benefits, quality claims)
Category Grid (floor, bathroom, kitchen, etc.)
Solutions by Room (bedroom, kitchen, bathroom)
Solutions by Problem (grease, mold, odor, dirt)
Best-Selling Products
Quality & Trust Banner
Why Captain Maid (competitive advantage)
Customer Testimonials
Blog Feed (latest articles)
Newsletter Signup
Footer (links, social, contact)
```

### Data from CMS

```
✓ Products (full details, images, variants)
✓ Categories (floor, bathroom, kitchen)
✓ Cleaning Problems (grease, mold, odor, dirt)
✓ Suitable Rooms (kitchen, bedroom, bathroom, etc.)
✓ Articles (tips, safety guides, how-to)
✓ Navigation (menu, footer links)
✓ Site Settings (company info, social links)
✓ Media (product images, lifestyle photos)
✓ FAQs
✓ Testimonials
```

### Frontend Responsibilities

- Product catalog browsing & filtering
- Solution finder (by room / problem)
- Product detail with usage & safety info
- Responsive product images (WebP, lazy loading)
- "Shop Now" links to e-commerce
- TH/EN content switching
- CMS draft preview
- ISR caching
- Analytics tracking
- Performance (Core Web Vitals)
- SEO & rich snippets

---

## Part 3: Brand Content Platform (Backend)

### Location

```
mission-control/cms-arigeo/
→ Rename to: brand-content-platform
```

### Role

**Shared backend for both ARIGEO and Captain Maid frontends**

Single source of truth for:
- Products & brands
- Published content
- Media assets
- User roles & access
- Form submissions
- Content revisions
- Draft/preview state

### Technology Stack

```
CMS:             Payload CMS 3.75+
Database:        Supabase PostgreSQL
Media Storage:   Vercel Blob
Admin UI:        Next.js (Payload built-in)
Hosting:         Vercel
Auth:            Payload built-in + session
API:             GraphQL + REST
Webhooks:        On publish → frontend revalidation
```

### Collections (MVP)

#### Core Content

```
Pages
├─ Locale fields (th_title, en_title, etc.)
├─ site field (arigeo | captain-maid)
├─ Blocks (hero, text, gallery, cta)
├─ SEO fields
└─ Status (draft | published)

Brands
├─ name, slug, logo
├─ description (localized)
├─ products (relationship)
├─ site
└─ featured

Products
├─ name, sku, slug
├─ brand (relationship)
├─ category (relationship)
├─ images
├─ description (localized)
├─ usage, benefits, surfaces, rooms, problems
├─ shop links (e-commerce URLs)
├─ site
└─ status

Categories
├─ name, slug
├─ description
└─ site

Articles
├─ title, slug (localized)
├─ author
├─ content (rich text)
├─ featured image
├─ site
├─ articleType (news | blog | guide)
└─ publishedAt
```

#### Management

```
Media
├─ file (Vercel Blob)
├─ alt text (localized)
├─ usage (product | article | page)
└─ uploaded by (user)

Navigation
├─ site
├─ locale
├─ menu items (array)
└─ published

FormSubmissions
├─ site
├─ formType (general | product | partnership | career | newsletter)
├─ data (name, email, phone, message, company)
├─ status (new | reviewed | replied)
└─ createdAt
```

#### Admin

```
Users
├─ email
├─ password (hashed)
├─ role (super-admin | editor | publisher)
├─ allowedSites (array: [arigeo] or [captain-maid] or [both])
└─ createdAt

SiteSettings (Global)
├─ site
├─ locale
├─ company name, address, phone, email
├─ social links
├─ seo defaults
└─ maintenance mode
```

### Globals (Site-wide Settings)

```
CompanyInfo
├─ name, description
├─ logo, favicon
├─ social media links
└─ contact email

Header
├─ site
├─ logo
├─ menu items
└─ cta button

Footer
├─ site
├─ links, company info
├─ social media
└─ legal

SiteSettings
├─ site
├─ locale
├─ time zone
├─ email notification recipients
└─ analytics config
```

### Access Control

```
Role Hierarchy:

Super Admin
├─ All sites, all collections
├─ User management
└─ Backup/restore

Editor
├─ Assigned sites only (allowedSites)
├─ Create/edit/delete own content
├─ Can save drafts
├─ Cannot publish

Publisher
├─ Assigned sites only
├─ View/review published content
├─ Can publish reviewed content
├─ Cannot edit
```

### API Endpoints

#### Public (Read-Only)

```
GET /api/pages?site=arigeo&locale=th
GET /api/products?site=captain-maid&limit=20
GET /api/brands
GET /api/articles?site=arigeo&limit=10
GET /api/categories
GET /api/navigation?site=captain-maid&locale=en
GET /api/site-settings?site=arigeo
```

#### GraphQL (Public)

```
{
  pages(where: {site: {equals: "arigeo"}}) {
    edges { node { id title slug content } }
  }
  products(where: {site: {equals: "captain-maid"}}) {
    edges { node { id name sku images } }
  }
}
```

#### Private (Authenticated)

```
POST /api/auth/login
POST /api/auth/logout
GET /api/user/profile

POST /api/pages (create draft)
PATCH /api/pages/:id (update draft)
POST /api/pages/:id/publish (publish)
POST /api/pages/:id/preview (get signed preview token)

POST /api/media/upload (multipart)
```

#### Webhooks (Outbound)

```
POST https://arigeo-frontend.vercel.app/api/revalidate
├─ event: "page:published" | "product:published" | "article:published"
├─ route: "/products/[slug]"
├─ secret: REVALIDATE_SECRET (verified)

POST https://captain-maid-frontend.vercel.app/api/revalidate
├─ event: same as above
├─ route: same as above
```

#### Forms (Public)

```
POST /api/forms
{
  "site": "arigeo" | "captain-maid",
  "formType": "general" | "product" | "partnership" | "career" | "newsletter",
  "data": {
    "name": "...",
    "email": "...",
    "phone": "...",
    "company": "...",
    "message": "..."
  }
}
```

---

## Data Model

### Multi-Site Architecture

Each content record has a `site` field:

```typescript
site: "arigeo" | "captain-maid"
locale: "th" | "en"
status: "draft" | "published"
```

### Product Ownership Example

```
Product:
- name: "Captain Maid Floor Cleaner"
- brand: "captain-maid"
- site: "captain-maid"

Shown in:
- Captain Maid Website: Full detail, usage, surfaces, shop links
- ARIGEO Website: Summary card, drives to Captain Maid
```

### Edit Once, Use Twice

Marketing edits product **once** in CMS:
- Both frontends fetch from same API
- ARIGEO shows summary
- Captain Maid shows full detail

No data duplication, single source of truth.

---

## Content Lifecycle

### Draft → Preview → Publish → Live

```
Step 1: Editor creates draft
        └─ Saved in database, status="draft"
        └─ Not visible to public

Step 2: Editor requests preview
        └─ Generate signed token
        └─ Frontend uses token to fetch draft content
        └─ Preview URL accessible to editor only

Step 3: Editor shares for review
        └─ Send preview link to stakeholder

Step 4: Publisher approves
        └─ Marks status="published"
        └─ Triggers webhook

Step 5: Webhook revalidates frontend
        └─ POST to frontend /api/revalidate
        └─ Frontend invalidates ISR cache
        └─ Next request fetches fresh content
        └─ Content goes live
```

---

## Image & Media Handling

### Upload Flow

```
Marketing uploads image
        │
        ▼
Payload Media UI
        │
        ▼
Vercel Blob Storage
        │
        ├─ URL: https://blob.vercel-storage.com/...
        ├─ Persisted, CDN-cached
        └─ Stored in Payload record

Frontend fetches:
        │
        ▼
Image stored in `product.images[0].url`
        │
        ├─ Next.js <Image> component
        ├─ Auto WebP, lazy loading, responsive
        └─ Renders optimized
```

### Localization

Media stored once, referenced from multiple collections:

```
Product (canonical)
├─ images: [{ url, altText_th, altText_en }]

ARIGEO page
├─ images: [{ url, altText_th, altText_en }]

Captain Maid page
├─ images: [{ url, altText_th, altText_en }]
```

---

## Deployment Architecture

### Three Vercel Projects

```
1. brand-content-platform
   ├─ CMS admin: https://cms.company-domain.com
   ├─ GraphQL: https://cms.company-domain.com/api/graphql
   └─ REST: https://cms.company-domain.com/api

2. arigeo
   ├─ Frontend: https://www.arigeo.com
   └─ Preview: [branch deployments]

3. captain-maid
   ├─ Frontend: https://www.captain-maid.com
   └─ Preview: [branch deployments]
```

### Database & Storage

```
Supabase (PostgreSQL)
├─ Development: neon.tech (free tier)
├─ Staging: Supabase staging project
└─ Production: Supabase production project

Vercel Blob
├─ Development: staging token
├─ Production: production token
└─ Unified CDN across all instances
```

### Environment Variables

#### ARIGEO Frontend

```
NEXT_PUBLIC_CMS_URL=https://cms.company-domain.com
CMS_SITE_SLUG=arigeo
CMS_READ_TOKEN=...           # Public read token
CMS_PREVIEW_SECRET=...       # For draft mode
REVALIDATE_SECRET=...        # Verify webhook
NEXT_PUBLIC_GA_ID=...
NEXT_PUBLIC_GTM_ID=...
```

#### Captain Maid Frontend

```
NEXT_PUBLIC_CMS_URL=https://cms.company-domain.com
CMS_SITE_SLUG=captain-maid
CMS_READ_TOKEN=...
CMS_PREVIEW_SECRET=...
REVALIDATE_SECRET=...
NEXT_PUBLIC_GA_ID=...
NEXT_PUBLIC_GTM_ID=...
```

#### Brand Content Platform

```
DATABASE_URL=postgres://...
PAYLOAD_SECRET=...
PAYLOAD_PUBLIC_SERVER_URL=https://cms.company-domain.com
BLOB_READ_WRITE_TOKEN=...

ARIGEO_REVALIDATE_URL=https://arigeo.vercel.app/api/revalidate
ARIGEO_REVALIDATE_SECRET=...

CAPTAIN_MAID_REVALIDATE_URL=https://captain-maid.vercel.app/api/revalidate
CAPTAIN_MAID_REVALIDATE_SECRET=...

EMAIL_PROVIDER_API_KEY=...   # For form notifications
ANALYTICS_KEY=...             # Admin analytics
```

---

## Implementation Stages

### Stage 1: Frontend Stabilization (Weeks 1-2)

**ARIGEO**
- [ ] Supporting pages (About, Innovation, Sustainability)
- [ ] Product contract frozen
- [ ] Responsive proof (desktop, tablet, mobile)

**Captain Maid**
- [ ] Redesign plan document
- [ ] Homepage approved design
- [ ] Product/solution routes structure

### Stage 2: Shared Type Contracts (Week 2-3)

- [ ] `LocalizedString` type (th/en fields)
- [ ] `Media` type (image, alt text, credit)
- [ ] `SEO` type (title, description, keywords)
- [ ] `Link` type (internal/external links)
- [ ] `Page`, `Brand`, `Product`, `Article` types

**Do not** create monorepo package yet. Each frontend has its own `types/`.

### Stage 3: Backend MVP (Week 3-4)

- [x] Payload CMS setup
- [x] Supabase PostgreSQL
- [x] Vercel Blob integration
- [ ] Collections: Users, Sites, Pages, Brands, Products, Categories, Articles, Media, Navigation, FormSubmissions
- [ ] Roles: super-admin, editor, publisher
- [ ] Access control: allowedSites filtering

### Stage 4: Captain Maid Pilot (Week 4-5)

Captain Maid is the **pilot** (simpler product focus):

- [ ] Products → CMS (bulk data load)
- [ ] Categories → CMS
- [ ] Media → Vercel Blob
- [ ] Homepage blocks → CMS
- [ ] Draft/Preview/Publish test
- [ ] Frontend adapter (`lib/cms/adapter.ts`)
- [ ] ISR validation

### Stage 5: ARIGEO Integration (Week 5-6)

- [ ] Corporate pages → CMS
- [ ] Brands → CMS
- [ ] Featured products → CMS
- [ ] News articles → CMS
- [ ] Navigation → CMS
- [ ] Frontend adapter
- [ ] ISR validation

### Stage 6: Governance & QA (Week 6-7)

- [ ] Role-based access enforcement
- [ ] Audit trail (who edited what, when)
- [ ] Backup & restore procedure
- [ ] Monitoring & alerts
- [ ] SEO verification
- [ ] Analytics setup
- [ ] Accessibility audit
- [ ] Performance audit
- [ ] Security audit

---

## Key Design Decisions

### Decision 1: Single Backend, Two Frontends

**Why**: 
- Products & brands have single source of truth
- Marketing edits once, both sites reflect change
- No data duplication
- Simpler operations

**Not**: Separate backends per site (causes sync issues)

### Decision 2: MVP Collections Only

**Why**:
- Start lean, add later
- Clear content model
- Easier to launch
- Room to grow

**Not**: 20+ collections from day one

### Decision 3: Site-Scoped Access, Not Tenant

**Why**:
- ARIGEO and Captain Maid are **related**, not separate tenants
- Shared product data makes sense
- Simpler role model

**Not**: Full multi-tenant architecture

### Decision 4: No Custom E-Commerce

**Why**:
- Shopping funnels to external shop (Lazada, etc.)
- "Shop Now" links only
- Simpler backend
- Focus on discovery, not transactions

**Not**: Build shopping cart, checkout, payments

### Decision 5: ISR First, Then Database

**Why**:
- Fast static content
- On-demand revalidation after publish
- Falls back to CDN cache if CMS down

**Not**: Server-side rendering on every request

### Decision 6: Typed Content Adapter

**Why**:
- Frontend component contracts match CMS schema
- Type safety at compile time
- Easier refactoring

**Not**: Untyped GraphQL queries scattered in components

---

## Success Criteria

### ARIGEO Frontend ✅

- [ ] All corporate pages complete
- [ ] Brand portfolio functional
- [ ] Products discoverable
- [ ] TH/EN switching works
- [ ] CMS integration reads data
- [ ] Draft/Preview/Publish works
- [ ] SEO metadata populated
- [ ] Responsive on all devices
- [ ] Lighthouse score ≥90
- [ ] Core Web Vitals passing

### Captain Maid Frontend ✅

- [ ] Homepage matches approved design
- [ ] Product listing/detail complete
- [ ] Solution finder works (room & problem)
- [ ] TH/EN switching works
- [ ] CMS integration reads data
- [ ] Draft/Preview/Publish works
- [ ] Shop links functional
- [ ] Responsive on all devices
- [ ] Lighthouse score ≥90
- [ ] Core Web Vitals passing

### Backend Platform ✅

- [ ] Marketing can login
- [ ] Site-based access enforced
- [ ] Can create/edit/delete pages/products/media
- [ ] Draft/Preview/Publish workflow works
- [ ] Frontend revalidation triggers
- [ ] Form submissions captured
- [ ] No cross-site data leakage
- [ ] Backup strategy proven
- [ ] Rollback tested
- [ ] Database monitoring active

---

## Non-Goals (Explicitly Not In Scope)

```
✗ E-commerce checkout
✗ Payment processing
✗ Inventory management
✗ Order tracking
✗ Multi-tenancy
✗ Custom roles beyond 3 tiers
✗ Complex workflow approvals
✗ AI content generation
✗ CDN edge caching logic
✗ Advanced analytics
✗ A/B testing platform
✗ Comment/feedback system
✗ User accounts (public)
```

These can be added **later** if needed.

---

## Monitoring & Operations

### Pre-Launch Checklist

- [ ] Database backup tested
- [ ] Restore procedure documented
- [ ] Error logging configured
- [ ] Uptime monitoring active
- [ ] Vercel deployment monitoring
- [ ] SSL certificate active
- [ ] DNS properly configured
- [ ] Rate limiting configured
- [ ] Security headers set
- [ ] CORS properly scoped

### Post-Launch (First Week)

- [ ] Error rate monitoring (target < 0.1%)
- [ ] API response time monitoring (target < 200ms)
- [ ] Database query performance
- [ ] Webhook delivery tracking
- [ ] Form submission rate tracking
- [ ] User activity monitoring

### Ongoing

- [ ] Weekly database optimization review
- [ ] Monthly backup restoration test
- [ ] Quarterly security audit
- [ ] Annual architecture review

---

## Technology Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend (ARIGEO)** | Next.js | 15+ |
| | React | 19+ |
| | TypeScript | 5.9+ |
| | Tailwind CSS | 4+ |
| | next-intl | latest |
| **Frontend (Captain Maid)** | Same as ARIGEO | — |
| **Backend** | Payload CMS | 3.75+ |
| | Next.js | 15+ |
| | Express | via Payload |
| | TypeScript | 5.9+ |
| **Database** | PostgreSQL | 14+ |
| | Supabase | managed |
| **Storage** | Vercel Blob | managed |
| **Hosting** | Vercel | serverless |
| **Auth** | Payload Auth | built-in |
| **API** | GraphQL + REST | native |
| **CDN** | Vercel Edge | global |
| **Email** | SendGrid (TBD) | managed |

---

## Related Documentation

- `DATABASE-MIGRATION-GUIDE.md` — Dev → staging → prod migration
- `DATABASE-MIGRATION-CHECKLIST.md` — Pre-deployment verification
- `SCHEMA-VALIDATION-AUTOMATION.md` — Automated schema testing
- `package.json` — npm scripts for validation & build

---

## Questions & Clarifications

### Q: What if a page is only for ARIGEO, not Captain Maid?

**A**: Set `site: ["arigeo"]` in the Collections filter. Frontend fetches only its own site content.

### Q: Can editors see both sites' content?

**A**: Only if `allowedSites: ["arigeo", "captain-maid"]`. Default editors see one site only.

### Q: What happens if CMS is down?

**A**: ISR cache serves stale content. Fallback adapters can use hardcoded data. "503 Service Unavailable" after cache expires.

### Q: How do we handle content versions?

**A**: Payload has built-in revision history. Click "Compare" to see changes, rollback if needed.

### Q: Can we split into more frontends later?

**A**: Yes. Just add `site: "newbrand"` to Collections and create a new frontend with same setup.

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-17 | พี่เอก | Initial architecture |
| — | — | — | — |

---

**Status**: Ready for implementation  
**Next**: Begin Stage 1 (frontend stabilization)  
**Owned by**: พี่เอก + Development Team
