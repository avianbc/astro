import type { CollectionEntry } from "astro:content";
import reviewFilter from "./reviewFilter";

const getSortedReviews = (reviews: CollectionEntry<"reviews">[]) => {
  return reviews
    .filter(reviewFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedReviews;
