export const SITE = {
  website: "https://your-site.pages.dev/", // replace this with your deployed domain
  author: "Your Name",
  profile: "",
  desc: "Music reviews — albums worth your time.",
  title: "Music Reviews",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "",
  },
  dynamicOgImage: false,
  dir: "ltr",
  lang: "en",
  timezone: "America/New_York",
} as const;
