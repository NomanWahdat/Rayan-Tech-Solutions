'use client'

import type { ComponentProps, ComponentType } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import {
  BarChart,
  Code,
  FileText,
  Globe,
  Handshake,
  HelpCircle,
  Layers,
  Leaf,
  Menu,
  Plug,
  RotateCcw,
  Shield,
  Star,
  UserPlus,
  Users,
  X,
  ChevronDown,
} from 'lucide-react'

type LinkItem = {
  title: string
  href: string
  icon: ComponentType<{ className?: string }>
  description?: string
}

export function AdvancedNavigation() {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const scrolled = useScroll(10)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent',
        scrolled && 'bg-black/70 supports-[backdrop-filter]:bg-black/40 border-white/10 backdrop-blur-lg'
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-5">
          <Link to="/" className="rounded-full px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/5 hover:shadow-lg hover:shadow-blue-500/10">
            <span className="text-white font-semibold tracking-wide">Rayan Tech</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('product')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full flex items-center gap-1 transition-colors">
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'product' && (
                <div className="absolute left-0 top-full mt-2 w-[560px] rounded-xl border border-white/10 bg-black/90 p-2 shadow-2xl">
                  <ul className="grid grid-cols-2 gap-2 rounded-lg p-2">
                    {productLinks.map((item) => (
                      <li key={item.title}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 pb-3">
                    <p className="text-xs text-gray-400">
                      Want a tailored plan?{' '}
                      <Link to="/contact" className="text-white/90 hover:text-white hover:bg-white/5 rounded-md px-2 py-1 -mx-2 transition-colors">
                        Schedule a call
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full flex items-center gap-1 transition-colors">
                Company
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'company' && (
                <div className="absolute left-0 top-full mt-2 w-[560px] rounded-xl border border-white/10 bg-black/90 p-2 shadow-2xl">
                  <div className="grid grid-cols-2 gap-2">
                    <ul className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-2">
                      {companyLinks.map((item) => (
                        <li key={item.title}>
                          <ListItem {...item} />
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 p-2">
                      {companyLinks2.map((item) => (
                        <li key={item.title}>
                          <Link
                            to={item.href}
                            className="flex items-center gap-2 rounded-lg p-2 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            <item.icon className="size-4" />
                            <span className="font-medium text-sm">{item.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/#portfolio"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10"
            >
              Case Studies
            </Link>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/#contact"
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10"
          >
            Contact
          </Link>
          <Link
            to="/#contact"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      <MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
        <div className="flex w-full flex-col gap-y-2">
          <span className="text-xs text-gray-400">Services</span>
          {productLinks.map((link) => (
            <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
          ))}
          <span className="text-xs text-gray-400 mt-4">Company</span>
          {companyLinks.map((link) => (
            <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
          ))}
          {companyLinks2.map((link) => (
            <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to="/#contact"
            className="w-full border border-white/10 rounded-full text-center py-2 text-gray-200"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/#contact"
            className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </MobileMenu>
    </header>
  )
}

type MobileMenuProps = ComponentProps<'div'> & {
  open: boolean
}

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-black/80 supports-[backdrop-filter]:bg-black/50 backdrop-blur-lg',
        'fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-white/10 md:hidden'
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'size-full p-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

function ListItem({
  title,
  description,
  icon: Icon,
  className,
  href,
  onClick,
}: LinkItem & { className?: string; onClick?: () => void }) {
  return (
    <Link
      to={href}
      className={cn(
        'w-full flex flex-row gap-x-3 rounded-lg p-3 text-gray-200 transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10',
        className
      )}
      onClick={onClick}
    >
      <div className="bg-white/5 flex aspect-square size-12 items-center justify-center rounded-md border border-white/10">
        <Icon className="text-white size-5" />
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="font-medium text-sm">{title}</span>
        {description && (
          <span className="text-gray-400 text-xs">{description}</span>
        )}
      </div>
    </Link>
  )
}

const productLinks: LinkItem[] = [
  {
    title: 'Website Development',
    href: '/#services',
    description: 'Modern, responsive business sites',
    icon: Globe,
  },
  {
    title: 'Mobile Apps',
    href: '/#services',
    description: 'iOS and Android products',
    icon: Layers,
  },
  {
    title: 'Team Collaboration',
    href: '/#team',
    description: 'Tools for high-output teams',
    icon: UserPlus,
  },
  {
    title: 'Analytics',
    href: '/#portfolio',
    description: 'Measure, optimize, grow',
    icon: BarChart,
  },
  {
    title: 'Integrations',
    href: '/#services',
    description: 'Connect systems and services',
    icon: Plug,
  },
  {
    title: 'Custom Software',
    href: '/#services',
    description: 'Tailored enterprise solutions',
    icon: Code,
  },
]

const companyLinks: LinkItem[] = [
  {
    title: 'About Us',
    href: '/#about',
    description: 'Meet the team and mission',
    icon: Users,
  },
  {
    title: 'Customer Stories',
    href: '/#portfolio',
    description: 'Proven outcomes and impact',
    icon: Star,
  },
  {
    title: 'Partnerships',
    href: '/#contact',
    description: 'Collaborate for growth',
    icon: Handshake,
  },
]

const companyLinks2 = [
  { title: 'Terms of Service', href: '/#contact', icon: FileText },
  { title: 'Privacy Policy', href: '/#contact', icon: Shield },
  { title: 'Refund Policy', href: '/#contact', icon: RotateCcw },
  { title: 'Blog', href: '/#portfolio', icon: Leaf },
  { title: 'Help Center', href: '/#contact', icon: HelpCircle },
]

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false)

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold)
  }, [threshold])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    onScroll()
  }, [onScroll])

  return scrolled
}
