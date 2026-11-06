import { BLOG_ENABLED, BLOG_RSS_PATH } from "@/lib/blogConfig";
import { getAllPosts } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

export const GET = () => {
    if (!BLOG_ENABLED) {
        return new Response("Not found", { status: 404 });
    }

    const posts = getAllPosts();
    const items = posts
        .map((post) => {
            const url = `${SITE_URL}/blog/${post.slug}`;
            return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>${post.summary ? `
      <description>${escapeXml(post.summary)}</description>` : ""}
    </item>`;
        })
        .map((item) => `\n${item}`)
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(`Writing by ${SITE_NAME}.`)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}${BLOG_RSS_PATH}" rel="self" type="application/rss+xml" />${posts[0] ? `
    <lastBuildDate>${new Date(`${posts[0].date}T00:00:00Z`).toUTCString()}</lastBuildDate>` : ""}${items}
  </channel>
</rss>
`;

    return new Response(xml, {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
};
