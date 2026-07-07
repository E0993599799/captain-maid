# SKILL: Web Security

## Mission
Protect the application, its users, data, and the production environment from common web threats by implementing a defense-in-depth strategy.

## Scope
This skill must be applied to every feature that involves authentication, API routes, server actions, forms, file uploads, database access, or management of environment variables.

## Source References Studied
- OWASP Top 10
- OWASP Cheat Sheet Series (Input Validation, Auth, XSS, CSP, etc.)
- MDN Web Security Docs (HTTP Headers)
- Next.js Security Docs (CSP, Headers, Middleware, Server Actions)
- Vercel Security Docs (Environment Variables, Deployment Protection)

## Core Principles
- **Never Trust the Client:** All data coming from the user's browser (forms, API calls, headers) is untrusted and must be validated on the server.
- **Enforce on the Server:** All critical business logic, especially authentication and authorization, must be enforced on the server-side, not just hidden in the UI.
- **Principle of Least Privilege:** Code and API keys should only have the minimum permissions necessary to perform their function.
- **Defense in Depth:** Use multiple layers of security (e.g., input validation + CSP + secure headers) so that if one layer fails, others still provide protection.

## Implementation Rules (Next.js + Vercel)

### Environment & Secret Management
1.  **Never Expose Secrets:** Private keys, API secrets, and database credentials must **never** be included in frontend code.
2.  **`NEXT_PUBLIC_` is Public:** Any environment variable prefixed with `NEXT_PUBLIC_` is visible in the browser. Only use it for non-sensitive information (e.g., a public Supabase anon key, a GA ID).
3.  **Use Vercel Environment Variables:** Store all secrets in Vercel's Environment Variable settings. Do not commit `.env.local` files containing production secrets.
4.  **Separate Environments:** Use different secrets for `Production`, `Preview`, and `Development` environments.

### Authentication & Authorization
1.  **Server-Enforced Auth:** Protect routes and server-side logic by validating the user's session on the server (e.g., in Middleware, API Routes, or Server Actions). Do not rely on client-side routing checks alone.
2.  **Check Permissions:** After authenticating *who* the user is, you must authorize *what* they are allowed to do. This check must happen on the server before accessing or modifying data.

### Input Validation & Output Sanitization
1.  **Validate All Server Inputs:** All data submitted to API Routes and Server Actions must be validated using a schema library like Zod.
2.  **Prevent XSS:** Do not use `dangerouslySetInnerHTML`. If you must render user-generated HTML, use a sanitization library like `isomorphic-dompurify`. Next.js templating already provides basic XSS protection for content.
3.  **Strongly-Typed API Responses:** Ensure API routes and server actions return well-defined data structures to prevent unexpected data leakage.

### Secure Headers
Configure the following HTTP security headers in `next.config.js`.
```javascript
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  }
]

async headers() {
  return [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ]
}
```
- **Content-Security-Policy (CSP):** Implement a strict CSP via `next.config.js` to mitigate XSS and other injection attacks. Start with a restrictive policy and add sources as needed.

### File Uploads
1.  **Limit Type and Size:** Validate file types on the server (checking magic numbers, not just the `Content-Type` header) and enforce a reasonable file size limit.
2.  **Store Safely:** Uploaded files should be stored in a dedicated, non-public location (like a separate S3 bucket or Supabase Storage) and served with short-lived signed URLs. Do not store them in the public directory of the web server.

### Database Access (If Supabase is used)
1.  **Enable Row-Level Security (RLS):** RLS must be enabled on all tables containing sensitive data. Policies should be written to ensure users can only access their own data.
2.  **Use `service_role` Key on Server Only:** The `service_role` key, which bypasses RLS, must **never** be used in client-side code. It should only be used in secure server-side environments (e.g., Server Actions, API routes) for administrative tasks.

## Checklist (Pass/Fail)
- [ ] **Secrets:** Are all secrets stored as Vercel Environment Variables and not exposed to the client?
- [ ] **Route Protection:** Are all private pages and API routes protected by server-side session checks?
- [ ] **Input Validation:** Does every Server Action and API Route validate its input arguments/body?
- [ ] **XSS Prevention:** Is `dangerouslySetInnerHTML` avoided?
- [ ] **Security Headers:** Are `X-Content-Type-Options`, `Referrer-Policy`, and `X-Frame-Options` configured?
- [ ] **CSP:** Is a Content Security Policy implemented?
- [ ] **Database (if applicable):** Is RLS enabled on sensitive tables?

## Common AI Mistakes to Avoid
- **Putting secrets in client-side code:** Placing a Supabase `service_role` key or other private API keys in a component is a critical mistake.
- **Trusting the client:** Assuming that because a button is hidden in the UI, a user cannot call the API endpoint it triggers. All server logic must be protected.
- **Forgetting input validation:** Writing a Server Action that takes an argument and uses it directly in a database query without validation.
- **Using a weak CSP:** Starting with `'unsafe-inline'` or `'unsafe-eval'` in a CSP, which defeats much of its purpose.

## Quality Gate (Proof Required)
Before claiming "DONE," you must provide proof of a security review.
- **Tools:** Run a security scanner like Snyk or check Vercel's security recommendations if available.
- **Manual Check:** Confirm that the items in the checklist have been implemented.

## Output Contract
When you have completed this security check, you must report:
- **Secrets Status:** Confirmation that no secrets are exposed on the client-side.
- **Auth/Authz Status:** A list of the routes/actions that were checked and confirmed to have server-side protection.
- **Headers Status:** Confirmation that security headers and a CSP are in place.
- **Remaining Risks:** Any identified security risks that were out of scope or not addressed.
- **Final Status:** `DONE` or `PARTIAL` (if some checks were skipped).
