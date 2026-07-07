---
name: nextjs-next-intl-deployment
pattern: NextIntlClientProvider is non-negotiable for static generation with client components
date: 2026-07-07
source: rrr: captain-maid
concepts: [next-intl, Next.js 15, Vercel, static-generation, i18n, rendering-patterns]
---

# Next.js 15 + next-intl Deployment: Critical Patterns

## Core Pattern (The Lesson)

For any Next.js app using next-intl with client components:
1. Server layout MUST wrap children with NextIntlClientProvider
2. Pass locale and messages as props to the provider
3. Remove force-dynamic (use static generation with generateStaticParams)
4. Audit ALL translation keys before deploying (next-intl throws synchronously)

This pattern is not optional. It's the boundary between working and broken.

## Why This Matters

**Problem**: Client components (marked `'use client'`) that call `useTranslations()` have no i18n context during server-side static rendering. The component throws when it tries to access the translation hook without a provider.

**Broken patterns** that fail:
- `unstable_setRequestLocale` in layout (doesn't initialize with static gen)
- `force-dynamic` as universal fix (kills performance, conflicts with generateStaticParams)
- Fallback values like `t('key') || 'fallback'` (next-intl throws before fallback executes)

**Working pattern** that wins:
```typescript
// app/[locale]/layout.tsx
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

## Validation Rules

Before deploying a next-intl app:

```bash
# 1. Find all translation calls
grep -rho "t('[^']*')\|t(\"[^\"]*\")" app/ components/ | sort -u > keys.txt

# 2. Verify each key exists in both locales
python3 << 'VERIFY'
import json
with open('locales/en.json') as f: en = json.load(f)
with open('locales/th.json') as f: th = json.load(f)

def has_key(d, dotted):
    cur = d
    for part in dotted.split('.'): cur = cur.get(part, {}) if isinstance(cur, dict) else None
    return isinstance(cur, str)

missing = [k for k in open('keys.txt') if not (has_key(en, k.strip()) and has_key(th, k.strip()))]
if missing:
    print(f"❌ Missing keys: {missing}")
    exit(1)
print("✅ All keys verified")
VERIFY
```

## Red Flags to Avoid

| Pattern | Why It's Wrong | What To Do |
|---------|---|---|
| `export const dynamic = "force-dynamic"` with `generateStaticParams()` | Incompatible rendering modes on Vercel | Use static gen only; remove force-dynamic |
| `unstable_setRequestLocale(locale)` | Doesn't work with static generation | Use NextIntlClientProvider instead |
| `t('key') \|\| 'fallback'` | next-intl throws before \|\| executes | Ensure key exists; don't rely on fallback |
| `nav.*` keys in code, `navigation.main.*` in JSON | Key namespace mismatch | Audit all t() calls against locale files |

## Application to Future Projects

✅ Add to deployment checklist for ANY next-intl + Vercel project:
1. Confirm layout wraps children with NextIntlClientProvider
2. Confirm generateStaticParams exists (no force-dynamic)
3. Run translation key audit before pushing to main
4. Test /en and /th routes after deployment
5. Check browser console for "Application error"

