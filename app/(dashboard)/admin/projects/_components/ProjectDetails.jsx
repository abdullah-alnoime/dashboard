"use client";

import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/requests/projects";
import Link from "next/link";
import Image from "next/image";

export default function ProjectDetails({ projectId }) {
  const { data: project, isLoading } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProject(projectId),
  });
  if (isLoading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found.</p>;
  const {
    title,
    preview,
    summary,
    tools,
    content: {
      description,
      responsive: { desktop, mobile },
    },
    code,
    demo,
    translations: { ar },
  } = project.content;
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
      <Image
        src={preview}
        alt={`${title} preview`}
        width={200}
        height={200}
        unoptimized
      />
      <h2 className="text-3xl font-bold my-4">{title}</h2>
      <p className="text-gray-700 mb-4">{summary}</p>
      <p className="text-gray-600 mb-2">{tools.join(", ")}</p>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-x-3 mt-6">
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Live Demo
        </a>
        <a
          href={code}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Code
        </a>
      </div>
      <h2 className="text-2xl font-bold my-4">Arabic translations</h2>
      <div dir="rtl">
        <h3 className="text-3xl font-bold mb-4">{ar.title}</h3>
        <p className="text-gray-700 mb-4">{ar.summary}</p>
        <p className="text-gray-600 mb-4">{ar.content.description}</p>
      </div>
      <h2 className="text-2xl font-bold my-4">Responsive design</h2>
      <div className="flex justify-center items-center gap-4">
        <Image
          src={desktop}
          alt={`${title} desktop preview`}
          width={200}
          height={200}
          unoptimized
        />
        <Image
          src={mobile}
          alt={`${title} mobile preview`}
          width={200}
          height={200}
          unoptimized
        />
      </div>
      <div className="pt-6 flex gap-3">
        <Link
          href={`${projectId}/edit`}
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
