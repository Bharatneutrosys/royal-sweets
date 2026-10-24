# Royal Sweets & Fast Food

Next.js foundation for the Royal Sweets & Fast Food website in Richardson, Texas.

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000. In PowerShell environments that allow npm scripts, `npm run dev` also works.

## Checks

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd run format:check
```

The temporary homepage contains only the business name and tagline. See `docs/` for architecture, decisions, and stage tracking. No environment variables are needed yet; `.env.example` is a placeholder for later stages.
