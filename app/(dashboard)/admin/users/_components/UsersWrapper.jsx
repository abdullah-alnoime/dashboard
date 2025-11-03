"use client";

import { AdminRoute } from "@/components/auth/AdminRoute";
import Link from "next/link";

export default function UsersWrapper({ children }) {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-neutral-50">
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
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
    </AdminRoute>
  );
}
