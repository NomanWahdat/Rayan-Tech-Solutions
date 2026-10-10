import { localizeText, localizeContent } from '../lib/localization'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { projects } from '../config/projects'
import { CTA, PageIntro } from '../components/Shared'
import ProjectCard from '../components/ProjectCard'

const categories = [
  'All work',
  ...new Set(projects.map((project) => project.category)),
]
export default function Portfolio() {
  const [params, setParams] = useSearchParams()
  const currentParams = useRef(params)
  useEffect(() => {
    currentParams.current = params
  }, [params])
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const activeParams = hydrated ? params : new URLSearchParams()
  const category = activeParams.get('category') || 'All work'
  const industry = activeParams.get('industry') || ''
  const technology = activeParams.get('technology') || ''
  const status = activeParams.get('status') || ''
  const search = activeParams.get('q') || ''
  function update(name: string, value: string) {
    // Keep consecutive interactions from restoring a filter from a stale render.
    const next = new URLSearchParams(currentParams.current)
    if (!value || value === 'All work') next.delete(name)
    else next.set(name, value)
    commit(next)
  }
  function commit(next: URLSearchParams) {
    currentParams.current = next
    setParams(next, { replace: true })
  }
  const filtered = projects
    .filter(
      (project) =>
        (category === 'All work' || project.category === category) &&
        (!industry || project.industry === industry) &&
        (!technology || project.technologies.includes(technology)) &&
        (!status ||
          (status === 'concept'
            ? project.status === 'Concept Project'
            : project.status !== 'Concept Project')) &&
        (
          localizeText(project.title) +
          ' ' +
          project.title +
          ' ' +
          localizeText(project.shortDescription) +
          ' ' +
          project.shortDescription +
          ' ' +
          localizeText(project.industry) +
          ' ' +
          project.industry
        )
          .toLowerCase()
          .includes(search.toLowerCase())
    )
    .sort((a, b) => Number(b.featured) - Number(a.featured))
  return (
    <div className="container page-shell">
      <PageIntro
        visual="engineering"
        label="THE ENGINEERING PORTFOLIO"
        title={localizeText('Real work. Clear thinking. Useful software.')}
        description="Explore the business context behind our software projects, alongside clearly labeled concepts for future solutions. Go beyond the interface: understand the problem, scope, and engineering approach."
      />
      <p className="portfolio-preview-note">
        {localizeText(
          'Card images are designed dashboard previews. Available project screenshots and verified implementation details appear in each case study.'
        )}
      </p>
      <div className="portfolio-toolbar">
        <div
          className="category-filters"
          aria-label={localizeText('Filter by project category')}
        >
          {localizeContent(
            categories.map((item) => (
              <button
                aria-pressed={category === item}
                className={category === item ? 'active' : ''}
                key={item}
                onClick={() => update('category', item)}
              >
                {localizeContent(item)}
              </button>
            ))
          )}
        </div>
        <div className="portfolio-controls">
          <div className="search-field">
            <Search size={17} />
            <input
              aria-label={localizeText('Search projects')}
              placeholder={localizeText('Find a project…')}
              value={search}
              onChange={(event) => update('q', event.target.value)}
            />
          </div>
          <label>
            <SlidersHorizontal size={16} />
            <span className="sr-only">{localizeText('Industry')}</span>
            <select
              value={industry}
              onChange={(event) => update('industry', event.target.value)}
            >
              <option value="">{localizeText('All industries')}</option>
              {localizeContent(
                [...new Set(projects.map((project) => project.industry))]
                  .sort()
                  .map((item) => (
                    <option key={item} value={item}>
                      {localizeContent(item)}
                    </option>
                  ))
              )}
            </select>
          </label>
          <label>
            <span className="sr-only">{localizeText('Technology')}</span>
            <select
              value={technology}
              onChange={(event) => update('technology', event.target.value)}
            >
              <option value="">{localizeText('All technologies')}</option>
              {localizeContent(
                [
                  ...new Set(
                    projects.flatMap((project) => project.technologies)
                  ),
                ]
                  .sort()
                  .map((item) => (
                    <option key={item} value={item}>
                      {localizeContent(item)}
                    </option>
                  ))
              )}
            </select>
          </label>
          <label>
            <span className="sr-only">{localizeText('Project status')}</span>
            <select
              value={status}
              onChange={(event) => update('status', event.target.value)}
            >
              <option value="">{localizeText('All project types')}</option>
              <option value="real">{localizeText('Company projects')}</option>
              <option value="concept">
                {localizeText('Concept projects')}
              </option>
            </select>
          </label>
        </div>
        <div className="filter-summary">
          <p aria-live="polite">
            {localizeContent(filtered.length)}{' '}
            {localizeContent(filtered.length === 1 ? 'project' : 'projects')}
            {localizeContent(
              activeParams.size
                ? ' matching your filters'
                : ' · Company work and concept briefs'
            )}
          </p>
          {localizeContent(
            activeParams.size > 0 && (
              <button
                className="text-link"
                onClick={() => commit(new URLSearchParams())}
              >
                {localizeText('Clear filters ')}
                <X size={14} />
              </button>
            )
          )}
        </div>
      </div>
      {localizeContent(
        filtered.length ? (
          <div className="project-grid">
            {localizeContent(
              filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))
            )}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h2>{localizeText('No projects match these filters.')}</h2>
            <p>
              {localizeText(
                'Try a different search or explore all of our work.'
              )}
            </p>
            <button
              className="button button-dark"
              onClick={() => commit(new URLSearchParams())}
            >
              {localizeText('Show all projects')}
            </button>
          </div>
        )
      )}
      <CTA title={localizeText('Have a similar business challenge?')} />
    </div>
  )
}
