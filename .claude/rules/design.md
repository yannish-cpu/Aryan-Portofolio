# Design Guidelines

## Goals
- Premium, professional, modern-editorial identity. Confident, restrained, specific to Aryan — not a template.
- Strong typography as the primary design element: deliberate pairing (max 2 families), clear scale, generous line-height, tight display tracking. Use `next/font`.
- Clean layout, real whitespace, a consistent grid and spacing scale. Hierarchy through size/weight/space before color or boxes.
- Mobile-first. Design at 360px first; verify 360 / 768 / 1024 / 1440. No horizontal scroll, touch targets ≥ 44px.
- Motion is purposeful: a few meaningful transitions (entrance, hover/focus feedback, page/section reveal). Use Motion for React. Respect `prefers-reduced-motion`. Animate `transform`/`opacity` only.
- Accessibility: WCAG 2.2 AA contrast, visible focus, semantic landmarks, keyboard-complete, alt text, logical heading order.
- Performance: optimized images (`next/image`), minimal client JS, no layout shift, Lighthouse ≥ 90 on all categories as the target.

## Avoid
- Generic "AI site" look: centered hero + gradient blob + 3 identical feature cards.
- Neon text, heavy glows, glassmorphism overload, generic purple/indigo gradients. Exception (requested by the owner, v2): the hero's WebGL contour field may carry a soft warm brass light — keep it warm, low-saturation and confined to the hero.
- Emojis as decoration or icons (use Lucide where an icon is needed).
- Repetitive card grids and overused template patterns; vary section structure and rhythm.
- Animation for its own sake: parallax everywhere, looping effects, scroll-jacking, cursor gimmicks.
- Visual clutter, placeholder lorem ipsum in shipped work, stock-photo filler.

## Process
- Before designing any UI, consult `.claude/skills/frontend-design` (aesthetic direction) and `.claude/skills/ui-ux-pro-max` (`scripts/search.py` for palettes, type pairings, UX checks). Treat their output as input, not as the answer: reject suggestions that violate "Avoid" above.
- v2 direction (inspired by techniques on farizul.com — never copy its logo, copy, imagery, ribbons, coordinates marquee or fonts): animated topographic hero, floating pill nav, scroll-lit statement, colour-shifting project showcase, stacked service cards, light About section.
- Palette/type: warm near-black, off-white ink, one muted brass accent; Instrument Serif (display) + Geist (text). Tokens live in `src/app/globals.css` — change them there, not ad hoc.
