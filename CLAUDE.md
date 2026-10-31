# Aryan Portfolio — Claude Code Guide

Personal portfolio site. Premium, editorial, professional. Deployed on Vercel from GitHub.

**Status:** App scaffolded (empty placeholder page only). Design system not finalized; do not build real UI/sections until asked.

**Next.js version note:** see `AGENTS.md` — this Next.js version differs from older docs; read `node_modules/next/dist/docs/` before writing Next-specific code.

## Commands
`npm run dev` · `npm run lint` · `npm run typecheck` · `npm run build` (all four must pass before commit/deploy).

## Stack (planned)
Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · Motion for React (`motion`) · Lucide · Vercel.
Node ≥ 20.9. Pick one package manager at scaffold time and keep to it.

## Standards
- **Quality:** small, single-purpose components/functions; descriptive names; no dead code; no premature abstraction. Run lint + typecheck before committing.
- **TypeScript:** `strict: true`; no `any`/`@ts-ignore` without a comment; type props explicitly; share types from one place.
- **Components:** Server Components by default; `"use client"` only when needed. shadcn primitives in `components/ui`; compose, don't fork. Content/data kept out of JSX.
- **Responsive:** mobile-first; verify 360/768/1024/1440; fluid type/spacing; no horizontal scroll.
- **Accessibility:** WCAG 2.2 AA; semantic HTML; visible focus; keyboard-operable; `prefers-reduced-motion` honored; alt text.
- **Security:** no secrets in repo/client; validate all input server-side; security headers via `next.config`; vet every new dependency.
- **Performance:** `next/image`, `next/font`, minimal client JS, dynamic import for heavy parts, animate only `transform`/`opacity`; target Lighthouse ≥ 90.
- **SEO:** per-route metadata, OG images, sitemap, robots, JSON-LD, one `h1` per page.
- **Testing:** typecheck + lint must pass; Playwright for critical flows/visual checks once the app exists; add tests with behavior changes.
- **Design consistency:** follow `.claude/rules/design.md`. Use tokens, not ad-hoc values.

## Git workflow
- Branch from `main`; work on `claude/*` or `feat/*` branches. Never push to `main` or open a PR without explicit user approval.
- Small, focused commits, imperative messages. Review `git diff` before every commit.
- Never overwrite user work; inspect before changing existing files.

## Skills & tools
- `.claude/skills/ui-ux-pro-max` — design intelligence (`python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`). Needs Python 3.
- `.claude/skills/frontend-design` — Anthropic's aesthetic-direction skill (Apache-2.0).
- `.claude/skills/ui-styling` — shadcn/Tailwind reference bundled with UI/UX Pro Max.
- MCP (`.mcp.json`): `playwright`, `chrome-devtools` for browser verification. `components.json` now exists, so shadcn MCP can be enabled (see README). 21st MCP needs a personal API key.
- Rules: `.claude/rules/`.
