import type { APIRoute, GetStaticPaths } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import getSortedPosts from "@/utils/getSortedPosts";
import { getPath } from "@/utils/getPath";
import { SITE } from "@/config";

export const getStaticPaths: GetStaticPaths = async () => {
  if (!SITE.dynamicOgImage) return [];

  const posts = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );
  const sortedPosts = getSortedPosts(posts);

  return sortedPosts.map(post => ({
    params: {
      slug: getPath(post.id, post.filePath, false).replace(/^\//, ""),
    },
    props: post,
  }));
};

export const GET: APIRoute = async ({ props: post }) => {
  const buffer = await generateOgImageForPost(
    post as CollectionEntry<"blog">
  );
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};
