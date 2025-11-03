"use client";

import { usePermissions } from "@/hooks/usePermissions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export function ProtectedRoute({ children, requireAuth = true }) {
  const { session, isPending } = usePermissions();
  const router = useRouter();
  useEffect(() => {
    if (!isPending && requireAuth && !session) {
      toast.warning("Please sign in to access this page");
      router.push("/signin");
    }
  }, [session, isPending, requireAuth, router]);
  if (isPending) return <Spinner />;
  if (requireAuth && !session) return null;
  return <>{children}</>;
}
