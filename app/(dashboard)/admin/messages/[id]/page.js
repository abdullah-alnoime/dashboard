import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MessageDetails from "../_components/MessageDetails";
import { getMessage } from "@/requests/messages";

export default async function MessageDetailsPage({ params }) {
  const queryClient = new QueryClient();
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["messages", id],
    queryFn: getMessage(id),
  });
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MessageDetails messageId={id} />
      </HydrationBoundary>
    </div>
  );
}
