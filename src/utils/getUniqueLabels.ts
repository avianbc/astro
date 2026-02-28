import type { CollectionEntry } from "astro:content";
import reviewFilter from "./reviewFilter";
import getUniqueBySlug from "./getUniqueBySlug";

interface Label {
  label: string; // slugified
  labelName: string; // display name
}

const getUniqueLabels = (reviews: CollectionEntry<"reviews">[]): Label[] => {
  const allLabels = reviews
    .filter(reviewFilter)
    .map(review => review.data.label)
    .filter((label): label is string => !!label);
  return getUniqueBySlug(allLabels).map(({ slug, name }) => ({
    label: slug,
    labelName: name,
  }));
};

export default getUniqueLabels;
