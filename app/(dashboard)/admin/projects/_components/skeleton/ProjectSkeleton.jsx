import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto outline shadow-md rounded-lg p-6 space-y-6">
      <div className="rounded-lg overflow-hidden border">
        <Skeleton className="w-full h-[300px]" />
      </div>
      <div>
        <Skeleton className="h-8 w-2/3 mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-9/12" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
      <div className="space-y-4 mt-8">
        <Skeleton className="h-6 w-1/3 mb-2" />
        <div className="space-y-3" dir="rtl">
          <Skeleton className="h-7 w-1/2 self-end" />
          <Skeleton className="h-4 w-5/6 self-end" />
          <Skeleton className="h-4 w-3/4 self-end" />
        </div>
      </div>
      <div className="space-y-4 mt-8">
        <Skeleton className="h-6 w-1/3 mb-2" />
        <div className="flex flex-wrap justify-center items-start gap-4">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Skeleton className="h-4 w-1/3 mx-auto mb-2" />
            <div className="rounded-lg overflow-hidden border">
              <Skeleton className="w-full h-[200px]" />
            </div>
          </div>
          <div className="flex-1 min-w-[150px] max-w-xs">
            <Skeleton className="h-4 w-1/3 mx-auto mb-2" />
            <div className="rounded-lg overflow-hidden border">
              <Skeleton className="w-full h-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
