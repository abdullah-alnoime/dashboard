import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectsHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Projects</h2>
      <Button asChild>
        <Link href="projects/create">Add Project</Link>
      </Button>
    </div>
  );
}
