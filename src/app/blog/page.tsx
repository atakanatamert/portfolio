import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { montserrat, orbitron } from "@/app/fonts";
import BlogShell from "@/components/blog/BlogShell";
import { BLOG_ENABLED, BLOG_RSS_PATH } from "@/lib/blogConfig";
import { formatPostDate } from "@/lib/postDate";
import { getAllPosts } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
    title: `Blog | ${SITE_NAME}`,
    description: `Writing by ${SITE_NAME}.`,
    alternates: { canonical: "/blog" },
    openGraph: {
        type: "website",
        url: "/blog",
        siteName: SITE_NAME,
        title: `Blog | ${SITE_NAME}`,
        description: `Writing by ${SITE_NAME}.`,
    },
};

const BlogIndex = () => {
    if (!BLOG_ENABLED) {
        notFound();
    }

    const posts = getAllPosts();

    return (
        <BlogShell>
            <h1 className={`text-white text-3xl mb-10 ${orbitron.className}`}>Blog</h1>
            {posts.length === 0 ? (
                <div className={`text-gray-300 space-y-3 ${montserrat.className}`}>
                    <p>Nothing here yet. The first posts are on the way.</p>
                    <p className="text-gray-400">
                        Subscribe via{" "}
                        <a href={BLOG_RSS_PATH} className="underline hover:text-white">
                            RSS
                        </a>{" "}
                        to see them when they land.
                    </p>
                </div>
            ) : (
                <ul className="space-y-10">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link href={`/blog/${post.slug}`} className="group block">
                                <h2
                                    className={`text-xl text-gray-200 group-hover:text-white ${orbitron.className}`}
                                >
                                    {post.title}
                                </h2>
                                <p
                                    className={`mt-1 text-sm text-gray-500 ${montserrat.className}`}
                                >
                                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                                    {" · "}
                                    {post.readingMinutes} min read
                                </p>
                                {post.summary && (
                                    <p className={`mt-2 text-gray-400 ${montserrat.className}`}>
                                        {post.summary}
                                    </p>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </BlogShell>
    );
};

export default BlogIndex;
