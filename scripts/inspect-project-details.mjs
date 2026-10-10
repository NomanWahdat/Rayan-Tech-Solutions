import { chromium } from 'playwright'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
const filters = process.argv.slice(2)
const sites = JSON.parse(
  await readFile('.qa/project-inspection/results.json', 'utf8')
).filter(
  (site) =>
    site.httpStatus === 200 && (!filters.length || filters.includes(site.slug))
)
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const details = filters.length
  ? JSON.parse(
      await readFile('.qa/project-inspection/details.json', 'utf8')
    ).filter((site) => !filters.includes(site.slug))
  : []
for (const site of sites) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  })
  const page = await context.newPage()
  const result = { slug: site.slug, pages: [], bundleEvidence: [] }
  const folder = '.qa/project-inspection/' + site.slug
  await mkdir(folder, { recursive: true })
  async function record(name) {
    await page.waitForTimeout(1500)
    const text = (await page.locator('body').innerText()).slice(0, 20000)
    const file = folder + '/' + name + '.png'
    const personalDetails =
      /Eleanor Vance|Sophia Martinez|Marcus Sterling|Julian Hayes|US-SSN|MRN-2026|\+1 \(555\)|0[7]\d{8}|0[7]\d{2} \d{3} \d{3}|فرهاد|شکیل خان|عطا الله|Ahmad Khan|Farid Safi/
    await page.screenshot({
      path: file,
      mask: [page.getByText(personalDetails)],
      maskColor: '#dce5f1',
    })
    result.pages.push({ name, url: page.url(), text, screenshot: file })
    console.log(site.slug + ' / ' + name)
  }
  try {
    await page.goto(site.url, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(3000)
    for (const [index, path] of site.scripts.entries()) {
      try {
        const url = new URL(path, site.url).href
        const response = await context.request.get(url)
        if (!response.ok()) continue
        const text = await response.text()
        if (text.length > 6000000) continue
        await writeFile(folder + '/bundle-' + index + '.js', text)
        const signatures = [
          [
            'React',
            /react\.(?:production|development)|react\.element|react\.transitional\.element/,
          ],
          [
            'Next.js',
            /next\/dist|__NEXT_DATA__|next-route-announcer|next\/static/,
          ],
          ['Supabase client', /supabase-js|@supabase\/|supabase\.co/],
          ['Vite build', /vite\/modulepreload|__vite__mapDeps/],
          ['Local storage', /localStorage\.(?:getItem|setItem)/],
        ]
          .filter(([, pattern]) => pattern.test(text))
          .map(([name]) => name)
        result.bundleEvidence.push({ url, signatures })
      } catch {
        /* A failed public asset cannot establish implementation details. */
      }
    }
    if (site.slug === 'tailoring-management-system') {
      const visible = await page.locator('body').innerText()
      const email = visible.match(/Email:\s*(\S+)/)?.[1]
      const password = visible.match(/Password:\s*(\S+)/)?.[1]
      if (email && password) {
        await page.locator('input[type=email]').fill(email)
        await page.locator('input[type=password]').fill(password)
        await page.locator('button[type=submit]').click()
        await page.waitForTimeout(2000)
      }
    }
    const english = page.getByRole('button', { name: /^(English|EN)$/ }).first()
    if (await english.count()) await english.click()
    await record('hero')
    if (site.slug === 'bazaaraf') {
      await page.getByRole('button', { name: 'Login', exact: true }).click()
      await record('login')
    }
    if (site.slug === 'ai-resume-analyzer') {
      for (const [name, path] of [
        ['interview', '/interview'],
        ['job-match', '/job-match'],
        ['history', '/history'],
      ]) {
        await page.goto(site.url)
        await page.locator('a[href="' + path + '"]').click()
        await record(name)
      }
    }
    const modules =
      {
        'hospital-management-system': [
          ['patients', /^Patient EHR/],
          ['appointments', /^Appointments & Queue/],
          ['medical-records', /^General Physician OPD/],
          ['billing', /^Billing & Revenue/],
          ['inventory', /^Pharmacy & Stock/],
        ],
        'poultry-feed': [
          ['inventory', /^Raw Stock$/i],
          ['feed-records', /^Formulation$/i],
          ['sales', /^Sales$/i],
          ['reports', /^Reports$/i],
        ],
        'tailoring-management-system': [
          ['customers', /فهرست مشتریان|^Customers$/i],
          ['inventory', /موجودی رخت و تکه|^Inventory$/i],
          ['orders', /داشبورد فرمایشات|^Orders$/i],
          ['reports', /گزارش‌ها|^Reports$/i],
        ],
        'cargo-management-demo': [
          ['customer-portal', /^Customer Portal$/],
          ['branch-access', /^Branch Terminal Sign In$/],
        ],
      }[site.slug] || []
    for (const [name, pattern] of modules) {
      const button = page.getByRole('button', { name: pattern }).first()
      const link = page.getByRole('link', { name: pattern }).first()
      if (await button.count()) await button.click()
      else if (await link.count()) await link.click()
      else continue
      await record(name)
    }
  } catch (error) {
    result.error = error.message
  }
  details.push(result)
  await writeFile(
    '.qa/project-inspection/details.json',
    JSON.stringify(details, null, 2)
  )
  await context.close()
}
await browser.close()
