# Architecture

## Current foundation

- `src/app/`: App Router routes, root layout, metadata, and global styles.
- `src/app/globals.css`: Tailwind import, design tokens, and accessibility defaults.
- `src/components/ui/`: reusable visual controls and surfaces.
- `src/components/shared/`: layout primitives for future pages.
- `src/components/layout/`: global customer-facing header and navigation.
- `src/lib/classNames.ts`: minimal conditional class joining without a styling dependency.
- `src/lib/siteNavigation.ts`: shared navigation destinations, menu category paths, and active-link matching.
- `public/`: static assets when approved images are available.
- `docs/`: architecture, progress, and decision log.

## Planned organization

Create directories when their first implementation is added:

- Further `src/components/layout/` modules: footer when its task begins.
- `src/components/home/`: homepage sections.
- `src/components/menu/` and `src/components/products/`: menu browsing and product presentation.
- `src/components/cart/`: shopping cart interface.
- `src/hooks/`: shared client hooks.
- Additional `src/lib/` modules: shared integrations when needed.
- `src/types/`: domain types and data models.
- `public/images/`: locally hosted approved imagery.

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

The mobile Menu row retains a direct `/menu` link beside a separate button with `aria-expanded` and `aria-controls`. The nested category list comes from `menuCategories` in `siteNavigation.ts`; it is hidden and unfocusable while collapsed. `siteLinks` also drives desktop and mobile primary navigation, and `orderingUrl` is shared by both ordering actions. No category content or ordering flow was added.

`src/app/menu/page.tsx`, `src/app/menu/[category]/page.tsx`, `src/app/catering/page.tsx`, `src/app/about/page.tsx`, and `src/app/contact/page.tsx` are temporary branded placeholders. The menu slugs and labels are defined once in `siteNavigation.ts`. Placeholder metadata is `noindex`; no product or business claims are supplied. Stage 6 and later business tasks will replace these routes with verified content.
