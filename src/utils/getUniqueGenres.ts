import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import reviewFilter from "./reviewFilter";

interface Genre {
  genre: string;
  genreName: string;
}

const getUniqueGenres = (reviews: CollectionEntry<"reviews">[]): Genre[] => {
  const genres: Genre[] = reviews
    .filter(reviewFilter)
    .flatMap(review => review.data.genre)
    .map(genre => ({ genre: slugifyStr(genre), genreName: genre }))
    .filter(
      (value, index, self) =>
        self.findIndex(g => g.genre === value.genre) === index
    )
    .sort((a, b) => a.genre.localeCompare(b.genre));
  return genres;
};

export default getUniqueGenres;
