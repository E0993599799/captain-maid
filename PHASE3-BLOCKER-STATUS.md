# Captain Maid Phase 3: Blocker Status & Resolution Path

**Date**: 2026-07-12
**Blocker**: `pnpm dev` spawns cmd.exe on Windows PowerShell instead of running Next.js dev server
**Impact**: Phase 3 deployment blocked — cannot test locally
**Root Cause**: TBD (see diagnostics)

---

## Current State

✅ **Fixed**:
- React versions locked to exact versions (18.3.1 instead of ^18.3.1)
- React-DOM locked (18.3.1)
- Other key deps pinned: next-intl, next-themes, payload
- pnpm config reviewed (shamefully-hoist=false, legacy-peer-deps=true)

⏳ **Requires Windows PowerShell Testing**:
- pnpm script-shell configuration check
- Next.js wrapper files inspection
- Direct CLI test (most revealing)

---

## How to Unblock (Windows PowerShell Only)

### You Must Run This

Open PowerShell in the captain-maid directory and execute the diagnostic steps in `/DIAGNOSTICS.md`:

```powershell
cd "C:\path\to\captain-maid"

# Test 1: Check script-shell config
pnpm config get script-shell

# Test 3: Direct CLI test (CRITICAL)
node ".\node_modules\next\dist\bin\next.js" dev

# Test 4: Lock versions (DONE — no action needed)
pnpm install  # Install after React version pinning

# Final test
pnpm dev  # Should show "started server on localhost:3000"
```

---

## Decision Tree for Fixes

Based on Test 3 output, apply one of:

| Test 3 Result | Root Cause | Fix |
|---|---|---|
| Works cleanly | Wrapper broken | `pnpm install` (clean node_modules) |
| Spawns cmd.exe + script-shell=cmd.exe | pnpm config | `pnpm config delete script-shell --location=local` |
| Spawns cmd.exe + script-shell undefined | Wrapper corruption | `rm -r node_modules && pnpm install` |
| Still fails after reset | Next startup issue | Update .env.local, check Next.js flags |

---

## What's Already Done

✅ Package.json: React versions locked
✅ .npmrc: Already optimized (shamefully-hoist=false)
✅ pnpm-workspace.yaml: Configured for esbuild/sharp/unrs-resolver

**Next.js**: 14.2.4 (latest stable, pre-15)
**Next-intl**: 3.15.2 (pinned)
**Payload CMS**: 3.86.0 (pinned)

---

## Phase 3 Deployment Readiness

| Item | Status | Notes |
|---|---|---|
| Code | ✅ Ready | All components built, auth integrated |
| Dependencies | ⏳ Depends on fix | React pinned; waiting for `pnpm dev` fix |
| Build | ? | Unknown until dev server works |
| Deploy | ⏸️ Blocked | Can't test locally without dev server |

---

## Next Steps (After Windows Testing)

1. **Run diagnostics** (Test 1-3 above)
2. **Apply fix** based on decision tree
3. **Test**: `pnpm dev` → verify localhost:3000 works
4. **Report findings** with output from Tests 1, 2, 3
5. **Deploy**: Once dev server confirmed working

---

## Files for Reference

- `/DIAGNOSTICS.md` — Step-by-step diagnostic guide
- `package.json` — React versions now locked (line 30-31)
- `.npmrc` — pnpm config (unchanged, already optimized)
- `pnpm-workspace.yaml` — Workspace config

---

## Contact

This blocker must be resolved on Windows PowerShell. If you're on WSL2/Linux, you'll need access to a Windows machine to run the diagnostics.

**Estimated resolution time**: 15 minutes (diagnostics + fix)

