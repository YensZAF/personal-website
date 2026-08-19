# Personal site design

## Subject

Single-page personal site for Yens (GitHub: YensZAF), senior cyber analyst at
Cyberlogic, MS Cybersecurity candidate at Michigan Tech (MTU), interested in
AI's growing integration into security. Audience: recruiters, colleagues,
collaborators. Page's job: establish credibility fast, signal cyber + AI
interest, enable contact. Not a freelance/consulting pitch.

Visual reference: hudovich.com (dark terminal aesthetic, monospace type,
minimal card components, uppercase section labels, single-column centered
layout, hairline dividers). This design borrows the structural language but
uses its own palette, type, and signature element — not a clone.

## Tech

Existing SvelteKit static scaffold (`adapter-static`, `prerender = true`,
TypeScript, ESLint, Prettier). Build on top of it — no new framework
decisions needed. Static HTML/CSS/minimal JS (theme detection is CSS-only via
`prefers-color-scheme`; node-graph animation is the only JS beyond SvelteKit
boilerplate).

## Color tokens

Dark mode (default when `prefers-color-scheme: dark`):

| token        | value     | use                                                |
| ------------ | --------- | -------------------------------------------------- |
| `--bg`       | `#0a0e17` | page background                                    |
| `--surface`  | `#10151f` | card/elevated background                           |
| `--border`   | `#1e2735` | hairlines, card borders                            |
| `--text`     | `#e2e8f0` | primary copy                                       |
| `--text-dim` | `#7c8aa0` | section labels, secondary copy                     |
| `--accent`   | `#4d8dff` | links, primary accent                              |
| `--accent-2` | `#38bdf8` | gradient pairing with accent, node-graph highlight |

Light mode (`prefers-color-scheme: light`):

| token        | value     | use                                                |
| ------------ | --------- | -------------------------------------------------- |
| `--bg`       | `#f4f6f9` | page background                                    |
| `--surface`  | `#ffffff` | card/elevated background                           |
| `--border`   | `#dde3ec` | hairlines, card borders                            |
| `--text`     | `#131b29` | primary copy                                       |
| `--text-dim` | `#57657a` | section labels, secondary copy                     |
| `--accent`   | `#2f6fed` | links, primary accent                              |
| `--accent-2` | `#0ea5c4` | gradient pairing with accent, node-graph highlight |

No toggle, no stored override — pure CSS `@media (prefers-color-scheme)`,
switches live if the OS/browser setting changes.

## Type

IBM Plex Mono throughout (self-hosted or Google Fonts, `font-display: swap`).

- Headers: weight 600, tight letter-spacing, larger scale (hero name ~2.5rem,
  section headers ~1rem uppercase)
- Body: weight 400, 1rem, line-height 1.6
- Section eyebrow labels (ABOUT / PROJECTS / CONTACT): weight 500, uppercase,
  letter-spacing 0.08em, `--text-dim` color, ~0.8rem

## Layout

Single column, centered, max-width 740px, generous vertical rhythm (~4rem
between sections), hairline `--border` divider between each section. No
sidebar, no multi-column grid except the projects card row (2-up on desktop,
1-up on mobile).

```
[node-icon] YZ
─────────────────────────────
  [faint node-graph bg, hero only]
  Hey, I'm Yens.
  Senior Cyber Analyst @ Cyberlogic
  MS Cybersecurity Candidate @ MTU
  [Email] [LinkedIn] [GitHub]
─────────────────────────────
ABOUT
  paragraph — role, degree, AI-in-security interest
─────────────────────────────
PROJECTS
  [placeholder card] [placeholder card]
─────────────────────────────
CONTACT
  email / links
```

## Sections

**Header** — node-graph glyph icon (3 dots, 2 connecting lines, ~20px,
`--accent`) + "YZ" mono wordmark, left-aligned. No nav links (single page, no
other routes). No theme toggle.

**Hero** — text-only (no photo/avatar). Greeting line ("Hey, I'm Yens."),
subtitle line (role + degree), CTA row: Email / LinkedIn / GitHub / X /
Mastodon as plain link buttons (bordered, `--surface` bg, `--accent` on
hover), matching ref site's button treatment but in accent blue not amber.
Node-graph signature renders behind this section only (see below).

**About** — eyebrow label "ABOUT", one paragraph of prose covering: senior
cyber analyst role at Cyberlogic, MS Cybersecurity candidate at MTU, and
interest in AI's growing role in security tooling/detection. Draft copy:

> I'm a senior cyber analyst at Cyberlogic, currently pursuing a Master's in
> Cybersecurity at Michigan Tech. Lately I've been drawn to how AI is
> reshaping the security field — from detection and triage to the new
> attack surface it creates — and I like digging into that intersection.

(User can revise wording during implementation review.)

**Projects** — eyebrow label "PROJECTS", 2 placeholder cards in a responsive
row (stacks to 1 column under ~640px). Each card: title, one-line
description, "placeholder" tag pill (`--text-dim` border, no fill — visually
distinct from real content so it's obvious these need swapping). Card style:
`--surface` bg, `--border` 1px border, rounded corners (~8px), padding
~1.25rem, matches ref site's card treatment.

**Contact** — eyebrow label "CONTACT", one line of prose + email link
(underlined `--accent`) + repeat of LinkedIn/GitHub/X/Mastodon links.

Link targets:

- Email: `me@yensloff.com`
- GitHub: `https://github.com/YensZAF`
- LinkedIn: placeholder href (`#`) — real URL to be supplied later
- X/Twitter: placeholder href (`#`) — handle to be supplied later
- Mastodon: placeholder href (`#`) — handle to be supplied later

## Signature element: node-graph background

Hero-only decorative background: a sparse graph of dots (nodes) connected by
thin lines (edges), rendered in `--border`/`--accent` at low opacity, sitting
behind the hero text (z-index below content, `pointer-events: none`). Reads
simultaneously as a security dependency graph and a neural net — the literal
overlap of the two domains the site is about.

- Implementation: inline SVG or `<canvas>`, ~15-25 nodes at randomized (but
  seeded/deterministic, not re-randomized per reload) positions within the
  hero bounds, edges drawn between nodes under a distance threshold.
- Motion: nodes drift slowly (subtle, <2px range, long duration ~8-12s
  ease-in-out loop); one or two nodes pulse opacity gently. Wrapped in
  `@media (prefers-reduced-motion: reduce)` → animation disabled, graph
  renders static.
- Opacity kept low (~0.15-0.25) so hero text stays fully legible — this is
  atmosphere, not a focal element.

## Accessibility / quality floor

- Responsive down to ~360px mobile viewport
- Visible keyboard focus states on all links/buttons (`--accent` outline)
- `prefers-reduced-motion` respected (node-graph, any hover transitions)
- Semantic HTML (`<header>`, `<main>`, `<section>` per block, heading
  hierarchy h1 → h2 per section)
- Color contrast checked for both modes (body text vs bg, dim text vs bg)

## Out of scope

- Blog/writing section (not requested)
- Experience/timeline section (explicitly excluded)
- Manual theme toggle or persisted override (explicitly excluded — auto only)
- Real project content (placeholders only, swapped later)
- Photo/avatar (text-only hero)
