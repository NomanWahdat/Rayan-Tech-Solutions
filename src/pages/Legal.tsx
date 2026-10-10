import { localizeText, localizeContent } from '../lib/localization'
import { Link } from 'react-router-dom'
import { COMPANY_EMAIL } from '../config/company'
import { PageIntro } from '../components/Shared'

export default function Legal({ type }: { type: 'privacy' | 'terms' }) {
  const privacy = type === 'privacy'
  return (
    <div className="container page-shell legal-page">
      <PageIntro
        label="WEBSITE INFORMATION"
        title={localizeText(privacy ? 'Privacy policy' : 'Terms & conditions')}
        description={
          privacy
            ? 'How this website handles information you choose to share.'
            : 'The scope of this website and how project engagements are agreed.'
        }
      />
      <div className="legal-content">
        {localizeContent(
          privacy ? (
            <>
              <section>
                <h2>{localizeText('Information you provide')}</h2>
                <p>
                  {localizeText(
                    'The project inquiry form asks for your name, company, email, optional phone number, project details, and contact preferences. Share only the information needed to discuss the project; do not include passwords or sensitive personal records.'
                  )}
                </p>
              </section>
              <section>
                <h2>{localizeText('Sending an inquiry')}</h2>
                <p>
                  {localizeText(
                    'Email inquiries are sent through our server-side submission service and email delivery provider. The form confirms sending only after the provider accepts the message. Selecting WhatsApp opens a message containing your brief; you review and send it in WhatsApp. If sending fails, your entered details remain on the page so you can retry.'
                  )}
                </p>
              </section>
              <section>
                <h2>{localizeText('Use of information')}</h2>
                <p>
                  {localizeText(
                    'Information received from an inquiry is used to respond, discuss requirements, and plan a possible project. For questions about your submitted information or to request its removal, contact'
                  )}
                  {localizeContent(' ')}
                  <a href={'mailto:' + COMPANY_EMAIL}>
                    {localizeContent(COMPANY_EMAIL)}
                  </a>
                  .
                </p>
              </section>
              <section>
                <h2>{localizeText('Browser storage and third parties')}</h2>
                <p>
                  {localizeText(
                    'This implementation includes no advertising trackers or analytics scripts. Optional screenshots are served from this website. Email submission uses a third-party delivery service. Email and WhatsApp links open services with their own privacy policies. Hosting infrastructure may process routine request logs under its own policies.'
                  )}
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2>{localizeText('Website content')}</h2>
                <p>
                  {localizeText(
                    'This website introduces Rayan Tech Solutions and its software capabilities. Portfolio entries distinguish company projects, prototypes, and concepts. Proposed modules are not promises of existing functionality. Unverified client information and performance metrics are not presented as results.'
                  )}
                </p>
              </section>
              <section>
                <h2>{localizeText('Project agreements')}</h2>
                <p>
                  {localizeText(
                    'Submitting or preparing an inquiry does not create a development contract. Scope, delivery milestones, pricing, payments, ownership, support, and other project terms must be agreed separately in writing.'
                  )}
                </p>
              </section>
              <section>
                <h2>{localizeText('Portfolio materials')}</h2>
                <p>
                  {localizeText(
                    'Project descriptions and interface previews are provided to explain the work. A concept entry is not a publicly available product. Access, licensing, source-code availability, and customization are discussed individually.'
                  )}
                </p>
              </section>
              <section>
                <h2>{localizeText('External services and updates')}</h2>
                <p>
                  {localizeText(
                    'Third-party services and linked websites operate independently. Information may be updated as projects evolve. Contact us to confirm the details relevant to an engagement.'
                  )}
                </p>
              </section>
            </>
          )
        )}
        <section>
          <h2>{localizeText('Contact')}</h2>
          <p>
            {localizeText('For website or project questions,')}
            {localizeContent(' ')}
            <Link to="/contact">
              {localizeText('start a conversation')}
            </Link>{' '}
            {localizeText(' or email')}
            {localizeContent(' ')}
            <a href={'mailto:' + COMPANY_EMAIL}>
              {localizeContent(COMPANY_EMAIL)}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
