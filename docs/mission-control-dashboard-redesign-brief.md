# Mission Control Dashboard Redesign Brief

**Date**: 2026-07-12  
**Prepared for**: Luxi Junior Oracle (UI/UX Designer)  
**From**: UX Audit (2026-06-01) + Codex Architecture  
**Status**: 🎯 Ready for Implementation  

---

## Goal

Redesign Mission Control dashboard from a cyber-heavy, mobile-unfriendly interface into a **responsive, accessible, high-performance dashboard** that scales from 360px phones to 4K displays. Focus on usability, clarity, and graceful degradation.

---

## Reference Analysis

**Audit Source**: `/mission-control/ψ/knowledge/ui-ux/MISSION-CONTROL-UX-AUDIT-2026-06-01.md`

### Current State Scorecard

| Category | Status | Severity |
|----------|--------|----------|
| **Mobile Responsive** | ❌ Critical Issues | 🔴 P0 |
| **Navigation** | ⚠️ Bottom bar overflow | 🔴 P0 |
| **Theme System** | ❌ Broken (hardcoded) | 🔴 P0 |
| **Accessibility** | ⚠️ Multiple issues | 🟡 P1 |
| **Error Handling** | ⚠️ Silent failures | 🟡 P1 |
| **UX Consistency** | ⚠️ Broken links | 🟡 P1 |
| **Performance** | ✅ Good baseline | — |

---

## Vision: "Clarity Above All"

**Principle**: Remove cyber-drama, add clarity. A dashboard should:
- 🎯 Show what matters immediately
- 📱 Work equally on phone and desktop
- ♿ Be accessible to all users
- ⚡ Never crash silently
- 🎨 Maintain visual consistency

---

## Critical Issues to Fix (P0)

### 1. Mobile Bottom Bar Overflow
**Problem**: 9 nav items in 375px = 37px width (< 44px minimum touch target)
**Current Location**: `nav-rail.tsx:22–43`
**Impact**: Users can't tap nav items reliably on mobile

**Redesign Solution**:
```
DESKTOP (≥768px):
┌─────────────────────────────────────────┐
│  Sidebar (fixed, 280px)                 │
│  ┌──────────────────────────────────┐   │
│  │ 📊 Overview                      │   │
│  │ 🎮 Control Center                │   │
│  │ 📋 Tasks                         │   │
│  │ 💾 HQ                            │   │
│  │ 📜 Logs                          │   │
│  │ 🤖 Agents                        │   │
│  │ ⚙️  Settings                      │   │
│  │ ➕ More...                       │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘

TABLET (481px–767px):
┌───────────────┐
│ Collapse icon │ (sidebar minimized, icons only)
│ 📊 │ 🎮 │ 📋 │ 💾 │ 📜 │ 🤖 │ ⚙️ │ ➕ │ (8 items = ~60px each ✓)
└───────────────┘

MOBILE (≤480px):
┌─────────────────────────────────┐
│ ≡  Mission Control    🔔 ⚙️     │ (header)
│ [Main content area]             │
│ ───────────────────────────────│
│ 📊  🎮  📋  💾  [More ⋮]        │ (bottom: 5 items max)
└─────────────────────────────────┘
```

**Detailed Changes**:
- Desktop: Collapse sidebar at `md:` breakpoint (768px) to icons
- Tablet: Show 8 items in horizontal scroll (not stacked)
- Mobile: Core 4 items (Overview, Control, Tasks, Logs) + More button
- All touch targets ≥ 44×44px
- More button opens `<MobileBottomSheet>` with overflow items

---

### 2. Broken Theme Toggle
**Problem**: `digitalMode` hardcoded to `true` everywhere. ThemeToggle button is a ghost.
**Current Locations**:
- `header-bar.tsx:30` → `const digitalMode = true`
- `nav-rail.tsx:49` → `const integrationMode = true`
- `page.tsx:220` → `const digitalMode = true`

**Impact**: Dark mode toggle doesn't work; app stuck in cyber/dark theme

**Redesign Solution**:

```typescript
// 1. Create theme hook (new file)
// src/lib/hooks/useTheme.ts
export const useTheme = () => {
  const theme = useMissionControl((s) => s.theme) // 'light' | 'dark'
  const setTheme = useMissionControl((s) => s.setTheme)
  
  useEffect(() => {
    const htmlEl = document.documentElement
    if (theme === 'dark') {
      htmlEl.classList.add('dark')
    } else {
      htmlEl.classList.remove('dark')
    }
  }, [theme])
  
  return { theme, setTheme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}

// 2. Update all hardcoded references
// Before:
// const digitalMode = true

// After:
// const { theme } = useTheme()
// const isDarkMode = theme === 'dark'
```

**Files to Update**:
- `header-bar.tsx:30` — use hook
- `nav-rail.tsx:49` — use hook
- `page.tsx:220` — use hook
- Add theme persistence to Zustand store
- Add system theme detection (prefers-color-scheme)

---

### 3. Navigation Links to Non-Existent Tabs
**Problem**: Quick Actions link to `spawn`, `memory`, `orchestration` tabs that don't exist
**Current Location**: `dashboard.tsx:379–383` + `page.tsx:280–323`
**Impact**: Clicking Quick Actions loads HQ Overview silently (user confused)

**Redesign Solution**:

Option A: **Add Missing Tabs** (Future roadmap)
```typescript
// page.tsx - ContentRouter
case 'spawn':
  return <SpawnAgentPanel />
case 'memory':
  return <MemoryPanel />
case 'orchestration':
  return <OrchestrationPanel />
```

Option B: **Remove Non-Existent Quick Actions** (Immediate)
```typescript
// dashboard.tsx - only show available tabs
const QUICK_ACTIONS = [
  { label: 'Overview', tab: 'hq', icon: '📊' },
  { label: 'Control Center', tab: 'control', icon: '🎮' },
  { label: 'Tasks', tab: 'tasks', icon: '📋' },
  { label: 'Logs', tab: 'logs', icon: '📜' },
]
```

**Recommendation**: **Option B now** (P0) → **Option A in Phase 2** (roadmap documented)

---

## High Priority Issues (P1)

### 4. Silent API Failures
**Problem**: Dashboard `loadDashboard()` fails silently on 60s polling. Users see stale data without knowing.
**Current Location**: `dashboard.tsx:35–65`
**Impact**: Users make decisions on outdated information

**Redesign Solution**:
```typescript
// Add visual indicators
const [dataFreshness, setDataFreshness] = useState<'fresh' | 'stale' | 'error'>('fresh')

const loadDashboard = async () => {
  try {
    setDataFreshness('fresh')
    const data = await Promise.all([...])
    // success
  } catch (err) {
    setDataFreshness('error')
    showErrorBanner('Failed to load dashboard. Showing last known data.')
  }
}

// Render indicator
<header className="flex items-center justify-between">
  <h1>Dashboard</h1>
  {dataFreshness === 'stale' && (
    <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
      📡 Data from {formatTime(lastUpdate)} ago
    </span>
  )}
  {dataFreshness === 'error' && (
    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
      ⚠️ Connection failed • Showing cached data
    </span>
  )}
</header>
```

---

### 5. Accessibility Gaps
**Problems**:
- SVG icons missing `aria-hidden="true"`
- Search input missing `aria-label`
- Search results not keyboard-navigable (no up/down arrow support)
- Notification badge doesn't announce unread count
- Mobile bottom bar missing `aria-current="page"`

**Redesign Solution** (Systemic Fix):

**5a. Icon System**
```typescript
// Create reusable IconButton component
interface IconButtonProps {
  icon: React.ReactNode
  label: string // Always require label
  ariaHidden?: boolean // For decorative icons only
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, label, ariaHidden = false }) => (
  <button 
    title={label}
    aria-label={label}
    aria-hidden={ariaHidden}
  >
    {icon}
  </button>
)

// Use everywhere:
<IconButton icon={<SaveIcon />} label="Save changes" />
```

**5b. Search Component**
```typescript
<div role="search">
  <label htmlFor="search-input" className="sr-only">
    Search tasks, agents, and activity
  </label>
  <input 
    id="search-input"
    type="text"
    placeholder="Search..."
    role="combobox"
    aria-expanded={isOpen}
    aria-autocomplete="list"
    aria-controls="search-results"
    onKeyDown={handleSearchKeys} // up/down arrow support
  />
  <ul id="search-results" role="listbox" aria-label="Search results">
    {results.map((result, idx) => (
      <li
        key={idx}
        role="option"
        aria-selected={selectedIdx === idx}
        onClick={() => selectResult(result)}
      >
        {result.label}
      </li>
    ))}
  </ul>
</div>
```

**5c. Notification Badge**
```typescript
const unreadCount = notifications.filter(n => !n.read).length

<button
  className="relative"
  title={`${unreadCount} unread notifications`}
  aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : '(no unread)'}`}
>
  🔔
  {unreadCount > 0 && (
    <span 
      className="absolute top-0 right-0 text-xs"
      aria-hidden="true" // Visual only
    >
      {unreadCount}
    </span>
  )}
</button>
```

---

## Medium Priority Issues (P2)

### 6. Panel Error Messages (Developer-Facing)
**Problem**: Error says "Check the browser console" — users don't have browsers consoles
**Current Location**: `page.tsx:38–39`

**Solution**:
```typescript
// Before:
// "Check the browser console for the import error, then retry."

// After:
// "This panel failed to load. Please refresh the page. If the problem persists, contact support."
```

---

### 7. Production Debug Logs
**Problem**: `console.info()` fires on every ControlCenter tab render
**Current Locations**: `page.tsx:129, 131, 368`

**Solution**: Remove all debug logs before production

---

### 8. Redundant Store Calls
**Problem**: `useMissionControl.getState()` called in onClick when hook already imported
**Current Location**: `header-bar.tsx:255–257`

**Solution**: Use destructured value instead of `.getState()` call

---

## New Architecture: Section-Based Redesign

Apply **Codex section-based pattern** to Mission Control (learned from Captain Maid redesign):

### Dashboard Composition

```
DashboardPage.tsx (Composer)
├── useTheme() hook
├── useMissionControl() store
└── render ordered sections:

    1. StatusBar
       ├── Alert indicators (connection, errors)
       └── Refresh status

    2. QuickStats
       ├── 4 stat cards (agents active, tasks queued, errors today, uptime)
       └── Skeleton loading states

    3. Panels (TabRouter)
       ├── Overview (default)
       ├── Control Center
       ├── Tasks
       ├── HQ
       ├── Logs
       ├── Agents
       └── Settings

    4. Footer
       └── Version, docs link, support
```

### Component Structure (New)

```
components/
├── layout/
│   ├── DashboardLayout.tsx      (header + sidebar/nav + main area)
│   ├── Header.tsx               (logo, search, theme toggle, notifications)
│   ├── Sidebar.tsx              (desktop nav, collapses to icons on tablet)
│   ├── BottomNav.tsx            (mobile-only, 5 core items + More sheet)
│   └── Footer.tsx
│
├── sections/
│   ├── StatusSection.tsx        (connection, errors, last sync)
│   ├── QuickStatsSection.tsx   (4 main metrics)
│   ├── PanelsSection.tsx       (tab router, dynamic imports)
│   └── ErrorBoundarySection.tsx (fallback with retry)
│
├── common/
│   ├── IconButton.tsx           (accessible icon buttons)
│   ├── SearchInput.tsx          (keyboard-navigable)
│   ├── Notification.tsx         (toast + announcement)
│   ├── SkeletonLoader.tsx       (mobile-optimized)
│   └── ThemeToggle.tsx          (functional dark/light)
│
└── panels/
    ├── OverviewPanel.tsx
    ├── ControlCenterPanel.tsx
    ├── TasksPanel.tsx
    ├── HQPanel.tsx
    ├── LogsPanel.tsx
    ├── AgentsPanel.tsx
    └── SettingsPanel.tsx
```

---

## Responsive Breakpoints (Mobile-First)

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| **Mobile** | <480px | Bottom nav (5 items), full-width panels |
| **Tablet** | 481–767px | Sidebar icons only, horizontal scroll nav |
| **Desktop** | 768–1200px | Sidebar visible, 2-column panels |
| **Wide** | >1200px | Sidebar + extended panels, multi-column |

**Key Rules**:
- No horizontal overflow at any width
- Hero content (stats, main panel) full width on mobile
- Secondary content (sidebars, modals) below/overlaid on <768px
- All touch targets ≥ 44×44px
- Font sizes ≥ 16px on mobile (no zoom required)

---

## Performance Targets

| Metric | Target | Why |
|--------|--------|-----|
| **LCP** | <3s | Complex dashboard with real-time data |
| **FID** | <100ms | Responsive tab switching + search |
| **CLS** | <0.1 | No layout shift on data updates |
| **Lighthouse** | >85 | Accessible, performant dashboard |
| **Bundle Size** | <600KB | Lots of panels + dependencies |

**Optimizations**:
- Dynamic imports for each panel (lazy-load)
- Skeleton screens for initial load
- Request deduplication (60s polling)
- Memoized components (useMemo for heavy renders)
- Image optimization (SVG icons, no PNG screenshots)

---

## Acceptance Criteria

### ✅ By End of Phase 1 (UI/UX Redesign)

**Mobile (360–480px)**:
- [ ] Bottom nav shows 5 core items (44×44px minimum)
- [ ] More button opens sheet with overflow items
- [ ] No horizontal scroll at any width
- [ ] Hero content (stats) readable at 360px
- [ ] Touch targets all ≥ 44×44px
- [ ] Tested on real mobile device (iPhone 12 or equivalent)

**Tablet/Desktop (481px+)**:
- [ ] Sidebar collapses to icons at tablet width
- [ ] Theme toggle works (light/dark mode)
- [ ] All broken Quick Action links removed or fixed
- [ ] Error states show user-friendly messages
- [ ] Loading states have skeleton screens
- [ ] Search keyboard-navigable (up/down arrows)

**Accessibility**:
- [ ] All SVG icons have `aria-hidden="true"` OR proper `aria-label`
- [ ] All inputs have `<label>` or `aria-label`
- [ ] Navigation has `aria-current="page"` on active tab
- [ ] Notifications announce unread count via `aria-label`
- [ ] Search results role="listbox" + role="option"
- [ ] Tab order logical (tabindex not needed)
- [ ] Tested with keyboard navigation (no mouse)
- [ ] Tested with screen reader (macOS VoiceOver or NVDA)

**Code Quality**:
- [ ] No debug console.log statements in production paths
- [ ] All hardcoded `digitalMode`/`integrationMode` replaced with hooks
- [ ] Error messages are user-friendly (no "check console")
- [ ] Zustand store exports theme setters
- [ ] Theme persistence (localStorage or app state)
- [ ] No redundant `.getState()` calls
- [ ] TypeScript strict mode passes
- [ ] ESLint 0 errors

**Performance**:
- [ ] LCP <3s on 4G throttle
- [ ] Lighthouse >85 (mobile + desktop)
- [ ] No layout shift on data refresh
- [ ] Search results appear <200ms

---

## File-by-File Changes

### 🔴 Priority 1 (This Phase)

| File | Changes | Effort |
|------|---------|--------|
| `nav-rail.tsx` | Responsive redesign (sidebar → icons → bottom nav) | L |
| `header-bar.tsx` | Add theme hook, fix search, update icons | M |
| `dashboard.tsx` | Remove non-existent Quick Actions, add error state | M |
| `page.tsx` | Remove debug logs, use theme hook, update error messages | S |
| `lib/hooks/useTheme.ts` | **NEW** — Create theme management hook | S |
| `components/common/IconButton.tsx` | **NEW** — Accessible icon button component | S |
| `components/common/SearchInput.tsx` | **NEW** — Keyboard-navigable search | M |
| `ErrorBoundary.tsx` | Update error messages, improve a11y | S |

### 🟡 Priority 2 (Post-Phase 1)

- Refactor panels into section-based architecture
- Add data freshness indicators
- Implement notification badge a11y
- Add mobile bottom sheet for overflow nav items

---

## Deliverables (Luxi)

**React/TypeScript Components**:
1. ✅ Responsive `nav-rail.tsx` with mobile/tablet/desktop variants
2. ✅ Functional `ThemeToggle` using `useTheme()` hook
3. ✅ Accessible `SearchInput` with keyboard navigation
4. ✅ `IconButton` component with proper a11y
5. ✅ Updated `Dashboard` without broken links
6. ✅ Refactored `page.tsx` (clean, no hardcoded values)
7. ✅ Updated `ErrorBoundary.tsx` (user-friendly errors)
8. ✅ All responsive designs tested on:
   - iPhone 12 (360px viewport)
   - iPad (768px viewport)
   - Desktop (1920px viewport)

**Documentation**:
- ✅ Component prop interfaces documented
- ✅ Responsive breakpoint strategy documented
- ✅ Accessibility checklist with test results
- ✅ Performance profiling report (LCP, CLS, etc.)

---

## Testing Strategy

### Manual Testing (Required Before Commit)

**Responsive Testing**:
- [ ] iPhone 12 Mini (360px) — tap all nav items
- [ ] iPad Air (768px) — sidebar collapse/expand
- [ ] MacBook (1920px) — full layout
- [ ] Use real devices (not just DevTools simulator)

**Keyboard Navigation**:
- [ ] Tab through all interactive elements
- [ ] Shift+Tab to reverse
- [ ] Enter/Space to activate
- [ ] Arrow keys in search results
- [ ] Escape to close modals

**Screen Reader Testing** (macOS VoiceOver):
- [ ] Read page structure (headings, landmarks)
- [ ] Navigate search results
- [ ] Announce notification count
- [ ] Read tab labels

**Theme Testing**:
- [ ] Click theme toggle
- [ ] Verify DOM class changes (dark/light)
- [ ] Verify persists on reload
- [ ] Verify system preference respected initially

### Automated Tests (if time permits)

```typescript
describe('nav-rail responsive', () => {
  it('shows bottom nav on mobile', () => {
    render(<NavRail />)
    expect(screen.queryByRole('navigation')).not.toBeVisible() // sidebar hidden
    expect(screen.getByTestId('bottom-nav')).toBeVisible()
  })
  
  it('shows sidebar icons on tablet', () => {
    // render at 768px
    expect(screen.getByTestId('sidebar-icons')).toBeVisible()
  })
})

describe('theme toggle', () => {
  it('updates theme on click', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})

describe('search accessibility', () => {
  it('navigates results with arrow keys', () => {
    render(<SearchInput />)
    userEvent.keyboard('{ArrowDown}') // first result selected
    userEvent.keyboard('{ArrowUp}') // previous result
    userEvent.keyboard('{Enter}') // activate
  })
})
```

---

## Implementation Order (Staged)

### Day 1: Foundation
1. Create `useTheme()` hook + Zustand integration
2. Create `IconButton` + `SearchInput` components
3. Update `ThemeToggle` to use hook

### Day 2: Mobile/Responsive
1. Redesign `nav-rail.tsx` (bottom nav on mobile)
2. Test on real mobile device
3. Update sidebar collapse logic

### Day 3: Accessibility + Polish
1. Add `aria-hidden` to SVG icons
2. Update search with keyboard navigation
3. Improve error messages
4. Remove debug logs

### Day 4: Integration + Testing
1. Merge all changes
2. Full responsive testing (360px, 768px, 1920px)
3. Keyboard + screen reader testing
4. Performance audit

---

## Success Definition

✅ **Mission Control Dashboard is production-ready when:**

1. **Mobile users can navigate easily** (no 37px touch targets)
2. **Theme toggle works as expected** (dark/light mode functional)
3. **Broken Quick Actions are fixed** (removed or linked to real tabs)
4. **Errors are user-friendly** (no "check console" messages)
5. **Accessibility is WCAG AA minimum** (keyboard nav, screen readers)
6. **Performance is maintained** (LCP <3s, Lighthouse >85)
7. **Tested on real devices** (not just DevTools)
8. **Code is clean and documented** (no debug logs, clear intent)

---

## Reference: Codex Principles (From Captain Maid)

These design principles from the Codex redesign should apply here too:

1. **Nothing is Deleted** — Archive old nav layouts for A/B testing
2. **Patterns Over Intentions** — Watch how users navigate; adjust accordingly
3. **External Brain, Not Command** — Show options, let humans decide (light vs. dark mode)
4. **Curiosity Creates Existence** — Experiment with panel layouts
5. **Form and Formless** — Both the button (form) and space around it (formless) matter
6. **Transparency (Rule 6)** — Document all design decisions

---

## Contact & Questions

**Brief prepared by**: Codex + UX Audit findings  
**For**: Luxi Junior Oracle (UI/UX Designer)  
**Project**: Mission Control Dashboard Redesign  
**Phase**: 1 (UI/UX Implementation)  
**Timeline**: 4 days (aggressive) to 1 week (comfortable)  

**Questions?** Reference the UX Audit Report:
```
/mission-control/ψ/knowledge/ui-ux/MISSION-CONTROL-UX-AUDIT-2026-06-01.md
```

---

🛤️ **Ready to design the clarity dashboard.** (The Golden Path principle applies here too.)

*Redesign Brief • 2026-07-12 • Mission Control Project*
