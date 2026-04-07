# AGENTS.md — BanuaDev Homepage

**BanuaDev** adalah website komunitas developer Kalimantan Selatan dengan fitur: landing page, sessions & workshops, speaker profiles, sponsors, partners, venue, tickets, blog, FAQ, forms, dan halaman info.

## Tech stack

- **Astro** `^6.0.0` — `astro.config.mjs`
- **Tailwind CSS** `^4.1.16` via **`@tailwindcss/vite`**; plugins: `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide`
- **MDX** — `@astrojs/mdx` (integration); **Sitemap** — `@astrojs/sitemap`; **RSS** — `@astrojs/rss` (`src/pages/rss.xml.js`)
- **Content** — `astro:content` with `defineCollection`, Zod (`astro/zod`), `glob` loader (`src/content.config.ts`)
- **SEO** — `@lexingtonthemes/seo` (`AstroSeo` in `src/components/fundations/head/Seo.astro`)
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

**`public/`** — static assets like fonts live here.

## Content collections (`src/content.config.ts`)

Collection keys for `getCollection` / `getEntry`: **`infopages`**, **`posts`**, **`speakers`**, **`sessions`**, **`sponsors`**.

### `infopages`

- **Folder:** `src/content/infopages/*.md`
- **Required frontmatter:** `page` (string), `pubDate` (date)
- **Template:** copy from `src/content/infopages/terms.md`

### `posts` (blog)

- **Folder:** `src/content/posts/*.md`
- **Required frontmatter:** `title`, `pubDate`, `description`, `image: { url, alt }` (url via `image()`), `tags` (string array)
- **Template:** copy from `src/content/posts/1.md`

### `speakers`

- **Folder:** `src/content/speakers/*.md` (entry `id` = filename without `.md`)
- **Required:** `name` (string)
- **Optional:** `role`, `company`, `headshot: { url: image(), alt? }`, `location`, `summary`, `tags`, `socials`, `talks`, `featured`
- **Template:** copy from `src/content/speakers/anna-muller.md`

### `sessions`

- **Folder:** `src/content/sessions/*.md`
- **Required:** `title`, `abstract` (min 40 chars), `speakers` (array of speaker entry ids), `day` (`day-1` … `day-7`), `start`, `end`, `room`
- **Optional:** `track`, `level`, `tags`
- **Template:** copy from `src/content/sessions/color-theory.md`

### `sponsors`

- **Folder:** `src/content/sponsors/*.md`
- **Required:** `name`, `url`, `logo: { url: image(), alt? }`
- **Optional:** `tier` (`platinum` | `gold` | `silver` | `bronze`)
- **Template:** copy from `src/content/sponsors/google.md`

## Routing (content → URLs)

| Content | URL pattern | Page(s) |
|---------|-------------|---------|
| `posts` | `/blog/posts/{id}` | `src/pages/blog/posts/[...slug].astro` |
| Blog index / tags | `/blog`, `/blog/tags`, `/blog/tags/{tag}` | `blog/index.astro`, `blog/tags/*` |
| `infopages` | `/infopages/{id}` | `src/pages/infopages/[...slug].astro` |
| `speakers` | `/speakers/profile/{id}` | `src/pages/speakers/profile/[...slug].astro` |
| `sessions` | `/sessions/workshop/{id}` | `src/pages/sessions/workshop/[...slug].astro` |
| `sponsors` | `/sponsors/details/{id}` | `src/pages/sponsors/details/[...slug].astro` |
| RSS | `/rss.xml` | `src/pages/rss.xml.js` |

Static pages: `/`, `/schedule`, `/venue`, `/tickets`, `/hosts`, `/partners`, `/gallery`, `/recap`, `/faq`, `/forms/*`, `404.astro`.

## Customization

- **Site URL:** `site` in `astro.config.mjs`
- **Colors & typography:** `src/styles/global.css` — `@theme` sets fonts and colors
- **Navigation & footer:** `src/components/global/Navigation.astro`, `src/components/global/Footer.astro`

## Commands

- `npm install` — dependencies
- `npm run dev` — Astro dev server
- `npm run build` — production build → `dist/`
- `npm run preview` — preview production build

## Guardrails

- **Do not rename** `src/components/fundations/` — the spelling is intentional.
- Prefer **small, pattern-matching diffs** (same import style `@/…`, same layout composition).
