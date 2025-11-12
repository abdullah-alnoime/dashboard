import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Messages } from "./_components";
import { getMessages } from "@/requests/messages";

export default async function MessagesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Messages />
    </HydrationBoundary>
  );
}
