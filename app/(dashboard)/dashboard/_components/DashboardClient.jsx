"use client";

import DashboardHeader from "./DashboardHeader";
import AdminControls from "./AdminControls";
import DashboardTabs from "./DashboardTabs";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { usePermissions } from "@/hooks/usePermissions";
import { useProjects } from "@/hooks/useProjects";
import { useUniversities } from "@/hooks/useUniversities";
import { useCourses } from "@/hooks/useCourses";
import Welcoming from "./Welcoming";
import { useMessages } from "@/hooks/useMessages";

export default function DashboardClient() {
  const { permissions, session } = usePermissions();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: universities = [], isLoading: universitiesLoading } =
    useUniversities();
  const { data: courses = [], isLoading: coursesLoading } = useCourses();
  const { data: messages = [], isLoading: messagesLoading } = useMessages();
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader session={session} />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Welcoming
            session={session}
            isAdmin={permissions.isAdmin}
            data={{ projects, universities, courses, messages }}
            loading={{
              projectsLoading,
              universitiesLoading,
              coursesLoading,
              messagesLoading,
            }}
          />
          {permissions.isAdmin && <AdminControls />}
          <DashboardTabs
            isAdmin={permissions.isAdmin}
            data={{ projects, universities, courses, messages }}
            loading={{
              projectsLoading,
              universitiesLoading,
              coursesLoading,
              messagesLoading,
            }}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
}
