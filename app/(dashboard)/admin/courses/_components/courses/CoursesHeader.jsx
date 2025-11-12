import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CoursesHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Courses</h2>
      <Button asChild>
        <Link href="courses/create">Add Course</Link>
      </Button>
    </div>
  );
}
