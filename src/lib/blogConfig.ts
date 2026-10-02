// Inlined at build time. Leave unset to keep the blog hidden: no nav entry and
// every /blog/* URL returns 404. Set to "true" to go live.
export const BLOG_ENABLED = process.env.NEXT_PUBLIC_BLOG_ENABLED === "true";
