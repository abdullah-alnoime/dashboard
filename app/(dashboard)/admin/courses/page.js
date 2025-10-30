import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CoursesTable from "./_components/CoursesTable";
import { getCourses } from "@/requests/courses";

export default async function CoursesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CoursesTable />
        </HydrationBoundary>
      </main>
    </div>
  );
}
