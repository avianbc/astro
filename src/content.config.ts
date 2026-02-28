import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const REVIEWS_PATH = "src/data/reviews";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const reviews = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${REVIEWS_PATH}` }),
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

const reviewers = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/data/reviewers" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { blog, reviews, reviewers };
