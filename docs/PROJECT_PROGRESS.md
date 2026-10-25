# Project Progress

## Sprint 2 implementation status (2026-10-24)

The Supabase-backed admin and public integration are implemented in code: eight-table migration with RLS and Storage policies; a repeatable 47-product seed export; SSR authentication and an admin allowlist; protected dashboard; category, product, price, stock, photo, specials, promotions, and homepage management; and database-authoritative public menu/homepage reads when configured. The local catalog remains an explicit public fallback only while Supabase environment variables are absent. Sprint 3 checkout is still pending.

**Activation remains pending:** no Supabase project URL or publishable key is configured in this workspace. The SQL migration, seed, live Auth, RLS, Storage, persistence, password recovery email, and public reflection of edits have not been verified against a real database. Do not call the portal operational or production-ready until the owner completes [ADMIN_SETUP.md](ADMIN_SETUP.md) and the live security checks pass. Browser-based visual testing is **Pending Manual User Verification**. Existing historical sections below document earlier work; their references to a placeholder admin login are superseded by this implementation, subject to activation.

Local checks: `npm run seed:export` generated 17 categories, 47 products, 47 reference prices, and five homepage sections. `npm run validate:menu` passed. `npm run validate:admin` passed four focused tests for cent conversion, Chicago DST rejection, upload signatures, and seed/RLS scaffolding. `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build` passed, including all protected admin route compilation. These checks are static/local and do not establish live RLS or persistence. Known limitations: Supabase credentials and migration application are pending; database/Storage writes are not atomic, so rare upload cleanup failures need manual investigation; large future catalogs will need query pagination. Sprint 2 is **implemented in code, pending live activation and verification**, and Sprint 3 remains pending.

## Priority reset: consolidated delivery roadmap (2026-10-24)

The earlier numbered stages below remain as a history of completed work. Their unfinished feature sequence is superseded by these four sprints. Stage 4's previous homepage was technically complete at the time; Sprint 1 replaces its long rendered composition with a shorter one. Do not infer that menu, admin, or ordering are complete from those historical entries.

| Sprint | Priority  | Scope                                                                                                                                                                                                                    | Status                                                 |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| 1      | Immediate | Simplify homepage; remove customer-facing external ordering redirects; publish a complete 47-item reference menu with category/subcategory pages, descriptions, approved images or fallbacks, and admin-ready seed data. | Technically complete; manual visual acceptance pending |
| 2      | Next      | Server-enforced admin authentication; persistent PostgreSQL data and storage; category/product CRUD, availability, prices/units, uploads, homepage sections, specials and scheduled promotions.                          | Pending                                                |
| 3      | Future    | Native cart, quantity/weight variants, checkout, payments, order management, confirmations and status.                                                                                                                   | Pending                                                |
| 4      | Final     | Security, accessibility, responsive QA, SEO, performance and production readiness.                                                                                                                                       | Pending                                                |

The third-party ordering URL is retained solely as a provenance reference, not a customer destination. Sprint 1 prices are an owner-provided snapshot of an external listing; direct website prices, units, stock, ingredients, and live availability await confirmation. Browser-dependent visual acceptance remains with the owner.

### Sprint 1 delivered

- Replaced the long rendered homepage with a heritage hero, compact six-category discovery, conditional (currently hidden) specials/offers, and a compact Richardson visit block. Preserved the global header/footer and existing licensed imagery. The 25+ years and DFW copy came directly from the owner.
- Removed all customer-facing provider ordering links and buttons. Header, mobile drawer, footer, and homepage actions now browse the internal menu. The former ordering URL remains only in menu provenance and historical docs.
- Published 47 unique items from the owner-supplied snapshot in one typed seed, covering six primary categories and eleven subcategories. All six established menu category routes now render real content. Name search and subcategory filtering use URL queries. Hot Mix is visible with an honest empty state.
- Added descriptions for identifiable traditional dishes, existing licensed illustrative photos for matching dishes, and reserved-size branded fallbacks elsewhere. “Julie” remains listed without an invented description or image. Prices are integer cents and labeled reference prices; all units and live availability remain unknown.
- Added editable-shape models for categories, products, price options, homepage sections, specials, and promotions. Created a discreet `/admin/login` pending-setup page and unlinked `/cart` and `/checkout` coming-soon reservations. No authentication, mutation endpoint, database, cart, or payment flow exists.
- `npm.cmd run validate:menu`: passed all 47 supplied name/price mappings, unique IDs, category counts, subcategory membership, search behavior, and image-path checks. `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed. Build emitted `/menu`, six category routes, `/admin/login`, `/cart`, and `/checkout`. No browser was used; visual verification is **Pending Manual User Verification**.

### Next implementation priorities

1. Owner confirmation of direct selling prices, units, stock, ingredients/allergens, Hot Mix inventory, “Julie” identity, and current business hours.
2. Sprint 2: server-enforced admin login/logout and roles; PostgreSQL schema and migration; category/subcategory/product CRUD and reordering; price options, stock, archive/publish, image uploads; homepage copy/images/section visibility/order; scheduled specials/offers; production environment and storage configuration.
3. Sprint 3: variant-aware cart, server-authoritative pricing, fulfillment details, secure payment, order records and status, confirmations, and admin order management.
4. Sprint 4: security, accessibility, responsive manual QA, SEO, performance, and launch review. Owner must manually inspect 320px/mobile through desktop, search/filter links, image cropping, focus, and the Hot Mix empty state.

## Stages

| #   | Stage                | Status   | Notes                                                            |
| --- | -------------------- | -------- | ---------------------------------------------------------------- |
| 1   | Project architecture | Complete | Next.js App Router foundation, configuration, and documentation. |
| 2   | Design system        | Complete | Tasks 2.1–2.3 verified.                                          |
| 3   | Global layout        | Complete | Tasks 3.1–3.4 verified in code; visual review remains.           |
| 4   | Homepage             | Complete | Technical QA passed; manual visual acceptance remains pending.   |
| 5   | Product data         | Seeded   | 47 reference items; direct prices and details remain unverified. |
| 6   | Menu pages           | Complete | Browse/search/filter; manual visual review remains.              |
| 7   | Product details      | Pending  |                                                                  |
| 8   | Animations/mobile    | Pending  |                                                                  |
| 9   | Cart                 | Pending  |                                                                  |
| 10  | Ordering             | Pending  |                                                                  |
| 11  | Business/catering    | Pending  | Await verified business details.                                 |
| 12  | Admin/database       | Pending  |                                                                  |
| 13  | SEO/security         | Pending  | Basic metadata exists; full review remains.                      |
| 14  | QA                   | Pending  | Foundation checks do not complete full QA.                       |
| 15  | Vercel launch        | Pending  |                                                                  |

## Completed in Task 1.1

- Verified project root and initialized directly in it.
- Added strict TypeScript, Tailwind CSS, ESLint, Prettier, metadata, fonts, tokens, and a temporary responsive page.
- Documented intended feature locations without creating empty placeholder files.

## Stage 2 tasks

- Task 2.1 — Premium brand identity, typography, and design foundation: Complete.
- Task 2.2 — Premium reusable UI component library: Complete.
- Task 2.3 — Design system validation and refinement: Complete.

## Stage 3 tasks

- Task 3.1 — Premium header and desktop navigation: Complete.
- Task 3.2 — Full mobile navigation: Complete.
- Task 3.3 — Premium footer and global layout: Complete.
- Task 3.4 — Global integration and quality review: Complete.

Task 3.1 added a shared sticky header, text-based brand link, desktop navigation with an accessible Menu disclosure, a mobile link-row fallback, and the supplied external ordering link. Menu, catering, about, and contact routes are intentionally minimal `noindex` placeholders. No menu products or unverified business information were added.

Task 3.2 replaced the temporary mobile link row with a modal drawer, an expandable category list, and a persistent drawer ordering action. The desktop header, routes, and temporary page content remain intact. No new dependency was installed.

Task 3.3 added a responsive four-group footer and flex page flow. The footer uses supplied address and phone information, shared internal routes, and the existing ordering destination. Hours remain unconfirmed and social links remain hidden. No legal pages or additional dependencies were added.

Task 3.4 reviewed route landmarks, desktop and mobile navigation, footer data and links, design tokens, breakpoints, focus, motion, and client effects. It made the skip destination focusable with a sticky-header offset, limited desktop dropdown listeners to its open state, closed that dropdown on mobile transition, and expanded the directions link's accessible name. No dependency or feature was added. Stage 4 remains pending.

## Stage 4 tasks

- Task 4.1 — Luxury homepage hero and visual storytelling: Complete.
- Task 4.2 — Category showcase: Complete.
- Task 4.3 — Featured product showcases: Complete.
- Task 4.4 — Brand story, celebrations, and location: Technically complete; owner editorial review pending.
- Task 4.5 — Homepage refinement and QA: Technically complete; manual visual acceptance pending.

Task 4.1 replaced the temporary homepage with a single editorial hero, two working CTA destinations, and one locally optimized, licensed Indian sweets photograph. It added editorial and ingredient standards without publishing item prices, unconfirmed recipes, or a product catalog. No new runtime dependency was installed.

Task 4.2 added six linked, image-rich category cards directly beneath the hero. Their routes and order derive from shared navigation data; editorial copy and six locally optimized illustrative photos have separate source records. Existing menu category pages remain placeholders. No product listings, prices, new dependencies, or client-side interactions were added.

Task 4.3 added six Signature Sweets and six Royal Favorites in two responsive homepage sections. The typed dataset contains the owner-supplied online prices, traditional editorial descriptions, category associations, and image credits. Ten new locally optimized photos were licensed and two category photos reused. The ordering page returned HTTP 403 to a terminal request, so live price verification remains pending and `priceLastVerified` is null. On-page notes tell customers to confirm current prices. Product cards link to existing menu category placeholders; a separate action opens the established ordering site. No cart, product details, popularity claims, or new dependencies were introduced.

Task 4.4's supplied message stopped at “SECTION ONE: OUR STORY &”. A conservative implementation added three homepage sections using menu-based editorial copy, a call-to-ask celebrations invitation, and the confirmed Richardson location. Task 4.5 confirmed these three purposes and reviewed the complete homepage structure. The missing detailed brief still limits owner editorial signoff, but the available technical requirements are complete.

Task 4.5 audited the seven homepage sections, image subjects and licenses, content, actions, responsive CSS, semantics, and performance. It replaced the generic savory-mix photo with a documented CC0 namkeen photo, removed two redundant menu actions, clarified the group-order phone action, corrected a dark-surface focus outline and phone-link touch target, and made product-card link names describe their category destinations. No new dependency or client component was added.

## Unresolved decisions

- Reconfirm menu content, prices, imagery, business hours, and official social URLs before expanding customer-facing claims.
- Decide ordering integration and cart behavior in their respective stages.
- Confirm approved brand assets before future marketing pages.
- Supply an approved favicon or brand mark; the existing `/favicon.ico` request returns 404.
- Create legal pages only when approved policy text is available.
- Obtain approved Royal Sweets photography when available; the current hero image is illustrative stock photography.
- Obtain owner-approved category photography when available. The mango drink stock photo is not verified as lassi; the CC0 namkeen photo does not verify Royal Sweets hot-mix inventory.
- Reconfirm the twelve owner-supplied online prices used on the homepage; terminal access to the ordering page again returned HTTP 403 during Task 4.3. Confirm availability, portion units, and recipes before Stage 5 catalog work. “Julie” remains excluded.
- Obtain the missing detailed Task 4.4 copy requirements, if any, for owner editorial review; no business history, catering guarantee, or unconfirmed hours were published.

## Verification

- `npm.cmd ci`: passed with the committed lockfile.
- `npm.cmd run typecheck`: passed.
- `npm.cmd run lint`: passed without warnings.
- `npm.cmd run format:check`: passed.
- `npm.cmd run build`: passed; `/` and `/_not-found` prerendered as static routes.

### Task 2.1 verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd run format:check`: passed.
- Production page returned HTTP 200 with the expected copy, compiled tokens, font variables, and reduced-motion CSS.
- Chrome visual review at 320px, 400px, and desktop width showed readable typography, correct brand colors, and no visible horizontal overflow. Browser console showed no current issues after reload.
- Calculated contrast on warm ivory: burgundy 11.44:1, espresso 15.08:1, and warm gray 4.95:1. Antique gold is used decoratively, not as small text.

### Task 2.2 verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd run format:check`: passed.
- Development `/ui-preview` returned HTTP 200; production `/ui-preview` returned 404 without preview content. The existing homepage returned HTTP 200.
- Chrome visual review at desktop and 320px showed button variants, cards, badges, media frames, and skeletons rendering without visible horizontal overflow. Keyboard focus was visible; disabled and loading buttons were non-interactive.
- No new browser errors were observed. The pre-existing missing `/favicon.ico` request remains outside this task.

### Task 2.3 verification

- Confirmed the seven original palette values and calculated text contrast for primary, muted, secondary, success, warning, and unavailable states; all tested text pairs met 4.5:1 or better. Antique gold remains decorative.
- Checked the development preview in Chrome at 320px, 768px, and desktop width. Buttons, badges, cards, and media frames remained within the viewport; keyboard focus and disabled control semantics were visible.
- Refined reduced-motion behavior, long badge wrapping, section description typing, loading icon visibility, and Tailwind base-layer defaults without changing the temporary homepage.
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed.
- Production smoke test: `/` returned 200 and `/ui-preview` returned 404 without preview content.

### Task 3.1 verification

- `npm.cmd run typecheck`: passed.
- `npm.cmd run lint`: passed without errors.
- `npm.cmd run build`: passed; Next.js generated `/`, `/about`, `/catering`, `/contact`, `/menu`, and all six menu category paths.
- `git diff --check`: passed. Code review confirmed one global header, semantic navigation links, a keyboard-operable native disclosure with Escape handling, a skip link, and responsive mobile access.
- Browser and visual verification: Pending Manual User Verification, as requested for this task. No browser, screenshot, or localhost inspection was performed.

### Task 3.2 verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed.
- Production build retained the homepage, business placeholders, menu landing page, and six generated category paths.
- Code review confirmed native modal focus containment, Escape and backdrop dismissal, scroll-lock cleanup, desktop-breakpoint dismissal, separate Menu link and expansion button, and hidden collapsed categories.
- Browser and visual verification: Pending Manual User Verification. No browser or screenshot testing was performed for this task.

### Task 3.3 verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed.
- The production build generated the existing homepage, business placeholders, menu landing page, and six category paths.
- Code review confirmed one footer in the root layout, four responsive groups, internal and external link semantics, a directions link derived from the supplied address, clickable phone links, hidden unconfigured social links, and no extra main landmark.
- Static generated homepage HTML contained one `<main>`, one `<footer>`, the supplied address and phone link, a Maps directions URL, and “Call for current hours”; no social section was rendered.
- Browser and visual verification: Pending Manual User Verification. No browser, localhost page, or screenshot testing was performed for this task.

### Task 3.4 verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed.
- All eleven customer routes from the shared navigation arrays generated static HTML. Each had exactly one header, one main landmark, one footer, a skip target, a phone link, and no `href="#"` link.
- Calculated contrast against royal burgundy: ivory text 11.44:1; footer text at 85% opacity 8.67:1. Gold remains decorative.
- Reviewed 320px, 375px, 430px, 768px, 1024px, 1280px, and 1440px breakpoint and width rules in source. No code-level fixed-width overflow was found; rendered appearance was not assessed.
- Browser and visual verification: Pending Manual User Verification. Drawer interactions, keyboard focus, responsive appearance, and sticky positioning require the user's browser review.

### Task 4.1 verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed.
- Static production HTML contains one main landmark, one H1, the supplied hero copy, both CTA destinations, an optimized image preload, one global header, and one global footer.
- The local WebP is 1200 × 1800 and 273,602 bytes; its aspect-ratio frame, static Next.js Image import, responsive `sizes`, blur placeholder, and priority loading were checked in source and build output.
- The Unsplash photo page and license were checked through terminal HTTP. The ordering page returned HTTP 403, so live menu and prices could not be independently verified. No ordering-platform image was copied.
- Browser and visual verification: Pending Manual User Verification. No browser, localhost, screenshot, or automated visual test was used.

### Task 4.2 verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed.
- The production homepage HTML contains one header, one main, one footer, one H1, the category section heading, six category destinations, and six valid local category image references. All six category routes generated static HTML.
- Generated category images use lazy loading. Source inspection confirmed 4:5 reserved image frames, responsive `sizes`, focus treatment, reduced-motion handling, and no nested interactive controls.
- Unsplash search metadata identified all six creators and marked the photos free rather than Premium or Unsplash+. The license was checked via terminal HTTP, and the food subjects were inspected from local images. No ordering-platform images were copied.
- Browser and visual verification: Pending Manual User Verification. No browser, localhost, screenshot, or automated visual test was used.

### Task 4.3 verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed. The production build generated `/` and all existing category routes.
- A non-browser check of generated homepage HTML found twelve distinct product headings, the twelve supplied prices in their corresponding cards, correct category destinations, valid local image references, the requested section order, one header/main/footer/H1, visible photo-credit disclosures, and a safe external ordering link. No Add to Cart action was generated.
- Five free Unsplash photos and five CC BY-SA 4.0 Wikimedia Commons photos were checked by terminal metadata/license requests and local image previews. Existing category photos were reused for Masala Dosa and Pani Puri; all source details are in `IMAGE_SOURCES.md`.
- Code review found responsive one/two/three-column layouts, reserved image frames, focus styling, reduced-motion handling, and no new client component. Product photos use lazy loading below the hero.
- Browser and visual verification: Pending Manual User Verification. No browser, localhost, screenshot, or automated visual test was used.

### Task 4.4 verification to date

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed.
- Generated homepage HTML includes story, celebrations, and visit sections in order after the featured products; it retains one header, one main, one footer, and one H1.
- Static checks found the confirmed Richardson street address, ZIP code, phone link, unknown-hours fallback, directions URL, and reused image references. No Floyd Circle address or second-business detail was found.
- Browser and visual verification: Pending Manual User Verification. No browser, localhost, screenshot, or automated visual test was used.
- The later Task 4.5 brief confirmed the three section purposes. Owner review of editorial copy remains pending because the earlier detailed Task 4.4 message was incomplete.

### Task 4.5 verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run format:check`, and `npm.cmd run build`: passed. Existing customer routes still generated.
- Static production HTML checks found one header, main, footer, and H1; seven homepage sections in the intended order; twelve distinct product cards with the owner-supplied prices and correct category routes; confirmed Richardson address, phone, directions, and unknown-hours copy; and no fake cart links or Floyd Circle details.
- Local image review found recognizable food subjects. The generic Hot Mix asset was replaced with a namkeen photograph marked CC0 in Wikimedia Commons metadata. The [license](https://creativecommons.org/publicdomain/zero/1.0/) and original source were checked through terminal HTTP and recorded in `IMAGE_SOURCES.md`. No ordering-platform photograph was copied.
- Code review confirmed reserved image frames, responsive `sizes`, lazy loading below the hero, a single priority hero image, no extra client component, visible ivory focus on the burgundy celebrations section, touch-height phone access, and reduced-motion handling.
- Browser-dependent visual, keyboard, and responsive verification: Pending Manual User Verification. No browser, screenshot, localhost, or automated visual test was used.

## Manual homepage QA checklist

- At 320px, 375px, 430px, 768px, 1024px, 1280px, and 1440px, check section spacing, image crops, text wrapping, button fit, and horizontal overflow.
- Use keyboard navigation to check the desktop Menu dropdown, mobile drawer, product cards, celebrations actions, photo credits, phone link, and directions link. Confirm focus remains visible on ivory and burgundy backgrounds.
- Confirm the new Hot Mix image depicts namkeen, the hero and product photos remain clear, and illustrative captions do not suggest restaurant-owned photography.
- Open a category card, product card, Order Online link, phone link, and directions link to confirm each destination and new-tab behavior.
- Review story and celebrations copy with the owner; confirm current prices, hours, and group-order options before adding stronger claims.
