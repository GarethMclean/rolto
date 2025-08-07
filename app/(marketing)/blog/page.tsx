import { allPosts } from "contentlayer/generated";

import { constructMetadata } from "@/lib/utils";
import { BlogPosts } from "@/components/content/blog-posts";

export const metadata = constructMetadata({
  title: "Blog – Rolto",
  description: "Latest news and updates from Rolto.",
});

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => ({
      ...post,
      blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmMWY1ZjkiLz48L3N2Zz4=", // Simple placeholder
    }));

  return <BlogPosts posts={posts} />;
}
