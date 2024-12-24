import { getAllSlugs, getPostByPath } from '@/lib/mdx';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { type, group, slug } = await params;

  const post = await getPostByPath(type, group, slug);
  if (!post) {
    notFound();
  }

  return {
    title: post.frontmatter.title,
  };
}

interface PageProps {
  params: Promise<{
    type: string;
    group: string;
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { type, group, slug } = await params;

  const post = await getPostByPath(type, group, slug);
  if (!post) {
    notFound();
  }

  try {
    const { default: Post } = await import(
      `@/content/${type}/${group}/${slug}.mdx`
    );
    return (
      <div>
        <Post />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

// This only gets the slugs without parsing MDX content
export async function generateStaticParams() {
  return getAllSlugs();
}