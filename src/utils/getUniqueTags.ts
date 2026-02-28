import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";
import getUniqueBySlug from "./getUniqueBySlug";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]): Tag[] => {
  const allTags = posts.filter(postFilter).flatMap(post => post.data.tags);
  return getUniqueBySlug(allTags).map(({ slug, name }) => ({
    tag: slug,
    tagName: name,
  }));
};

export default getUniqueTags;
