import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
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

      {/* Dashboard header */}
      <div className="border-b border-border bg-card px-6 py-8">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-5 w-48" />
      </div>

      {/* Stats cards */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-xl p-6 space-y-3">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Chart skeleton */}
      <div className="px-6">
        <div className="border rounded-xl p-6">
          <Skeleton className="h-6 w-48 mb-6" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
