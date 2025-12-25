import { site } from "@/config/site";
import { canonicalUrl } from "@/lib/routes";
import type { Post } from "@/types/content";

export type RouteMeta = {
  title: string;
  description: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    type: "website" | "article";
    image?: string;
  };
  twitter: {
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
    image?: string;
  };
};

function absImage(maybePath?: string) {
  if (!maybePath) return undefined;
  if (maybePath.startsWith("http")) return maybePath;
  return `${site.siteUrl.replace(/\/$/, "")}${maybePath.startsWith("/") ? "" : "/"}${maybePath}`;
}

export function metaForStatic(path: string): RouteMeta {
  const title = `${site.name}`;
  const description = site.description;
  const canonical = canonicalUrl(path);

  return {
    title,
    description,
    canonical,
    og: { title, description, type: "website" },
    twitter: { card: "summary", title, description }
  };
}

export function metaForPost(post: Post): RouteMeta {
  const path = `/blog/${post.slug}`;
  const title = `${post.frontmatter.title} · ${site.name}`;
  const description = post.frontmatter.summary;
  const canonical = canonicalUrl(path);
  const image = absImage(post.frontmatter.cover);

  return {
    title,
    description,
    canonical,
    og: { title, description, type: "article", image },
    twitter: { card: image ? "summary_large_image" : "summary", title, description, image }
  };
}

export function metaForTag(tagSlug: string, tagLabel: string): RouteMeta {
  const path = `/tags/${tagSlug}`;
  const title = `${tagLabel} · ${site.name}`;
  const description = `Posts tagged “${tagLabel}”.`;
  const canonical = canonicalUrl(path);
  return {
    title,
    description,
    canonical,
    og: { title, description, type: "website" },
    twitter: { card: "summary", title, description }
  };
}
