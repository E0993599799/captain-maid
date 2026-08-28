# Captain Maid — ARIGEO Identity Boundary

## Decision

Captain Maid is currently a public marketing/content application. Its public website does not require an application login and must not be globally protected by authentication middleware.

Interactive authentication is owned by the ARIGEO identity platform:

- `auth.arigeo.com` — ZITADEL custom domain and OIDC issuer.
- `cms.arigeo.com` — authenticated content-management application.
- Captain Maid content is scoped in CMS with `CMS_SITE_SLUG=captain-maid`.

## Content manager access

A Captain Maid content manager signs in through `auth.arigeo.com`, receives identity keyed by immutable OIDC sub, then enters CMS ARIGEO only when explicit CMS entitlement and CMS-owned role/site authorization allow access.

```text
Content Manager
    -> auth.arigeo.com
    -> OIDC sub
    -> CMS application entitlement
    -> cms.arigeo.com
    -> Payload role + sites includes captain-maid
    -> ALLOW / DENY
```

## Security contract

- No Captain Maid local password or separate login database.
- No shared `.arigeo.com` session cookie.
- No authentication requirement on public marketing pages.
- No duplicate Captain Maid admin application while CMS ARIGEO already owns content management.
- Authentication does not grant CMS authorization; Payload role/site permissions remain authoritative.
- If a genuine Captain Maid-only protected application surface is added later, it must become its own OIDC client and use explicit Captain Maid entitlement before local RBAC.
