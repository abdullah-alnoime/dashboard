import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ProjectsSkeleton } from "./_components/skeleton";
import ProjectsTable from "./_components/Projects";
import { getProjects } from "@/requests/projects";
import { Suspense } from "react";

export default async function ProjectsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsTable />
      </Suspense>
    </HydrationBoundary>
  );
}
