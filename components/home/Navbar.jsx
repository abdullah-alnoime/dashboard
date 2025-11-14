"use client";

import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
          <div className="flex items-center gap-4">
            {isPending ? (
              <div className="flex gap-3 items-center">
                <Skeleton className="w-24 h-8" />
                <Skeleton className="w-24 h-8" />
              </div>
            ) : session ? (
              <>
                <Button variant="ghost" className="cursor-pointer">
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button className="cursor-pointer" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="cursor-pointer" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button className="cursor-pointer" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
