import { motion } from 'framer-motion'
import { Code2, Smartphone, ShoppingCart, Zap, Wrench, BarChart3, CheckCircle } from 'lucide-react'

export default function Services() {
  const packages = [
    {
      icon: Code2,
      title: 'Basic Website Package',
      price: 'Custom Quote',
      duration: '1-2 weeks',
      features: [
        '5 pages',
        'Responsive design',
        'Contact form',
        'Basic SEO',
        'Mobile friendly',
      ],
      description: 'Perfect for small businesses starting their online presence',
    },
    {
      icon: Zap,
      title: 'Business Website Package',
      price: 'Custom Quote',
      duration: '2-4 weeks',
      features: [
        '10 pages',
        'Admin panel',
        'Blog/news section',
        'SEO setup',
        'Analytics integration',
        'Email campaigns',
      ],
      description: 'Ideal for growing businesses with advanced features',
      featured: true,
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Package',
      price: 'Custom Quote',
      duration: '3-8 weeks',
      features: [
        'Product catalog',
        'Shopping cart',
        'Secure checkout',
        'Admin dashboard',
        'Order management',
        'Payment integration',
        'Inventory system',
      ],
      description: 'Complete online store solution with full management tools',
    },
    {
      icon: Code2,
      title: 'Custom Software Package',
      price: 'Custom Quote',
      duration: 'Variable',
      features: [
        'Requirements analysis',
        'UI/UX design',
        'Backend development',
        'Frontend development',
        'Database design',
        'Deployment',
        'Support & maintenance',
      ],
      description: 'Tailored solutions for unique business needs',
    },
  ]

  const addOns = [
    {
      icon: BarChart3,
      title: 'SEO Optimization',
      description: 'Boost your search engine rankings and organic traffic',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native iOS and Android applications',
    },
    {
      icon: Wrench,
      title: 'Maintenance & Support',
      description: 'Ongoing support, bug fixes, and feature updates',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Speed up your website and improve user experience',
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-[32vh] bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden flex items-end">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl mix-blend-screen opacity-60"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl mix-blend-screen opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[520px] h-[520px] rounded-full bg-white/5 blur-2xl mix-blend-overlay opacity-40" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6">
          {/* Visual hero only — heading moved below to avoid duplication */}
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center mb-8 mt-2"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">Choose the perfect package for your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ translateY: -10 }}
                className={`group relative rounded-2xl p-6 md:p-8 border transition-all overflow-hidden ${
                  pkg.featured
                    ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-400/70 shadow-2xl shadow-blue-500/20'
                    : 'bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-purple-400/60'
                }`}
              >
                {pkg.featured && (
                  <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white text-xs font-semibold uppercase tracking-[0.2em]">
                    Most Popular
                  </div>
                )}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <pkg.icon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{pkg.title}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{pkg.description}</p>
                <div className="mb-6 pb-6 border-b border-white/10">
                  <p className="text-2xl font-bold text-blue-400">{pkg.price}</p>
                  <p className="text-gray-400 text-sm">Delivery: {pkg.duration}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    pkg.featured
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                      : 'border border-white/20 text-white hover:border-white hover:bg-white/5'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Additional Services</h2>
            <p className="text-gray-400 text-lg">Enhance your package with add-ons</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 hover:border-purple-400/70 hover:shadow-lg hover:shadow-purple-500/10 transition-all text-left"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                  <addon.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{addon.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{addon.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-400 text-lg">How we deliver excellence</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:hidden"></div>
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-white/10"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {['Discovery', 'Design', 'Development', 'Testing', 'Launch'].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="flex md:flex-col items-start md:items-center gap-4">
                    <div className="relative z-10 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                      {idx + 1}
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4 text-left md:text-center w-full">
                      <h3 className="text-lg font-semibold text-white">{step}</h3>
                      <p className="text-xs text-gray-400 mt-2">Aligned milestones with clear delivery checkpoints.</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
