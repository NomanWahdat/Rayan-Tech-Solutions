import { localizeText, localizeContent } from '../lib/localization'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { technologyGroups } from '../config/catalog'
import { CTA, PageIntro } from '../components/Shared'
import TechnologyMark from '../components/TechnologyMark'

const technologies = technologyGroups.flatMap(([group, items]) =>
  items.map((name) => ({ group, name }))
)
export default function Technologies() {
  const [group, setGroup] = useState('All technologies')
  const [search, setSearch] = useState('')
  const filtered = technologies.filter(
    (item) =>
      (group === 'All technologies' || group === item.group) &&
      item.name.toLowerCase().includes(search.trim().toLowerCase())
  )
  return (
    <div className="container page-shell technologies-page">
      <PageIntro
        visual="infrastructure"
        label="THE ENGINEERING TOOLKIT"
        title={localizeText('Your next product. The right technology.')}
        description="Interfaces, data, infrastructure, and AI tools. Explore our documented capabilities, then choose a stack around the work your product needs to do."
      />
      <section
        className="technology-directory"
        aria-label={localizeText('Technology directory')}
      >
        <div className="technology-directory-heading">
          <div>
            <span className="eyebrow">
              {localizeText('EXPLORE OUR EXPERTISE')}
            </span>
            <h2>{localizeText('Find your technology.')}</h2>
          </div>
          <label className="technology-search">
            <Search size={20} aria-hidden="true" />
            <input
              type="search"
              aria-label={localizeText('Search technologies')}
              placeholder={localizeText('Search a technology…')}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
        <div
          className="technology-category-filters"
          role="group"
          aria-label={localizeText('Filter technologies')}
        >
          {localizeContent(
            ['All technologies', ...technologyGroups.map(([name]) => name)].map(
              (name) => (
                <button
                  key={name}
                  aria-pressed={group === name}
                  onClick={() => setGroup(name)}
                >
                  {localizeContent(name)}
                </button>
              )
            )
          )}
        </div>
        <div className="technology-results">
          <p role="status">
            {localizeContent(filtered.length)}
            {localizeContent(' ')}
            {localizeContent(
              filtered.length === 1 ? 'capability' : 'capabilities'
            )}
            {localizeContent(' ')}
            {localizeContent(
              group === 'All technologies'
                ? 'across the engineering toolkit'
                : 'in ' + group.toLowerCase()
            )}
          </p>
          {localizeContent(
            (search || group !== 'All technologies') && (
              <button
                className="text-link"
                onClick={() => {
                  setSearch('')
                  setGroup('All technologies')
                }}
              >
                {localizeText('Clear filters ')}
                <X size={15} />
              </button>
            )
          )}
        </div>
        {localizeContent(
          filtered.length ? (
            <div className="technology-catalog">
              {localizeContent(
                filtered.map(({ name, group: category }) => (
                  <Link
                    className="technology-card"
                    key={category + name}
                    to={
                      '/contact?type=' +
                      encodeURIComponent(name + ' development')
                    }
                  >
                    <TechnologyMark name={name} showName={false} />
                    <h3>{localizeContent(name)}</h3>
                    <span className="technology-card-category">
                      {localizeContent(category)}
                    </span>
                    <ArrowUpRight
                      className="technology-card-arrow"
                      size={18}
                      aria-hidden="true"
                    />
                  </Link>
                ))
              )}
            </div>
          ) : (
            <div className="empty-state">
              <h3>{localizeText('No matching technology.')}</h3>
              <p>
                {localizeText(
                  'Try another name or clear the filters to see our full toolkit.'
                )}
              </p>
              <button
                className="button button-outline"
                onClick={() => {
                  setSearch('')
                  setGroup('All technologies')
                }}
              >
                {localizeText('Show all technologies')}
              </button>
            </div>
          )
        )}
      </section>
      <section className="technology-choice">
        <div>
          <span className="eyebrow">
            {localizeText('THE STACK FOLLOWS THE PROBLEM')}
          </span>
          <h2>
            {localizeText('Choose for the work.')}
            <br />
            <span className="accent-word">
              {localizeText('Build for what’s next.')}
            </span>
          </h2>
        </div>
        <div>
          <p>
            {localizeText(
              'Data requirements, deployment constraints, maintainability, and the people using the system shape the architecture. We discuss these before recommending a stack.'
            )}
          </p>
          <p>
            {localizeText(
              'These are company capabilities. Confirmed technologies for individual projects are documented in their case studies.'
            )}
          </p>
          <Link className="text-link" to="/portfolio">
            {localizeText('Explore the engineering portfolio ')}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <CTA />
    </div>
  )
}
