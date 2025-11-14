import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordWrapper({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg space-y-4 p-8 bg-white rounded-lg shadow">
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                  asChild
                >
                  <Link href="/signin">
                    <ChevronLeft />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back to Signin</p>
              </TooltipContent>
            </Tooltip>
            <h2 className="text-lg font-semibold">Reset Password</h2>
          </div>
          <Button variant="ghost" className="cursor-pointer" asChild>
            <Link href="/dashboard">Hompage</Link>
          </Button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Enter your new password below.
        </p>
        {children}
      </div>
    </div>
  );
}
