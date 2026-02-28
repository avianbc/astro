import type { CollectionEntry } from "astro:content";
import getSortedContent from "./getSortedContent";

const getSortedReviews = (reviews: CollectionEntry<"reviews">[]) =>
  getSortedContent(reviews);

export default getSortedReviews;
