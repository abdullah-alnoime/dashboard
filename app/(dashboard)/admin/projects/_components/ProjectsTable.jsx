"use client";

import Link from "next/link";
import { useState } from "react";
import { useProjects, useDeleteProject } from "@/hooks/useProjects";
import { usePermissions } from "@/hooks/usePermissions";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyContent,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScanText, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProjectsTable() {
  const { data: projects = [], isLoading } = useProjects();
  const { permissions } = usePermissions();
  const deleteMutation = useDeleteProject();
  const [dialog, setDialog] = useState({ open: false, project: null });

  const handleOpenDialog = (project) => {
    setDialog({ open: true, project });
  };

  const handleCancelDialog = () => {
    setDialog({ open: false, project: null });
  };

  const handleConfirmDialog = () => {
    if (dialog.project?._id) {
      deleteMutation.mutate(dialog.project._id, {
        onSuccess: () => setDialog({ open: false, project: null }),
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-7 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md bg-neutral-200" />
        </div>
        <div className="grid gap-4">
          <div className="flex justify-between items-center rounded-lg">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[30px] w-[120px] bg-neutral-200 rounded-full"
              />
            ))}
          </div>
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between items-center gap-4 border-b py-2"
            >
              {Array.from({ length: 6 }).map((_, cellIndex) => (
                <Skeleton
                  key={cellIndex}
                  className="h-[25px] w-[120px] rounded-full"
                />
              ))}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button asChild>
          <Link href="projects/create">Add project</Link>
        </Button>
      </div>
      {projects.length === 0 ? (
        <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
          <EmptyHeader>
            <EmptyTitle>No projects found</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>Click "Add project" to create a new one.</EmptyContent>
        </Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              {[
                "Project Id",
                "Title",
                "Summary",
                "Tools",
                "Links",
                "Actions",
              ].map((col) => (
                <TableHead key={col} className="font-bold">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map(({ _id, title, summary, code, demo, tools }) => (
              <TableRow key={_id}>
                <TableCell>{_id}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{summary}</TableCell>
                <TableCell>
                  {tools.map((tool) => (
                    <Badge key={tool} variant="secondary" className="mr-1">
                      {tool}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Live demo
                  </a>
                  ,{" "}
                  <a
                    href={code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Source code
                  </a>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" asChild>
                        <Link
                          href={`projects/${_id}`}
                          className="text-gray-600 hover:underline"
                        >
                          <ScanText />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Show the project's details</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleOpenDialog({ _id, title })}
                        disabled={
                          !permissions.canDeleteProject ||
                          deleteMutation.isPending
                        }
                      >
                        <Trash2 className="text-red-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete the project ({title})</p>
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
        onOpenChange={(open) => setDialog((prev) => ({ ...prev, open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold">{dialog.project?.title}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDialog}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDialog}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
