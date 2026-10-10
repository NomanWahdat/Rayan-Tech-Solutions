import { localizeText, localizeContent } from '../lib/localization'
import { Link, useParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, Layers } from 'lucide-react'
import { getProject } from '../config/projects'
import { CTA } from '../components/Shared'
import ProjectImage from '../components/ProjectImage'
import ProjectCard from '../components/ProjectCard'
import ProjectGallery from '../components/ProjectGallery'
import NotFound from './NotFound'
import TechnologyMark from '../components/TechnologyMark'

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="case-section-title">
      <span className="section-tick" aria-hidden="true" />
      <h2>{localizeContent(title)}</h2>
    </div>
  )
}
export default function CaseStudy() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  if (!project) return <NotFound />
  const related = project.relatedProjects
    .map(getProject)
    .filter((project) => project !== undefined)
  return (
    <article className="container page-shell case-study">
      <Link to="/portfolio" className="text-link back-link">
        <ArrowLeft size={16} />
        {localizeText('Back to portfolio')}
      </Link>
      <header className="case-hero">
        <div>
          <div className="case-labels">
            <span className="eyebrow">
              {localizeContent(project.industry)} /{' '}
              {localizeContent(project.category)}
            </span>
            <span className="status-badge">
              {localizeContent(project.status)}
            </span>
          </div>
          <h1>{localizeContent(project.title)}</h1>
          <p className="lead">{localizeContent(project.shortDescription)}</p>
        </div>
        <a
          className="round-link"
          href="#overview"
          aria-label={localizeText('Read project overview')}
        >
          <ArrowDown size={23} />
        </a>
      </header>
      <ProjectImage
        key={project.image}
        src={project.image}
        title={localizeText(project.title)}
        category={project.category}
        accent={project.accent}
        priority
        fallbackSrc={project.coverIllustration}
        fallbackLabel={
          project.status === 'Concept Project'
            ? 'Concept illustration'
            : 'Project illustration'
        }
      />
      {localizeContent(
        project.review && (
          <div className="case-review">
            <span>{localizeContent(project.review.access)}</span>
            <p>
              {localizeText('Reference inspected')}
              {localizeContent(' ')}
              <time dateTime={project.review.checkedOn}>
                {localizeText('October 10, 2026')}
              </time>
              {localizeText(
                '. Screenshots show the available interface; sample records and figures are not verified operating results.'
              )}
            </p>
          </div>
        )
      )}
      <div className="case-layout">
        <aside className="case-sidebar">
          <span className="eyebrow">{localizeText('INSIDE THE PROJECT')}</span>
          <nav aria-label={localizeText('Case study contents')}>
            {localizeContent(
              [
                ['overview', 'Overview'],
                ['problem', 'Problem & goals'],
                ['solution', 'Approach & solution'],
                ['engineering', 'Engineering'],
                ['gallery', 'Project gallery'],
                ['outcome', 'Outcome'],
              ].map(([id, label]) => (
                <a key={id} href={'#' + id}>
                  {localizeContent(label)}
                  <ArrowUpRight size={13} />
                </a>
              ))
            )}
          </nav>
          <div className="case-sidebar-meta">
            <span>
              {localizeText('Project type')}
              <strong>{localizeContent(project.category)}</strong>
            </span>
            <span>
              {localizeText('Industry')}
              <strong>{localizeContent(project.industry)}</strong>
            </span>
            <span>
              {localizeText('Status')}
              <strong>{localizeContent(project.status)}</strong>
            </span>
            <span>
              {localizeText('Role')}
              <strong>{localizeContent(project.role)}</strong>
            </span>
          </div>
        </aside>
        <div className="case-body">
          <section className="case-section" id="overview">
            <SectionTitle title={localizeText('Project overview')} />
            <p>{localizeContent(project.overview)}</p>
            <div className="evidence-note">
              <Layers size={18} />
              <p>{localizeContent(project.evidence)}</p>
            </div>
            <dl className="overview-details">
              <div>
                <dt>{localizeText('Services / scope')}</dt>
                <dd>{localizeContent(project.category)}</dd>
              </div>
              <div>
                <dt>{localizeText('Contributors')}</dt>
                <dd>{localizeContent(project.team)}</dd>
              </div>
            </dl>
          </section>
          <section className="case-section" id="problem">
            <SectionTitle title={localizeText('The business problem')} />
            <p>{localizeContent(project.problem)}</p>
          </section>
          <section className="case-section">
            <SectionTitle
              title={localizeText('Goals, requirements & constraints')}
            />
            <ul className="check-list">
              {localizeContent(
                project.goals.map((goal) => (
                  <li key={goal}>
                    <Check size={16} />
                    {localizeContent(goal)}
                  </li>
                ))
              )}
            </ul>
            <h3>{localizeText('Working constraints')}</h3>
            <ul className="plain-list">
              {localizeContent(
                project.constraints.map((constraint) => (
                  <li key={constraint}>{localizeContent(constraint)}</li>
                ))
              )}
            </ul>
          </section>
          <section className="case-section">
            <SectionTitle
              title={localizeText('Discovery & available context')}
            />
            <p>{localizeContent(project.research)}</p>
          </section>
          <section className="case-section" id="solution">
            <SectionTitle
              title={localizeText(
                project.status === 'Concept Project'
                  ? 'Proposed solution'
                  : 'Solution & documented scope'
              )}
            />
            <p>{localizeContent(project.solution)}</p>
          </section>
          <section className="case-section">
            <SectionTitle title={localizeText('Features & functional scope')} />
            {localizeContent(
              project.features.length > 0 ? (
                <ul className="feature-grid">
                  {localizeContent(
                    project.features.map((feature) => (
                      <li key={feature}>
                        <Check size={17} />
                        {localizeContent(feature)}
                      </li>
                    ))
                  )}
                </ul>
              ) : (
                <>
                  <p className="scope-note">
                    {localizeContent(
                      project.status === 'Concept Project'
                        ? 'Proposed modules for this concept.'
                        : 'Scope areas for review; implemented features have not yet been verified.'
                    )}
                  </p>
                  <ul className="feature-grid">
                    {localizeContent(
                      project.proposedFeatures.map((feature) => (
                        <li key={feature}>
                          <Layers size={17} />
                          {localizeContent(feature)}
                        </li>
                      ))
                    )}
                  </ul>
                </>
              )
            )}
          </section>
          <section className="case-section">
            <SectionTitle title={localizeText('User experience & interface')} />
            <p>{localizeContent(project.ux)}</p>
          </section>
          <section className="case-section" id="engineering">
            <SectionTitle title={localizeText('System architecture')} />
            {localizeContent(
              project.architecture.length > 0 ? (
                <>
                  <p>
                    {localizeText(
                      'Layers below show only the technology information currently documented for this project.'
                    )}
                  </p>
                  <div className="architecture-diagram">
                    {localizeContent(
                      project.architecture.map((layer, index) => (
                        <div key={layer.layer}>
                          <span>{localizeContent(layer.layer)}</span>
                          <strong>{localizeContent(layer.detail)}</strong>
                          {localizeContent(
                            index < project.architecture.length - 1 && (
                              <ArrowDown size={19} />
                            )
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <p>
                  {localizeText(
                    'Project architecture has not been supplied. The interface, application layer, database, and integrations will be documented when source information is available.'
                  )}
                </p>
              )
            )}
          </section>
          <section className="case-section">
            <SectionTitle title={localizeText('Technical implementation')} />
            <div className="implementation-list">
              {localizeContent(
                project.implementation.map((item) => (
                  <div key={item.area}>
                    <h3>{localizeContent(item.area)}</h3>
                    <p>{localizeContent(item.detail)}</p>
                  </div>
                ))
              )}
            </div>
          </section>
          <section className="case-section">
            <SectionTitle title={localizeText('Challenges & solutions')} />
            {localizeContent(
              project.challenges.length ? (
                project.challenges.map((challenge) => (
                  <div className="challenge-row" key={challenge.challenge}>
                    <h3>{localizeContent(challenge.challenge)}</h3>
                    <p>{localizeContent(challenge.approach)}</p>
                    <p>{localizeContent(challenge.solution)}</p>
                  </div>
                ))
              ) : (
                <p>
                  {localizeText(
                    'A project-specific challenge log has not been provided. Technical incidents, tradeoffs, and their resolutions can be added here when verified.'
                  )}
                </p>
              )
            )}
          </section>
          <section className="case-section" id="outcome">
            <SectionTitle title={localizeText('Results & outcome')} />
            {localizeContent(
              project.results.map((result) => (
                <p key={result}>{localizeContent(result)}</p>
              ))
            )}
          </section>
        </div>
      </div>
      <section className="case-gallery-section" id="gallery">
        <SectionTitle title={localizeText('Inside the interface')} />
        <p className="gallery-intro">
          {localizeText(
            'Captured interfaces are labeled with the screen and review context. Select an available screenshot to view it in detail.'
          )}
        </p>
        <ProjectGallery key={project.slug} project={project} />
      </section>
      <div className="case-final-details">
        <section className="case-section">
          <SectionTitle title={localizeText('Technology stack')} />
          {localizeContent(
            project.technologyGroups.length ? (
              project.technologyGroups.map((group) => (
                <div key={group.group}>
                  <h3>{localizeContent(group.group)}</h3>
                  <div className="stack">
                    {localizeContent(
                      group.items.map((technology) => (
                        <TechnologyMark key={technology} name={technology} />
                      ))
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>
                {localizeText(
                  'The technology stack is awaiting source confirmation. Hosting URLs are not used to infer frameworks or databases.'
                )}
              </p>
            )
          )}
        </section>
        <section className="case-section">
          <SectionTitle title={localizeText('Project links')} />
          {localizeContent(
            project.liveUrl || project.githubUrl ? (
              <div className="hero-actions">
                {localizeContent(
                  project.liveUrl && (
                    <a
                      className="button button-primary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {localizeText('View live project ')}
                      <ArrowUpRight size={17} />
                    </a>
                  )
                )}
                {localizeContent(
                  project.githubUrl && (
                    <a
                      className="button button-outline"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {localizeText('View GitHub repository ')}
                      <ArrowUpRight size={17} />
                    </a>
                  )
                )}
              </div>
            ) : (
              <p>
                {localizeText(
                  'Public project and repository links have not been added.'
                )}
              </p>
            )
          )}
        </section>
        <section className="case-section">
          <SectionTitle title={localizeText('Project status')} />
          <span className="status-badge">
            {localizeContent(project.status)}
          </span>
          <p>
            {localizeContent(
              project.status === 'Concept Project'
                ? 'A proposed solution direction, clearly distinguished from delivered work.'
                : project.status === 'Production'
                  ? 'Production status recorded in the company profile; current operating details are not independently verified.'
                  : project.status === 'Prototype'
                    ? 'A demonstration reference. Production use and final delivery are not claimed.'
                    : 'A company-supplied portfolio project. Delivery milestones and operational results are not documented.'
            )}
          </p>
        </section>
      </div>
      <section className="related-section">
        <SectionTitle title={localizeText('Explore related work')} />
        <div className="project-grid">
          {localizeContent(
            related.map((project) => (
              <ProjectCard project={project!} key={project!.slug} />
            ))
          )}
        </div>
      </section>
      <span className="eyebrow final-cta-number">
        {localizeText('YOUR NEXT PROJECT')}
      </span>
      <CTA title={localizeText('Have a similar business challenge?')} />
    </article>
  )
}
