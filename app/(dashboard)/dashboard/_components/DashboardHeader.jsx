import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function DashboardHeader({ session }) {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link href="/profile" className="text-blue-600 hover:underline">
            Profile
          </Link>
          <span className="text-sm text-gray-600">
            {session?.user?.name} ({session?.user?.role})
          </span>
          <Button
            variant="destructive"
            onClick={async () => await authClient.signOut()}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
