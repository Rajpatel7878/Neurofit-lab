import { Skeleton } from '@/components/ui/skeleton';

export default function VRDemoLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <div className="h-16 border-b border-border bg-background/95 flex items-center px-6">
        <Skeleton className="h-8 w-36" />
        <div className="ml-auto flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-border px-6 py-16 space-y-3">
        <Skeleton className="h-12 w-80" />
        <Skeleton className="h-6 w-96" />
        <Skeleton className="h-8 w-48 rounded-full" />
      </div>

      {/* Demo section */}
      <div className="px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="h-96 w-full rounded-3xl" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
            <Skeleton className="h-12 w-full rounded-lg mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
