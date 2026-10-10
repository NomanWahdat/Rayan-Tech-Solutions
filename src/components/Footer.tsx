import { localizeText, localizeContent } from '../lib/localization'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Brand from './Brand'
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  SOCIAL_LINKS,
} from '../config/company'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>
              {localizeText('Thoughtful design.')}
              <br />
              {localizeText('Dependable engineering.')}
              <br />
              {localizeText('Software built around your business.')}
            </p>
            <span className="footer-location">
              <span className="small-dot" />
              {localizeContent(COMPANY_ADDRESS)}
            </span>
          </div>
          <div>
            <h2>{localizeText('Explore')}</h2>
            {localizeContent(
              [
                ['Services', '/services'],
                ['Solutions', '/solutions'],
                ['Industries', '/industries'],
                ['Portfolio', '/portfolio'],
                ['Products', '/products'],
                ['Technologies', '/technologies'],
                ['About us', '/about'],
              ].map(([label, href]) => (
                <Link key={href} to={href}>
                  {localizeContent(label)}
                </Link>
              ))
            )}
          </div>
          <div>
            <h2>{localizeText('What we build')}</h2>
            {localizeContent(
              [
                ['Custom software', 'custom-software'],
                ['Web applications', 'web-applications'],
                ['Mobile applications', 'mobile-apps'],
                ['Business systems', 'business-systems'],
                ['E-commerce', 'ecommerce'],
                ['AI & automation', 'ai-automation'],
              ].map(([label, slug]) => (
                <Link key={slug} to={'/services#' + slug}>
                  {localizeContent(label)}
                </Link>
              ))
            )}
          </div>
          <div className="footer-contact">
            <h2>{localizeText('Let’s talk')}</h2>
            <a href={'mailto:' + COMPANY_EMAIL}>
              {localizeContent(COMPANY_EMAIL)}
              <ArrowUpRight size={15} />
            </a>
            <a href={'tel:' + COMPANY_PHONE.replaceAll(' ', '')}>
              {localizeContent(COMPANY_PHONE)}
            </a>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {localizeText('Message on WhatsApp ')}
              <ArrowUpRight size={15} />
            </a>
            <Link to="/contact" className="text-link">
              {localizeText('Tell us about your project ')}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {localizeContent(new Date().getFullYear())}{' '}
            {localizeText(' Rayan Tech Solutions. All rights reserved.')}
          </p>
          <div>
            <Link to="/privacy-policy">{localizeText('Privacy policy')}</Link>
            <Link to="/terms-and-conditions">
              {localizeText('Terms & conditions')}
            </Link>
            <a href="#main-content">{localizeText('Back to top ↑')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
