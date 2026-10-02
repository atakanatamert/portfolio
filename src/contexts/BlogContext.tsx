import { IPostMeta } from "@/types";
import { createContext } from "react";

const BlogContext = createContext<IPostMeta[]>([]);

export default BlogContext;
