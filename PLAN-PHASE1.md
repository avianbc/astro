# Phase 1: Get It Live

**Goal**: Working site with reviews, deployed to Cloudflare Pages. AstroPaper default styling. Hand-written sample reviews. You can share the URL.

## 1.1 Scaffold AstroPaper — DONE

Already scaffolded at `C:\source\astro` via `pnpm create astro@latest --template satnaing/astro-paper`.

Remaining: update `src/config.ts` (site title, author, description, website URL, timezone) and `src/constants.ts` (social links).

## 1.2 Add reviews content collection

**Modify: `src/content.config.ts`**

Add a `reviews` collection alongside the existing `blog` collection (blog kept but hidden for future use). Also add a `reviewers` data collection.

**Reviews schema:**
```typescript
const reviews = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/data/reviews' }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    rating: z.number().min(1).max(10),
    releaseYear: z.number(),
    genre: z.array(z.string()),
    coverImage: z.string(),
    reviewer: z.string(),
    pubDatetime: z.date(),
    modDatetime: z.date().nullable().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});
```

**Reviewers data collection:**
```typescript
const reviewers = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/data/reviewers' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
  }),
});
```

**Create directories:** `src/data/reviews/`, `src/data/reviewers/`

## 1.3 Build basic review pages

Minimum viable pages using AstroPaper's existing styling:

- `src/pages/reviews/index.astro` — All reviews listing (sorted by date)
- `src/pages/reviews/[slug]/index.astro` — Individual review page
- `src/pages/index.astro` — Modify homepage to show latest reviews

Reuse AstroPaper's `Card.astro` and `Tag.astro` patterns. Keep existing `Header.astro` but add "Reviews" nav link. Hide blog from nav but keep the code.

**New utilities (adapt from existing patterns):**
- `src/utils/getSortedReviews.ts` — Adapt from `getSortedPosts.ts` (same pattern, `reviews` collection)
- `src/utils/reviewFilter.ts` — Adapt from `postFilter.ts` (same draft/date logic)
- `src/utils/getReviewsByGenre.ts` — Adapt from `getPostsByTag.ts`
- `src/utils/getUniqueGenres.ts` — Adapt from `getUniqueTags.ts`
- `src/utils/getReviewsByArtist.ts` — New, groups reviews by `artist` field
- `src/utils/getReviewsByDecade.ts` — New, groups reviews by `Math.floor(releaseYear / 10) * 10`

## 1.4 Add sample reviews

Create 3 hand-written markdown review files in `src/data/reviews/`:
- A 10/10 review (test high-score display)
- A 5/10 review (mid-range)
- A featured review (test homepage featuring)

Create 1 reviewer YAML file in `src/data/reviewers/` for yourself.

## 1.5 Deploy to Cloudflare Pages

1. Create a new public GitHub repository, push the project
2. Cloudflare Dashboard > Workers & Pages > Create > Pages
3. Connect the GitHub repo
4. Build settings: Framework preset: Astro, Build command: `npm run build`, Output: `dist`

**Phase 1 milestone**: Site is live at `your-site.pages.dev`. Reviews are visible. Search works. Dark/light toggle works. You can add reviews by writing markdown and pushing to GitHub.

## Verification

- [ ] `npm run dev` works locally
- [ ] Homepage shows latest reviews
- [ ] Individual review pages render with all metadata
- [ ] Search finds review content
- [ ] `npm run build` succeeds
- [ ] Site deploys to Cloudflare Pages
- [ ] Dark/light mode toggle works
