# Aryan Portfolio

Personal portfolio website. **Status: v1 live — single-page portfolio.** Edit copy, projects and socials in `src/content/site.ts`.

Planned stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Motion for React, Lucide, deployed on Vercel.

## Repository layout
| Path | Purpose |
|---|---|
| `CLAUDE.md` | Project standards for Claude Code |
| `.claude/rules/` | Design and engineering rules |
| `.claude/skills/` | `ui-ux-pro-max`, `frontend-design`, `ui-styling` |
| `.mcp.json` | Project MCP servers (Playwright, Chrome DevTools) |

## Environment notes
- `.mcp.json` args `--no-sandbox` / `--headless` were set for the Linux cloud container (runs as root). On a local Windows machine you may remove `--no-sandbox` and `--headless` for a visible browser.
- UI/UX Pro Max needs Python 3 (`python` on Windows).
- Skills were installed with `ui-ux-pro-max-cli@2.15.0` (MIT) and Anthropic `frontend-design` (Apache-2.0, from `anthropics/skills`).

## Deferred integrations
- **shadcn MCP:** enable after scaffolding, once `components.json` exists: `npx shadcn@latest mcp init --client claude`.
- **21st.dev Magic MCP:** needs a personal API key from https://21st.dev/mcp. Add locally (never commit): `claude mcp add --scope user ...` per the 21st docs, with the key in an environment variable.

## Develop
```bash
npm install
npm run dev
```
Checks: `npm run lint`, `npm run typecheck`, `npm run build`.

## Deploy (Vercel)
Import this repo in Vercel; the Next.js preset is auto-detected (no env vars needed). Branch previews are created per branch; production deploys from the production branch (`main`) after merge.

## Known notes
- `npm audit --omit=dev` reports a moderate `deepmerge` prototype-pollution advisory via the `shadcn` package (a build/CLI helper, not shipped to the browser). Re-check when shadcn releases a fix; do not use `npm audit fix --force` (it proposes a breaking downgrade).
