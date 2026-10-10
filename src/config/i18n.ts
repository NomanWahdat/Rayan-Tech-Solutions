import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { redesignTranslations } from './redesign-translations'

import commonEn from '../locales/en/common.json'
import homeEn from '../locales/en/home.json'
import aboutEn from '../locales/en/about.json'
import servicesEn from '../locales/en/services.json'
import contactEn from '../locales/en/contact.json'

import commonPs from '../locales/ps/common.json'
import homePs from '../locales/ps/home.json'
import aboutPs from '../locales/ps/about.json'
import servicesPs from '../locales/ps/services.json'
import contactPs from '../locales/ps/contact.json'

import commonFa from '../locales/fa/common.json'
import homeFa from '../locales/fa/home.json'
import aboutFa from '../locales/fa/about.json'
import servicesFa from '../locales/fa/services.json'
import contactFa from '../locales/fa/contact.json'

const resources = {
  en: {
    redesign: redesignTranslations.en,
    common: commonEn,
    home: homeEn,
    about: aboutEn,
    services: servicesEn,
    contact: contactEn,
  },
  ps: {
    redesign: redesignTranslations.ps,
    common: commonPs,
    home: homePs,
    about: aboutPs,
    services: servicesPs,
    contact: contactPs,
  },
  fa: {
    redesign: redesignTranslations.fa,
    common: commonFa,
    home: homeFa,
    about: aboutFa,
    services: servicesFa,
    contact: contactFa,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    initAsync: false,
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fa', 'ps'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

const pendingLanguages = new Map<string, Promise<void>>()
/** Load detailed copy only for the chosen language; English needs no extra bundle. */
export function loadWebsiteLanguage(language: string): Promise<void> {
  if (language === 'en') return Promise.resolve()
  if (language !== 'fa' && language !== 'ps')
    return Promise.reject(new Error('Unsupported language'))
  if (!pendingLanguages.has(language)) {
    const loading = (
      language === 'fa'
        ? import('../locales/fa/website.json')
        : import('../locales/ps/website.json')
    )
      .then((module) => {
        i18n.addResourceBundle(language, 'website', module.default, true, true)
      })
      .catch((error) => {
        pendingLanguages.delete(language)
        throw error
      })
    pendingLanguages.set(language, loading)
  }
  return pendingLanguages.get(language)!
}
export default i18n
