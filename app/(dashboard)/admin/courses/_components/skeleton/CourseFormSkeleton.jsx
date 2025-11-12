import { Skeleton } from "@/components/ui/skeleton";

export default function CourseFormSkeleton() {
  return (
    <div className="p-6 max-w-3xl mx-auto rounded-xl border bg-white shadow-sm space-y-4 animate-pulse">
      <Skeleton className="h-8 w-1/3 rounded bg-neutral-200" />
      {[...Array(7)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-6 w-1/4 rounded bg-neutral-200" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
      ))}
      <Skeleton className="h-px my-3 w-full" />
      <div dir="rtl" className="border-t pt-6 space-y-4">
        <Skeleton className="h-8 w-1/3 self-end rounded bg-neutral-200" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-1/4 rounded bg-neutral-200" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
        ))}
      </div>
      <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-3 pt-4">
        <Skeleton className="h-10 rounded-md bg-neutral-200" />
        <Skeleton className="h-10 rounded-md" />
      </div>
    </div>
  );
}
