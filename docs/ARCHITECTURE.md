# Architecture

## Current foundation

- `src/app/`: App Router routes, root layout, metadata, and global styles.
- `src/app/globals.css`: Tailwind import, design tokens, and accessibility defaults.
- `public/`: static assets when approved images are available.
- `docs/`: architecture, progress, and decision log.

## Planned organization

Create directories when their first implementation is added:

- `src/components/ui/`: reusable interface elements.
- `src/components/layout/`: site header, footer, and page shell.
- `src/components/home/`: homepage sections.
- `src/components/menu/` and `src/components/products/`: menu browsing and product presentation.
- `src/components/cart/`: shopping cart interface.
- `src/hooks/`: shared client hooks.
- `src/lib/`: shared utilities and integrations.
- `src/types/`: domain types and data models.
- `public/images/`: locally hosted approved imagery.

Routes will live under `src/app/` as features are approved. Keep server components by default and add client boundaries only for interaction. Vercel can build the standard Next.js application without a custom adapter.
