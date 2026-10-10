import { test, expect } from '@playwright/test'

test('Process icons and team portraits reveal on scroll and preserve the team composition', async ({
  page,
}) => {
  await page.goto('/')
  const team = page.locator('.team-grid')
  await expect(team).toHaveClass(/motion-ready/)
  await expect(team).not.toHaveClass(/motion-arrived/)
  await expect(team.locator('.portrait').first()).toHaveCSS('opacity', '0')
  const process = page.locator('.process-grid')
  await process.locator('li').first().scrollIntoViewIfNeeded()
  await expect(process).toHaveClass(/motion-arrived/)
  await expect(process.locator('.process-icon svg').first()).toHaveCSS(
    'animation-name',
    'process-icon-draw'
  )
  await expect(process.locator('.process-icon').first()).toHaveCSS(
    'animation-duration',
    '1.4s'
  )
  await team.locator('.team-card').first().scrollIntoViewIfNeeded()
  await expect(team).toHaveClass(/motion-arrived/)
  await expect(team.locator('.portrait').first()).toHaveCSS(
    'animation-name',
    'team-portrait-connect'
  )
  await expect(team.locator('.portrait').first()).toHaveCSS(
    'animation-duration',
    '1.6s'
  )
  await team.locator('.team-card').last().scrollIntoViewIfNeeded()
  await expect(team.locator('.portrait').last()).toHaveCSS('opacity', '1')
  await expect(team.locator('.team-card')).toHaveCount(4)
  expect(
    await team
      .locator('.team-card')
      .nth(1)
      .evaluate((node) =>
        getComputedStyle(node).getPropertyValue('--portrait-zoom').trim()
      )
  ).toBe('1.14')
  expect(
    await team.evaluate((node) => getComputedStyle(node, '::before').clipPath)
  ).toContain('polygon')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(team.locator('.portrait').first()).toHaveCSS(
    'animation-name',
    'none'
  )
  await expect(process.locator('.process-icon svg').first()).toHaveCSS(
    'animation-name',
    'none'
  )
  await expect(team.locator('.portrait').first()).toHaveCSS('opacity', '1')
})

test('Reducing motion before scrolling keeps unrevealed portraits and icons visible', async ({
  page,
}) => {
  await page.goto('/')
  const portrait = page.locator('.team-grid .portrait').first()
  await expect(portrait).toHaveCSS('opacity', '0')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(portrait).toHaveCSS('opacity', '1')
  await expect(page.locator('.process-grid .process-icon').first()).toHaveCSS(
    'opacity',
    '1'
  )
})
