import React from "react";
import ReactDOM from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router";
import { AppRoutes } from "@/router";
import "@/styles/globals.css";

import { ALL_ROUTES } from "@/generated/prerenderRoutes";
import { metaForPost, metaForStatic, metaForTag } from "@/lib/meta";
import { postsBySlug } from "@/generated/posts";
import { tagsBySlug } from "@/generated/tags";
import { site } from "@/config/site";

function Root({ mode, url }: { mode: "client" | "static"; url?: string }) {
  if (mode === "static") {
    return (
      <StaticRouter location={url ?? "/"}>
        <AppRoutes />
      </StaticRouter>
    );
  }
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}

function mount() {
  const el = document.getElementById("app");
  if (!el) return;

  const hasMarkup = el.childNodes.length > 0;
  if (hasMarkup) {
    ReactDOM.hydrateRoot(el, <Root mode="client" />);
  } else {
    ReactDOM.createRoot(el).render(<Root mode="client" />);
  }
}

if (typeof window !== "undefined") mount();

type HeadEl =
  | { type: "meta"; props: Record<string, string> }
  | { type: "link"; props: Record<string, string> };

function metaForUrl(url: string) {
  if (url.startsWith("/blog/")) {
    const slug = url.replace("/blog/", "").split(/[?#]/)[0];
    const post = postsBySlug[slug];
    return post ? metaForPost(post) : metaForStatic("/404");
  }
  if (url.startsWith("/tags/")) {
    const tagSlug = url.replace("/tags/", "").split(/[?#]/)[0];
    const label = tagsBySlug[tagSlug]?.label ?? tagSlug;
    return metaForTag(tagSlug, label);
  }
  if (url === "/" || url === "/about" || url === "/projects" || url === "/blog" || url === "/404") {
    return metaForStatic(url);
  }
  return metaForStatic("/404");
}

// vite-prerender-plugin calls exported prerender() at build time. :contentReference[oaicite:14]{index=14}
export async function prerender(data: { url: string }) {
  const url = data.url || "/";
  const meta = metaForUrl(url);

  const html = ReactDOMServer.renderToString(<Root mode="static" url={url} />);

  const elements = new Set<HeadEl>([
    { type: "meta", props: { name: "description", content: meta.description } },
    { type: "link", props: { rel: "canonical", href: meta.canonical } },

    { type: "meta", props: { property: "og:title", content: meta.og.title } },
    { type: "meta", props: { property: "og:description", content: meta.og.description } },
    { type: "meta", props: { property: "og:type", content: meta.og.type } },
    ...(meta.og.image ? [{ type: "meta", props: { property: "og:image", content: meta.og.image } } as HeadEl] : []),

    { type: "meta", props: { name: "twitter:card", content: meta.twitter.card } },
    { type: "meta", props: { name: "twitter:title", content: meta.twitter.title } },
    { type: "meta", props: { name: "twitter:description", content: meta.twitter.description } },
    ...(meta.twitter.image
      ? [{ type: "meta", props: { name: "twitter:image", content: meta.twitter.image } } as HeadEl]
      : [])
  ]);

  return {
    html,
    links: new Set(ALL_ROUTES),
    head: {
      lang: "en",
      title: meta.title,
      elements
    },
    data: { url, siteName: site.name }
  };
}
