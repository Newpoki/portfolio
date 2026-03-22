# jasonsavelli.fr

Personal portfolio built with TanStack Start, React 19, and Paraglide for i18n (EN/FR).

## Stack

- **Framework** — [TanStack Start](https://tanstack.com/start) (SSR, file-based routing)
- **Styling** — Tailwind CSS v4
- **i18n** — [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) with URL-based locale routing
- **Data** — Prisma + TanStack Query
- **Auth** — Better Auth (GitHub OAuth)
- **Deployment** — Vercel

## Getting Started

```bash
pnpm install
pnpm dev
```

## Environment Variables

```env
VITE_BASE_URL=http://localhost:3000

# Auth
BETTER_AUTH_URL=http://localhost:3000
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_AUTHORIZED_EMAIL=

# Database
DATABASE_URL=
```

## i18n

Translations live in `messages/{locale}.json`. To machine-translate missing keys:

```bash
pnpm machine-translate
```

Routes are localized via `src/lib/translated-pathnames.ts` — add new public routes there when creating pages.

## Project Structure

```
src/
├── routes/          # File-based routes (TanStack Router)
│   ├── api/         # API handlers (server-only)
│   ├── admin/       # Admin panel (auth-protected)
│   └── ...
├── paraglide/       # Generated i18n runtime (do not edit)
├── components/      # Shared UI components
└── lib/             # Utilities
messages/
├── en.json
└── fr.json
```
