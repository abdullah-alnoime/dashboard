import { AdminRoute } from "@/components/auth/AdminRoute";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CoursesWrapper({ children }) {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-neutral-50">
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="max-w-7xl mx-auto py-4 flex gap-2 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    asChild
                  >
                    <Link href="/dashboard">
                      <ChevronLeft />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back to Dashboard</p>
                </TooltipContent>
              </Tooltip>
              <h1 className="text-2xl font-bold">Course Management</h1>
            </div>
            {children}
          </div>
        </main>
      </div>
    </AdminRoute>
  );
}
