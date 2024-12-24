import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getAllPostsData } from '@/lib/mdx';
import { ProjectGrid } from '@/components/project-grid';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { icons } from '@/lib/icons';

interface TypePageProps {
  params: Promise<{
    type: string;
  }>;
}

export async function generateMetadata({ params }: TypePageProps) {
  const { type } = await params;

  if (!['engineer', 'data', 'business'].includes(type)) {
    notFound();
  }

  return {
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Portfolio`,
  };
}

export default async function TypePage({ params }: TypePageProps) {
  const { type } = await params;

  if (!['engineer', 'data', 'business'].includes(type)) {
    notFound();
  }

  const posts = getAllPostsData().filter(
    (post) => post.frontmatter.type === type,
  );

  const groupedPosts = posts.reduce(
    (acc, post) => {
      const group = post.frontmatter.group;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(post);
      return acc;
    },
    {} as Record<string, typeof posts>,
  );

  const typeConfig = icons.type[type];
  const TypeIcon = typeConfig?.icon;

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <Button asChild variant="ghost" size="sm" className="gap-2 pl-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <TypeIcon className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {type.charAt(0).toUpperCase() + type.slice(1)} Portfolio
          </h1>
        </div>
      </div>

      {Object.entries(groupedPosts).map(([group, groupPosts]) => {
        const GroupIcon = icons.group[group].icon;

        return (
          <section key={group} className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-muted p-1.5">
                <GroupIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {group.charAt(0).toUpperCase() + group.slice(1)}s
              </h2>
            </div>
            <ProjectGrid posts={groupPosts} />
          </section>
        );
      })}
    </div>
  );
}

export function generateStaticParams() {
  return ['engineer', 'data', 'business'].map((type) => ({
    type,
  }));
}
