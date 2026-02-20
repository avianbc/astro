# AstroPaper 📄

![AstroPaper](public/astropaper-og.jpg)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/github/license/avianbc/astro?color=%232F3741&style=for-the-badge)

A minimal, responsive, accessible and SEO-friendly Astro blog — scaffolded from the [satnaing/astro-paper](https://github.com/satnaing/astro-paper) template.

## 🔥 Features

- [x] Type-safe markdown
- [x] Super fast performance
- [x] Accessible (Keyboard/VoiceOver)
- [x] Responsive (mobile ~ desktops)
- [x] SEO-friendly
- [x] Light & dark mode
- [x] Fuzzy search
- [x] Draft posts & pagination
- [x] Sitemap & RSS feed
- [x] Dynamic OG image generation

## 🚀 Project Structure

```
/
├── public/
│   ├── pagefind/          # auto-generated on build
│   ├── favicon.svg
│   └── astropaper-og.jpg
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   ├── data/
│   │   └── blog/          # markdown blog posts
│   ├── layouts/
│   ├── pages/
│   ├── scripts/
│   ├── styles/
│   ├── utils/
│   ├── config.ts
│   ├── constants.ts
│   ├── content.config.ts
│   └── env.d.ts
└── astro.config.ts
```

## 🧞 Commands

All commands are run from the root of the project:

| Command               | Action                                          |
| :-------------------- | :---------------------------------------------- |
| `npm install`         | Install dependencies                            |
| `npm run dev`         | Start local dev server at `localhost:4321`      |
| `npm run build`       | Build production site to `./dist/`              |
| `npm run preview`     | Preview the build locally before deploying      |
| `npm run format`      | Format code with Prettier                       |
| `npm run format:check`| Check formatting with Prettier                  |
| `npm run lint`        | Lint with ESLint                                |
| `npm run sync`        | Generate TypeScript types for Astro modules     |

## 💻 Tech Stack

- **Framework** — [Astro](https://astro.build/)
- **Styling** — [TailwindCSS](https://tailwindcss.com/)
- **Type Checking** — [TypeScript](https://www.typescriptlang.org/)
- **Static Search** — [Pagefind](https://pagefind.app/)
- **Code Formatting** — [Prettier](https://prettier.io/)
- **Linting** — [ESLint](https://eslint.org)

## 📖 Documentation

See the upstream [AstroPaper docs](https://astro-paper.pages.dev/posts/) for full configuration and customization guides.

## 📜 License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.