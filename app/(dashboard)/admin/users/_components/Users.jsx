"use client";

import { UsersTable, UsersDialog, UsersHeader } from "./users";
import { UsersSkeleton } from "./skeletons";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";

export default function Users() {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dialog, setDialog] = useState({
    type: null,
    open: false,
    user: null,
    newRole: null,
    reason: "",
  });
  const { data: users = [], isLoading } = useUsers(debouncedSearch);
  if (isLoading) return <UsersSkeleton />;
  return (
    <>
      <UsersHeader setDebouncedSearch={setDebouncedSearch} />
      <UsersTable users={users} setDialog={setDialog} />
      <UsersDialog dialog={dialog} setDialog={setDialog} />
    </>
  );
}
