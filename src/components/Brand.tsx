import { localizeText } from '../lib/localization'
import { Link } from 'react-router-dom'

export default function Brand() {
  return (
    <Link
      className="brand"
      to="/"
      aria-label={localizeText('Rayan Tech Solutions home')}
    >
      <img
        className="brand-logo"
        src="/Favicon%2064x64.png"
        alt={localizeText('')}
        width="43"
        height="43"
      />
      <span className="brand-name">
        {localizeText('RAYAN')}
        <span>{localizeText('TECH SOLUTIONS')}</span>
      </span>
    </Link>
  )
}
