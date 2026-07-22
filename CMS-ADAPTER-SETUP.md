# Captain Maid CMS Frontend Adapter Setup

**Purpose**: Integrate Captain Maid frontend with Brand Content Platform CMS  
**Status**: Ready to implement  
**Updated**: 2026-07-17

---

## Overview

This adapter provides a type-safe interface between the Captain Maid frontend and Brand Content Platform backend CMS.

```

For server-side reads, configure `CMS_URL` (or the existing `NEXT_PUBLIC_CMS_URL`) and `CMS_READ_TOKEN`. The token must remain server-only. If the CMS has no approved offer data, product prices and ratings are hidden rather than rendered as placeholders or zero values.
Component
   ↓
useProduct() hook / getProduct() function
   ↓
CMS Adapter (adapt data to frontend types)
   ↓
CMS Client (fetch from Payload API)
   ↓
Brand Content Platform (Supabase + Payload CMS)
```

---

## Files Created

### 1. Type Definitions
**File**: `types/cms.ts` (600+ lines)

Defines all content types:
- Products, Categories, Solutions
- Articles, Pages, Navigation
- Site Settings, Forms, Media
- Localization, SEO, Caching

### 2. API Client
**File**: `lib/cms/client.ts` (400+ lines)

Handles HTTP requests to CMS:
- REST API wrapper
- GraphQL support
- Error handling & retries
- Request logging
- Timeout management

### 3. Data Adapter
**File**: `lib/cms/adapter.ts` (500+ lines)

Transforms CMS data → frontend models:
- Image optimization setup
- Localization handling
- Type conversions
- Fallback data generation
- Cache options builder

### 4. Environment Template
**File**: `.env.example`

Configuration needed for CMS integration

---

## Setup Instructions

### Step 1: Copy Environment File

```bash
cd captain-maid
cp .env.example .env.local
```

Edit `.env.local`:

```bash
# Development (local CMS)
NEXT_PUBLIC_CMS_URL=http://localhost:3000

# Staging (Supabase staging)
# NEXT_PUBLIC_CMS_URL=https://cms-staging.vercel.app

# Production (Supabase prod)
# NEXT_PUBLIC_CMS_URL=https://cms.company-domain.com

# These remain the same
CMS_SITE_SLUG=captain-maid
CMS_READ_TOKEN=your-token-here
CMS_PREVIEW_SECRET=your-secret-here
REVALIDATE_SECRET=your-webhook-secret-here
```

### Step 2: Verify TypeScript Configuration

Ensure `tsconfig.json` includes path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/types/*": ["./types/*"],
      "@/lib/*": ["./lib/*"],
      "@/components/*": ["./components/*"]
    }
  }
}
```

### Step 3: Install Dependencies

No new dependencies needed! Uses built-in:
- `fetch` (Node 18+)
- `Intl` for formatting
- Next.js for routing

### Step 4: Test CMS Connection

Create a test file: `lib/cms/__tests__/client.test.ts`

```typescript
import CMSClient from "@/lib/cms/client";

async function testConnection() {
  const client = new CMSClient();

  try {
    const isHealthy = await client.isHealthy();
    console.log("✓ CMS is healthy:", isHealthy);

    const products = await client.getProducts({ limit: 1 });
    console.log("✓ Products available:", products.docs.length);
  } catch (error) {
    console.error("✗ CMS connection failed:", error);
  }
}

testConnection();
```

Run:
```bash
npx ts-node lib/cms/__tests__/client.test.ts
```

---

## Usage Examples

### In Server Components

```typescript
// app/products/page.tsx
import { cmsClient } from "@/lib/cms/client";
import { adaptProducts, getCacheOptions } from "@/lib/cms/adapter";

export const revalidate = 3600; // ISR: revalidate hourly

export default async function ProductsPage() {
  const response = await cmsClient.getProducts({ limit: 20 });
  const products = adaptProducts(response, "th"); // Transform to frontend types

  return (
    <div>
      {products.docs.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### In API Routes (On-Demand Revalidation)

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { route, event } = await request.json();

  // Revalidate specific route
  revalidateTag(route);

  return new Response(JSON.stringify({ revalidated: true, route }));
}
```

### In Client Components (With SWR/React Query)

```typescript
// hooks/useProducts.ts
import useSWR from "swr";
import { cmsClient } from "@/lib/cms/client";
import { adaptProducts } from "@/lib/cms/adapter";
import { useRouter } from "next/router";

export function useProducts(locale = "th") {
  const { data, error, isLoading } = useSWR(
    ["products", locale],
    async () => {
      const response = await cmsClient.getProducts();
      return adaptProducts(response, locale as any);
    }
  );

  return { products: data?.docs || [], error, isLoading };
}
```

### Fetching Single Items

```typescript
// app/products/[slug]/page.tsx
import { cmsClient } from "@/lib/cms/client";
import { adaptProduct } from "@/lib/cms/adapter";

interface Props {
  params: { slug: string; locale: string };
}

export default async function ProductPage({ params }: Props) {
  const response = await cmsClient.getProduct(params.slug);
  const product = adaptProduct(response.docs[0], params.locale as any);

  return (
    <div>
      <h1>{product.name[params.locale]}</h1>
      <ProductDetail product={product} />
    </div>
  );
}
```

### Solutions by Room / Problem

```typescript
// app/solutions/room/[roomSlug]/page.tsx
import { cmsClient } from "@/lib/cms/client";

export default async function RoomSolutionsPage({
  params,
}: {
  params: { roomSlug: string };
}) {
  // Fetch solution metadata
  const roomData = await cmsClient.getSolution("room", params.roomSlug);

  // Fetch products related to this room
  const products = await Promise.all(
    roomData.docs[0].relatedProducts.map((id: string) =>
      cmsClient.getProduct(id)
    )
  );

  return (
    <div>
      <h1>{roomData.docs[0].name.th}</h1>
      <Products products={products} />
    </div>
  );
}
```

### With Draft Mode (Preview)

```typescript
// app/api/draft/route.ts
import { draftMode } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.CMS_PREVIEW_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return Response.redirect(`/products/${slug}?preview=true`);
}
```

Then in components:

```typescript
import { draftMode } from "next/headers";

export default async function ProductPage() {
  const draft = await draftMode();
  const locale = "th";

  // Fetch with draft=true if in preview mode
  const response = await cmsClient.getProduct(slug, {
    draft: draft.isEnabled,
  });

  // ...
}
```

---

## Localization

### Get Localized Value

```typescript
import { getLocalized, getAllLocalized } from "@/lib/cms/adapter";

const product = await cmsClient.getProduct("floor-cleaner");

// Get Thai title (with English fallback)
const title = getLocalized(product.name, "th");

// Get all locales
const names = getAllLocalized(product.name);
console.log(names); // { th: "...", en: "..." }
```

### In Components

```typescript
import { useRouter } from "next/router";
import { getLocalized } from "@/lib/cms/adapter";

export function ProductCard({ product }) {
  const router = useRouter();
  const locale = router.locale as "th" | "en";

  return (
    <div>
      <h2>{getLocalized(product.name, locale)}</h2>
      <p>{getLocalized(product.shortDescription, locale)}</p>
    </div>
  );
}
```

---

## Error Handling

### Graceful Fallbacks

```typescript
import { createFallbackProduct } from "@/lib/cms/adapter";

async function getProductSafe(slug: string) {
  try {
    const response = await cmsClient.getProduct(slug);
    return adaptProduct(response.docs[0]);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    // Return fallback data instead of crashing
    return createFallbackProduct(slug);
  }
}
```

### Check CMS Health

```typescript
async function getProductsWithFallback() {
  const isHealthy = await cmsClient.isHealthy();

  if (!isHealthy) {
    // Use stale data, offline mode, or fallbacks
    return getFallbackProducts();
  }

  return await cmsClient.getProducts();
}
```

---

## Caching Strategy

### ISR (Incremental Static Regeneration)

```typescript
import { getCacheOptions } from "@/lib/cms/adapter";

export const revalidate = 3600; // Default 1 hour

export default async function ProductPage() {
  const cache = getCacheOptions("/products/[slug]");
  // { revalidate: 3600, tags: ["products", "product-detail"] }

  const product = await cmsClient.getProduct(slug);
  return <div>{/* ... */}</div>;
}
```

### On-Demand Revalidation

```typescript
// CMS webhook calls this endpoint after publish
// POST /api/revalidate
// { route: "/products/floor-cleaner", event: "product:published" }

import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { route } = await request.json();
  revalidateTag(route);

  return Response.json({ revalidated: true, route });
}
```

---

## Image Optimization

### Next.js Image Component

```typescript
import Image from "next/image";
import { ResponsiveImage } from "@/types/cms";

interface Props {
  image: ResponsiveImage;
}

export function OptimizedImage({ image }: Props) {
  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={image.width || 400}
      height={image.height || 300}
      sizes={image.sizes}
      priority={false}
      quality={85}
    />
  );
}
```

### With Blur Placeholder

```typescript
export function HeroImage({ image }: Props) {
  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={1200}
      height={630}
      priority={true}
      quality={90}
      placeholder={image.placeholder ? "blur" : "empty"}
      blurDataURL={image.placeholder}
    />
  );
}
```

---

## Testing

### Unit Tests

```typescript
// lib/cms/adapter.test.ts
import { adaptProduct, getLocalized } from "@/lib/cms/adapter";

describe("CMS Adapter", () => {
  it("should adapt product correctly", () => {
    const cmsProduct = {
      id: "1",
      name: { th: "สินค้า", en: "Product" },
      // ... other fields
    };

    const product = adaptProduct(cmsProduct, "th");
    expect(product.name.th).toBe("สินค้า");
  });

  it("should get localized value with fallback", () => {
    const field = { th: "ไทย", en: "English" };
    expect(getLocalized(field, "th")).toBe("ไทย");
    expect(getLocalized(field, "en")).toBe("English");
    expect(getLocalized({ th: "ไทย" }, "en")).toBe("ไทย"); // fallback
  });
});
```

### Integration Tests

```typescript
// lib/cms/client.test.ts
import { cmsClient } from "@/lib/cms/client";

describe("CMS Client", () => {
  it("should fetch products from staging", async () => {
    const response = await cmsClient.getProducts({ limit: 5 });
    expect(response.docs).toHaveLength(5);
    expect(response.docs[0]).toHaveProperty("name");
  });
});
```

---

## Performance

### Query Optimization

```typescript
// Get only needed fields
const response = await cmsClient.restGet("products", {
  where: { site: { equals: "captain-maid" } },
  select: ["id", "name", "slug", "images"], // Limit fields
  limit: 20,
});
```

### Batch Requests

```typescript
// Fetch multiple products in parallel
const productIds = ["id1", "id2", "id3"];
const products = await Promise.all(
  productIds.map((id) => cmsClient.getProduct(id))
);
```

### Request Deduplication

```typescript
// SWR / React Query automatically dedupes requests
const { data: products1 } = useSWR(["products"], fetcher);
const { data: products2 } = useSWR(["products"], fetcher); // Same key = same request
```

---

## Troubleshooting

### "CMS not reachable"

```bash
# Check environment variables
echo $NEXT_PUBLIC_CMS_URL
echo $CMS_SITE_SLUG

# Test connection manually
curl http://localhost:3000/api/products?where[site][equals]=captain-maid
```

### "Products not found"

```typescript
// Verify site filter matches
// CMS has: site: "captain-maid"
// Frontend requests: where[site][equals]=captain-maid

// Check CMS publish status
// Only published content returns
```

### "Images not loading"

```typescript
// Verify NEXT_PUBLIC_IMAGE_DOMAIN in next.config.js
// For Vercel Blob: blob.vercel-storage.com
// For Payload media: cms.company-domain.com

// Check CORS headers from CMS
curl -H "Origin: http://localhost:3000" http://localhost:3000/api/media
```

### "Draft mode not working"

```bash
# Verify CMS_PREVIEW_SECRET is set
echo $CMS_PREVIEW_SECRET

# Check draftMode() is enabled in API route
# Verify cookie is set: __previewData
```

---

## Next Steps

1. **Test locally**
   ```bash
   npm run dev
   npm test
   ```

2. **Deploy to staging**
   - Push to git
   - Vercel deploys automatically
   - Update environment variables in Vercel dashboard

3. **Connect CMS webhook**
   - CMS Settings → Webhooks
   - Add: `https://captain-maid.vercel.app/api/revalidate`
   - Verify secret matches

4. **Monitor in production**
   - Check Vercel logs
   - Monitor ISR cache hits
   - Track API response times

---

## Related Documentation

- `ARCHITECTURE.md` — System overview
- `DATABASE-MIGRATION-GUIDE.md` — CMS backend setup
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

**Status**: Ready for Stage 4 implementation (Captain Maid Pilot)  
**Next**: Build homepage + product pages using this adapter
