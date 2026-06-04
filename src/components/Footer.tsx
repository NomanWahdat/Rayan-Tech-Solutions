import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS, SOCIAL_LINKS } from '../config/company'
import { DottedSurface } from './DottedSurface'

export default function Footer() {
  const { t } = useTranslation('common')
  const currentYear = new Date().getFullYear()

  const socialIcons = [
    { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
  ]

  const footerLinks = [
    { label: t('common.home'), href: '/' },
    { label: t('common.about'), href: '/about' },
    { label: t('common.services'), href: '/services' },
    { label: t('common.portfolio'), href: '/portfolio' },
    { label: t('common.contact'), href: '/contact' },
  ]

  return (
    <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
      <DottedSurface className="opacity-70" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              {COMPANY_NAME}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white hover:bg-white/5 rounded-md px-2 py-1 -mx-2 transition-all duration-300 hover:-translate-y-0.5 text-sm no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {[
                'Web Development',
                'Mobile Apps',
                'E-Commerce',
                'Custom Software',
                'Maintenance',
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.email')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{COMPANY_EMAIL}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{COMPANY_PHONE}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{COMPANY_ADDRESS}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} {COMPANY_NAME}. {t('footer.copyright')}
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-white hover:bg-white/5 rounded-md px-2 py-1 -mx-2 text-sm transition-all duration-300 hover:-translate-y-0.5 no-underline"
              >
                {t('footer.privacyPolicy')}
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white hover:bg-white/5 rounded-md px-2 py-1 -mx-2 text-sm transition-all duration-300 hover:-translate-y-0.5 no-underline"
              >
                {t('footer.termsOfService')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
