import { slugifyStr } from "./slugify";

interface SlugifiedItem {
  slug: string;
  name: string;
}

/**
 * Deduplicates and sorts an array of strings by their slugified form.
 * Returns objects with `slug` (slugified) and `name` (original display value).
 */
const getUniqueBySlug = (items: string[]): SlugifiedItem[] =>
  items
    .map(item => ({ slug: slugifyStr(item), name: item }))
    .filter(
      (value, index, self) =>
        self.findIndex(v => v.slug === value.slug) === index
    )
    .sort((a, b) => a.slug.localeCompare(b.slug));

export default getUniqueBySlug;
