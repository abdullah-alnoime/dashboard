import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UsersWrapper({ children }) {
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Users</h2>
            <Button className="cursor-pointer" asChild>
              <Link href="users/create">Add user</Link>
            </Button>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
