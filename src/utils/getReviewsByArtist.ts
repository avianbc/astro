import type { CollectionEntry } from "astro:content";
import getSortedReviews from "./getSortedReviews";

const getReviewsByArtist = (
  reviews: CollectionEntry<"reviews">[],
  artist: string
) =>
  getSortedReviews(
    reviews.filter(
      review => review.data.artist.toLowerCase() === artist.toLowerCase()
    )
  );

export default getReviewsByArtist;
