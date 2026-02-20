# Phase 2: Make It Yours

**Goal**: Metal aesthetic, all browse/discovery pages, reviewer profiles, SEO structured data. The site looks and functions as designed.

## 2.1 Restyle for metal aesthetic — "Dark Editorial Brutalism"

**Design concept**: Sophistication of a high-end music publication (Decibel Magazine, Invisible Oranges) meets the raw weight of metal. Refined darkness, not cheesy skulls-and-flames.

**The unforgettable element**: The rating badge — oversized, monospace, color-coded.

### Typography

Loaded via Astro's experimental font provider in `astro.config.ts` (same pattern AstroPaper already uses for "Google Sans Code"). Define CSS variables `--font-display`, `--font-body`, `--font-mono`, then reference in `@theme inline` in `global.css`.

| Role | Font | CSS Variable | Why |
|------|------|-------------|-----|
| **Display/Headings** | `Syne` (700-800) | `--font-display` | Geometric, bold, unconventional. Uppercase for impact. |
| **Body text** | `Crimson Pro` (400-600) | `--font-body` | Refined editorial serif. Excellent readability. |
| **Monospace/Data** | `Space Mono` (400, 700) | `--font-mono` | Ratings, dates, metadata. Raw, industrial feel. |
| **Labels/Meta** | `Syne` (600) + letter-spacing | `--font-display` | Uppercase tracked-out: "DEATH METAL" "REVIEWER" |

### Color System

AstroPaper already uses CSS vars mapped to Tailwind via `@theme inline`. We replace values in `global.css`:

**Current AstroPaper vars (we keep the same names):** `--background`, `--foreground`, `--accent`, `--muted`, `--border`
**We add:** `--accent-gold` (secondary accent for featured items)

**`html[data-theme="light"]`** (AstroPaper's existing dark mode uses `data-theme` attribute):
```css
:root, html[data-theme="light"] {
  --background: #fafafa;
  --foreground: #0a0a0a;
  --accent:     #991b1b;     /* crimson (darker for light bg contrast) */
  --muted:      #f0f0f0;
  --border:     #d4d4d4;
  --accent-gold: #b45309;
}
```

**`html[data-theme="dark"]`:**
```css
html[data-theme="dark"] {
  --background: #0a0a0a;     /* near-black */
  --foreground: #ededed;
  --accent:     #b91c1c;     /* crimson — signature color */
  --muted:      #1c1c1c;
  --border:     #2a2a2a;
  --accent-gold: #d97706;
}
```

Add `--accent-gold` to `@theme inline` block:
```css
@theme inline {
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --color-accent-gold: var(--accent-gold);
}
```

### Rating Badge Color Scale

| Rating | Color | Tailwind | Label |
|--------|-------|----------|-------|
| 1-3 | `#dc2626` | `bg-red-600` | Bad |
| 4-5 | `#ea580c` | `bg-orange-600` | Below Average |
| 6-7 | `#d97706` | `bg-amber-600` | Good |
| 8-9 | `#16a34a` | `bg-green-600` | Great |
| 10 | `#eab308` | `bg-yellow-500` + glow | Essential |

### Visual Effects

- **Noise/grain texture**: Subtle SVG noise overlay on bg-primary (opacity 0.02-0.04). Printed zine feel.
- **Sharp corners everywhere**: `rounded-none`. Industrial. No soft curves.
- **Card hover**: `-translate-y-0.5` + crimson `border-left` (3px). Vinyl sleeve spine effect.
- **Album art**: Square aspect-ratio on cards with subtle dark vignette for text readability.
- **Headings**: Syne uppercase, `letter-spacing: 0.05em`, heavy weight.
- **Dividers**: Thin crimson lines (1px `--accent`) instead of gray.
- **Links**: Crimson, no underline, underline on hover.

### Layout Principles

- Review cards: CSS Grid, 2-3 columns desktop. Portrait-oriented (art drives shape).
- Review page hero: Full-width. Art left/top, metadata + rating right/bottom.
- Generous vertical whitespace. Dense metadata contrasted with open review body.

## 2.2 Build review-specific components

**New components:**
- `ReviewCard.astro` — Portrait card: square album art, title in Syne, artist in Crimson Pro, genre tags, rating badge overlaid on cover art bottom-right. Sharp corners, crimson left-border on hover.
- `RatingBadge.astro` — Props: `rating` (1-10), `size` ("sm"|"lg"). Space Mono bold, color-coded bg. Small: 32px (cards). Large: 96px+ (review pages). Rating 10 gets glow/pulse animation.
- `GenreTag.astro` — Uppercase Syne 600, tracked letter-spacing. Sharp corners, thin border, transparent bg.
- `ReviewHeader.astro` — Full-width hero: large album art + metadata column (artist, genre tags, reviewer, date, large RatingBadge).

**Modify existing:**
- `Header.astro` — Update nav (Reviews, Genres, About)
- `Footer.astro` — Update content

## 2.3 Add a review layout

**New: `src/layouts/ReviewLayout.astro`**

1. Hero section (ReviewHeader component)
2. Review body content (Crimson Pro, generous line-height)
3. Embedded media (Spotify/YouTube/Bandcamp iframes from markdown)
4. Share links (reuse ShareLinks.astro)
5. Related reviews (same genre/artist)

## 2.4 Build browse/discovery pages

- `src/pages/genres/index.astro` — Grid of genre cards with review counts
- `src/pages/genres/[genre]/[...page].astro` — Reviews filtered by genre, paginated
- `src/pages/artists/[artist]/[...page].astro` — Reviews filtered by artist, paginated
- `src/pages/decades/index.astro` — Browse by decade (auto-computed from `releaseYear`)
- `src/pages/decades/[decade]/[...page].astro` — Reviews from a decade
- `src/pages/reviewers/index.astro` — All reviewer profiles
- `src/pages/reviewers/[slug]/index.astro` — Reviewer profile (bio, avatar, links) + their reviews
- `src/pages/index.astro` — Redesign: featured review hero, latest reviews grid, genre quick-links, "Top Rated" section

## 2.5 Add schema.org structured data

Add `Review` + `MusicAlbum` JSON-LD to each review page `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "MusicAlbum",
    "name": "Album Title",
    "byArtist": { "@type": "MusicGroup", "name": "Artist" },
    "genre": "Death Metal"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "9",
    "bestRating": "10",
    "worstRating": "1"
  },
  "author": { "@type": "Person", "name": "Reviewer" },
  "datePublished": "2026-02-20"
}
```

## 2.6 Extend RSS feed

Modify `src/pages/rss.xml.ts` to include reviews alongside blog posts.

**Phase 2 milestone**: The site has its distinctive metal identity. All browse pages work. Reviewer profiles exist. Google can show star ratings in search results.

## Verification

- [ ] Metal aesthetic applied (fonts, colors, sharp corners, noise texture)
- [ ] Rating badges display correctly with color coding
- [ ] Genre browse pages list reviews by genre
- [ ] Artist pages group reviews by artist
- [ ] Decade pages auto-compute from releaseYear
- [ ] Reviewer profile pages show bio + their reviews
- [ ] Homepage features hero review + latest + genre links
- [ ] Schema.org JSON-LD renders in page source
- [ ] RSS feed includes reviews
- [ ] Mobile responsive
