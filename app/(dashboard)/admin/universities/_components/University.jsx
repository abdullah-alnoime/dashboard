"use client";

import { useQuery } from "@tanstack/react-query";
import { getUniversity } from "@/requests/universities";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import Image from "next/image";

export default function University({ universityId }) {
  const { data: university, isLoading } = useQuery({
    queryKey: ["universities", universityId],
    queryFn: () => getUniversity(universityId),
  });
  if (isLoading) return <p>Loading...</p>;
  if (!university) return <p>University not found.</p>;
  const {
    by,
    grade,
    logo,
    skills,
    startedAt,
    graduatedAt,
    status,
    title,
    translations: {
      ar: { by: arBy, skills: arSkills, title: arTitle },
    },
  } = university;
  return (
    <div className="bg-white shadow rounded-lg p-8 max-w-3xl w-full">
      <Image src={logo} alt={`${by} logo`} width={60} height={60} unoptimized />
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Provider:</strong> {by}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Status:</strong> {status}
      </p>
      {status === "in-progress"
        ? startedAt && (
            <p className="text-gray-700 mb-2">
              <strong>Started:</strong> {formatDate(startedAt)}
            </p>
          )
        : graduatedAt && (
            <p className="text-gray-700 mb-2">
              <strong>Graduated:</strong> {formatDate(graduatedAt)}
            </p>
          )}
      {grade && (
        <p className="text-gray-700 mb-2">
          <strong>Grade:</strong> {grade}
        </p>
      )}
      {skills && (
        <p className="text-gray-700 mb-4">
          <strong>Skills:</strong> {skills.join(", ")}
        </p>
      )}
      {(arBy || arSkills || arTitle) && (
        <>
          <h2 className="text-2xl font-bold my-4">Arabic translations</h2>
          <div dir="rtl">
            {arTitle && <h3 className="text-3xl font-bold mb-4">{arTitle}</h3>}
            {arBy && <p className="text-gray-700 mb-4">{arBy}</p>}
            {arSkills && (
              <p className="text-gray-700 mb-4">
                <strong>المهارات:</strong> {arSkills.join(", ")}
              </p>
            )}
          </div>
        </>
      )}
      <div className="flex gap-3 mt-6">
        <Link
          href={`${universityId}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </Link>
        <Link
          href="."
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
