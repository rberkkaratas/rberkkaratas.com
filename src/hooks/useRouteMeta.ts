import { useEffect } from "react";
import type { RouteMeta } from "@/lib/meta";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta") as any;
    document.head.appendChild(el as Node);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

export function useRouteMeta(meta: RouteMeta) {
  useEffect(() => {
    document.title = meta.title;

    upsertMeta('meta[name="description"]', { name: "description", content: meta.description });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: meta.canonical });

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.og.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: meta.og.description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: meta.og.type });
    if (meta.og.image) upsertMeta('meta[property="og:image"]', { property: "og:image", content: meta.og.image });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: meta.twitter.card });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.twitter.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.twitter.description });
    if (meta.twitter.image)
      upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: meta.twitter.image });
  }, [meta]);
}
