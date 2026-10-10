import { localizeText, localizeContent } from '../lib/localization'
import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Compass,
  Layers,
  LifeBuoy,
  PenTool,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { services } from '../config/catalog'
import { CTA, Process } from '../components/Shared'
import ServiceEmblem from '../components/ServiceEmblem'
import { serviceTechnologies } from '../config/technology-logos'
import EditorialVisual from '../components/EditorialVisual'
import RotatingHeadline from '../components/RotatingHeadline'
import TechnologyMark from '../components/TechnologyMark'

const groups = [
  { label: 'All services', slugs: services.map((service) => service.slug) },
  {
    label: 'Products & platforms',
    slugs: [
      'custom-software',
      'web-applications',
      'websites',
      'mobile-apps',
      'ecommerce',
    ],
  },
  {
    label: 'Operations & automation',
    slugs: ['business-systems', 'ai-automation', 'backend'],
  },
  { label: 'Design & delivery', slugs: ['ui-ux', 'cloud', 'support'] },
]
const highlights = [
  {
    Icon: Compass,
    title: 'Start with the business',
    text: 'Understand the workflow before defining the solution.',
  },
  {
    Icon: PenTool,
    title: 'Make the experience clear',
    text: 'Design around the people who will use the software.',
  },
  {
    Icon: Layers,
    title: 'Connect the right systems',
    text: 'Build the interfaces, data, and integrations together.',
  },
  {
    Icon: LifeBuoy,
    title: 'Plan beyond the launch',
    text: 'Agree on handover, maintenance, and future improvements.',
  },
]
const featuredTechnologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'Django',
  'Node.js',
  'PostgreSQL',
  'Docker',
]

export default function Services() {
  const [group, setGroup] = useState('All services')
  const { hash } = useLocation()
  useEffect(() => {
    const target = decodeURIComponent(hash.slice(1))
    if (!services.some((service) => service.slug === target)) return
    setGroup((current) =>
      groups.find((item) => item.label === current)!.slugs.includes(target)
        ? current
        : 'All services'
    )
  }, [hash])
  const selected = groups.find((item) => item.label === group)!
  return (
    <div className="container page-shell services-page">
      <header className="services-hero">
        <div className="services-hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {localizeText('SOFTWARE DEVELOPMENT SERVICES')}
          </span>
          <h1>
            {localizeText('Software expertise.')}
            <br />
            {localizeText('Built around your')}
            <RotatingHeadline
              words={['business.', 'product.', 'next idea.']}
              label="services headline animation"
            />
          </h1>
          <p className="lead">
            {localizeText(
              'From the first workflow to the final release. We bring design, development, and long-term support together to build software your business can use.'
            )}
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/contact">
              {localizeText('Let’s build your project ')}
              <ArrowUpRight size={18} />
            </Link>
            <a className="text-link" href="#service-expertise">
              {localizeText('Explore our expertise ')}
              <ArrowDown size={17} />
            </a>
          </div>
          <p className="services-hero-note">
            <Check size={15} aria-hidden="true" />{' '}
            {localizeText(
              ' Clear scope. Reviewable stages. Direct communication.'
            )}
          </p>
        </div>
        <EditorialVisual kind="engineering" />
      </header>
      <section
        className="service-toolkit"
        aria-label={localizeText('Selected development technologies')}
      >
        <div>
          <span className="eyebrow">
            {localizeText('TOOLS WITH A PURPOSE')}
          </span>
          <Link className="text-link" to="/technologies">
            {localizeText('Meet our technology stack ')}
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="service-toolkit-marks">
          {localizeContent(
            featuredTechnologies.map((name) => (
              <TechnologyMark name={name} key={name} />
            ))
          )}
        </div>
      </section>
      <section className="service-expertise section" id="service-expertise">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {localizeText('WHAT DO YOU NEED TO BUILD?')}
            </span>
            <h2>
              {localizeText('One team.')}
              <br />
              <span className="accent-word">
                {localizeText('The right expertise.')}
              </span>
            </h2>
          </div>
          <p>
            {localizeText(
              'Explore the services that fit your next step. Each can be scoped on its own or combined into a complete delivery plan.'
            )}
          </p>
        </div>
        <div
          className="service-category-filters"
          role="group"
          aria-label={localizeText('Filter services')}
        >
          {localizeContent(
            groups.map((item) => (
              <button
                key={item.label}
                aria-pressed={group === item.label}
                onClick={() => setGroup(item.label)}
              >
                {localizeContent(item.label)}
              </button>
            ))
          )}
        </div>
        <nav
          className="service-jump-links"
          aria-label={localizeText('Service sections')}
        >
          {localizeContent(
            services
              .filter((service) => selected.slugs.includes(service.slug))
              .map((service) => (
                <a key={service.slug} href={'#' + service.slug}>
                  {localizeContent(service.title)}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ))
          )}
        </nav>
        <p className="sr-only" role="status">
          {localizeContent(selected.slugs.length)}{' '}
          {localizeText(' services shown')}
        </p>
        <div className="service-list">
          {localizeContent(
            services
              .filter((service) => selected.slugs.includes(service.slug))
              .map((service) => {
                return (
                  <section
                    className="service-row"
                    id={service.slug}
                    key={service.slug}
                    aria-labelledby={'service-title-' + service.slug}
                  >
                    <div className="service-summary">
                      <div className="service-identity">
                        <ServiceEmblem slug={service.slug} />
                        <h2 id={'service-title-' + service.slug}>
                          {localizeContent(service.title)}
                        </h2>
                      </div>
                      <p className="service-value-proposition">
                        {localizeContent(service.short)}
                      </p>
                      <p>{localizeContent(service.description)}</p>
                      {localizeContent(
                        (service.slug === 'ui-ux' ||
                          service.slug === 'cloud') && (
                          <EditorialVisual
                            kind={
                              service.slug === 'ui-ux'
                                ? 'design'
                                : 'infrastructure'
                            }
                            compact
                          />
                        )
                      )}
                      <Link
                        className="text-link"
                        to={
                          '/contact?type=' + encodeURIComponent(service.title)
                        }
                      >
                        {localizeText('Discuss this service ')}
                        <ArrowUpRight size={17} />
                      </Link>
                    </div>
                    <div className="service-detail">
                      <h3>{localizeText('What we can deliver')}</h3>
                      <ul className="check-list">
                        {localizeContent(
                          service.capabilities.map((item) => (
                            <li key={item}>
                              <Check size={17} aria-hidden="true" />
                              {localizeContent(item)}
                            </li>
                          ))
                        )}
                      </ul>
                      <div className="service-use-case">
                        <span className="eyebrow">
                          {localizeText('WHERE IT FITS')}
                        </span>
                        <p>{localizeContent(service.useCases)}</p>
                      </div>
                      <div className="service-stack">
                        <h3>{localizeText('Technology approach')}</h3>
                        {localizeContent(
                          serviceTechnologies[service.slug] ? (
                            <div className="service-brand-list">
                              {localizeContent(
                                serviceTechnologies[service.slug].map(
                                  (name) => (
                                    <TechnologyMark key={name} name={name} />
                                  )
                                )
                              )}
                            </div>
                          ) : (
                            <p>{localizeContent(service.technologies)}</p>
                          )
                        )}
                      </div>
                    </div>
                  </section>
                )
              })
          )}
        </div>
      </section>
      <section className="service-partnership">
        <div>
          <span className="eyebrow">
            {localizeText('CONNECTED FROM THE START')}
          </span>
          <h2>
            {localizeText('More than a list of services.')}
            <br />
            {localizeText('A considered way to build.')}
          </h2>
          <Link to="/portfolio" className="text-link">
            {localizeText('See the thinking behind our projects ')}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="service-principles">
          {localizeContent(
            highlights.map(({ Icon, title, text }) => (
              <article key={title}>
                <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>{localizeContent(title)}</h3>
                  <p>{localizeContent(text)}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
      <Process />
      <CTA title={localizeText('Let’s find the right starting point.')} />
    </div>
  )
}
