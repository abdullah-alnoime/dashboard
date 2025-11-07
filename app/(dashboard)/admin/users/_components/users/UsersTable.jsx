"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePermissions } from "@/hooks/usePermissions";
import {
  useUpdateUserRole,
  useBanUser,
  useUnbanUser,
  useRemoveUser,
} from "@/hooks/useUsers";
import { LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react";

export default function UsersTable({ users, setDialog }) {
  const { permissions, user } = usePermissions();
  const setRoleMutation = useUpdateUserRole();
  const banUserMutation = useBanUser();
  const unbanUserMutation = useUnbanUser();
  const removeUserMutation = useRemoveUser();
  const canModifyUser = (targetUser) => {
    return permissions.canManageUsers && user?.id !== targetUser.id;
  };
  const handleOpenDialog = (type, targetUser) => {
    setDialog({
      type,
      open: true,
      user: targetUser,
      reason: "",
    });
  };
  if (users.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center gap-6">
          <CardTitle className="text-2xl">No Users Found</CardTitle>
          <CardDescription>
            {debouncedSearch && "There is no results matching your search."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-100">
          {["User Id", "Name", "Email", "Role", "Status", "Actions"].map(
            (col) => (
              <TableHead key={col} className="font-bold pointer-events-none">
                {col}
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select
                value={user.role || "user"}
                onValueChange={(value) =>
                  setRoleMutation.mutate({ userId: user.id, role: value })
                }
                disabled={setRoleMutation.isPending}
              >
                <SelectTrigger className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  <SelectValue placeholder="Select user's role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin" className="cursor-pointer">
                    Admin
                  </SelectItem>
                  <SelectItem value="user" className="cursor-pointer">
                    User
                  </SelectItem>
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
                      onClick={() => unbanUserMutation.mutate(user.id)}
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
  );
}
