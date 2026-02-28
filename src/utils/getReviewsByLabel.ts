import type { CollectionEntry } from "astro:content";
import getSortedReviews from "./getSortedReviews";
import { slugifyStr } from "./slugify";

const getReviewsByLabel = (
  reviews: CollectionEntry<"reviews">[],
  labelSlug: string
) =>
  getSortedReviews(
    reviews.filter(
      review => review.data.label && slugifyStr(review.data.label) === labelSlug
    )
  );

export default getReviewsByLabel;
