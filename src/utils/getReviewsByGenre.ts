import type { CollectionEntry } from "astro:content";
import getSortedReviews from "./getSortedReviews";
import { slugifyAll } from "./slugify";

const getReviewsByGenre = (
  reviews: CollectionEntry<"reviews">[],
  genre: string
) =>
  getSortedReviews(
    reviews.filter(review => slugifyAll(review.data.genre).includes(genre))
  );

export default getReviewsByGenre;
