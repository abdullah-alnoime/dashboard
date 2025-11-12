import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function UniversitySkeleton() {
  return (
    <Card className="w-full max-w-3xl mx-auto animate-in fade-in-50">
      <CardHeader className="flex gap-4 items-center">
        <div className="w-16 h-16 p-0.5 rounded-full overflow-hidden border shadow flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-full bg-gray-200" />
        </div>
        <div className="flex-1 space-y-2">
          <CardTitle>
            <Skeleton className="h-6 w-40 bg-gray-200" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-32" />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-muted-foreground">
        <div className="leading-relaxed space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Separator className="my-6" />
        <div>
          <Skeleton className="h-5 w-1/4 mb-4 bg-gray-200" />
          <div dir="rtl" className="space-y-3 leading-relaxed">
            <Skeleton className="h-4 w-2/3 ml-auto" />
            <Skeleton className="h-4 w-1/2 ml-auto" />
            <Skeleton className="h-4 w-3/4 ml-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
