import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedReviews from "@/utils/getSortedReviews";
import { SITE } from "@/config";

export async function GET() {
  const reviews = await getCollection("reviews");
  const sortedReviews = getSortedReviews(reviews);

  const reviewItems = sortedReviews.map(({ data, id }) => ({
    link: `/reviews/${id}/`,
    title: `${data.artist} — ${data.title} [${data.rating}/10]`,
    description: data.description,
    pubDate: new Date(data.modDatetime ?? data.pubDatetime),
  }));

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: reviewItems,
  });
}
