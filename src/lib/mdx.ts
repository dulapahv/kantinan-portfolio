import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, Frontmatter } from '@/types/mdx';

const POSTS_PATH = path.join(process.cwd(), 'src/content');
const VALID_TYPES = ['engineer', 'data', 'business'] as const;
const VALID_GROUPS = ['project', 'experience'] as const;

// Cache for posts data
let postsCache: Project[] | null = null;

// Get just the slugs without parsing MDX content
export const getAllSlugs = () => {
  const slugs: Array<{ type: string; group: string; slug: string }> = [];

  for (const type of VALID_TYPES) {
    const typePath = path.join(POSTS_PATH, type);
    if (!fs.existsSync(typePath)) continue;

    for (const group of VALID_GROUPS) {
      const groupPath = path.join(typePath, group);
      if (!fs.existsSync(groupPath)) continue;

      const files = fs
        .readdirSync(groupPath)
        .filter((file) => file.endsWith('.mdx'));

      for (const filename of files) {
        slugs.push({
          type,
          group,
          slug: filename.replace('.mdx', ''),
        });
      }
    }
  }

  return slugs;
};

export const getAllPostsData = (): Project[] => {
  // Return cached data if available
  if (postsCache) {
    return postsCache;
  }

  const posts: Project[] = [];

  for (const { type, group, slug } of getAllSlugs()) {
    const filePath = path.join(POSTS_PATH, type, group, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContent);

    posts.push({
      slug: `${type}/${group}/${slug}`,
      frontmatter: frontmatter as Frontmatter,
    });
  }

  // Sort posts by date
  const sortedPosts = posts.sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    }
    return 0;
  });

  // Cache the result
  postsCache = sortedPosts;
  return sortedPosts;
};

// Get a single post by its full path
export const getPostByPath = (
  type: string,
  group: string,
  slug: string,
): Project | null => {
  try {
    const filePath = path.join(POSTS_PATH, type, group, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContent);

    return {
      slug: `${type}/${group}/${slug}`,
      frontmatter: frontmatter as Frontmatter,
    };
  } catch {
    return null;
  }
};
