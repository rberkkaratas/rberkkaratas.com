import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const OUT_DIR = path.join(ROOT, "src", "generated");
const PUBLIC_DIR = path.join(ROOT, "public");

const SITE_URL = process.env.SITE_URL || "https://example.com";
const INCLUDE_DRAFTS = process.env.INCLUDE_DRAFTS === "1";

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function toSlug(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeXml(s) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function readPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((file) => {
      const full = path.join(POSTS_DIR, file);
      const raw = fs.readFileSync(full, "utf8");
      const parsed = matter(raw);

      const fm = parsed.data || {};
      const title = String(fm.title || "").trim();
      const date = String(fm.date || "").trim();
      const summary = String(fm.summary || "").trim();
      const tags = Array.isArray(fm.tags) ? fm.tags.map(String) : [];
      const cover = fm.cover ? String(fm.cover) : undefined;
      const draft = fm.draft === true;

      if (!title || !date || !summary || !tags.length) {
        throw new Error(`Invalid frontmatter in ${file}. Required: title, date, summary, tags[]`);
      }
      if (draft && !INCLUDE_DRAFTS) return null;

      const baseName = file.replace(/\.md$/, "");
      const guessed = baseName.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const slug = toSlug(guessed);

      const tagSlugs = tags.map(toSlug);
      const html = marked.parse(parsed.content);

      return {
        slug,
        frontmatter: { title, date, summary, tags, ...(cover ? { cover } : {}), ...(draft ? { draft } : {}) },
        html,
        tagSlugs
      };
    })
    .filter(Boolean);

  posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  const withRelated = posts.map((p) => {
    const candidates = posts
      .filter((x) => x.slug !== p.slug)
      .map((x) => {
        const overlap = x.tagSlugs.filter((t) => p.tagSlugs.includes(t)).length;
        return { slug: x.slug, overlap, date: new Date(x.frontmatter.date).getTime() };
      })
      .filter((x) => x.overlap > 0)
      .sort((a, b) => (b.overlap - a.overlap) || (b.date - a.date))
      .slice(0, 3)
      .map((x) => x.slug);

    return { ...p, relatedSlugs: candidates };
  });

  return withRelated;
}

function buildTags(posts) {
  const map = new Map();
  for (const p of posts) {
    for (let i = 0; i < p.frontmatter.tags.length; i++) {
      const label = p.frontmatter.tags[i];
      const slug = p.tagSlugs[i];
      const prev = map.get(slug);
      map.set(slug, { slug, label, count: (prev?.count || 0) + 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
}

function writeGeneratedTS(posts, tags) {
  ensureDir(OUT_DIR);

  fs.writeFileSync(
    path.join(OUT_DIR, "posts.ts"),
    `import type { Post } from "@/types/content";
export const posts: Post[] = ${JSON.stringify(posts, null, 2)};
export const postsBySlug: Record<string, Post> = Object.fromEntries(posts.map((p) => [p.slug, p]));
`,
    "utf8"
  );

  fs.writeFileSync(
    path.join(OUT_DIR, "tags.ts"),
    `export const tags = ${JSON.stringify(tags, null, 2)};
export const tagsBySlug: Record<string, { slug: string; label: string; count: number }> = Object.fromEntries(
  tags.map((t) => [t.slug, t])
);
`,
    "utf8"
  );

  const routes = [
    "/",
    "/about",
    "/projects",
    "/blog",
    ...posts.map((p) => `/blog/${p.slug}`),
    ...tags.map((t) => `/tags/${t.slug}`),
    "/404"
  ];

  fs.writeFileSync(path.join(OUT_DIR, "prerenderRoutes.ts"), `export const ALL_ROUTES = ${JSON.stringify(routes, null, 2)};\n`, "utf8");

  return routes;
}

function writeSeoFiles(posts, routes) {
  ensureDir(PUBLIC_DIR);

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "robots.txt"),
    `User-agent: *
Allow: /

Sitemap: ${SITE_URL.replace(/\/$/, "")}/sitemap.xml
`,
    "utf8"
  );

  const urlEntries = routes
    .filter((r) => r !== "/404")
    .map((r) => {
      const lastmod =
        r.startsWith("/blog/")
          ? posts.find((p) => `/blog/${p.slug}` === r)?.frontmatter.date
          : undefined;

      return `  <url>
    <loc>${escapeXml(SITE_URL.replace(/\/$/, "") + r)}</loc>${lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : ""}
  </url>`;
    })
    .join("\n");

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`,
    "utf8"
  );

  const rssItems = posts
    .map((p) => {
      const link = `${SITE_URL.replace(/\/$/, "")}/blog/${p.slug}`;
      return `<item>
  <title>${escapeXml(p.frontmatter.title)}</title>
  <link>${escapeXml(link)}</link>
  <guid>${escapeXml(link)}</guid>
  <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
  <description>${escapeXml(p.frontmatter.summary)}</description>
</item>`;
    })
    .join("\n");

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "rss.xml"),
    `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${escapeXml(process.env.SITE_NAME || "Blog")}</title>
  <link>${escapeXml(SITE_URL)}</link>
  <description>${escapeXml(process.env.SITE_DESCRIPTION || "Personal writing.")}</description>
  ${rssItems}
</channel>
</rss>
`,
    "utf8"
  );
}

(function main() {
  const posts = readPosts();
  const tags = buildTags(posts);
  const routes = writeGeneratedTS(posts, tags);
  writeSeoFiles(posts, routes);
  console.log(`Generated ${posts.length} posts, ${tags.length} tags, ${routes.length} prerender routes.`);
})();
