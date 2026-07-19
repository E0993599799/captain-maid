import { test, expect } from '@playwright/test'
import path from 'node:path'

/**
 * Multi-viewport screenshot sweep + no-horizontal-overflow assertion.
 *
 * Runs on Chromium only — the screenshot artifacts are a visual record of
 * layout at each breakpoint, not a cross-engine rendering diff, so running
 * it twice (once per browser project) would just double the runtime and
 * produce duplicate files under the same names. Cross-engine behavior is
 * instead covered by tests/keyboard-nav.spec.ts, which runs on both
 * chromium and webkit projects.
 */
test.skip(({ browserName }) => browserName !== 'chromium', 'screenshot sweep runs once, on chromium')

const WIDTHS = [320, 375, 768, 1024, 1440, 1920] as const
const HEIGHT = 1000 // viewport height; full-page screenshots capture beyond this

const PAGES: { path: string; slug: string }[] = [
  { path: '/', slug: 'home' },
  { path: '/products/floor-cleaner-lavender-kerry', slug: 'product' },
  { path: '/faq', slug: 'faq' },
]

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'proofs', 'screenshots')

for (const { path: pagePath, slug } of PAGES) {
  for (const width of WIDTHS) {
    test(`${slug} @ ${width}w — screenshot + no horizontal overflow`, async ({ page }) => {
      // The home page uses an IntersectionObserver-driven scroll-reveal
      // (components/Reveal.tsx) that only shows sections once scrolled into
      // view. It explicitly short-circuits to "immediately visible" under
      // prefers-reduced-motion, so emulate that here — it's the documented,
      // deterministic way to capture the final revealed state in a full-page
      // screenshot without depending on Playwright's internal scroll timing
      // during capture.
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.setViewportSize({ width, height: HEIGHT })
      await page.goto(pagePath, { waitUntil: 'networkidle' })
      await page.waitForTimeout(300)

      const overflowCheck = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))

      const screenshotPath = path.join(SCREENSHOTS_DIR, `${slug}-${width}w.png`)
      await page.screenshot({ path: screenshotPath, fullPage: true })

      expect(
        overflowCheck.scrollWidth,
        `horizontal overflow at ${width}px on ${pagePath}: scrollWidth=${overflowCheck.scrollWidth} > viewport=${width}`
      ).toBeLessThanOrEqual(width)
    })
  }
}
