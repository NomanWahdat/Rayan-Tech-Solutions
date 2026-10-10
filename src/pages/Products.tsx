import { localizeText, localizeContent } from '../lib/localization'
import { CTA, PageIntro } from '../components/Shared'
import { projects } from '../config/projects'
import ProjectCard from '../components/ProjectCard'

export default function Products() {
  const products = projects.filter((project) =>
    [
      'bazaaraf',
      'school-management-system',
      'tailoring-management-system',
      'supermarket-management-system',
      'pharmacy-management-system',
    ].includes(project.slug)
  )
  return (
    <div className="container page-shell">
      <PageIntro
        visual="design"
        label="PRODUCTS & BUSINESS PLATFORMS"
        title={localizeText('A foundation for the next chapter.')}
        description="Explore software in our company portfolio. Each case study explains its documented scope and current status. Availability, licensing, customization, and support are discussed individually."
      />
      <div className="project-grid">
        {localizeContent(
          products.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))
        )}
      </div>
      <CTA title={localizeText('Need a system adapted to your business?')} />
    </div>
  )
}
