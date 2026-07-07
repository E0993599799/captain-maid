---
name: nextjs-next-intl-deployment
description: "Next.js 15 + next-intl deployment patterns, pitfalls, and fixes for Vercel"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 89d319b0-5cd6-42f1-b481-ea5fbd1d6cfe
---

# Next.js 15 + next-intl Deployment Guide

## Critical Patterns

### 1. Layout + Client Provider Pattern ✅
**What works:**
```typescript
// app/[locale]/layout.tsx - SERVER COMPONENT
import { NextIntlClientProvider } from 'next-intl';

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = (await import(`../../locales/${locale}.json`)).default;
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 2. i18n/request.ts Configuration ✅
**What works (next-intl 3.22+):**
```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'th';
  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
```

**What DOESN'T work:**
```typescript
// ❌ DEPRECATED - causes warnings
export default getRequestConfig(async ({ locale }) => ({
  locale,
  messages: (await import(`../locales/${locale}.json`)).default,
}));

// ❌ BROKEN - throws before fallback reaches
export default getRequestConfig(async ({ locale }) => {
  const t = await getTranslations();
  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
    title: t('title') || 'Default', // next-intl throws before || executes
  };
});
```

## Anti-Patterns to Avoid

### ❌ force-dynamic + generateStaticParams
**Problem:** Mixing dynamic rendering with static generation causes conflicts
```typescript
// ❌ BAD - incompatible patterns
export const dynamic = "force-dynamic";
export function generateStaticParams() { ... }
```

**Solution:** Remove force-dynamic, use static generation only
```typescript
// ✅ GOOD - static generation with ISR
export function generateStaticParams() { ... }
// No force-dynamic needed
```

### ❌ unstable_setRequestLocale in Dynamic Render
**Problem:** When using force-dynamic, unstable_setRequestLocale doesn't initialize properly
```typescript
// ❌ BAD - breaks with force-dynamic
export const dynamic = "force-dynamic";
unstable_setRequestLocale(locale);
```

**Solution:** Remove both, use NextIntlClientProvider instead
```typescript
// ✅ GOOD - provider handles context
<NextIntlClientProvider locale={locale} messages={messages}>
  {children}
</NextIntlClientProvider>
```

### ❌ Missing Translation Keys Without Fallbacks
**Problem:** next-intl throws error BEFORE JavaScript fallback executes
```typescript
// ❌ BAD - throws even with ||
{t('missing.key') || 'fallback'}  // next-intl throws first

// ❌ BAD - in metadata
title: t('title') || 'Default'  // throws during metadata generation
```

**Solution:** Ensure ALL used keys exist in locales before using t()
```typescript
// ✅ GOOD - key always exists
{t('products.viewAll')}  // verified in en.json + th.json

// ✅ GOOD - safe metadata
title: t('title')  // verified in metadata namespace
```

### ❌ Wrong Navigation Key Names
**Problem:** Code uses nav.* but locales use navigation.main.*
```typescript
// ❌ BAD - key mismatch
t('nav.shop')  // doesn't exist
// en.json has: navigation.main.shop

// ✅ GOOD - matches actual structure
t('navigation.main.shop')
```

## Translation Key Audit Checklist

Before deploying, run:
```bash
grep -rho "t('[^']*')\|t(\"[^\"]*\")" app/ components/ | \
  sed "s/t('\(.*\)')/\1/" | sort -u > /tmp/used-keys.txt

# Verify each key in both locales/en.json and locales/th.json
for key in $(cat /tmp/used-keys.txt); do
  python3 -c "
import json
with open('locales/en.json') as f: 
    en = json.load(f)
# Check if key path exists...
"
done
```

## Locale Routing Setup

**middleware.ts (required):**
```typescript
import createMiddleware from 'next-intl/middleware';
import { i18n } from './i18n.config';

export default createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'always',  // Always include /en or /th in URL
});

export const config = {
  matcher: [
    '/',
    '/(th|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
```

**i18n.config.ts (required):**
```typescript
export const i18n = {
  defaultLocale: 'th',
  locales: ['en', 'th'],
} as const;
```

## Build Error Solutions

| Error | Root Cause | Fix |
|-------|-----------|-----|
| `Export encountered an error on /[locale]/page` | Missing NextIntlClientProvider | Add provider wrapping children |
| `Type error: 'locale' not exported from 'next-intl/server'` | Using deprecated requestLocale API | Use `{ requestLocale }` param pattern |
| `MISSING_MESSAGE: key.name` | Key doesn't exist in locale | Add key to en.json + th.json |
| `Error occurred prerendering page "/en"` | Client component without i18n context | Wrap with NextIntlClientProvider |
| `Property 'href' does not exist on Button` | Wrong component for navigation | Use `<Link>` instead of `<Button>` |

## Vercel-Specific Notes

- **Root Directory:** Must match where package.json is located
- **Build Command:** `npm run build` (standard)
- **Output Directory:** `.next` (standard)
- **Environment:** No special env vars needed for next-intl
- **Cache:** Vercel restores automatically; clear if lock file issues persist

## Testing Checklist

```
Routes to test:
- /en (home)
- /th (home Thai)
- /en/products
- /th/products
- /en/blog
- /th/blog

Checks:
□ No 500 errors
□ No "Application error" in console
□ No MISSING_MESSAGE errors
□ Translations display correctly
□ Language toggle works
□ Links navigate properly
```

## Key Learnings

1. **NextIntlClientProvider is essential** — wraps all client components with locale context
2. **Static generation is stable** — use generateStaticParams() without force-dynamic
3. **Translation keys must pre-exist** — no fallbacks work because next-intl throws synchronously
4. **Locale routing requires middleware** — localePrefix: 'always' enforces /en or /th in URL
5. **Client components need server-side context** — layout.tsx loads messages and passes via provider

