"use client";

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
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Pencil, ScanText, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { usePermissions } from "@/hooks/usePermissions";
import { useDeleteProject } from "@/hooks/useProjects";

export default function ProjectsTable({ projects, setDialog }) {
  const { permissions } = usePermissions();
  const { isPending } = useDeleteProject();
  const handleOpenDialog = (project) => {
    setDialog({ open: true, project });
  };
  if (projects.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center gap-6">
          <CardTitle className="text-2xl">No Projects Found</CardTitle>
          <CardDescription>
            Click on "Add Project" to create a new one.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-100">
          {["Project Id", "Title", "Summary", "Tools", "Links", "Actions"].map(
            (col) => (
              <TableHead key={col} className="font-bold">
                {col}
              </TableHead>
            )
          )}
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
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ScanText />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View the project ({title})</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <Link
                      href={`projects/${_id}/edit`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit the project ({title})</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleOpenDialog({ _id, title })}
                    disabled={!permissions.canDeleteProject || isPending}
                  >
                    <Trash2 />
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
  );
}
