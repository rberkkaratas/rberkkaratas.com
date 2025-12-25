import { Link } from "react-router-dom";
import type { Post } from "@/types/content";
import { GlassCard } from "@/components/GlassCard";
import { prettyDate } from "@/lib/text";
import { TagPill } from "@/components/TagPill";
import { tagsBySlug } from "@/generated/tags";

export function PostCard({ post }: { post: Post }) {
  return (
    <GlassCard className="group">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{prettyDate(post.frontmatter.date)}</p>
      </div>

      <h3 className="mt-2 text-base font-semibold tracking-tight">
        <Link
          to={`/blog/${post.slug}`}
          className="rounded-md underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
        >
          {post.frontmatter.title}
        </Link>
      </h3>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{post.frontmatter.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tagSlugs.map((slug) => (
          <TagPill key={slug} slug={slug} label={tagsBySlug[slug]?.label ?? slug} />
        ))}
      </div>

      <div className="pointer-events-none mt-4 h-px bg-zinc-200/60 opacity-0 transition group-hover:opacity-100 dark:bg-zinc-800/60 motion-reduce:transition-none" />
    </GlassCard>
  );
}
