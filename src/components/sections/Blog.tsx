import Link from "next/link";
import { useContext } from "react";
import { motion } from "framer-motion";
import { montserrat } from "@/app/fonts";
import { listItemVariants } from "@/animations/ContentAnimations";
import BlogContext from "@/contexts/BlogContext";
import { BLOG_RSS_PATH } from "@/lib/blogConfig";
import { formatPostDate } from "@/lib/postDate";

const footerLink = "underline underline-offset-4 decoration-gray-600 hover:text-white";

const Blog = () => {
    const posts = useContext(BlogContext);

    if (posts.length === 0) {
        return (
            <motion.div
                variants={listItemVariants}
                className={`flex flex-col justify-center h-full p-8 md:p-12 ${montserrat.className}`}
            >
                <p className="text-lg mb-3">Nothing here yet.</p>
                <p className="text-gray-400">
                    The first posts are on the way. Subscribe via{" "}
                    <a href={BLOG_RSS_PATH} className={footerLink}>
                        RSS
                    </a>{" "}
                    to see them when they land.
                </p>
            </motion.div>
        );
    }

    return (
        <div>
            <motion.ul>
                {posts.map((post) => (
                    <motion.li
                        key={post.slug}
                        variants={listItemVariants}
                        className="text-gray-400"
                        whileHover={{
                            scale: 0.97,
                            cursor: "pointer",
                            color: "rgb(255,255,255)",
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                    >
                        <Link href={`/blog/${post.slug}`}>
                            <div className="font-medium rounded-3xl m-12">
                                <div className="mb-4">
                                    <h3 className="text-lg">{post.title}</h3>
                                    <p className={`text-sm ${montserrat.className}`}>
                                        <time dateTime={post.date}>
                                            {formatPostDate(post.date)}
                                        </time>
                                        {" · "}
                                        {post.readingMinutes} min read
                                    </p>
                                </div>
                                <p className={montserrat.className}>{post.summary}</p>
                            </div>
                        </Link>
                    </motion.li>
                ))}
            </motion.ul>
            <motion.p
                variants={listItemVariants}
                className={`mx-12 mb-12 flex gap-6 text-sm text-gray-400 ${montserrat.className}`}
            >
                <Link href="/blog" className={footerLink}>
                    All posts
                </Link>
                <a href={BLOG_RSS_PATH} className={footerLink}>
                    RSS
                </a>
            </motion.p>
        </div>
    );
};

export default Blog;
