import { formatDate } from "@/utils/formatDate";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MessageTab({ data, loading }) {
  if (loading) return <p>Loading messages...</p>;
  if (!data.length > 0)
    return <p className="text-gray-500">No messages found.</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Messages</h3>
        <Button variant="ghost" className="cursor-pointer" asChild>
          <Link href="/admin/messages">Manage Messages</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(({ _id, name, email, message, createdAt }) => (
          <Card key={_id}>
            <CardHeader>
              <CardTitle className="text-xl">
                Hi, Mr/Mrs. {name}
                <span className="text-sm text-gray-500">
                  (
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {email}
                  </a>
                  )
                </span>
              </CardTitle>
              <CardDescription>
                The message has been sent on {formatDate(createdAt, true)}
              </CardDescription>
            </CardHeader>
            <CardContent>{message}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
