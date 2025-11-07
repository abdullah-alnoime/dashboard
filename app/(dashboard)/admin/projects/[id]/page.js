import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Project } from "../_components";
import { getProject } from "@/requests/projects";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
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
            <p>Back to Projects</p>
          </TooltipContent>
        </Tooltip>
        <h2 className="text-xl font-bold">Project details</h2>
      </div>
      <Project projectId={id} />
    </HydrationBoundary>
  );
}
