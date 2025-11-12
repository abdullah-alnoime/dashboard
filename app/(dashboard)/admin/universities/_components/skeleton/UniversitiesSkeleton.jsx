import { Skeleton } from "@/components/ui/skeleton";

export default function UniversitiesSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-7 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md bg-neutral-200" />
      </div>
      <div className="grid gap-4">
        <div className="flex justify-between items-center rounded-lg">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-[30px] w-[120px] bg-neutral-200 rounded-full"
            />
          ))}
        </div>
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-between items-center gap-4 border-b py-2"
          >
            {Array.from({ length: 5 }).map((_, cellIndex) => (
              <Skeleton
                key={cellIndex}
                className="h-[25px] w-[120px] rounded-full"
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
