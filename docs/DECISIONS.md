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
