import Link from "next/link";
import { useContext } from "react";
import { motion } from "framer-motion";
import { montserrat } from "@/app/fonts";
import { listItemVariants } from "@/animations/ContentAnimations";
import BlogContext from "@/contexts/BlogContext";

const Blog = () => {
    const posts = useContext(BlogContext);

    if (posts.length === 0) {
        return (
            <motion.div variants={listItemVariants} className="m-12">
                <p className={`text-gray-400 ${montserrat.className}`}>
                    No articles yet.
                </p>
            </motion.div>
        );
    }

    return (
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
                                <time
                                    dateTime={post.date}
                                    className={`text-sm ${montserrat.className}`}
                                >
                                    {post.date}
                                </time>
                            </div>
                            <p className={montserrat.className}>{post.summary}</p>
                        </div>
                    </Link>
                </motion.li>
            ))}
        </motion.ul>
    );
};

export default Blog;
