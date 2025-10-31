"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  banUser,
  getUsers,
  removeUser,
  unbanUser,
  updateUserRole,
} from "@/requests/users";
import { toast } from "sonner";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function UsersTable() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
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
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: () => getUsers(debouncedSearch),
    onError: (error) => toast.error(error.message),
    enabled: !!session && session?.user?.role === "admin",
  });
  const queryInvalidate = () => queryClient.invalidateQueries(["users"]);
  const setRoleMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryInvalidate();
      toast.success("The user's role has been changed");
    },
    onError: (e) => toast.error(e.message),
  });
  const banUserMutation = useMutation({
    mutationFn: banUser,
    onSuccess: () => {
      queryInvalidate();
      toast.success("The user has been banned!");
    },
    onError: (error) => toast.error(error.message),
  });
  const unbanUserMutation = useMutation({
    mutationFn: unbanUser,
    onSuccess: () => {
      queryInvalidate();
      toast.success("The user has been unbanned");
    },
    onError: (error) => toast.error(error.message),
  });
  const removeUserMutation = useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      queryInvalidate();
      toast.success("The user has been removed!");
    },
    onError: (error) => toast.error(error.message),
  });
  const handleOpenDialog = (type, user, extra = {}) => {
    setDialog({
      type,
      open: true,
      user,
      newRole: extra.newRole || null,
      reason: "",
    });
  };
  const handleConfirmDialog = () => {
    const { type, user, newRole, reason } = dialog;
    if (!user) return;
    switch (type) {
      case "role":
        setRoleMutation.mutate({ userId: user.id, role: newRole });
        break;
      case "ban":
        banUserMutation.mutate({ userId: user.id, banReason: reason });
        break;
      case "unban":
        unbanUserMutation.mutate(user.id);
        break;
      case "remove":
        removeUserMutation.mutate(user.id);
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
                    <Badge
                      variant="destructive"
                      className="bg-red-100 text-red-700"
                    >
                      Banned
                    </Badge>
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
                    <Button
                      variant="outline"
                      className="cursor-pointer text-green-600 hover:text-green-700"
                      disabled={
                        unbanUserMutation.isPending ||
                        session.user.id === user.id
                      }
                      onClick={() => handleOpenDialog("unban", user)}
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="cursor-pointer text-red-500 hover:text-red-600"
                      disabled={
                        banUserMutation.isPending || session.user.id === user.id
                      }
                      onClick={() => handleOpenDialog("ban", user)}
                    >
                      Ban
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    disabled={
                      removeUserMutation.isPending ||
                      session.user.id === user.id
                    }
                    onClick={() => handleOpenDialog("remove", user)}
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
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
