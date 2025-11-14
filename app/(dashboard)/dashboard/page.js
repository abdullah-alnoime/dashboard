import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Dashboard } from "./_components";
import { getProjects } from "@/requests/projects";
import { getUniversities } from "@/requests/universities";
import { getCourses } from "@/requests/courses";
import { getMessages } from "@/requests/messages";

export default async function DashboardPage() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["projects"],
      queryFn: getProjects,
    }),
    queryClient.prefetchQuery({
      queryKey: ["universities"],
      queryFn: getUniversities,
    }),
    queryClient.prefetchQuery({
      queryKey: ["courses"],
      queryFn: getCourses,
    }),
    queryClient.prefetchQuery({
      queryKey: ["messages"],
      queryFn: getMessages,
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
