import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useLanguage = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
    
    // Set RTL for Pashto and Dari
    if (lng === 'ps' || lng === 'fa') {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute('lang', lng)
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', lng)
    }
  }

  useEffect(() => {
    const currentLng = i18n.language
    if (currentLng === 'ps' || currentLng === 'fa') {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute('lang', currentLng)
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', currentLng)
    }
  }, [i18n.language])

  return {
    language: i18n.language || 'en',
    changeLanguage,
    isRTL: (i18n.language === 'ps' || i18n.language === 'fa'),
  }
}
