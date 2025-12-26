import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { GlassCard } from "@/components/GlassCard";
import { Section } from "@/components/Section";
import { postsBySlug } from "@/generated/posts";
import { tagsBySlug } from "@/generated/tags";
import { TagPill } from "@/components/TagPill";
import { prettyDate } from "@/lib/text";
import { useRouteMeta } from "@/hooks/useRouteMeta";
import { metaForPost } from "@/lib/meta";
import { NotFoundInline } from "@/pages/NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? postsBySlug[slug] : undefined;

  const related = useMemo(() => {
    if (!post) return [];
    return post.relatedSlugs.map((s) => postsBySlug[s]).filter(Boolean);
  }, [post]);

  if (!post) return <NotFoundInline />;

  useRouteMeta(metaForPost(post));

  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <header>
          <p className="text-xs text-zinc-400">{prettyDate(post.frontmatter.date)}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{post.frontmatter.title}</h1>
          <p className="mt-3 text-sm text-zinc-400">{post.frontmatter.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tagSlugs.map((t) => (
              <TagPill key={t} slug={t} label={tagsBySlug[t]?.label ?? t} />
            ))}
          </div>
        </header>

        {post.frontmatter.cover && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800/60">
            <img src={post.frontmatter.cover} alt="" className="h-auto w-full" loading="lazy" />
          </div>
        )}

        <GlassCard className="prose prose-zinc mt-6 max-w-none prose-invert">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </GlassCard>

        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold">Related posts</h2>
            <div className="mt-3 grid gap-3">
              {related.map((p) => (
                <GlassCard key={p.slug}>
                  <Link className="font-medium underline-offset-4 hover:underline" to={`/blog/${p.slug}`}>
                    {p.frontmatter.title}
                  </Link>
                  <p className="mt-1 text-sm text-zinc-400">{p.frontmatter.summary}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </article>
    </Section>
  );
}
