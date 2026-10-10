import type { Project } from './projects'

type Observation = Partial<
  Pick<
    Project,
    | 'shortDescription'
    | 'overview'
    | 'problem'
    | 'goals'
    | 'constraints'
    | 'research'
    | 'solution'
    | 'features'
    | 'ux'
    | 'architecture'
    | 'implementation'
    | 'results'
    | 'technologies'
  >
> & {
  access:
    | 'Public interface'
    | 'Sign-in preview'
    | 'Public demo'
    | 'Unavailable reference'
    | 'Company-supplied interface screenshots'
  evidence: string
  imageCaptions?: Record<string, string>
}
// Observations from read-only Chrome inspection on October 10, 2026.
// Public frontend bundles establish client libraries, never backend security or production outcomes.
export const projectObservations: Record<string, Observation> = {
  'ai-resume-analyzer': {
    access: 'Public interface',
    evidence:
      'Reviewed the resume upload, interview preparation, job-match, and history views through in-app navigation. React is identifiable in the delivered frontend. The history page explicitly labels itself a static preview; no resume was uploaded and no AI accuracy or provider response was tested. Earlier company-documented technologies remain separate evidence.',
    overview:
      'The public career-tool interface separates PDF resume upload, interview preparation, and job-description comparison. Empty states explain the resume prerequisite, and a distinct history view is clearly marked as a static preview rather than a completed persistence feature.',
    goals: [
      'Make the resume-upload prerequisite clear before analysis.',
      'Separate interview preparation from job-description comparison.',
      'Distinguish sample history from actual saved analysis.',
    ],
    constraints: [
      'No personal CV was uploaded and no model request was triggered.',
      'AI scoring, ATS compatibility, and recommendation accuracy are not verified.',
      'Direct deep links returned 404 during inspection; the corresponding screens were reached through in-app navigation.',
      'History is publicly labeled a static preview for upcoming integration.',
    ],
    research:
      'Read-only walkthrough of the upload screen and its sidebar routes. Inspected empty states, resume prerequisites, the job-description text area, interview generation controls, and the explicitly static history view. No user interviews or model evaluation are claimed.',
    solution:
      'The public frontend divides the career workflow into upload/analysis, interview preparation, job matching, and history. Shared resume context is described in the interface; the empty states prevent the preview from implying that a resume has already been analyzed.',
    features: [
      'PDF upload interface',
      'Resume-dependent interview preparation screen',
      'Job-description comparison form',
      'Sidebar navigation between career tools',
      'Explicitly labeled static analysis-history preview',
    ],
    ux: 'Persistent sidebar labels give each task a distinct destination. Upload and job-match screens start with clear empty states rather than fabricated personal analysis. The history screen’s sample scores are not results from a verified user session.',
    results: [
      'The supplied project exposes distinct resume, interview, and job-match interfaces through client navigation.',
      'Analysis accuracy, employment outcomes, and persistent history behavior have not been demonstrated by this read-only review.',
    ],
    imageCaptions: {
      hero: 'Resume upload — captured interface',
      dashboard: 'Analysis history — explicitly static preview',
      interview: 'Interview preparation — no resume uploaded',
      'resume-analysis': 'Job-match form — no analysis performed',
    },
  },
  'school-management-system': {
    access: 'Company-supplied interface screenshots',
    evidence:
      'Rayan Tech Solutions confirms this is a real project and supplied seven interface screenshots: administrator dashboard, students, classes, teachers, attendance, exams/results, and teacher dashboard. These establish the visible workflows below. React was identified in the public frontend; Django/PostgreSQL remain company-documented technologies. Screenshot records and figures are not business-impact metrics.',
    overview:
      'A school administration system with separate administrator and teacher workspaces. The administrator dashboard connects school records, attendance, fee collection, and examination entry points. Dedicated directories organize students, teachers, and classes, while the teacher workspace brings assigned classes, timetable, homework, and result-entry navigation together.',
    goals: [
      'Connect daily school administration to searchable student, teacher, and class records.',
      'Record attendance by class and date with clear present, absent, and late statuses.',
      'Organize examinations and make result-entry progress visible.',
      'Give teachers a focused overview of their classes, timetable, homework, and pending results.',
    ],
    constraints: [
      'Authenticated behavior was reviewed through company-supplied screenshots, rather than a live signed-in session.',
      'Screenshots establish interface scope, not authorization enforcement, database integrity, or production test coverage.',
      'No client identity, delivery timeline, production status, or measured operating results are supplied.',
    ],
    research:
      'Reviewed the seven supplied interface screenshots alongside the public multilingual sign-in screen. This documents visible navigation, directories, filters, attendance states, examination progress, and the teacher dashboard. No user interviews or field research are claimed.',
    solution:
      'Shared sidebar navigation connects school administration modules. Searchable directories provide record details, assignments, status, and management actions. Attendance has a class/date entry form and a recent-record table. Examinations have academic-year, class, type, and status filters. Teachers receive a separate workspace organized around their own daily assignments.',
    features: [
      'Administrator overview with quick actions and announcements',
      'Student directory with search, class/status filters, guardian details, and record actions',
      'Teacher directory with subjects, class assignments, status, and record actions',
      'Class directory with grade, student/teacher counts, academic year, and status',
      'Class/date attendance form and present, absent, and late records',
      'Examination list with search, academic-year/class/type/status filters, and result progress',
      'Teacher dashboard with assigned-class, student, timetable, and pending-result summaries',
      'Navigation to fees, homework, announcements, and reports',
    ],
    ux: 'A dark teal sidebar anchors light content panels. Search and filters appear above directories, status badges distinguish active/inactive records and attendance states, and quick actions shorten common administration paths. The teacher view separates personal assignments from the broader administrator workspace and explains empty assignment states.',
    technologies: ['React', 'Django', 'PostgreSQL', 'REST API'],
    results: [
      'The supplied screenshots demonstrate separate administrator and teacher interfaces with connected record, attendance, and examination views.',
      'This is a company-confirmed real project; production use and operational impact have not been independently measured.',
    ],
    imageCaptions: {
      dashboard: 'Administrator dashboard — company-supplied screenshot',
      students: 'Student directory — company-supplied screenshot',
      classes: 'Class management — company-supplied screenshot',
      teachers: 'Teacher directory — company-supplied screenshot',
      attendance: 'Class attendance — company-supplied screenshot',
      exams: 'Examinations and results — company-supplied screenshot',
      'teacher-dashboard': 'Teacher workspace — company-supplied screenshot',
    },
  },
  'hospital-management-system': {
    access: 'Public demo',
    evidence:
      'Inspected the public dashboard, patient directory, appointment view, general-physician workspace, billing ledger, and pharmacy inventory. React and a Supabase client are present in the delivered frontend. Sample figures, patient records, compliance labels, encryption claims, and clinical AI behavior are not independently verified.',
    shortDescription:
      'A hospital administration interface connecting patient records, appointments, departmental workspaces, pharmacy stock, and billing.',
    overview:
      'The MediPulse interface brings several hospital workspaces into one navigation system. The public demonstration includes an executive overview, electronic health record directory, appointment queue/calendar, outpatient consultation workspace, pharmacy stock, and invoice ledger.',
    problem:
      'Appointments, patient histories, departmental activity, medicine stock, and billing refer to related work but need different views. The interface addresses the coordination problem by keeping those workspaces within one hospital navigation structure.',
    goals: [
      'Provide a shared overview of departmental activity.',
      'Make patient records and appointment status easy to locate.',
      'Connect visible pharmacy stock and billing views to hospital administration.',
    ],
    constraints: [
      'This review covers a public demonstration, not a production clinical deployment.',
      'No HIPAA compliance, encryption effectiveness, FHIR interoperability, or clinical safety is certified by this case study.',
      'Displayed figures and sample records are interface content, not verified business outcomes.',
    ],
    research:
      'Performed a read-only walkthrough of the publicly available workspaces. Reviewed navigation, patient filtering, appointment presentation, pharmacy batch/expiry columns, and invoice layout. No patient interviews, clinical validation, or backend security audit were performed.',
    solution:
      'A persistent department sidebar keeps the executive dashboard, EHR directory, queue/calendar, outpatient units, pharmacy, and billing accessible from the same shell. Each workspace presents its own search/filter controls or records while retaining the hospital context.',
    features: [
      'Executive hospital dashboard',
      'Patient directory with admission and doctor filters',
      'Appointment queue and weekly calendar interface',
      'General physician and specialist workspace navigation',
      'Pharmacy inventory with batch, expiry, stock, and price columns',
      'Billing ledger and printable invoice interface',
      'English, Dari, and Pashto language controls',
    ],
    ux: 'Department navigation remains in place when the main workspace changes. Patient and medicine records use domain-specific labels; appointment and invoice views expose status filters. The captured screens show the public demonstration and do not establish clinical suitability.',
    technologies: ['React', 'Supabase'],
    architecture: [
      {
        layer: 'Interface',
        detail: 'React client with departmental workspace views',
      },
      {
        layer: 'Client integration',
        detail:
          'Supabase client library present in the delivered bundle; live database behavior not verified',
      },
      {
        layer: 'Data boundary',
        detail:
          'Public demonstration records; persistence and production access policies require source review',
      },
    ],
    implementation: [
      {
        area: 'Frontend',
        detail:
          'React is identifiable in the delivered JavaScript; the public interface changes workspaces without a full navigation reload.',
      },
      {
        area: 'Records and reporting',
        detail:
          'Patient, appointment, stock, and billing views were inspected without creating or editing records.',
      },
      {
        area: 'Backend and security',
        detail:
          'A Supabase client is included. Database schemas, row-level access policies, encryption implementation, and compliance claims were not audited.',
      },
      {
        area: 'Clinical features',
        detail:
          'AI assistant and clinical integration labels appear in the interface. No medical advice was requested and their behavior is not presented as validated.',
      },
    ],
    results: [
      'The public interface demonstrates how several hospital administration workspaces can share a common navigation model.',
      'No reduction in clinical workload, revenue improvement, patient outcome, or compliance result is claimed.',
    ],
    imageCaptions: {
      hero: 'Hospital dashboard — public demonstration',
      patients: 'Patient directory — public demonstration',
      appointments: 'Appointment calendar — public demonstration',
      'medical-records': 'General physician workspace — public demonstration',
      billing: 'Billing interface — public demonstration',
      'pharmacy-inventory': 'Pharmacy stock — public demonstration',
    },
  },
  'pharmacy-management-system': {
    access: 'Sign-in preview',
    evidence:
      'The Rayan MediStore deployment serves a pharmacy sign-in screen with English, Dari, and Pashto controls. React is present in the frontend bundle. POS, stock, and accounting are described by the public product copy; their authenticated workflows were not accessed.',
    shortDescription:
      'Rayan MediStore: a pharmacy management project with a multilingual staff sign-in and a stated POS, stock, and accounting scope.',
    overview:
      'Rayan MediStore presents a dedicated access screen for medicine management, sales, and pharmacy accounting. Its public introduction defines the product’s operational focus; the authenticated medicine and transaction screens require company-provided access.',
    goals: [
      'Provide a clear pharmacy staff entry point.',
      'Support the product’s stated medicine, POS, stock, and accounting scope.',
      'Offer English, Dari, and Pashto language choices.',
    ],
    constraints: [
      'The management workspace is behind email/password authentication.',
      'Medicine records, expiry alerts, reports, and stock transactions could not be inspected without credentials.',
      'The public “Encrypted” label does not independently verify encryption or security controls.',
    ],
    research:
      'Inspected the public sign-in form, remember-me control, product description, and language buttons. The review did not enter patient, prescription, medicine, or transaction data.',
    solution:
      'The public interface gives pharmacy staff a focused, multilingual sign-in to a product described as a combined POS and stock management system. Further technical documentation should establish how sales, purchases, expiry tracking, and accounting relate internally.',
    features: [
      'Email/password sign-in interface',
      'Remember-me control',
      'English, Dari, and Pashto controls',
    ],
    ux: 'The sign-in keeps product identity and pharmacy scope beside one short form. Local language controls appear above the entry fields. Portfolio imagery identifies this as a captured sign-in screen rather than a medicine dashboard.',
    technologies: ['React'],
    implementation: [
      {
        area: 'Frontend',
        detail: 'React is identifiable in the public JavaScript bundle.',
      },
      {
        area: 'Access',
        detail:
          'Email/password and remember-me controls are visible; server-side authentication enforcement was not reviewed.',
      },
      {
        area: 'Pharmacy workflows',
        detail:
          'The public copy names medicine, sales, stock, and accounting. Authenticated feature behavior requires an authorized walkthrough.',
      },
    ],
    results: [
      'The public deployment provides a multilingual pharmacy sign-in interface.',
      'No sales throughput, inventory accuracy, or clinical benefit is claimed from the limited public inspection.',
    ],
    imageCaptions: { hero: 'MediStore sign-in — captured public interface' },
  },
  'tailoring-management-system': {
    access: 'Public demo',
    evidence:
      'Used only the demo account explicitly displayed by the site and inspected the order dashboard without modifying any records. The interface includes garment orders, payment status, customer records, fabric inventory, expenses, reporting, and settings. React and a Supabase client are present in the public frontend bundle.',
    shortDescription:
      'A tailoring and fabric-shop workspace for garment orders, customer measurements, delivery status, payments, and retail stock.',
    overview:
      'The Mujeeb Afghan Tailor Shop demonstration combines tailoring orders with fabric retail activity. Its order dashboard distinguishes garment work from retail sales and brings delivery and payment status into the same order list.',
    goals: [
      'Keep customer, garment, and delivery information connected to each order.',
      'Distinguish tailoring income from fabric retail activity.',
      'Make production status and outstanding payment visible together.',
    ],
    constraints: [
      'The review used a publicly supplied demonstration account, not a production staff account.',
      'No order status, payment, customer, or inventory record was changed.',
      'The source of sample records and real operational performance are not verified.',
    ],
    research:
      'Reviewed the public sign-in and its supplied demo access, then inspected the order dashboard and navigation. Observed garment descriptions, fabric choices, dates, fulfillment stages, payment states, and list sorting/filter controls. No formal shop interviews are claimed.',
    solution:
      'The workspace joins tailoring and fabric sales while keeping their workflows distinguishable. Orders present garment/fabric details beside delivery and payment state; separate navigation leads to customers, fabric inventory, expenses, reports, and configuration.',
    features: [
      'Tailoring order dashboard',
      'Separate garment-order and retail-sale views',
      'Order status filters and delivery-date sorting',
      'Payment status and remaining-balance display',
      'Customer directory entry point',
      'Fabric inventory workspace',
      'Shop expense and reporting workspaces',
      'Dari, Pashto, and English language choices',
    ],
    ux: 'The order list places fulfillment and payment status close to the garment and promised dates. Filters let staff narrow the view by stage, while the navigation distinguishes tailoring work, stock, accounting, and management. Captures come from the supplied demo account.',
    technologies: ['React', 'Supabase'],
    implementation: [
      {
        area: 'Frontend',
        detail:
          'React is identifiable in the delivered bundle. The order dashboard exposes filtering and sorting controls.',
      },
      {
        area: 'Backend integration',
        detail:
          'A Supabase client is included; database policies and production authorization were not audited.',
      },
      {
        area: 'Workflow review',
        detail:
          'The public demo account was used only to inspect screens. No business records were created, updated, or deleted.',
      },
    ],
    results: [
      'The demonstration presents tailoring orders and fabric retail activity within one workspace.',
      'Real fulfillment speed, financial accuracy, and customer outcomes have not been measured.',
    ],
    imageCaptions: {
      hero: 'Tailoring order dashboard — supplied demo',
      customers: 'Customer workspace — supplied demo',
      orders: 'Order dashboard — supplied demo',
      reports: 'Shop reports — supplied demo',
      'fabric-inventory': 'Fabric stock — supplied demo',
    },
  },
  'supermarket-management-system': {
    access: 'Sign-in preview',
    evidence:
      'The FreshMart public entry describes inventory, sales, analytics, and retail operations. Its sign-in explicitly references a Supabase Auth account. React and a Supabase client are identifiable in the frontend bundle; internal retail workflows were not accessed.',
    shortDescription:
      'FreshMart: a supermarket operations project with a multilingual sign-in and an inventory, sales, and analytics product scope.',
    overview:
      'FreshMart introduces a supermarket command center through a split-layout entry screen. The public copy connects inventory, sales processing, analytics, and store operations, while the authenticated application requires a Supabase Auth user.',
    goals: [
      'Give retail staff a clear account-based entry point.',
      'Bring inventory, sales, and analytics into the stated supermarket workspace.',
      'Support English, Dari, and Pashto at sign-in.',
    ],
    constraints: [
      'No authorized Supabase Auth credentials were provided.',
      'The internal POS, product list, purchase flow, and reports remain uninspected.',
      'Figures on the entry screen are presentation content, not verified store performance.',
    ],
    research:
      'Inspected the public entry page, product scope, language controls, email/password form, and its Supabase Auth instruction. No stock, sale, or customer record was changed.',
    solution:
      'The entry clearly identifies the retail operation and routes staff through account authentication. Its stated product scope brings sales, inventory, analytics, and administration together; the internal workflow must be reviewed with authorized staff access.',
    features: [
      'Email/password sign-in interface',
      'English, Dari, and Pashto controls',
      'Supabase Auth account instruction',
    ],
    ux: 'A product introduction sits beside a compact account form. Language controls stay near the entry fields. The screenshot is the actual public sign-in interface and is not presented as a POS dashboard.',
    technologies: ['React', 'Supabase'],
    implementation: [
      {
        area: 'Frontend',
        detail: 'React is identifiable in the delivered frontend.',
      },
      {
        area: 'Authentication integration',
        detail:
          'The entry explicitly requires a Supabase Auth user, and a Supabase client is included in the public bundle.',
      },
      {
        area: 'Retail workspace',
        detail:
          'Inventory, sales, analytics, and operational management are described publicly. Their authenticated behavior and database access rules were not audited.',
      },
    ],
    results: [
      'A publicly accessible retail sign-in page communicates the product’s operational scope.',
      'No revenue, product volume, staff count, or retail efficiency metric is verified.',
    ],
    imageCaptions: { hero: 'FreshMart sign-in — captured public interface' },
  },
  'poultry-feed': {
    access: 'Public interface',
    evidence:
      'Inspected the Al-Makkah feed-production dashboard, sales invoices, and reporting workspace. Navigation exposes raw stock, formulation, suppliers, customers, and expenses. The interface reports local database mode with Supabase disconnected. React and local-storage usage are identifiable in the public bundle.',
    shortDescription:
      'A poultry-feed production workspace connecting raw materials, formulation, processed stock, sales, expenses, and factory reports.',
    overview:
      'The Al-Makkah poultry-feed interface links production records with raw inventory, processed feed stock, sales, supplier/customer balances, and expenses. Its public deployment operates in a visible local-data mode and offers reporting and database backup controls.',
    problem:
      'Feed manufacturing needs to relate raw material quantities and formulations to processed stock and sales. Factory staff also need to distinguish cash received, customer balances, supplier debt, and operating expenses without treating production weight as a sales total.',
    goals: [
      'Present raw materials and processed feed as separate stock views.',
      'Make kilos, bags, and tons understandable in production and sales records.',
      'Connect sales, expenses, and balances to period reporting.',
    ],
    constraints: [
      'The inspected application reports Supabase disconnected and local database mode.',
      'Sample quantities and financial totals are not verified company results.',
      'No nutritional accuracy, feed quality, or production optimization claim is made.',
    ],
    research:
      'Read-only review covered the stock/production dashboard, sales quantity units, payment balances, period reporting, and visible backup/restore controls. No factory records, formulas, backup restores, or reset actions were changed.',
    solution:
      'A shared sidebar groups raw stock, formulation, sales, suppliers, customers, expenses, and reports. Stock and invoice views use explicit quantity units; reports combine period sales and expense information while keeping local-data management visible.',
    features: [
      'Raw-material and processed-feed dashboard',
      'Stock threshold and low-stock presentation',
      'Feed formulation workspace',
      'Sales invoices with kilos, bags, and tons',
      'Cash received and outstanding customer balances',
      'Supplier, customer, and expense navigation',
      'Daily, weekly, and monthly report controls',
      'JSON backup/restore controls',
      'English, Dari, and Pashto language controls',
    ],
    ux: 'Quantity units stay beside their values, separating raw stock from processed feed. The same factory context persists across stock, sales, and reports. Backup/restore controls are separated from the report summary; their destructive actions were not invoked.',
    technologies: ['React'],
    architecture: [
      {
        layer: 'Interface',
        detail: 'React production, stock, sales, and reporting workspaces',
      },
      {
        layer: 'Observed data mode',
        detail:
          'Local database mode; local-storage usage in the frontend bundle',
      },
      {
        layer: 'External connection',
        detail:
          'The public interface reports Supabase disconnected; no live backend is claimed',
      },
    ],
    implementation: [
      {
        area: 'Frontend',
        detail:
          'React is identifiable in the delivered bundle; navigation switches the main factory workspace.',
      },
      {
        area: 'Local data',
        detail:
          'The public interface identifies local database mode and includes JSON backup/restore controls. Local-storage usage is present in the frontend.',
      },
      {
        area: 'Financial and production views',
        detail:
          'Sales views show quantity units, invoice amounts, cash, balances, and estimated profit. These are observed interface fields, not audited calculations.',
      },
      {
        area: 'Review boundaries',
        detail:
          'No sales were submitted and no database restore, reset, or production action was performed.',
      },
    ],
    results: [
      'The supplied deployment exposes a connected feed-factory interface and read-only reporting views.',
      'Production efficiency, profit, stock accuracy, and live database reliability have not been independently measured.',
    ],
    imageCaptions: {
      hero: 'Feed factory dashboard — captured preview',
      'feed-records': 'Feed formulation workspace — captured preview',
      reports: 'Factory reports — captured preview',
      'raw-stock': 'Raw-material stock — captured preview',
      sales: 'Sales invoice interface — captured preview',
    },
  },
  'cargo-management-demo': {
    access: 'Public interface',
    evidence:
      'Inspected the public consignment-number tracking form, customer sign-in, and branch-terminal entry. React and a Supabase client are present in the delivered frontend. Actual tracking events, branch inventory, and authenticated operations were not tested.',
    shortDescription:
      'A cargo tracking and access interface separating public shipment lookup, customer accounts, and branch terminals.',
    overview:
      'The cargo demonstration offers three distinct entry points: consignment-number tracking, customer access, and branch-terminal access. Public copy explains pre-bookings and delivery tracking for customers and consignment/inventory workflows for branch staff.',
    problem:
      'Customers looking for a shipment update should not have to enter a staff workspace. Cargo staff need a separate entry for branch inventory and consignment work, while customers need their own account context for bookings and delivery information.',
    goals: [
      'Keep public shipment lookup separate from staff access.',
      'Offer distinct customer and branch-terminal entry points.',
      'Present local language options across the public cargo interface.',
    ],
    constraints: [
      'No customer or branch account was used.',
      'No consignment query was submitted and no shipment record was modified.',
      'Live tracking, location accuracy, delivery coverage, and shipment volume are not verified.',
    ],
    research:
      'Reviewed the public tracking page and both sign-in panels. The customer entry describes parcel pre-bookings; the branch entry describes inventory, consignments, and status updates. These protected workflows remain publicly described scope.',
    solution:
      'The interface separates public lookup from customer and branch access through persistent navigation. The tracking page accepts a consignment number; each account entry explains the work available to its intended audience.',
    features: [
      'Consignment-number tracking form',
      'Separate customer sign-in and registration entry',
      'Separate branch-terminal sign-in',
      'Email or Afghan phone sign-in labels',
      'English, Dari, and Pashto controls',
    ],
    ux: 'The tracking form is the primary public action. Customer and branch access are labeled separately and retain the cargo identity, preventing the public lookup from competing with operational staff controls.',
    technologies: ['React', 'Supabase'],
    implementation: [
      {
        area: 'Frontend',
        detail:
          'React is identifiable in the public bundle; tracking and account entry panels were inspected.',
      },
      {
        area: 'Integration',
        detail:
          'A Supabase client is included. Live tracking queries, schemas, and access policies were not tested.',
      },
      {
        area: 'Access boundaries',
        detail:
          'Customer and branch sign-in fields use distinct explanatory copy. Enforcement behind those forms requires authorized review.',
      },
    ],
    results: [
      'The public deployment provides distinct interfaces for shipment lookup and two account audiences.',
      'Delivery speed, operational volume, and tracking accuracy are not presented as measured outcomes.',
    ],
    imageCaptions: {
      hero: 'Public cargo tracking interface',
      tracking: 'Public shipment lookup',
      shipments: 'Customer portal entry — captured interface',
      'customer-portal': 'Customer portal sign-in — captured interface',
      'branch-access': 'Branch terminal sign-in — captured interface',
    },
  },
  'sahil-gps': {
    access: 'Sign-in preview',
    evidence:
      'The supplied Sahil GPS URL opens an Afghan Panah GPS / RouteCore sign-in. Public copy describes customer relationships and fleet/GPS operations, and credits Rayan Tech Solutions. React and a Supabase client are present in the delivered frontend; authenticated tracking was not accessed.',
    shortDescription:
      'A GPS operations project with an Afghan Panah / RouteCore account entry and a customer-and-fleet product focus.',
    overview:
      'The supplied project reference presents a dedicated account entry for Afghan Panah GPS. Its public copy connects customer relationship management with GPS fleet operations; the deployment’s displayed product name is retained here without inventing a separate client relationship.',
    problem:
      'GPS operations need a controlled workspace for customer and fleet information. Public visitors need a clear account entry, while live device, vehicle, and route workflows belong behind the operational access boundary.',
    goals: [
      'Provide a focused account entry for GPS operations.',
      'Communicate the customer-and-fleet context of the product.',
      'Support English, Dari, and Pashto choices.',
    ],
    constraints: [
      'No authenticated GPS workspace was accessed.',
      'Device protocols, location refresh frequency, map provider, and tracking accuracy are unknown.',
      'The displayed Afghan Panah name is product identity from the reference, not a verified client endorsement.',
    ],
    research:
      'Inspected the public product introduction, language selector, sign-in fields, and developer credit. No device or customer records were accessed.',
    solution:
      'A focused sign-in connects the GPS product identity and customer/fleet context with a single account form. Internal CRM and tracking modules need an authorized walkthrough before their features or integrations can be described as verified.',
    features: [
      'Email/password account entry',
      'English, Dari, and Pashto language choices',
      'Public product description for customer and GPS operations',
    ],
    ux: 'The two-column public layout pairs a concise fleet introduction with the account form. Screenshots show this actual entry screen rather than a fabricated live map.',
    technologies: ['React', 'Supabase'],
    implementation: [
      {
        area: 'Frontend',
        detail: 'React is identifiable in the delivered JavaScript.',
      },
      {
        area: 'Client integration',
        detail:
          'A Supabase client is included. Authentication policies and fleet data structures were not inspected.',
      },
      {
        area: 'GPS integration',
        detail:
          'The public page does not establish device integrations, live maps, location update behavior, or a tracking service provider.',
      },
    ],
    results: [
      'The supplied URL serves a branded GPS product sign-in and identifies Rayan Tech Solutions as its developer.',
      'No fleet reliability or location-accuracy result is claimed.',
    ],
    imageCaptions: {
      hero: 'Afghan Panah GPS sign-in — supplied Sahil GPS reference',
    },
  },
  'travel-agency-accounting': {
    access: 'Sign-in preview',
    evidence:
      'Inspected the Rayan Solutions public travel-agency entry. Product copy describes tickets, hotels, visas, refunds, accounting vouchers, P&L, trial balance, and receivables. The delivered HTML and frontend chunks identify Next.js; authenticated accounting behavior was not tested.',
    shortDescription:
      'A travel-agency finance project for bookings, vouchers, accounting entries, and reporting, with a dedicated agency sign-in.',
    overview:
      'Rayan Solutions presents a travel-agency finance workspace at its public login route. The product introduction relates travel documents and booking types to accounting vouchers and financial reports. Existing-agency sign-in, password recovery, and new-agency registration have distinct entry points.',
    problem:
      'Travel documents and bookings need financial records that remain tied to the same agency operation. Tickets, hotels, visas, and refunds introduce different voucher contexts, while financial staff need consistent receivable and reporting views.',
    goals: [
      'Keep the product’s booking and voucher scope understandable at entry.',
      'Provide separate sign-in, account recovery, and agency registration paths.',
      'Support the stated P&L, trial-balance, and receivable reporting scope.',
    ],
    constraints: [
      'The agency workspace requires credentials that were not provided.',
      'Voucher posting, financial calculations, report accuracy, and agency isolation were not audited.',
      'Product copy does not establish a tested accounting result or regulatory compliance.',
    ],
    research:
      'Reviewed the public introduction, account form, recovery and signup links, and language selection. Internal booking, voucher, and reporting behavior remains product-described scope.',
    solution:
      'The public entry explains how travel documents, voucher activity, and reports fit within one agency workspace. It separates returning-user sign-in from agency registration and account recovery, while keeping local language selection available.',
    features: [
      'Agency email/password sign-in',
      'Password recovery entry point',
      'New-agency registration entry point',
      'English, Dari, and Pashto choices',
    ],
    ux: 'The split layout uses short voucher and reporting descriptions beside a focused sign-in form. Account recovery and agency registration remain visible without distracting from returning staff access.',
    technologies: ['React', 'Next.js'],
    implementation: [
      {
        area: 'Frontend framework',
        detail:
          'Next.js is identifiable from the rendered application and its delivered frontend chunks; React is its interface layer.',
      },
      {
        area: 'Account entry',
        detail:
          'Sign-in, password-recovery, and signup entry points are public. No account was created and no credentials were guessed.',
      },
      {
        area: 'Finance scope',
        detail:
          'Booking types, vouchers, P&L, trial balance, and receivables are described publicly; the protected calculations and storage implementation remain unverified.',
      },
    ],
    results: [
      'The public deployment communicates a travel-agency finance scope and provides distinct account entry paths.',
      'No accounting accuracy, reporting speed, or financial impact metric is claimed.',
    ],
    imageCaptions: {
      hero: 'Travel-agency sign-in — captured public interface',
    },
  },
  bazaaraf: {
    access: 'Public interface',
    evidence:
      'Inspected the supplied marketplace homepage and public login entry. Search, catalog sections, buyer/seller calls to action, and cash-on-delivery copy are visible. Product/category loading failed during review. Displayed counts, testimonials, delivery promises, and guarantees are not verified; the earlier company-documented stack and seller/OTP scope are retained separately.',
    overview:
      'BazarAF is the company’s Afghan-market multi-vendor marketplace project. The public storefront presents search, product/category sections, buyer and seller entry points, and a cash-on-delivery shopping flow. The case study combines that visible interface with the company’s earlier documented seller onboarding, OTP, dashboards, and order scope.',
    goals: [
      'Keep buyer discovery and seller onboarding easy to find.',
      'Present cash on delivery as the documented payment workflow.',
      'Separate verified interface observations from promotional claims and protected account behavior.',
    ],
    constraints: [
      'The public catalog returned a loading error during inspection.',
      'No buyer/seller account was created and no order or payment was submitted.',
      'Promotional counts, ratings, testimonials, return guarantees, and delivery coverage are not verified outcomes.',
    ],
    research:
      'Reviewed the public storefront, search and category areas, shopping-flow explanation, account entry, and seller calls to action. Retained previously documented engineering details without claiming new interviews, purchase testing, or marketplace metrics.',
    solution:
      'A shared storefront connects product discovery with buyer access and seller entry. The company’s documented scope adds seller onboarding, OTP authentication, dashboards, order management, and cash-on-delivery handling. The observed public catalog error is recorded as a review limitation rather than hidden as a successful transaction.',
    ux: 'The storefront groups search, categories, products, and shopping steps around buyer discovery, with seller entry kept in the header and calls to action. The captured login avoids treating promotional figures as proof of marketplace scale.',
    results: [
      'The marketplace’s public shell and account entry are accessible.',
      'Catalog loading was unavailable during review; no completed purchase, seller count, customer count, or business growth metric is verified.',
    ],
    imageCaptions: {
      hero: 'Marketplace account entry — captured interface',
      homepage: 'Marketplace homepage — promotional figures unverified',
    },
  },
  'al-makkha-poultry': {
    access: 'Unavailable reference',
    evidence:
      'The supplied Al Makkha Poultry deployment returned HTTP 404 on October 10, 2026. It remains a company-supplied project reference. Its separate poultry-feed URL was inspected, but those features are not attributed to this unavailable deployment.',
    research:
      'Attempted read-only inspection of the exact supplied URL. The host returned a missing-deployment response, so no interface, frontend stack, or operational workflow could be verified for this entry.',
    results: [
      'The available evidence is the company-supplied project reference.',
      'The linked deployment currently returns 404. The cover is a poultry-operations illustration, not a captured screenshot.',
    ],
  },
  'rayan-cargo': {
    access: 'Unavailable reference',
    evidence:
      'The exact Rayan Cargo deployment supplied by the company returned HTTP 404 on October 10, 2026. The separate Cargo Management Demo URL was inspected, but its features are not assumed to describe this deployment.',
    research:
      'Attempted read-only inspection of the exact supplied Rayan Cargo URL. A missing-deployment response prevented direct feature or technology verification.',
    results: [
      'The project remains a company-supplied cargo reference.',
      'Its linked deployment currently returns 404; the cover is a related logistics illustration rather than a screenshot.',
    ],
  },
  'online-prescription': {
    access: 'Unavailable reference',
    evidence:
      'The supplied online-prescription URL returned HTTP 404 on October 10, 2026. No prescribing workflow, clinical AI, doctor/patient feature, or technology stack is inferred from its name.',
    research:
      'Attempted read-only access to the exact supplied URL. The missing page prevented inspection of any prescription workflow. Medical functionality and safety are not verified.',
    results: [
      'The company supplied a prescription-related project reference.',
      'Its public URL is unavailable; the cover is a healthcare illustration, not a real prescription screenshot.',
    ],
  },
}
