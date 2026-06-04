import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

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
    common: commonEn,
    home: homeEn,
    about: aboutEn,
    services: servicesEn,
    contact: contactEn,
  },
  ps: {
    common: commonPs,
    home: homePs,
    about: aboutPs,
    services: servicesPs,
    contact: contactPs,
  },
  fa: {
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
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
