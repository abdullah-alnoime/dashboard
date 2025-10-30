"use client";

import { useQuery } from "@tanstack/react-query";
import { getMessage } from "@/requests/messages";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

export default function MessageDetails({ messageId }) {
  const { data: message, isLoading } = useQuery({
    queryKey: ["messages", messageId],
    queryFn: () => getMessage(messageId),
  });
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">Loading message...</div>
    );
  }
  if (!message) {
    return (
      <div className="text-center text-gray-500 py-10">Message not found.</div>
    );
  }
  const { name, email, message: msg, createdAt } = message?.content;
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-4">Message Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <p className="text-gray-900">{name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <p>
            <a
              href={`mailto:${email}`}
              className="text-blue-600 hover:underline"
            >
              {email}
            </a>
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Message
          </label>
          <p className="text-gray-900 whitespace-pre-wrap">{msg}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Received At
          </label>
          <p className="text-gray-700">{formatDate(createdAt, true)}</p>
        </div>
      </div>

      <div className="flex gap-3 pt-6">
        <a
          href={`mailto:${email}?subject=Re: Your Message&body=Hi ${name},%0D%0A%0D%0A`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reply via Email
        </a>
        <Link
          href="."
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
