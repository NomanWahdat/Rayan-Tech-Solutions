import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  ChartNoAxesCombined,
  CloudUpload,
  Code2,
  Database,
  GitBranch,
  Globe2,
  HeartPulse,
  Hotel,
  Layers,
  LifeBuoy,
  ListChecks,
  MapPin,
  MessageSquare,
  Palette,
  Pill,
  Rocket,
  Scissors,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  Users,
  Utensils,
  Wallet,
  Warehouse,
  Workflow,
  Wrench,
} from 'lucide-react'

export const processIcons = [
  Search,
  ListChecks,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  LifeBuoy,
]
export const serviceIcons: Record<string, typeof Code2> = {
  'custom-software': Code2,
  'web-applications': Globe2,
  websites: Building2,
  'mobile-apps': Smartphone,
  'business-systems': Layers,
  ecommerce: ShoppingBag,
  'ai-automation': Workflow,
  'ui-ux': Palette,
  backend: Database,
  cloud: CloudUpload,
  support: LifeBuoy,
}
export function industryIcon(name: string) {
  if (/school|education/i.test(name)) return BookOpen
  if (/pharmac|medicine/i.test(name)) return Pill
  if (/hospital|clinic|health/i.test(name)) return HeartPulse
  if (/restaurant/i.test(name)) return Utensils
  if (/tailor|clothing/i.test(name)) return Scissors
  if (/commerce|retail|sales|pos/i.test(name)) return ShoppingBag
  if (/transport|fleet|cargo/i.test(name)) return Truck
  if (/automotive/i.test(name)) return Wrench
  if (/hotel|hospitality/i.test(name)) return Hotel
  if (/account|financial|exchange/i.test(name)) return Wallet
  if (/manufactur|inventory/i.test(name)) return Warehouse
  if (/crm|customer|employee|ngo/i.test(name)) return Users
  if (/report|analytics/i.test(name)) return ChartNoAxesCombined
  if (/automation|erp/i.test(name)) return Workflow
  if (/real estate/i.test(name)) return MapPin
  return BriefcaseBusiness
}
export function technologyIcon(name: string) {
  const icons: Record<string, typeof Code2> = {
    Frontend: Globe2,
    Backend: Code2,
    Mobile: Smartphone,
    Databases: Database,
    Cloud: CloudUpload,
    DevOps: GitBranch,
    AI: Workflow,
    'Tools & APIs': Wrench,
  }
  return icons[name] || Code2
}
export const valueIcons = [Search, Users, Layers, MessageSquare]
