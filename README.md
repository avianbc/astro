# Music Reviews

A music review site built with [Astro](https://astro.build/) and the [AstroPaper](https://github.com/satnaing/astro-paper) theme. Reviews are written in Markdown and managed via [Sveltia CMS](https://github.com/sveltia/sveltia-cms). Deployed on [Cloudflare Pages](https://pages.cloudflare.com/).

## Features

- Album reviews with 1–10 rating scale, genre/tag taxonomy, and per-reviewer attribution
- Browse by [genre](/genres/), [decade](/decades/), [artist](/artists/), or [reviewer](/reviewers/)
- Dynamic OG images for each review (artist, title, rating badge, genre)
- Schema.org `Review` + `MusicAlbum` structured data on every review page
- Full-text search via [Pagefind](https://pagefind.app/)
- Light & dark mode with View Transitions
- RSS feed at `/rss.xml`
- CMS at `/admin/` (Sveltia CMS backed by GitHub)

## Project Structure

```
├── public/
│   ├── admin/           # Sveltia CMS config + entry point
│   └── images/uploads/  # CMS-uploaded media
├── src/
│   ├── components/      # Astro components (Header, ReviewCard, RatingBadge, …)
│   ├── data/
│   │   ├── blog/        # Blog posts (currently empty)
│   │   ├── reviews/     # Album review Markdown files
│   │   └── reviewers/   # Reviewer profiles (YAML)
│   ├── layouts/         # Page layouts (Layout, ReviewLayout, PostDetails, …)
│   ├── pages/           # File-based routing
│   ├── styles/          # Global CSS + typography
│   ├── utils/           # Helpers (sorting, filtering, OG generation, slugify, …)
│   ├── config.ts        # Site-wide settings (title, author, pagination, …)
│   ├── constants.ts     # Social links + share links
│   └── content.config.ts # Astro content collection schemas
├── astro.config.ts
├── Dockerfile
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [pnpm](https://pnpm.io/)

### Install & Run

```bash
pnpm install
pnpm run dev        # http://localhost:4321
```

### Environment Variables

Copy `.env.example` to `.env` and fill in values as needed:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification tag |

## Commands

| Command | Action |
|---|---|
| `pnpm run dev` | Start dev server at `localhost:4321` |
| `pnpm run build` | Type-check, build, and generate Pagefind index |
| `pnpm run preview` | Preview production build locally |
| `pnpm run check` | Run Astro type checking |
| `pnpm run format` | Format with Prettier |
| `pnpm run lint` | Lint with ESLint |

### Docker

```bash
docker compose up -d                    # Dev server on :4321
docker build -t music-reviews .         # Production image (Alpine)
docker run -p 4321:80 music-reviews
```

## Writing Reviews

### Via the CMS

1. Go to `/admin/` and authenticate with GitHub.
2. Create a new **Album Review** — fill in artist, title, rating (1–10), genre, cover image, and body.
3. Set **Draft** to unchecked when ready to publish.
4. Save — Sveltia CMS commits the Markdown file to the repo.

### Manually

Create a Markdown file in `src/data/reviews/`:

```markdown
---
title: Album Title
artist: Artist Name
rating: 8
releaseYear: 2024
genre:
  - Post-Punk
  - Art Rock
coverImage: /images/uploads/album-cover.jpg
reviewer: reviewer-slug
pubDatetime: 2024-06-15T00:00:00Z
description: Short summary for cards and SEO.
tags:
  - Debut Album
featured: false
draft: false
---

Your review body in Markdown.
```

### Rating Scale

| Rating | Label | Color |
|---|---|---|
| 1–3 | Bad | Red |
| 4–5 | Below Average | Orange |
| 6–7 | Good | Amber |
| 8–9 | Great | Green |
| 10 | Essential | Violet (pulsing) |

### Cover Images

For best performance, store cover images locally in `public/images/uploads/` (or `src/assets/images/` to use Astro's `<Image>` component for responsive sizing and format conversion) rather than hotlinking external URLs. The CMS image widget uploads to `public/images/uploads/` by default.

External URLs (e.g. Wikipedia) work but bypass Astro's image pipeline — no automatic resizing, WebP/AVIF conversion, or lazy loading.

## Adding a Reviewer

Create a YAML file in `src/data/reviewers/`:

```yaml
name: Jane Doe
slug: jane-doe
bio: Music critic and vinyl enthusiast.
```

Then use `jane-doe` as the `reviewer` field in reviews. You can also add reviewers through the CMS at `/admin/`.

## Configuration

Edit `src/config.ts` to customize:

- **`website`** — deployed URL
- **`author`** / **`profile`** — default attribution
- **`title`** / **`desc`** — site metadata
- **`postPerPage`** — reviews per paginated page (default: 8)
- **`lightAndDarkMode`** — toggle theme switcher
- **`timezone`** — for scheduled post logic

Social links and share buttons are configured in `src/constants.ts`.

## Deployment

The site is configured for **Cloudflare Pages**:

1. Connect the GitHub repo in the Cloudflare dashboard.
2. Set build command: `pnpm run build`
3. Set output directory: `dist`
4. Add environment variables from `.env.example` if needed.

## Tech Stack

- **[Astro](https://astro.build/)** — static site framework
- **[TailwindCSS v4](https://tailwindcss.com/)** — utility-first styling
- **[Sveltia CMS](https://github.com/sveltia/sveltia-cms)** — git-based headless CMS
- **[Pagefind](https://pagefind.app/)** — static search index
- **[Satori](https://github.com/vercel/satori)** — OG image generation
- **[Cloudflare Pages](https://pages.cloudflare.com/)** — hosting & CDN

## License

Licensed under the MIT License. Based on [AstroPaper](https://github.com/satnaing/astro-paper) by [Sat Naing](https://satnaing.dev).
