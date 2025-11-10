import { Button } from "@/components/ui/button";
import { ProjectForm } from "../../_components";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  return (
    <>
      <div className="flex gap-2 items-center mb-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              asChild
            >
              <Link href=".">
                <ChevronLeft />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to Project Details</p>
          </TooltipContent>
        </Tooltip>
        <h2 className="text-xl font-bold">Edit project</h2>
      </div>
      <div className="p-5 flex justify-center items-center">
        <div className="max-w-3xl w-full">
          <ProjectForm mode="edit" projectId={id} />
        </div>
      </div>
    </>
  );
}
