# SKILL: Vercel Deployment

## Mission
Safely deploy, verify, debug, and manage Next.js applications on Vercel, ensuring a reliable and predictable path from local development to production.

## Scope
This skill must be applied for any task that involves deploying to Vercel (Preview or Production), managing environment variables, or debugging a deployment-related issue.

## Source References Studied
- Vercel CLI Documentation
- Vercel Deployments, Domains, and Environment Variables Docs
- Vercel Deployment Protection & Instant Rollback Docs
- Next.js Deployment on Vercel Docs

## Core Principles
- **Preview First, Always:** Never deploy directly to production without first verifying the changes in a Preview deployment.
- **Immutable Deployments:** Every push creates a new, immutable deployment. This makes rollbacks safe and instantaneous.
- **Configuration as Code:** The deployment configuration (`vercel.json`, `next.config.js`) should be part of the repository to ensure reproducibility.
- **Never Expose Secrets:** Environment variable management is a critical part of the deployment process. Treat secrets with extreme care.

## Implementation Rules (Vercel CLI & Next.js)

### Pre-Deployment Workflow
1.  **Detect Package Manager:** Identify the correct package manager by checking for lock files in this order:
    - `pnpm-lock.yaml` → use `pnpm`
    - `package-lock.json` → use `npm`
    - `yarn.lock` → use `yarn`
    - `bun.lockb` → use `bun`
2.  **Detect Build Command:** Read the `package.json` file's `scripts` section and use the project-defined build command (usually `build`). Do not invent build commands.
3.  **Check Environment Variables:** Identify all required environment variables by inspecting the code (e.g., `process.env.VARIABLE_NAME`). Use `vercel env pull .env.development.local` to sync development variables. Ensure all required variables are set in the Vercel project settings for Preview and Production.

### Deployment Workflow
1.  **Preview Deployment:**
    - Run `vercel` to create a preview deployment.
    - Capture the generated preview URL (e.g., `my-site-12345.vercel.app`).
    - Inspect the build logs for any errors or warnings.
    - Test the main routes on the preview URL to confirm functionality.
2.  **Production Deployment:**
    - **Only deploy to production when explicitly requested.**
    - If the preview deployment is successful and verified, promote it to production by running `vercel --prod`. This is the safest method.
    - Capture the final production URL.
    - Perform critical-path testing on the production URL immediately after deployment.
    - Note the deployment URL for a potential rollback.

### Post-Deployment & Debugging
1.  **Log Inspection:** If a build or runtime error occurs, use `vercel logs <deployment-url>` to inspect the logs and identify the root cause.
2.  **Instant Rollback:** If a production deployment is broken, **roll back immediately** to the last known good deployment to minimize user impact. This is a critical first step before debugging.
3.  **Deployment Protection:** For sensitive preview deployments, use Vercel's password protection or authentication features to prevent public access.

## Checklist (Pass/Fail)
- [ ] **Local Build:** Does the `npm run build` command succeed locally before attempting to deploy?
- [ ] **Env Variables:** Are all required environment variables for the target environment (Preview/Production) set in the Vercel project?
- [ ] **Preview Success:** Was a preview deployment created successfully without build errors?
- [ ] **Preview Verification:** Have the critical user flows been tested on the preview URL?
- [ ] **Production Deploy (if requested):** Was the deployment promoted from a verified preview build?
- [ ] **Production Verification:** Have the critical user flows been tested on the final production URL?

## Common AI Mistakes to Avoid
- **Deploying directly to production:** Skipping the preview step is a common and dangerous mistake.
- **Forgetting environment variables:** Pushing code that relies on a new environment variable without adding it to the Vercel project settings first.
- **Ignoring build logs:** Reporting a deployment as "successful" when the build logs contain critical warnings or errors that indicate a problem.
- **Not testing the deployed URL:** Assuming that because the build passed, the live site works perfectly.

## Quality Gate (Proof Required)
Before claiming "DONE," you must provide proof of the deployment process.

## Output Contract
When you have completed a deployment task, you must report:
- **Deployment Target:** `Preview` or `Production`.
- **Commands Run:** The exact `vercel` commands used.
- **Build Status:** `Success` or `Failed`.
- **Preview URL:** The URL of the generated preview deployment.
- **Production URL:** The final production URL (if applicable).
- **Verification:** A summary of the routes that were tested on the live URL.
- **Rollback Point:** The URL of the previous production deployment that can be used for rollback.
- **Final Status:** `DONE` or `FAILED`.
