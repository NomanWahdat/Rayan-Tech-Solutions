# Redesign quality review

Reviewed locally on October 10, 2026, against the production build in headless Google Chrome.

## Dari and Pashto localization

- Development import fix: the localization stylesheet is imported directly from `src/main.tsx` after `App.css`. This avoids the live PostCSS import resolving it under the project root. Vite's stale transform cache was cleared by triggering its config restart. Live development checks confirm English, Dari, and Pashto render with the expected direction/font and no error overlay, browser errors, or HTTP 500 responses. The production build still generates identical CSS and passes for all 41 routes.
- The existing i18next setup now covers all website pages, 30 case studies, inquiry labels and states, portfolio filters/search, image descriptions, legal notices, navigation, and client-side metadata. Each language has 1,488 authored display-text entries. The build validates both languages and loads detailed dictionaries only when selected.
- Dari is identified as `fa-AF`, Pashto as `ps`. The selected language persists across visits and is restored after route hydration. Layouts use RTL flow and logical spacing, Arabic-friendly typography, mirrored directional icons, and RTL tab/gallery arrow keys. Technology brands, phone/email identifiers, form API values, and authentic screenshots retain their original direction or values.
- Desktop and mobile viewport captures were reviewed for Home, Services, Contact, and the school case study. An independent mobile audit of all 41 routes found no horizontal overflow or browser errors. Translation coverage includes project narrative fields and gallery captions; remaining Latin strings are technology/product identifiers and abbreviations.
- All 40 browser checks passed: 12 Dari/Pashto checks and 28 existing English regression checks across desktop and mobile. These cover all 41 routes per language/viewport, persistence, native-language portfolio search, stable inquiry values and submitted payloads, switching language with a filled form, RTL tabs/lightbox navigation, and automated WCAG A/AA checks. Inquiry delivery was mocked; no real emails were sent. Production compilation, translation validation, formatting, and diff checks passed.
- The final Pashto Services headline revision also passed accessibility, overflow, and browser-error checks at 320, 390, 768, and 1440 pixels against the final build.

## Latest branded dashboard card update

- All 30 main project cards now use individual Rayan-branded dashboard covers, with flat interface framing rather than conceptual artwork or login screens. The optimized WebP exports total approximately 2.6 MiB. Full generation prompts and export metadata are documented in public/images/portfolio/dashboard-cover-prompts.json.
- Per-image illustrative-cover badges are removed. Known company work displays Real Project on cards; detailed production/prototype statuses remain in case studies. Ten previously documented concept entries retain their accurate classification pending owner confirmation. Generated preview imagery remains separate from authentic screenshots and is identified in shared portfolio copy and alt text.
- Type checking, formatting, the production build, and generation of 41 routes/30 case studies passed. The build verifies that every configured dashboard cover exists.
- Ten focused desktop/mobile browser checks passed for all card covers, portfolio filters, every case study, the screenshot lightbox, and school PNG replacement slots. All 30 images decode. Home and Portfolio fit 320/390/768/1440-pixel widths without horizontal overflow; WCAG A/AA checks passed at 390/1440. No image badges, browser errors, or missing-asset responses were found, and reduced-motion hover behavior passed. Desktop/mobile framing was visually reviewed in ignored .qa/dashboard-*.png captures.

## Earlier school project update

- All seven attached school screenshots were matched visually to originals in Pictures/Screenshots and imported as optimized WebP assets. The case study uses the real administrator dashboard as its main image and all seven captures in its keyboard-accessible gallery. The old login capture is excluded from these views.
- The school status is Real Project, reflecting the owner's correction without claiming a specific production/completion state. Content now describes the supplied administrator and teacher interfaces.
- The initial school card cover was subsequently replaced by the branded dashboard cover described above. Authentic school screenshots remain unchanged.
- The production build passed for 41 routes. Four existing desktop/mobile language/gallery checks passed. New school-card and PNG-slot integration checks passed on desktop and mobile. Seven actual gallery images decode, Home card framing was visually checked, and school layouts have no horizontal overflow at 320/390/768/1440 pixels. School WCAG A/AA checks passed at 390/1440. Formatting and git diff --check passed. Visual captures are in ignored .qa/school-*.png files.
- PNG/JPG/JPEG alternatives can now resolve against the documented WebP screenshot slots in both previews and the lightbox. Original screenshot files remain unchanged outside the workspace.

## Earlier October 10 verification

- TypeScript compilation, client build, server rendering, and generation of all 41 routes and 30 case studies passed.
- Fourteen desktop/mobile browser checks passed for the updated technology directory, direct email/WhatsApp form flows, screenshot galleries, case studies, portfolio filters, accessibility, and all production routes. These are the relevant checks selected from the existing browser suite, rather than a new full-suite claim.
- Automated WCAG A/AA checks passed on Home, Services, Solutions, Industries, Technologies, Products, Portfolio, BazarAF, About, and Contact at desktop and mobile sizes. Route checks found no browser errors or horizontal overflow.
- Inquiry server tests passed for validation, cross-origin rejection, honeypot handling, private recipient routing, provider acceptance, failed-send handling, and missing configuration. Provider calls were stubbed; tests sent no real emails.
- Formatting and git diff --check passed. The public build and client source contain neither the private owner mailbox nor the previous company phone number.
- Final image framing and mobile crop checks cover Home and Portfolio at 320, 390, 768, 1024, and 1440 pixels. All 30 portfolio cover images decode: 11 captured previews and 19 explicitly labeled illustrations. Home/Portfolio accessibility checks also cover the final crop/label adjustments at 390 and 1440 pixels. Captures are saved in ignored .qa/update-final-*.png files.

Earlier October 9 reviews also exercised Services animation controls and reduced motion, keyboard navigation in the delivery journey and screenshot lightbox, company-page layouts, About without JavaScript, and team/technology image loading. See the browser tests for repeatable checks.

## Project content and imagery

- Read-only inspection reached 11 of the 14 supplied/existing public references. Al Makkha Poultry, the separate Rayan Cargo deployment, and Online Prescription returned 404. Their case studies identify the missing reference rather than borrowing claims from another project.
- Twenty-nine actual captures were optimized into existing WebP screenshot slots. Several projects expose only a sign-in screen; captions describe that screen accurately. Relevant captures mask customer contact/record identifiers. Public capture provenance is stored in public/images/portfolio/capture-sources.json.
- Case studies contain project-specific observations, features, architecture where evidenced, limitations, and outcomes. Public frontend bundles establish client libraries; they do not establish backend security, clinical accuracy, regulatory compliance, AI quality, or business impact. No metrics, client endorsements, certifications, or research activities were invented.
- Missing screenshot covers use original domain-related SVG artwork, explicitly labeled as illustrations. Galleries show available captures and omit empty slots. Expected filenames remain documented in project data, folder READMEs, and public/portfolio-image-slots.json; rebuild after adding deployment assets.
- All liveUrl and githubUrl fields remain empty as requested, with corresponding buttons hidden.
- Home uses the exact replacement attachment, sourced from the matching pexels-mizunokozuki-12899167.jpg in Downloads, with optimized desktop/mobile WebP exports and CSS fades.
- Twenty-two authentic technology brand SVGs are stored locally with source/license records, including Supabase identified in the reviewed frontend bundles. Existing editorial illustrations and transparent team portraits are retained.

## Inquiry deployment and practical limits

The public phone and WhatsApp destination are +93 77 230 9782. WhatsApp opens the complete brief at that destination; the visitor taps Send. Email inquiries use the included server function, with the requested owner mailbox kept outside public source/build output. Actual email sending still requires deployment of that function plus private RESEND_API_KEY and CONTACT_FROM_EMAIL environment variables; the sender domain must be verified in Resend. Without configuration, the form displays an honest error and preserves the brief for retry or WhatsApp. No real provider delivery has been verified.

Authenticated project workflows cannot be fully documented from public login pages without supplied access. Automated accessibility checks do not replace manual assistive-technology review. Production Core Web Vitals, host-specific deployment, and mail delivery have not been measured locally. Website content now supports English, Afghan Dari, and Pashto; actual project screenshots retain the original interface language.

See [README.md](README.md) for preview, server deployment, image, and content instructions, [ASSET_NOTES.md](ASSET_NOTES.md) for asset provenance, and [REDESIGN_BRIEF.md](REDESIGN_BRIEF.md) for the design requirements.
