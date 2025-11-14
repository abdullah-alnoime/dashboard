"use client";

import { usePermissions } from "@/hooks/usePermissions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export function AdminRoute({ children }) {
  const { permissions, session, isPending } = usePermissions();
  const router = useRouter();
  useEffect(() => {
    if (!isPending) {
      if (!session) {
        toast.warning("Please sign in or register if you’re new.");
        router.push("/signin");
      } else if (!permissions.isAdmin) {
        toast.warning("You don't have permission to access this page");
        router.push("/dashboard");
      }
    }
  }, [session, permissions.isAdmin, isPending, router]);
  if (isPending) return <Spinner />;
  if (!session || !permissions.isAdmin) return null;
  return <>{children}</>;
}
