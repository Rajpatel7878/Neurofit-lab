import { Skeleton } from '@/components/ui/skeleton';

export default function ShopLoading() {
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

      {/* Hero section */}
      <div className="border-b border-border px-6 py-16 space-y-3">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Product cards */}
      <div className="px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-2xl overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-24 mt-2" />
                <div className="space-y-2 pt-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
                <Skeleton className="h-11 w-full rounded-lg mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
