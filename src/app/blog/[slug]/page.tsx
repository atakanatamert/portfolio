import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { montserrat, orbitron } from "@/app/fonts";
import BlogShell from "@/components/blog/BlogShell";
import { formatPostDate } from "@/lib/postDate";
import { getAdjacentPosts, getAllPosts, getPost } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";

// Only slugs from generateStaticParams exist. With the blog disabled that list
// is empty, so every /blog/* URL is a 404.
export const dynamicParams = false;

export const generateStaticParams = () =>
    getAllPosts().map((post) => ({ slug: post.slug }));

type Props = { params: Promise<{ slug: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const post = getPost((await params).slug);
    if (!post) {
        return {};
    }
    const url = `/blog/${post.slug}`;
    return {
        title: `${post.title} | ${SITE_NAME}`,
        description: post.summary || undefined,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            title: post.title,
            description: post.summary || undefined,
            publishedTime: post.date,
            authors: [SITE_NAME],
        },
    };
};

const PostPage = async ({ params }: Props) => {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) {
        notFound();
    }
    const { newer, older } = getAdjacentPosts(slug);

    return (
        <BlogShell>
            <article className="text-white">
                <Link
                    href="/blog"
                    className={`inline-block mb-8 text-sm text-gray-400 hover:text-white ${montserrat.className}`}
                >
                    ← All posts
                </Link>
                <h1 className={`text-3xl leading-snug mb-3 ${orbitron.className}`}>
                    {post.title}
                </h1>
                <p className={`text-sm text-gray-400 mb-12 ${montserrat.className}`}>
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    {" · "}
                    {post.readingMinutes} min read
                </p>
                <div
                    className={`prose prose-invert prose-lg max-w-none prose-a:text-white prose-a:underline-offset-4 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-img:rounded-lg ${montserrat.className}`}
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </article>
            {(newer || older) && (
                <nav
                    aria-label="More posts"
                    className={`grid gap-6 sm:grid-cols-2 mt-20 ${montserrat.className}`}
                >
                    {older ? (
                        <Link
                            href={`/blog/${older.slug}`}
                            className="group rounded-lg border border-gray-800 p-4 hover:border-gray-500"
                        >
                            <span className="block text-xs text-gray-500">Older</span>
                            <span className="text-gray-300 group-hover:text-white">
                                {older.title}
                            </span>
                        </Link>
                    ) : (
                        <span />
                    )}
                    {newer && (
                        <Link
                            href={`/blog/${newer.slug}`}
                            className="group rounded-lg border border-gray-800 p-4 text-right hover:border-gray-500"
                        >
                            <span className="block text-xs text-gray-500">Newer</span>
                            <span className="text-gray-300 group-hover:text-white">
                                {newer.title}
                            </span>
                        </Link>
                    )}
                </nav>
            )}
        </BlogShell>
    );
};

export default PostPage;
