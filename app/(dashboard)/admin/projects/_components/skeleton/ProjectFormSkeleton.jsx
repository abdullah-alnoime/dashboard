import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectFormSkeleton() {
  return (
    <div className="w-full max-w-3xl p-6 space-y-2 outline shadow-md rounded-lg">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <div className="flex gap-1.5 flex-wrap">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-10 flex-1 min-w-[200px]" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="h-px my-3 w-full" />
      <div className="space-y-6" dir="rtl">
        <Skeleton className="h-4 w-24 self-end" />
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 ml-auto" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 ml-auto" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 ml-auto" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto mt-6 flex justify-center gap-3">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-full max-w-sm" />
      </div>
    </div>
  );
}
