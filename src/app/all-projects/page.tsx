import { getAllPostsData } from '@/lib/mdx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Project, Frontmatter } from '@/types/mdx';
import { ProjectGrid } from '@/components/project-grid';

export const metadata = {
  title: 'Projects & Experience',
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

  // Organize posts by type and group
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

  // Sort all arrays by date
  // Object.keys(postsByType).forEach((type) => {
  //   const typeKey = type as keyof PostsByType;
  //   if (postsByType[typeKey]) {
  //     Object.keys(postsByType[typeKey]!).forEach((group) => {
  //       const groupKey = group as Frontmatter['group'];
  //       postsByType[typeKey]![groupKey].sort((a, b) => {
  //         if (!a.frontmatter.date || !b.frontmatter.date) return 0;
  //         return (
  //           new Date(b.frontmatter.date).getTime() -
  //           new Date(a.frontmatter.date).getTime()
  //         );
  //       });
  //     });
  //   }
  // });

  return (
    <main className="container max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Projects & Experience
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore my work across engineering, data science, and business
            domains
          </p>
        </header>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="engineer">Engineering</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {Object.entries(postsByType).map(([type, groups]) => (
              <section key={type} className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight capitalize">
                  {type}
                </h2>
                <div className="space-y-8">
                  {Object.entries(groups).map(
                    ([group, posts]) =>
                      posts.length > 0 && (
                        <div key={group} className="space-y-4">
                          <h3 className="text-xl font-medium capitalize">
                            {group}s
                          </h3>
                          <ProjectGrid posts={posts} />
                        </div>
                      ),
                  )}
                </div>
              </section>
            ))}
          </TabsContent>

          {Object.entries(postsByType).map(([type, groups]) => (
            <TabsContent key={type} value={type} className="space-y-8">
              {Object.entries(groups).map(
                ([group, posts]) =>
                  posts.length > 0 && (
                    <section key={group} className="space-y-4">
                      <h2 className="text-2xl font-semibold tracking-tight capitalize">
                        {group}s
                      </h2>
                      <ProjectGrid posts={posts} />
                    </section>
                  ),
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
