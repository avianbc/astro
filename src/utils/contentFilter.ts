import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

type FilterableEntry = CollectionEntry<"blog"> | CollectionEntry<"reviews">;

const contentFilter = ({ data }: FilterableEntry) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default contentFilter;
