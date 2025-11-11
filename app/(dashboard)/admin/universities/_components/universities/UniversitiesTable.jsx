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
import { usePermissions } from "@/hooks/usePermissions";
import { useDeleteUniversity } from "@/hooks/useUniversities";
import { Pencil, ScanText, Trash2 } from "lucide-react";
import Link from "next/link";

export default function UniversitiesTable({ universities, setDialog }) {
  const { permissions } = usePermissions();
  const { isPending } = useDeleteUniversity();
  const handleOpenDialog = (university) => {
    setDialog({ open: true, university });
  };
  if (universities.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center gap-6">
          <CardTitle className="text-2xl">No Universities Found</CardTitle>
          <CardDescription>
            Click on "Add University" to create a new one.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-100">
          {["University Id", "Title", "Provider", "Status", "Actions"].map(
            (col) => (
              <TableHead key={col} className="font-bold pointer-events-none">
                {col}
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {universities.map(({ _id, title, by, status }) => (
          <TableRow key={_id}>
            <TableCell>{_id}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{by}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={`${
                  status === "graduated"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {status === "graduated" ? "Graduated" : "In Progress"}
              </Badge>
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
                  <p>View the university ({title})</p>
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
                  <p>Edit the university ({title})</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleOpenDialog({ _id, title })}
                    disabled={!permissions.canDeleteUniversity || isPending}
                  >
                    <Trash2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete the university ({title})</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
