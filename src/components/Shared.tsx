import { localizeText, localizeContent } from '../lib/localization'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Layers,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { process } from '../config/catalog'
import { team } from '../config/company'
import { useState, type CSSProperties } from 'react'
import { processIcons } from '../config/design-icons'
import EditorialVisual, { type EditorialVisualKind } from './EditorialVisual'

export function PageIntro({
  label,
  title,
  description,
  visual,
}: {
  label: string
  title: string
  description: string
  visual?: EditorialVisualKind
}) {
  return (
    <header className={'page-intro' + (visual ? ' page-intro-visual' : '')}>
      <div className="page-intro-copy">
        <span className="eyebrow">
          <span className="eyebrow-rule" aria-hidden="true" />
          {localizeContent(label)}
        </span>
        <h1>{localizeContent(title)}</h1>
        <p className="lead">{localizeContent(description)}</p>
      </div>
      {localizeContent(visual && <EditorialVisual kind={visual} />)}
    </header>
  )
}
export function CTA({
  title = 'Tell us what you need to build.',
}: {
  title?: string
}) {
  return (
    <section className="cta-band">
      <div>
        <span className="eyebrow">
          {localizeText('LET’S BUILD WHAT’S NEXT')}
        </span>
        <h2>{localizeContent(title)}</h2>
        <p>
          {localizeText(
            'Tell us what your business needs. We’ll help define the right next step.'
          )}
        </p>
      </div>
      <Link className="button button-dark" to="/contact">
        {localizeText('Start a project ')}
        <ArrowUpRight size={19} />
      </Link>
      <span className="cta-decoration" aria-hidden="true">
        ↗
      </span>
    </section>
  )
}
export function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{localizeText('HOW WE WORK')}</span>
          <h2>
            {localizeText('A clear path.')}
            <br />
            {localizeText('From idea to everyday use.')}
          </h2>
        </div>
        <p>
          {localizeText(
            'Understand the work first. Build in stages. Keep you involved at every step.'
          )}
        </p>
      </div>
      <ol className="process-grid">
        {localizeContent(
          process.map(([name, description], index) => {
            const Icon = processIcons[index]
            return (
              <li
                key={name}
                style={{ '--step-delay': `${index * 100}ms` } as CSSProperties}
              >
                <span className="process-icon" aria-hidden="true">
                  <Icon size={27} strokeWidth={1.7} />
                </span>
                <div className="process-step-copy">
                  <h3>{localizeContent(name)}</h3>
                  <p>{localizeContent(description)}</p>
                </div>
              </li>
            )
          })
        )}
      </ol>
    </section>
  )
}
function Portrait({ member }: { member: (typeof team)[number] }) {
  const [failed, setFailed] = useState(false)
  return (
    <article className="team-card">
      <div className="portrait">
        <span className="portrait-backdrop" aria-hidden="true" />
        {localizeContent(
          failed ? (
            <span className="portrait-initials">
              {localizeContent(
                member.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
              )}
            </span>
          ) : (
            <img
              src={member.image}
              alt={localizeText(member.name)}
              style={{ objectPosition: member.position }}
              width="480"
              height="560"
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          )
        )}
      </div>
      <div className="team-caption">
        <h3>{localizeContent(member.name)}</h3>
        <p>{localizeContent(member.role)}</p>
      </div>
    </article>
  )
}
export function Team({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section team-section" id="team">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            {localizeText('THE PEOPLE BEHIND THE WORK')}
          </span>
          <h2>{localizeText('Meet your engineering team.')}</h2>
        </div>
        <div>
          <p>
            {localizeText(
              'The people who turn your requirements into working software.'
            )}
          </p>
          {localizeContent(
            compact && (
              <Link to="/about" className="text-link">
                {localizeText('Get to know Rayan ')}
                <ArrowUpRight size={17} />
              </Link>
            )
          )}
        </div>
      </div>
      <div className="team-grid">
        {localizeContent(
          team.map((member) => <Portrait member={member} key={member.name} />)
        )}
      </div>
    </section>
  )
}
export function EngineeringVisual() {
  return (
    <div
      className="engineering-visual"
      role="img"
      aria-label={localizeText(
        'Illustrative business workspace connecting interfaces, application logic, and data. This is a design illustration, not a project screenshot.'
      )}
    >
      <div className="visual-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <span className="visual-kicker">
        {localizeText('IDEAS → CONNECTED SYSTEMS')}
      </span>
      <div className="visual-window">
        <div className="window-bar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>{localizeText('Business workspace')}</span>
          <LayoutDashboard size={14} />
        </div>
        <div className="window-body">
          <div className="window-sidebar">
            <span className="mini-brand">{localizeText('r.')}</span>
            {localizeContent(
              [LayoutDashboard, Layers, Database, ShieldCheck].map(
                (Icon, i) => (
                  <span className={i === 0 ? 'selected' : ''} key={i}>
                    <Icon size={17} />
                  </span>
                )
              )
            )}
          </div>
          <div className="workspace">
            <div className="workspace-top">
              <div>
                <small>{localizeText('CONNECTED OPERATIONS')}</small>
                <strong>{localizeText('A clearer way to work.')}</strong>
              </div>
              <span className="workspace-plus">+</span>
            </div>
            <div className="workflow-tiles">
              <span>
                <Layers size={18} />
                {localizeText('Operations')}
              </span>
              <span>
                <Database size={18} />
                {localizeText('Your data')}
              </span>
              <span>
                <Code2 size={18} />
                {localizeText('Integrations')}
              </span>
            </div>
            <div className="workflow-diagram">
              <span>{localizeText('People')}</span>
              <i />
              <span className="workflow-core">
                {localizeText('Your system ')}
                <ArrowUpRight size={16} />
              </span>
              <i />
              <span>{localizeText('Decisions')}</span>
            </div>
            <div className="workspace-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="workspace-bottom">
              <ShieldCheck size={14} />{' '}
              {localizeText(' Designed around your business')}
            </div>
          </div>
        </div>
      </div>
      <div className="visual-note">
        <span className="note-icon">
          <Check size={17} />
        </span>
        <div>
          <strong>{localizeText('Complexity, made workable.')}</strong>
          <span>{localizeText('Design + engineering, together.')}</span>
        </div>
      </div>
      <div className="visual-code">
        <Code2 size={17} />
        <span>
          {localizeText('Built to fit.')}
          <br />
          <strong>{localizeText('Ready to evolve.')}</strong>
        </span>
      </div>
      <span className="visual-label">
        {localizeText('SYSTEM DESIGN ILLUSTRATION ')}
        <ArrowDown size={12} />
      </span>
    </div>
  )
}
