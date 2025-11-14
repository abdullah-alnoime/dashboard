"use client";

import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

export default function Footer() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <footer className="bg-gray-900 text-white pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio Dashboard</h3>
            <p className="text-gray-400">
              Your all-in-one solution for managing your professional portfolio.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {isPending ? (
                <div className="flex gap-3 items-center">
                  <Skeleton className="w-24 h-8" />
                  <Skeleton className="w-24 h-8" />
                </div>
              ) : session ? (
                <>
                  <li>
                    <Link href="/dashboard" className="hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className="hover:text-white">
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/signin" className="hover:text-white">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="hover:text-white">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Project Management</li>
              <li>Education Tracking</li>
              <li>Course Certificates</li>
              <li>Contact Management</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 py-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Portfolio Dashboard. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
