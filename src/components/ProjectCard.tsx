import { localizeText, localizeContent } from '../lib/localization'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../config/projects'
import ProjectImage from './ProjectImage'
import TechnologyMark from './TechnologyMark'

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project
  featured?: boolean
}) {
  return (
    <article
      className={'project-card' + (featured ? ' project-card-featured' : '')}
    >
      <Link
        to={'/portfolio/' + project.slug}
        className="project-cover-link"
        aria-label={localizeText('View ' + project.title + ' case study')}
      >
        {localizeContent(
          project.cardCover ? (
            <div className="project-image has-dashboard">
              <img
                src={project.cardCover}
                alt={localizeText(
                  project.title +
                    ' — generated dashboard preview with Rayan branding'
                )}
                loading="lazy"
                decoding="async"
                width="1280"
                height="853"
              />
            </div>
          ) : (
            <ProjectImage
              src={project.image}
              title={localizeText(project.title)}
              category={project.category}
              accent={project.accent}
              fallbackSrc={project.coverIllustration}
              fallbackLabel={
                project.status === 'Concept Project'
                  ? 'Concept illustration'
                  : 'Project illustration'
              }
            />
          )
        )}
        <span className="project-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="project-card-content">
        <div className="project-label">
          <span>{localizeContent(project.industry)}</span>
          <span>
            {localizeContent(
              project.status === 'Concept Project'
                ? 'Concept Project'
                : 'Real Project'
            )}
          </span>
        </div>
        <h3>
          <Link to={'/portfolio/' + project.slug}>
            {localizeContent(project.title)}
          </Link>
        </h3>
        <p>{localizeContent(project.shortDescription)}</p>
        <div className="project-card-footer">
          <div className="stack">
            {localizeContent(
              project.technologies
                .slice(0, 3)
                .map((tech) => <TechnologyMark key={tech} name={tech} />)
            )}
          </div>
          <Link className="text-link" to={'/portfolio/' + project.slug}>
            {localizeText('View case study ')}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}
