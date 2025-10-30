import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCourse } from "@/requests/courses";
import CourseDetails from "../_components/CourseDetails";

export default async function CourseDetailsPage({ params }) {
  const queryClient = new QueryClient();
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["courses", id],
    queryFn: getCourse(id),
  });
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CourseDetails courseId={id} />
      </HydrationBoundary>
    </div>
  );
}
