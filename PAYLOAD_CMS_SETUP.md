# Payload CMS Setup - Captain Maid

## Overview

Payload CMS v2 is now integrated with Captain Maid for flexible product management. This provides:

- **Admin Dashboard**: http://localhost:3000/admin
- **REST API**: http://localhost:3000/api/products
- **Bilingual Support**: Thai (th) + English (en) localization
- **Rich Content Editor**: Slate rich text for descriptions
- **Image Management**: Built-in media handling

## Configuration

### 1. Environment Variables

Copy `.env.example` to `.env.local` and update:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/captain-maid
PAYLOAD_SECRET=your_secret_key_here
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

### 2. Database Setup

Create PostgreSQL database:

```bash
createdb captain-maid
```

Or use Vercel Postgres through Vercel dashboard.

### 3. Start Development Server

```bash
npm run dev
```

Payload CMS admin panel will be available at: `http://localhost:3000/admin`

## Using the Admin Panel

### Login

1. Go to `http://localhost:3000/admin`
2. Create first admin user (one-time setup)
3. Use email/password to login

### Add Products

1. Navigate to **Products** collection
2. Click **Create New**
3. Fill in:
   - **Name** (Thai + English)
   - **Slug** (URL-friendly identifier)
   - **Description** (rich text, supports both languages)
   - **Category** (dropdown selection)
   - **Price** (THB)
   - **Image** (upload product image)
   - **Features** (array of features)
   - **Ingredients** (array with benefits)
   - **Ratings & Safety**
   - **Eco-Friendly / Pet Safe** (checkboxes)

4. Click **Save** to publish

### Managing Localization

Each text field (name, description, features) supports both Thai and English:

- Switch language at top of form
- Fill content in each language
- Save

## API Usage

### Fetch All Products

```bash
GET http://localhost:3000/api/products?locale=en
```

Response:

```json
{
  "docs": [
    {
      "id": "...",
      "name": "Product Name",
      "slug": "product-slug",
      "description": "...",
      "price": 299,
      "category": "kitchen",
      "image": { "url": "..." },
      "published": true
    }
  ],
  "totalDocs": 10,
  "limit": 10,
  "totalPages": 1,
  "page": 1
}
```

### Fetch Single Product

```bash
GET http://localhost:3000/api/products?where[slug][equals]=product-slug&locale=en
```

### Fetch by Category

```bash
GET http://localhost:3000/api/products?where[category][equals]=kitchen&locale=en
```

## Frontend Integration

### Using the Adapter

Import and use the Payload adapter in your components:

```tsx
import { fetchProducts, fetchProductBySlug, transformProductForDisplay } from '@/lib/payloadAdapter';

export async function ProductsPage() {
  const products = await fetchProducts('en');
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={transformProductForDisplay(product)} />
      ))}
    </div>
  );
}
```

## Deployment to Vercel

### 1. Add Environment Variables to Vercel

```bash
vercel env pull .env.local
```

Then add to Vercel dashboard:

```
DATABASE_URL = your_postgres_url
PAYLOAD_SECRET = your_secret_key
NEXT_PUBLIC_PAYLOAD_URL = https://captain-maid.vercel.app
```

### 2. Database on Vercel

Use **Vercel Postgres** for production:

1. Go to Vercel Dashboard
2. Select project
3. **Storage** → **Create Database** → **Postgres**
4. Copy connection string to `DATABASE_URL`

### 3. Deploy

```bash
npm run build
vercel deploy --prod
```

## Useful Commands

### Generate TypeScript Types

```bash
npm run payload:generate
```

Creates `payload-types.ts` with full type safety.

### Seed Initial Products

```bash
npm run payload:seed
```

(Requires `scripts/seed.js` to be created)

### Access Payload CLI

```bash
npm run payload -- <command>
```

## Collections

### Products Collection

- **slug**: products
- **Fields**:
  - name (localized text, required)
  - slug (unique identifier)
  - description (rich text, localized)
  - category (dropdown: floor, kitchen, bathroom, multipurpose, pet-safe)
  - price (number, required)
  - image (upload, required)
  - features (array of text)
  - ingredients (array with benefit descriptions)
  - safetyRating (1-5)
  - ecoFriendly (boolean)
  - petSafe (boolean)
  - published (boolean, default true)

### Users Collection

- **slug**: users
- **Auth**: Enabled
- **Fields**:
  - name (text)
  - role (admin, editor, user)

## Troubleshooting

### "Cannot connect to database"

- Check DATABASE_URL is correct
- Verify PostgreSQL is running
- Ensure database exists

### "Missing images after upload"

- Check file upload permissions
- Verify `public/uploads` directory exists and is writable

### TypeScript errors with payload types

```bash
npm run payload:generate
```

### Admin panel not loading

- Clear browser cache
- Restart dev server: `npm run dev`

## Next Steps

1. ✅ Set up PostgreSQL (local or Vercel)
2. ✅ Create admin user
3. ✅ Add product categories
4. ✅ Import product data
5. ✅ Connect frontend pages to fetch products
6. ✅ Deploy to Vercel

## Resources

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Integration](https://payloadcms.com/docs/getting-started/installation)
- [Collections Guide](https://payloadcms.com/docs/configuration/collections)
