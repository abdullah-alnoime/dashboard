"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UsersWrapper({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (!isPending) {
      if (!session) {
        toast.warning("Your session is expired!");
        router.push("/signin");
      } else if (session?.user?.role !== "admin") {
        toast.warning("You're not authorized to access this route!");
        router.push("/dashboard");
      }
    }
  }, [session, isPending, router]);
  if (isPending) return <Spinner />;
  if (session?.user?.role !== "admin") return null;
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">User Management</h1>
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              Back to Dashboard
            </Link>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
