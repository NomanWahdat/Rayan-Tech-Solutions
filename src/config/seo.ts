import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_NAME, SITE_URL } from './company'
import { getProject, projects } from './projects'
import { services } from './catalog'

export const pageInfo: Record<string, { title: string; description: string }> =
  {
    '/': {
      title: 'Custom Software & Business Systems in Kabul',
      description:
        'Rayan Tech Solutions is a software development company in Kabul, Afghanistan. Explore custom software, business systems, web applications, mobile apps, and e-commerce.',
    },
    '/services': {
      title: 'Software Development Services',
      description:
        'Custom software development, web development in Kabul, mobile applications, business systems, UI/UX, backend engineering, deployment, and ongoing support.',
    },
    '/solutions': {
      title: 'Business Software Solutions',
      description:
        'Discuss custom business software for inventory, POS, schools, healthcare, CRM, ERP, accounting, and workflow automation in Afghanistan.',
    },
    '/industries': {
      title: 'Software Solutions by Industry',
      description:
        'Explore software solution areas for education, healthcare, retail, transport, manufacturing, hospitality, and professional services.',
    },
    '/portfolio': {
      title: 'Software Projects & Engineering Case Studies',
      description:
        'Explore BazarAF, school management, tailoring, cargo, healthcare, retail, and other Rayan Tech software projects with clearly labeled concept briefs.',
    },
    '/products': {
      title: 'Products & Business Platforms',
      description:
        'Explore Rayan Tech Solutions company software, documented product scope, and customization opportunities.',
    },
    '/technologies': {
      title: 'Technologies & Engineering Capabilities',
      description:
        'Explore Rayan Tech’s documented frontend, backend, mobile, database, cloud, and design capabilities. Technology choices follow the business problem.',
    },
    '/about': {
      title: 'About Our Software Company in Kabul',
      description:
        'Meet the Rayan Tech Solutions team and learn how we approach business requirements, software engineering, design, deployment, and long-term support.',
    },
    '/contact': {
      title: 'Start a Software Project',
      description:
        'Discuss your software project with Rayan Tech Solutions in Kabul. Tell us about your workflow, industry, requirements, and preferred way to connect.',
    },
    '/privacy-policy': {
      title: 'Privacy Policy',
      description:
        'How the Rayan Tech Solutions website handles project inquiry information and third-party services.',
    },
    '/terms-and-conditions': {
      title: 'Terms & Conditions',
      description:
        'Website information, portfolio scope, project agreements, and terms for Rayan Tech Solutions.',
    },
  }
export function metadata(pathname: string) {
  const pathnameClean = pathname.replace(/\/$/, '') || '/'
  const project = pathnameClean.startsWith('/portfolio/')
    ? getProject(pathnameClean.split('/')[2])
    : undefined
  const info = project
    ? {
        title: project.title + ' — Case Study',
        description:
          project.shortDescription +
          ' Explore its business context, documented scope, interface gallery, and engineering details.',
      }
    : pageInfo[pathnameClean]
  return {
    title: (info?.title || 'Page Not Found') + ' | ' + COMPANY_NAME,
    description:
      info?.description ||
      'This page could not be found. Explore Rayan Tech Solutions services and software projects.',
    url: SITE_URL + (pathnameClean === '/' ? '' : pathnameClean),
    image: SITE_URL + '/Open%20Graph%20Share%20Image.png',
    noindex: !info,
    project,
  }
}
export function structuredData(pathname: string) {
  const meta = metadata(pathname)
  const organization = {
    '@type': 'Organization',
    '@id': SITE_URL + '/#organization',
    name: COMPANY_NAME,
    url: SITE_URL,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    logo: SITE_URL + '/Rayan%20Tech%20Solution%20logo%20crapted.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kabul',
      addressCountry: 'AF',
    },
  }
  const localBusiness = {
    '@type': 'ProfessionalService',
    '@id': SITE_URL + '/#local-business',
    name: COMPANY_NAME,
    url: SITE_URL,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    address: organization.address,
    parentOrganization: { '@id': organization['@id'] },
  }
  const graph: unknown[] = [
    organization,
    localBusiness,
    {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      name: COMPANY_NAME,
      url: SITE_URL,
      publisher: { '@id': organization['@id'] },
    },
  ]
  if (meta.project)
    graph.push({
      '@type': 'CreativeWork',
      name: meta.project.title,
      description: meta.project.shortDescription,
      url: meta.url,
      creator: { '@id': organization['@id'] },
      genre: meta.project.category,
      about: meta.project.industry,
    })
  if (pathname === '/services')
    graph.push({
      '@type': 'ItemList',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: SITE_URL + '/services#' + service.slug,
          provider: { '@id': organization['@id'] },
        },
      })),
    })
  if (pathname !== '/')
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        ...(meta.project
          ? [
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Portfolio',
                item: SITE_URL + '/portfolio',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: meta.project.title,
                item: meta.url,
              },
            ]
          : [
              {
                '@type': 'ListItem',
                position: 2,
                name: pageInfo[pathname]?.title || 'Page',
                item: meta.url,
              },
            ]),
      ],
    })
  return { '@context': 'https://schema.org', '@graph': graph }
}
export const siteRoutes = [
  ...Object.keys(pageInfo),
  ...projects.map((project) => '/portfolio/' + project.slug),
]
