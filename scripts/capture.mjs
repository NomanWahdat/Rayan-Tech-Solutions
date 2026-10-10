import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
await mkdir('.qa', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
async function loadPortraits() {
  await page
    .locator('.team-card')
    .last()
    .scrollIntoViewIfNeeded()
    .catch(() => {})
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.team-card img')].every(
      (img) => img.complete
    )
  )
  await page.evaluate(() => window.scrollTo(0, 0))
}
for (const [name, path] of [
  ['home', '/'],
  ['portfolio', '/portfolio'],
  ['services', '/services'],
  ['solutions', '/solutions'],
  ['industries', '/industries'],
  ['technologies', '/technologies'],
  ['products', '/products'],
  ['team', '/about#team'],
  ['contact', '/contact'],
  ['case-study', '/portfolio/bazaaraf'],
]) {
  await page.goto('http://127.0.0.1:4173' + path)
  await page.waitForLoadState('networkidle')
  if (name === 'home') {
    await page.screenshot({ path: '.qa/hero-desktop.png' })
    await page
      .locator('.delivery-journey')
      .screenshot({ path: '.qa/delivery-desktop.png' })
    await loadPortraits()
  }
  await page.screenshot({
    path: '.qa/' + name + '-desktop.png',
    fullPage: name !== 'team',
  })
  if (name !== 'team')
    await page.screenshot({ path: '.qa/' + name + '-desktop-viewport.png' })
}
await page.setViewportSize({ width: 390, height: 844 })
for (const [name, path] of [
  ['home', '/'],
  ['portfolio', '/portfolio'],
  ['services', '/services'],
  ['solutions', '/solutions'],
  ['industries', '/industries'],
  ['technologies', '/technologies'],
  ['products', '/products'],
  ['team', '/about#team'],
  ['contact', '/contact'],
  ['case-study', '/portfolio/bazaaraf'],
]) {
  await page.goto('http://127.0.0.1:4173' + path)
  await page.waitForLoadState('networkidle')
  if (name === 'home') {
    await page.screenshot({ path: '.qa/hero-mobile.png' })
    await page
      .locator('.delivery-journey')
      .screenshot({ path: '.qa/delivery-mobile.png' })
    await loadPortraits()
  }
  await page.screenshot({ path: '.qa/' + name + '-mobile.png', fullPage: true })
  await page.screenshot({ path: '.qa/' + name + '-mobile-viewport.png' })
}
for (const width of [320, 768, 1024]) {
  await page.setViewportSize({ width, height: 900 })
  for (const path of [
    '/',
    '/services',
    '/solutions',
    '/industries',
    '/technologies',
    '/products',
    '/about',
    '/portfolio',
    '/contact',
    '/portfolio/school-management-system',
  ]) {
    await page.goto('http://127.0.0.1:4173' + path)
    await page.waitForLoadState('networkidle')
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1
      )
    )
      throw new Error('Horizontal overflow at ' + width + 'px on ' + path)
  }
}
await browser.close()
console.log(
  'Desktop and mobile screenshots saved in .qa. Additional 320px, 768px, and 1024px layout checks passed.'
)
