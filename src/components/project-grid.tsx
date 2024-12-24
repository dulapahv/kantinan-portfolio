import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';
import { Project, Frontmatter } from '@/types/mdx';

type ProjectGridProps = {
  posts: Project[];
};

const ProjectGrid = ({ posts }: ProjectGridProps) => (
  <div className="grid gap-6 sm:grid-cols-2">
    {posts.map((post) => (
      <Link
        key={post.slug}
        href={`/${post.slug}`}
        className="group transition-colors"
      >
        <Card className="h-full transition-colors hover:border-primary">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 mb-2">
              <Badge variant="secondary" className="capitalize">
                {post.frontmatter.group}
              </Badge>
              {post.frontmatter.date && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      undefined,
                      {
                        year: 'numeric',
                        month: 'short',
                      },
                    )}
                  </time>
                </div>
              )}
            </div>
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-lg">
              {post.frontmatter.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    ))}
  </div>
);

export { ProjectGrid };
