import { test, expect, type Page } from '@playwright/test'

/**
 * Keyboard-navigation / accessibility verification for the Radix-based header
 * (components/Header.tsx). Runs on both chromium and webkit projects — webkit
 * here is Playwright's WebKit engine, the closest available proxy to Safari/
 * Mobile Safari in this environment. There is no real Safari or iOS device
 * available, so this is NOT a substitute for real Safari/VoiceOver testing.
 */

async function tabUntilFocused(page: Page, matchText: string, maxTabs = 20) {
  for (let i = 0; i < maxTabs; i++) {
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => {
      const el = document.activeElement
      return el ? (el.textContent || '').trim() : ''
    })
    if (focused === matchText) return true
  }
  return false
}

async function getFocusedOutline(page: Page) {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null
    if (!el) return null
    const style = window.getComputedStyle(el)
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, tag: el.tagName, text: (el.textContent || '').trim() }
  })
}

test.describe('Desktop header — Products dropdown keyboard nav @ 1440px', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('tab to Products trigger, open with Enter, arrow between items, escape closes', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const found = await tabUntilFocused(page, 'Products')
    expect(found, 'Tab key should be able to reach the Products trigger').toBe(true)

    const productsTrigger = page.getByRole('button', { name: 'Products' })
    await expect(productsTrigger).toBeFocused()

    // Visible focus indicator on the trigger itself
    const triggerOutline = await getFocusedOutline(page)
    expect(triggerOutline?.outlineStyle, 'Products trigger should show a visible focus indicator').not.toBe('none')

    // Open with Enter
    await page.keyboard.press('Enter')
    await expect(productsTrigger).toHaveAttribute('aria-expanded', 'true')

    // Scope to the header's <nav aria-label="Main"> (Radix's default label for
    // NavigationMenu.Root) — "Floor Cleaner" / "Bathroom Cleaner" text also
    // appears elsewhere on the homepage (FeaturedProducts cards, footer links).
    const mainNav = page.getByLabel('Main')
    const floorLink = mainNav.getByRole('link', { name: 'Floor Cleaner', exact: true })
    const bathroomLink = mainNav.getByRole('link', { name: 'Bathroom Cleaner', exact: true })
    await expect(floorLink).toBeVisible()

    // Arrow down moves focus into the first content item
    await page.keyboard.press('ArrowDown')
    await expect(floorLink).toBeFocused()

    // Arrow down again moves to the next item
    await page.keyboard.press('ArrowDown')
    await expect(bathroomLink).toBeFocused()
    await expect(floorLink).not.toBeFocused()

    // Arrow up moves back
    await page.keyboard.press('ArrowUp')
    await expect(floorLink).toBeFocused()

    // Escape closes the dropdown and returns focus to the trigger
    await page.keyboard.press('Escape')
    await expect(productsTrigger).toBeFocused()
    await expect(productsTrigger).toHaveAttribute('aria-expanded', 'false')
    await expect(floorLink).toBeHidden()
  })

  test('Space also opens the Products trigger dropdown', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const found = await tabUntilFocused(page, 'Products')
    expect(found).toBe(true)

    const productsTrigger = page.getByRole('button', { name: 'Products' })
    await page.keyboard.press('Space')
    await expect(productsTrigger).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
  })
})

test.describe('Mobile header — hamburger menu keyboard nav @ 375px', () => {
  test.use({ viewport: { width: 375, height: 800 } })

  test('open mobile menu via trigger, escape closes and returns focus to hamburger', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const menuTrigger = page.getByRole('button', { name: /open menu/i })
    await expect(menuTrigger).toBeVisible()

    // The hamburger button has no visible text (icon only), so locate it via
    // Tab traversal checking element identity rather than textContent.
    let reachedTrigger = false
    for (let i = 0; i < 10; i++) {
      const isFocused = await menuTrigger.evaluate((el) => el === document.activeElement)
      if (isFocused) {
        reachedTrigger = true
        break
      }
      await page.keyboard.press('Tab')
    }
    if (!reachedTrigger) {
      reachedTrigger = await menuTrigger.evaluate((el) => el === document.activeElement)
    }
    expect(reachedTrigger, 'Tab key should be able to reach the mobile menu hamburger trigger').toBe(true)

    const triggerOutline = await getFocusedOutline(page)
    expect(triggerOutline?.outlineStyle, 'Hamburger trigger should show a visible focus indicator').not.toBe('none')

    await page.keyboard.press('Enter')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(menuTrigger).toBeFocused()
  })
})

test.describe('Focus indicators — header interactive elements @ 1440px', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('Home link and other top-level header links show a visible focus indicator', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    for (const name of ['Home', 'About', 'Blog', 'Contact']) {
      const link = page.getByRole('link', { name, exact: true })
      await link.focus()
      const outline = await getFocusedOutline(page)
      expect(outline?.outlineStyle, `${name} link should show a visible focus indicator`).not.toBe('none')
    }
  })
})
