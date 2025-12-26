import { Section } from "@/components/Section";
import { PostList } from "@/components/PostList";
import { posts } from "@/generated/posts";
import { tags } from "@/generated/tags";
import { TagPill } from "@/components/TagPill";
import { useRouteMeta } from "@/hooks/useRouteMeta";
import { metaForStatic } from "@/lib/meta";

export default function BlogIndex() {
  useRouteMeta(metaForStatic("/blog"));

  return (
    <>
      <Section title="Blog" eyebrow="All posts">
        <PostList posts={posts} />
      </Section>

      <Section title="Tags" eyebrow="Browse">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagPill key={t.slug} slug={t.slug} label={`${t.label} (${t.count})`} />
          ))}
        </div>
      </Section>


    </>
  );
}
