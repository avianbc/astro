import type { CollectionEntry } from "astro:content";
import contentFilter from "./contentFilter";

const postFilter = (entry: CollectionEntry<"blog">) => contentFilter(entry);

export default postFilter;
