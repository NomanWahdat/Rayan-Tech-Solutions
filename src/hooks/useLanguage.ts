import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { loadWebsiteLanguage } from '../config/i18n'

export const useLanguage = () => {
  const { i18n } = useTranslation()

  const changeLanguage = async (lng: string) => {
    if (!['en', 'ps', 'fa'].includes(lng)) return
    await loadWebsiteLanguage(lng)
    await i18n.changeLanguage(lng)
    try {
      localStorage.setItem('language', lng)
    } catch {
      /* Language still works without persistence. */
    }

    // Set RTL for Pashto and Dari
    if (lng === 'ps' || lng === 'fa') {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute(
        'lang',
        lng === 'fa' ? 'fa-AF' : lng
      )
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute(
        'lang',
        lng === 'fa' ? 'fa-AF' : lng
      )
    }
  }

  useEffect(() => {
    const currentLng = i18n.language
    if (currentLng === 'ps' || currentLng === 'fa') {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute(
        'lang',
        currentLng === 'fa' ? 'fa-AF' : currentLng
      )
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute(
        'lang',
        currentLng === 'fa' ? 'fa-AF' : currentLng
      )
    }
  }, [i18n.language])

  return {
    language: i18n.language || 'en',
    changeLanguage,
    isRTL: i18n.language === 'ps' || i18n.language === 'fa',
  }
}
