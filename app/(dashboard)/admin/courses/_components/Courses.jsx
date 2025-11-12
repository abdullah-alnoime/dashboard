"use client";

import { useState } from "react";
import { CoursesHeader, CoursesTable, CoursesDialog } from "./courses";
import { CoursesSkeleton } from "./skeleton";
import { useCourses } from "@/hooks/useCourses";

export default function Courses() {
  const { data: courses = [], isLoading } = useCourses();
  const [dialog, setDialog] = useState({ open: false, course: null });
  if (isLoading) return <CoursesSkeleton />;
  return (
    <>
      <CoursesHeader />
      <CoursesTable courses={courses} setDialog={setDialog} />
      <CoursesDialog dialog={dialog} setDialog={setDialog} />
    </>
  );
}
