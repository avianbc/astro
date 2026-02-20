import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import getSortedReviews from "@/utils/getSortedReviews";
import { SITE } from "@/config";

export async function GET() {
  const posts = await getCollection("blog");
  const reviews = await getCollection("reviews");

  const sortedPosts = getSortedPosts(posts);
  const sortedReviews = getSortedReviews(reviews);

  const postItems = sortedPosts.map(({ data, id, filePath }) => ({
    link: getPath(id, filePath),
    title: data.title,
    description: data.description,
    pubDate: new Date(data.modDatetime ?? data.pubDatetime),
  }));

  const reviewItems = sortedReviews.map(({ data, id }) => ({
    link: `/reviews/${id}/`,
    title: `${data.artist} — ${data.title} [${data.rating}/10]`,
    description: data.description,
    pubDate: new Date(data.modDatetime ?? data.pubDatetime),
  }));

  // Merge and sort all items by date, most recent first
  const allItems = [...postItems, ...reviewItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: allItems,
  });
}
