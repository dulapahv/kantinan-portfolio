import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Loading() {
  return (
    <div className="container max-w-4xl py-8">
      <Skeleton className="h-10 w-48 mb-8" />

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {['engineer', 'data', 'business'].map((type) => (
            <TabsTrigger key={type} value={type} className="capitalize">
              {type}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-12">
          {[1, 2, 3].map((section) => (
            <section key={section} className="space-y-4">
              <Skeleton className="h-8 w-32" />

              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((card) => (
                  <Card key={card} className="h-[120px] p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <Skeleton className="h-6 w-3/4" />
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
