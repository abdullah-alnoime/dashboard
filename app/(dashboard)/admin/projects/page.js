import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProjectsTable from "./_components/ProjectsTable";
import { getProjects } from "@/requests/projects";

export default async function ProjectsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProjectsTable />
        </HydrationBoundary>
      </main>
    </div>
  );
}
