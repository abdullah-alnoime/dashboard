"use client";

import { useUniversities } from "@/hooks/useUniversities";
import {
  UniversitiesHeader,
  UniversitiesTable,
  UniversitiesDialog,
} from "./universities";
import { useState } from "react";
import { UniversitiesSkeleton } from "./skeleton";

export default function Universities() {
  const { data: universities = [], isLoading } = useUniversities();
  const [dialog, setDialog] = useState({ open: false, university: null });
  if (isLoading) return <UniversitiesSkeleton />;
  return (
    <>
      <UniversitiesHeader />
      <UniversitiesTable universities={universities} setDialog={setDialog} />
      <UniversitiesDialog dialog={dialog} setDialog={setDialog} />
    </>
  );
}
