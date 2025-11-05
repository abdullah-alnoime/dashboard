import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProjectDetails from "../_components/ProjectDetails";
import { getProject } from "@/requests/projects";

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects", id],
    queryFn: getProject(id),
  });
  return (
    <div className="flex justify-center items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectDetails projectId={id} />
      </HydrationBoundary>
    </div>
  );
}
