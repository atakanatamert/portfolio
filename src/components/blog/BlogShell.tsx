import Link from "next/link";
import { montserrat, orbitron } from "@/app/fonts";
import { BLOG_RSS_PATH } from "@/lib/blogConfig";
import { EMAIL, SITE_NAME } from "@/lib/site";

const navLink = "text-gray-400 hover:text-white transition-colors";

const BlogShell = ({ children }: { children: React.ReactNode }) => (
    <main className="min-h-screen flex flex-col items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black px-6 py-8 md:p-24">
        <header className="flex w-full max-w-3xl mb-16 flex-wrap items-baseline justify-between gap-4">
            <Link
                href="/"
                className={`text-white text-2xl hover:text-gray-400 ${orbitron.className}`}
            >
                {SITE_NAME}
            </Link>
            <nav
                aria-label="Blog"
                className={`flex gap-6 text-sm ${montserrat.className}`}
            >
                <Link href="/" className={navLink}>
                    Home
                </Link>
                <Link href="/blog" className={navLink}>
                    Blog
                </Link>
                <a href={BLOG_RSS_PATH} className={navLink}>
                    RSS
                </a>
            </nav>
        </header>
        <div className="w-full max-w-3xl flex-1">{children}</div>
        <footer
            className={`w-full max-w-3xl mt-24 pt-8 border-t border-gray-800 text-sm text-gray-500 ${montserrat.className}`}
        >
            Questions or thoughts? Write to{" "}
            <a href={`mailto:${EMAIL}`} className="text-gray-300 hover:text-white">
                {EMAIL}
            </a>
            .
        </footer>
    </main>
);

export default BlogShell;
