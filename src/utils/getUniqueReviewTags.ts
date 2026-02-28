import type { CollectionEntry } from "astro:content";
import reviewFilter from "./reviewFilter";
import getUniqueBySlug from "./getUniqueBySlug";

interface ReviewTag {
  tag: string; // slugified
  tagName: string; // display name
}

const getUniqueReviewTags = (
  reviews: CollectionEntry<"reviews">[]
): ReviewTag[] => {
  const allTags = reviews
    .filter(reviewFilter)
    .flatMap(review => review.data.tags);
  return getUniqueBySlug(allTags).map(({ slug, name }) => ({
    tag: slug,
    tagName: name,
  }));
};

export default getUniqueReviewTags;
