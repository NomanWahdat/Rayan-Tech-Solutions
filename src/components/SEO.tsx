import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metadata, structuredData } from '../config/seo'
import { useTranslation } from 'react-i18next'
import { localizeText } from '../lib/localization'

export default function SEO() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  useEffect(() => {
    const original = metadata(pathname)
    const meta = {
      ...original,
      title: localizeText(original.title),
      description: localizeText(original.description),
    }
    document.title = meta.title
    function set(name: string, content: string, property = false) {
      const attribute = property ? 'property' : 'name'
      let element = document.head.querySelector<HTMLMetaElement>(
        'meta[' + attribute + '="' + name + '"]'
      )
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.append(element)
      }
      element.content = content
    }
    set('description', meta.description)
    set('robots', meta.noindex ? 'noindex,follow' : 'index,follow')
    set('og:title', meta.title, true)
    set('og:description', meta.description, true)
    set('og:url', meta.url, true)
    set('og:image', meta.image, true)
    set('og:type', 'website', true)
    set(
      'og:locale',
      i18n.resolvedLanguage === 'fa'
        ? 'fa_AF'
        : i18n.resolvedLanguage === 'ps'
          ? 'ps_AF'
          : 'en_US',
      true
    )
    set('twitter:title', meta.title)
    set('twitter:description', meta.description)
    set('twitter:image', meta.image)
    set('twitter:card', 'summary_large_image')
    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    )
    if (canonical) canonical.href = meta.url
    const schema = document.getElementById('site-schema')
    if (schema) schema.textContent = JSON.stringify(structuredData(pathname))
  }, [pathname, i18n.resolvedLanguage])
  return null
}
