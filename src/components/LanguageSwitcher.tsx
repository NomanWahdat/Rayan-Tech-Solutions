import { localizeText } from '../lib/localization'
import { Globe } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useState } from 'react'
export function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <label className="language-switcher">
      <Globe size={14} />
      <span className="sr-only">{localizeText('Website language')}</span>
      <select
        aria-label={localizeText('Website language')}
        value={language}
        disabled={pending}
        aria-busy={pending}
        onChange={async (event) => {
          const next = event.target.value
          setPending(true)
          setFailed(false)
          try {
            await changeLanguage(next)
          } catch {
            setFailed(true)
          } finally {
            setPending(false)
          }
        }}
      >
        <option value="en">{localizeText('English')}</option>
        <option value="ps">پښتو</option>
        <option value="fa">دری</option>
      </select>
      {failed && (
        <span role="alert">
          {localizeText('Could not load the language. Please try again.')}
        </span>
      )}
    </label>
  )
}
