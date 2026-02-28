import type { CollectionEntry } from "astro:content";
import getSortedContent from "./getSortedContent";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) =>
  getSortedContent(posts);

export default getSortedPosts;
