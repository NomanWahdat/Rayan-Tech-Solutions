import { localizeText } from './lib/localization'
import { lazy, Suspense, useEffect, startTransition } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AdvancedNavigation } from './components/AdvancedNavigation'
import Footer from './components/Footer'
import SEO from './components/SEO'
import './config/i18n'
import { loadWebsiteLanguage } from './config/i18n'
import { useTranslation } from 'react-i18next'
import { useLanguage } from './hooks/useLanguage'
import Home from './pages/Home'
import PageMotion from './components/PageMotion'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Industries = lazy(() => import('./pages/Industries'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Products = lazy(() => import('./pages/Products'))
const Technologies = lazy(() => import('./pages/Technologies'))
const Contact = lazy(() => import('./pages/Contact'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToLocation() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    let observer: MutationObserver | undefined
    function scroll() {
      const element = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (element) {
        element.scrollIntoView({ block: 'start' })
        observer?.disconnect()
        return true
      }
      return false
    }
    if (!scroll()) {
      observer = new MutationObserver(scroll)
      observer.observe(document.getElementById('main-content')!, {
        childList: true,
        subtree: true,
      })
    }
    return () => observer?.disconnect()
  }, [pathname, hash])
  return null
}

function LanguageSetup() {
  const { i18n } = useTranslation()
  // Restore only after this Suspense boundary hydrates, so saved RTL preferences
  // cannot replace server-rendered English before lazy routes attach.
  useEffect(() => {
    let active = true
    try {
      const saved = localStorage.getItem('language')
      if (
        saved &&
        ['en', 'fa', 'ps'].includes(saved) &&
        saved !== i18n.language
      ) {
        void loadWebsiteLanguage(saved)
          .then(() => {
            if (active)
              startTransition(() => {
                void i18n.changeLanguage(saved)
              })
          })
          .catch(() => {
            /* Keep English usable if the language asset cannot load. */
          })
      }
    } catch {
      /* Language selection works even when storage is unavailable. */
    }
    return () => {
      active = false
    }
  }, [i18n])
  return null
}
export function Site() {
  const { language, isRTL } = useLanguage()
  return (
    <>
      <a className="skip-link" href="#main-content">
        {localizeText('Skip to main content')}
      </a>
      <AdvancedNavigation />
      <SEO />
      <ScrollToLocation />
      <main
        id="main-content"
        tabIndex={-1}
        lang={language === 'fa' ? 'fa-AF' : language}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <Suspense
          fallback={
            <div className="container route-loading" role="status">
              {localizeText('Loading page…')}
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<CaseStudy />} />
            <Route path="/products" element={<Products />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Legal type="privacy" />} />
            <Route
              path="/terms-and-conditions"
              element={<Legal type="terms" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <LanguageSetup />
          <PageMotion />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
export default function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  )
}
