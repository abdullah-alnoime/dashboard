"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { usePermissions } from "@/hooks/usePermissions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useBanUser,
  useRemoveUser,
  useUnbanUser,
  useUpdateUserRole,
  useUsers,
} from "@/hooks/useUsers";

export default function UsersTable() {
  const { permissions, user } = usePermissions();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dialog, setDialog] = useState({
    type: null,
    open: false,
    user: null,
    newRole: null,
    reason: "",
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);
  const { data: users, isLoading } = useUsers(debouncedSearch);
  const setRoleMutation = useUpdateUserRole();
  const banUserMutation = useBanUser();
  const unbanUserMutation = useUnbanUser();
  const removeUserMutation = useRemoveUser();
  const canModifyUser = (targetUser) => {
    return permissions.canManageUsers && user?.id !== targetUser.id;
  };
  if (isLoading) {
    return (
      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 justify-between items-center">
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
          </div>
        ))}
      </div>
    );
  }
  console.log(users);
  const handleOpenDialog = (type, targetUser, extra = {}) => {
    setDialog({
      type,
      open: true,
      user: targetUser,
      newRole: extra.newRole || null,
      reason: "",
    });
  };
  const handleConfirmDialog = () => {
    const { type, user: targetUser, newRole, reason } = dialog;
    if (!targetUser) return;
    switch (type) {
      case "role":
        setRoleMutation.mutate({ userId: targetUser.id, role: newRole });
        break;
      case "ban":
        banUserMutation.mutate({ userId: targetUser.id, banReason: reason });
        break;
      case "unban":
        unbanUserMutation.mutate(targetUser.id);
        break;
      case "remove":
        removeUserMutation.mutate(targetUser.id);
        break;
    }
    setDialog({ ...dialog, open: false });
  };
  const handleCancelDialog = () => {
    setDialog({ ...dialog, open: false, reason: "" });
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button className="cursor-pointer" asChild>
          <Link href="users/create">Add user</Link>
        </Button>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search users by email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="grid gap-6">
          <div className="flex gap-4 justify-between items-center">
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
          </div>
          <div className="flex gap-4 justify-between items-center">
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
            <Skeleton className="h-[20px] w-[200px] rounded-full" />
          </div>
        </div>
      ) : users.length === 0 ? (
        <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
          <EmptyHeader>
            <EmptyTitle>No found users</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            {debouncedSearch && "There is no results matching your search."}
          </EmptyContent>
        </Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              {["Name", "Email", "Role", "Status", "Actions"].map((col) => (
                <TableHead key={col} className="font-bold pointer-events-none">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role || "user"}
                    onValueChange={(value) =>
                      handleOpenDialog("role", user, { newRole: value })
                    }
                    disabled={setRoleMutation.isPending}
                  >
                    <SelectTrigger className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                      <SelectValue placeholder="Select user's role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {user.banned ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant="destructive"
                          className="bg-red-100 text-red-700"
                        >
                          Banned
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ban reason is {user.banReason}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : user.emailVerified ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      Not Verified
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="flex gap-2 items-center">
                  {user.banned ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="cursor-pointer text-green-600 hover:text-green-700"
                          disabled={
                            !canModifyUser(user) || unbanUserMutation.isPending
                          }
                          onClick={() => handleOpenDialog("unban", user)}
                        >
                          <LockKeyholeOpen />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Unban {user.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="cursor-pointer text-red-500 hover:text-red-600"
                          disabled={
                            !canModifyUser(user) || banUserMutation.isPending
                          }
                          onClick={() => handleOpenDialog("ban", user)}
                        >
                          <LockKeyhole />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ban {user.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        disabled={
                          !canModifyUser(user) || removeUserMutation.isPending
                        }
                        onClick={() => handleOpenDialog("remove", user)}
                      >
                        <Trash2 className="text-red-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove {user.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog
        open={dialog.open}
        onOpenChange={(open) => setDialog({ ...dialog, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialog.type === "role" && "Change User Role"}
              {dialog.type === "ban" && "Ban User"}
              {dialog.type === "unban" && "Unban User"}
              {dialog.type === "remove" && "Remove User"}
            </DialogTitle>
            <DialogDescription>
              {dialog.type === "role" &&
                `Are you sure you want to change ${
                  dialog.user?.name
                }'s role to ${dialog.newRole?.toUpperCase()}?`}
              {dialog.type === "ban" &&
                `Provide a reason to ban ${dialog.user?.name}.`}
              {dialog.type === "unban" &&
                `Are you sure you want to unban ${dialog.user?.name}?`}
              {dialog.type === "remove" &&
                `Are you sure you want to permanently remove ${dialog.user?.name}?`}
            </DialogDescription>
          </DialogHeader>
          {dialog.type === "ban" && (
            <div className="my-4">
              <Input
                placeholder="Enter ban reason"
                value={dialog.reason}
                onChange={(e) =>
                  setDialog({ ...dialog, reason: e.target.value })
                }
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDialog}
              disabled={
                banUserMutation.isPending ||
                unbanUserMutation.isPending ||
                removeUserMutation.isPending ||
                setRoleMutation.isPending
              }
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
