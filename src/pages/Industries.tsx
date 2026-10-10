import { localizeText, localizeContent } from '../lib/localization'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { industries } from '../config/catalog'
import { projects } from '../config/projects'
import { CTA, PageIntro } from '../components/Shared'
import { industryIcon } from '../config/design-icons'

export default function Industries() {
  return (
    <div className="container page-shell">
      <PageIntro
        visual="design"
        label="BUSINESS CONTEXT COMES FIRST"
        title={localizeText('Different industries. Specific solutions.')}
        description="A school, a pharmacy, and a cargo business all work differently. We shape software around the records, decisions, and responsibilities that matter in your industry."
      />
      <div className="industry-list">
        {localizeContent(
          industries.map(([name, description]) => {
            const Icon = industryIcon(name)
            return (
              <section key={name} id={name.toLowerCase().replaceAll(' ', '-')}>
                <span className="service-symbol" aria-hidden="true">
                  <Icon size={25} strokeWidth={1.6} />
                </span>
                <div>
                  <h2>{localizeContent(name)}</h2>
                  <p>{localizeContent(description)}</p>
                </div>
                <Link
                  className="text-link"
                  to={
                    projects.some((project) => project.industry === name)
                      ? '/portfolio?industry=' + encodeURIComponent(name)
                      : '/contact?industry=' + encodeURIComponent(name)
                  }
                >
                  {localizeContent(
                    projects.some((project) => project.industry === name)
                      ? 'Explore relevant work'
                      : 'Discuss your industry'
                  )}
                  <ArrowUpRight size={18} />
                </Link>
              </section>
            )
          })
        )}
      </div>
      <CTA title={localizeText('Let’s understand your operation.')} />
    </div>
  )
}
