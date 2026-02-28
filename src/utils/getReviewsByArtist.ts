import type { CollectionEntry } from "astro:content";
import getSortedReviews from "./getSortedReviews";
import { slugifyStr } from "./slugify";

const getReviewsByArtist = (
  reviews: CollectionEntry<"reviews">[],
  artistSlug: string
) =>
  getSortedReviews(
    reviews.filter(
      review => slugifyStr(review.data.artist) === artistSlug
    )
  );

export default getReviewsByArtist;
