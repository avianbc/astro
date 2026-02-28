import type { CollectionEntry } from "astro:content";
import getSortedReviews from "./getSortedReviews";
import { slugifyAll } from "./slugify";

const getReviewsByTag = (
  reviews: CollectionEntry<"reviews">[],
  tag: string
) =>
  getSortedReviews(
    reviews.filter(review => slugifyAll(review.data.tags).includes(tag))
  );

export default getReviewsByTag;
