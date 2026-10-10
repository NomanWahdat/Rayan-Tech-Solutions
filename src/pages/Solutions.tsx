import { localizeText, localizeContent } from '../lib/localization'
import { ArrowUpRight, Users, Workflow, Layers, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { solutions } from '../config/catalog'
import { CTA, PageIntro } from '../components/Shared'
import { industryIcon } from '../config/design-icons'

export default function Solutions() {
  return (
    <div className="container page-shell">
      <PageIntro
        visual="infrastructure"
        label="SOFTWARE FOR EVERYDAY OPERATIONS"
        title={localizeText('Your workflows. Better connected.')}
        description="Choose the business problem first. We can combine the right modules, permissions, and reporting into software that supports how your organization actually operates."
      />
      <div className="solutions-diagram">
        <span>
          <Users size={27} strokeWidth={1.4} aria-hidden="true" />
          <span>
            {localizeText('Your people')}
            <small>{localizeText('Clear roles and useful interfaces')}</small>
          </span>
        </span>
        <ArrowRight size={22} className="connection-arrow" aria-hidden="true" />
        <strong>
          <Layers size={30} strokeWidth={1.4} aria-hidden="true" />
          <span>
            {localizeText('One connected workspace')}
            <small>{localizeText('Shared records. Clear decisions.')}</small>
          </span>
        </strong>
        <ArrowRight size={22} className="connection-arrow" aria-hidden="true" />
        <span>
          <Workflow size={27} strokeWidth={1.4} aria-hidden="true" />
          <span>
            {localizeText('Your operations')}
            <small>{localizeText('Workflows that fit the business')}</small>
          </span>
        </span>
      </div>
      <div className="catalog-grid">
        {localizeContent(
          solutions.map(([name, description]) => {
            const Icon = industryIcon(name)
            return (
              <article key={name}>
                <span className="card-icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.6} />
                </span>
                <h2>{localizeContent(name)}</h2>
                <p>{localizeContent(description)}</p>
                <Link
                  className="text-link"
                  to={'/contact?type=' + encodeURIComponent(name)}
                >
                  {localizeText('Discuss your workflow ')}
                  <ArrowUpRight size={17} />
                </Link>
              </article>
            )
          })
        )}
      </div>
      <section className="note-band">
        <h2>{localizeText('Start with what needs to work better.')}</h2>
        <p>
          {localizeText(
            'These are solution areas we can discuss and scope with you. Modules, integrations, security needs, and delivery plans are defined around each project.'
          )}
        </p>
        <Link className="text-link" to="/portfolio">
          {localizeText('Explore company projects and concepts ')}
          <ArrowUpRight size={17} />
        </Link>
      </section>
      <CTA />
    </div>
  )
}
