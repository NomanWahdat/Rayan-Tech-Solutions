// Public, read-only inspection. No credentials are guessed and no records are changed.
import { chromium } from 'playwright'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
const source = await readFile('src/config/projects.ts', 'utf8')
const briefs = source
  .split('function createProject')[0]
  .split(/\n\s+\{\s*\n\s+slug: /)
  .slice(1)
const sites = briefs
  .map((brief) => ({
    slug: brief.match(/^'([^']+)'/)?.[1],
    url: brief.match(/sourceUrl: '([^']+)'/)?.[1],
  }))
  .filter((site) => site.slug && site.url)
await mkdir('.qa/project-inspection', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const results = []
for (let offset = 0; offset < sites.length; offset += 3) {
  const batch = await Promise.all(
    sites.slice(offset, offset + 3).map(async (site) => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        ignoreHTTPSErrors: false,
      })
      const page = await context.newPage()
      const result = { ...site, checkedAt: new Date().toISOString() }
      try {
        const response = await page.goto(site.url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })
        await page.waitForTimeout(5000)
        result.httpStatus = response?.status()
        result.finalUrl = page.url()
        result.title = await page.title()
        result.text = (await page.locator('body').innerText()).slice(0, 26000)
        result.links = await page.locator('a').evaluateAll((nodes) =>
          nodes.slice(0, 100).map((node) => ({
            text: node.textContent?.trim(),
            href: node.getAttribute('href'),
          }))
        )
        result.buttons = await page.locator('button').allTextContents()
        result.fields = await page
          .locator('input, select, textarea')
          .evaluateAll((nodes) =>
            nodes.map((node) => ({
              type: node.getAttribute('type'),
              name: node.getAttribute('name'),
              placeholder: node.getAttribute('placeholder'),
            }))
          )
        result.scripts = await page
          .locator('script[src]')
          .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('src')))
        result.screenshot = '.qa/project-inspection/' + site.slug + '.png'
        await page.screenshot({ path: result.screenshot })
        await writeFile(
          '.qa/project-inspection/' + site.slug + '.html',
          await page.content()
        )
      } catch (error) {
        result.error = error.message
      }
      await context.close()
      console.log(
        site.slug +
          ': ' +
          (result.error || result.httpStatus + ' ' + result.title)
      )
      return result
    })
  )
  results.push(...batch)
  await writeFile(
    '.qa/project-inspection/results.json',
    JSON.stringify(results, null, 2)
  )
}
await browser.close()
