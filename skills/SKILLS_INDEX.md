# AI Agent Skills Index

## Purpose
This document defines the set of specialized skills and the mandatory quality gates that all AI agents must follow when working on this project. These skills ensure that all work is high-quality, consistent, and production-ready.

## Available Skills
- `visual-design.md` (Located in global user skills)
- `performance.md`
- `security.md`
- `vercel-deploy.md`
- `nextjs-next-intl-deployment.md`
- `deployment-debugging-methodology.md`
- `final-proof.md`

## ❗CRITICAL: Required Gate Order❗
All agents must apply these skills as quality gates in the following strict order. A step cannot be skipped unless it is not applicable to the task.

1.  **Visual Design Gate (`visual-design.md`)**
2.  **Performance Gate (`performance.md`)**
3.  **Security Gate (`security.md`)**
4.  **Vercel Deployment Gate (`vercel-deploy.md`)**
5.  **Final Proof Gate (`final-proof.md`)**

---

## Skill Usage Guide

### 1. `visual-design.md`
- **Purpose:** To ensure all UI/UX work is beautiful, modern, conversion-focused, and aligned with the brand's identity.
- **When to use:** Must be the **first step** for any task that involves creating or modifying user interfaces, components, or visual styles.
- **Integration Note:** This skill is the foundational gate for visual quality. The interactive process defined within it (clarify subject, research, propose colors, request assets) must be completed before any other skill is applied.

### 2. `performance.md`
- **Purpose:** To ensure the application is fast, responsive, and provides an excellent user experience by meeting Core Web Vitals targets.
- **When to use:** Apply after the visual design is complete but before security checks. This skill is required for any change that affects the frontend, especially those involving images, fonts, or new JavaScript components.

### 3. `security.md`
- **Purpose:** To protect the application, users, and data from common web vulnerabilities.
- **When to use:** Apply after performance checks. This is mandatory for any work involving authentication, API routes, server actions, forms, user input, or environment variables.

### 4. `vercel-deploy.md`
- **Purpose:** To ensure deployments to Vercel are safe, predictable, and verifiable.
- **When to use:** Apply this skill whenever a task requires deploying the application to a preview or production environment.

### 4.1. `nextjs-next-intl-deployment.md`
- **Purpose:** Provides specific patterns, anti-patterns, and fixes for Next.js 15 and `next-intl` deployment issues on Vercel.
- **When to use:** Consult this skill *whenever* encountering build or runtime errors related to internationalization (i18n) or Next.js rendering behavior during deployment.

### 4.2. `deployment-debugging-methodology.md`
- **Purpose:** Outlines a systematic approach to debugging complex, cascading deployment failures on Vercel, focusing on root cause identification and atomic fixes.
- **When to use:** Activate this skill *immediately* when a Vercel build fails unexpectedly, especially with prerendering errors, SWC mismatches, or client-side context issues.

### 5. `final-proof.md`
- **Purpose:** To provide a strict, evidence-based report that proves the task is truly "DONE."
- **When to use:** This must be the **final skill applied** before responding to the user. It structures the output and ensures all previous gates have been considered and reported on.

## Strict Final Workflow
All agents must follow this exact workflow:

1.  **Decode Request:** Understand the user's goal.
2.  **Inspect Project:** Review the existing codebase and file structure.
3.  **Apply `visual-design.md`:** If the task affects UI/UX.
4.  **Apply `performance.md`:** If the task affects the frontend.
5.  **Apply `security.md`:** If the task involves sensitive logic or data.
6.  **Apply `vercel-deploy.md`:** If deployment is required.
7.  **Apply `final-proof.md`:** Structure the final output with concrete evidence from the previous gates.

## Final Status Rules
The final status reported in the `final-proof.md` output must be one of the following:
- **`DONE`**: All required gates passed with proof.
- **`PARTIAL`**: Some gates were passed, but others were skipped or are incomplete.
- **`FAILED`**: A critical gate (e.g., build, deploy) failed.
- **`BLOCKED`**: The agent cannot proceed without missing information or access.
- **`NEEDS_USER_ACTION`**: The user must perform a specific next step.
