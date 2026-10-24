# Architecture

## Current foundation

- `src/app/`: App Router routes, root layout, metadata, and global styles.
- `src/app/globals.css`: Tailwind import, design tokens, and accessibility defaults.
- `src/components/ui/`: reusable visual controls and surfaces.
- `src/components/shared/`: layout primitives for future pages.
- `src/components/layout/`: global customer-facing header, navigation, and footer.
- `src/components/home/`: homepage hero and later approved sections.
- `src/lib/classNames.ts`: minimal conditional class joining without a styling dependency.
- `src/lib/business.ts`: supplied business identity, address, phone, ordering URL, and unconfirmed hours/social configuration.
- `src/lib/siteNavigation.ts`: shared navigation destinations, menu category paths, and active-link matching.
- `src/lib/featuredProducts.ts` and `src/types/featuredProduct.ts`: typed, single-source homepage product snapshot and price provenance.
- `public/images/hero/`: locally optimized, licensed hero photography.
- `public/images/products/`: locally optimized, licensed illustrative product photography.
- `docs/`: architecture, progress, and decision log.

## Planned organization

Create directories when their first implementation is added:

- Additional `src/components/home/` modules: future homepage sections.
- `src/components/menu/` and `src/components/products/`: menu browsing and product presentation.
- `src/components/cart/`: shopping cart interface.
- `src/hooks/`: shared client hooks.
- Additional `src/lib/` modules: shared integrations when needed.
- `src/types/`: domain types and data models.
- Further `public/images/` directories: locally hosted approved imagery for later sections.

Routes will live under `src/app/` as features are approved. Keep server components by default and add client boundaries only for interaction. Vercel can build the standard Next.js application without a custom adapter.

## Design foundation

### Colors

`src/app/globals.css` is the single source of color values. Tailwind v4's `@theme` defines the seven brand colors and semantic aliases. Use semantic utilities such as `bg-background`, `text-foreground`, `text-primary`, `text-muted`, and `border-border` in components. The core palette is royal burgundy `#641C32`, antique gold `#C9A45C`, warm ivory `#FFF9F0`, soft sand `#F3E8D7`, dark espresso `#29211E`, warm gray `#766B63`, and pistachio green `#83946C`.

Primary actions use `primary` with `on-primary`; secondary actions use `secondary` with `secondary-foreground`. `surface`, `surface-muted`, `border`, `success`, `error`, `warning`, `focus`, and disabled tokens cover interface states. Antique gold is decorative on light backgrounds; use `accent-foreground` for readable green-accent text.

### Typography

`src/app/layout.tsx` loads only Playfair Display and Manrope through `next/font/google` with `display: "swap"`. Headings use Playfair Display; body and interface text use Manrope. Tailwind typography tokens provide `text-hero`, `text-page`, `text-section`, `text-card`, `text-product`, `text-body`, `text-supporting`, `text-caption`, `text-button`, `text-label`, and `text-price`. Large scales use `clamp()` for mobile-first sizing. Use semantic heading levels independently of visual size.

### Layout and spacing

Use `.page-container` for a centered maximum width of `84rem` (1344px) with fluid horizontal gutters. Use `.section-space` for section rhythm and `--grid-gap` for responsive grids. Prefer Tailwind's default spacing scale within components. `radius-control`, `radius-surface`, and `shadow-surface` are intentionally restrained. `.surface-panel` and `.media-frame` are available when those patterns are needed. Keep images sized within frames to prevent layout shifts.

### Motion and interaction

`--duration-fast`, `--duration-standard`, `--duration-slow`, and `--ease-standard` define reusable CSS motion. `.interactive-surface` offers a simple hover treatment. Under `prefers-reduced-motion: reduce`, animations and transitions stop, interactive transforms are removed, and smooth scrolling stops. Avoid adding animation libraries for basic interactions.

### Responsive and accessible defaults

The fluid container, type scales, gutters, and section spacing cover mobile through large desktop without a separate layout framework. Tailwind breakpoints remain available for component-specific changes. Base styles provide readable text, underlined links, a visible `:focus-visible` ring, disabled cursors, balanced headings, and reduced-motion behavior. Check contrast whenever tokens are combined; gold and raw pistachio are not intended for small text on ivory.

## Reusable UI library

Import components directly from `src/components/ui/` or `src/components/shared/`. They are server-compatible and use the existing Tailwind and CSS tokens. Pass `className` for local layout adjustments rather than redefining the palette.

- `Button`, `ButtonLink`: primary, secondary, outline, and ghost variants; sm/md/lg sizes; optional icons and full width. `Button` accepts native button props, disabled, and loading. `ButtonLink` uses Next.js `Link` for real navigation.
- `Card`, `CardHeader`, `CardContent`, `CardFooter`: composable default, elevated, or outlined surfaces. `hoverable` adds visual emphasis without turning a card into a control.
- `Badge`: default, featured, bestseller, success, warning, unavailable, and neutral styling; sm/md size, soft/pill shape, and optional decorative icon. Long labels wrap within their available width. Product claims require verified data.
- `Container`, `Section`, `SectionHeading`: shared 1344px layout, optional narrow content, section backgrounds, and eyebrow/title/plain-text description headings with h2–h4 level and alignment.
- `MediaFrame`: stable square, 4:5 portrait, 3:2 landscape, or 16:9 wide frame. A real `src` requires meaningful `alt` or `decorative: true`. Uses Next.js `Image` with `fill` and `sizes`.
- `Divider`, `Skeleton`: standard/accent divider and text/image/card loading shapes. Skeletons are hidden from assistive technology; a real loading flow should provide status in its parent.

Use Lucide React icons at 14–18px with a 1.75 stroke for these compact interfaces. Icons beside visible text are decorative and hidden from screen readers. Do not nest buttons inside links or links inside buttons. Use `aria-label` if a future icon-only control has no visible text.

The showcase lives at `/ui-preview` in development. In production, that route returns 404 and is marked `noindex`. Run `npm.cmd run dev`, then visit `http://localhost:3000/ui-preview` to inspect components. The customer-facing starter page remains at `/`.

## Global header and navigation

`src/app/layout.tsx` renders one `SiteHeader` before route content and provides a skip link to each page's `#main-content`. The header stays in document flow with CSS `sticky`, an ivory surface, a fine border, and a restrained stacking level. `BrandLogo` is a text link so an approved logo asset can replace its contents later.

`DesktopNavigation` highlights the current route and supplies Home, Menu, Catering, About Us, and Contact links. `MenuDropdown` uses a native `details`/`summary` disclosure containing ordinary links, with Escape, outside-pointer, and route-change closing. It keeps native keyboard link behavior rather than claiming ARIA menu behavior. A small client boundary handles current-route and disclosure state; the rest of the header remains server rendered. The external Order Online `ButtonLink` opens the owner-provided ordering URL in a new tab with `noopener noreferrer`.

Below Tailwind's `lg` breakpoint (1024px), `MobileNavigation` replaces the desktop links with a 44px menu button. The brand remains visible. The header ordering link appears from `sm` (640px) upward; the same owner-provided link is always available at the bottom of the drawer, including at 320px. At `lg` and above, the desktop navigation and ordering link remain as in Task 3.1. Hidden navigation is removed from keyboard navigation by CSS display rules and the closed dialog state.

The mobile drawer is a native modal `<dialog>` in the browser top layer, above the sticky header's `z-40`; it does not require another z-index scale or a focus-trap dependency. Native modal behavior contains focus and makes the page behind it inert. The trigger uses `aria-expanded` and `aria-controls`; the dialog has a labeled heading and close button. Close, Escape, backdrop click, destination selection, and crossing into the desktop breakpoint dismiss it. Dismissal restores trigger focus when appropriate; resizing to desktop moves focus to the brand link instead of the now-hidden trigger. Body overflow is locked only while open and restored by effect cleanup. The navigation region scrolls independently so its footer action remains visible. CSS uses the existing duration and easing tokens for a restrained entrance; global reduced-motion rules disable it.

The mobile Menu row retains a direct `/menu` link beside a separate button with `aria-expanded` and `aria-controls`. The nested category list comes from `menuCategories` in `siteNavigation.ts`; it is hidden and unfocusable while collapsed. `siteLinks` also drives desktop and mobile primary navigation, and the ordering URL in `business.ts` is shared by both ordering actions. No category content or ordering flow was added.

`src/app/menu/page.tsx`, `src/app/menu/[category]/page.tsx`, `src/app/catering/page.tsx`, `src/app/about/page.tsx`, and `src/app/contact/page.tsx` are temporary branded placeholders. The menu slugs and labels are defined once in `siteNavigation.ts`. Placeholder metadata is `noindex`; no product or business claims are supplied. Stage 6 and later business tasks will replace these routes with verified content.

## Global footer and page flow

`src/app/layout.tsx` places one `SiteFooter` after route content. The body and content wrapper use a vertical flex layout so each route's existing `<main>` fills short pages and long pages scroll naturally. The wrapper does not add a second main landmark. The header remains sticky; the footer stays in normal flow.

`SiteFooter` is a server component with four groups: brand, Explore, Information, and Visit & Contact. The brand reuses `BrandLogo` in its inverse color variant. Explore and Information derive internal destinations from `siteNavigation.ts`; no second route list is maintained. Links use the existing CSS focus treatment, with an ivory focus outline on the burgundy footer. The grid moves from one column to two at `md` and four at `lg`.

`src/lib/business.ts` is the source for the supplied name, description, address, phone, ordering link, and derived Google Maps directions URL. Its `BusinessHours` type supports a future confirmed schedule; the current `unconfirmed` value shows “Call for current hours” with a phone link. Obtain owner confirmation before publishing hours because restaurant and ordering-platform hours can differ. `socialLinks` accepts Facebook, Instagram, and Google Business Profile URLs but is empty; the social section is omitted until official URLs are supplied. Legal pages and links remain pending. The copyright year is read from `Date` during rendering and updates when the static site is rebuilt.

## Stage 3 integration review

The root layout owns one header and footer, while each route owns one `<main id="main-content" tabIndex={-1}>`. The skip link can focus that landmark, and its scroll margin leaves room for the sticky header at mobile and desktop sizes. The desktop Menu disclosure attaches its document pointer and breakpoint listeners only while open, removes them on close, and closes when switching to mobile. The mobile modal keeps native focus containment, body scroll cleanup, and breakpoint dismissal. All three navigation surfaces use the shared route arrays; ordering and contact details come from `business.ts`.

Build-time checks cover route generation and generated HTML structure. Source review covers 320px through 1440px using the existing fluid gutter, `md` footer grid, and `lg` navigation boundary. Actual appearance, pointer behavior, and assistive technology behavior still require manual user verification without browser automation. The copyright year on static pages changes when the site is rebuilt.

## Homepage category showcase

`src/app/page.tsx` renders `CategoryShowcase` directly after `HeroSection`. The server component reuses `Section`, `Container`, `SectionHeading`, `Card`, and `MediaFrame`. Each card is one Next.js `Link` containing presentation-only content, an H3, and meaningful image alt text. No client state or new package is required.

`src/lib/homeCategories.ts` holds homepage editorial copy and image references. It derives six slugs, paths, labels, and display order from `menuCategories` in `siteNavigation.ts`, avoiding a duplicate route list. “Savory Snacks” is a homepage display title for `/menu/snacks`. The category routes remain `noindex` placeholders until menu work.

The grid has one column by default, two at `md`, and three at `lg`. Each photo uses a reserved 4:5 frame, Next.js Image responsive `sizes`, and default lazy loading below the hero. A section note identifies stock imagery as illustrative. Hover and focus treatments use existing motion tokens; reduced-motion settings remove movement. Sources and licensing are recorded in `IMAGE_SOURCES.md`. Actual hot-mix inventory remains unconfirmed.

## Homepage hero

`src/app/page.tsx` contains one route-owned `<main>` and renders the server-compatible `HeroSection` from `src/components/home/`. The hero keeps its copy, CTA links, and illustration in one focused component. It uses the shared `Container` and `ButtonLink` controls, the existing semantic color and typography tokens, and `orderingUrl` from `business.ts`. Later homepage sections can follow it without changing the global layout.

The image is a locally stored, licensed stock photograph imported statically into Next.js `Image`. A fixed aspect-ratio frame reserves space, `sizes` selects responsive image widths, `priority` preloads the lead image, and the static import supplies a blur placeholder. The caption identifies the image as illustrative and credits the photographer; it makes no claim about Royal Sweets products. Source, license, and processing are recorded in `docs/IMAGE_SOURCES.md`.

The section stacks copy and image on mobile and uses a balanced two-column composition at `lg`. A quiet sand field and gold frame accent the image without another color system. Short CSS entrance animations reuse motion tokens; global reduced-motion rules disable them. Product descriptions, prices, ingredients, and allergen standards are in `docs/CONTENT_GUIDELINES.md`. No catalog or product components are introduced in Task 4.1.

## Featured homepage products

`src/lib/featuredProducts.ts` is the only record list for the six Signature Sweets and six Royal Favorites. `FeaturedProduct` stores stable ID and slug, category ID, traditional editorial description, local image and alt, source credit, integer-cent online price, ordering-page URL, nullable verification date and price unit, section ID, and display order. The prices came from the owner-provided Task 4.3 menu list, received 2026-10-24. Direct terminal access to the ordering page returned HTTP 403, so `priceLastVerified` remains `null`; no serving unit is inferred. Stage 5 can extend the model after current prices, availability, and product details are confirmed. “Julie” is excluded pending identification.

`FeaturedProductsSection` renders the two server-side sections after `CategoryShowcase`; `FeaturedProductCard` is their reusable link surface. Product cards resolve internal category paths from `siteNavigation.ts` and do not imply product detail pages or a cart. Section actions link to `/menu/sweets`, `/menu`, and the existing external ordering URL. The category routes are still development placeholders.

Sweets use a three-column image-first grid at `lg`; favorites use a two-column grid with horizontal cards at `lg`. Both collapse to two columns at `md` and one on phones. `MediaFrame` reserves square image space, uses responsive Next.js Image sizing, and lazy loads below the hero. Existing `Card`, `Section`, `Container`, `SectionHeading`, and `ButtonLink` primitives provide styling. CSS-only image and arrow motion shares the existing timing tokens and respects reduced motion.

Product photographs are illustrative and their original sources and licenses are recorded in `IMAGE_SOURCES.md`. Two approved category photos are reused for Masala Dosa and Pani Puri rather than copied. A collapsed, keyboard-accessible credits disclosure in each section gives on-page attribution and license links, including the CC BY-SA 4.0 images and the WebP conversion note. The per-section pricing note distinguishes supplied online prices from current checkout totals and in-store prices. Product ingredient and allergen statements remain outside this task.

## Homepage story, celebrations, and visit

`src/app/page.tsx` follows the featured products with `BrandStorySection`, `CelebrationsSection`, and `VisitSection`. All are server components. They reuse the established container, section spacing, typography, button links, brand colors, and previously licensed Unsplash food images; no new assets or package were added. The story pairs menu-based editorial copy with two illustrative photos. The burgundy celebrations section invites callers to ask about current options rather than promising catering services. The visit section displays the confirmed Richardson address, phone, conditional business hours, and a directions link.

`src/lib/business.ts` remains the sole source for address, phone, hours, and Maps directions URL. Unknown hours continue to show “Call for current hours.” The location card does not embed a third-party map or invent coordinates. The `/about`, `/catering`, and `/contact` routes remain minimal placeholders until their separate tasks. The new sections are mobile-first, use reserved image frames and lazy-loaded Next.js images, and contain one H2 each below the homepage H1.

## Homepage refinement review

Task 4.5 reviewed the complete route composition, shared header and footer, mobile and desktop navigation, color tokens, fonts, links, data, and all displayed local images. The homepage keeps one H1 and seven route-owned sections after the global header. Existing `Section` spacing and `Container` gutters handle phone through desktop widths without another layout system. A category image was replaced with a locally optimized, CC0 photograph explicitly identified as namkeen; the asset record is in `IMAGE_SOURCES.md`.

The story and visit sections no longer repeat menu actions already offered earlier in the page. The celebrations action names the group-order inquiry while retaining a direct phone destination; it does not promise a catering package. Focus outlines on the burgundy celebrations surface use ivory, and the visit phone link is an inline flex target with a real minimum height. Product-card accessible names state that their destinations are category menus. These changes add no client-side JavaScript or dependency. Visual appearance and keyboard behavior still need the owner's manual browser review.
