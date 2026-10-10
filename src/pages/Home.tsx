import { localizeText, localizeContent } from '../lib/localization'
import {
  ArrowUpRight,
  Code2,
  Globe2,
  Layers,
  Smartphone,
  ShoppingBag,
  Workflow,
  Check,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../config/projects'
import ProjectCard from '../components/ProjectCard'
import { CTA, EngineeringVisual, Process, Team } from '../components/Shared'
import { useTranslation } from 'react-i18next'
import RotatingHeadline from '../components/RotatingHeadline'
import DeliveryJourney from '../components/DeliveryJourney'
import EditorialVisual from '../components/EditorialVisual'
import heroImage from '../assets/developer-collaboration.webp'
import heroImageMobile from '../assets/developer-collaboration-mobile.webp'

const capabilities = [
  [
    Code2,
    'Custom software',
    'Purpose-built systems for the way your business works.',
    'custom-software',
  ],
  [
    Globe2,
    'Web applications',
    'Connected portals, platforms, and useful digital products.',
    'web-applications',
  ],
  [
    Layers,
    'Business systems',
    'Bring sales, stock, people, and operations together.',
    'business-systems',
  ],
  [
    Smartphone,
    'Mobile applications',
    'Clear, practical experiences for Android and iOS.',
    'mobile-apps',
  ],
  [
    ShoppingBag,
    'E-commerce',
    'Connect products, sellers, customers, and orders.',
    'ecommerce',
  ],
  [
    Workflow,
    'AI & automation',
    'Thoughtful automation for repeated business tasks.',
    'ai-automation',
  ],
] as const
export default function Home() {
  const { t, i18n } = useTranslation('redesign')
  return (
    <div className="home-page">
      <section
        className="hero"
        id="home"
        lang={i18n.language}
        dir={['ps', 'fa'].includes(i18n.language) ? 'rtl' : 'ltr'}
      >
        <div className="hero-media" aria-hidden="true">
          <img
            src={heroImage}
            srcSet={heroImageMobile + ' 800w, ' + heroImage + ' 1600w'}
            sizes="(max-width: 800px) 100vw, 55vw"
            alt={localizeText('')}
            width="1600"
            height="2400"
            decoding="async"
          />
        </div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow hero-signature">
              <span className="hero-signal" aria-hidden="true">
                <Code2 size={18} />
              </span>
              {localizeContent(t('hero.label'))}
            </span>
            <h1>
              {localizeContent(t('hero.line1'))}
              <br />
              {localizeContent(t('hero.line2'))}
              <RotatingHeadline
                words={t('hero.words', { returnObjects: true }) as string[]}
                label="headline animation"
              />
            </h1>
            <p>{localizeContent(t('hero.description'))}</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/contact">
                {localizeContent(t('start'))} <ArrowUpRight size={19} />
              </Link>
              <Link className="button button-outline" to="/portfolio">
                {localizeContent(t('explore'))} <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="hero-footnote">
              <Globe2 size={16} className="location-orbit" aria-hidden="true" />
              {localizeContent(t('hero.location'))}
            </div>
          </div>
        </div>
      </section>
      <DeliveryJourney />
      <div className="container">
        <section className="section selected-work" id="selected-work">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                {localizeText('SELECTED WORK / REAL BUSINESS CONTEXT')}
              </span>
              <h2>
                {localizeText('Software with a')}
                <br />
                {localizeText('real business purpose.')}
              </h2>
            </div>
            <div>
              <p>
                {localizeText(
                  'From marketplaces to management systems. Explore the context, scope, and thinking behind our projects. Dashboard covers introduce each product; real screenshots appear in its case study.'
                )}
              </p>
              <Link className="text-link" to="/portfolio">
                {localizeText('Explore the portfolio ')}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          <div className="featured-projects">
            {localizeContent(
              [
                'bazaaraf',
                'school-management-system',
                'tailoring-management-system',
                'rayan-cargo',
              ].map((slug) => (
                <ProjectCard
                  key={slug}
                  project={projects.find((project) => project.slug === slug)!}
                  featured
                />
              ))
            )}
          </div>
        </section>
        <section className="section capabilities-section" id="services">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{localizeText('WHAT WE DO')}</span>
              <h2>
                {localizeText('Software for the way')}
                <br />
                {localizeText('your business works.')}
              </h2>
            </div>
            <Link className="text-link" to="/services">
              {localizeText('All services ')}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="capabilities-grid">
            {localizeContent(
              capabilities.map(([Icon, title, description, slug]) => (
                <Link
                  className="capability-card"
                  to={'/services#' + slug}
                  key={slug}
                >
                  <div className="capability-top">
                    <Icon size={27} strokeWidth={1.5} />
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </div>
                  <h3>{localizeContent(title)}</h3>
                  <p>{localizeContent(description)}</p>
                  <ArrowUpRight className="capability-arrow" size={20} />
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
      <section className="principles-band">
        <div className="container principles-layout">
          <div>
            <span className="eyebrow">{localizeText('BUILT WITH INTENT')}</span>
            <h2>
              {localizeText('Good software understands')}
              <br />
              {localizeText('the business behind it.')}
            </h2>
            <Link className="text-link" to="/about">
              {localizeText('Our approach ')}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="principle-list">
            {localizeContent(
              [
                [
                  'Your workflow comes first',
                  'We start with the people, processes, and decisions the system needs to support.',
                ],
                [
                  'Clarity throughout delivery',
                  'Defined scope, reviewable milestones, and direct communication keep the work understandable.',
                ],
                [
                  'A foundation for the long term',
                  'Maintainable code, deliberate access control, and a plan for ongoing support.',
                ],
              ].map(([title, description]) => (
                <div key={title}>
                  <Check size={20} aria-hidden="true" />
                  <div>
                    <h3>{localizeContent(title)}</h3>
                    <p>{localizeContent(description)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <div className="container">
        <section className="systems-story section">
          <div className="systems-story-copy">
            <span className="eyebrow">
              {localizeText('FROM SEPARATE TASKS TO CONNECTED WORK')}
            </span>
            <h2>
              {localizeText('One system.')}
              <br />
              {localizeText('A clearer working day.')}
            </h2>
            <p>
              {localizeText(
                'Your sales, inventory, people, and reporting should work together. We build the connections around your actual operation.'
              )}
            </p>
            <Link className="text-link" to="/solutions">
              {localizeText('Explore business solutions ')}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <EngineeringVisual />
        </section>
        <Process />
        <section className="industry-teaser section industry-teaser-visual">
          <div className="industry-teaser-copy">
            <span className="eyebrow">{localizeText('ACROSS INDUSTRIES')}</span>
            <h2>
              {localizeText('Different businesses.')}
              <br />
              {localizeText('Specific challenges.')}
            </h2>
            <div className="industry-tags">
              {localizeContent(
                [
                  'Education',
                  'Healthcare',
                  'Retail',
                  'Transportation',
                  'E-Commerce',
                  'Manufacturing',
                  'Professional Services',
                  'Hospitality',
                ].map((item) => (
                  <Link
                    to={
                      '/industries#' + item.toLowerCase().replaceAll(' ', '-')
                    }
                    key={item}
                  >
                    {localizeContent(item)}
                    <ArrowUpRight size={15} />
                  </Link>
                ))
              )}
            </div>
            <Link to="/industries" className="text-link">
              {localizeText('Find your industry ')}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <EditorialVisual kind="engineering" />
        </section>
        <Team compact />
        <CTA />
      </div>
    </div>
  )
}
