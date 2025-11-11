import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUniversity } from "@/requests/universities";
import { University } from "../_components";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function UniversityPage({ params }) {
  const queryClient = new QueryClient();
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["universities", id],
    queryFn: () => getUniversity(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex gap-2 items-center mb-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              asChild
            >
              <Link href=".">
                <ChevronLeft />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to Universities</p>
          </TooltipContent>
        </Tooltip>
        <h2 className="text-xl font-bold">University details</h2>
      </div>
      <University universityId={id} />
    </HydrationBoundary>
  );
}
