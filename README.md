# Kushal Naik — Portfolio

Live: **https://kushal-naik.vercel.app**

One-person portfolio site targeting both startup hiring managers and 3D-art commission clients. Config-driven: nearly all content lives in JSON, not components.

## Overview

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP + ScrollTrigger
- **Shaders:** `@paper-design/shaders-react` — hero background only, desktop only (perf rule, don't add more)
- **3D:** `three` — starship model viewer (`.glb`) with a normal-gradient shader
- **Icons:** `react-icons`
- Fully static output, deployed to Vercel

## Installation

```bash
git clone https://github.com/Kushal-Raptor-X/portfolio.git
cd portfolio/site
npm install
```

Requires Node.js 20+.

## Quickstart

```bash
npm run dev
```

Open http://localhost:3000. The page hot-reloads as you edit files.

To change what's on the site, you almost never edit a `.tsx` file — edit a JSON file in `content/` instead:

```jsonc
// content/projects.json — add a project card
{
  "id": "my-new-project",
  "visible": true,
  "featured": false,
  "title": "Project Name",
  "description": "What it is, 2-4 honest sentences.",
  "stack": ["Next.js", "Supabase"],
  "links": { "live": "https://...", "github": null, "video": null }
}
```

Then verify and deploy:

```bash
npm run build                              # must pass before deploying
npm exec vercel -- deploy --prod --yes     # or git push if Vercel is git-connected
```

Full content recipes, toggle reference, and copy guardrails: see [`docs/UPDATING.md`](docs/UPDATING.md).

## Features

- **Config-driven content** — every section (hero, about, projects, experience, craft, gallery, booking, contact) reads from `content/*.json` with per-item `visible` flags
- **Boot animation** — optional ASCII boot overlay on first visit per session
- **3D starship viewer** — interactive `.glb` model in the hero, normal-gradient shader
- **Animated hero shader** — `@paper-design/shaders-react` mesh gradient, desktop-only
- **Scroll-driven reveals** — GSAP ScrollTrigger throughout
- **Art gallery** — client work, challenge pieces, personal art, categorized and filterable
- **Cal.com booking embed**
- **Feature flags** — toggle any section or effect from `site-config.json` without touching code

## Project structure

```
site/
  app/          # Next.js App Router entry (layout, page, icons)
  components/   # React components — render content, hold no content themselves
  content/      # *** source of truth for all site copy + visibility toggles ***
  docs/         # UPDATING.md — content recipes, honesty guardrails, TODOs
  lib/          # shared utilities
  public/       # static assets (images, video, .glb models)
  types/        # TypeScript types for content shapes
```

## Contribution guidelines

This is a solo personal portfolio, not an open-source project seeking contributions — but if you're an agent or future collaborator working in this repo:

1. **Content changes go in `content/*.json`, never in components.** If a task only requires showing/hiding/editing copy, don't touch `.tsx` files.
2. **Never overclaim.** This site describes real projects with real limitations — see the honesty guardrails in `docs/UPDATING.md` before writing any project copy.
3. **Run `npm run build` and `npm run lint` before considering any change done.**
4. **Don't add new animated/shader effects** beyond the existing hero mesh gradient — section backgrounds are intentionally static CSS gradients for performance.
5. See root [`CLAUDE.md`](../CLAUDE.md) for full repo-wide agent guidelines, including the V2 parking lot of explicitly out-of-scope features.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [GSAP](https://gsap.com/docs/v3/)
