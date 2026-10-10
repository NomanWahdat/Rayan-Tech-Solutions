import { localizeText } from '../lib/localization'
import { Link } from 'react-router-dom'
import { PageIntro } from '../components/Shared'

export default function NotFound() {
  return (
    <div className="container page-shell not-found">
      <PageIntro
        label="404 / PAGE NOT FOUND"
        title={localizeText('Let’s get you back on track.')}
        description="This page could not be found. Explore our work or return to the homepage."
      />
      <div className="hero-actions">
        <Link className="button button-primary" to="/">
          {localizeText('Back to home')}
        </Link>
        <Link className="button button-outline" to="/portfolio">
          {localizeText('Explore the portfolio')}
        </Link>
      </div>
    </div>
  )
}
