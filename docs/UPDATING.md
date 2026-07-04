# Updating this portfolio — guide for any AI (or human)

This site is **config-driven**. Nearly every update is a JSON edit in `site/content/` + a redeploy. No component code changes needed for content work.

**Live URL:** https://kushal-naik.vercel.app
**Stack:** Next.js (App Router) + Tailwind v4 + GSAP + `@paper-design/shaders-react` (hero only, desktop only) + `three` (starship viewer with a normal-gradient shader). Fully static. Perf rule: the hero MeshGradient is the only animated shader — section backgrounds are static CSS gradients; keep it that way.

---

## The golden rule

> All content and visibility lives in `site/content/*.json`. Components read those files at build time and render only `visible: true` items. If you're editing a `.tsx` file to change content, you're doing it wrong.

## Content files

| File | Owns | Common task |
|---|---|---|
| `content/site-config.json` | Section toggles, feature flags, social links + visibility, cal.com link, hero roles/badge, tech marquee | Show/hide anything; update a URL |
| `content/projects.json` | Project cards | **Add new project** |
| `content/experience.json` | Timeline entries | **Add internship/role** |
| `content/achievements.json` | Achievement chips | Add a win |
| `content/about.json` | Bio paragraphs, stats, photo path | Refresh bio |
| `content/gallery.json` | Art pieces (images + videos) | Add new render |
| `content/craft.json` | Skill facets, game card, commissions CTA, art profiles | Toggle commissions |

## Recipe: add a new project

1. Open `content/projects.json`, copy an existing object, edit fields:

```json
{
  "id": "my-new-project",
  "visible": true,
  "featured": false,
  "title": "Project Name",
  "badge": "Top X — Event Name",
  "event": "Where/what it was",
  "description": "What it is + why it matters. 2-4 sentences, honest.",
  "myRole": "What KUSHAL specifically built (null if solo/whole thing)",
  "highlights": ["Bullet 1", "Bullet 2"],
  "stack": ["Next.js", "Supabase"],
  "links": { "live": "https://...", "github": "https://...", "video": null },
  "linkNote": null
}
```

2. `featured: true` makes the card span 2 columns (keep exactly one featured).
3. Deploy (below).

## Recipe: add internship / experience

Copy an object in `content/experience.json` → `timeline` (newest goes FIRST in the array), fill `period`, `role`, `org`, `description`, `highlights`. Add matching chip in `achievements.json` if it's also a win.

## Recipe: add art to gallery

1. Optimize the file first:
   - Image: keep under ~2MB, drop into `site/public/art/` (kebab-case name)
   - Video: transcode + make poster (ffmpeg): `ffmpeg -i in.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -movflags +faststart -pix_fmt yuv420p -c:a aac -b:a 96k site/public/art/name.mp4` then `ffmpeg -ss 1 -i site/public/art/name.mp4 -frames:v 1 site/public/art/name-poster.jpg`
2. Add object to `content/gallery.json` → `items`. Categories: `client` | `challenge` | `personal` | `early`.

## Toggle reference (site-config.json)

| Flag | Effect |
|---|---|
| `sections.*` | Show/hide entire section (boot, hero, about, projects, experience, craft, booking, contact) |
| `features.bootAnimation` | ASCII boot overlay on first visit per session |
| `features.starshipModel` | 3D starship in hero |
| `features.techMarquee` | Scrolling tech-stack strip under hero |
| `features.commissionsOpen` | "Open for commissions" card in Craft |
| `features.asciiDividers` | Hairline section dividers with mono labels |
| `socials[n].visible` | Individual social button in footer |

Example: user says "show my Instagram" → set `socials` entry `instagram` → `"visible": true`. Done.

## Deploy

```bash
cd site
npm run build        # must pass before deploying
npm exec vercel -- deploy --prod --yes
```

Vercel project: `kushal-naik` (account kushalcoder-5785), aliased to kushal-naik.vercel.app. If a GitHub repo gets connected to the Vercel project later, `git push` auto-deploys and the CLI deploy becomes optional.

Local preview: `npm run dev` → http://localhost:3000

## Honesty guardrails — NEVER violate these in copy

1. **Kumbh Reunite:** auth/RBAC was *proposed*, never implemented — don't claim it. The translate-to-all-languages button was never committed — don't mention it. Demo backend is dead — never show a live link; say "demoed at the event, shared backend since retired."
2. **Ethos:** Kushal built the *Slack-history retrieval feature only*. Neo4j graph + dropout scorer were teammates' work.
3. **Vidyasarthi:** "piloted with a real institute" — never "deployed in production" (submitted report says "still under development").
4. **BloodConnect:** only project with verified live links — safe to link everywhere.
5. Don't invent numbers, placements, or features not in `Kushal_Naik_Master_Portfolio_Content.md` (repo root, one level up).

## Pending TODOs (state as of 2026-07-04)

- [x] **Cal.com**: `booking.calLink` = `kushal-naik` — embed live.
- [ ] **HackerRank**: only the private /dashboard URL is known. Get public profile URL, fill `socials` → `hackerrank.url`, set `visible: true` (Kushal explicitly wants it shown).
- [ ] **Pwnisher links**: Kushal will supply YouTube compilation links + timestamps for `alternate-realities` and `endless-engines` — fill `compilationLink` + `timestamp` in `gallery.json` (component shows badge already; link becomes clickable once present — check `Craft.tsx` renders it, wire if not).
- [ ] **Resume button**: V2 — resume being rewritten in a separate project. When PDF exists: drop in `public/`, add button to Hero/About.
- [x] **GitHub repo**: https://github.com/Kushal-Raptor-X/portfolio (public). Vercel not git-connected yet — connect in Vercel dashboard to get push-to-deploy; until then use the CLI deploy above.
- [ ] **Project GitHub links**: ResQ/Ethos/Vidyasarthi/Kumbh have `github: null` — fill if/when repos are public.

## V2 parking lot (from original spec — don't build unprompted)

ASCII-fy photo tool, custom domain, art commission form/pricing, background music player, email-capture scroll prompt, extra shader accents. Explicitly NOT a feature: visitor-intent scoring (separate product idea).
