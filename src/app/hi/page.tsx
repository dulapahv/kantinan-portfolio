import { getAllPostsData } from '@/lib/mdx';

export default function PostsPage() {
  // In App Router, you can use async components directly
  const posts = getAllPostsData();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">
              {post.frontmatter.title}
            </h2>
            {post.frontmatter.date && (
              <p className="text-gray-600">
                {new Date(post.frontmatter.date).toLocaleDateString()}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}