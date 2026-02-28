import type { CollectionEntry } from "astro:content";
import getSortedReviews from "./getSortedReviews";

const getReviewsByYear = (
  reviews: CollectionEntry<"reviews">[],
  year: number
) =>
  getSortedReviews(
    reviews.filter(review => review.data.releaseYear === year)
  );

export default getReviewsByYear;
