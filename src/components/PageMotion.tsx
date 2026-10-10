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
    // Each portrait/step waits until it is well inside the viewport, including
    // later rows in the mobile timelines. Other page effects retain their timing.
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('motion-arrived')
          revealObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -18% 0px' }
    )
    const main = document.getElementById('main-content')!
    function register() {
      main
        .querySelectorAll(
          '.section-heading, .editorial-visual, .catalog-grid article, .service-row, .industry-list > section, .technology-grid > section, .process-grid, .process-grid > li, .team-grid, .team-card, .values-grid article, .case-section, .note-band, .cta-band'
        )
        .forEach((node) => {
          if (seen.has(node)) return
          seen.add(node)
          if (
            node.matches(
              '.team-grid, .process-grid, .process-grid > li, .team-card'
            )
          ) {
            node.classList.add('motion-ready')
            revealObserver.observe(node)
          } else observer.observe(node)
        })
    }
    register()
    const updates = new MutationObserver(register)
    updates.observe(main, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      revealObserver.disconnect()
      updates.disconnect()
    }
  }, [pathname])
  return null
}
