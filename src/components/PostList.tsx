import type { Post } from "@/types/content";
import { PostCard } from "@/components/PostCard";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-4">
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </div>
  );
}
