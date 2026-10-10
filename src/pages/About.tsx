import { localizeText, localizeContent } from '../lib/localization'
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Compass,
  MapPin,
  PencilRuler,
  Search,
  Target,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CTA, Process, Team } from '../components/Shared'
import TechnologyMark from '../components/TechnologyMark'
import { valueIcons } from '../config/design-icons'

const approach = [
  {
    name: 'Understand',
    detail: 'Your business sets the direction',
    Icon: Search,
    className: 'understand',
  },
  {
    name: 'Design',
    detail: 'Give complex work a clear interface',
    Icon: PencilRuler,
    className: 'design',
  },
  {
    name: 'Build',
    detail: 'Engineer a foundation that can evolve',
    Icon: Code2,
    className: 'build',
  },
]

export default function About() {
  return (
    <div className="container page-shell about-page">
      <header className="about-hero">
        <div className="about-hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {localizeText('ABOUT RAYAN TECH SOLUTIONS')}
          </span>
          <h1>
            {localizeText('Software built with ')}
            <span>{localizeText('business in mind.')}</span>
          </h1>
          <p className="lead">
            {localizeText(
              'We are a software development company in Kabul, Afghanistan. We build custom business systems, web platforms, and digital products around the work our customers need to do.'
            )}
          </p>
          <div className="about-hero-actions">
            <Link className="button button-primary" to="/contact">
              {localizeText('Work with us ')}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link className="text-link" to="#team">
              {localizeText('Meet the team ')}
              <ArrowDown size={17} aria-hidden="true" />
            </Link>
          </div>
          <span className="about-location">
            <MapPin size={16} aria-hidden="true" />
            {localizeText('Built in Kabul. Ready for your next chapter.')}
          </span>
        </div>
        <figure className="about-blueprint">
          <div className="about-blueprint-heading">
            <span className="eyebrow">
              {localizeText('THE RAYAN APPROACH')}
            </span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </div>
          <div className="about-approach-stack">
            {localizeContent(
              approach.map(({ name, detail, Icon, className }) => (
                <div className={'about-approach-sheet ' + className} key={name}>
                  <Icon size={29} strokeWidth={1.5} aria-hidden="true" />
                  <strong>{localizeContent(name)}</strong>
                  <span>{localizeContent(detail)}</span>
                </div>
              ))
            )}
          </div>
          <figcaption>
            <span className="about-connection" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {localizeText('Business, design, and engineering.')}
            <br />
            {localizeText('One connected approach.')}
          </figcaption>
        </figure>
      </header>
      <section className="about-purpose" aria-labelledby="about-purpose-title">
        <div className="about-purpose-label">
          <span className="eyebrow">
            {localizeText('OUR REASON FOR BUILDING')}
          </span>
          <span className="about-purpose-symbol" aria-hidden="true">
            <Compass size={48} strokeWidth={1.1} />
          </span>
        </div>
        <div className="about-purpose-copy">
          <h2 id="about-purpose-title">
            {localizeText('Technology should make your work')}
            {localizeContent(' ')}
            <span className="accent-word">{localizeText('make sense.')}</span>
          </h2>
          <div className="about-purpose-columns">
            <p>
              {localizeText(
                'When information is scattered and daily tasks depend on manual handoffs, software can help. The useful starting point is understanding the operation, rather than choosing a framework.'
              )}
            </p>
            <p>
              {localizeText(
                'We bring business requirements, interface design, and engineering into the same conversation. The aim is a system people can understand today and maintain tomorrow.'
              )}
            </p>
          </div>
          <Link to="/portfolio" className="text-link">
            {localizeText('See how this takes shape')}
            {localizeContent(' ')}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        className="about-direction"
        aria-label={localizeText('Our mission and vision')}
      >
        <article>
          <div className="about-direction-label">
            <Target size={23} strokeWidth={1.5} aria-hidden="true" />
            <span className="eyebrow">{localizeText('OUR MISSION')}</span>
          </div>
          <h2>{localizeText('Make everyday operations clearer.')}</h2>
          <p>
            {localizeText(
              'Build practical, maintainable software that connects information, reduces repeated work, and helps businesses operate with greater clarity.'
            )}
          </p>
        </article>
        <article>
          <div className="about-direction-label">
            <Compass size={23} strokeWidth={1.5} aria-hidden="true" />
            <span className="eyebrow">{localizeText('OUR VISION')}</span>
          </div>
          <h2>{localizeText('Build lasting engineering partnerships.')}</h2>
          <p>
            {localizeText(
              'Help businesses in Afghanistan and beyond develop dependable digital foundations, with thoughtful design and sustained technical support.'
            )}
          </p>
        </article>
      </section>
      <section className="section about-standards">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {localizeText('OUR ENGINEERING PHILOSOPHY')}
            </span>
            <h2>{localizeText('Standards that guide the work.')}</h2>
          </div>
          <p>
            {localizeText(
              'Clear decisions, useful interfaces, and a foundation that can evolve.'
            )}
          </p>
        </div>
        <div className="values-grid about-values">
          {localizeContent(
            [
              [
                'Understand before building',
                'Document workflows, priorities, and constraints before committing to a solution.',
              ],
              [
                'Design for the people using it',
                'Make important actions clear and consider accessibility and mobile use from the beginning.',
              ],
              [
                'Keep the foundation maintainable',
                'Use readable code, explicit permissions, documented integrations, and reviewable releases.',
              ],
              [
                'Communicate directly',
                'Explain progress, decisions, and tradeoffs in terms the whole project team can understand.',
              ],
            ].map(([title, description], index) => {
              const Icon = valueIcons[index]
              return (
                <article key={title}>
                  <span className="card-icon" aria-hidden="true">
                    <Icon size={25} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3>{localizeContent(title)}</h3>
                    <p>{localizeContent(description)}</p>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </section>
      <Team />
      <Process />
      <section className="about-toolkit">
        <div>
          <span className="eyebrow">
            {localizeText('THE RIGHT TOOLS FOR THE JOB')}
          </span>
          <h2>{localizeText('Architecture follows the problem.')}</h2>
          <p>
            {localizeText(
              'Our capabilities span web interfaces, backend systems, databases, mobile applications, and deployment.'
            )}
          </p>
          <Link className="text-link" to="/technologies">
            {localizeText('Explore our technologies')}
            {localizeContent(' ')}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div
          className="about-toolkit-marks"
          aria-label={localizeText('Selected technologies')}
        >
          {localizeContent(
            [
              'React',
              'TypeScript',
              'Python',
              'PostgreSQL',
              'Docker',
              'Figma',
            ].map((name) => <TechnologyMark name={name} key={name} />)
          )}
        </div>
      </section>
      <CTA />
    </div>
  )
}
