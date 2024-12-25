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
            prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl
            prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h6:text-sm mx-auto max-w-none`,
          )}
        >
          {children}
        </article>
      );
    },
    ...components,
  };
}
