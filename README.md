# Personal Brand Website (Dark Mode) - React + Vite + TypeScript

A minimal, fast personal website for a football data analyst.  
Built as a React SPA with clean routing, glassmorphism UI, Markdown blog posts, JSON-driven projects, and build-time SEO outputs (pre-render, sitemap, RSS).

## Features

- **Vite + React + TypeScript** (fast dev + production builds)
- **React Router** routes:
  - `/` Home
  - `/about`
  - `/projects`
  - `/blog`
  - `/blog/:slug`
  - `/tags/:tag`
  - `/404`
- **Dark mode only** (no light theme)
- **Glassmorphism UI** (subtle blur, translucency, soft borders)
- **Accessible defaults**
  - keyboard navigation
  - visible focus states
  - semantic HTML
- **Content system**
  - Blog posts are **Markdown** in `content/posts/` with frontmatter
  - Projects are in `content/projects.json`
- **Build-time generation**
  - Loads Markdown posts
  - Creates a **typed post index**
  - Builds **tag index**
  - Computes **related posts** by tag overlap
- **SEO outputs for static hosting**
  - Pre-rendered HTML for key routes
  - `sitemap.xml`
  - `robots.txt`
  - RSS feed for posts

## Tech Stack

- **Frontend:** React, TypeScript
- **Build tool:** Vite
- **Routing:** React Router
- **Styling:** Tailwind CSS + small global utility classes
- **Content:** Markdown + frontmatter, JSON
- **Build scripts:** Node scripts (content generation + SEO files)

## Project Structure

```txt
.
├── content/
│   ├── posts/                # Markdown blog posts
│   └── projects.json         # Projects data
├── public/
│   ├── robots.txt            # Generated or static
│   ├── sitemap.xml           # Generated at build time
│   └── rss.xml               # Generated at build time (name may differ)
├── scripts/
│   ├── generate-content.mjs   # Parses posts + writes typed indexes
│   └── postbuild.mjs          # Post-build steps (SEO, extra files)
├── src/
│   ├── components/           # UI building blocks
│   ├── generated/            # Auto-generated TS files (posts/tags)
│   ├── lib/                  # Helpers (markdown, seo, routing)
│   ├── pages/                # Route pages
│   ├── router/               # Route config
│   └── styles/
│       └── globals.css        # Theme tokens + component classes (dark-only)
├── index.html
├── vite.config.ts
└── package.json
```

## Content Guide

### 1. Blog Posts (Markdown)

Create a new file inside:

`content/posts/`

Example file name:

`2025-12-24-my-post.md`

**Required frontmatter format:**

```md
---
title: "My Post Title"
date: "2025-12-24"
summary: "Short summary shown on the blog list and home page."
tags: ["Methodology", "Engineering"]
cover:
draft: false
```
---
**Notes**
- `tags` must be a list like `["Tag A", "Tag B"]`.
- If `draft: true`, the post can be excluded from production builds (depends on generator rules).
- Use correct Markdown syntax:
  - Ordered list: `1.` `2.` `3.` (not `1)`).
  - Leave a blank line before lists.

**Recommended Markdown examples**

Headings:

```md
## Section title
### Smaller title
```

Ordered list:

```md
1. First item
2. Second item
3. Third item
````

Bullets:
```md
- Item one
- Item two
- Item three
```

Links:
```md
Read more on [FBref](https://fbref.com/).
```

Blockquote:
```md
> This is a short note or highlight.
```

Code blocks:

```python
import pandas as pd
print("hello")
```

---

### 2. Projects (JSON)

Projects are loaded from:

`content/projects.json`

Each project should follow this shape:

```json
{
  "id": "project-id",
  "name": "Project Name",
  "summary": "One or two sentences about what the project does.",
  "stack": ["Python", "Pandas"],
  "links": { "repo": "https://github.com/..." },
  "featured": true,
  "dates": { "start": "2025" }
}
````

### 3. Updating Content (What to run)

After adding or editing posts/projects, run:
```bash
npm run generate
````

Then restart the dev server if needed:
```bash
npm run dev
```

For a production build:
```bash
npm run build
```
Preview production build:
```bash
npm run preview
```