"use client";

import { usePermissions } from "@/hooks/usePermissions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export function ProtectedRoute({ children }) {
  const { session, isPending } = usePermissions();
  const router = useRouter();
  useEffect(() => {
    if (!isPending && !session) {
      toast.warning("Please sign in or register if you’re new.");
      router.push("/signin");
    }
  }, [session, isPending, router]);
  if (isPending) return <Spinner />;
  if (!session) return null;
  return <>{children}</>;
}
