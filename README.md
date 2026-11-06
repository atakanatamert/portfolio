# Portfolio

Personal site of Atakan Atamert, live at https://atakanatamert.dev.

Next.js (App Router), Tailwind CSS and Framer Motion.

```sh
npm ci
npm run dev    # http://localhost:3000
npm run build
npm run lint
```

## Content

- Work history: `src/components/sections/Work.tsx`
- Projects (Products, Open source, Earlier work): `src/assets/projects.json`
- About, certifications and education: `src/components/sections/About.tsx`
- Email and social links: `src/lib/site.ts`

## Blog

The blog is hidden until `NEXT_PUBLIC_BLOG_ENABLED=true` is set at build time.
Without it there is no Blog entry in the menu, and `/blog`, `/blog/rss.xml` and
every `/blog/*` post URL return 404.

With the flag on you get:

- a Blog entry in the home menu, listing posts with links to all posts and RSS
- `/blog`, the full list, with a "coming soon" note while there are no posts
- `/blog/<slug>`, one page per post with date, reading time and older/newer links
- `/blog/rss.xml`, an RSS 2.0 feed, also advertised in the page `<head>`

Write articles as Markdown files in `content/blog/`. The file name is the URL slug
(`content/blog/my-post.md` becomes `/blog/my-post`):

```md
---
title: My post
date: 2026-10-02
summary: One line shown in the Blog list and the RSS feed.
---

Markdown body.
```

`title` and `date` (`YYYY-MM-DD`) are required. Posts are listed newest first.

Preview locally:

```sh
NEXT_PUBLIC_BLOG_ENABLED=true npm run dev
```

To go live, add `NEXT_PUBLIC_BLOG_ENABLED=true` to the Vercel project's
environment variables (Production) and redeploy. The value is inlined at build
time, so changing it always needs a new build. To hide the blog again, remove
the variable and redeploy.
