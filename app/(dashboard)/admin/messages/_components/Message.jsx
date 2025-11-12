"use client";

import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { useMessage } from "@/hooks/useMessages";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSkeleton } from "./skeleton";
import NoMessage from "./messages/NoMessage";

export default function Message({ messageId }) {
  const { data: message, isLoading } = useMessage(messageId);
  if (isLoading) return <MessageSkeleton />;
  if (!message) return <NoMessage />;
  const { name, email, message: msg, createdAt } = message;
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Message Overview
        </CardTitle>
        <CardDescription>View and reply to the message below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">From</p>
          <p className="text-base font-medium">{name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Email
          </p>
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
            {email}
          </a>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Message
          </p>
          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
            {msg}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Received on
          </p>
          <p className="text-gray-700">{formatDate(createdAt, true)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button className="cursor-pointer" asChild>
          <a
            href={`mailto:${email}?subject=Re: Your Message&body=Hi ${name},%0D%0A%0D%0A`}
          >
            Reply via Email
          </a>
        </Button>
        <Button variant="outline" asChild>
          <Link href=".">Back</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
