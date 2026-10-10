import { localizeText, localizeContent } from '../lib/localization'
import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'

export default function RotatingHeadline({
  words,
  label,
}: {
  words: string[]
  label: string
}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (paused || reduced || words.length < 2) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % words.length)
    }, 3400)
    return () => window.clearInterval(timer)
  }, [paused, reduced, words.length])
  return (
    <span className="headline-rotation">
      <span className="sr-only">{localizeContent(words[0])}</span>
      <span
        className={'rotating-words' + (paused || reduced ? ' is-paused' : '')}
        aria-hidden="true"
      >
        {localizeContent(
          words.map((word, index) => (
            <span
              className={
                index === active % words.length
                  ? 'rotating-word is-active'
                  : 'rotating-word'
              }
              key={word}
            >
              {localizeContent(word)}
            </span>
          ))
        )}
      </span>
      {localizeContent(
        !reduced && (
          <button
            className="rotation-toggle"
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={localizeText(
              (paused ? 'Resume' : 'Pause') + ' ' + label
            )}
            aria-pressed={paused}
          >
            {localizeContent(paused ? <Play size={13} /> : <Pause size={13} />)}
          </button>
        )
      )}
    </span>
  )
}
