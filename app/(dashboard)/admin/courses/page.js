import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Courses } from "./_components";
import { getCourses } from "@/requests/courses";

export default async function CoursesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Courses />
    </HydrationBoundary>
  );
}
