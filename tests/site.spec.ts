import { test, expect } from '@playwright/test'
import { siteRoutes, metadata } from '../src/config/seo'
import { projects } from '../src/config/projects'
import AxeBuilder from '@axe-core/playwright'
import { technologyGroups } from '../src/config/catalog'

test('Services categories, deep links, and headline motion work', async ({
  page,
}) => {
  await page.goto('/services')
  const headline = page.locator('.services-hero .rotating-word.is-active')
  const first = await headline.textContent()
  await expect(headline).not.toHaveText(first!)
  await page
    .getByRole('button', { name: 'Pause services headline animation' })
    .click()
  const paused = await headline.textContent()
  await page.waitForTimeout(3600)
  await expect(headline).toHaveText(paused!)
  await page
    .getByRole('button', { name: 'Design & delivery', exact: true })
    .click()
  await expect(page.locator('.service-row')).toHaveCount(3)
  await expect(page.locator('#ui-ux')).toBeVisible()
  await expect(page.locator('#ui-ux .technology-mark img')).toHaveAttribute(
    'src',
    '/images/technologies/figma.svg'
  )
  await page.goto('/services#backend')
  await expect(page.locator('#backend')).toBeVisible()
  await expect(page.locator('.service-row')).toHaveCount(11)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.services-hero .rotation-toggle')).toHaveCount(0)
  const reduced = await headline.textContent()
  await page.waitForTimeout(3600)
  await expect(headline).toHaveText(reduced!)
})

test('Technology directory filters, authentic logos, search, and inquiry links work', async ({
  page,
}) => {
  await page.goto('/technologies')
  await page.getByRole('button', { name: 'Databases', exact: true }).click()
  await expect(page.locator('.technology-card')).toHaveCount(2)
  await page.locator('.technology-card').first().scrollIntoViewIfNeeded()
  await expect(
    page.locator('.technology-card').first().locator('img')
  ).toHaveAttribute('src', '/images/technologies/postgresql.svg')
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.technology-card img')].every(
      (node) =>
        (node as HTMLImageElement).complete &&
        (node as HTMLImageElement).naturalWidth > 0
    )
  )
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click()
  await page
    .getByRole('searchbox', { name: 'Search technologies' })
    .fill('django')
  await expect(page.locator('.technology-card')).toHaveCount(1)
  await page.locator('.technology-card').click()
  await expect(page.getByLabel('Project type *')).toHaveValue(
    'Django development'
  )
  await page.goto('/technologies')
  await page
    .getByRole('searchbox', { name: 'Search technologies' })
    .fill('no-such-framework')
  await expect(
    page.getByRole('heading', { name: 'No matching technology.' })
  ).toBeVisible()
  await page
    .getByRole('button', { name: 'Show all technologies', exact: true })
    .click()
  await expect(page.locator('.technology-card')).toHaveCount(
    technologyGroups.reduce((total, [, items]) => total + items.length, 0)
  )
})

test('Hero rotation can be paused and respects reduced motion', async ({
  page,
}) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const active = page.locator('.rotating-word.is-active')
  const first = await active.textContent()
  await expect(active).not.toHaveText(first!)
  await page.getByRole('button', { name: 'Pause headline animation' }).click()
  const paused = await active.textContent()
  await page.waitForTimeout(3600)
  await expect(active).toHaveText(paused!)
  await page.getByRole('button', { name: 'Resume headline animation' }).click()
  await expect(active).not.toHaveText(paused!)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.rotation-toggle')).toHaveCount(0)
  const reduced = await active.textContent()
  await page.waitForTimeout(3600)
  await expect(active).toHaveText(reduced!)
  await expect(page.locator('.hero .small-dot')).toHaveCount(0)
  await expect(page.locator('.hero .engineering-visual')).toHaveCount(0)
  await expect(page.locator('.systems-story .engineering-visual')).toHaveCount(
    1
  )
})

test('Main pages pass automated accessibility checks', async ({ page }) => {
  test.setTimeout(120000)
  for (const route of [
    '/',
    '/services',
    '/solutions',
    '/industries',
    '/technologies',
    '/products',
    '/portfolio',
    '/portfolio/bazaaraf',
    '/about',
    '/contact',
  ]) {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(
      result.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      })),
      route
    ).toEqual([])
  }
})

test('Home connects services and featured work without the removed delivery widget', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('.delivery-journey')).toHaveCount(0)
  await expect(page.locator('.featured-projects .project-card')).toHaveCount(4)
  await expect(page.locator('.capability-card')).toHaveCount(6)
  await page.locator('.featured-projects .project-cover-link').first().click()
  await expect(page).toHaveURL(/\/portfolio\/bazaaraf/)
  await expect(page.locator('h1')).toBeVisible()
  await page.goto('/')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('.home-brief-links a').first().click()
  await expect(page).toHaveURL(/\/services#custom-software/)
  await expect(
    page.locator('.editorial-visual').first().locator('img')
  ).toBeVisible()
  expect(
    await page
      .locator('.editorial-visual')
      .first()
      .locator('img')
      .evaluate((node) => (node as HTMLImageElement).naturalWidth)
  ).toBeGreaterThan(0)
})

test('Every production route has real HTML, unique metadata, one H1, and no browser errors', async ({
  page,
  request,
}) => {
  test.setTimeout(180000)
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  const titles = new Set<string>()
  for (const route of siteRoutes) {
    const response = await request.get(route)
    expect(response.ok(), route).toBeTruthy()
    const html = await response.text()
    expect(html, route).toContain('data-route="' + route + '"')
    expect(html, route).toContain('<h1>')
    expect(html, route).toContain('application/ld+json')
    await page.goto(route)
    await expect(page.locator('h1'), route).toHaveCount(1)
    await expect(page).toHaveTitle(metadata(route).title)
    expect(titles.has(await page.title()), route).toBeFalsy()
    titles.add(await page.title())
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1
      ),
      route + ' horizontal overflow'
    ).toBeTruthy()
  }
  expect(errors).toEqual([])
})

test('Portfolio filters, search, URL reload, and empty states work', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.goto('/portfolio')
  await expect(page.locator('.project-card')).toHaveCount(projects.length)
  await page.getByRole('button', { name: 'E-Commerce', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(
    projects.filter((project) => project.category === 'E-Commerce').length
  )
  await page.reload()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await page
    .getByRole('combobox', { name: 'Industry', exact: true })
    .selectOption('Transportation')
  await expect(page.locator('.project-card')).toHaveCount(
    projects.filter((project) => project.industry === 'Transportation').length
  )
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await page
    .getByRole('combobox', { name: 'Technology', exact: true })
    .selectOption('Django')
  await expect(page.locator('.project-card')).toHaveCount(
    projects.filter((project) => project.technologies.includes('Django')).length
  )
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await page
    .getByRole('combobox', { name: 'Project status', exact: true })
    .selectOption('concept')
  await expect(page.locator('.project-card')).toHaveCount(
    projects.filter((project) => project.status === 'Concept Project').length
  )
  await page
    .getByRole('textbox', { name: 'Search projects' })
    .fill('no such project')
  await expect(
    page.getByRole('heading', { name: 'No projects match these filters.' })
  ).toBeVisible()
  await page.getByRole('button', { name: 'Show all projects' }).click()
  await expect(page.locator('.project-card')).toHaveCount(projects.length)
  expect(errors).toEqual([])
})

test('Inquiry validation, direct email success/error, and WhatsApp routing', async ({
  page,
  context,
}) => {
  let fail = true
  let requests = 0
  await page.route('**/api/inquiry', (route) => {
    requests++
    return route.fulfill({
      status: fail ? 503 : 200,
      contentType: 'application/json',
      body: JSON.stringify(
        fail
          ? {
              success: false,
              error: 'Email sending is temporarily unavailable.',
            }
          : { success: true }
      ),
    })
  })
  await context.route('https://wa.me/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<p>WhatsApp test destination</p>',
    })
  )
  await page.goto(
    '/contact?type=Custom%20software%20development&industry=Education'
  )
  await expect(page.getByLabel('Project type *')).toHaveValue(
    'Custom software development'
  )
  await page.getByRole('button', { name: 'Send project inquiry' }).click()
  await expect(page.locator('.inquiry-result')).toHaveCount(0)
  await page.getByLabel('Your name *').fill('Project inquiry test')
  await page.getByLabel('Email address *').fill('test@example.com')
  await page.getByLabel('Company', { exact: true }).fill('Example company')
  await page
    .getByLabel('Project description *')
    .fill('We need a connected attendance and administration workspace.')
  await page.getByRole('button', { name: 'Send project inquiry' }).click()
  await expect(page.getByRole('alert')).toContainText(
    'Email sending is temporarily unavailable.'
  )
  await expect(page.getByLabel('Project description *')).toHaveValue(
    'We need a connected attendance and administration workspace.'
  )
  await expect(page.locator('.inquiry-result')).toHaveCount(0)
  fail = false
  await page.getByRole('button', { name: 'Send project inquiry' }).click()
  await expect(
    page.getByRole('heading', { name: 'Your project inquiry has been sent.' })
  ).toBeVisible()
  expect(await page.content()).not.toContain('nomanwahdat@gmail.com')
  await page.getByLabel('Preferred contact method').selectOption('WhatsApp')
  await page.getByRole('button', { name: 'Continue on WhatsApp' }).click()
  await expect(page.locator('.inquiry-result')).toHaveCount(0)
  await page.getByLabel('Phone / WhatsApp *').fill('+93 77 230 9782')
  const [whatsapp] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'Continue on WhatsApp' }).click(),
  ])
  await whatsapp.waitForLoadState()
  expect(whatsapp.url()).toContain('https://wa.me/93772309782?text=')
  expect(decodeURIComponent(whatsapp.url())).toContain('Industry: Education')
  await whatsapp.close()
  await expect(
    page.getByRole('heading', { name: 'Continue your inquiry on WhatsApp.' })
  ).toBeVisible()
  await expect(
    page.getByText('Review the message and tap Send.', {
      exact: false,
    })
  ).toBeVisible()
  const draft = page.getByRole('link', { name: 'Send via WhatsApp' })
  expect(
    decodeURIComponent((await draft.getAttribute('href')) || '')
  ).toContain('Company: Example company')
  expect(
    decodeURIComponent((await draft.getAttribute('href')) || '')
  ).toContain('Industry: Education')
  expect(
    await page
      .getByRole('link', { name: 'Send via WhatsApp' })
      .getAttribute('href')
  ).toContain('https://wa.me/93772309782?text=')
  expect(requests).toBe(2)
  await page.getByLabel('Your name *').fill('Updated name')
  await expect(page.locator('.inquiry-result')).toHaveCount(0)
})

test('Every case study has the full story, related projects, and no empty external buttons', async ({
  page,
}) => {
  await page.goto('/portfolio/bazaaraf')
  await expect(
    page.locator('.case-study').getByRole('heading', { level: 2 })
  ).toHaveCount(17)
  await expect(
    page.getByRole('link', { name: 'View live project' })
  ).toHaveCount(0)
  await expect(
    page.getByRole('link', { name: 'View GitHub repository' })
  ).toHaveCount(0)
  await expect(page.locator('.related-section .project-card')).toHaveCount(3)
  await expect(
    page.locator('.case-study > .project-image img')
  ).toHaveAttribute('src', '/images/portfolio/bazaaraf/hero.webp')
  await expect(page.locator('.gallery-image-button').first()).toBeEnabled()
  await page.goto('/portfolio/rayan-cargo')
  await expect(
    page.locator('.case-study > .project-image img')
  ).toHaveAttribute('src', '/images/portfolio/rayan-cargo/illustration.svg')
  await expect(page.locator('.case-review')).toContainText(
    'Unavailable reference'
  )
  await expect(page.locator('.gallery-image-button')).toHaveCount(0)
  await expect(page.locator('.gallery-unavailable')).toBeVisible()
})

test('Real screenshot replacement enables the gallery and keyboard lightbox', async ({
  page,
}) => {
  // A tiny image is served only by this test. No fabricated screenshot is saved.
  const png = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jMZkAAAAASUVORK5CYII=',
    'base64'
  )
  await page.route('**/portfolio-assets.json', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        '/images/portfolio/bazaaraf/hero.webp',
        '/images/portfolio/bazaaraf/homepage.webp',
      ]),
    })
  )
  await page.route('**/images/portfolio/bazaaraf/hero.webp', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'image/png',
      body: route.request().method() === 'HEAD' ? undefined : png,
    })
  )
  await page.route('**/images/portfolio/bazaaraf/homepage.webp', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'image/png',
      body: route.request().method() === 'HEAD' ? undefined : png,
    })
  )
  await page.goto('/portfolio/bazaaraf')
  const image = page.getByRole('button', {
    name:
      'Enlarge ' +
      projects.find((project) => project.slug === 'bazaaraf')!.images[0]
        .caption,
  })
  await expect(image).toBeEnabled()
  await image.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Close image preview' })
  ).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('.lightbox-bar')).toContainText(
    'Marketplace homepage'
  )
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(image).toBeFocused()
})

test('All project cards load branded dashboard covers without image badges', async ({
  page,
}) => {
  await page.goto('/portfolio')
  const cards = page.locator('.project-card')
  await expect(cards).toHaveCount(projects.length)
  await expect(cards.locator('.project-image-label')).toHaveCount(0)
  for (const card of await cards.all()) {
    const cover = card.locator('.project-image img')
    await cover.scrollIntoViewIfNeeded()
    await expect(cover).toHaveAttribute('src', /\/dashboard-cover\.webp$/)
    await cover.evaluate((node) => (node as HTMLImageElement).decode())
  }
  await expect(cards).not.toContainText(['Portfolio Project'])
})

test('School uses a real-project label, illustrated cover, and supplied PNG gallery slots', async ({
  page,
}) => {
  await page.goto('/')
  const card = page.locator('.project-card').filter({
    has: page.getByRole('heading', {
      name: 'School Management System',
      exact: true,
    }),
  })
  await expect(card).toContainText('Real Project')
  await expect(card).not.toContainText('Portfolio Project')
  const cover = card.locator('.project-image img')
  await cover.scrollIntoViewIfNeeded()
  await expect(cover).toHaveAttribute(
    'src',
    '/images/portfolio/school-management-system/dashboard-cover.webp'
  )
  await cover.evaluate((image) => (image as HTMLImageElement).decode())
  await expect(card.locator('.project-image-label')).toHaveCount(0)

  // Test-only PNG responses exercise owner-provided screenshot slot resolution.
  const png = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jMZkAAAAASUVORK5CYII=',
    'base64'
  )
  const slots = [
    'dashboard',
    'students',
    'classes',
    'teachers',
    'attendance',
    'exams',
    'teacher-dashboard',
  ]
  const images = slots.map(
    (slot) => '/images/portfolio/school-management-system/' + slot + '.png'
  )
  await page.route('**/portfolio-assets.json', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(images),
    })
  )
  await page.route(
    '**/images/portfolio/school-management-system/*.png',
    (route) => route.fulfill({ contentType: 'image/png', body: png })
  )
  await page.goto('/portfolio/school-management-system')
  await expect(page.locator('.case-hero .status-badge')).toHaveText(
    'Real Project'
  )
  await expect(
    page.locator('.case-study > .project-image img')
  ).toHaveAttribute('src', images[0])
  await expect(page.locator('.gallery-image-button')).toHaveCount(7)
  const students = page.getByRole('button', {
    name: 'Enlarge Student directory — company-supplied screenshot',
  })
  await students.click()
  await expect(page.locator('.lightbox-content > img')).toHaveAttribute(
    'src',
    images[1]
  )
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(students).toBeFocused()
})

test('Navigation, dropdown, four team portraits, and unknown routes', async ({
  page,
  isMobile,
}) => {
  await page.goto('/')
  await expect(page.locator('.team-card')).toHaveCount(4)
  await expect(page.locator('.team-card').first()).toContainText(
    'Full Stack Developer'
  )
  await expect(page.locator('.team-section')).not.toContainText('Arman Malik')
  await expect(page.locator('.team-section')).not.toContainText('Hameedullah')
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' })
    ).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(
      page.getByRole('button', { name: 'Open navigation' })
    ).toBeFocused()
    await page.getByRole('button', { name: 'Open navigation' }).click()
  }
  await page.getByRole('button', { name: 'More company pages' }).click()
  if (!isMobile) {
    await page.keyboard.press('Escape')
    await expect(
      page.getByRole('button', { name: 'More company pages' })
    ).toBeFocused()
    await page.getByRole('button', { name: 'More company pages' }).click()
  }
  await page
    .locator('#company-navigation')
    .getByRole('link', { name: 'Technologies' })
    .click()
  await expect(page).toHaveURL(/\/technologies$/)
  if (isMobile)
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' })
    ).not.toBeVisible()
  await page.goto('/about')
  if (isMobile)
    await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('button', { name: 'More company pages' }).click()
  await page
    .locator('#company-navigation')
    .getByRole('link', { name: 'Our team' })
    .click()
  await expect(page).toHaveURL(/\/about#team$/)
  await expect(page.locator('#company-navigation')).toHaveCount(0)
  if (isMobile)
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' })
    ).not.toBeVisible()
  await page.goto('/a-page-that-does-not-exist')
  await expect(
    page.getByRole('heading', { name: 'Let’s get you back on track.' })
  ).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex,follow'
  )
})

test('All internal navigation paths and hash destinations are valid', async ({
  page,
}) => {
  test.setTimeout(90000)
  const destinations = new Set(siteRoutes)
  for (const route of [
    '/',
    '/services',
    '/solutions',
    '/industries',
    '/portfolio/bazaaraf',
    '/contact',
  ]) {
    await page.goto(route)
    const links = await page
      .locator('a[href]')
      .evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute('href')!)
      )
    for (const href of links) {
      if (!href.startsWith('/') && !href.startsWith('#')) continue
      const target = new URL(href, 'http://127.0.0.1:4173' + route)
      expect(destinations.has(target.pathname), href).toBeTruthy()
      if (target.hash && target.pathname === route)
        expect(
          await page
            .locator('[id="' + decodeURIComponent(target.hash.slice(1)) + '"]')
            .count(),
          href
        ).toBe(1)
    }
  }
})
