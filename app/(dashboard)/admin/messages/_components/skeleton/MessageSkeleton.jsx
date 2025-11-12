import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function MessageSkeleton() {
  return (
    <Card className="max-w-2xl mx-auto animate-pulse">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-7 w-1/2 rounded bg-neutral-200" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-3/4 rounded" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {[...Array(4)].map((_, i) => {
          if (i === 2) {
            return (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/4 rounded bg-neutral-200" />
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-2/3 rounded" />
                <Skeleton className="h-6 w-1/2 rounded" />
                <Skeleton className="h-6 w-2/5 rounded" />
              </div>
            );
          }
          return (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/4 rounded bg-neutral-200" />
              <Skeleton className="h-6 w-full rounded" />
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex gap-3">
        <Skeleton className="h-10 w-32 rounded-md bg-neutral-200" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
}
