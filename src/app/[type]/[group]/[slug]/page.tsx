import { getAllSlugs, getPostByPath } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    type: string;
    group: string;
    slug: string;
  }>;
}

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
      <>
        <div className="space-y-6 mb-8 not-prose">
          <Button asChild variant="ghost" size="sm" className="gap-2 pl-2">
            <Link href={`/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Back to {type.charAt(0).toUpperCase() + type.slice(1)} Portfolio
            </Link>
          </Button>

          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">
              {post.frontmatter.title}
            </h1>
            {post.frontmatter.date && (
              <p className="text-sm text-muted-foreground">
                {new Date(post.frontmatter.date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        <Post />
      </>
    );
  } catch (error) {
    console.error('Error loading MDX file:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  return getAllSlugs();
}
