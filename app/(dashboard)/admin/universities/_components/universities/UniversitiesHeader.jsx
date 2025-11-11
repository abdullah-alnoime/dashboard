import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UniversitiesHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Universities</h2>
      <Button asChild>
        <Link href="universities/create">Add University</Link>
      </Button>
    </div>
  );
}
