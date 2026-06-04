import { motion } from 'framer-motion'
import { CheckCircle, Users, Target, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation(['about', 'common'])

  const values = [
    { icon: Target, title: t('about:values.items.0.title'), description: t('about:values.items.0.description') },
    { icon: Users, title: t('about:values.items.1.title'), description: t('about:values.items.1.description') },
    { icon: Zap, title: t('about:values.items.2.title'), description: t('about:values.items.2.description') },
  ]

  const team = [
    { name: 'Noman Wahdat', role: 'Founder & CEO', specialty: 'Full Stack Development', image: '/team/noman-wahdat.jpeg' },
    { name: 'Arman Malik', role: 'CTO', specialty: 'Architecture & Infrastructure', image: '/team/arman-malik.jpeg' },
    { name: 'Khoshal Amin', role: 'Lead Developer', specialty: 'Backend Systems', image: '/team/khoshal-amin.jpeg' },
    { name: 'Hameedullah Gul', role: 'UI/UX Designer', specialty: 'User Experience Design', image: '/team/hameedullah-gul.jpeg' },
  ]

  return (
    <div className="pt-0">
      {/* Hero Section - replaced with new animated company hero */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/12 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/12 rounded-full blur-3xl"></div>
          {/* stronger radial light to continue hero's center glow into the About area (bigger & stronger) */}
          <div
            className="absolute inset-x-0 -top-44 h-[520px] pointer-events-none mix-blend-overlay opacity-80"
            style={{
              background: 'radial-gradient(1100px 480px at 20% 28%, rgba(255,255,255,0.16), rgba(255,255,255,0) 55%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } } }}
            className="grid items-center gap-10 lg:grid-cols-2"
          >
            <motion.div variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }} className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] bg-clip-text text-transparent text-gradient">
                {t('about:badge')}
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
                <span className="block bg-clip-text text-transparent text-gradient">{t('about:title')}</span>
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-300 md:text-xl">{t('about:description')}</p>

              <div className="mt-8 flex gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow">{t('about:startProject')}</a>
                <a href="#portfolio" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80">{t('about:seeWork')}</a>
              </div>

              {/* Compact Stats */}
              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { number: '50+', label: t('about:stats.projects') },
                  { number: '30+', label: t('about:stats.clients') },
                  { number: '100+', label: t('about:stats.team') },
                  { number: '5+', label: t('about:stats.years') },
                ].map((stat, idx) => (
                  <div key={idx} className="text-left">
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{stat.number}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }} className="grid gap-4">
              {[
                { title: t('about:features.quality.title'), desc: t('about:features.quality.description'), icon: CheckCircle, color: 'from-blue-500 to-cyan-400' },
                { title: t('about:features.partnership.title'), desc: t('about:features.partnership.description'), icon: Users, color: 'from-purple-500 to-pink-500' },
                { title: t('about:features.innovation.title'), desc: t('about:features.innovation.description'), icon: Zap, color: 'from-cyan-400 to-blue-500' },
              ].map((f, idx) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.06 }} whileHover={{ y: -6 }} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/60 via-black/30 to-transparent p-4 md:p-6 shadow-2xl">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/6 to-transparent mix-blend-overlay"></div>
                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-white/2 to-transparent opacity-6 blur-2xl"></div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center">
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-md`}>
                        <f.icon size={18} />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{f.title}</div>
                      <div className="text-sm text-gray-300 mt-1">{f.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] bg-clip-text text-transparent text-gradient">
                {t('about:mission.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-6">{t('about:mission.title')}</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {t('about:mission.description')}
              </p>
              <ul className="space-y-3">
                {t('about:mission.items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="text-blue-400 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] bg-clip-text text-transparent text-gradient">
                {t('about:vision.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-6">{t('about:vision.title')}</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {t('about:vision.description')}
              </p>
              <ul className="space-y-3">
                {t('about:vision.items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="text-purple-400 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('about:values.title')}
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ scale: 1.02 }}
                className="relative group overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-black/60 via-black/30 to-transparent shadow-2xl transition-transform"
              >
                {/* subtle overlay to pick up hero tones */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/6 to-transparent mix-blend-overlay"></div>
                  <div className="absolute top-4 right-4 h-36 w-36 rounded-full bg-gradient-to-br from-white/3 to-transparent opacity-5 blur-2xl"></div>
                </div>

                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                    <value.icon size={28} className="text-white drop-shadow-lg" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed max-w-sm">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('about:team.title')}
              </span>
            </h2>
            <p className="text-gray-400 text-lg">{t('about:team.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col"
              >
                {/* Image - Top of Card */}
                <div className="w-full aspect-square overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex-shrink-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"%3E%3Crect fill="%23374151" width="300" height="300"/%3E%3C/svg%3E'
                    }}
                  />
                </div>

                {/* Info - Bottom of Card */}
                <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2">{member.name}</h3>
                    <p className="text-blue-300 text-xs sm:text-sm font-medium mt-2">{member.role}</p>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mt-3">{member.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
