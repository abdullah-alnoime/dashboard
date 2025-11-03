import { formatDate } from "@/utils/formatDate";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function MessageTab({ data = [], loading }) {
  if (loading) return <p>Loading messages...</p>;
  if (!data?.length) return <p className="text-gray-500">No messages found.</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Messages</h3>
        <Link
          href="/admin/courses"
          className="text-sm text-blue-600 hover:underline"
        >
          Manage Messages
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(({ _id, name, email, message, createdAt }) => (
          <Card key={_id}>
            <CardHeader>
              <CardTitle>Mr/Mrs, {name}</CardTitle>
              <CardDescription>
                Sent via email {email} at {formatDate(createdAt, true)}
              </CardDescription>
            </CardHeader>
            <CardContent>{message}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
