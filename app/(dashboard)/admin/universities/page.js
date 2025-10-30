import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UniversitiesTable from "./_components/UniversitiesTable";
import { getUniversities } from "@/requests/universities";

export default async function UniversitiesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["universities"],
    queryFn: getUniversities,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UniversitiesTable />
    </HydrationBoundary>
  );
}
