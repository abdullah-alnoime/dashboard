import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UniversityDetails from "../_components/UniversityDetails";
import { getUniversity } from "@/requests/universities";

export default async function UniversityPage({ params }) {
  const queryClient = new QueryClient();
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["universities", id],
    queryFn: getUniversity(id),
  });
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UniversityDetails universityId={id} />
      </HydrationBoundary>
    </div>
  );
}
