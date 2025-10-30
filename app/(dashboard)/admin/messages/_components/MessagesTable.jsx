"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { getMessages, removeMessage } from "@/requests/messages";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

export default function MessagesTable() {
  const queryClient = useQueryClient();
  const { data: session, isPending } = authClient.useSession();
  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    enabled: !!session,
  });
  const deleteMutation = useMutation({
    mutationFn: (messageId) => removeMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
      alert("Message deleted successfully!");
    },
    onError: (err) => {
      alert(err.response?.data?.msg || "Failed to delete message");
    },
  });
  if (isPending)
    return (
      <div className="text-center py-20 text-gray-600">Checking session...</div>
    );
  if (session?.user?.role !== "admin")
    return <div>You're not authorized to access this route!</div>;
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Message Management</h1>
        <a href="/dashboard" className="text-blue-600 hover:underline">
          Back to Dashboard
        </a>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Messages</h2>
        <Link
          href="messages/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Message
        </Link>
      </div>

      {isLoading ? (
        <p>Loading messages...</p>
      ) : messages?.contents.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "Message", "Sent At", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages?.contents.map(
                ({ _id, name, email, createdAt, message }) => (
                  <tr key={_id}>
                    <td className="px-6 py-4">{name}</td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {email}
                      </a>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">{message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(createdAt, true)}
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <Link
                        href={`messages/${_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this message?"
                            )
                          )
                            deleteMutation.mutate(_id);
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
