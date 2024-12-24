import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, Frontmatter } from '@/types/mdx';

const POSTS_PATH = path.join(process.cwd(), 'content');

export const getAllPostsData = (): Project[] => {
  const files = fs.readdirSync(POSTS_PATH);
  const posts = files
    .filter((file) => file.endsWith('.mdx')) // .filter((file) => /\.(md|mdx)$/.test(file))
    .map((filename): Project => {
      const filePath = path.join(POSTS_PATH, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);

      return {
        filename,
        frontmatter: frontmatter as Frontmatter,
        slug: filename.replace('.mdx', ''), // slug: filename.replace(/\.(md|mdx)$/, '')
      };
    });

  return posts.sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    }
    return 0;
  });
};
