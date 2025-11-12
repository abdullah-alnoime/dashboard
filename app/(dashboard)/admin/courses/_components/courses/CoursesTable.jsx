"use client";

import { Badge } from "@/components/ui/badge";
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
import { useDeleteCourse } from "@/hooks/useCourses";
import { usePermissions } from "@/hooks/usePermissions";
import { Pencil, ScanText, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CoursesTable({ courses, setDialog }) {
  const { permissions } = usePermissions();
  const { isPending } = useDeleteCourse();
  const handleOpenDialog = (course) => {
    setDialog({ open: true, course });
  };
  if (courses.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center gap-6">
          <CardTitle className="text-2xl">No Courses Found</CardTitle>
          <CardDescription>
            Click on "Add Course" to create a new one.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-100">
          {[
            "University Id",
            "Title",
            "Provider",
            "Skills",
            "Credentials",
            "Actions",
          ].map((col) => (
            <TableHead key={col} className="font-bold pointer-events-none">
              {col}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map(({ _id, title, by, skills, credential }) => (
          <TableRow key={_id}>
            <TableCell>{_id}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{by}</TableCell>
            <TableCell className="max-w-[300px]">
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <a
                href={credential}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View credential
              </a>
            </TableCell>
            <TableCell className="space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <Link
                      href={`courses/${_id}`}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ScanText />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View the course ({title})</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <Link
                      href={`courses/${_id}/edit`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit the course ({title})</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleOpenDialog({ _id, title })}
                    disabled={!permissions.canDeleteCourse || isPending}
                  >
                    <Trash2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete the course ({title})</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
