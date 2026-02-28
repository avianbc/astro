import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForReview } from "@/utils/generateOgImages";

export async function getStaticPaths() {
  const reviews = await getCollection("reviews", ({ data }) => !data.draft);
  return reviews.map(review => ({
    params: { slug: review.id },
    props: { review },
  }));
}

type Props = { review: CollectionEntry<"reviews"> };

export const GET: APIRoute = async ({ props }) => {
  const { review } = props as Props;
  const buffer = await generateOgImageForReview(review);
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};
