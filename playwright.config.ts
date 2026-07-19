import { defineConfig, devices } from '@playwright/test'

/**
 * Verification/proof pipeline config for Captain Maid.
 * Builds the production app and serves it on :3000, then runs:
 *  - a multi-viewport screenshot + no-horizontal-overflow sweep (tests/screenshots.spec.ts)
 *  - a keyboard-navigation/accessibility sweep for the Radix header (tests/keyboard-nav.spec.ts)
 *
 * Chromium + WebKit only (WebKit-via-Playwright is the closest available proxy to
 * Safari/Mobile Safari here — there is no real Safari/iOS available in this environment).
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { outputFolder: 'proofs/playwright-report', open: 'never' }]],
  timeout: 60_000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
