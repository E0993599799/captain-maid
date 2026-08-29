# Captain Maid Public Portal Handoff Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Captain Maid a 100% public site with a normal `Login / My ARIGEO` header link to `https://auth.arigeo.com`, while removing the Captain Maid-local auth boundary introduced by PR #14.

**Architecture:** Captain Maid owns no authentication, OIDC callback, session, entitlement decision, or protected management surface. The header performs a plain browser navigation to the central My ARIGEO portal; `cms-arigeo` and `arigeo-hr` remain responsible for destination authorization.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Node test runner, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-29-captain-maid-public-portal-handoff-design.md`

## Global Constraints

- Captain Maid must remain publicly reachable without application authentication.
- Captain Maid must not create OIDC transactions, callbacks, tokens, sessions, or entitlement decisions.
- Captain Maid must not expose `/management` or `/api/auth/*` application-auth routes.
- Captain Maid must not require OIDC/session/entitlement runtime variables.
- The central handoff target is exactly `https://auth.arigeo.com`.
- Desktop and mobile navigation must both expose the handoff.
- English copy is `Login / My ARIGEO`; Thai copy is `เข้าสู่ระบบ / My ARIGEO`.
- Existing locale behavior, public marketing routes, CMS integration, SEO behavior, responsive navigation, CMS Contract, and Production Quality Gate must remain intact.
- PR #14 remains draft until implementation and verification are green.

---

### Task 1: Replace the Captain Maid auth contract with the public-handoff contract

**Files:**
- Modify: `tests/auth-contract.test.mjs`

**Interfaces:**
- Consumes: repository filesystem and `components/Header.tsx`.
- Produces: executable contract proving local auth is absent and the central portal handoff exists.

- [ ] **Step 1: Rewrite the contract test to require the new architecture**

Use Node's built-in test runner and assert all former PR-added auth paths are absent. Read `components/Header.tsx` and assert it contains `https://auth.arigeo.com`, `Login / My ARIGEO`, `เข้าสู่ระบบ / My ARIGEO`, and at least two occurrences of the central portal URL so desktop and mobile handoffs cannot collapse into a single hidden implementation.

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = (path) => fs.readFileSync(path, 'utf8')
const exists = (path) => fs.existsSync(path)

const forbidden = [
  'app/(management)/layout.tsx',
  'app/(management)/management/page.tsx',
  'app/api/auth/access-denied/route.ts',
  'app/api/auth/callback/route.ts',
  'app/api/auth/login/route.ts',
  'app/api/auth/logout/route.ts',
  'lib/auth/config.ts',
  'lib/auth/crypto.ts',
  'lib/auth/oidc.ts',
  'lib/auth/require-access.ts',
  'lib/auth/session.ts',
]

test('Captain Maid owns no local authentication runtime', () => {
  for (const path of forbidden) assert.equal(exists(path), false, `${path} must not exist`)
})

test('header exposes public My ARIGEO handoff for both navigation modes', () => {
  const header = read('components/Header.tsx')
  assert.match(header, /https:\/\/auth\.arigeo\.com/)
  assert.match(header, /Login \/ My ARIGEO/)
  assert.match(header, /เข้าสู่ระบบ \/ My ARIGEO/)
  assert.ok((header.match(/https:\/\/auth\.arigeo\.com/g) || []).length >= 2)
})

test('Captain Maid header does not implement an OIDC or session flow', () => {
  const header = read('components/Header.tsx')
  assert.doesNotMatch(header, /OIDC_|code_challenge|CAPTAIN_SESSION_SECRET|ARIGEO_ACCESS_API_KEY|\/api\/auth\//)
})
```

- [ ] **Step 2: Run the contract and confirm it fails before implementation**

Run: `node --test tests/auth-contract.test.mjs`

Expected: FAIL because the PR currently contains the forbidden auth files and the header does not yet contain the My ARIGEO handoff.

- [ ] **Step 3: Commit the red contract**

```bash
git add tests/auth-contract.test.mjs
git commit -m "test: define Captain Maid public portal contract"
```

---

### Task 2: Remove Captain Maid-local authentication and management runtime

**Files:**
- Delete: `app/(management)/layout.tsx`
- Delete: `app/(management)/management/page.tsx`
- Delete: `app/api/auth/access-denied/route.ts`
- Delete: `app/api/auth/callback/route.ts`
- Delete: `app/api/auth/login/route.ts`
- Delete: `app/api/auth/logout/route.ts`
- Delete: `lib/auth/config.ts`
- Delete: `lib/auth/crypto.ts`
- Delete: `lib/auth/oidc.ts`
- Delete: `lib/auth/require-access.ts`
- Delete: `lib/auth/session.ts`

**Interfaces:**
- Consumes: the forbidden-path list from Task 1.
- Produces: Captain Maid source tree with no application-auth runtime or private management route.

- [ ] **Step 1: Delete exactly the eleven PR-added auth/management files listed above**

Do not delete public site, CMS, locale, SEO, or navigation files.

- [ ] **Step 2: Run the contract again**

Run: `node --test tests/auth-contract.test.mjs`

Expected: local-auth absence assertion passes; header-handoff assertion still fails because Task 3 is not implemented yet.

- [ ] **Step 3: Search for stale runtime dependencies**

Run:

```bash
git grep -n -E 'CAPTAIN_SESSION_SECRET|OIDC_ISSUER|OIDC_CLIENT_ID|OIDC_AUTHORIZATION_ENDPOINT|OIDC_TOKEN_ENDPOINT|OIDC_JWKS_URI|ARIGEO_ENTITLEMENT_ENDPOINT|ARIGEO_ACCESS_API_KEY|requireCaptainAccess|__Host-captain_' -- ':!docs/superpowers/**'
```

Expected: no matches in application/runtime source. Documentation/history files under `docs/superpowers/**` are deliberately excluded.

- [ ] **Step 4: Commit runtime removal**

```bash
git add -A app lib
git commit -m "refactor: keep Captain Maid public"
```

---

### Task 3: Add My ARIGEO handoff to desktop and mobile header

**Files:**
- Modify: `components/Header.tsx`
- Test: `tests/auth-contract.test.mjs`

**Interfaces:**
- Consumes: locale inferred by the existing `Header` component.
- Produces: two ordinary anchor/link surfaces targeting `https://auth.arigeo.com`, one in desktop controls and one in mobile navigation.

- [ ] **Step 1: Add centralized copy and target constants near existing header copy**

```tsx
const ARIGEO_PORTAL_URL = 'https://auth.arigeo.com'

const ARIGEO_LOGIN_COPY: Record<Locale, string> = {
  th: 'เข้าสู่ระบบ / My ARIGEO',
  en: 'Login / My ARIGEO',
}
```

- [ ] **Step 2: Add the desktop handoff next to the existing header actions**

Use a normal external `<a>` so Captain Maid performs no routing/auth logic:

```tsx
<a
  href={ARIGEO_PORTAL_URL}
  className="hidden min-h-11 items-center rounded-full border border-[#0079c1]/25 px-4 text-sm font-semibold text-[#006cad] transition-colors hover:bg-[#e6f3fa] lg:inline-flex"
>
  {ARIGEO_LOGIN_COPY[locale]}
</a>
```

Keep the existing product/search/language actions intact.

- [ ] **Step 3: Add the mobile handoff inside the mobile drawer**

Place it after the primary mobile nav and before/adjacent to language controls:

```tsx
<a
  href={ARIGEO_PORTAL_URL}
  className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full border border-[#0079c1]/25 px-4 text-sm font-semibold text-[#006cad] hover:bg-[#e6f3fa]"
  onClick={() => setMobileOpen(false)}
>
  {ARIGEO_LOGIN_COPY[locale]}
</a>
```

- [ ] **Step 4: Run the focused contract**

Run: `node --test tests/auth-contract.test.mjs`

Expected: PASS.

- [ ] **Step 5: Run type checking**

Run: `npm run type-check`

Expected: PASS.

- [ ] **Step 6: Commit header handoff**

```bash
git add components/Header.tsx tests/auth-contract.test.mjs
git commit -m "feat: link Captain Maid to My ARIGEO"
```

---

### Task 4: Remove obsolete Captain Maid SSO deployment gates without touching valid quality gates

**Files:**
- Inspect/remove if present on the PR branch: `.github/workflows/vercel-sso-preview.yml`
- Inspect/remove if present on the PR branch: `.github/workflows/vercel-staging-sync-auth.yml`
- Inspect/remove if present on the PR branch: `.github/workflows/vercel-staging-unprotect-verify.yml`
- Inspect/remove if present on the PR branch: `.github/workflows/cloudflare-sso-preview.yml`
- Preserve: `.github/workflows/cms-contract.yml`
- Preserve: `.github/workflows/lighthouse-quality.yml`

**Interfaces:**
- Consumes: design rule that Captain Maid has no OIDC runtime.
- Produces: CI that tests Captain Maid's real responsibilities only.

- [ ] **Step 1: List workflow files on the branch**

Run: `find .github/workflows -maxdepth 1 -type f -print | sort`

Expected on the current PR branch snapshot: `cms-contract.yml` and `lighthouse-quality.yml`. If any of the four SSO-only workflows are present due to branch synchronization, remove only those named files.

- [ ] **Step 2: Prove no SSO-only workflow remains**

Run:

```bash
git grep -n -E 'VERCEL_FREE_STAGING_AUTH_RUNTIME|OIDC_ISSUER|CAPTAIN_SESSION_SECRET|ARIGEO_ACCESS_API_KEY' -- .github/workflows || true
```

Expected: no matches.

- [ ] **Step 3: Commit only if workflow files actually changed**

```bash
git add .github/workflows
git diff --cached --quiet || git commit -m "ci: remove Captain Maid SSO staging gates"
```

---

### Task 5: Full production verification and PR evidence

**Files:**
- No application file changes expected.
- Verify: `package.json` scripts, GitHub Actions checks, PR #14 diff.

**Interfaces:**
- Consumes: completed Tasks 1-4.
- Produces: evidence that PR #14 implements the approved public-handoff design and remains safe to review.

- [ ] **Step 1: Run the repository production gate**

Run: `npm run production:check`

Expected: production static checks, TypeScript, Node tests, and Next.js build all PASS without any OIDC/session/entitlement variables.

- [ ] **Step 2: Verify the final diff contains no Captain Maid auth implementation**

Run:

```bash
git diff --name-status main...HEAD
git grep -n -E 'requireCaptainAccess|__Host-captain_|code_challenge|CAPTAIN_SESSION_SECRET|ARIGEO_ACCESS_API_KEY' -- ':!docs/superpowers/**' || true
```

Expected: no runtime auth implementation; final functional change is the My ARIGEO header handoff plus its contract test.

- [ ] **Step 3: Verify the header target and locale labels**

Run:

```bash
git grep -n 'https://auth.arigeo.com' -- components/Header.tsx
git grep -n -E 'Login / My ARIGEO|เข้าสู่ระบบ / My ARIGEO' -- components/Header.tsx
```

Expected: central portal target plus both localized labels are present.

- [ ] **Step 4: Push branch and wait for required GitHub checks**

Expected: `CMS Contract` and `Production Quality Gate` succeed on the new head SHA.

- [ ] **Step 5: Review PR #14 against the approved spec**

Confirm PR remains draft until evidence is green. Update the PR description/comment so reviewers are not instructed to validate the obsolete Captain Maid-local SSO architecture.

- [ ] **Step 6: Final completion criterion**

Report completion only when the branch diff, production gate, and required GitHub checks prove:

```text
CAPTAIN_MAID_AUTH=ABSENT
CAPTAIN_MAID_PUBLIC=YES
MY_ARIGEO_HANDOFF=https://auth.arigeo.com
DESKTOP_HANDOFF=PRESENT
MOBILE_HANDOFF=PRESENT
CMS_CONTRACT=PASS
PRODUCTION_QUALITY_GATE=PASS
```
