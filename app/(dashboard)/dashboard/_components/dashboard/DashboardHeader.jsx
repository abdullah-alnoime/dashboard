"use client";

import { Button } from "@/components/ui/button";
import { usePermissions } from "@/hooks/usePermissions";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function DashboardHeader() {
  const { session } = usePermissions();
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="cursor-pointer" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" className="cursor-pointer" asChild>
            <Link href="/profile">Profile</Link>
          </Button>
          <Button variant="ghost" className="cursor-pointer" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <span className="text-sm text-gray-600">
            {session?.user?.name} ({session?.user?.role})
          </span>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={async () => await authClient.signOut()}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
