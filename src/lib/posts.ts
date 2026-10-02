import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { BLOG_ENABLED } from "./blogConfig";
import { IPost, IPostMeta } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

const toDateString = (value: unknown, file: string): string => {
    const date = value instanceof Date ? value : new Date(String(value));
    if (Number.isNaN(date.getTime())) {
        throw new Error(`${file}: frontmatter "date" must be YYYY-MM-DD`);
    }
    return date.toISOString().slice(0, 10);
};

const readPost = (file: string): IPost => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    if (typeof data.title !== "string" || !data.title) {
        throw new Error(`${file}: frontmatter "title" is required`);
    }
    return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        date: toDateString(data.date, file),
        summary: typeof data.summary === "string" ? data.summary : "",
        html: marked.parse(content, { async: false }),
    };
};

const readAllPosts = (): IPost[] => {
    if (!BLOG_ENABLED || !fs.existsSync(POSTS_DIR)) {
        return [];
    }
    return fs
        .readdirSync(POSTS_DIR)
        .filter((file) => file.endsWith(".md"))
        .map(readPost)
        .sort((a, b) => b.date.localeCompare(a.date));
};

export const getAllPosts = (): IPostMeta[] =>
    readAllPosts().map(({ html, ...meta }) => meta);

export const getPost = (slug: string): IPost | undefined =>
    readAllPosts().find((post) => post.slug === slug);
