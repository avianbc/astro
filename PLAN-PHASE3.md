# Phase 3: Open the Doors

**Goal**: Sveltia CMS configured, OAuth proxy deployed, custom embed components registered, contributors onboarded. Non-technical users can create reviews through a browser UI.

## 3.1 Deploy OAuth proxy (Cloudflare Worker)

1. Deploy `sveltia-cms-auth` to Cloudflare Workers:
   - One-click deploy from https://github.com/sveltia/sveltia-cms-auth
   - Or: clone, `wrangler deploy`

2. Register a GitHub OAuth Application:
   - GitHub > Settings > Developer Settings > OAuth Apps > New
   - Homepage URL: `https://your-site.pages.dev`
   - Callback URL: `https://sveltia-cms-auth.SUBDOMAIN.workers.dev/callback`

3. Set Cloudflare Worker environment variables:
   - `GITHUB_CLIENT_ID` = your client ID
   - `GITHUB_CLIENT_SECRET` = your client secret (encrypted)

## 3.2 Set up Sveltia CMS admin

**New: `public/admin/index.html`**

Sveltia CMS admin page with custom editor components registered for:
- **Spotify Embed** — Toolbar button, paste URL, auto-generates iframe
- **YouTube Embed** — Toolbar button, paste URL, auto-generates iframe
- **Bandcamp Embed** — Toolbar button, paste Bandcamp URL/embed code, auto-generates iframe. Critical for metal.

**New: `public/admin/config.yml`**

```yaml
backend:
  name: github
  repo: OWNER/REPO_NAME
  branch: main
  base_url: https://sveltia-cms-auth.SUBDOMAIN.workers.dev

media_folder: "public/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: reviews
    label: Album Reviews
    label_singular: Album Review
    folder: "src/data/reviews"
    create: true
    format: frontmatter
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string", hint: "Album title" }
      - { label: "Artist", name: "artist", widget: "string" }
      - { label: "Rating", name: "rating", widget: "number", value_type: "int", min: 1, max: 10, step: 1 }
      - { label: "Release Year", name: "releaseYear", widget: "number", value_type: "int", min: 1960, max: 2030 }
      - label: "Genre"
        name: "genre"
        widget: "select"
        multiple: true
        min: 1
        options:
          - "Black Metal"
          - "Death Metal"
          - "Doom Metal"
          - "Thrash Metal"
          - "Power Metal"
          - "Progressive Metal"
          - "Sludge Metal"
          - "Stoner Metal"
          - "Grindcore"
          - "Metalcore"
          - "Deathcore"
          - "Post-Metal"
          - "Atmospheric Black Metal"
          - "Melodic Death Metal"
          - "Technical Death Metal"
          - "Folk Metal"
          - "Symphonic Metal"
          - "Industrial Metal"
          - "Nu Metal"
          - "Speed Metal"
          - "Heavy Metal"
          - "NWOBHM"
          - "Hardcore"
          - "Crossover"
          - "Other"
      - { label: "Cover Image", name: "coverImage", widget: "image" }
      - label: "Reviewer"
        name: "reviewer"
        widget: "relation"
        collection: "reviewers"
        search_fields: ["name"]
        value_field: "slug"
        display_fields: ["name"]
      - { label: "Publish Date", name: "pubDatetime", widget: "datetime" }
      - { label: "Description", name: "description", widget: "text", hint: "Short summary for cards and SEO" }
      - label: "Tags"
        name: "tags"
        widget: "select"
        multiple: true
        required: false
        options:
          - "New Release"
          - "Classic"
          - "Reissue"
          - "Debut Album"
          - "EP"
          - "Live Album"
          - "Split"
          - "Compilation"
          - "Demo"
          - "Essential Listening"
      - { label: "Featured", name: "featured", widget: "boolean", default: false, required: false }
      - { label: "Draft", name: "draft", widget: "boolean", default: true, hint: "Uncheck when ready to publish" }
      - { label: "Body", name: "body", widget: "markdown" }

  - name: reviewers
    label: Reviewers
    label_singular: Reviewer
    folder: "src/data/reviewers"
    create: true
    format: yml
    slug: "{{slug}}"
    identifier_field: name
    fields:
      - { label: "Name", name: "name", widget: "string" }
      - { label: "Slug", name: "slug", widget: "string", hint: "URL-friendly name (e.g., brad-carey)" }
      - { label: "Bio", name: "bio", widget: "text", required: false }
      - { label: "Avatar", name: "avatar", widget: "image", required: false }
      - label: "Links"
        name: "links"
        widget: "list"
        required: false
        fields:
          - { label: "Label", name: "label", widget: "string" }
          - { label: "URL", name: "url", widget: "string" }
```

Notes:
- Genre and Tags use `select` widget — predefined options, no freeform, guaranteed consistency.
- Reviewer uses `relation` widget → dropdown of registered reviewers.
- If `relation` widget has issues in Sveltia, fall back to predefined `select` list.
- Genre list expandable by editing config.yml (no code changes).

## 3.3 Onboard contributors

Each contributor needs:
1. A **GitHub account** (free)
2. **Write access** to the repo (add as collaborator)
3. A **reviewer profile** in `src/data/reviewers/`

## 3.4 Test the full CMS flow

1. Navigate to `/admin/` on the live site
2. Log in with GitHub OAuth
3. Create a new review using the CMS form
4. Verify the markdown file appears in the repo with correct frontmatter
5. Verify Cloudflare Pages auto-rebuilds
6. Verify the new review appears on the live site

**Phase 3 milestone**: Contributors can go to `/admin/`, log in with GitHub, and create fully-formed reviews with cover art, ratings, genre tags, and embedded music — all through a browser UI.

## Verification

- [ ] OAuth proxy deployed and responding
- [ ] CMS login works with GitHub credentials
- [ ] Review creation form shows all fields with correct widgets
- [ ] Genre dropdown shows predefined list
- [ ] Reviewer dropdown shows registered reviewers
- [ ] Image upload works (cover art)
- [ ] Spotify/YouTube/Bandcamp embed buttons work in editor
- [ ] Draft toggle works (draft reviews hidden on live site)
- [ ] Published review triggers Cloudflare rebuild and appears live
- [ ] Multiple contributors can log in and create reviews
