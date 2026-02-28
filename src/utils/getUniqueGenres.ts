import type { CollectionEntry } from "astro:content";
import reviewFilter from "./reviewFilter";
import getUniqueBySlug from "./getUniqueBySlug";

interface Genre {
  genre: string;
  genreName: string;
}

const getUniqueGenres = (reviews: CollectionEntry<"reviews">[]): Genre[] => {
  const allGenres = reviews
    .filter(reviewFilter)
    .flatMap(review => review.data.genre);
  return getUniqueBySlug(allGenres).map(({ slug, name }) => ({
    genre: slug,
    genreName: name,
  }));
};

export default getUniqueGenres;
