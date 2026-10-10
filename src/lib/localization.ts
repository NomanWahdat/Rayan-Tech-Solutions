import type { ReactNode } from 'react'
import { createElement } from 'react'
import i18n from '../config/i18n'
const indexes = new Map<string, Map<string, string>>()

/** Localize display text only. Routing, filters, form values and project evidence
 * stay in their original source form, so changing language never changes behavior. */
export function localizeText(value: string): string {
  if (!value || i18n.resolvedLanguage === 'en') return value
  const key = value.trim().replace(/\s+/g, ' ')
  const language = i18n.resolvedLanguage || 'en'
  const lookup = (text: string): string | undefined => {
    const normalized = text.trim().replace(/\s+/g, ' ')
    if (!indexes.has(language))
      indexes.set(
        language,
        new Map(
          Object.entries(i18n.getResourceBundle(language, 'website') || {}).map(
            ([key, text]) => [key.toLowerCase(), String(text)]
          )
        )
      )
    return indexes.get(language)?.get(normalized.toLowerCase())
  }
  const exact = lookup(key)
  if (exact) return value.replace(value.trim(), exact)
  const format = (template: string, variables: Record<string, string>) =>
    String(
      i18n.t(template, {
        ns: 'website',
        lng: language,
        keySeparator: false,
        nsSeparator: false,
        ...variables,
      })
    )
  let match = key.match(
    /^Keep (.+) workflows understandable to the people who use them\.$/
  )
  if (match)
    return format(
      'Keep {{industry}} workflows understandable to the people who use them.',
      { industry: localizeText(match[1]) }
    )
  match = key.match(
    /^UX direction for this (.+) brief: keep the main workflow visible, group related records, make status changes explicit, and adapt forms and navigation to smaller screens\.$/
  )
  if (match)
    return format('UX direction for {{industry}}.', {
      industry: localizeText(match[1]),
    })
  match = key.match(/^View (.+) case study$/)
  if (match)
    return format('View {{project}} case study', {
      project: localizeText(match[1]),
    })
  match = key.match(/^Enlarge (.+)$/)
  if (match)
    return format('Enlarge {{caption}}', { caption: localizeText(match[1]) })
  match = key.match(/^(.+) image gallery$/)
  if (match)
    return format('{{project}} image gallery', {
      project: localizeText(match[1]),
    })
  match = key.match(/^in (.+)$/)
  if (match) return format('in {{group}}', { group: localizeText(match[1]) })
  // Compound captions and generated case-study paragraphs reuse translated
  // sentences. Never translate identifiers or arbitrary visitor-entered text.
  const parts = key.split(/(?<=\.) (?=[A-Z])|(?<=;) /)
  if (parts.length > 1) return parts.map(localizeText).join(' ')
  for (const separator of [' — ', ' | ', ' / ', ' · ']) {
    if (key.includes(separator))
      return key.split(separator).map(localizeText).join(separator)
  }
  return value
}

export function localizeContent(value: ReactNode): ReactNode {
  if (typeof value === 'string') {
    const translated = localizeText(value)
    if (
      i18n.resolvedLanguage !== 'en' &&
      translated === value &&
      (/^\+?[\d ]{7,}$/.test(value) ||
        (/^[A-Za-z0-9 .+@/_-]+$/.test(value.trim()) && /[A-Za-z]/.test(value)))
    )
      return createElement('bdi', { dir: 'ltr' }, value)
    return translated
  }
  if (Array.isArray(value)) return value.map(localizeContent)
  return value
}
