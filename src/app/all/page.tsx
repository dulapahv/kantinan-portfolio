import { createElement } from 'react';
import { getAllPostsData } from '@/lib/mdx';
import { Project, Frontmatter } from '@/types/mdx';
import { ProjectGrid } from '@/components/project-grid';
import { icons } from '@/lib/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'All Projects & Experiences',
  description:
    'Browse my portfolio of projects and professional experience across engineering, data science, and business.',
};

type PostsByType = {
  [K in Frontmatter['type']]?: {
    [G in Frontmatter['group']]: Project[];
  };
};

export default async function Page() {
  const allPosts = await getAllPostsData();

  const postsByType = allPosts.reduce<PostsByType>((acc, post) => {
    const type = post.frontmatter.type;
    const group = post.frontmatter.group;

    if (!acc[type]) {
      acc[type] = {
        project: [],
        experience: [],
      };
    }

    acc[type]![group].push(post);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <Button asChild variant="ghost" size="sm" className="gap-2 pl-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            All Projects & Experiences
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore my work across engineering, data science, and business
            domains
          </p>
        </header>

        <div className="space-y-16">
          {Object.entries(postsByType).map(
            ([type, groups], typeIndex, typeArray) => {
              const typeConfig = icons.type[type];
              const TypeIcon = typeConfig?.icon;

              return (
                <div key={type}>
                  <section className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <TypeIcon className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight capitalize">
                          {type}
                        </h2>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/${type}`}>View All</Link>
                      </Button>
                    </div>

                    <div className="space-y-12">
                      {Object.entries(groups).map(
                        ([group, posts]) =>
                          posts.length > 0 && (
                            <div key={group} className="space-y-6">
                              <div className="flex items-center gap-2">
                                {icons.group[group] && (
                                  <div className="rounded-lg bg-muted p-1.5">
                                    {createElement(icons.group[group].icon, {
                                      className:
                                        'h-4 w-4 text-muted-foreground',
                                    })}
                                  </div>
                                )}
                                <h3 className="text-xl font-medium capitalize">
                                  {group}s
                                </h3>
                              </div>
                              <ProjectGrid posts={posts} />
                            </div>
                          ),
                      )}
                    </div>
                  </section>

                  {typeIndex < typeArray.length - 1 && (
                    <Separator className="mt-16" />
                  )}
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
