import Home from "@/components/Home";
import { getAllPosts } from "@/lib/posts";

const Page = () => <Home posts={getAllPosts()} />;

export default Page;
