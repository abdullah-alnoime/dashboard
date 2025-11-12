import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseSkeleton() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex gap-4 items-center">
        <div className="w-16 h-16 p-0.5 rounded-full overflow-hidden border shadow flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-full bg-gray-200" />
        </div>
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48 bg-gray-200" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-muted-foreground">
        <div className="leading-relaxed space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-5 w-32 mt-3 bg-gray-200" />
        </div>
        <Separator className="my-6" />
        <Skeleton className="h-5 w-1/4 bg-gray-200" />
        <div className="space-y-3" dir="rtl">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  );
}
