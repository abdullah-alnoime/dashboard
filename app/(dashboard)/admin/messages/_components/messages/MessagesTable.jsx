"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useDeleteMessage } from "@/hooks/useMessages";
import { usePermissions } from "@/hooks/usePermissions";
import { formatDate } from "@/utils/formatDate";
import { ScanText, Trash2 } from "lucide-react";
import Link from "next/link";

export default function MessagesTable({ messages, setDialog }) {
  const { permissions } = usePermissions();
  const { isPending } = useDeleteMessage();
  const handleOpenDialog = (message) => {
    setDialog({ open: true, message });
  };
  if (messages.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center gap-6">
          <CardTitle className="text-2xl">No Messages Found</CardTitle>
          <CardDescription>
            Click on "Add Message" to create a new one.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-100">
          {["Message Id", "Name", "Email", "Message", "Sent At", "Actions"].map(
            (col) => (
              <TableHead key={col} className="font-bold pointer-events-none">
                {col}
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map(({ _id, name, email, message, createdAt }) => (
          <TableRow key={_id}>
            <TableCell>{_id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell className="max-w-[300px] truncate">{message}</TableCell>
            <TableCell>{formatDate(createdAt)}</TableCell>
            <TableCell className="space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <Link
                      href={`messages/${_id}`}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ScanText />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View the message by ({name})</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleOpenDialog({ _id, name })}
                    disabled={!permissions.canDeleteMessage || isPending}
                  >
                    <Trash2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete the message by ({name})</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
