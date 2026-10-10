import {
  AppWindow,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  CloudCog,
  DatabaseZap,
  Headset,
  Link2,
  MousePointer2,
  PackageCheck,
  PanelsTopLeft,
  PenTool,
  Puzzle,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

const symbols: Record<string, [LucideIcon, LucideIcon]> = {
  'custom-software': [Blocks, Puzzle],
  'web-applications': [AppWindow, Link2],
  websites: [PanelsTopLeft, MousePointer2],
  'mobile-apps': [Smartphone, AppWindow],
  'business-systems': [BriefcaseBusiness, Workflow],
  ecommerce: [ShoppingCart, PackageCheck],
  'ai-automation': [BrainCircuit, Sparkles],
  'ui-ux': [PenTool, MousePointer2],
  backend: [DatabaseZap, ShieldCheck],
  cloud: [CloudCog, ShieldCheck],
  support: [Headset, Wrench],
}

/** Decorative service artwork; the adjacent heading provides its meaning. */
export default function ServiceEmblem({ slug }: { slug: string }) {
  const [Icon, Accent] = symbols[slug] || symbols['custom-software']
  return (
    <span className="service-emblem" aria-hidden="true">
      <span className="service-emblem-back" />
      <span className="service-emblem-face">
        <Icon size={38} strokeWidth={1.7} />
      </span>
      <span className="service-emblem-accent">
        <Accent size={18} strokeWidth={1.8} />
      </span>
    </span>
  )
}
