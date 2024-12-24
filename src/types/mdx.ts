export interface Frontmatter {
  title: string;
  date?: string;
  // Add other frontmatter fields you might have
}

export interface Project {
  frontmatter: Frontmatter;
  slug: string;
  filename: string;
}
