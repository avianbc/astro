import type { CollectionEntry } from "astro:content";
import contentFilter from "./contentFilter";

const reviewFilter = (entry: CollectionEntry<"reviews">) =>
  contentFilter(entry);

export default reviewFilter;
