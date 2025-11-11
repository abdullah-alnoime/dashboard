import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UniversityForm } from "../../_components";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function EditUniversityPage({ params }) {
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
              <Link href="/admin/universities">
                <ChevronLeft />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to Universities</p>
          </TooltipContent>
        </Tooltip>
        <h2 className="text-xl font-bold">Edit University</h2>
      </div>
      <div className="p-5 flex justify-center items-center">
        <div className="max-w-3xl w-full">
          <UniversityForm mode="edit" universityId={id} />
        </div>
      </div>
    </>
  );
}
