// Original vector diagrams: related software artwork, never fabricated screenshots.
import { readFile, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  BookOpen,
  HeartPulse,
  ShoppingBag,
  Truck,
  Scissors,
  Hotel,
  Factory,
  Sparkles,
  Wallet,
  Users,
  Code2,
  Smartphone,
  Utensils,
  ShieldCheck,
} from 'lucide-react'

const projects = JSON.parse(
  await readFile('public/portfolio-image-slots.json', 'utf8')
)
const themes = [
  [
    /school|brainloop/,
    BookOpen,
    'Learning & administration',
    ['People', 'Classes', 'Records'],
  ],
  [
    /hospital|clinic|prescription|pharmacy/,
    HeartPulse,
    'Healthcare workflows',
    ['Records', 'Appointments', 'Operations'],
  ],
  [
    /tailor/,
    Scissors,
    'Specialized shop workflows',
    ['Customers', 'Garments', 'Delivery'],
  ],
  [
    /cargo|transport|gps/,
    Truck,
    'Connected logistics',
    ['Routes', 'Shipments', 'Visibility'],
  ],
  [
    /hotel/,
    Hotel,
    'Hospitality operations',
    ['Rooms', 'Guests', 'Reservations'],
  ],
  [
    /poultry|manufactur/,
    Factory,
    'Production & operations',
    ['Materials', 'Production', 'Records'],
  ],
  [
    /supermarket|ecommerce|bazaar/,
    ShoppingBag,
    'Commerce & retail',
    ['Catalog', 'Orders', 'Inventory'],
  ],
  [
    /money|accounting/,
    Wallet,
    'Financial workspaces',
    ['Entries', 'Balances', 'Reports'],
  ],
  [
    /crm/,
    Users,
    'Customer relationships',
    ['Contacts', 'Activity', 'Pipeline'],
  ],
  [
    /mobile-shop/,
    Smartphone,
    'Retail device operations',
    ['Devices', 'Stock', 'Sales'],
  ],
  [
    /restaurant/,
    Utensils,
    'Service & kitchen workflows',
    ['Orders', 'Kitchen', 'Service'],
  ],
  [
    /sanitization/,
    ShieldCheck,
    'Controlled data workflows',
    ['Selection', 'Review', 'Execution'],
  ],
  [
    /ai-|automation/,
    Sparkles,
    'Assisted digital workflows',
    ['Inputs', 'Processing', 'Review'],
  ],
]
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;')
for (const project of projects) {
  const theme = themes.find(([pattern]) => pattern.test(project.slug)) || [
    null,
    Code2,
    'Software engineering',
    ['Interfaces', 'Logic', 'Data'],
  ]
  const [, Icon, label, modules] = theme
  const icon = renderToStaticMarkup(
    createElement(Icon, { size: 86, strokeWidth: 1.3, color: '#035ffd' })
  )
  const color = /health|pharma|school/.test(project.slug)
    ? '#dce9ea'
    : /cargo|ai-/.test(project.slug)
      ? '#e0e5f4'
      : '#e2eafa'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="775" viewBox="0 0 1200 775">
<title>${escape(project.title)} — related software illustration</title>
<desc>Original conceptual workflow artwork. This is not a screenshot of a delivered project.</desc>
<defs><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#7896b5" stroke-opacity=".09"/></pattern><filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#153661" flood-opacity=".12"/></filter></defs>
<rect width="1200" height="775" fill="${color}"/><rect width="1200" height="775" fill="url(#grid)"/>
<path d="M890 0H1200V310Z" fill="#035ffd" fill-opacity=".055"/><circle cx="600" cy="350" r="246" fill="none" stroke="#93afd2" stroke-opacity=".35"/><path d="M132 383H1068" stroke="#94acd0" stroke-dasharray="7 10"/>
<g transform="translate(350 115) rotate(-5 270 170)" filter="url(#shadow)"><rect width="540" height="346" rx="14" fill="#fff" stroke="#cad9eb"/><path d="M0 48H540" stroke="#dce5f1"/><rect x="23" y="20" width="110" height="8" rx="4" fill="#cedcf0"/><path d="M488 24h22" stroke="#035ffd" stroke-width="3"/>
<rect x="36" y="79" width="115" height="216" rx="8" fill="#edf2fa"/><rect x="54" y="101" width="72" height="8" rx="4" fill="#bccfea"/><rect x="54" y="134" width="54" height="8" rx="4" fill="#d3dff0"/><rect x="54" y="167" width="66" height="8" rx="4" fill="#d3dff0"/>
<g transform="translate(225 98)">${icon}</g><path d="M194 219h263M194 244h208M194 270h235" stroke="#dce5f1" stroke-width="8" stroke-linecap="round"/></g>
<g transform="translate(170 406) rotate(-5 150 60)" filter="url(#shadow)"><rect width="300" height="123" rx="9" fill="#132238"/><path d="M28 34h47" stroke="#91b7ff" stroke-width="3"/><text x="28" y="84" fill="#fff" font-family="Arial,sans-serif" font-size="27">${escape(modules[0])}</text></g>
<g transform="translate(476 462) rotate(4 150 60)" filter="url(#shadow)"><rect width="300" height="123" rx="9" fill="#fff" stroke="#c3d4e9"/><path d="M28 34h47" stroke="#035ffd" stroke-width="3"/><text x="28" y="84" fill="#132238" font-family="Arial,sans-serif" font-size="27">${escape(modules[1])}</text></g>
<g transform="translate(790 390) rotate(-5 120 60)" filter="url(#shadow)"><rect width="270" height="123" rx="9" fill="#035ffd"/><path d="M28 34h47" stroke="#a9cbff" stroke-width="3"/><text x="28" y="84" fill="#fff" font-family="Arial,sans-serif" font-size="27">${escape(modules[2])}</text></g>
<text x="64" y="670" fill="#132238" font-family="Arial,sans-serif" font-size="33">${escape(label)}</text><path d="M1060 649h50v50m-50 0 50-50" fill="none" stroke="#035ffd" stroke-width="3"/>
</svg>`
  await writeFile(
    'public/images/portfolio/' + project.slug + '/illustration.svg',
    svg
  )
}
console.log(
  'Created ' +
    projects.length +
    ' original, explicitly conceptual portfolio cover illustrations.'
)
