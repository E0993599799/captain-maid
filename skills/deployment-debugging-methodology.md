---
name: deployment-debugging-methodology
description: Systematic approach to debugging Next.js + i18n deployment failures on Vercel
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 89d319b0-5cd6-42f1-b481-ea5fbd1d6cfe
---

# Deployment Debugging Methodology

## The Loop That Works

When facing cascading build errors on Vercel:

### Phase 1: Build Error Triage
1. **Read the exact error message** (not the generic summary)
2. **Identify error type:**
   - TypeScript compile error → code mistake
   - Prerender error → runtime rendering failure
   - 500 on deployed page → context/provider missing
3. **Map error to symptom:**
   - "Cannot find module X" → missing import
   - "Property X does not exist on type Y" → wrong props
   - "MISSING_MESSAGE: key" → translation key doesn't exist
   - "Export encountered an error" → component throws during render

### Phase 2: Root Cause Identification
**Don't fix symptoms. Find root causes.**

Example from this session:
```
❌ "Product component doesn't accept property 'product'"
→ Root cause: ProductCardProps expects flat props, not nested object
→ Fix: Use {...product} spread instead of product={product}

❌ "Application error: a client-side exception"
→ Root cause: Client components have no i18n context
→ Fix: Wrap with NextIntlClientProvider

❌ "Export encountered an error on /[locale]/page"
→ Root cause: force-dynamic + generateStaticParams conflict
→ Fix: Remove force-dynamic, use static generation
```

### Phase 3: Targeted Fixes Only
**One fix per build. Wait for feedback.**

Don't:
```typescript
// ❌ BAD - fix multiple things at once
- Remove force-dynamic
- Add provider
- Fix translation keys
- Update i18n API
// Now which fix worked?
```

Do:
```typescript
// ✅ GOOD - one change per commit
Commit 1: Remove force-dynamic
Build → See if /en prerender works
  └─ Still fails? Commit 2: Add NextIntlClientProvider
    Build → See if context is fixed
      └─ Still fails? Commit 3: Fix translation keys
```

## Translation Key Audit (Critical)

**Before writing any fix, audit ALL translation usage:**

```bash
# 1. Find every t() call
grep -rho "t('[^']*')\|t(\"[^\"]*\")" app/ components/ | sort -u

# 2. For each key, verify it exists in both locales
python3 << 'EOF'
import json
with open('locales/en.json') as f: en = json.load(f)
with open('locales/th.json') as f: th = json.load(f)

def has_key(d, path):
    cur = d
    for part in path.split('.'): cur = cur.get(part, {}) if isinstance(cur, dict) else None
    return isinstance(cur, str)

# Check each key...
EOF
```

**Why this matters:**
- next-intl throws error SYNCHRONOUSLY when key is missing
- JavaScript fallback (`||`) never executes
- This causes silent prerender failures that are hard to debug

## Anti-Pattern Recognition

Watch for these patterns that cause cascading failures:

| Pattern | Problem | Fix |
|---------|---------|-----|
| `force-dynamic` + `generateStaticParams()` | Incompatible rendering modes | Remove force-dynamic |
| `unstable_setRequestLocale` with dynamic render | Context not initialized properly | Use NextIntlClientProvider |
| `t('key') \|\| fallback` | Fallback never executes | Ensure key exists first |
| `<Button href="/path">` | Button doesn't accept href | Use `<Link>` instead |
| `nav.*` keys in code but `navigation.main.*` in JSON | Key mismatch | Audit and rename keys |

## The Serial Commit Strategy

Each commit should be **atomic and testable**:

```
Commit 1: Remove force-dynamic
→ Test: Does build continue further?

Commit 2: Add NextIntlClientProvider
→ Test: Does /en prerender without context error?

Commit 3: Audit and add missing translation keys
→ Test: Does build complete?

Commit 4: Fix navigation key names
→ Test: Does /en load without Application error?

Commit 5: Update deprecated i18n API
→ Test: Do deprecation warnings disappear?
```

**Why:** Each commit is independently reversible. If build fails, you know exactly which commit introduced the issue.

## Real-Time Verification

After each fix, check:

```bash
# For remaining issues of same type
grep -r "force-dynamic" app/          # Should be gone
grep -r "nav\." components/           # Should be gone or mapped
grep -r "MISSING_MESSAGE" locales/    # Should be zero
```

## When to Stop and Rethink

If you've done 5+ commits on the same issue:
1. You're probably fixing symptoms, not root cause
2. Step back and read the actual error message again
3. Ask: "What would have to be true for this error to happen?"
4. Work backwards from that condition

Example:
```
Error: "Export encountered an error on /[locale]/page"
Q: What would cause this?
A: A component throws during prerender
Q: Why would it throw?
A: It needs context that isn't available
Q: What context?
A: i18n context from next-intl
Solution: Provide the context with NextIntlClientProvider
```

## Deployment Workflow

```
Local: git commit → git push
↓
Vercel: Auto-rebuild detected
↓
Watch logs in real-time (12:XX:XX timestamps)
↓
If build succeeds:
  - Navigate to /en in incognito
  - Check browser console for errors
  - Test navigation, products, blog routes
↓
If build fails:
  - Read error message
  - Identify root cause
  - Make ONE targeted fix
  - Commit and push
  - Go to "Watch logs" step
```

## Success Criteria

Build is production-ready when:
- ✅ `npm run build` completes without errors
- ✅ Vercel build log shows "Generating static pages (14/14)" with no errors
- ✅ `/en` and `/th` load without 500 errors
- ✅ Browser console has no "Application error" or i18n errors
- ✅ All routes render (home, products, blog, etc.)
- ✅ Deployed commit SHA matches latest `git log --oneline`

