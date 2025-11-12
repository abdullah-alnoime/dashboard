"use client";

import { useState } from "react";
import { MessagesHeader, MessagesTable, MessagesDialog } from "./messages";
import { MessagesSkeleton } from "./skeleton";
import { useMessages } from "@/hooks/useMessages";

export default function Messages() {
  const { data: messages = [], isLoading } = useMessages();
  const [dialog, setDialog] = useState({ open: false, message: null });
  if (isLoading) return <MessagesSkeleton />;
  return (
    <>
      <MessagesHeader />
      <MessagesTable messages={messages} setDialog={setDialog} />
      <MessagesDialog dialog={dialog} setDialog={setDialog} />
    </>
  );
}
