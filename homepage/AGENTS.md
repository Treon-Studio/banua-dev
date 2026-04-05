# AGENTS.md — Dusk (Lexington Themes)

**Dusk** is a multi-page Astro theme for a **conference / design-week style marketing site**: landing with featured sessions and speakers, schedule, sessions & workshops, speaker profiles, sponsors, partners, venue, tickets, a “Journal” blog, FAQ, forms, legal/info pages, and a small design-system preview under `/system/*`. Publisher: [Lexington Themes](https://lexingtonthemes.com/).

## Tech stack (this repo)

- **Astro** `^6.0.0` — `astro.config.mjs`
- **Tailwind CSS** `^4.1.16` via **`@tailwindcss/vite`**; plugins: `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide`
- **MDX** — `@astrojs/mdx` (integration); **Sitemap** — `@astrojs/sitemap`; **RSS** — `@astrojs/rss` (`src/pages/rss.xml.js`)
- **Content** — `astro:content` with `defineCollection`, Zod (`astro/zod`), `glob` loader (`src/content.config.ts`)
- **Lexington** — `@lexingtonthemes/seo` (`AstroSeo` in `src/components/fundations/head/Seo.astro`)
- **Animation** — `gsap` (dependency only; use where the codebase already does)

Aliases: `@/*` → `src/*` (`tsconfig.json`).

## Folder map

| Area | Path | Role |
|------|------|------|
| Routes | `src/pages/` | File-based routes + dynamic `[...slug]` / `[tag]` segments |
| Shell layouts | `src/layouts/` | `BaseLayout`, `BlogLayout`, `InfoPagesLayout`, `SessionsLayout`, `SpeakersLayout`, `SponsorsLayout` |
| UI | `src/components/` | `fundations/` (head, elements, icons, scripts), `global/`, `landing/`, `blog/`, `sessions/`, `speakers/`, `sponsors/`, `assets/`, `ctas/` |
| Collections | `src/content/` | Markdown per collection (see below) |
| Design tokens | `src/styles/global.css` | Tailwind v4 `@theme` (fonts, accent/base palettes) |
| Static images | `src/images/` | Blog, speakers, sponsors, partners (referenced from frontmatter via `image()`) |

**`public/`** — not present in this repository; static assets live under `src/images/` (and are processed as part of the Astro pipeline where `image()` is used).

## Content collections (`src/content.config.ts`)

Collection keys for `getCollection` / `getEntry`: **`infopages`**, **`posts`**, **`speakers`**, **`sessions`**, **`sponsors`**.

### `infopages`

- **Folder:** `src/content/infopages/*.md`
- **Required frontmatter:** `page` (string), `pubDate` (date)
- **Images:** none in schema
- **Template:** copy from `src/content/infopages/terms.md`

### `posts` (blog / Journal)

- **Folder:** `src/content/posts/*.md`
- **Required frontmatter:** `title`, `pubDate`, `description`, `image: { url, alt }` (url via `image()`), `tags` (string array)
- **Images:** `image.url` must be a valid local image path for Astro’s image resolver (see existing: e.g. `/src/images/blog/1.jpg` in `src/content/posts/1.md`)
- **Template:** copy from `src/content/posts/1.md`

### `speakers`

- **Folder:** `src/content/speakers/*.md` (entry `id` = filename without `.md`)
- **Required:** `name` (string)
- **Optional:** `role`, `company`, `headshot: { url: image(), alt? }`, `location`, `summary`, `tags`, `socials` (`twitter` / `github` / `linkedin` / `website` — each must match `^(https?:\/\/|#_)`), `talks` (array of **session entry ids**), `featured` (boolean, default false)
- **Template:** copy from `src/content/speakers/anna-muller.md`

### `sessions`

- **Folder:** `src/content/sessions/*.md`
- **Required:** `title`, `abstract` (min 40 chars), `speakers` (array of **speaker entry ids**), `day` (`day-1` … `day-7`), `start`, `end`, `room`
- **Optional:** `track`, `level` (`beginner` | `intermediate` | `advanced`), `tags` (default `[]`)
- **Images:** none in schema
- **Template:** copy from `src/content/sessions/color-theory.md`

### `sponsors`

- **Folder:** `src/content/sponsors/*.md`
- **Required:** `name`, `url` (must match `^(https?:\/\/|#_)`), `logo: { url: image(), alt? }`
- **Optional:** `tier` (`platinum` | `gold` | `silver` | `bronze`, default `bronze`)
- **Template:** copy from `src/content/sponsors/google.md`

## Routing (content → URLs)

| Content | URL pattern | Page(s) |
|---------|-------------|---------|
| `posts` | `/blog/posts/{id}` | `src/pages/blog/posts/[...slug].astro` (`id` = filename stem) |
| Blog index / tags | `/blog`, `/blog/tags`, `/blog/tags/{tag}` | `blog/index.astro`, `blog/tags/*` |
| `infopages` | `/infopages/{id}` | `src/pages/infopages/[...slug].astro` |
| `speakers` | `/speakers/profile/{id}` | `src/pages/speakers/profile/[...slug].astro`; list: `/speakers` |
| `sessions` | `/sessions/workshop/{id}` | `src/pages/sessions/workshop/[...slug].astro`; list: `/sessions` |
| `sponsors` | `/sponsors/details/{id}` | `src/pages/sponsors/details/[...slug].astro`; list: `/sponsors` |
| RSS | `/rss.xml` | `src/pages/rss.xml.js` (uses `@astrojs/rss`; glob is `./blog/*` relative to that file — confirm it matches your actual post source if you rely on RSS) |

Static marketing pages (no collection): e.g. `/`, `/schedule`, `/venue`, `/tickets`, `/hosts`, `/partners`, `/gallery`, `/recap`, `/faq`, `/system/*`, `/forms/sign-in`, `/forms/register`, `/forms/contact`, `404.astro`.

## Customization guide

- **Site URL / canonical:** `site` in `astro.config.mjs` (currently `https://yourdomain.com`). Align placeholders in `src/components/fundations/head/Seo.astro` and any hard-coded URLs when you go live.
- **Colors & typography:** `src/styles/global.css` — `@theme` sets `--font-sans`, `--font-display`, `--color-accent-*`, `--color-base-*`. `BaseLayout` imports this file globally.
- **Navigation & footer:** `src/components/global/Navigation.astro`, `src/components/global/Footer.astro` (link lists live in those files).
- **Document head stack:** `src/layouts/BaseLayout.astro` → `src/components/fundations/head/BaseHead.astro` → `Seo`, `Meta`, `Fonts`, `Favicons`, `FuseJS` script.
- **Per-section layouts:** Blog/info/sessions/speakers/sponsors use their dedicated layouts under `src/layouts/`; keep `frontmatter={entry.data}` patterns consistent when adding props.

## Commands

From `README.md` / `package.json`:

- `npm install` — dependencies  
- `npm run dev` / `npm start` — Astro dev server  
- `npm run build` — production build → `dist/`  
- `npm run preview` — preview production build  
- `npm run astro -- …` — Astro CLI  

## Guardrails

- **Do not rename** `src/components/fundations/` — the spelling `fundations` is intentional and referenced throughout imports.
- **Avoid widening Zod schemas** in `src/content.config.ts` without updating every page/component that reads `entry.data` (layouts, cards, schedule, search index, etc.).
- Prefer **small, pattern-matching diffs** (same import style `@/…`, same layout composition).
- **`@lexingtonthemes/*`** — only `@lexingtonthemes/seo` is declared in `package.json`; do not assume other Lexington packages exist unless added there.

## Lexington docs & support (placeholders match README)

- **Documentation:** https://lexingtonthemes.com/documentation  
- **Theme specs (Dusk):** https://lexingtonthemes.com/templates/dusk  
- **Changelog (Dusk):** https://lexingtonthemes.com/changelog/dusk  
- **Support:** https://lexingtonthemes.com/legal/support/  
