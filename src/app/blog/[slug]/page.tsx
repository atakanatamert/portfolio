import Link from "next/link";
import { notFound } from "next/navigation";
import { montserrat, orbitron } from "@/app/fonts";
import { getAllPosts, getPost } from "@/lib/posts";

// Only slugs from generateStaticParams exist. With the blog disabled that list
// is empty, so every /blog/* URL is a 404.
export const dynamicParams = false;

export const generateStaticParams = () =>
    getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = getPost(params.slug);
    return post
        ? { title: `${post.title} | Atakan Atamert`, description: post.summary }
        : {};
};

const PostPage = ({ params }: { params: { slug: string } }) => {
    const post = getPost(params.slug);
    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen flex flex-col items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black xs:p-8 md:p-24">
            <div className="flex w-full max-w-3xl mb-12 items-center justify-between">
                <Link
                    href="/"
                    className={`text-white text-2xl hover:text-gray-400 ${orbitron.className}`}
                >
                    Atakan Atamert
                </Link>
            </div>
            <article className="w-full max-w-3xl text-white">
                <h1 className={`text-3xl mb-2 ${orbitron.className}`}>{post.title}</h1>
                <time
                    dateTime={post.date}
                    className={`block text-sm text-gray-400 mb-10 ${montserrat.className}`}
                >
                    {post.date}
                </time>
                <div
                    className={`prose prose-invert max-w-none ${montserrat.className}`}
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </article>
        </main>
    );
};

export default PostPage;
