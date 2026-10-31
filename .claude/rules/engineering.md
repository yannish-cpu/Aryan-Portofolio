# Engineering Rules

- Server Components by default; add `"use client"` only for interactivity/animation, as deep in the tree as possible.
- No `any`; prefer `unknown` + narrowing. Validate external input (forms, env) with a schema.
- Feature-oriented structure: `app/` routes, `components/ui/` (shadcn primitives), `components/` (composed), `lib/` (utils, config), `content/` (copy/data separate from markup).
- Never commit secrets. Only `NEXT_PUBLIC_*` vars may reach the client. Keep `.env.example` current.
- Contact form (if any): server-side validation, rate limiting/honeypot, no secrets in client code.
- SEO: per-route `metadata`, canonical, Open Graph/Twitter images, `sitemap.ts`, `robots.ts`, JSON-LD `Person`.
- Verify UI changes in a browser (Playwright MCP) at mobile + desktop widths before declaring done.
