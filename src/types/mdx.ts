export interface Frontmatter {
  group: 'project' | 'experience';
  type: 'engineer' | 'data' | 'business';
  title: string;
  date?: string;
}

export interface Project {
  slug: string;
  frontmatter: Frontmatter;
}
