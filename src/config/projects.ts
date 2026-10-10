import { projectObservations } from './project-observations'

export type ProjectImage = { src: string; caption: string }
export type Project = {
  id: string
  slug: string
  title: string
  category: string
  industry: string
  status:
    | 'Real Project'
    | 'Portfolio Project'
    | 'Concept Project'
    | 'Prototype'
    | 'Production'
  evidence: string
  shortDescription: string
  overview: string
  problem: string
  goals: string[]
  constraints: string[]
  research: string
  solution: string
  features: string[]
  proposedFeatures: string[]
  ux: string
  architecture: { layer: string; detail: string }[]
  implementation: { area: string; detail: string }[]
  challenges: { challenge: string; approach: string; solution: string }[]
  results: string[]
  role: string
  team: string
  technologies: string[]
  technologyGroups: { group: string; items: string[] }[]
  images: ProjectImage[]
  image: string
  gallery: string[]
  liveUrl: string
  githubUrl: string
  sourceUrl: string
  relatedProjects: string[]
  featured: boolean
  accent: string
  coverIllustration: string
  cardCover?: string
  review?: { checkedOn: string; access: string }
}
type Brief = {
  slug: string
  title: string
  category: string
  industry: string
  description: string
  problem: string
  modules: string[]
  files: string[]
  sourceUrl?: string
  technologies?: string[]
  features?: string[]
  status?: Project['status']
  evidence?: string
  featured?: boolean
  accent?: string
}
const briefs: Brief[] = [
  {
    slug: 'brainloop',
    title: 'BrainLoop E-Learning Platform',
    category: 'AI & Automation',
    industry: 'Education',
    description:
      'A learning platform with a course marketplace, mentoring, and AI-assisted support.',
    problem:
      'Learners, course vendors, and mentors need different workflows within the same learning platform. Support and course discovery must connect to the learning experience.',
    modules: ['Learning marketplace'],
    features: [
      'Multi-vendor course marketplace',
      'AI customer support with intent classification',
      'Mentoring with Zoom scheduling',
      'Recommendation features',
      'JWT authentication and role-based access',
    ],
    technologies: [
      'Python',
      'Django',
      'React',
      'PostgreSQL',
      'OpenAI',
      'Stripe',
    ],
    files: [
      'hero',
      'dashboard',
      'courses',
      'mentoring',
      'ai-assistant',
      'mobile',
    ],
    evidence:
      'Retained from the existing committed portfolio. Features and stack are documented there; client identities and measured outcomes are not supplied.',
    accent: 'lavender',
  },
  {
    slug: 'ai-recruitment-screening',
    title: 'AI Recruitment Screening',
    category: 'AI & Automation',
    industry: 'Professional Services',
    description:
      'A recruitment workspace for CV processing, screening, and candidate matching.',
    problem:
      'Recruitment teams need a consistent way to review uploaded CVs, relate them to job requirements, and inspect ranking suggestions before making human hiring decisions.',
    modules: ['Recruitment workflows'],
    features: [
      'Screening pipeline',
      'Dual AI provider routing',
      'Hybrid ranking engine',
      'Bulk CV upload and processing',
      'Token-based authentication',
    ],
    technologies: [
      'Python',
      'Django',
      'Next.js',
      'PostgreSQL',
      'Groq',
      'Gemini',
    ],
    files: [
      'hero',
      'dashboard',
      'candidates',
      'screening',
      'reports',
      'mobile',
    ],
    evidence:
      'Recorded in the existing committed portfolio. No hiring accuracy, fairness, or hiring-outcome claims are made.',
    accent: 'mint',
  },
  {
    slug: 'ai-resume-analyzer',
    title: 'AI Resume & Interview Assistant',
    category: 'AI & Automation',
    industry: 'Professional Services',
    description:
      'A career workspace combining resume analysis, job matching, and interview preparation.',
    problem:
      'Job applicants need to understand how their resume relates to a role and prepare relevant interview questions. Automated suggestions must remain distinguishable from hiring decisions.',
    modules: ['Career tools'],
    features: [
      'Resume parsing with PDF upload',
      'ATS compatibility scoring',
      'Tailored interview questions',
      'Job match analysis',
      'Multiple model providers',
    ],
    technologies: ['React', 'Vite', 'Django', 'Groq', 'Gemini', 'Ollama'],
    files: ['hero', 'dashboard', 'resume-analysis', 'interview', 'mobile'],
    sourceUrl: 'https://ai-resume-analyzer-ruby-gamma.vercel.app',
    evidence:
      'Retained from the existing committed portfolio. Its documented features do not establish verified analysis accuracy or employment outcomes.',
    accent: 'sand',
  },
  {
    slug: 'ai-email-ticket-assistant',
    title: 'AI Email & Ticket Assistant',
    category: 'AI & Automation',
    industry: 'Professional Services',
    description:
      'A support workspace for ticket organization and AI-assisted responses.',
    problem:
      'Support teams need to organize incoming requests and review possible responses without losing control of the final message sent to a customer.',
    modules: ['Support operations'],
    features: [
      'Ticket categorization',
      'AI response generation',
      'Multiple AI providers',
      'JWT authentication',
      'Analytics dashboard',
    ],
    technologies: ['Python', 'Django', 'React', 'Ollama', 'Groq', 'Gemini'],
    files: ['hero', 'dashboard', 'tickets', 'responses', 'analytics', 'mobile'],
    evidence:
      'Retained from the existing committed portfolio. No response quality or support performance metrics are claimed.',
    accent: 'peach',
  },
  {
    slug: 'ai-workflow-system',
    title: 'AI Automation Workflow System',
    category: 'AI & Automation',
    industry: 'Cross-industry',
    description:
      'A visual workflow builder connecting triggers, AI-assisted steps, and execution history.',
    problem:
      'Teams need to connect triggers and actions while retaining visibility into execution history. AI processing requires reviewable inputs and predictable operational boundaries.',
    modules: ['Automation workflows'],
    features: [
      'Visual workflow builder',
      'Webhook and form triggers',
      'Multiple AI providers',
      'Execution history',
      'Analytics dashboard',
    ],
    technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'Groq'],
    files: [
      'hero',
      'dashboard',
      'workflow-builder',
      'execution-history',
      'analytics',
      'mobile',
    ],
    evidence:
      'Retained from the committed portfolio. No automation reliability or business impact metrics are supplied.',
    accent: 'lavender',
  },
  {
    slug: 'secure-data-sanitization',
    title: 'Secure Data Sanitization Tool',
    category: 'Custom Software',
    industry: 'Professional Services',
    description:
      'A desktop utility for controlled file removal, drive sanitization, and operation logs.',
    problem:
      'A data-removal utility needs to make the selected target and progress clear. Removal methods and their effectiveness depend on the storage hardware and operating environment.',
    modules: ['Data removal'],
    features: [
      'File and folder removal',
      'Drive sanitization workflows',
      'Multiple overwrite patterns',
      'Live logs and statistics',
    ],
    technologies: ['Python', 'Tkinter', 'File handling'],
    files: ['hero', 'interface', 'file-selection', 'logs'],
    evidence:
      'Retained from the committed portfolio. No sanitization certification, guaranteed irrecoverability, or standards compliance is claimed.',
    accent: 'mint',
  },
  {
    slug: 'bazaaraf',
    title: 'BazarAF',
    sourceUrl: 'https://bazar-af-seven.vercel.app/home',
    category: 'E-Commerce',
    industry: 'E-Commerce',
    description: 'A multi-vendor marketplace built around the Afghan market.',
    problem:
      'A marketplace must coordinate customers, independent sellers, and administrators without mixing their responsibilities. Product listings, order handling, and cash-on-delivery fulfillment need a shared, consistent workflow.',
    modules: [
      'Seller onboarding',
      'Product catalog',
      'Order management',
      'Cash-on-delivery workflow',
    ],
    features: [
      'Seller onboarding',
      'OTP-based authentication',
      'Admin and seller dashboards',
      'Order management',
      'Cash-on-delivery payment flow',
    ],
    technologies: ['React', 'Django', 'PostgreSQL', 'Vercel'],
    files: [
      'hero',
      'homepage',
      'products',
      'product-details',
      'cart',
      'checkout',
      'orders',
      'admin-dashboard',
      'seller-dashboard',
      'mobile',
    ],
    status: 'Production',
    evidence:
      'The existing company profile documents the marketplace, its modules, stack, and production deployment. Current operating metrics and client details are not supplied.',
    featured: true,
    accent: 'peach',
  },
  {
    slug: 'school-management-system',
    title: 'School Management System',
    status: 'Real Project',
    category: 'Management Systems',
    industry: 'Education',
    description:
      'Bring school records, attendance, and academic administration into one workspace.',
    problem:
      'Student information, attendance sheets, grades, and parent communication are often maintained separately. School staff need connected records and relevant access for each role.',
    modules: [
      'Students and teachers',
      'Classes and timetable',
      'Fees and results',
      'Announcements',
    ],
    features: [
      'Student records',
      'Attendance tracking',
      'Grading and report cards',
      'Parent-teacher communication',
      'Administrator, teacher, and parent access',
    ],
    technologies: ['Django', 'PostgreSQL', 'REST API'],
    files: [
      'hero',
      'dashboard',
      'students',
      'teachers',
      'attendance',
      'timetable',
      'fees',
      'reports',
      'mobile',
      'classes',
      'exams',
      'teacher-dashboard',
    ],
    sourceUrl: 'https://school-management-system-two-teal.vercel.app',
    evidence:
      'The company profile describes the listed features and stack. A project reference was also supplied by the company; it has not been inspected behind authentication.',
    featured: true,
    accent: 'mint',
  },
  {
    slug: 'hospital-management-system',
    title: 'Hospital Management System',
    category: 'Business Systems',
    industry: 'Healthcare',
    description:
      'A portfolio system focused on the daily coordination of hospital operations.',
    problem:
      'Hospital administration involves several handoffs between appointments, departments, patient records, and billing. Disconnected records make these handoffs harder to trace.',
    modules: [
      'Patients and doctors',
      'Appointments and departments',
      'Medical records and prescriptions',
      'Billing and reporting',
    ],
    files: [
      'hero',
      'dashboard',
      'patients',
      'appointments',
      'doctors',
      'medical-records',
      'billing',
      'reports',
      'mobile',
    ],
    sourceUrl: 'https://hospital-management-system-4q56.vercel.app/',
    featured: true,
    accent: 'lavender',
  },
  {
    slug: 'pharmacy-management-system',
    title: 'Medicine Management System',
    category: 'Business Systems',
    industry: 'Pharmacies',
    description:
      'A medicine management project for pharmacy operations and stock organization.',
    problem:
      'Pharmacies need to distinguish available stock, purchasing records, sales, and expiry dates. Poorly connected records can obscure which medicines need attention.',
    modules: [
      'Medicines and inventory',
      'Suppliers and purchases',
      'Sales and billing',
      'Expiry tracking and stock alerts',
      'Customers, prescriptions, and reports',
    ],
    files: [
      'hero',
      'dashboard',
      'inventory',
      'medicines',
      'sales',
      'suppliers',
      'expiry-alerts',
      'reports',
    ],
    sourceUrl: 'https://rayan-medicine-management-system.vercel.app/',
    accent: 'mint',
  },
  {
    slug: 'restaurant-management-system',
    title: 'Restaurant Management System',
    category: 'Business Systems',
    industry: 'Restaurants',
    description:
      'A concept connecting service, kitchen orders, and daily restaurant administration.',
    problem:
      'Restaurant teams need a clear handoff from an order to preparation and payment, while managers need an overview of ingredients and activity.',
    modules: [
      'Menu and table orders',
      'Kitchen workflow',
      'Billing and inventory',
      'Customers, staff, and reports',
    ],
    files: [
      'hero',
      'dashboard',
      'orders',
      'menu',
      'tables',
      'kitchen',
      'billing',
      'reports',
    ],
    accent: 'peach',
  },
  {
    slug: 'tailoring-management-system',
    title: 'Tailoring Shop Management',
    category: 'Management Systems',
    industry: 'Clothing & Tailoring',
    description:
      'A specialized project for the journey from customer measurements to delivery.',
    problem:
      'Tailoring orders depend on precise measurements, design choices, promised dates, and the person assigned to make the garment. Separating these records makes an order difficult to follow.',
    modules: [
      'Customers and measurements',
      'Orders and designs',
      'Delivery dates and order status',
      'Tailor assignments, payments, and reports',
    ],
    files: [
      'hero',
      'dashboard',
      'customers',
      'measurements',
      'orders',
      'delivery',
      'payments',
      'reports',
    ],
    sourceUrl: 'https://tailor-shop-demo.vercel.app/',
    status: 'Prototype',
    featured: true,
    accent: 'sand',
  },
  {
    slug: 'supermarket-management-system',
    title: 'Supermarket Management System',
    category: 'Business Systems',
    industry: 'Retail',
    description:
      'A retail management project built around products, sales, and store operations.',
    problem:
      'Retail stores need sales and purchases to relate to the same product records. Managers also need to reconcile stock, supplier information, and expenses.',
    modules: [
      'Products and categories',
      'Inventory and suppliers',
      'Sales, customers, and POS',
      'Purchases, expenses, and reporting',
    ],
    files: [
      'hero',
      'dashboard',
      'products',
      'inventory',
      'pos',
      'purchases',
      'suppliers',
      'reports',
    ],
    sourceUrl: 'https://supermarket-eight-pied.vercel.app/',
    accent: 'peach',
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'E-Commerce',
    industry: 'E-Commerce',
    description:
      'A storefront concept that connects product discovery to order administration.',
    problem:
      'Customers need to find the right product and understand checkout, while operators need to connect incoming orders to stock and fulfillment.',
    modules: [
      'Catalog, categories, and search',
      'Cart and checkout',
      'Customers and orders',
      'Inventory, COD, and administration',
    ],
    files: [
      'hero',
      'homepage',
      'products',
      'product-details',
      'cart',
      'checkout',
      'orders',
      'admin-dashboard',
      'mobile',
    ],
    accent: 'sand',
  },
  {
    slug: 'clinic-management-system',
    title: 'Clinic Management System',
    category: 'Management Systems',
    industry: 'Healthcare',
    description:
      'A concept for organizing the patient journey in a smaller medical practice.',
    problem:
      'A clinic needs to connect appointment scheduling, patient history, prescriptions, and billing in a workflow that fits a compact team.',
    modules: [
      'Patients and doctors',
      'Appointments',
      'Medical records and prescriptions',
      'Billing and reports',
    ],
    files: [
      'hero',
      'dashboard',
      'patients',
      'appointments',
      'prescriptions',
      'billing',
      'reports',
    ],
    accent: 'lavender',
  },
  {
    slug: 'transport-management-system',
    title: 'Transport & Fleet Management',
    category: 'Business Systems',
    industry: 'Transportation',
    description:
      'A fleet management concept for vehicles, drivers, and operational records.',
    problem:
      'Fleet operators must coordinate vehicle availability, driver assignments, trips, fuel, and maintenance. A connected record makes these decisions easier to review.',
    modules: [
      'Vehicles and drivers',
      'Routes and trips',
      'Maintenance and fuel',
      'Expenses, customers, and reports',
    ],
    files: [
      'hero',
      'dashboard',
      'vehicles',
      'drivers',
      'routes',
      'trips',
      'maintenance',
      'reports',
    ],
    accent: 'mint',
  },
  {
    slug: 'mobile-shop-management-system',
    title: 'Mobile Shop Management',
    category: 'Business Systems',
    industry: 'Retail',
    description:
      'A concept for device inventory, sales records, and warranty administration.',
    problem:
      'Mobile retailers need to distinguish individual devices from accessories and retain the connection between device identifiers, sales, and warranty records.',
    modules: [
      'Phones, accessories, and device identifiers',
      'Inventory and suppliers',
      'Sales and customers',
      'Warranties, payments, and reporting',
    ],
    files: [
      'hero',
      'dashboard',
      'products',
      'inventory',
      'sales',
      'customers',
      'warranty',
      'reports',
    ],
    accent: 'lavender',
  },
  {
    slug: 'money-exchange-system',
    title: 'Money Exchange Management',
    category: 'Business Systems',
    industry: 'Financial Services',
    description:
      'A recordkeeping concept for currency transactions and daily reconciliation.',
    problem:
      'Money-exchange operators need clear transaction history and cash summaries across currencies. Permissions and traceable changes are essential design considerations.',
    modules: [
      'Customers and transactions',
      'Currencies and exchange-rate records',
      'Cash management and daily summaries',
      'Reports, roles, and audit history',
    ],
    files: [
      'hero',
      'dashboard',
      'transactions',
      'exchange-rates',
      'customers',
      'cash-management',
      'reports',
    ],
    accent: 'sand',
  },
  {
    slug: 'manufacturing-management-system',
    title: 'Manufacturing Management',
    category: 'Business Systems',
    industry: 'Manufacturing',
    description:
      'A concept connecting raw materials, production records, and finished stock.',
    problem:
      'Manufacturing work spans supplier deliveries, material use, production, and customer orders. Separate records make the relationship between inputs and outputs harder to understand.',
    modules: [
      'Products and raw materials',
      'Suppliers and production',
      'Inventory and employees',
      'Orders, expenses, and reports',
    ],
    files: [
      'hero',
      'dashboard',
      'products',
      'raw-materials',
      'production',
      'inventory',
      'suppliers',
      'reports',
    ],
    accent: 'mint',
  },
  {
    slug: 'hotel-management-system',
    title: 'Hotel & Hospitality Management',
    category: 'Management Systems',
    industry: 'Hospitality',
    description:
      'A hospitality concept for room availability and the guest journey.',
    problem:
      'Hospitality staff need reservations, available rooms, arrival details, departures, and payments to agree with one another throughout a guest’s stay.',
    modules: [
      'Rooms and reservations',
      'Guests and check-in / check-out',
      'Payments and services',
      'Staff and reporting',
    ],
    files: [
      'hero',
      'dashboard',
      'rooms',
      'reservations',
      'guests',
      'check-in',
      'billing',
      'reports',
    ],
    accent: 'sand',
  },
  {
    slug: 'crm-system',
    title: 'CRM & Customer Management',
    category: 'Web Applications',
    industry: 'Professional Services',
    description:
      'A customer management concept for leads, follow-ups, and sales activity.',
    problem:
      'Customer conversations and sales follow-ups can disappear into separate inboxes and notes. A shared record helps a team see the next action and its owner.',
    modules: [
      'Leads, customers, and contacts',
      'Sales pipeline and follow-ups',
      'Tasks, notes, and communication history',
      'Reports and dashboard',
    ],
    files: [
      'hero',
      'dashboard',
      'leads',
      'customers',
      'pipeline',
      'tasks',
      'reports',
    ],
    accent: 'peach',
  },
  {
    slug: 'ai-automation-platform',
    title: 'AI & Business Automation',
    category: 'AI & Automation',
    industry: 'Cross-industry',
    description:
      'A concept exploring practical assistance in repeated business workflows.',
    problem:
      'Repeated document handling and information searches can take attention away from decisions. Any AI-assisted workflow needs clear input boundaries and human review.',
    modules: [
      'Assistant and intelligent search concepts',
      'Workflow automation concepts',
      'Document processing and recommendations',
      'Data analysis and report assistance',
    ],
    files: [
      'hero',
      'dashboard',
      'ai-assistant',
      'workflows',
      'analytics',
      'automation',
      'reports',
    ],
    accent: 'lavender',
  },
  {
    slug: 'poultry-feed',
    title: 'Poultry Feed Platform',
    category: 'Custom Software',
    industry: 'Manufacturing',
    description: 'A company-supplied poultry feed software project.',
    problem:
      'Poultry feed operations involve specialized production and recordkeeping needs. This project reference belongs to that domain; the detailed workflow is awaiting documentation.',
    modules: ['Feed-related operational workflows'],
    files: ['hero', 'dashboard', 'feed-records', 'reports', 'mobile'],
    sourceUrl: 'https://poultry-feed.ai.studio',
    accent: 'sand',
  },
  {
    slug: 'al-makkha-poultry',
    title: 'Al Makkha Poultry',
    category: 'Business Systems',
    industry: 'Manufacturing',
    description:
      'A poultry business software project supplied by Rayan Tech Solutions.',
    problem:
      'Poultry businesses need organized operational records and a clear view of daily work. The project-specific requirements and implemented modules have not yet been supplied.',
    modules: ['Poultry business operations'],
    files: ['hero', 'dashboard', 'operations', 'reports', 'mobile'],
    sourceUrl: 'https://al-makkha-poultry.vercel.app/',
    accent: 'mint',
  },
  {
    slug: 'cargo-management-demo',
    title: 'Cargo Management Demo',
    category: 'Management Systems',
    industry: 'Transportation',
    description: 'A cargo software demonstration supplied by the company.',
    problem:
      'Cargo teams need to coordinate shipment records and operational handoffs. This demonstration is a separate reference from the Rayan Cargo project.',
    modules: ['Cargo operational workflows'],
    files: ['hero', 'dashboard', 'shipments', 'tracking', 'reports', 'mobile'],
    sourceUrl: 'https://demo-cargo-ashy.vercel.app/',
    status: 'Prototype',
    accent: 'peach',
  },
  {
    slug: 'rayan-cargo',
    title: 'Rayan Cargo',
    category: 'Business Systems',
    industry: 'Transportation',
    description: 'A cargo operations project for Rayan’s software portfolio.',
    problem:
      'A cargo operation needs information to follow a shipment through each handoff. The company supplied this project reference; implemented modules and operational outcomes require confirmation.',
    modules: ['Cargo coordination and recordkeeping'],
    files: ['hero', 'dashboard', 'shipments', 'customers', 'reports', 'mobile'],
    sourceUrl: 'https://rayan-cargo.vercel.app/',
    featured: true,
    accent: 'peach',
  },
  {
    slug: 'sahil-gps',
    title: 'Sahil GPS',
    category: 'Web Applications',
    industry: 'Transportation',
    description: 'A GPS-related software project supplied by the company.',
    problem:
      'GPS-related services need to present location information clearly to their users. Device integrations, location update behavior, and supported workflows have not been supplied for this project.',
    modules: ['GPS-related interface workflows'],
    files: ['hero', 'dashboard', 'tracking', 'vehicles', 'mobile'],
    sourceUrl: 'https://sahil-gps.vercel.app/',
    accent: 'lavender',
  },
  {
    slug: 'online-prescription',
    title: 'Rayan Online Prescription',
    category: 'Web Applications',
    industry: 'Healthcare',
    description:
      'A prescription-related digital project in the company’s portfolio.',
    problem:
      'Prescription information needs clear organization and careful access handling. The supplied project name does not establish clinical capabilities, AI behavior, or medical validation.',
    modules: ['Prescription-related interface workflows'],
    files: ['hero', 'dashboard', 'prescriptions', 'patients', 'mobile'],
    sourceUrl: 'https://rayan-online-prescription1.ai.studio/',
    accent: 'mint',
  },
  {
    slug: 'travel-agency-accounting',
    title: 'Travel Agency Accounting',
    category: 'Business Systems',
    industry: 'Professional Services',
    description: 'An accounting software project for travel-agency operations.',
    problem:
      'Travel agencies need to relate financial records to their business activity. The supplied project opens at a login route; its transaction modules and accounting controls are not publicly verified.',
    modules: ['Travel-agency accounting workflows'],
    files: [
      'hero',
      'dashboard',
      'transactions',
      'accounts',
      'reports',
      'mobile',
    ],
    sourceUrl: 'https://rayan-travel-agency-accounting-soft.vercel.app/login',
    accent: 'sand',
  },
  {
    slug: 'rayan-company-website',
    title: 'Rayan Tech Company Website',
    category: 'Corporate Websites',
    industry: 'Professional Services',
    description:
      'The company’s own website, bringing services, team, and engineering work together.',
    problem:
      'The previous website buried useful work behind a fragmented dark interface. Its portfolio needed working routes and clear case studies, and inquiry handling needed to communicate its actual delivery state.',
    modules: [
      'Services and industry pages',
      'Engineering portfolio',
      'Project inquiries',
    ],
    features: [
      'Responsive navigation',
      'Data-driven case studies',
      'Portfolio filters',
      'Team profiles',
      'Screenshot fallbacks and lightbox',
      'Accessible project inquiry form',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'CSS', 'React Router'],
    files: ['hero', 'homepage', 'portfolio', 'case-study', 'team', 'mobile'],
    evidence:
      'Implementation is available in this repository. Claims are limited to the website features implemented here.',
    accent: 'peach',
  },
]
function createProject(brief: Brief): Project {
  const observation = projectObservations[brief.slug]
  const concept = !brief.sourceUrl && !brief.evidence
  const documented = Boolean(brief.features?.length)
  const stack = observation?.technologies || brief.technologies || []
  const stackCategories: { group: string; members: string[] }[] = [
    {
      group: 'Frontend & interface',
      members: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'CSS',
        'HTML',
        'React Router',
        'Tkinter',
      ],
    },
    {
      group: 'Backend',
      members: ['Python', 'Django', 'Node.js', 'REST API', 'Supabase'],
    },
    { group: 'Database', members: ['PostgreSQL', 'MongoDB'] },
    {
      group: 'Infrastructure & build tools',
      members: ['Vercel', 'Docker', 'Vite'],
    },
    { group: 'AI', members: ['OpenAI', 'Groq', 'Gemini', 'Ollama'] },
  ]
  const technologyGroups = stackCategories
    .map(({ group, members }) => ({
      group,
      items: stack.filter((technology) => members.includes(technology)),
    }))
    .filter(({ items }) => items.length > 0)
  const otherTools = stack.filter(
    (technology) =>
      !stackCategories.some(({ members }) => members.includes(technology))
  )
  if (otherTools.length)
    technologyGroups.push({ group: 'Tools & integrations', items: otherTools })
  const imageFiles = [
    ...new Set([
      ...brief.files,
      ...Object.keys(observation?.imageCaptions || {}),
    ]),
  ]
  const images = imageFiles.map((file) => ({
    src: '/images/portfolio/' + brief.slug + '/' + file + '.webp',
    caption:
      observation?.imageCaptions?.[file] ||
      (file === 'hero'
        ? 'Project overview'
        : file
            .replaceAll('-', ' ')
            .replace(/^./, (char) => char.toUpperCase())),
  }))
  const evidence =
    brief.evidence ||
    (concept
      ? 'A concept brief from the requested portfolio scope. It is not presented as delivered client work.'
      : 'A real project reference supplied by Rayan Tech Solutions. Source code, screenshots, feature verification, and delivery details have not yet been provided.')
  return {
    id: brief.slug,
    slug: brief.slug,
    title: brief.title,
    category: brief.category,
    industry: brief.industry,
    status: brief.status || (concept ? 'Concept Project' : 'Real Project'),
    evidence,
    shortDescription: brief.description,
    overview:
      brief.description +
      ' ' +
      (concept
        ? 'This concept outlines a possible product direction, with delivery scope to be agreed before implementation.'
        : documented
          ? 'The documented capabilities below are drawn from the company’s existing materials or this repository.'
          : 'This case study records the project reference and the business context without assuming unverified functionality.'),
    problem: brief.problem,
    goals: [
      brief.description,
      'Keep ' +
        brief.industry.toLowerCase() +
        ' workflows understandable to the people who use them.',
      'Agree on access permissions, record ownership, reporting needs, and expected workload before extending the system.',
    ],
    constraints: [
      concept
        ? 'Concept scope; implementation and technology choices are not confirmed.'
        : 'No client identity, budget, timeline, or measured results are supplied.',
      'Sensitive data, backup needs, and access rules must be reviewed against the actual deployment.',
      'Availability, integrations, and scaling requirements depend on the agreed business scope.',
    ],
    research:
      'No user interviews or formal research are claimed. This page uses the company’s supplied project reference and available documentation. A detailed workflow review, user-role map, and requirements validation should accompany future implementation or extension.',
    solution: documented
      ? 'The documented solution brings ' +
        brief.features!.map((item) => item.toLowerCase()).join(', ') +
        ' into a ' +
        brief.category.toLowerCase() +
        ' experience.'
      : concept
        ? 'The proposed direction groups ' +
          brief.modules.map((item) => item.toLowerCase()).join(', ') +
          ' into a focused workspace. These are proposed areas, not delivered capabilities.'
        : 'The supplied reference identifies a ' +
          brief.industry.toLowerCase() +
          ' project. The next documentation step is to confirm its modules, user roles, data flows, and integrations from the actual application.',
    features: brief.features || [],
    proposedFeatures: documented ? [] : brief.modules,
    ux: documented
      ? 'The interface is organized around distinct responsibilities and related records. Real interface images can be reviewed in the gallery when project screenshots are available.'
      : 'UX direction for this ' +
        brief.industry.toLowerCase() +
        ' brief: keep the main workflow visible, group related records, make status changes explicit, and adapt forms and navigation to smaller screens. This is a design direction rather than a claim of completed usability testing.',
    architecture: stack.length
      ? [
          {
            layer: 'Interface',
            detail:
              stack
                .filter((technology) =>
                  ['React', 'Next.js', 'Tkinter'].includes(technology)
                )
                .join(' / ') || 'Interface technology not documented',
          },
          {
            layer: 'Application',
            detail: stack.includes('Django')
              ? 'Django / API layer'
              : brief.slug === 'rayan-company-website'
                ? 'React Router / static application'
                : stack.includes('Python')
                  ? 'Python'
                  : 'Application layer not documented',
          },
          {
            layer: 'Data / hosting',
            detail:
              stack
                .filter((t) => ['PostgreSQL', 'Vercel'].includes(t))
                .join(' · ') ||
              (brief.slug === 'rayan-company-website'
                ? 'Static HTML output; hosting selected at deployment'
                : 'Not documented'),
          },
          ...(stack.some((t) =>
            ['OpenAI', 'Groq', 'Gemini', 'Ollama', 'Stripe'].includes(t)
          )
            ? [
                {
                  layer: 'Documented integrations',
                  detail: stack
                    .filter((t) =>
                      ['OpenAI', 'Groq', 'Gemini', 'Ollama', 'Stripe'].includes(
                        t
                      )
                    )
                    .join(' · '),
                },
              ]
            : []),
        ]
      : [],
    implementation: [
      {
        area: 'Frontend',
        detail:
          stack
            .filter((t) =>
              [
                'React',
                'Next.js',
                'TypeScript',
                'CSS',
                'React Router',
                'Tkinter',
              ].includes(t)
            )
            .join(', ') ||
          'Not supplied; no frontend framework is inferred from the URL.',
      },
      {
        area: 'Backend & data',
        detail:
          stack
            .filter((t) =>
              [
                'Python',
                'Django',
                'PostgreSQL',
                'REST API',
                'Supabase',
              ].includes(t)
            )
            .join(', ') ||
          (brief.slug === 'rayan-company-website'
            ? 'Static site; optional configured inquiry endpoint.'
            : 'Backend and database details await source confirmation.'),
      },
      {
        area: 'Access & integrations',
        detail:
          brief.slug === 'bazaaraf'
            ? 'OTP authentication and separate admin/seller dashboards are documented. Provider details are not supplied.'
            : 'Authentication providers, authorization rules, APIs, and file storage require project-specific documentation.',
      },
      {
        area: 'Deployment & testing',
        detail:
          brief.slug === 'bazaaraf'
            ? 'Vercel deployment is recorded in the company profile; testing and infrastructure details are not supplied.'
            : brief.slug === 'rayan-company-website'
              ? 'Vite production build with static route output. See the repository for validation details.'
              : 'Deployment configuration, security reviews, and test coverage are not supplied.',
      },
    ],
    challenges: [],
    results: [
      concept
        ? 'The available outcome is a defined concept brief; no delivered product or measured impact is claimed.'
        : documented
          ? 'The documented project provides the capabilities listed above. No business impact metrics are supplied.'
          : 'The company has supplied a project reference. Operational outcomes and user feedback are awaiting documentation.',
    ],
    role: 'Rayan Tech Solutions portfolio',
    team: 'Project-specific contributors not documented',
    technologies: stack,
    technologyGroups,
    images,
    image: images[0].src,
    gallery: images.map((item) => item.src),
    // Empty by request. sourceUrl preserves provenance; it never renders as a live CTA.
    liveUrl: '',
    githubUrl: '',
    sourceUrl: brief.sourceUrl || '',
    relatedProjects: [],
    featured: brief.featured || false,
    accent: brief.accent || 'peach',
    coverIllustration: '/images/portfolio/' + brief.slug + '/illustration.svg',
    cardCover: '/images/portfolio/' + brief.slug + '/dashboard-cover.webp',
    ...(brief.slug === 'school-management-system'
      ? {
          image: '/images/portfolio/school-management-system/dashboard.webp',
          role: 'Software development by Rayan Tech Solutions',
          images: images.filter((item) => !item.src.endsWith('/hero.webp')),
          gallery: images
            .filter((item) => !item.src.endsWith('/hero.webp'))
            .map((item) => item.src),
          coverIllustration:
            '/images/portfolio/school-management-system/cover.webp',
        }
      : {}),
    ...(observation
      ? {
          ...Object.fromEntries(
            Object.entries(observation).filter(
              ([key]) => !['access', 'imageCaptions'].includes(key)
            )
          ),
          review: { checkedOn: '2026-10-10', access: observation.access },
          ...(observation.features ? { proposedFeatures: [] } : {}),
        }
      : {}),
  }
}
export const projects: Project[] = briefs.map(createProject)
for (const project of projects) {
  project.relatedProjects = [
    ...projects.filter(
      (item) => item.slug !== project.slug && item.industry === project.industry
    ),
    ...projects.filter(
      (item) =>
        item.slug !== project.slug &&
        item.industry !== project.industry &&
        item.category === project.category
    ),
    ...projects.filter((item) => item.slug !== project.slug),
  ]
    .filter(
      (item, index, all) =>
        all.findIndex((other) => other.slug === item.slug) === index
    )
    .slice(0, 3)
    .map((item) => item.slug)
}
export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug)
