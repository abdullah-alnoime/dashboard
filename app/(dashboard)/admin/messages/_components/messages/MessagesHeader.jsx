import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MessagesHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Messages</h2>
      <Button asChild>
        <Link href="messages/create">Add Message</Link>
      </Button>
    </div>
  );
}
