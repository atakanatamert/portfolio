# Portfolio

Personal portfolio.

## Blog

The blog is hidden until `NEXT_PUBLIC_BLOG_ENABLED=true` is set at build time.
Without it there is no Blog entry in the menu and every `/blog/*` URL returns 404.

Write articles as Markdown files in `content/blog/`. The file name is the URL slug
(`content/blog/my-post.md` → `/blog/my-post`):

```md
---
title: My post
date: 2026-10-02
summary: One line shown in the Blog list.
---

Markdown body.
```

`title` and `date` (`YYYY-MM-DD`) are required. Posts are listed newest first.

Preview locally:

```sh
NEXT_PUBLIC_BLOG_ENABLED=true npm run dev
```

To go live, add `NEXT_PUBLIC_BLOG_ENABLED=true` to the Vercel project's
environment variables (Production) and redeploy.
