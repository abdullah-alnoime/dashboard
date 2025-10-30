"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { getCourse } from "@/requests/courses";
import Image from "next/image";

export default function CourseDetails({ courseId }) {
  const { data: course, isLoading } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourse(courseId),
  });

  if (isLoading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;
  const {
    logo,
    title,
    by,
    skills,
    earnedAt,
    grade,
    credential,
    translations: { ar },
  } = course?.content;
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
      <Image
        src={logo}
        alt={`${title} logo`}
        width={60}
        height={60}
        unoptimized
      />
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Provider:</strong> {by}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Grade:</strong> {grade}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Skills:</strong> {skills.join(", ")}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Earned At:</strong> {formatDate(earnedAt)}
      </p>
      <a
        href={credential}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        View Credential
      </a>
      <h2 className="text-2xl font-bold my-4">Arabic translations</h2>
      <div dir="rtl">
        <h3 className="text-3xl font-bold mb-4">{ar.title}</h3>
        <p className="text-gray-700 mb-4">{ar.by}</p>
        <p className="text-gray-600 mb-4">{ar.skills.join(", ")}</p>
      </div>
      <div className="pt-6 flex gap-3">
        <Link
          href={`${courseId}/edit`}
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
