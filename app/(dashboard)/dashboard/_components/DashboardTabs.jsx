import ProjectTab from "./ProjectTab";
import UniversityTab from "./UniversityTab";
import CourseTab from "./CourseTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardTabs({
  activeTab,
  setActiveTab,
  isAdmin,
  data,
  loading,
}) {
  return (
    <Tabs defaultValue="projects" className="bg-white rounded-lg shadow p-6">
      <TabsList>
        {["projects", "universities", "courses"].map((tab) => (
          <TabsTrigger key={tab} value={tab} className="cursor-pointer">
            {tab === "projects" && `Projects (${data.projects?.length || 0})`}
            {tab === "universities" &&
              `Universities (${data.universities?.length || 0})`}
            {tab === "courses" && `Courses (${data.courses?.length || 0})`}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="projects">
        <ProjectTab
          data={data.projects}
          loading={loading.projectsLoading}
          isAdmin={isAdmin}
        />
      </TabsContent>
      <TabsContent value="universities">
        <UniversityTab
          data={data.universities}
          loading={loading.universitiesLoading}
          isAdmin={isAdmin}
        />
      </TabsContent>
      <TabsContent value="courses">
        <CourseTab
          data={data.courses}
          loading={loading.coursesLoading}
          isAdmin={isAdmin}
        />
      </TabsContent>
    </Tabs>
  );
}
