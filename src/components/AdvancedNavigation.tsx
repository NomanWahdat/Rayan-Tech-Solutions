import { localizeText, localizeContent } from '../lib/localization'
import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import Brand from './Brand'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

const links = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Solutions', '/solutions'],
  ['Industries', '/industries'],
  ['Portfolio', '/portfolio'],
]
export function AdvancedNavigation() {
  const { t } = useTranslation('redesign')
  const [open, setOpen] = useState(false)
  const [more, setMore] = useState(false)
  const location = useLocation()
  const destination = location.pathname + location.search + location.hash
  const previousPath = useRef(destination)
  const trigger = useRef<HTMLButtonElement>(null)
  const companyTrigger = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    if (previousPath.current !== destination) {
      setOpen(false)
      setMore(false)
      previousPath.current = destination
    }
  }, [destination])
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape' && (open || more)) {
        setOpen(false)
        setMore(false)
        if (trigger.current?.getClientRects().length) trigger.current.focus()
        else companyTrigger.current?.focus()
      }
    }
    function outside(event: MouseEvent) {
      if (!event.composedPath().includes(header.current as Node)) {
        setOpen(false)
        setMore(false)
      }
    }
    document.addEventListener('keydown', close)
    document.addEventListener('click', outside)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('click', outside)
    }
  }, [open, more])
  return (
    <header className="site-header" ref={header}>
      <div className="nav-shell">
        <Brand />
        <button
          className="menu-toggle"
          ref={trigger}
          aria-label={localizeText(
            open ? 'Close navigation' : 'Open navigation'
          )}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {localizeContent(open ? <X /> : <Menu />)}
        </button>
        <nav
          id="main-navigation"
          aria-label={localizeText('Main navigation')}
          className={open ? 'main-nav is-open' : 'main-nav'}
        >
          {localizeContent(
            links.map(([label, href]) => (
              <NavLink key={href} to={href} end={href === '/'}>
                {localizeContent(t('nav.' + label))}
              </NavLink>
            ))
          )}
          <div className="nav-dropdown">
            <div className="about-nav">
              <NavLink to="/about">{localizeContent(t('nav.About'))}</NavLink>
              <button
                ref={companyTrigger}
                aria-label={localizeText('More company pages')}
                aria-expanded={more}
                aria-controls="company-navigation"
                onClick={() => setMore(!more)}
              >
                <ChevronDown size={14} />
              </button>
            </div>
            {localizeContent(
              more && (
                <div className="dropdown-links" id="company-navigation">
                  <Link to="/products">
                    {localizeContent(t('nav.Products'))}
                  </Link>
                  <Link to="/technologies">
                    {localizeContent(t('nav.Technologies'))}
                  </Link>
                  <Link to="/about#team">{localizeContent(t('nav.Team'))}</Link>
                  <Link to="/about#process">
                    {localizeContent(t('nav.Process'))}
                  </Link>
                </div>
              )
            )}
          </div>
          <LanguageSwitcher />
          <Link className="button button-primary nav-cta" to="/contact">
            {localizeContent(t('start'))} <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  )
}
