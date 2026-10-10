import { localizeText, localizeContent } from '../lib/localization'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  SOCIAL_LINKS,
} from '../config/company'
import { industries, services } from '../config/catalog'
import { PageIntro } from '../components/Shared'
import EditorialVisual from '../components/EditorialVisual'

type Inquiry = {
  name: string
  company: string
  email: string
  phone: string
  type: string
  industry: string
  budget: string
  description: string
  method: string
  website: string
}
const endpoint = import.meta.env?.VITE_CONTACT_ENDPOINT || '/api/inquiry'
export default function Contact() {
  const [params] = useSearchParams()
  const [form, setForm] = useState<Inquiry>({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: '',
    industry: '',
    budget: '',
    description: '',
    method: 'Email',
    website: '',
  })
  useEffect(() => {
    setForm((current) => ({
      ...current,
      type: params.get('type') || '',
      industry: params.get('industry') || '',
    }))
  }, [params])
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const [ready, setReady] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState('')
  const result = useRef<HTMLDivElement>(null)
  function change(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
    setReady(false)
    setSent(false)
    setCopied(false)
    setError('')
  }
  const text = [
    localizeText('Project inquiry — Rayan Tech Solutions'),
    localizeText('Name') + ': ' + form.name,
    localizeText('Company') +
      ': ' +
      (form.company || localizeText('Not specified')),
    localizeText('Email') + ': ' + form.email,
    localizeText('Phone / WhatsApp') +
      ': ' +
      (form.phone || localizeText('Not specified')),
    localizeText('Project type') + ': ' + localizeText(form.type),
    localizeText('Industry') +
      ': ' +
      localizeText(form.industry || 'Not specified'),
    localizeText('Budget') +
      ': ' +
      localizeText(form.budget || 'To be discussed'),
    localizeText('Preferred contact') + ': ' + localizeText(form.method),
    '',
    localizeText('Project description') + ':',
    form.description,
  ].join('\n')
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending || sent) return
    setError('')
    if (!form.name.trim() || form.description.trim().length < 20) {
      setError(
        'Please add your name and at least 20 characters describing the project.'
      )
      return
    }
    if (form.method !== 'Email' && !form.phone.trim()) {
      setError(
        'Add your phone / WhatsApp number for your preferred contact method.'
      )
      return
    }
    if (form.method === 'WhatsApp') {
      window.open(
        SOCIAL_LINKS.whatsapp + '?text=' + encodeURIComponent(text),
        '_blank',
        'noopener,noreferrer'
      )
      setReady(true)
      requestAnimationFrame(() => result.current?.focus())
      return
    }
    setPending(true)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(15000),
      })
      const body = await response.json().catch(() => null)
      if (!response.ok || body?.success !== true)
        throw new Error(
          body?.error ||
            'Your inquiry could not be confirmed. Please retry or send it on WhatsApp.'
        )
      setSent(true)
      setReady(true)
      requestAnimationFrame(() => result.current?.focus())
    } catch (error) {
      setError(
        error instanceof Error && error.name === 'TimeoutError'
          ? 'The request timed out. Your details are still here. Please retry or contact us directly.'
          : error instanceof Error
            ? error.message
            : 'We could not confirm your inquiry. Your details are still here. Please retry or contact us on WhatsApp.'
      )
    } finally {
      setPending(false)
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setCopyError('')
    } catch {
      setCopyError(
        'Copy is unavailable in this browser. Select and copy the inquiry text below.'
      )
    }
  }
  const projectTypes = [
    ...new Set([
      ...services.map((service) => service.title),
      ...(form.type ? [form.type] : []),
    ]),
  ]
  return (
    <div className="container page-shell">
      <PageIntro
        label="START A PROJECT"
        title={localizeText('Tell us what needs to work better.')}
        description="An idea, an existing product, or a daily workflow that needs a better system. Share the context, and we’ll help you define a practical next step."
      />
      <div className="contact-layout">
        <div>
          <form className="inquiry-form" onSubmit={submit}>
            <div className="form-heading">
              <span className="eyebrow">
                {localizeText('YOUR PROJECT BRIEF')}
              </span>
              <p>{localizeText('Fields marked * are required.')}</p>
            </div>
            <label className="inquiry-honeypot" aria-hidden="true">
              {localizeText('Website')}
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={change}
              />
            </label>
            <fieldset className="form-grid" disabled={pending}>
              <legend className="sr-only">
                {localizeText('Your project and contact details')}
              </legend>
              <label htmlFor="name">
                {localizeText('Your name *')}
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={change}
                  placeholder={localizeText('Full name')}
                />
              </label>
              <label htmlFor="company">
                {localizeText('Company')}
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  maxLength={150}
                  value={form.company}
                  onChange={change}
                  placeholder={localizeText('Company or organization')}
                />
              </label>
              <label htmlFor="email">
                {localizeText('Email address *')}
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={change}
                  placeholder={localizeText('you@company.com')}
                />
              </label>
              <label htmlFor="phone">
                {localizeText('Phone / WhatsApp')}
                {localizeContent(form.method !== 'Email' ? ' *' : '')}
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required={form.method !== 'Email'}
                  minLength={7}
                  maxLength={40}
                  value={form.phone}
                  onChange={change}
                  placeholder={localizeText('+93 …')}
                />
              </label>
              <label htmlFor="type">
                {localizeText('Project type *')}
                <select
                  id="type"
                  name="type"
                  required
                  value={form.type}
                  onChange={change}
                >
                  <option value="">
                    {localizeText('Select a project type')}
                  </option>
                  {localizeContent(
                    projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {localizeContent(type)}
                      </option>
                    ))
                  )}
                  <option value={'Not sure yet — let’s discuss'}>
                    {localizeText('Not sure yet — let’s discuss')}
                  </option>
                </select>
              </label>
              <label htmlFor="industry">
                {localizeText('Industry')}
                <select
                  id="industry"
                  name="industry"
                  value={form.industry}
                  onChange={change}
                >
                  <option value="">
                    {localizeText('Select your industry')}
                  </option>
                  {localizeContent(
                    [
                      ...new Set([
                        ...industries.map(([name]) => name),
                        ...(form.industry ? [form.industry] : []),
                      ]),
                    ].map((name) => (
                      <option key={name} value={name}>
                        {localizeContent(name)}
                      </option>
                    ))
                  )}
                  <option value={'Other'}>{localizeText('Other')}</option>
                </select>
              </label>
              <label htmlFor="budget">
                {localizeText('Budget range')}
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={change}
                >
                  <option value="">{localizeText('To be discussed')}</option>
                  <option value={'Under $1,000 USD'}>
                    {localizeText('Under $1,000 USD')}
                  </option>
                  <option value={'$1,000–$5,000 USD'}>
                    {localizeText('$1,000–$5,000 USD')}
                  </option>
                  <option value={'$5,000–$15,000 USD'}>
                    {localizeText('$5,000–$15,000 USD')}
                  </option>
                  <option value={'$15,000+ USD'}>
                    {localizeText('$15,000+ USD')}
                  </option>
                </select>
              </label>
              <label htmlFor="method">
                {localizeText('Preferred contact method')}
                <select
                  id="method"
                  name="method"
                  value={form.method}
                  onChange={change}
                >
                  <option value={'Email'}>{localizeText('Email')}</option>
                  <option value={'WhatsApp'}>{localizeText('WhatsApp')}</option>
                  <option value={'Phone call'}>
                    {localizeText('Phone call')}
                  </option>
                </select>
              </label>
              <label className="full-field" htmlFor="description">
                {localizeText('Project description *')}
                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={20}
                  maxLength={5000}
                  rows={6}
                  value={form.description}
                  onChange={change}
                  placeholder={localizeText(
                    'What does your business do? What do you want to build or improve? Tell us about the people, processes, and important requirements.'
                  )}
                  aria-describedby="description-hint"
                />
                <small id="description-hint">
                  {localizeText(
                    'At least 20 characters. Please leave out passwords and sensitive records.'
                  )}
                </small>
              </label>
            </fieldset>
            <p className="form-privacy">
              {localizeText(
                'Your details are used to discuss this project. Read our'
              )}
              {localizeContent(' ')}
              <Link to="/privacy-policy">{localizeText('privacy policy')}</Link>
              .
            </p>
            {localizeContent(
              error && (
                <div role="alert" className="form-error">
                  {localizeContent(error)}
                  <a
                    className="text-link"
                    href={
                      SOCIAL_LINKS.whatsapp +
                      '?text=' +
                      encodeURIComponent(text)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {localizeText('Send your brief on WhatsApp ')}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              )
            )}
            <button
              className="button button-primary"
              type="submit"
              disabled={pending || sent}
            >
              {localizeContent(
                pending
                  ? 'Sending…'
                  : sent
                    ? 'Inquiry sent'
                    : form.method === 'WhatsApp'
                      ? 'Continue on WhatsApp'
                      : 'Send project inquiry'
              )}
              <ArrowUpRight size={18} />
            </button>
            <p className="form-help">
              {localizeContent(
                form.method === 'WhatsApp'
                  ? 'Opens your completed brief in WhatsApp. Tap Send there to finish.'
                  : 'Send your brief directly from this form. We’ll reply using your contact details.'
              )}
            </p>
          </form>
          {localizeContent(
            ready && (
              <div
                className="inquiry-result"
                ref={result}
                tabIndex={-1}
                role="status"
              >
                <span className="result-icon">
                  <Check size={22} />
                </span>
                <h2>
                  {localizeContent(
                    sent
                      ? 'Your project inquiry has been sent.'
                      : 'Continue your inquiry on WhatsApp.'
                  )}
                </h2>
                <p>
                  {localizeContent(
                    sent
                      ? 'Your brief was accepted by our email service. We’ll follow up using the contact details you provided.'
                      : 'WhatsApp opens with your completed brief. Review the message and tap Send. If it did not open, use the button below.'
                  )}
                </p>
                {localizeContent(
                  !sent && (
                    <div className="hero-actions">
                      <a
                        className="button button-outline"
                        href={
                          SOCIAL_LINKS.whatsapp +
                          '?text=' +
                          encodeURIComponent(text)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle size={17} />
                        {localizeText('Send via WhatsApp')}
                      </a>
                    </div>
                  )
                )}
                <details>
                  <summary>{localizeText('Review inquiry text')}</summary>
                  <pre>{localizeContent(text)}</pre>
                </details>
                <button className="text-link" onClick={copy}>
                  <Copy size={15} />
                  {localizeContent(
                    copied ? 'Copied to clipboard' : 'Copy inquiry'
                  )}
                </button>
                {localizeContent(
                  copyError && <p role="alert">{localizeContent(copyError)}</p>
                )}
              </div>
            )
          )}
        </div>
        <aside className="contact-aside">
          <EditorialVisual kind="design" compact />
          <h2>
            {localizeText('Let’s start with')}
            <br />
            {localizeText('your business.')}
          </h2>
          <p>
            {localizeText(
              'No need for a finished specification. Tell us what you’re trying to achieve and where the work gets difficult.'
            )}
          </p>
          <div className="contact-details">
            <a href={'mailto:' + COMPANY_EMAIL}>
              <Mail size={20} />
              <span>
                <small>{localizeText('Email')}</small>
                {localizeContent(COMPANY_EMAIL)}
              </span>
            </a>
            <a href={'tel:' + COMPANY_PHONE.replaceAll(' ', '')}>
              <Phone size={20} />
              <span>
                <small>{localizeText('Phone / WhatsApp')}</small>
                {localizeContent(COMPANY_PHONE)}
              </span>
            </a>
            <div>
              <MapPin size={20} />
              <span>
                <small>{localizeText('Based in')}</small>
                {localizeContent(COMPANY_ADDRESS)}
              </span>
            </div>
          </div>
          <a
            className="text-link"
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            {localizeText('Start on WhatsApp ')}
            <ArrowUpRight size={18} />
          </a>
          <div className="contact-expectations">
            <h3>{localizeText('What happens next?')}</h3>
            <ol>
              <li>{localizeText('We review the business context.')}</li>
              <li>{localizeText('We clarify requirements and priorities.')}</li>
              <li>
                {localizeText('We discuss scope and a delivery approach.')}
              </li>
            </ol>
          </div>
        </aside>
      </div>
      <section className="faq-section section">
        <span className="eyebrow">{localizeText('BEFORE WE START')}</span>
        <h2>{localizeText('A few useful answers.')}</h2>
        {localizeContent(
          [
            [
              'Do I need a complete project specification?',
              'No. Start with the business problem and the people who will use the system. We can discuss workflows and priorities with you.',
            ],
            [
              'How are cost and timeline determined?',
              'Cost and delivery depend on scope, integrations, data requirements, and the agreed milestones. We discuss these after understanding the project.',
            ],
            [
              'Can you improve existing software?',
              'We can review the existing code, architecture, and workflows to identify a practical improvement plan.',
            ],
            [
              'What happens after launch?',
              'Maintenance, updates, monitoring, and technical support can be scoped as part of the project agreement.',
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {localizeContent(question)}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{localizeContent(answer)}</p>
            </details>
          ))
        )}
      </section>
    </div>
  )
}
