"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import DashboardHeader from "./DashboardHeader";
import AdminControls from "./AdminControls";
import DashboardTabs from "./DashboardTabs";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function DashboardClient() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState("projects");

  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    if (!isPending && !session) {
      toast.warning("Your session is expired!");
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await apiClient.get("/project");
      return data.contents || [];
    },
    enabled: !!session,
  });

  const { data: universities, isLoading: universitiesLoading } = useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const { data } = await apiClient.get("/education/university");
      return data.contents || [];
    },
    enabled: !!session,
  });

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await apiClient.get("/education/course");
      return data.contents || [];
    },
    enabled: !!session,
  });
  if (isPending) {
    return <Spinner />;
  }
  if (!session) return null;
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader session={session} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome, {session?.user?.name}!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{session?.user?.email}</p>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-medium capitalize">{session?.user?.role}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded">
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium">
                {session?.user?.emailVerified ? "Verified" : "Unverified"}
              </p>
            </div>
          </div>
        </div>

        {isAdmin && <AdminControls />}

        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAdmin={isAdmin}
          data={{ projects, universities, courses }}
          loading={{
            projectsLoading,
            universitiesLoading,
            coursesLoading,
          }}
        />
      </main>
    </div>
  );
}
