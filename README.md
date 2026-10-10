# Rayan Tech Solutions

A redesigned company website built with React, TypeScript, React Router, and Vite. The current visual system uses light gray (#EEEEEE), electric blue (#035FFD), and locally hosted Manrope typography. The October 9 revision adds the supplied office hero image, a rotating headline, refined cards, and a four-person silhouette team layout.

The expanded design adds image-led introductions across the company pages, a project-led Home layout, richer service/industry/solution layouts, contextual case-study artwork, and subtle text, icon, and scroll transitions. Motion respects reduced-motion preferences; content stays visible without JavaScript. On mobile, the project form appears before supporting contact information.

The Services page now includes a rotating headline with a pause control, a real technology logo strip, category filters, detailed service panels, and working deep links. Technologies offers a searchable directory of the documented company capabilities with category filters and project-inquiry links. All branded SVGs are stored locally in `public/images/technologies/`; the reusable mapping is in `src/config/technology-logos.ts`. Editorial photographs use a shared sculpted frame with floating captions instead of plain image cards.

Three generated editorial images are optimized and stored in `public/images/editorial/`. Their exact filenames, prompts, generation mode, and intended use are documented in [ASSET_NOTES.md](ASSET_NOTES.md). They illustrate engineering and design; real portfolio screenshots continue to use the existing project folders.

About uses a code-native “Understand / Design / Build” illustration in place of the office photograph, a text-led company story, a joined mission-and-vision panel, refined engineering principles, and a local technology logo grid. Its four verified team portraits remain. Page-specific styling is in `src/styles/about.css`.

## Run and verify

Use Node 22.12 or newer. On Windows PowerShell, use npm.cmd if the execution policy blocks npm.ps1.

```sh
npm install
npm run dev
npm run type-check
npm run build
npm run test:e2e
```

Browser checks use installed Google Chrome in headless mode and run against built files. npm run format formats source; npm run format:check checks formatting.

## Pages and deployment

The build generates 41 HTML routes, including 30 case studies, plus sitemap.xml, robots.txt, structured data, canonical links, social metadata, and a 404 page. Deploy dist/. Netlify configuration includes static routes, 404 responses for unknown pages, and immutable caching for hashed assets.

Other hosts must serve each generated directory’s index.html and use 404.html for unknown pages. Browser navigation uses the same React Router routes. Direct email inquiries also require deployment of the included server handler and its private mail-service environment variables.

## Project content

Every main project card uses a branded, flat dashboard cover at `public/images/portfolio/<slug>/dashboard-cover.webp`. These generated covers are kept separate from authentic case-study screenshots. The image badges are removed; a shared preview note and descriptive alt text explain their role. Complete prompts and export metadata are in `public/images/portfolio/dashboard-cover-prompts.json`. Existing company work shows Real Project on cards; its detailed production/prototype status is retained. Previously unbuilt concept entries require owner confirmation before being labeled real work.

Edit [src/config/projects.ts](src/config/projects.ts). Every project supports context, evidence, goals, constraints, research, solution, documented features, proposed scope, UX, architecture, implementation, challenges, results, technology, status, image slots, and related projects.

- features contains documented functionality; proposedFeatures identifies unverified or concept scope.
- technologies stays empty when the stack has not been confirmed.
- status distinguishes portfolio work, prototypes, production references, and concepts.
- liveUrl and githubUrl are deliberately empty. Fill them later to enable buttons; no component edit is required.
- sourceUrl records supplied references and never creates a live-project button.

The twelve supplied projects are included alongside BazarAF, the company website, six previous portfolio projects, and explicitly labeled industry concepts. Updated requirements are recorded in [REDESIGN_BRIEF.md](REDESIGN_BRIEF.md).

## Add screenshots

School update: all seven supplied screenshots have been matched to the originals in Pictures/Screenshots and imported as `dashboard.webp`, `students.webp`, `classes.webp`, `teachers.webp`, `attendance.webp`, `exams.webp`, and `teacher-dashboard.webp` in `public/images/portfolio/school-management-system/`. The main card now uses `dashboard-cover.webp`; the earlier generated `cover.webp` is retained as a fallback asset, separate from the real screenshot gallery. School is labeled Real Project; no completion or production status is inferred. PNG, JPG, and JPEG alternatives also resolve automatically for documented WebP slots; existing WebP files take precedence. Refresh the development page or rebuild for deployment after replacing assets.

Place real WebP screenshots in public/images/portfolio/<project-slug>/ using the filenames in that folder’s README.md. [public/portfolio-image-slots.json](public/portfolio-image-slots.json) contains the complete generated list. For example:

```text
public/images/portfolio/school-management-system/hero.webp
public/images/portfolio/school-management-system/dashboard.webp
public/images/portfolio/school-management-system/students.webp
```

Refresh the development preview after adding a file. Vite reads available .webp files dynamically in development. For deployment, rebuild so the file and portfolio-assets.json manifest are included. An existing screenshot replaces its cover automatically. The gallery enables preview buttons only for available images; missing files cause no broken requests. Use actual WebP files, not another format renamed to .webp.

Use screenshots without confidential records and set descriptive captions in the project data.

## Inquiry handling

Public contact details are info@rayan-tech-solution.tech, +93 77 230 9782, Kabul, Afghanistan. The phone/WhatsApp number is updated centrally in `src/config/company.ts`.

Email and phone-call inquiries POST to `/api/inquiry`. The included Netlify function validates fields and origin, applies a honeypot and host rate limit, and sends through Resend with the visitor’s address as Reply-To. The recipient defaults to the owner’s requested private mailbox on the server; it is not imported into public website code or returned to the browser. Provider acceptance is required before showing success. Errors retain the brief. WhatsApp opens the complete message directly at the requested number; the visitor taps Send in WhatsApp.

To activate real email delivery, set **private function environment variables** `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` on the host. The sender must belong to a verified Resend domain. `CONTACT_TO_EMAIL` is an optional private recipient override. Never prefix these variables with `VITE_`. Local Vite development can read them from ignored `.env.local`; the production preview can use `node --env-file=.env.local scripts/qa-server.mjs`. Without credentials the endpoint returns a truthful unavailable response, and the visitor can use WhatsApp. `VITE_CONTACT_ENDPOINT` optionally overrides the included handler for another host; deploy the server handler as well as static files. Netlify configuration is included. See the [Resend sending API](https://resend.com/docs/api-reference/emails/send-email) and [Netlify Functions](https://docs.netlify.com/build/functions/get-started/). Run `npm run test:api` for isolated server validation/provider tests; they send no real emails.

## Team, capabilities, and languages

Team and contact data are in [src/config/company.ts](src/config/company.ts). The current roster is Noman Wahdat, Khoshal Amin, Fazlullah Sardarkhil, and Akmal Stanikzai. Noman's displayed role is Full Stack Developer, as requested. Arman Malik and Hameedullah Gul have been removed from the displayed team. Their original files remain in the source asset collection. Fazlullah's documented architecture / infrastructure specialty remains his displayed role.

Home now uses the exact replacement attachment, matched to `pexels-mizunokozuki-12899167.jpg` in Downloads and exported as `src/assets/developer-collaboration.webp` and `developer-collaboration-mobile.webp`. Gray fades and blue tint are CSS overlays. The previous office original remains archived as `src/assets/rayan-workspace-original.png` but is not the Home hero. [ASSET_NOTES.md](ASSET_NOTES.md) records image sources, exports, and the four transparent team portraits. Headline text comes from `src/config/redesign-translations.ts`; rotation pauses on demand and respects reduced-motion preferences.

Services, solutions, industries, technologies, and process stages are in [src/config/catalog.ts](src/config/catalog.ts). Company capabilities are separate from project technology claims.

Home now connects the existing hero to a compact services band, a BazarAF feature with three supporting projects, editorial service rows, business principles, solutions, the development process, industries, the team, and a project CTA. The delivery widget and its orbit artwork are removed. Homepage styling is isolated in `src/styles/home.css`, preserving the shared Portfolio card layout. Each process step and team portrait reveals independently after entering the viewport, with slower 1.4–2-second animation and staggered team entrances. The team’s final arrangement and portrait crops stay unchanged. These effects respect reduced-motion preferences and remain readable without JavaScript. Motion styling is in `src/styles/interactions.css`; repeatable behavior checks are in `tests/motion.spec.ts`.

English, Dari (دری), and Pashto (پښتو) are available directly in the navigation; open the navigation menu on mobile. The selected language persists across visits. Pages, services, project cards, all case-study narratives, legal notices, inquiry states, accessibility labels, and page metadata are translated. Dari uses `fa-AF`; Pashto uses `ps`. RTL layouts include navigation, spacing, typography, directional icons, tabs, and gallery keyboard controls. Email addresses, phone numbers, technology names, and authentic screenshots retain their original direction.

The existing i18next configuration is retained in [src/config/i18n.ts](src/config/i18n.ts). English-source/Dari/Pashto entries are maintained in [src/locales/website-translations.txt](src/locales/website-translations.txt) and [src/locales/project-translations.txt](src/locales/project-translations.txt). Each row is `English|Dari|Pashto`. Run `npm run i18n:build` after editing them; the production build also compiles and validates these rows automatically into `fa/website.json` and `ps/website.json`. Detailed translation bundles load only for the selected language. Static HTML starts in English, with a saved preference restored after hydration. Display translation leaves route identifiers, filter values, inquiry API values, and visitor-entered text unchanged. Use `tests/localization.spec.ts` to check both languages and RTL behavior.

## Verification limits

On October 10, Chrome inspection reached 11 of the 14 supplied/existing public references, producing 29 actual screenshots. Al Makkha Poultry, the separate Rayan Cargo URL, and Online Prescription returned 404. Several reachable projects expose only sign-in screens. `src/config/project-observations.ts` records project-specific findings and boundaries; backend behavior, clinical/security claims, AI accuracy, and business impact are not inferred from UI labels. Public capture records are in `public/images/portfolio/capture-sources.json`. The read-only inspection/import scripts are in `scripts/`. Concepts and unavailable references use original vector cover illustrations from `scripts/create-portfolio-illustrations.mjs`; these are explicitly labeled illustrations, not fabricated screenshots. Gallery grids show available real captures and omit empty screenshot slots; the exact future filenames remain in the project configuration and generated folder READMEs.

Add confirmed implementation details and real screenshots to the existing data model independently. The website-use notices describe this implementation; business contract terms are agreed separately.
