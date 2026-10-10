# Website asset notes

## Branded dashboard card covers

All 30 project cards use individual `public/images/portfolio/<slug>/dashboard-cover.webp` assets. Each was generated with the built-in imagegen tool using the existing blue/gold Rayan logo in `public/Favicon 64x64.png` as a brand reference. The composition is a flat dashboard interface rather than a photographed monitor or a conceptual vector diagram. Domain-specific workspaces distinguish learning, recruitment, support, automation, school, healthcare, commerce, logistics, manufacturing, hospitality, finance, and the other project areas.

The complete per-project prompt set, generation mode, exported dimensions, and byte sizes are recorded in `public/images/portfolio/dashboard-cover-prompts.json`. `scripts/import-dashboard-covers.py` exports optimized WebP files from the generated originals. These are designed previews, not captured interfaces, verified functionality, or operating statistics. Card badges are removed; a shared note explains the preview imagery on Home and Portfolio, and alt text describes it accurately. Real screenshots, captions, and project evidence remain in case studies. Previous image assets are archived in place.

Cards for documented company work display Real Project; their detailed production/prototype status remains available in the case study. Entries previously documented as unbuilt concepts retain their factual status until the owner confirms otherwise.

## School product cover and supplied screenshots

The earlier built-in imagegen school product cover is retained as `public/images/portfolio/school-management-system/cover.webp` (1536 × 1024), with its original PNG in the tool output directory. This quality-88 WebP export is a fallback asset, separate from the authentic screenshot gallery. The main card now uses the newer `dashboard-cover.webp` described above and has no per-image badge.

Final generation prompt (built-in tool, generation mode):

> Use case: product-mockup. Generate a premium editorial cover image for a real School Management System project card on a software engineering company website. Wide landscape composition 3:2. On a soft off-white #eeeeee studio background, an elegant desktop monitor at a slight three-quarter angle shows a school administration dashboard: dark teal vertical sidebar, white content area, subtle teal headings, simple abstract data rows and attendance calendar. A smaller floating teacher workspace panel and a restrained blue #035ffd accent create depth. Beside the monitor, a few minimal physical school objects: one closed notebook and a pencil. Sophisticated realistic product photography and soft contact shadows, strong composition readable at thumbnail size, ample clean space, no excessive glassmorphism, no people. This is illustrative artwork, not an authentic screenshot. Avoid student names, contact details, numerical metrics, testimonials, clients, school branding, fake logos, dense text, and invented claims. Use only short interface labels if readable: Dashboard, Students, Classes, Attendance. No login screen. No text outside the monitor. Render a polished, believable software product presentation.

The owner supplied seven school interface screenshots in chat. Matching originals were located and visually checked in `C:/Users/admin/Pictures/Screenshots/`: October 10 captures 020652 (dashboard), 021002 (students), 021026 (classes), 021040 (teachers), 021056 (attendance), 021157 (exams), and 021419 (teacher workspace). `scripts/import-school-screenshots.py` exports their complete contents as quality-92 WebP files into the existing project folder and records provenance in `capture-sources.json`. Originals are preserved. The previous public login capture is retained on disk but excluded from the school gallery and card.

## October 10 replacement hero and real portfolio captures

The replacement hero attachment exactly matches `C:/Users/admin/Downloads/pexels-mizunokozuki-12899167.jpg` (4000×6000). Its subject and composition are preserved; resized WebP exports are `src/assets/developer-collaboration.webp` (1600×2400, approximately 147 KiB) and `developer-collaboration-mobile.webp` (800×1200, approximately 36 KiB). Home imports these exports, with gray fades and blue tint applied in CSS. This supplied stock photograph is illustrative, not a claim of actual company premises. The previous office image is archived and no longer used as the Home hero.

Read-only Chrome inspection of public URLs and the tailor site's explicitly provided demo account produced 29 real interface screenshots across 11 projects. No records were created or changed. Visible customer identifiers in the hospital, tailoring, and factory captures are masked at screenshot time. `scripts/inspect-project-sites.mjs` and `scripts/inspect-project-details.mjs` retain observations in ignored `.qa/project-inspection/`; `scripts/import-project-screenshots.py` exports WebP files into existing project folders. `public/images/portfolio/capture-sources.json` records filenames and review context. Sign-in screens are labeled as sign-in previews; public demo figures and security/clinical labels are not verified company results.

Al Makkha Poultry, the separate Rayan Cargo URL, and Online Prescription returned 404. Concepts and missing screenshot covers have original, code-authored vector workflow illustrations from `scripts/create-portfolio-illustrations.mjs`. Each `illustration.svg` is labeled as conceptual artwork, not a fabricated project interface. Actual `hero.webp` files take precedence; empty gallery slots remain documented in the data and folder READMEs while the public gallery shows real available captures.

## Technology brand marks and shaped image presentation

The existing editorial photographs are reused, with arch and diagonal masks, offset blue backplates, and floating captions implemented in `src/components/EditorialVisual.tsx` and `src/styles/expertise.css`. Their bitmap files remain unchanged.

Twenty-two authentic SVG brand marks, including Supabase observed in the supplied projects, are stored in `public/images/technologies/`. The framework, language, database, design, and DevOps marks come from [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0/icons); the AI vendor marks come from a pinned revision of [Lobe Icons](https://github.com/lobehub/lobe-icons/tree/master/packages/static-svg/icons). Original geometry and colors are preserved. These marks identify technology capabilities, not clients or partnerships.

`sources.json` records the source URL and SHA-256 of every imported SVG; `ai-source-pin.json` records the AI icon repository revision. The two license files are retained beside the assets. `scripts/fetch-brand-assets.py` performs the reproducible import and XML validation. Total SVG payload is approximately 42 KiB; the site serves these files locally without a third-party runtime dependency.

`src/components/TechnologyMark.tsx` shares the marks across Services, Technologies, project cards, and case studies. React Native uses the React mark with its own label. Generic capabilities such as API integration and release workflows use interface glyphs rather than invented brand logos.

The hero uses the user's exact second uploaded reference image. Its original is preserved at `src/assets/rayan-workspace-original.png`. WebP exports are `src/assets/rayan-workspace.webp` (1672 pixels wide) and `src/assets/rayan-workspace-mobile.webp` (960 pixels wide). Gray blending and blue color integration are implemented as CSS overlays in `src/styles/refinement.css`; the supplied scene is not regenerated or represented as a verified photograph of the company's premises.

The built-in image generation tool was used in edit mode to remove the backgrounds of four existing portraits. Final project assets retain transparency and are exported as WebP at 640 pixels wide:

| Existing portrait | Final website asset |
| --- | --- |
| `public/team/noman-wahdat.jpeg` | `public/team/noman-cutout.webp` |
| `public/team/khoshal-amin.jpeg` | `public/team/khoshal-cutout.webp` |
| `public/team/fazl.jpg` | `public/team/fazl-cutout.webp` |
| `public/team/akmal.jpg` | `public/team/akmal-cutout.webp` |

The original team files remain unchanged. CSS crops and scaling align the four portraits in the silhouette layout. No additional team members are generated.

Each of the four background-removal edits used this prompt with its individual original portrait as the edit target:

> Use case: background-extraction. Remove ONLY the background of this real portrait, returning the SAME original person on true alpha transparency for a website team silhouette. Preserve the person's face, identity, expression, hairstyle, sunglasses if present, clothing, pose, skin texture, proportions, and original lighting EXACTLY. Keep all visible upper-body pixels and the original framing. Do not redraw or beautify the face; do not invent body parts; no text, logos, geometric background, backdrop, or shadows. Crisp natural hair and garment edges. Only the background is removed.

An initial hero-generation result used the wrong references and was discarded. It is not included in the project. The final hero uses the original attachment.

`scripts/optimize-image.mjs` performs standard browser-canvas WebP exports without adding or changing visual subjects. Use it for future project image optimization with the original source, destination, and maximum width arguments.


## Editorial images — expanded page design

Generated with the built-in image generation tool in **generate mode**, without reference images. These are illustrative engineering/design scenes, not photographs of verified company premises, owned infrastructure, client work, or project screenshots. The three optimized WebP files are stored in `public/images/editorial/` and used by the shared `EditorialVisual` component. Combined file size is approximately 402 KiB. Existing portfolio screenshot slots remain unchanged.

### engineering-workbench

Saved asset: `public/images/editorial/engineering-workbench.webp` (1200 pixels wide).

> Use case: photorealistic-natural. Asset type: editorial landscape image for a premium software engineering company website. A beautifully composed, believable engineering desk: dark slim laptop with deliberately out-of-focus code, a small open notebook of interface sketches, graphite pen, blue ceramic cup, clean cables, light gray desk beside large sunlit windows. No people. Camera at a natural 35 degree angle, close editorial crop, real material texture, soft daylight, restrained charcoal, warm white, light gray and vivid cobalt blue #035ffd accents. Landscape 3:2. Sophisticated architectural magazine photography, not glossy synthetic stock. No readable screen text, logos, company names, numbers, watermarks. This is an illustrative scene, not an actual company office or project screenshot.

### interface-design

Saved asset: `public/images/editorial/interface-design.webp` (1200 pixels wide).

> Use case: photorealistic-natural. Asset type: editorial landscape image for software design services. Overhead natural editorial photograph of a considered product design workspace: a few neatly arranged sheets with fine hand-drawn wireframe sketches, a graphite pencil, one modern black smartphone with a simple blue and white abstract interface without any words, and a corner of a closed silver laptop on a light gray desk. Crisp realistic paper texture, side daylight with soft shadows, restrained white, gray, charcoal and cobalt blue #035ffd. Landscape 3:2, beautiful asymmetrical composition, plenty of breathing room, no people, no logos, no legible words or fake metrics, no sci-fi effects, no glossy 3D icons. A quiet premium design studio visual, not a screenshot of an actual project.

### infrastructure

Saved asset: `public/images/editorial/infrastructure.webp` (1200 pixels wide).

> Use case: photorealistic-natural. Asset type: editorial landscape image for infrastructure and systems engineering pages. Close architectural photograph down a clean modern server aisle, one rack of neatly organized black servers and orderly blue patch cables, softly lit industrial surfaces, restrained cobalt blue #035ffd light accents and a pale neutral floor. Realistic brushed metal, natural textures, sharp foreground and gentle depth of field. Landscape 3:2. Professional engineering magazine photography, clean and human scale, no sci-fi tunnels, no dramatic neon, no people, no text, no logos, no numbers, no watermarks. This is an illustrative technology scene, not a claimed owned data centre.
