"use client";

import { useState } from "react";
import { MessagesHeader, MessagesTable, MessagesDialog } from "./messages";
import { usePermissions } from "@/hooks/usePermissions";
import { useMessages } from "@/hooks/useMessages";
import { MessagesSkeleton } from "./skeleton";
import NoPermissions from "./messages/NoPermissions";

export default function Messages() {
  const { permissions } = usePermissions();
  const { data: messages = [], isLoading } = useMessages();
  const [dialog, setDialog] = useState({ open: false, message: null });
  if (!permissions.canReadMessage) return <NoPermissions />;
  if (isLoading) return <MessagesSkeleton />;
  return (
    <>
      <MessagesHeader />
      <MessagesTable messages={messages} setDialog={setDialog} />
      <MessagesDialog dialog={dialog} setDialog={setDialog} />
    </>
  );
}
