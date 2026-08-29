# Captain Maid Public Portal Handoff Design

## Goal

Keep Captain Maid a 100% public marketing website. Captain Maid must not authenticate users, create local sessions, evaluate application entitlements, or expose a private management surface. It may only provide a visible entry point to the ARIGEO central identity portal.

## Architecture

Captain Maid remains a public application with no OIDC client/runtime of its own. A `Login / My ARIGEO` action in the site header links users to `https://auth.arigeo.com`. Authentication occurs only at the central identity service. After authentication, My ARIGEO shows only applications the user is entitled to access, including `cms-arigeo` and `arigeo-hr` when applicable. Authorization remains owned by each destination application.

Flow:

`captain-maid.com -> Login / My ARIGEO -> auth.arigeo.com -> My ARIGEO -> cms-arigeo or arigeo-hr according to entitlement`

## Captain Maid Responsibilities

- Serve all public routes without an application-authentication requirement.
- Render a `Login / My ARIGEO` link in desktop and mobile navigation.
- Link directly to `https://auth.arigeo.com` without creating Captain Maid auth transactions, state, nonce, PKCE verifier, callbacks, or session cookies.
- Preserve existing public marketing behavior, SEO routes, CMS integration, locale behavior, and responsive navigation.

## Explicit Non-Responsibilities

Captain Maid must not contain or require:

- `/management` or any equivalent protected application workspace.
- `/api/auth/login`, `/api/auth/callback`, `/api/auth/logout`, or `/api/auth/access-denied` routes.
- OIDC token verification or JWKS handling.
- Captain Maid session cookies or transaction cookies.
- Captain Maid application-entitlement decisions.
- `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_AUTHORIZATION_ENDPOINT`, `OIDC_TOKEN_ENDPOINT`, `OIDC_JWKS_URI`, `OIDC_SCOPES`, `CAPTAIN_SESSION_SECRET`, `ARIGEO_ENTITLEMENT_ENDPOINT`, `ARIGEO_ACCESS_API_KEY`, `COOKIE_SECURE`, or `SESSION_TTL_SECONDS` runtime variables.
- Vercel staging workflows whose only purpose is to provision or verify Captain Maid OIDC/auth runtime.

## Destination Application Contract

`cms-arigeo` and `arigeo-hr` remain responsible for their own application access boundary after central authentication. A successful central login does not imply access to either application. Each destination application must deny access by default and require explicit entitlement/membership.

## UI Contract

The header action should be labeled `Login / My ARIGEO` in English. Localized Thai navigation may use an equivalent Thai label while preserving the ARIGEO product name. The action must appear in both desktop and mobile navigation and visually match the existing Captain Maid navigation system rather than introducing a separate account UI.

The link target is `https://auth.arigeo.com` and should be a normal navigation link. Captain Maid must not proxy the identity portal and must not append credentials, tokens, or application secrets.

## PR #14 Migration

PR #14 currently adds a Captain Maid auth boundary. The branch will be repurposed to implement this public portal handoff design by removing all auth-specific additions from that PR and replacing the auth contract test with a public-handoff contract test.

The following PR-added paths must be removed:

- `app/(management)/layout.tsx`
- `app/(management)/management/page.tsx`
- `app/api/auth/access-denied/route.ts`
- `app/api/auth/callback/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `lib/auth/config.ts`
- `lib/auth/crypto.ts`
- `lib/auth/oidc.ts`
- `lib/auth/require-access.ts`
- `lib/auth/session.ts`

`tests/auth-contract.test.mjs` will be rewritten to assert the opposite contract: no Captain Maid auth runtime exists and a public My ARIGEO handoff exists.

## Deployment and Verification

The production gate must prove:

1. Existing public Captain Maid routes continue to build and remain publicly reachable.
2. Captain Maid contains no `/management` route or local auth API implementation.
3. Captain Maid no longer depends on OIDC/session/entitlement environment variables.
4. Desktop and mobile navigation expose a My ARIGEO/login link targeting `https://auth.arigeo.com`.
5. Existing quality and CMS contract workflows remain green.

The Vercel SSO staging workflows created only to test Captain Maid OIDC are obsolete under this design and should be removed or disabled so they no longer create false deployment blockers.

## Merge Rule

PR #14 remains draft while this migration is implemented and verified. It must not be merged solely on the basis of the previous Captain Maid SSO proof, because that proof tests an architecture this design explicitly removes.