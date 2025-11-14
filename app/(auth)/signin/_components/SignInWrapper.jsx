"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SignInWrapper({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (!isPending && session) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);
  if (isPending) {
    return <Spinner />;
  }
  if (session) return null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg space-y-4 p-8 bg-white rounded-lg shadow">
        <div className="flex items-center gap-2 mb-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                asChild
              >
                <Link href="/">
                  <ChevronLeft />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Back to Homepage</p>
            </TooltipContent>
          </Tooltip>
          <h2 className="text-4xl font-bold">Sign In</h2>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back! Please sign in to your account.
        </p>
        {children}
        <p className="text-sm">
          <span>Don't have an account? </span>
          <Button
            variant="link"
            className="px-0 text-blue-500 cursor-pointer"
            asChild
          >
            <Link href="/signup" className="hover:underline">
              Register
            </Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
