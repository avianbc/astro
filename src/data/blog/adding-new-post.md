---
author: Sat Naing
pubDatetime: 2022-09-23T15:22:00Z
modDatetime: 2025-06-13T16:52:45.934Z
title: Adding new posts in AstroPaper theme
slug: adding-new-posts-in-astropaper-theme
featured: true
draft: false
tags:
  - docs
description:
  Some rules & recommendations for creating or adding new posts using AstroPaper
  theme.
---

Here are some rules/recommendations, tips & ticks for creating new posts in AstroPaper blog theme.

## Table of contents

## Creating a Blog Post

To write a new blog post, create a markdown file inside the `src/data/blog/` directory.

Starting from AstroPaper v5.1.0, you can now organize blog posts into subdirectories.

## Frontmatter

Frontmatter is the main place to store some important information about the blog post (article).

| Property           | Description                                | Remark                       |
| ------------------ | ------------------------------------------ | ---------------------------- |
| **_title_**        | Title of the post. (h1)                    | required                     |
| **_description_**  | Description of the post.                   | required                     |
| **_pubDatetime_**  | Published datetime in ISO 8601 format.     | required                     |
| **_modDatetime_**  | Modified datetime in ISO 8601 format.      | optional                     |
| **_author_**       | Author of the post.                        | default = SITE.author        |
| **_featured_**     | Whether or not display this in featured.   | default = false              |
| **_draft_**        | Mark this post unpublished.                | default = false              |
| **_tags_**         | Related keywords for this post.            | default = others             |
| **_ogImage_**      | OG image of the post.                      | optional                     |
| **_canonicalURL_** | Canonical URL (absolute).                  | optional                     |

Only `title`, `description` and `pubDatetime` fields in frontmatter must be specified.
