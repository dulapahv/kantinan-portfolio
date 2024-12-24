import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => {
      return (
        <article
          role="article"
          aria-label="Article content"
          className={cn(
            `prose prose-neutral dark:prose-invert prose-headings:mt-8
            prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl
            prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg mx-auto`,
          )}
        >
          {children}
        </article>
      );
    },
    ...components,
  };
}
