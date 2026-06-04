import { useLanguage } from '../hooks/useLanguage'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ps', name: 'پشتو', flag: '🇦🇫' },
    { code: 'fa', name: 'دری', flag: '🇦🇫' },
  ]

  const currentLang = languages.find(l => l.code === language) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/50 text-white hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400 transition-all text-xs font-medium hover:shadow-lg hover:shadow-blue-500/20"
        title="Change Language"
      >
        <Globe size={14} className="text-blue-400" />
        <span className="uppercase font-semibold">{currentLang.code}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 right-0 bg-gray-900 border border-white/10 rounded-lg shadow-lg z-50 min-w-40 overflow-hidden"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-all ${
                language === lang.code
                  ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-500'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
