import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CourseForm } from "../../_components";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function EditCoursePage({ params }) {
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
              <Link href="/admin/courses">
                <ChevronLeft />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to Courses</p>
          </TooltipContent>
        </Tooltip>
        <h2 className="text-xl font-bold">Edit Course</h2>
      </div>
      <div className="p-5 flex justify-center items-center">
        <div className="max-w-3xl w-full">
          <CourseForm mode="edit" courseId={id} />
        </div>
      </div>
    </>
  );
}
