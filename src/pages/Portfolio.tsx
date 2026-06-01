import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PortfolioSchemaCard } from '../components/PortfolioSchemaCard'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'BrainLoop: AI-Powered Multi-Vendor E-Learning Platform',
      category: 'featured',
      description: 'A unified e-learning ecosystem with AI customer support and ML recommendations',
      tech: ['Python', 'Django', 'React', 'PostgreSQL', 'OpenAI', 'Stripe'],
      features: [
        'AI customer support agent with intent classification',
        'Multi-vendor course marketplace',
        '1:1 mentoring with Zoom scheduling',
        'ML-powered recommendations',
        'JWT authentication & RBAC',
      ],
      link: '#',
      github: '#',
      image: '/portfolio-logos/brainloop-logo.svg',
    },
    {
      id: 2,
      title: 'AI Recruitment Screening System',
      category: 'ai',
      description: 'Full-stack AI recruitment platform with CV parsing and candidate matching',
      tech: ['Python', 'Django', 'Next.js', 'PostgreSQL', 'Groq', 'Gemini'],
      features: [
        'AI agent-like screening pipeline',
        'Dual AI provider routing',
        'Hybrid ranking engine',
        'Bulk CV upload & processing',
        'Token-based authentication',
      ],
      link: '#',
      github: 'https://github.com/NomanWahdat/ai_recruitment_system',
      image: '/portfolio-logos/ai-recruitment-logo.svg',
    },
    {
      id: 3,
      title: 'AI Resume Analyzer & Interview Assistant',
      category: 'ai',
      description: 'Production-ready AI career platform with resume scoring and interview prep',
      tech: ['React', 'Vite', 'Django', 'Groq', 'Gemini', 'Ollama'],
      features: [
        'Resume parsing with PDF upload',
        'ATS compatibility scoring',
        'Tailored interview questions',
        'Job match analysis',
        'Multi-provider LLM orchestration',
      ],
      link: 'https://ai-resume-analyzer-ruby-gamma.vercel.app',
      github: 'https://github.com/NomanWahdat/ai-resume-analyzer',
      image: '/portfolio-logos/ai-resume-logo.svg',
    },
    {
      id: 4,
      title: 'AI Email & Ticket Assistant',
      category: 'ai',
      description: 'Customer support ticket management with AI categorization and response generation',
      tech: ['Python', 'Django', 'React', 'Ollama', 'Groq', 'Gemini'],
      features: [
        'Automatic ticket categorization',
        'AI response generation',
        'Multi-provider AI engine',
        'JWT authentication',
        'Analytics dashboard',
      ],
      link: '#',
      github: 'https://github.com/NomanWahdat/AI-Email-Ticket-Assistant',
      image: '/portfolio-logos/ai-email-logo.svg',
    },
    {
      id: 5,
      title: 'AI Automation Workflow System',
      category: 'featured',
      description: 'SaaS platform for building AI-powered automation workflows (Zapier + AI)',
      tech: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'Groq'],
      features: [
        'Visual workflow builder',
        'Webhook & form triggers',
        'Multi-provider AI engine',
        'Execution history tracking',
        'Real-time analytics dashboard',
      ],
      link: '#',
      github: 'https://github.com/NomanWahdat/AI-Automation-Workflow-System-Zapier-AI-',
      image: '/portfolio-logos/ai-automation-workflow-logo.svg',
    },
    {
      id: 6,
      title: 'BazarAF - Multi-Vendor E-Commerce Platform',
      category: 'ecommerce',
      description: 'Full-featured multi-vendor marketplace for the Afghan market',
      tech: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'Docker', 'Nginx'],
      features: [
        'Multi-role system (customer, vendor, rider, admin)',
        'Phone-based registration with 2FA',
        'Vendor portal with analytics',
        'Real-time order tracking',
        'Multilingual i18n support',
      ],
      link: 'https://bazar-af-seven.vercel.app/home',
      github: 'https://github.com/NomanWahdat/bazar-frontend',
      image: '/portfolio-logos/bazaaraf-logo.svg',
    },
    {
      id: 7,
      title: 'Secure Data Sanitization Tool',
      category: 'other',
      description: 'Desktop application for permanently erasing sensitive data',
      tech: ['Python', 'Tkinter', 'File Handling'],
      features: [
        'Secure file deletion',
        'Folder sanitization',
        'Drive sanitization',
        'Multiple overwrite patterns',
        'Live logs & statistics',
      ],
      link: '#',
      github: 'https://github.com/NomanWahdat/IS-Project',
      image: '/portfolio-logos/secure-sanitization-logo.svg',
    },
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    { id: 'ai', label: 'AI Solutions' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'other', label: 'Other' },
  ]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  const categoryLabelMap = useMemo(
    () => ({
      featured: 'Featured',
      ai: 'AI Solutions',
      ecommerce: 'E-Commerce',
      other: 'Product',
    }),
    []
  )

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-[48vh] bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-10"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Showcasing our latest projects and success stories
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'border border-gray-600 text-gray-300 hover:border-white hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const hasLive = project.link !== '#'
              const hasCode = project.github !== '#'
              const action = hasLive
                ? { href: project.link, status: 'Live' }
                : hasCode
                  ? { href: project.github, status: 'Case Study' }
                  : { href: '#', status: 'Case Study' }

              const isFeatured = project.category === 'featured'

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <PortfolioSchemaCard
                    badge={categoryLabelMap[project.category as keyof typeof categoryLabelMap] || 'Project'}
                    title={project.title}
                    description={project.description}
                    tech={project.tech}
                    image={project.image}
                    href={action.href}
                    github={project.github}
                    statusLabel={action.status}
                    featured={isFeatured}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects' },
              { number: '30+', label: 'Clients' },
              { number: '100+', label: 'Features' },
              { number: '5+', label: 'Awards' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
