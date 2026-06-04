import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { COMPANY_NAME, COMPANY_LOGO } from '../config/company'
import { LanguageSwitcher } from './LanguageSwitcher'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation('common')

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { label: t('common.home'), href: '/' },
    { label: t('common.about'), href: '/about' },
    { label: t('common.services'), href: '/services' },
    { label: t('common.portfolio'), href: '/portfolio' },
    { label: t('common.contact'), href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={COMPANY_LOGO} 
              alt={COMPANY_NAME}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-full px-3 py-2 text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/5 hover:text-white hover:shadow-lg hover:shadow-blue-500/10"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Language Switcher + Get Started */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              {t('nav.getStarted')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-700 my-2 px-4 py-2">
              <LanguageSwitcher />
            </div>
            <div className="px-4 py-2">
              <a
                href="#contact"
                className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.getStarted')}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
