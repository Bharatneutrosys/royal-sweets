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
