import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, Instagram, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS, SOCIAL_LINKS } from '../config/company'

export default function Contact() {
  const { t } = useTranslation(['contact', 'common'])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('https://formspree.io/f/mgobepeb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        alert('Failed to send message. Please try again or contact us directly.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to send message. Please try again or contact us directly.')
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: COMPANY_EMAIL,
      href: `mailto:${COMPANY_EMAIL}`,
    },
    {
      icon: Phone,
      title: 'Phone',
      value: COMPANY_PHONE,
      href: `tel:${COMPANY_PHONE}`,
    },
    {
      icon: MapPin,
      title: 'Address',
      value: COMPANY_ADDRESS,
      href: '#',
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-[36vh] bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl mix-blend-screen opacity-60"></div>
          <div className="absolute bottom-[-8%] right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl mix-blend-screen opacity-60"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-16 w-[420px] h-[420px] rounded-full bg-white/6 blur-2xl mix-blend-overlay opacity-30" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('contact:hero.title')}
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('contact:hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {contactInfo.map((info, idx) => (
                <div key={idx} className="rounded-2xl p-4 bg-gradient-to-br from-white/4 to-transparent border border-white/6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                      <info.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{info.title}</h3>
                  </div>
                  <a
                    href={info.href}
                    className="text-gray-300 hover:text-white transition-colors pl-2 block text-sm"
                  >
                    {info.value}
                  </a>
                </div>
              ))}

              {/* Social Links */}
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-gray-900/40 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all shadow-sm"
                      title={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-medium mb-2">{t('contact:form.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder={t('contact:form.namePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">{t('contact:form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder={t('contact:form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-medium mb-2">{t('contact:form.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder={t('contact:form.phonePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">{t('contact:form.subject')}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder={t('contact:form.subjectPlaceholder')}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">{t('contact:form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder={t('contact:form.messagePlaceholder')}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} /> {isLoading ? 'Sending...' : t('contact:form.send')}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('contact:location.title')}
              </span>
            </h2>
            <p className="text-gray-400">{t('contact:location.subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 h-80 shadow-lg"
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="Rayan Tech Solutions Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3367.0!2d69.2075!3d34.5553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16feb5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sKabul%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1234567890"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all w-full h-full"
            ></iframe>

            <div className="absolute left-4 top-4 bg-black/60 rounded-lg p-3 border border-white/6 backdrop-blur-sm">
              <h4 className="text-sm font-semibold text-white">Our Office</h4>
              <p className="text-xs text-gray-300">{COMPANY_ADDRESS}</p>
              <div className="mt-2 flex gap-2">
                <a href={`mailto:${COMPANY_EMAIL}`} className="text-xs text-gray-300 hover:text-white">Email</a>
                <span className="text-gray-600">•</span>
                <a href={`tel:${COMPANY_PHONE}`} className="text-xs text-gray-300 hover:text-white">Call</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('contact:faq.title')}
              </span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {(t('contact:faq.questions', { returnObjects: true }) as any[])?.map((faq: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <details className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 open:border-blue-400/50 open:shadow-lg open:shadow-blue-500/10 transition-all">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-white flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="ml-4 text-blue-300 transition-transform group-open:rotate-180">+</span>
                  </summary>
                  <p className="text-gray-400 mt-4 leading-relaxed">{faq.a}</p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
