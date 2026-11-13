# Auto kuća Zaječar

Website for the Auto kuća Zaječar dealership, built with React, TypeScript, TanStack
Router/Start, Tailwind CSS and shadcn/ui.

## Getting started

```bash
bun install
bun run dev
```

## Scripts

| Script                | Description                |
| --------------------- | -------------------------- |
| `bun run dev`         | Start the dev server       |
| `bun run build`       | Build for production       |
| `bun run test`        | Run unit tests             |
| `bun run test:e2e`    | Run Playwright tests       |
| `bun run lint`        | Lint the codebase          |
| `bun run typecheck`   | Type-check the codebase    |
| `bun run format`      | Format with Prettier       |

## Structure

- `src/routes` — pages (TanStack Router)
- `src/components` — shared layout, UI and error components
- `src/features` — feature modules (inventory, forms, hero, ...)
- `src/lib` — shared utilities, data, SEO, analytics, i18n
- `src/types` — shared TypeScript types
