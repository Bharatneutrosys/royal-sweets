# Decisions

## Task 1.1

- Use the Next.js App Router with strict TypeScript and a `src/` root for application code.
- Use Tailwind CSS v4 and CSS custom properties for the seven supplied brand colors.
- Optimize Playfair Display and Manrope through `next/font/google`.
- Keep the initial homepage temporary and leave feature directories uncreated until they contain real code.
- Use npm and the standard Next.js build for Vercel compatibility.
- Avoid adding menu, ordering, business, or asset data until verified.

## Task 2.1

- Keep the original seven brand colors as primitives in Tailwind v4 `@theme`, then map semantic colors to them. This keeps utility classes and CSS variables aligned without a second palette.
- Use burgundy for readable emphasis and primary actions. Reserve antique gold for lines and other small decorative accents because gold text on ivory lacks sufficient contrast.
- Add darker success, error, warning, and accent-foreground shades for readable status text on light surfaces.
- Retain the existing `next/font` configuration. Define the typography scale in CSS tokens so future pages can share responsive sizing without another font or dependency.
- Set the content maximum to 1344px with fluid gutters and restrained borders, corners, shadows, and motion. This supports both editorial gifting pages and functional ordering pages.
- Keep the current route as a brand demonstration only; Stage 4 will provide the finished homepage.

## Task 2.2

- Build small server-compatible React primitives instead of adding a UI framework. Only Lucide React is added for consistent, lightweight icons.
- Share button styling between native action buttons and Next.js navigation links, while keeping their HTML semantics separate. Loading disables actions and exposes `aria-busy`.
- Make cards composable presentation surfaces, not implicit click targets. Future features decide whether a card contains an actual link or action.
- Require alt text for meaningful media through the `MediaFrame` TypeScript interface. Reserve aspect ratio before image loading to avoid layout shift.
- Keep the component showcase development-only and return 404 in production rather than exposing an unfinished playground.

## Task 2.3

- Stop animations and transitions completely under reduced-motion preference, including button press and card hover movement. Extremely short repeating animations can still cause unnecessary work.
- Let long badge labels wrap inside narrow containers instead of forcing one line and risking horizontal overflow.
- Keep `SectionHeading.description` plain text so its paragraph wrapper always remains valid HTML. Hide a loading button's trailing action icon while the spinner is shown.
- Put heading and link defaults in Tailwind's base layer so future utility classes can override them without selector fights.
- Leave the favicon open until an approved brand mark is available; adding an invented logo would be outside this refinement pass.

## Task 3.1

- Use a text-based `BrandLogo` link until an approved mark exists. Keep the global header in the root layout so customer-facing routes share one implementation.
- Centralize the five primary links and seven menu destinations in `siteNavigation.ts`; use the same paths for active states, dropdown links, and temporary category routes.
- Use native `details`/`summary` for the desktop Menu disclosure and normal links inside it. Escape, outside-pointer, and route-change closing enhance the native keyboard behavior without introducing a menu library or inappropriate ARIA menu roles.
- Keep the sticky treatment CSS-only to avoid scroll listeners and layout shifts. Reuse established colors, spacing, motion, focus, and button styles.
- Provide a scrollable mobile link row and visible ordering access until Task 3.2 supplies the complete mobile navigation. Do not show a nonfunctional menu icon.
- Mark placeholder routes `noindex` and limit their content to a title and development notice. Use the supplied external ordering link rather than implying native checkout exists.

## Task 3.2

- Replace the temporary mobile link row with a native modal `<dialog>`. Its top-layer focus containment, backdrop, and background inertness avoid a drawer dependency and custom focus-trap code.
- Keep the compact brand and 44px menu control visible at every mobile width. Show the header ordering link from 640px upward, while the drawer footer exposes it at all mobile widths without crowding a 320px header.
- Use the existing 1024px `lg` boundary for desktop navigation. A media-query listener closes an open drawer when crossing to desktop; it is removed on cleanup.
- Keep Menu as a direct link and use a neighboring button for category expansion. This preserves the landing page and avoids nested interactive elements. Draw both link sets and the external ordering URL from the shared navigation module.
- Let the navigation area scroll within the dialog while the ordering action stays at the bottom. Lock body scrolling only while the drawer is open, then restore its previous inline overflow value.
- Use the existing motion tokens for a short CSS entrance and rely on the global reduced-motion rule. Browser visual and interaction review remains with the user for this task.

## Task 3.3

- Reuse `BrandLogo` with an inverse variant for the burgundy footer, keeping one brand implementation and only decorative gold accents. Footer links use ivory text and an ivory focus outline for contrast.
- Keep the footer server rendered and in normal document flow. A flex body and content wrapper let existing route `<main>` elements fill short pages without adding another main landmark.
- Derive Explore and Information links from the shared navigation configuration. Put the supplied contact and ordering details in `business.ts` so the header and footer share one source.
- Treat hours as unconfirmed until the owner provides a schedule; show a phone link for current hours. Keep typed social links empty and hide their section until official URLs are verified.
- Build the directions URL from the supplied postal address. Do not add unimplemented legal links or contact channels. Calculate the copyright year at render/build time without adding client JavaScript.

## Task 3.4

- Keep route-owned main landmarks and the single root header/footer. Add focusable skip targets and a responsive scroll offset so the sticky header does not cover the target.
- Subscribe to desktop dropdown outside-pointer and breakpoint events only while its native disclosure is open. Close it on mobile transition so hidden state does not reopen unexpectedly. Keep the native mobile dialog and its existing focus and scroll handling.
- Include the street address in the directions link's accessible name. Keep the supplied business information and shared route data as their existing sources of truth.
- Use generated HTML and contrast calculations for non-browser integration checks. Leave visual, pointer, and assistive technology behavior for the user's manual review, as requested.

## Task 4.1

- Replace only the temporary homepage with one editorial hero, preserving the shared header, footer, and future route boundaries. Use the supplied headline and copy with a menu link and the existing external ordering URL.
- Use one free, non-premium Unsplash photograph of assorted Indian sweets. The source page and license were checked through terminal HTTP, and the image was inspected locally. Store an optimized WebP copy, identify it as illustrative, and credit the creator; do not present it as restaurant photography.
- Keep the image in a reserved aspect-ratio frame and use static Next.js `Image` metadata, responsive sizes, priority, and a blur placeholder. Use CSS motion tokens for a restrained entrance and honor reduced-motion preferences.
- Do not publish menu prices or recipe-specific details in the hero. The ordering platform returned HTTP 403 to terminal requests, so the user-provided list remains an editorial reference pending later reconfirmation. Record description, ingredient, and allergen standards separately from product implementation.

## Task 4.2

- Derive homepage categories from the existing shared menu route list and keep section-specific copy and imagery in `homeCategories.ts`. This prevents route drift between header, mobile menu, footer, and homepage.
- Use one linked card per category with a noninteractive surface inside it. Keep the section server rendered, use the existing 4:5 `MediaFrame`, and avoid a carousel or animation dependency.
- Use six locally optimized, free non-Premium Unsplash photographs as illustrative category imagery. Source metadata and license were checked through terminal requests, and subjects were inspected locally. The mango beverage photograph is not verified as lassi; the savory mix is not verified as Royal Sweets hot mix. Alt text describes what is visible.
- Keep existing category routes as placeholders and refrain from publishing product listings or hot-mix inventory. Owner-approved restaurant photography can replace stock files later without changing routes or card structure.

## Task 4.3

- Keep a single typed array for the 12 featured products. Store amounts in integer cents, use the shared ordering URL as the source reference, and leave `priceLastVerified` and `priceUnit` null because the owner-supplied online-menu prices could not be independently checked through terminal HTTP (403). Label prices as online and prompt customers to confirm current totals when ordering.
- Present traditional dish descriptions as general editorial language, not Royal Sweets recipe, portion, or allergen disclosures. Exclude “Julie” until its identity is clarified; avoid popularity badges and discounts.
- Reuse the existing Masala Dosa and Pani Puri category photographs. Add ten dish-specific local WebP photos with verified Unsplash or Wikimedia Commons licenses. Provide on-page attribution for CC BY-SA 4.0 works, indicate resizing/WebP conversion, and keep source records in `IMAGE_SOURCES.md`.
- Link cards to existing category routes and offer a single external Order Online action in the favorites section. This keeps ordering functional without suggesting that a card adds an item to a cart or carries a product selection to the provider.
- Vary the presentation through an image-first sweets grid and a wider favorites layout while retaining the shared card, image frame, spacing, typography, color, and reduced-motion rules.

## Task 4.4

- Keep the brand-story copy tied to the verified Richardson location and the existing sweets, chaat, snacks, and meal categories. Do not invent an ownership story, founding date, cultural lineage, awards, or preparation claims. The owner's Task 4.4 message ended before the detailed story requirements; the section therefore uses conservative editorial language.
- Treat celebrations as an invitation to ask about current options by phone. The project does not contain owner-confirmed catering packages or event-service details, so the section makes no availability promise and does not build a catering form.
- Reuse existing licensed Unsplash product photography for story and celebrations, with illustrative captions. No unrelated business imagery or new license obligations were introduced.
- Reuse `business.ts` for the Richardson address, phone, unknown-hours fallback, and directions URL. A lightweight address card avoids a map embed, third-party script, and unverified geolocation data.
