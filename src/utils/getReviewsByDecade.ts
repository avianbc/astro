import type { CollectionEntry } from "astro:content";
import getSortedReviews from "./getSortedReviews";

const getReviewsByDecade = (
  reviews: CollectionEntry<"reviews">[],
  decade: number
) =>
  getSortedReviews(
    reviews.filter(
      review => Math.floor(review.data.releaseYear / 10) * 10 === decade
    )
  );

export default getReviewsByDecade;
