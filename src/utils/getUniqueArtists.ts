import type { CollectionEntry } from "astro:content";
import reviewFilter from "./reviewFilter";
import getUniqueBySlug from "./getUniqueBySlug";

interface Artist {
  artist: string; // slugified
  artistName: string; // display name
}

const getUniqueArtists = (reviews: CollectionEntry<"reviews">[]): Artist[] => {
  const allArtists = reviews
    .filter(reviewFilter)
    .map(review => review.data.artist);
  return getUniqueBySlug(allArtists).map(({ slug, name }) => ({
    artist: slug,
    artistName: name,
  }));
};

export default getUniqueArtists;
