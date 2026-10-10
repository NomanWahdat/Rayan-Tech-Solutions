import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Progressive enhancement: content remains readable without JavaScript or motion.
export default function PageMotion() {
  const { pathname } = useLocation()
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!('IntersectionObserver' in window) || preference.matches) return
    const seen = new WeakSet<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('motion-arrived')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.08 }
    )
    const main = document.getElementById('main-content')!
    function register() {
      main
        .querySelectorAll(
          '.section-heading, .editorial-visual, .catalog-grid article, .service-row, .industry-list > section, .technology-grid > section, .process-grid > li, .values-grid article, .case-section, .note-band, .cta-band'
        )
        .forEach((node) => {
          if (seen.has(node)) return
          seen.add(node)
          observer.observe(node)
        })
    }
    register()
    const updates = new MutationObserver(register)
    updates.observe(main, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      updates.disconnect()
    }
  }, [pathname])
  return null
}
