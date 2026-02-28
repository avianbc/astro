import type { CollectionEntry } from "astro:content";
import reviewFilter from "./reviewFilter";

const getUniqueYears = (reviews: CollectionEntry<"reviews">[]): number[] => {
  const years = reviews
    .filter(reviewFilter)
    .map(review => review.data.releaseYear);
  return [...new Set(years)].sort((a, b) => b - a); // most recent first
};

export default getUniqueYears;
