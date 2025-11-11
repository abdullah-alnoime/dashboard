import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUniversities } from "@/requests/universities";
import { Universities } from "./_components";

export default async function UniversitiesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["universities"],
    queryFn: getUniversities,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Universities />
    </HydrationBoundary>
  );
}
