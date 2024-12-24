import Link from 'next/link';
import { icons } from '@/lib/icons';

// Filter out the icon entries we want to display
const portfolioLinks = [
  {
    key: 'engineer',
    href: '/engineer',
  },
  {
    key: 'data',
    href: '/data',
  },
  {
    key: 'business',
    href: '/business',
  },
  {
    key: 'all',
    href: '/all',
  },
].map(({ key, href }) => ({
  ...icons.type[key],
  href,
}));

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
      <div className="w-full">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1
            className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r
              from-primary to-primary/50 py-1"
          >
            Welcome to My Portfolio
          </h1>
          <p className="text-lg text-muted-foreground mx-auto">
            Explore my work across automotive engineering, data analysis, and
            business domains
          </p>
        </div>

        {/* Portfolio Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative overflow-hidden rounded-xl border bg-background p-6
                  transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
                      {link.label}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl transition-colors hover:bg-primary/5" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
