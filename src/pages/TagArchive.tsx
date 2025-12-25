import { useParams } from "react-router-dom";
import { Section } from "@/components/Section";
import { posts } from "@/generated/posts";
import { tagsBySlug } from "@/generated/tags";
import { PostList } from "@/components/PostList";
import { useRouteMeta } from "@/hooks/useRouteMeta";
import { metaForTag } from "@/lib/meta";

export default function TagArchive() {
  const { tag } = useParams();
  const tagSlug = tag ?? "";
  const tagLabel = tagsBySlug[tagSlug]?.label ?? tagSlug;

  useRouteMeta(metaForTag(tagSlug, tagLabel));

  const filtered = posts.filter((p) => p.tagSlugs.includes(tagSlug));

  return (
    <Section title={`Tag: ${tagLabel}`} eyebrow="Archive">
      <PostList posts={filtered} />
    </Section>
  );
}
