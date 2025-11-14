"use client";

import { ProjectTab, UniversityTab, CourseTab, MessageTab } from "../tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjects } from "@/hooks/useProjects";
import { useUniversities } from "@/hooks/useUniversities";
import { useCourses } from "@/hooks/useCourses";
import { useMessages } from "@/hooks/useMessages";
import { usePermissions } from "@/hooks/usePermissions";

export default function DashboardTabs() {
  const { permissions } = usePermissions();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: universities, isLoading: universitiesLoading } =
    useUniversities();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: messages, isLoading: messagesLoading } = useMessages();
  const tabs = ["projects", "universities", "courses"];
  if (permissions.isAdmin) tabs.push("messages");
  return (
    <Tabs defaultValue="projects" className="bg-white rounded-lg shadow p-6">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab} className="cursor-pointer">
            {tab === "projects" && `Projects (${projects?.length || 0})`}
            {tab === "universities" &&
              `Universities (${universities?.length || 0})`}
            {tab === "courses" && `Courses (${courses?.length || 0})`}
            {tab === "messages" && `Messages (${messages?.length || 0})`}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="projects">
        <ProjectTab
          data={projects}
          loading={projectsLoading}
          isAdmin={permissions.isAdmin}
        />
      </TabsContent>
      <TabsContent value="universities">
        <UniversityTab
          data={universities}
          loading={universitiesLoading}
          isAdmin={permissions.isAdmin}
        />
      </TabsContent>
      <TabsContent value="courses">
        <CourseTab
          data={courses}
          loading={coursesLoading}
          isAdmin={permissions.isAdmin}
        />
      </TabsContent>
      {permissions.isAdmin && (
        <TabsContent value="messages">
          <MessageTab data={messages} loading={messagesLoading} />
        </TabsContent>
      )}
    </Tabs>
  );
}
