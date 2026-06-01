import { motion } from 'framer-motion'
import { CheckCircle, Users, Target, Zap } from 'lucide-react'

export default function About() {
  const values = [
    { icon: Target, title: 'Quality First', description: 'We obsess over performance, clarity, and clean UX.' },
    { icon: Users, title: 'Client Focused', description: 'Partnership-first delivery with constant feedback loops.' },
    { icon: Zap, title: 'Innovation', description: 'AI, automation, and modern stacks that scale with you.' },
  ]

  const team = [
    { name: 'Alex Chen', role: 'Founder & CEO', specialty: 'Full Stack Development', initials: 'AC' },
    { name: 'Sarah Kim', role: 'CTO', specialty: 'Architecture & Infrastructure', initials: 'SK' },
    { name: 'John Smith', role: 'Lead Developer', specialty: 'Backend Systems', initials: 'JS' },
    { name: 'Emma Wilson', role: 'UI/UX Designer', specialty: 'User Experience Design', initials: 'EW' },
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
                ABOUT THE COMPANY
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
                <span className="block bg-clip-text text-transparent text-gradient">About Rayan Tech Solutions</span>
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-300 md:text-xl">We craft digital products and platforms with a focus on performance, design, and measurable outcomes. Our teams deliver tailored solutions across web, mobile, and AI.</p>

              <div className="mt-8 flex gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow">Start a Project</a>
                <a href="#portfolio" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80">See Work</a>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }} className="grid gap-4">
              {[
                { title: 'Quality & Performance', desc: 'Performance-first engineering and measurable outcomes.', icon: CheckCircle, color: 'from-blue-500 to-cyan-400' },
                { title: 'Client Partnership', desc: 'Transparent processes and close collaboration.', icon: Users, color: 'from-purple-500 to-pink-500' },
                { title: 'Innovation & Scale', desc: 'AI-first solutions and scalable architectures.', icon: Zap, color: 'from-cyan-400 to-blue-500' },
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
      <section className="py-20 bg-black relative overflow-hidden">
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
                Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To empower businesses through innovative, scalable, and user-centric software solutions. We turn bold ideas into trusted digital products.
              </p>
              <ul className="space-y-3">
                {['Deliver excellence', 'Exceed expectations', 'Build trust'].map((item, idx) => (
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
                Vision
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-6">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To become Afghanistan's trusted software house, delivering cutting-edge solutions that drive growth, trust, and transformation.
              </p>
              <ul className="space-y-3">
                {['Innovation-driven', 'Quality-focused', 'Client-centric'].map((item, idx) => (
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
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
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
                Our Core Values
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
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Talented professionals dedicated to excellence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/40 to-purple-500/40 flex items-center justify-center text-white font-semibold text-lg">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                    <p className="text-blue-300 text-sm">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '30+', label: 'Happy Clients' },
              { number: '100+', label: 'Team Members' },
              { number: '5+', label: 'Years Experience' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
