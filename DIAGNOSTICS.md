# Captain Maid Phase 3: Next.js PowerShell Startup Diagnostics

**Issue**: `pnpm dev` spawns cmd.exe instead of running Next.js dev server on Windows PowerShell
**Status**: Blocker for Phase 3 deployment
**Environment**: Windows PowerShell (not WSL2/Linux)

---

## 4-Point Diagnostic Guide

Run these commands sequentially in Windows PowerShell to isolate the root cause.

### Test 1: Check pnpm script-shell config

```powershell
# Check current script-shell setting
pnpm config get script-shell

# Should return either "undefined" (unset) or a shell path
# If set to cmd.exe or bat, that's the problem
```

**If script-shell is set to cmd.exe**:
```powershell
# Reset to PowerShell
pnpm config set script-shell "C:\Program Files\PowerShell\7\pwsh.exe" --location=global

# Or unset to use default
pnpm config delete script-shell --location=global
```

---

### Test 2: Inspect Next.js wrapper files

```powershell
# Navigate to project
cd captain-maid

# Check next.cmd and next.ps1 files
Get-Item "node_modules\.bin\next.*" | Select-Object FullName

# Read the .cmd file (should call next.ps1 or next)
Get-Content "node_modules\.bin\next.cmd"

# Read the .ps1 file if it exists
if (Test-Path "node_modules\.bin\next.ps1") {
  Get-Content "node_modules\.bin\next.ps1" -Head 30
}
```

**Expected output**: Both files should exist; .cmd should properly delegate to Node.js or .ps1.
**Problem signs**: .cmd spawns cmd.exe directly, or .ps1 doesn't exist.

---

### Test 3: Direct CLI test (MOST REVEALING)

```powershell
# This is the critical test — run the Next.js CLI directly
node ".\node_modules\next\dist\bin\next.js" dev

# If this works cleanly → wrapper is broken
# If this also spawns cmd.exe → problem is in Next startup or Node config
# If port conflict → dev server ran (even if cmd issue)
```

**Expected behavior**: Dev server starts on port 3000, no cmd.exe window.

---

### Test 4: Lock React/React-DOM versions

**Current state**:
```json
"react": "^18.3.1",
"react-dom": "^18.3.1"
```

**Fixed state** (remove caret):
```json
"react": "18.3.1",
"react-dom": "18.3.1"
```

**Action**:
```powershell
# Edit package.json manually to remove the ^ caret
# Then reinstall
pnpm install

# Verify lock
pnpm list react react-dom
```

---

## Root Cause Decision Tree

```
Test 3 works cleanly
├─ YES → Wrapper is broken
│   └─ Solution: Delete node_modules, reinstall with pnpm install
│      Or: pnpm config reset (wipe local config)
│
└─ NO (spawns cmd.exe)
   └─ Direct CLI issue
      └─ Test 1: Check script-shell config
         ├─ Set to cmd.exe → pnpm config delete script-shell
         ├─ Unset → Check Test 2 (wrapper file corruption)
         │   └─ .cmd exists but .ps1 missing → reinstall node_modules
         │
         └─ Next startup issue
            └─ Lock React versions (Test 4) + rebuild
            └─ Check .env.local for conflicting Next.js flags
```

---

## Quick Fixes (Try These First)

### 1. Reset pnpm and node_modules
```powershell
cd captain-maid

# Wipe local pnpm config
pnpm config delete script-shell --location=local

# Clean install
rm -r node_modules pnpm-lock.yaml
pnpm install

# Test
pnpm dev
```

### 2. Force PowerShell as script-shell
```powershell
# For global pnpm (affects all projects)
pnpm config set script-shell "powershell" --location=global

# Or specific to this project
pnpm config set script-shell "powershell" --location=local
pnpm install
```

### 3. Upgrade pnpm
```powershell
npm install -g pnpm@latest

# Verify version
pnpm --version  # Should be 11.x or higher
```

---

## What to Report After Diagnostics

When you run these tests, capture:
1. Output of `pnpm config get script-shell`
2. Output of `Get-Item "node_modules\.bin\next.*"`
3. **Output of direct CLI test** (Test 3 — most important)
4. Error message if `pnpm dev` fails after Test 3

This will pinpoint whether it's a wrapper config issue or Next.js startup issue.

---

## Next Steps

1. Run Test 1–3 in PowerShell
2. Apply appropriate fix based on decision tree
3. Test with `pnpm dev` → should see "started server on localhost:3000"
4. If still failing: Lock React versions (Test 4) and rebuild

---

## Notes

- This issue is **Windows PowerShell specific** — doesn't manifest on WSL2/Linux
- The harness on this system is WSL2, so direct testing must be run on Windows
- React version locking (Test 4) is a safety measure for production stability

