import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { siteRoutes } from '../src/config/seo'

for (const language of ['fa', 'ps'] as const) {
  const htmlLanguage = language === 'fa' ? 'fa-AF' : 'ps'
  test(`${language}: every route translates and follows RTL without hydration or overflow errors`, async ({
    page,
  }) => {
    test.setTimeout(180000)
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.addInitScript(
      (lng) => localStorage.setItem('language', lng),
      language
    )
    for (const route of siteRoutes) {
      await page.goto(route)
      await expect(page.locator('html')).toHaveAttribute('lang', htmlLanguage)
      await expect(page.locator('main')).toHaveAttribute('dir', 'rtl')
      await expect(page.locator('h1')).toHaveCount(1)
      const title = await page.locator('h1').innerText()
      expect(title).toMatch(
        /[\u0600-\u06ff]|BazarAF|Sahil GPS|Rayan Cargo|Al Makkha/
      )
      const mainDirection = await page
        .locator('main')
        .evaluate((node) => getComputedStyle(node).direction)
      const footerDirection = await page
        .locator('footer')
        .evaluate((node) => getComputedStyle(node).direction)
      expect(mainDirection).toBe('rtl')
      expect(footerDirection).toBe('rtl')
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1
        ),
        route
      ).toBe(true)
      if (route.startsWith('/portfolio/'))
        await expect(page.locator('.case-sidebar')).not.toContainText(
          'Project type'
        )
    }
    expect(errors).toEqual([])
  })

  test(`${language}: translated filters, stable inquiry values, language switching, and RTL keyboard controls work`, async ({
    page,
  }) => {
    test.setTimeout(90000)
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    const selector = page.locator('.language-switcher select')
    if (!(await selector.isVisible()))
      await page.locator('.menu-toggle').click()
    await selector.selectOption(language)
    await expect(page.locator('html')).toHaveAttribute('lang', htmlLanguage)
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', htmlLanguage)
    await page.locator('.home-brief-links a').first().focus()
    await page.keyboard.press('Tab')
    await expect(page.locator('.home-brief-links a').nth(1)).toBeFocused()

    await page.goto('/portfolio')
    await expect(page.locator('main')).toHaveAttribute('dir', 'rtl')
    await page
      .locator('.portfolio-controls select')
      .first()
      .selectOption('Education')
    await expect(page).toHaveURL(/industry=Education/)
    await expect(page.locator('.project-card')).toHaveCount(2)
    await page
      .locator('.search-field input')
      .fill(language === 'fa' ? 'مکتب' : 'ښوونځي')
    await expect(page.locator('.project-card')).toHaveCount(1)
    await expect(page.locator('.project-card h3')).toContainText(
      language === 'fa' ? 'مکتب' : 'ښوونځي'
    )

    await page.goto(
      '/contact?type=Custom%20software%20development&industry=Education'
    )
    await expect(page.locator('main')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('#type')).toHaveValue(
      'Custom software development'
    )
    await page.locator('#name').fill('Test Visitor')
    await page.locator('#email').fill('visitor@example.com')
    await page
      .locator('#description')
      .fill('A school system with clear reporting and student administration.')
    expect(
      await page
        .locator('#email')
        .evaluate((node) => getComputedStyle(node).direction)
    ).toBe('ltr')
    if (!(await selector.isVisible()))
      await page.locator('.menu-toggle').click()
    await selector.selectOption(language === 'fa' ? 'ps' : 'fa')
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      language === 'fa' ? 'ps' : 'fa-AF'
    )
    await expect(page.locator('#name')).toHaveValue('Test Visitor')
    await expect(page.locator('#type')).toHaveValue(
      'Custom software development'
    )
    let submitted: Record<string, string> | undefined
    await page.route('**/api/inquiry', async (route) => {
      submitted = route.request().postDataJSON()
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"success":true}',
      })
    })
    await page.locator('button[type=submit]').click()
    await expect(page.locator('.inquiry-result')).toBeVisible()
    expect(submitted?.method).toBe('Email')
    expect(submitted?.industry).toBe('Education')
    expect(submitted?.type).toBe('Custom software development')
    await expect(page.locator('.inquiry-result h2')).not.toContainText(
      'Your project inquiry'
    )

    if (!(await selector.isVisible()))
      await page.locator('.menu-toggle').click()
    await selector.selectOption('en')
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
    await expect(page.locator('main')).toHaveAttribute('lang', 'en')
    await expect(page.locator('.inquiry-result h2')).toHaveText(
      'Your project inquiry has been sent.'
    )
    expect(errors).toEqual([])
  })

  test(`${language}: translated pages and galleries pass accessibility checks`, async ({
    page,
  }) => {
    test.setTimeout(90000)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.addInitScript(
      (lng) => localStorage.setItem('language', lng),
      language
    )
    for (const route of [
      '/',
      '/services',
      '/portfolio',
      '/contact',
      '/about',
      '/portfolio/school-management-system',
    ]) {
      await page.goto(route)
      await expect(page.locator('html')).toHaveAttribute('lang', htmlLanguage)
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
      expect(results.violations, route).toEqual([])
    }
    await expect(page.locator('.gallery-grid figure')).toHaveCount(7)
    const first = page.locator('.gallery-image-button').first()
    await expect(first).toBeEnabled()
    await first.click()
    const dialog = page.locator('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('.lightbox-bar')).not.toContainText(
      'company-supplied screenshot'
    )
    await page.keyboard.press('ArrowLeft')
    await expect(dialog.locator('.lightbox-controls span')).toHaveText('2 / 7')
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })
}
