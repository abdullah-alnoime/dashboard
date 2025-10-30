import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MessagesTable from "./_components/MessagesTable";
import { getMessages } from "@/requests/messages";

export default async function MessagesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MessagesTable />
        </HydrationBoundary>
      </main>
    </div>
  );
}
