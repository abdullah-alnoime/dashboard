"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectsSkeleton } from "./skeleton";
import { ProjectsHeader, ProjectsTable, ProjectsDialog } from "./projects";

export default function Projects() {
  const { data: projects = [], isLoading } = useProjects();
  const [dialog, setDialog] = useState({ open: false, project: null });
  if (isLoading) return <ProjectsSkeleton />;
  return (
    <>
      <ProjectsHeader />
      <ProjectsTable projects={projects} setDialog={setDialog} />
      <ProjectsDialog dialog={dialog} setDialog={setDialog} />
    </>
  );
}
