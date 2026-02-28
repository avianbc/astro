import type { CollectionEntry } from "astro:content";
import contentFilter from "./contentFilter";

type SortableEntry = CollectionEntry<"blog"> | CollectionEntry<"reviews">;

const getSortedContent = <T extends SortableEntry>(entries: T[]): T[] => {
  return entries
    .filter(contentFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedContent;
