"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpWrapper({ children }) {
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
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-4 p-8 bg-white rounded-lg shadow">
        <p className="pb-2">
          <Link href="/" className="text-gray-600 hover:underline">
            Back to Home
          </Link>
        </p>
        <div>
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us today! Create your account to get started.
          </p>
        </div>
        {children}
        <p className="text-sm ">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
